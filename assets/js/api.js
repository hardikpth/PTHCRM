/* ============================================================
   PTH CRM — API client (connects the front-end to the backend)
   ------------------------------------------------------------
   OFFLINE by default. To switch the app to the shared, multi-user
   backend, set the API base URL BEFORE the other scripts load:

     <script>window.PTH_API_BASE = 'https://pthcrm-api.onrender.com/api';</script>

   With that set, api.js authenticates against the Django/DRF backend
   (JWT) and exposes CRUD helpers. store.js uses this when present so
   the same UI works against localStorage (offline) or the API (online).
   ============================================================ */
const Api = (function () {
  const BASE = (window.PTH_API_BASE || '').replace(/\/$/, '');
  const LS_ACCESS = 'pth_jwt_access';
  const LS_REFRESH = 'pth_jwt_refresh';

  const enabled = () => !!BASE;
  const token = () => localStorage.getItem(LS_ACCESS);
  const setTokens = (a, r) => { if (a) localStorage.setItem(LS_ACCESS, a); if (r) localStorage.setItem(LS_REFRESH, r); };
  const clearTokens = () => { localStorage.removeItem(LS_ACCESS); localStorage.removeItem(LS_REFRESH); };

  async function raw(path, { method = 'GET', body, auth = true } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth && token()) headers['Authorization'] = 'Bearer ' + token();
    const res = await fetch(BASE + path, {
      method, headers, body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 401 && auth && localStorage.getItem(LS_REFRESH)) {
      if (await refresh()) return raw(path, { method, body, auth });  // retry once
    }
    if (!res.ok) {
      let detail; try { detail = (await res.json()).detail; } catch (e) {}
      throw new Error(detail || `${res.status} ${res.statusText}`);
    }
    return res.status === 204 ? null : res.json();
  }

  async function login(username, password) {
    const data = await raw('/auth/token/', { method: 'POST', body: { username, password }, auth: false });
    setTokens(data.access, data.refresh);
    return data.user;
  }

  async function refresh() {
    try {
      const r = localStorage.getItem(LS_REFRESH);
      const res = await fetch(BASE + '/auth/token/refresh/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: r }),
      });
      if (!res.ok) { clearTokens(); return false; }
      const data = await res.json();
      setTokens(data.access, data.refresh);
      return true;
    } catch (e) { clearTokens(); return false; }
  }

  const me = () => raw('/auth/me/');
  const logout = () => clearTokens();

  // Generic REST resource helper (DRF paginated -> returns results array)
  function resource(name) {
    const p = `/${name}/`;
    return {
      async list(params = '') { const d = await raw(p + (params ? '?' + params : '')); return d && d.results !== undefined ? d.results : d; },
      get: id => raw(`${p}${id}/`),
      create: obj => raw(p, { method: 'POST', body: obj }),
      update: (id, obj) => raw(`${p}${id}/`, { method: 'PATCH', body: obj }),
      remove: id => raw(`${p}${id}/`, { method: 'DELETE' }),
    };
  }

  return {
    enabled, login, logout, me, refresh, token, raw, resource,
    users: resource('users'), leads: resource('leads'), credentials: resource('credentials'),
    equipment: resource('equipment'), staff: resource('staff'), tenders: resource('tenders'),
    approvals: resource('approvals'), notifications: resource('notifications'),
    quotations: resource('quotations'), audit: resource('audit'), sor: resource('sor'),
  };
})();
