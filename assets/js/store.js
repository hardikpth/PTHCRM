/* ============================================================
   PTH CRM — Data Store (persistence layer)
   ------------------------------------------------------------
   SEPARATION OF CODE AND DATA:
   • The APPLICATION (features, UI, logic) lives in the .js/.css/.html
     files and is replaced whenever you deploy an update.
   • Your DATA (users, leads, credentials, quotations, audit trail, …)
     lives here, in the browser's localStorage under a single key.
   Updating the app's code NEVER erases this data. New collections added
   by a future version are merged in without touching what you already have.
   Use Settings → Data Management to Back up / Restore / Reset.
   ============================================================ */
const Store = (function () {
  const KEY = 'pth_crm_data';
  const VERSION = 1;
  const clone = o => (typeof structuredClone === 'function' ? structuredClone(o) : JSON.parse(JSON.stringify(o)));

  // The user-owned collections. Each maps a storage key to the live DB reference
  // (get/set) and a factory that produces the first-run default from code.
  const MODEL = {
    users:         { get: () => DB.users,          set: v => DB.users = v,          def: () => clone(DB.users || []) },
    leads:         { get: () => DB.pipeline.leads, set: v => DB.pipeline.leads = v, def: () => clone(DB.pipeline.leads || []) },
    credentials:   { get: () => DB.credentials,    set: v => DB.credentials = v,    def: () => clone(DB.credentials || []) },
    equipment:     { get: () => DB.equipment,      set: v => DB.equipment = v,      def: () => clone(DB.equipment || []) },
    staff:         { get: () => DB.staff,          set: v => DB.staff = v,          def: () => clone(DB.staff || []) },
    tenders:       { get: () => DB.tenders,        set: v => DB.tenders = v,        def: () => clone(DB.tenders || []) },
    approvals:     { get: () => DB.approvals,      set: v => DB.approvals = v,      def: () => clone(DB.approvals || []) },
    notifications: { get: () => DB.notifications,  set: v => DB.notifications = v,  def: () => clone(DB.notifications || []) },
    quotations:    { get: () => DB.quotations,     set: v => DB.quotations = v,     def: () => [] },
    audit:         { get: () => window.auditLog || [], set: v => window.auditLog = v, def: () => clone(DB.seedAudit || []) },
  };

  // Capture the PRISTINE code defaults NOW — before init() rebinds DB to stored data.
  // (Once bound, DB points at persisted arrays, so we could no longer recover originals.)
  const DEFAULTS = {};
  for (const k in MODEL) DEFAULTS[k] = MODEL[k].def();
  const defFor = k => clone(DEFAULTS[k]);

  let meta = null;

  function loadRaw() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }

  function bind() { for (const k in MODEL) MODEL[k].set(meta.collections[k]); }

  function snapshot() { for (const k in MODEL) meta.collections[k] = MODEL[k].get(); }

  function persist() {
    if (!meta) return;
    snapshot();
    meta.version = VERSION;
    meta.updatedAt = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(meta)); } catch (e) { /* quota / private mode */ }
  }

  function init() {
    const raw = loadRaw();
    if (raw && raw.collections && typeof raw.collections === 'object') {
      meta = raw;
      // Migration: seed any collection introduced by a newer app version,
      // WITHOUT overwriting collections the user already has.
      for (const k in MODEL) if (!(k in meta.collections)) meta.collections[k] = defFor(k);
    } else {
      meta = { version: VERSION, createdAt: new Date().toISOString(), collections: {} };
      for (const k in MODEL) meta.collections[k] = defFor(k);
    }
    bind();
    persist();
  }

  return {
    init,
    save: persist,
    // Backup: full JSON of everything the user owns
    exportJSON() { persist(); return JSON.stringify(meta, null, 2); },
    // Restore from a backup file
    importJSON(text) {
      const obj = JSON.parse(text);
      if (!obj || !obj.collections) throw new Error('This is not a valid PTH CRM backup file.');
      meta = obj;
      for (const k in MODEL) if (!(k in meta.collections)) meta.collections[k] = defFor(k);
      bind(); persist();
    },
    // Wipe stored data and re-seed from the code defaults
    reset() { localStorage.removeItem(KEY); meta = null; init(); },
    info() {
      const counts = {};
      for (const k in MODEL) counts[k] = (MODEL[k].get() || []).length;
      return { createdAt: meta && meta.createdAt, updatedAt: meta && meta.updatedAt, version: meta && meta.version, counts };
    },
  };
})();

// Initialise immediately so DB references point at persisted data before the app renders.
Store.init();
