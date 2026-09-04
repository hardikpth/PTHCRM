/* Shared Supabase state bridge for the existing CRM modules. */
(function createPthBackend() {
  const config = window.PTH_BACKEND_CONFIG || {};
  const enabled = /^https:\/\/.+\.supabase\.co$/i.test(config.url || '') && Boolean(config.anonKey);
  const stores = new Set([
    'pth_audit_v1', 'pth_overview_strategy_v1', 'pth_crm_intelligence_v1',
    'pth_enterprise_crm_v1', 'pth_pipeline_v1', 'pth_followups_v1',
    'pth_crm_credentials_v1', 'pth_clients_v1',
    'pth_quotations_v1', 'pth_users_v1', 'pth_brand_v1', 'pth_scopes_v1',
    'pth_sor_v1', 'pth_quotation_layout_v1', 'pth_admin_settings_v2'
  ]);
  const originalSetItem = localStorage.setItem.bind(localStorage);
  const originalRemoveItem = localStorage.removeItem.bind(localStorage);
  const originalGetItem = localStorage.getItem.bind(localStorage);
  const tenant = config.tenant || 'pramukh-test-house';
  let applyingRemote = false;
  let token = '';
  let recoverySession = false;
  let writeTimer = 0;
  const pending = new Map();
  const writing = new Set();
  const bases = new Map();
  const journalPrefix = `pth_outbox_v3:${tenant}:`;
  const backupPrefix = `pth_recovery_v3:${tenant}:`;
  const writeIds = new Map();
  let syncError = '', lastCheck = '', lastSave = '';
  function jsonRead(key, fallback = null) { try { return JSON.parse(originalGetItem(key) || 'null') ?? fallback; } catch (_) { return fallback; } }
  function status() {
    const sor = jsonRead('pth_sor_v1', []), quotes = jsonRead('pth_quotations_v1', []);
    return { enabled, signedIn: Boolean(token), pending: [...new Set([...pending.keys(), ...writing])], error: syncError, lastCheck, lastSave,
      quotations: Array.isArray(quotes) ? quotes.length : 0,
      services: Array.isArray(sor) ? sor.reduce((n, c) => n + (c.tests?.length || 0), 0) : 0 };
  }
  function report(error) {
    if (error !== undefined) syncError = error;
    window.dispatchEvent(new CustomEvent('pth-sync-status', { detail: status() }));
  }
  function recoverySnapshot() {
    return { exportedAt: new Date().toISOString(), tenant, status: status(), modules: Object.fromEntries(['pth_sor_v1','pth_quotations_v1'].map(key => [key,
      { current: jsonRead(key), pending: jsonRead(journalPrefix + key), beforeSync: jsonRead(backupPrefix + key) }])) };
  }
  // Restore unsent writes BEFORE remote hydration can replace browser data.
  stores.forEach(key => {
    const entry = jsonRead(journalPrefix + key);
    if (!entry || !Object.prototype.hasOwnProperty.call(entry, 'payload')) return;
    pending.set(key, entry.payload); bases.set(key, entry.base); writeIds.set(key, entry.id);
    originalSetItem(key, JSON.stringify(entry.payload));
  });
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  function merge(base, local, remote) {
    if (same(local, base)) return remote;
    if (same(remote, base) || same(local, remote)) return local;
    if ([base, local, remote].every(Array.isArray)) {
      const field = ['id', 'number', 'code', 'username'].find(key => [base, local, remote].every(list => list.every(x => x && typeof x === 'object' && x[key] != null) && new Set(list.map(x => String(x[key]))).size === list.length));
      if (field) {
        const maps = [base, local, remote].map(list => new Map(list.map(x => [String(x[field]), x])));
        return [...new Set([...maps[2].keys(), ...maps[1].keys()])].map(key => merge(...maps.map(map => map.get(key)))).filter(x => x !== undefined);
      }
    }
    if ([base, local, remote].every(x => x && typeof x === 'object' && !Array.isArray(x))) {
      const result = {};
      for (const key of new Set([...Object.keys(base), ...Object.keys(local), ...Object.keys(remote)])) {
        const value = merge(base[key], local[key], remote[key]);
        if (value !== undefined) result[key] = value;
      }
      return result;
    }
    throw new Error('Another user changed the same record. Your edit is kept in this tab but has NOT been shared. Copy your changes before reloading, then review the latest record and save again.');
  }
  const cacheKey = `pth_sync_versions_v2:${tenant}`;
  let versions;
  try { versions = JSON.parse(originalGetItem(cacheKey) || '{}'); } catch (_) { versions = {}; }
  versions = versions && typeof versions === 'object' ? versions : {};
  let hydration = null;
  let flushing = null;
  let needsReload = false;

  function headers() {
    return { apikey: config.anonKey, Authorization: `Bearer ${token || config.anonKey}`, 'Content-Type': 'application/json' };
  }
  async function request(path, options = {}) {
    const response = await fetch(`${config.url}${path}`, { ...options, headers: { ...headers(), ...(options.headers || {}) } });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Shared database HTTP ${response.status}: ${body || 'Request failed'}`);
    }
    return response.status === 204 ? null : response.json();
  }
  function currentSession() {
    try { return JSON.parse(originalGetItem('pth_backend_session_v1') || 'null'); } catch (error) { return null; }
  }
  function saveSession(session) {
    token = session?.access_token || '';
    if (session) originalSetItem('pth_backend_session_v1', JSON.stringify(session));
    else originalRemoveItem('pth_backend_session_v1');
  }
  async function signIn(email, password) {
    if (!enabled) return { offline: true };
    const result = await request('/auth/v1/token?grant_type=password', { method: 'POST', body: JSON.stringify({ email, password }) });
    saveSession(result);
    await flush();
    const changed = await hydrate();
    return { ...result, changed };
  }
  async function signOut() {
    await flush();
    if (pending.size || writing.size) throw new Error('Some changes have not reached the shared database. Keep this tab open and resolve the sync warning before signing out.');
    if (enabled && token) await request('/auth/v1/logout', { method: 'POST' }).catch(() => {});
    saveSession(null);
  }
  async function requestPasswordReset(email) {
    if (!enabled) throw new Error('Secure authentication is not configured.');
    const redirectTo = `${location.origin}${location.pathname}?password-reset=1`;
    return request(`/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`, {
      method: 'POST', body: JSON.stringify({ email })
    });
  }
  async function updatePassword(password) {
    if (!enabled || !token) throw new Error('Please sign in again before changing the password.');
    const result = await request('/auth/v1/user', { method: 'PUT', body: JSON.stringify({ password }) });
    recoverySession = false;
    history.replaceState(null, '', `${location.pathname}${location.search.replace(/([?&])password-reset=1(&|$)/, '$1').replace(/[?&]$/, '')}`);
    return result;
  }
  async function refreshSession() {
    const session = currentSession();
    if (!enabled || !session?.refresh_token) return false;
    try {
      const result = await request('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: JSON.stringify({ refresh_token: session.refresh_token }) });
      saveSession(result);
      return true;
    } catch (error) { saveSession(null); return false; }
  }
  async function flush() {
    if (flushing) return flushing;
    if (!enabled || !token || !pending.size) return;
    const activeSession = currentSession();
    if (activeSession?.expires_at && activeSession.expires_at * 1000 < Date.now() + 60000 && !(await refreshSession())) {
      window.dispatchEvent(new CustomEvent('pth-backend-error', { detail: 'Your session expired. Your edits are still in this tab; copy them before signing in again.' }));
      return;
    }
    const rows = [...pending].map(([store_key, payload]) => ({ tenant_slug: tenant, store_key, payload }));
    const sentIds = new Map(writeIds);
    pending.clear();
    rows.forEach(row => writing.add(row.store_key));
    report();
    flushing = (async () => {
    try {
      for (const row of rows) {
        try {
          const path = `/rest/v1/app_state?tenant_slug=eq.${encodeURIComponent(tenant)}&store_key=eq.${row.store_key}`;
          let saved = false;
          for (let attempt = 0; attempt < 3 && !saved; attempt++) {
            const [remote] = await request(`${path}&select=payload,updated_at`);
            const payload = remote ? merge(bases.get(row.store_key), row.payload, remote.payload) : row.payload;
            const result = await request(remote ? `${path}&updated_at=eq.${encodeURIComponent(remote.updated_at)}&select=updated_at` : '/rest/v1/app_state?on_conflict=tenant_slug,store_key&select=updated_at', {
              method: remote ? 'PATCH' : 'POST',
              headers: { Prefer: remote ? 'return=representation' : 'resolution=ignore-duplicates,return=representation' },
              body: JSON.stringify(remote ? { payload } : { ...row, payload })
            });
            if (!result?.length) continue; // Concurrent write: re-read and merge, never blind overwrite.
            saved = true;
            bases.set(row.store_key, row.payload);
            const entry = jsonRead(journalPrefix + row.store_key);
            if (entry?.id === sentIds.get(row.store_key)) originalRemoveItem(journalPrefix + row.store_key);
            else if (pending.has(row.store_key) && entry?.id === writeIds.get(row.store_key)) {
              originalSetItem(journalPrefix + row.store_key, JSON.stringify({ ...entry, base: row.payload }));
            }
            lastSave = new Date().toISOString();
            // Force next hydration to update in-memory module state after a merge.
            delete versions[row.store_key];
            if (!same(payload, row.payload)) needsReload = true;
          }
          if (!saved) throw new Error('Shared data is busy. Your save will retry automatically. Keep this tab open.');
        } catch (error) {
          if (!pending.has(row.store_key)) pending.set(row.store_key, row.payload);
          report(error.message);
          window.dispatchEvent(new CustomEvent('pth-backend-error', { detail: error.message }));
        }
      }
    } finally {
      rows.forEach(row => writing.delete(row.store_key));
      flushing = null;
      report(pending.size ? undefined : '');
      if (pending.size) { clearTimeout(writeTimer); writeTimer = setTimeout(flush, 60000); }
    }
    })();
    return flushing;
  }
  function scheduleWrite(key, value, previous) {
    if (!enabled || applyingRemote || !stores.has(key)) return;
    const payload = JSON.parse(value);
    if (!bases.has(key)) bases.set(key, previous == null ? undefined : JSON.parse(previous));
    const id = `${Date.now()}-${Math.random()}`;
    // Persist first; a full browser disk must not produce a false successful save.
    originalSetItem(journalPrefix + key, JSON.stringify({ id, payload, base: bases.get(key) }));
    writeIds.set(key, id); pending.set(key, payload);
    report(token ? undefined : 'Saved on this device only. Sign in to upload your pending changes.');
    clearTimeout(writeTimer);
    writeTimer = setTimeout(flush, 450);
  }
  async function hydrate() {
    if (!enabled || !token) return false;
    if (hydration) return hydration;
    hydration = (async () => {
    // Read tiny version metadata first. Never download unchanged module payloads.
    const base = `/rest/v1/app_state?tenant_slug=eq.${encodeURIComponent(tenant)}`;
    const metadata = await request(`${base}&select=store_key,updated_at`);
    lastCheck = new Date().toISOString(); report(pending.size ? undefined : '');
    const keys = metadata.filter(row => stores.has(row.store_key) && !pending.has(row.store_key) && !writing.has(row.store_key) &&
      (versions[row.store_key] !== row.updated_at || originalGetItem(row.store_key) === null)).map(row => row.store_key);
    if (!keys.length) return false;
    // Keys are restricted to the fixed allowlist above, not user input.
    const rows = await request(`${base}&store_key=in.(${keys.join(',')})&select=store_key,payload,updated_at`);
    let changed = false;
    applyingRemote = true;
    try {
    rows.forEach(row => {
      if (!stores.has(row.store_key) || pending.has(row.store_key) || writing.has(row.store_key)) return;
      const value = JSON.stringify(row.payload);
      if (['pth_sor_v1','pth_quotations_v1'].includes(row.store_key) && originalGetItem(row.store_key) !== value && originalGetItem(row.store_key) !== null && !originalGetItem(backupPrefix + row.store_key)) {
        originalSetItem(backupPrefix + row.store_key, JSON.stringify({ capturedAt: new Date().toISOString(), payload: jsonRead(row.store_key) }));
      }
      if (originalGetItem(row.store_key) !== value) { originalSetItem(row.store_key, value); changed = true; }
      versions[row.store_key] = row.updated_at;
      bases.set(row.store_key, row.payload);
    });
    originalSetItem(cacheKey, JSON.stringify(versions));
    } finally { applyingRemote = false; }
    window.dispatchEvent(new CustomEvent('pth-backend-hydrated', { detail: { stores: rows.length } }));
    return changed;
    })();
    try { return await hydration; } finally { hydration = null; }
  }

  // Storage instances have named-property setters: assigning setItem on the
  // instance can store a string instead of intercepting the native method.
  const storagePrototype = typeof Storage !== 'undefined' ? Storage.prototype : localStorage;
  const nativeSetItem = storagePrototype.setItem;
  storagePrototype.setItem = function syncedSetItem(key, value) {
    if (this !== localStorage) return nativeSetItem.call(this, key, value);
    const previous = originalGetItem(key);
    if (previous !== String(value)) scheduleWrite(key, value, previous);
    originalSetItem(key, value);
  };
  const hash = new URLSearchParams(location.hash.replace(/^#/, ''));
  if (hash.get('access_token')) {
    saveSession({
      ...(currentSession() || {}), access_token: hash.get('access_token'),
      refresh_token: hash.get('refresh_token') || '', token_type: hash.get('token_type') || 'bearer',
      expires_in: Number(hash.get('expires_in') || 3600), expires_at: Math.floor(Date.now() / 1000) + Number(hash.get('expires_in') || 3600)
    });
    recoverySession = hash.get('type') === 'recovery' || new URLSearchParams(location.search).get('password-reset') === '1';
    history.replaceState(null, '', `${location.pathname}?password-reset=1`);
  }
  const session = currentSession();
  token = session?.access_token || '';
  async function syncVisible() {
    if (!enabled || !token || document.hidden) return;
    const active = currentSession();
    if (active?.expires_at && active.expires_at * 1000 < Date.now() + 60000 && !(await refreshSession())) return;
    await flush();
    if (document.querySelector('.modal-scrim.open') || window.PTHHasUnsavedChanges?.()) return;
    const changed = await hydrate();
    needsReload = needsReload || changed;
    if (needsReload && !pending.size && !writing.size && !document.querySelector('.modal-scrim.open') && !window.PTHHasUnsavedChanges?.()) location.reload();
  }
  const check = () => syncVisible().catch(error => { report(error.message); window.dispatchEvent(new CustomEvent('pth-backend-error', { detail: error.message })); });
  if (enabled) {
    check();
    setInterval(check, Math.max(60000, Number(config.syncIntervalMs) || 60000));
    document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  }
  window.addEventListener('beforeunload', event => {
    if (pending.size || writing.size) { flush(); event.preventDefault(); event.returnValue = ''; }
  });
  window.PTHBackend = Object.freeze({ enabled, signIn, signOut, hydrate, flush, syncNow: check, status, recoverySnapshot, requestPasswordReset, updatePassword, hasSession: () => Boolean(token), isRecoverySession: () => recoverySession || new URLSearchParams(location.search).get('password-reset') === '1' });
})();
