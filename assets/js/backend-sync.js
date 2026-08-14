/* Shared Supabase state bridge for the existing CRM modules. */
(function createPthBackend() {
  const config = window.PTH_BACKEND_CONFIG || {};
  const enabled = /^https:\/\/.+\.supabase\.co$/i.test(config.url || '') && Boolean(config.anonKey);
  const stores = new Set([
    'pth_audit_v1', 'pth_overview_strategy_v1', 'pth_crm_intelligence_v1',
    'pth_enterprise_crm_v1', 'pth_pipeline_v1', 'pth_followups_v1',
    'pth_crm_credentials_v1', 'pth_tenders_v1', 'pth_clients_v1',
    'pth_quotations_v1', 'pth_users_v1', 'pth_brand_v1', 'pth_scopes_v1',
    'pth_sor_v1', 'pth_quotation_layout_v1'
  ]);
  const originalSetItem = localStorage.setItem.bind(localStorage);
  const originalRemoveItem = localStorage.removeItem.bind(localStorage);
  const originalGetItem = localStorage.getItem.bind(localStorage);
  const tenant = config.tenant || 'pramukh-test-house';
  let applyingRemote = false;
  let token = '';
  let writeTimer = 0;
  const pending = new Map();

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
    if (!enabled || !token || !pending.size) return;
    const rows = [...pending].map(([store_key, payload]) => ({ tenant_slug: tenant, store_key, payload, updated_at: new Date().toISOString() }));
    pending.clear();
    try {
      await request('/rest/v1/app_state?on_conflict=tenant_slug,store_key', {
        method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(rows)
      });
    } catch (error) {
      rows.forEach(row => pending.set(row.store_key, row.payload));
      window.dispatchEvent(new CustomEvent('pth-backend-error', { detail: error.message }));
    }
  }
  function scheduleWrite(key, value) {
    if (!enabled || !token || applyingRemote || !stores.has(key)) return;
    try { pending.set(key, JSON.parse(value)); } catch (error) { return; }
    clearTimeout(writeTimer);
    writeTimer = setTimeout(flush, 450);
  }
  async function hydrate() {
    if (!enabled || !token) return false;
    const rows = await request(`/rest/v1/app_state?tenant_slug=eq.${encodeURIComponent(tenant)}&select=store_key,payload,updated_at`);
    if (!rows.length) {
      stores.forEach(key => { const value = originalGetItem(key); if (value != null) scheduleWrite(key, value); });
      await flush();
      return false;
    }
    let changed = false;
    applyingRemote = true;
    rows.forEach(row => {
      const value = JSON.stringify(row.payload);
      if (originalGetItem(row.store_key) !== value) { originalSetItem(row.store_key, value); changed = true; }
    });
    applyingRemote = false;
    window.dispatchEvent(new CustomEvent('pth-backend-hydrated', { detail: { stores: rows.length } }));
    return changed;
  }

  localStorage.setItem = function syncedSetItem(key, value) { originalSetItem(key, value); scheduleWrite(key, value); };
  localStorage.removeItem = function syncedRemoveItem(key) { originalRemoveItem(key); };
  const session = currentSession();
  token = session?.access_token || '';
  if (enabled && session?.expires_at && session.expires_at * 1000 < Date.now() + 60000) refreshSession();
  if (enabled && token) hydrate().then(changed => { if (changed) location.reload(); }).catch(error => window.dispatchEvent(new CustomEvent('pth-backend-error', { detail: error.message })));
  if (enabled) setInterval(() => token && hydrate().then(changed => { if (changed && !document.querySelector('.modal-scrim.open')) location.reload(); }).catch(() => {}), Math.max(5000, Number(config.syncIntervalMs) || 15000));
  window.addEventListener('beforeunload', flush);
  window.PTHBackend = Object.freeze({ enabled, signIn, signOut, hydrate, flush, hasSession: () => Boolean(token) });
})();
