const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../assets/js/backend-sync.js'), 'utf8');
function setup() {
  const values = new Map([['pth_backend_session_v1', JSON.stringify({ access_token: 'test' })]]);
  const requests = [], timers = [], events = {};
  let rows = [{ store_key: 'pth_clients_v1', payload: [{ name: 'Client' }], updated_at: '1' }];
  let fail = false;
  const context = {
    URLSearchParams, Map, Set, Date, JSON, Boolean, Number,
    localStorage: { getItem: k => values.get(k) ?? null, setItem: (k,v) => values.set(k,v), removeItem: k => values.delete(k) },
    document: { hidden: true, querySelector: () => null, addEventListener: (k,v) => { events[k] = v; } },
    location: { hash: '', search: '', pathname: '/', origin: 'https://test', reload() {} },
    history: { replaceState() {} }, CustomEvent: class {},
    setTimeout: fn => { timers.push(fn); return timers.length; }, clearTimeout() {},
    setInterval: (fn, ms) => { assert.equal(ms, 60000); events.poll = fn; },
    fetch: async (url, options) => {
      requests.push({ url, options });
      if (options.method === 'POST') return { ok: !fail, status: fail ? 500 : 204, text: async () => 'failed' };
      const payload = url.includes('select=store_key,payload');
      return { ok: true, status: 200, json: async () => rows.map(r => payload ? r : { store_key: r.store_key, updated_at: r.updated_at }) };
    }
  };
  context.window = { PTH_BACKEND_CONFIG: { url: 'https://test.supabase.co', anonKey: 'public' }, addEventListener() {}, dispatchEvent() {} };
  vm.runInNewContext(source, context);
  return { context, values, requests, events, api: context.window.PTHBackend, setRows: r => rows = r, fail: v => fail = v };
}
test('initial download then metadata-only checks; changed payload fetched', async () => {
  const h = setup();
  assert.equal(await h.api.hydrate(), true);
  assert.equal(h.requests.length, 2);
  assert.equal(await h.api.hydrate(), false);
  assert.equal(h.requests.length, 3);
  assert.ok(!h.requests[2].url.includes('payload'));
  h.setRows([{ store_key: 'pth_clients_v1', payload: [{ name: 'Changed' }], updated_at: '2' }]);
  assert.equal(await h.api.hydrate(), true);
  assert.match(h.values.get('pth_clients_v1'), /Changed/);
});
test('empty remote does not upload old browser data', async () => {
  const h = setup(); h.setRows([]);
  h.values.set('pth_clients_v1', '["old"]');
  await h.api.hydrate();
  assert.equal(h.requests.length, 1);
});
test('pending save cannot be overwritten by remote polling; saves remain minimal', async () => {
  const h = setup();
  h.context.localStorage.setItem('pth_clients_v1', '["local"]');
  await h.api.hydrate();
  assert.equal(h.values.get('pth_clients_v1'), '["local"]');
  await h.api.flush();
  assert.match(h.requests.at(-1).options.headers.Prefer, /return=minimal/);
});
test('hidden tab polling makes no requests and concurrent hydration is coalesced', async () => {
  const h = setup(); await h.events.poll();
  assert.equal(h.requests.length, 0);
  await Promise.all([h.api.hydrate(), h.api.hydrate()]);
  assert.equal(h.requests.length, 2);
});
test('failed write retries the newest local value', async () => {
  const h = setup(); h.fail(true);
  h.context.localStorage.setItem('pth_clients_v1', '["first"]');
  await h.api.flush();
  h.context.localStorage.setItem('pth_clients_v1', '["latest"]');
  h.fail(false); await h.api.flush();
  assert.match(h.requests.at(-1).options.body, /latest/);
});
