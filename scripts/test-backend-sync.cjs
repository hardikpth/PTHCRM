const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../assets/js/backend-sync.js'), 'utf8');
function setup(server = { rows: [{ store_key: 'pth_clients_v1', payload: [{ id: 1, name: 'Client' }], updated_at: '1' }], version: 1 }, existingValues) {
  const values = existingValues || new Map([['pth_backend_session_v1', JSON.stringify({ access_token: 'test' })]]);
  const requests = [], timers = [], events = {};
  let fail = false;
  class Storage {
    getItem(k) { return values.get(k) ?? null; }
    setItem(k,v) { values.set(k,String(v)); }
    removeItem(k) { values.delete(k); }
  }
  const context = {
    URLSearchParams, Map, Set, Date, JSON, Boolean, Number,
    Storage, localStorage: new Storage(),
    document: { hidden: true, querySelector: () => null, addEventListener: (k,v) => { events[k] = v; } },
    location: { hash: '', search: '', pathname: '/', origin: 'https://test', reload() {} },
    history: { replaceState() {} }, CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init.detail; } },
    setTimeout: fn => { timers.push(fn); return timers.length; }, clearTimeout() {},
    setInterval: (fn, ms) => { assert.equal(ms, 60000); events.poll = fn; },
    fetch: async (url, options) => {
      requests.push({ url, options });
      const params = new URL(url).searchParams;
      const key = params.get('store_key')?.replace(/^eq\./, '');
      if (['POST','PATCH'].includes(options.method)) {
        if (fail) return { ok: false, text: async () => 'failed' };
        const body = JSON.parse(options.body);
        let row = server.rows.find(r => r.store_key === (key || body.store_key));
        if ((options.method === 'PATCH' && row?.updated_at !== params.get('updated_at')?.slice(3)) || (options.method === 'POST' && row)) return { ok: true, status: 200, json: async () => [] };
        if (!row) { row = { store_key: body.store_key }; server.rows.push(row); }
        row.payload = body.payload; row.updated_at = String(++server.version);
        return { ok: true, status: 200, json: async () => [{ updated_at: row.updated_at }] };
      }
      const payload = params.get('select').includes('payload');
      const rows = server.rows.filter(r => !key || key.startsWith('in.') || r.store_key === key);
      return { ok: true, status: 200, json: async () => structuredClone(rows.map(r => payload ? r : { store_key: r.store_key, updated_at: r.updated_at })) };
    }
  };
  context.window = { PTH_BACKEND_CONFIG: { url: 'https://test.supabase.co', anonKey: 'public' }, addEventListener() {}, dispatchEvent(event) { events[event.type] = event.detail; } };
  vm.runInNewContext(source, context);
  return { context, values, requests, events, server, api: context.window.PTHBackend, setRows: r => server.rows = r, fail: v => fail = v };
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
  await h.api.hydrate();
  h.context.localStorage.setItem('pth_clients_v1', '["local"]');
  await h.api.hydrate();
  assert.equal(h.values.get('pth_clients_v1'), '["local"]');
  await h.api.flush();
  assert.match(h.requests.at(-1).url, /select=updated_at/);
});
test('hidden tab polling makes no requests and concurrent hydration is coalesced', async () => {
  const h = setup(); await h.events.poll();
  assert.equal(h.requests.length, 0);
  await Promise.all([h.api.hydrate(), h.api.hydrate()]);
  assert.equal(h.requests.length, 2);
});
test('failed write retries the newest local value', async () => {
  const h = setup(); h.fail(true);
  await h.api.hydrate();
  h.context.localStorage.setItem('pth_clients_v1', '["first"]');
  await h.api.flush();
  h.context.localStorage.setItem('pth_clients_v1', '["latest"]');
  h.fail(false); await h.api.flush();
  assert.match(h.requests.at(-1).options.body, /latest/);
});
test('two independent users share quotation additions without losing either', async () => {
  const server = { rows: [{ store_key: 'pth_quotations_v1', payload: [], updated_at: '1' }], version: 1 };
  const a = setup(server), b = setup(server);
  await Promise.all([a.api.hydrate(), b.api.hydrate()]);
  a.context.localStorage.setItem('pth_quotations_v1', JSON.stringify([{number:'Q1',total:100}]));
  b.context.localStorage.setItem('pth_quotations_v1', JSON.stringify([{number:'Q2',total:200}]));
  await Promise.all([a.api.flush(), b.api.flush()]);
  await Promise.all([a.api.hydrate(), b.api.hydrate()]);
  assert.equal(JSON.parse(a.values.get('pth_quotations_v1')).length, 2);
  assert.equal(a.values.get('pth_quotations_v1'), b.values.get('pth_quotations_v1'));
});
test('conflicting edits do not overwrite another user', async () => {
  const server = { rows: [{ store_key: 'pth_clients_v1', payload: [{id:1,name:'Original'}], updated_at:'1' }], version:1 };
  const a = setup(server), b = setup(server);
  await Promise.all([a.api.hydrate(), b.api.hydrate()]);
  a.context.localStorage.setItem('pth_clients_v1','[{"id":1,"name":"A"}]');
  b.context.localStorage.setItem('pth_clients_v1','[{"id":1,"name":"B"}]');
  await a.api.flush(); await b.api.flush();
  assert.equal(server.rows[0].payload[0].name,'A');
  assert.match(b.values.get('pth_clients_v1'), /B/);
  assert.match(b.events['pth-backend-error'], /NOT been shared/);
});
test('shared settings additions and updates reach a second user', async () => {
  const server = { rows: [], version: 1 };
  const a = setup(server), b = setup(server);
  a.context.localStorage.setItem('pth_admin_settings_v2', '{"organisation":{"name":"PTH"}}');
  await a.api.flush(); await b.api.hydrate();
  assert.equal(b.values.get('pth_admin_settings_v2'), '{"organisation":{"name":"PTH"}}');
  b.context.localStorage.setItem('pth_admin_settings_v2', '{"organisation":{"name":"PTH CRM"}}');
  await b.api.flush(); await a.api.hydrate();
  assert.match(a.values.get('pth_admin_settings_v2'), /PTH CRM/);
});
test('active form defers refresh until closed, then remote change becomes visible', async () => {
  const h = setup(); let reloads = 0, form = true;
  h.context.document.hidden = false;
  h.context.location.reload = () => reloads++;
  h.context.window.PTHHasUnsavedChanges = () => form;
  await h.events.poll(); assert.equal(h.requests.length, 0);
  form = false;
  await h.events.poll(); assert.equal(reloads, 1);
  assert.match(h.values.get('pth_clients_v1'), /Client/);
});
test('quotation upload failure survives a browser restart and reaches another user', async () => {
  const server = { rows: [{store_key:'pth_quotations_v1',payload:[],updated_at:'1'}],version:1 };
  const a=setup(server); await a.api.hydrate(); a.fail(true);
  a.context.localStorage.setItem('pth_quotations_v1','[{"number":"Q-RECOVERY","total":123}]');
  await a.api.flush(); assert.equal(a.api.status().pending.length,1);
  const restarted=setup(server,a.values);
  await restarted.api.hydrate();
  assert.match(restarted.values.get('pth_quotations_v1'), /Q-RECOVERY/);
  await restarted.api.flush(); assert.equal(restarted.api.status().pending.length,0);
  const b=setup(server); await b.api.hydrate();
  assert.match(b.values.get('pth_quotations_v1'), /Q-RECOVERY/);
  assert.ok(![...a.values.keys()].some(k=>k.startsWith('pth_outbox_v3:')));
});
test('SOR services survive failed upload and restart', async () => {
  const server={rows:[{store_key:'pth_sor_v1',payload:[{id:1,tests:[]}],updated_at:'1'}],version:1};
  const a=setup(server);await a.api.hydrate();a.fail(true);
  a.context.localStorage.setItem('pth_sor_v1','[{"id":1,"tests":[{"code":"NEW","rate":450}]}]');
  await a.api.flush();const restarted=setup(server,a.values);await restarted.api.flush();
  const b=setup(server);await b.api.hydrate();assert.equal(b.api.status().services,1);
  assert.match(b.values.get('pth_sor_v1'),/NEW/);
});
test('legacy SOR and quotation data are preserved before remote replacement', async () => {
  const server={rows:[{store_key:'pth_sor_v1',payload:[],updated_at:'1'},{store_key:'pth_quotations_v1',payload:[],updated_at:'1'}],version:1};
  const a=setup(server);
  a.values.set('pth_sor_v1','[{"id":99,"tests":[{"code":"LOCAL-ONLY"}]}]');
  a.values.set('pth_quotations_v1','[{"number":"LOCAL-QUOTE"}]');
  await a.api.hydrate();
  const exported=JSON.stringify(a.api.recoverySnapshot());
  assert.match(exported,/LOCAL-ONLY/);assert.match(exported,/LOCAL-QUOTE/);
  assert.ok(!exported.includes('access_token'));
  assert.equal(a.requests.filter(r=>r.options.method).length,0);
});
