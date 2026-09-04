/* Shared Supabase state bridge for the existing CRM modules. */
(function createPthBackend() {
  const config = window.PTH_BACKEND_CONFIG || {};
  const enabled = /^https:\/\/.+\.supabase\.co$/i.test(config.url || '') && Boolean(config.anonKey);
  const stores = new Set([
    'pth_audit_v1', 'pth_overview_strategy_v1', 'pth_crm_intelligence_v1',
    'pth_enterprise_crm_v1', 'pth_pipeline_v1', 'pth_followups_v1',
    'pth_crm_credentials_v1', 'pth_clients_v1',
    'pth_quotations_v1', 'pth_users_v1', 'pth_brand_v1', 'pth_scopes_v1',
    'pth_sor_v1', 'pth_quotation_layout_v1'
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
  const cacheKey = `pth_sync_versions_v2:${tenant}`;
  let versions;
  try { versions = JSON.parse(originalGetItem(cacheKey) || '{}'); } catch (_) { versions = {}; }
  versions = versions && typeof versions === 'object' ? versions : {};
  let hydration = null;
  let flushing = null;

  function headers() {
    return { apikey: config.anonKey, Authorization: `Bearer ${token || config.anonKey}`, 'Content-Type': 'application/json' };
  }
  async function request(path, options = {}) {
    const response = await fetch(`${config.url}${path}`, { ...options, headers: { ...headers(), ...(options.headers || {}) } });
    if (!response.ok) throw new Error((await response.text()) || `Backend request failed (${response.status})`);
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
    const changed = await hydrate();
    return { ...result, changed };
  }
  async function signOut() {
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
    const rows = [...pending].map(([store_key, payload]) => ({ tenant_slug: tenant, store_key, payload, updated_at: new Date().toISOString() }));
    pending.clear();
    rows.forEach(row => writing.add(row.store_key));
    flushing = (async () => {
    try {
      await request('/rest/v1/app_state?on_conflict=tenant_slug,store_key', {
        method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(rows)
      });
    } catch (error) {
      rows.forEach(row => { if (!pending.has(row.store_key)) pending.set(row.store_key, row.payload); });
      window.dispatchEvent(new CustomEvent('pth-backend-error', { detail: error.message }));
    } finally {
      rows.forEach(row => writing.delete(row.store_key));
      flushing = null;
      if (pending.size) { clearTimeout(writeTimer); writeTimer = setTimeout(flush, 5000); }
    }
    })();
    return flushing;
  }
  function scheduleWrite(key, value) {
    if (!enabled || !token || applyingRemote || !stores.has(key)) return;
    try { pending.set(key, JSON.parse(value)); } catch (error) { return; }
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
      if (originalGetItem(row.store_key) !== value) { originalSetItem(row.store_key, value); changed = true; }
      versions[row.store_key] = row.updated_at;
    });
    originalSetItem(cacheKey, JSON.stringify(versions));
    } finally { applyingRemote = false; }
    window.dispatchEvent(new CustomEvent('pth-backend-hydrated', { detail: { stores: rows.length } }));
    return changed;
    })();
    try { return await hydration; } finally { hydration = null; }
  }

  localStorage.setItem = function syncedSetItem(key, value) { originalSetItem(key, value); scheduleWrite(key, value); };
  localStorage.removeItem = function syncedRemoveItem(key) { originalRemoveItem(key); };
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
    const changed = await hydrate();
    if (changed && !pending.size && !writing.size && !document.querySelector('.modal-scrim.open')) location.reload();
  }
  const check = () => syncVisible().catch(error => window.dispatchEvent(new CustomEvent('pth-backend-error', { detail: error.message })));
  if (enabled) {
    check();
    setInterval(check, Math.max(60000, Number(config.syncIntervalMs) || 60000));
    document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  }
  window.addEventListener('beforeunload', flush);
  window.PTHBackend = Object.freeze({ enabled, signIn, signOut, hydrate, flush, requestPasswordReset, updatePassword, hasSession: () => Boolean(token), isRecoverySession: () => recoverySession || new URLSearchParams(location.search).get('password-reset') === '1' });
})();
