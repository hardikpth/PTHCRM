/* ============================================================
   LabCred CRM — Application Shell, Router & Views
   ============================================================ */

/* ---------- Icon library (inline SVG, stroke-based) ---------- */
const I = {
  logo: '<svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="46" fill="#fff" stroke="var(--brand-navy)" stroke-width="2.4"/><circle cx="50" cy="50" r="40.5" fill="none" stroke="var(--brand-navy)" stroke-width="1.1"/><path d="M41 84 C34 62 36 33 51 23 C68 14 80 34 63 46 C54.5 52 44 49.5 44.5 43" fill="none" stroke="#E8791E" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M41 84 C38 78 37 70 37 62" fill="none" stroke="#E8791E" stroke-width="9.5" stroke-linecap="round"/><circle cx="37.5" cy="70" r="8.6" fill="#E4002B"/><text x="37.5" y="73.2" text-anchor="middle" font-size="7.4" font-weight="700" fill="#fff" font-family="Inter,sans-serif">PTH</text></svg>',
  overview: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  crm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 6.5a3 3 0 0 1 0 5.8M18 19a5 5 0 0 0-3-4.6"/></svg>',
  enquiry: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.6A8.5 8.5 0 1 1 21 11.5z"/><path d="M9 10h6M9 13.5h4"/></svg>',
  quote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  customer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1"/><circle cx="9" cy="8" r="3"/><path d="M16 3.5a3 3 0 0 1 0 5.8M21 21v-1a4 4 0 0 0-3-3.8"/></svg>',
  project: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4M3 17l9 4 9-4"/></svg>',
  job: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 12h18"/></svg>',
  sample: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 2h6M10 2v6l-4.5 9a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 8V2"/><path d="M7.5 15h9"/></svg>',
  test: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 3h14M6 3v6l5 6-5 6h12l-5-6 5-6V3"/></svg>',
  report: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 12l2.5 2.5L16 9"/></svg>',
  cred: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="12" r="2.2"/><path d="M13 10h5M13 13.5h4"/></svg>',
  approval: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l7 3v6c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V5l7-3z"/><path d="M9 12l2 2 4-4"/></svg>',
  cert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="9" r="6"/><path d="M9 14l-1.5 7L12 19l4.5 2L15 14"/></svg>',
  scope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
  tender: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 21V5a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M14 3v6h6M9 14h6M9 17h4"/></svg>',
  equip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10.3 4.3a3.5 3.5 0 0 0 4.9 4.9l4.3 4.3a2 2 0 0 1-2.8 2.8l-4.3-4.3a3.5 3.5 0 0 0-4.9-4.9z"/><path d="M6 14l-3 3a2 2 0 0 0 2.8 2.8l3-3"/></svg>',
  employee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7" r="4"/><path d="M5 21v-1a7 7 0 0 1 14 0v1"/></svg>',
  document: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2h8l6 6v14H6z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  invoice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/></svg>',
  payment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></svg>',
  analytics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M10.5 20a1.8 1.8 0 0 0 3 0"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 7 2.6h.1A1.6 1.6 0 0 0 9 1V.9a2 2 0 0 1 4 0V1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.1a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" transform="translate(1 1)"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M10.5 20a1.8 1.8 0 0 0 3 0"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>',
  chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 6l-6 6 6 6"/></svg>',
  chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 6l6 6-6 6"/></svg>',
  chevD: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9l6 6 6-6"/></svg>',
  arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6L9 17l-5-5"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 5h18l-7 8v6l-4 2v-8z"/></svg>',
  export: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12M8 7l4-4 4 4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 15V3M8 7l4-4 4 4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  inr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 4h12M6 8h12M15.5 4c0 4-3 6-7 6h1l6 8"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 2h8l6 6v14H6z"/><path d="M14 2v6h6"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  portal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8"/></svg>',
  rate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z"/><path d="M8 9h4M8 13h8M8 17h6"/><circle cx="16" cy="9" r="1.4"/></svg>',
};

/* ---------- Brand logo: real PTH artwork if provided, else built-in SVG mark ---------- */
function brandMark() {
  window.__logoSVG = I.logo;
  return DB.brand.logoUrl
    ? `<img src="${DB.brand.logoUrl}" alt="${DB.brand.company} logo" style="width:100%;height:100%;object-fit:contain" onerror="this.parentElement.innerHTML=window.__logoSVG">`
    : I.logo;
}

/* ---------- Formatting ---------- */
window.fmt = function (v, kind) {
  if (kind === 'inr') {
    const n = Math.round(v);
    if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
    if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + ' L';
    return '₹' + n.toLocaleString('en-IN');
  }
  if (kind === 'pct') return v.toFixed(1) + '%';
  if (kind === 'int') return Math.round(v).toLocaleString('en-IN');
  return v;
};
const inr = v => window.fmt(v, 'inr');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- Navigation config ---------- */
const NAV = [
  { section: 'Main', items: [
    { id: 'overview', label: 'Overview', icon: 'overview' },
  ]},
  { section: 'CRM', items: [
    { id: 'pipeline', label: 'CRM Pipeline', icon: 'crm' },
    { id: 'enquiries', label: 'Enquiries', icon: 'enquiry', badge: 12 },
    { id: 'quotations', label: 'Quotations', icon: 'quote' },
    { id: 'sor', label: 'Schedule of Rates', icon: 'rate' },
    { id: 'customers', label: 'Customers', icon: 'customer' },
    { id: 'tenders', label: 'Tenders', icon: 'tender' },
  ]},
  { section: 'Compliance', items: [
    { id: 'credentials', label: 'Credentials', icon: 'cred', dot: true },
    { id: 'approvals', label: 'Approvals', icon: 'approval' },
    { id: 'certifications', label: 'Certifications', icon: 'cert' },
    { id: 'scope', label: 'Accreditation Scope', icon: 'scope' },
    { id: 'equipment', label: 'Equipment', icon: 'equip' },
    { id: 'staff', label: 'Staff Credentials', icon: 'employee' },
    { id: 'package', label: 'Package Builder', icon: 'document' },
    { id: 'calendar', label: 'Expiry Calendar', icon: 'cal' },
  ]},
  { section: 'Operations', items: [
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'notifications', label: 'Alerts', icon: 'alert', badge: 3 },
    { id: 'portal', label: 'Customer Portal', icon: 'portal' },
    { id: 'users', label: 'User Management', icon: 'employee' },
    { id: 'audit', label: 'Audit Trail', icon: 'shield' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ]},
];

/* ---------- App State ---------- */
const state = { route: 'overview', collapsed: false, theme: 'light', mobileOpen: false, period: 'Last 30 days' };

/* ---------- Audit Trail (data lives in the Store / localStorage) ---------- */
// window.auditLog is created and bound by store.js (Store.init()).
if (!window.auditLog) window.auditLog = [];
function nowStamp() {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function logAudit(action, module, detail) {
  window.auditLog.unshift({ ts: nowStamp(), user: DB.user.name, role: DB.user.role, action, module, detail });
  if (window.auditLog.length > 800) window.auditLog.length = 800;
  Store.save();
  if (state.route === 'audit') renderAuditTable(document.getElementById('auditSearch')?.value || '');
}

/* ============================================================
   UTILITIES: toast, drawer, modal
   ============================================================ */
function toast(msg, sub = '', kind = 'ok') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
  const icoMap = {
    ok: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path class="check-anim" d="M20 6L9 17l-5-5"/></svg>`,
    err: I.x, info: I.info,
  };
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<div class="toast-ico ${kind}">${icoMap[kind]}</div><div><div class="toast-msg">${esc(msg)}</div>${sub ? `<div class="toast-sub">${esc(sub)}</div>` : ''}</div>`;
  wrap.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 3400);
}

function openDrawer(html) {
  let scrim = document.querySelector('.scrim'), drawer = document.querySelector('.drawer');
  if (!scrim) { scrim = document.createElement('div'); scrim.className = 'scrim'; document.body.appendChild(scrim); scrim.onclick = closeDrawer; }
  if (!drawer) { drawer = document.createElement('div'); drawer.className = 'drawer'; document.body.appendChild(drawer); }
  drawer.innerHTML = html;
  requestAnimationFrame(() => { scrim.classList.add('open'); drawer.classList.add('open'); });
  drawer.querySelectorAll('.drawer-tab').forEach(tab => {
    tab.onclick = () => {
      drawer.querySelectorAll('.drawer-tab').forEach(t => t.classList.remove('active'));
      drawer.querySelectorAll('.drawer-pane').forEach(p => p.style.display = 'none');
      tab.classList.add('active');
      const pane = drawer.querySelector('#pane-' + tab.dataset.tab);
      if (pane) pane.style.display = 'block';
    };
  });
}
function closeDrawer() {
  document.querySelector('.scrim')?.classList.remove('open');
  document.querySelector('.drawer')?.classList.remove('open');
}

function openModal(html) {
  let scrim = document.querySelector('.modal-scrim');
  if (!scrim) { scrim = document.createElement('div'); scrim.className = 'modal-scrim'; document.body.appendChild(scrim); scrim.onclick = e => { if (e.target === scrim) closeModal(); }; }
  scrim.innerHTML = `<div class="modal">${html}</div>`;
  requestAnimationFrame(() => scrim.classList.add('open'));
}
function closeModal() { document.querySelector('.modal-scrim')?.classList.remove('open'); }

/* ============================================================
   SHELL
   ============================================================ */
function renderShell() {
  const app = document.getElementById('app');
  const navHtml = NAV.map(sec => `
    <div class="nav-section-label">${sec.section}</div>
    ${sec.items.map(it => `
      <a class="nav-item ${state.route === it.id ? 'active' : ''}" data-route="${it.id}" tabindex="0" title="${it.label}">
        ${I[it.icon]}
        <span class="nav-label">${it.label}</span>
        ${it.dot && state.route !== it.id ? '<span class="nav-dot"></span>' : ''}
        ${it.badge ? `<span class="nav-badge">${it.badge}</span>` : ''}
      </a>`).join('')}
  `).join('');

  app.innerHTML = `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-logo">${brandMark()}</div>
        <div class="brand-text">
          <span class="brand-name" id="brandName">${DB.brand.name}</span>
          <span class="brand-sub">${DB.brand.company}</span>
        </div>
        <button class="collapse-btn" id="collapseBtn" aria-label="Collapse sidebar">${I.chevL}</button>
      </div>
      <div class="side-search"><span>${I.search}</span><input placeholder="Search..." aria-label="Search" id="globalSearch"><kbd>⌘K</kbd></div>
      <nav class="nav">${navHtml}</nav>
    </aside>
    <div class="main">
      <header class="topbar">
        <button class="icon-btn mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">${I.menu}</button>
        <div>
          <div class="topbar-title" id="topbarTitle">Overview</div>
        </div>
        <div class="topbar-spacer"></div>
        <button class="pill-select hide-mobile" id="branchSel">${I.building}<span class="dim">Branch</span> <b>Surat (HO)</b> ${I.chevD}</button>
        <button class="pill-select hide-mobile" id="fySel">${I.cal}<b>${DB.financialYear}</b> ${I.chevD}</button>
        <button class="icon-btn" id="topSearch" aria-label="Search">${I.search}</button>
        <button class="icon-btn" id="quickAdd" aria-label="Quick add">${I.plus}</button>
        <button class="icon-btn" id="notifBtn" aria-label="Notifications">${I.bell}<span class="ping"></span></button>
        <button class="icon-btn" id="themeBtn" aria-label="Toggle theme">${I.shield}</button>
        <div class="avatar" id="avatarBtn" title="${DB.user.name} — ${DB.user.role}">${DB.user.initials}</div>
      </header>
      <main class="canvas" id="canvas"></main>
    </div>
    <nav class="mobile-nav">
      ${['overview','pipeline','credentials','calendar','notifications'].map(id => {
        const it = NAV.flatMap(s => s.items).find(x => x.id === id);
        return `<a data-route="${id}" class="${state.route === id ? 'active' : ''}">${I[it.icon]}<span>${it.label.split(' ')[0]}</span></a>`;
      }).join('')}
    </nav>
    <button class="fab" id="fabBtn" aria-label="New enquiry">${I.plus}</button>
  `;

  // wire events
  app.querySelectorAll('[data-route]').forEach(a => a.onclick = () => { navigate(a.dataset.route); state.mobileOpen = false; app.classList.remove('mobile-open'); });
  document.getElementById('collapseBtn').onclick = () => { state.collapsed = !state.collapsed; app.classList.toggle('collapsed', state.collapsed); };
  document.getElementById('mobileMenuBtn').onclick = () => { state.mobileOpen = !state.mobileOpen; app.classList.toggle('mobile-open', state.mobileOpen); };
  document.getElementById('notifBtn').onclick = () => navigate('notifications');
  document.getElementById('quickAdd').onclick = () => quickAddMenu();
  document.getElementById('fabBtn').onclick = () => openEnquiryModal();
  document.getElementById('themeBtn').onclick = toggleTheme;
  document.getElementById('topSearch').onclick = () => document.getElementById('globalSearch')?.focus();
  document.getElementById('avatarBtn').onclick = () => navigate('settings');
  document.getElementById('globalSearch').addEventListener('keydown', e => { if (e.key === 'Enter') toast('Search', `Searching for "${e.target.value}" across all modules`, 'info'); });
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  toast(state.theme === 'dark' ? 'Dark theme enabled' : 'Light theme enabled', '', 'info');
  if (VIEWS[state.route]) VIEWS[state.route](document.getElementById('canvas'));
}

function quickAddMenu() {
  openModal(`
    <div class="modal-head"><div class="modal-title">Quick Add</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <div class="grid" style="grid-template-columns:1fr 1fr">
        ${[['New Enquiry','enquiry'],['Add Credential','cred'],['New Quotation','quote'],['Add Customer','customer'],['New Tender','tender'],['Upload Document','document']].map(([t,ic]) =>
          `<button class="btn btn-ghost" style="justify-content:flex-start;padding:14px" onclick="closeModal();${ic==='cred'?'openCredentialModal()':ic==='enquiry'?'openEnquiryModal()':`toast('${t}','Form opened','info')`}">${I[ic]}${t}</button>`).join('')}
      </div>
    </div>`);
}

function navigate(route) {
  state.route = route;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.route === route));
  document.querySelectorAll('.nav-item .nav-dot').forEach(d => d.remove());
  document.querySelectorAll('.mobile-nav a').forEach(a => a.classList.toggle('active', a.dataset.route === route));
  const title = NAV.flatMap(s => s.items).find(i => i.id === route)?.label || 'Overview';
  const tt = document.getElementById('topbarTitle'); if (tt) tt.textContent = title;
  const canvas = document.getElementById('canvas');
  canvas.scrollTop = 0;
  (VIEWS[route] || VIEWS.overview)(canvas);
  window.scrollTo(0, 0);
}

/* helper builders */
function pageHead(title, desc, actions = '') {
  return `<div class="page-head">
    <div class="page-head-l">
      <div class="topbar-breadcrumb">Home ${I.chevR} <span style="color:var(--text-secondary)">${title}</span></div>
      <div class="page-title">${title}</div>
      ${desc ? `<div class="page-desc">${desc}</div>` : ''}
    </div>
    <div class="page-head-r">${actions}</div>
  </div>`;
}
function statusBadge(status) {
  const map = {
    valid: ['badge-valid','Valid'], expiring: ['badge-expiring','Expiring Soon'], expired: ['badge-expired','Expired'],
    renewal: ['badge-renewal','Renewal Initiated'], submitted: ['badge-submitted','Submitted'], review: ['badge-review','Under Review'],
    observation: ['badge-observation','Observation Raised'], approved: ['badge-approved','Approved'], suspended: ['badge-suspended','Suspended'],
    won: ['badge-won','Won'], lost: ['badge-lost','Lost'], overdue: ['badge-overdue','Overdue'],
  };
  const [cls, label] = map[status] || ['badge-neutral', status];
  return `<span class="badge ${cls}"><span class="dot"></span>${label}</span>`;
}
function dotForDays(d) {
  if (d < 7) return 'var(--danger)'; if (d < 30) return '#F57C1F'; if (d < 60) return 'var(--warning)'; return 'var(--primary-dark)';
}

/* ============================================================
   VIEWS
   ============================================================ */
const VIEWS = {};

/* ---------- OVERVIEW ---------- */
const KPI_ROUTE = { enq: 'enquiries', quo: 'quotations', ord: 'pipeline', cnv: 'analytics', due: 'analytics' };
const PERIOD_FACTOR = { 'Last 7 days': 0.25, 'Last 30 days': 1, 'This quarter': 3, 'This FY': 12 };
VIEWS.overview = function (c) {
  const actions = `
    <label class="pill-select hide-sm" style="cursor:pointer">${I.cal}<select id="ovPeriod" onchange="setOverviewPeriod(this.value)" style="border:none;background:transparent;font-weight:600;font-family:inherit;font-size:inherit;color:inherit;cursor:pointer;outline:none">${Object.keys(PERIOD_FACTOR).map(p => `<option ${p === state.period ? 'selected' : ''}>${p}</option>`).join('')}</select></label>
    <button class="btn btn-ghost hide-sm" onclick="exportOverview()">${I.export}Export</button>
    <button class="btn btn-primary" onclick="openEnquiryModal()">${I.plus}New Enquiry ${I.arrowR}</button>`;

  const factor = PERIOD_FACTOR[state.period] || 1;
  const kpiCards = DB.kpis.map((k, i) => {
    const v = k.id === 'cnv' ? k.value : Math.round(k.value * factor);
    return `
    <div class="card card-pad kpi hoverlift enter enter-${i + 1}" data-kpi="${k.id}" style="cursor:pointer">
      <div class="kpi-top"><span class="kpi-label">${k.label}</span><span class="kpi-ico" title="${k.cmp}">${I.info}</span></div>
      <div class="kpi-val tnum counter" data-base="${k.value}" data-kid="${k.id}" data-target="${v}" data-format="${k.fmt}">0</div>
      <div class="kpi-foot">
        <span class="delta ${k.dir}">${k.dir === 'up' ? I.up : I.down}${k.delta}%</span>
        <span class="kpi-cmp">${k.cmp}</span>
      </div>
      <a class="kpi-link" data-route="${KPI_ROUTE[k.id]}" onclick="event.stopPropagation();navigate('${KPI_ROUTE[k.id]}')">View Details ${I.arrowR}</a>
      <div class="kpi-spark" data-spark='${JSON.stringify(k.spark)}' data-dir="${k.dir}"></div>
    </div>`;
  }).join('');

  c.innerHTML = `
    ${pageHead('Overview', 'Laboratory performance, compliance health and credential status at a glance.', actions)}
    <div class="grid dash-grid">
      <div class="col-12"><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:16px" class="kpi-carousel" id="kpiRow">${kpiCards}</div></div>

      <div class="col-8">
        <div class="card card-pad enter enter-2" style="height:100%">
          <div class="card-head">
            <div><h3>Enquiry & Revenue Analytics</h3><div class="card-sub">Monthly trend across the CRM funnel</div></div>
            <div class="card-head-r">
              <div class="seg" id="chartSeg">
                <button class="on" data-s="Enquiries received">Enquiries</button>
                <button data-s="Quotation submitted">Quotations</button>
                <button data-s="Orders received">Orders</button>
                <button data-s="Revenue booked">Revenue</button>
              </div>
              <button class="fdrop">${I.filter}Filter</button>
            </div>
          </div>
          <div id="mainChart" style="margin-top:12px"></div>
        </div>
      </div>

      <div class="col-4">
        <div class="card card-pad enter enter-3" style="height:100%">
          <div class="card-head"><h3>Compliance Health</h3><span class="badge badge-valid" style="margin-left:auto"><span class="dot"></span>Good</span></div>
          <div id="gauge" style="margin-top:6px"></div>
          <div class="legend" style="margin-top:14px">
            <div class="legend-row"><span class="lg-dot" style="background:var(--primary)"></span><span class="lg-name">Valid credentials</span><span class="lg-val">${DB.compliance.valid}</span></div>
            <div class="legend-row"><span class="lg-dot" style="background:var(--warning)"></span><span class="lg-name">Expiring soon</span><span class="lg-val">${DB.compliance.expiring}</span></div>
            <div class="legend-row"><span class="lg-dot" style="background:var(--danger)"></span><span class="lg-name">Expired</span><span class="lg-val">${DB.compliance.expired}</span></div>
          </div>
        </div>
      </div>

      <div class="col-4">
        <div class="card card-pad enter" style="height:100%">
          <div class="card-head"><div><h3>Credential Status</h3><div class="card-sub">By category</div></div></div>
          <div style="display:flex;gap:16px;align-items:center;margin-top:8px;flex-wrap:wrap">
            <div id="donut"></div>
            <div class="legend" style="flex:1;min-width:150px">
              ${DB.credentialStatus.map(s => `<div class="legend-row"><span class="lg-dot" style="background:${s.color}"></span><span class="lg-name">${s.name}</span><span class="lg-val">${s.value}</span></div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="col-4">
        <div class="card card-pad enter" style="height:100%">
          <div class="card-head"><h3>Approvals & Certifications</h3><a class="kpi-link" onclick="navigate('approvals')">All ${I.arrowR}</a></div>
          <div style="margin-top:4px">
            ${DB.approvals.slice(0, 5).map(a => `
              <div class="appr-item">
                <div class="appr-main"><div class="appr-name">${a.name}</div><div class="appr-auth">${a.auth} · ${a.cert}</div></div>
                <div class="appr-prog"><div class="prog-track"><span style="width:0" data-w="${a.prog}"></span></div><div class="prog-label">Expiry ${a.expiry}</div></div>
                ${statusBadge(a.status)}
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div class="col-4">
        <div class="card card-pad enter" style="height:100%">
          <div class="card-head"><h3>Upcoming Expiries</h3><a class="kpi-link" onclick="navigate('calendar')">Calendar ${I.arrowR}</a></div>
          <div class="timeline" style="margin-top:4px">
            ${renderExpiryTimeline(DB.expiries.slice(0, 6))}
          </div>
        </div>
      </div>
    </div>
  `;

  // charts
  requestAnimationFrame(() => {
    animateCounters(c);
    drawMainChart('Enquiries received');
    gaugeChart(document.getElementById('gauge'), DB.compliance.score, [
      { value: DB.compliance.valid, color: 'var(--primary)' },
      { value: DB.compliance.expiring, color: 'var(--warning)' },
      { value: DB.compliance.expired, color: 'var(--danger)' },
    ]);
    animateCounters(document.getElementById('gauge'));
    donutChart(document.getElementById('donut'), DB.credentialStatus.map(s => ({ value: s.value, color: s.color })), { size: 150, stroke: 22, center: DB.credentialStatus.reduce((a, s) => a + s.value, 0), centerSub: 'Total' });
    c.querySelectorAll('.kpi-spark').forEach(el => {
      const vals = JSON.parse(el.dataset.spark);
      sparkline(el, vals, el.dataset.dir === 'up' ? 'var(--primary)' : 'var(--danger)');
    });
    setTimeout(() => c.querySelectorAll('.prog-track span').forEach(s => s.style.width = s.dataset.w + '%'), 200);
  });

  // chart segment toggle
  c.querySelector('#chartSeg').addEventListener('click', e => {
    const btn = e.target.closest('button'); if (!btn) return;
    c.querySelectorAll('#chartSeg button').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    drawMainChart(btn.dataset.s);
  });

  c.querySelectorAll('[data-kpi]').forEach(card => card.onclick = () => navigate(KPI_ROUTE[card.dataset.kpi] || 'analytics'));
};

function setOverviewPeriod(period) {
  state.period = period;
  const factor = PERIOD_FACTOR[period] || 1;
  const row = document.getElementById('kpiRow');
  row.querySelectorAll('.kpi-val').forEach(el => {
    const base = +el.dataset.base;
    el.dataset.target = el.dataset.kid === 'cnv' ? base : Math.round(base * factor);
    el.textContent = '0';
  });
  animateCounters(row);
  toast('Period updated', period, 'info');
  logAudit('View', 'Overview', `Dashboard period changed to "${period}"`);
}

function exportOverview() {
  const factor = PERIOD_FACTOR[state.period] || 1;
  const rows = [['Metric', 'Value', 'Change %', 'Direction', 'Period'],
    ...DB.kpis.map(k => [k.label, k.id === 'cnv' ? k.value + '%' : (k.fmt === 'inr' ? inr(k.value * factor) : Math.round(k.value * factor)), k.delta, k.dir, state.period])];
  downloadCSV(rows, 'PTH-CRM-overview-kpis.csv');
  logAudit('Export', 'Overview', `Exported dashboard KPIs (${state.period})`);
}

function drawMainChart(seriesName) {
  const revenue = ['Quotation Value','Revenue booked','Payment collected','Revenue'].some(k => seriesName.includes('Revenue') || seriesName.includes(k));
  const isRev = seriesName === 'Revenue booked' || seriesName === 'Revenue';
  areaChart(document.getElementById('mainChart'), {
    labels: DB.months,
    series: [
      { name: seriesName, values: DB.series[seriesName] || DB.series['Enquiries received'] },
      { name: 'Orders received', values: DB.series['Orders received'], color: 'var(--info)' },
    ],
  }, { height: 300, fmtTip: v => isRev ? '₹' + v + 'L' : v });
}

function renderExpiryTimeline(items) {
  return items.map((e, i) => `
    <div class="tl-item" onclick="openExpiryDrawer('${esc(e.name)}')">
      <div class="tl-rail"><span class="tl-dot" style="background:${dotForDays(e.days)}"></span>${i < items.length - 1 ? '<span class="tl-line"></span>' : ''}</div>
      <div class="tl-body"><div class="tl-title">${e.name}</div><div class="tl-meta">${e.cat} · ${e.person}</div></div>
      <div class="tl-right"><div class="tl-days ${e.days < 7 ? 'crit' : e.days < 30 ? 'warn' : ''}">${e.days < 0 ? 'Expired' : e.days + 'd'}</div><div class="tl-meta">${e.expiry}</div></div>
    </div>`).join('');
}

function openExpiryDrawer(name) {
  const e = DB.expiries.find(x => x.name === name) || DB.expiries[0];
  openDrawer(`
    <div class="drawer-head">
      <button class="icon-btn drawer-close" onclick="closeDrawer()">${I.x}</button>
      <div style="font-size:12px;color:var(--text-muted)">${e.cat}</div>
      <div style="font-size:19px;font-weight:600;margin:3px 0 10px">${e.name}</div>
      ${statusBadge(e.status)}
    </div>
    <div class="drawer-tabs">
      <button class="drawer-tab active" data-tab="ov">Overview</button>
      <button class="drawer-tab" data-tab="rn">Renewal</button>
      <button class="drawer-tab" data-tab="tk">Tasks</button>
    </div>
    <div class="drawer-body">
      <div class="drawer-pane" id="pane-ov">
        <div class="kv"><span class="k">Responsible Person</span><span class="v">${e.person}</span></div>
        <div class="kv"><span class="k">Expiry Date</span><span class="v">${e.expiry}</span></div>
        <div class="kv"><span class="k">Remaining Days</span><span class="v">${e.days < 0 ? 'Expired' : e.days + ' days'}</span></div>
        <div class="kv"><span class="k">Priority</span><span class="v"><span class="prio prio-${e.prio === 'high' ? 'high' : e.prio === 'med' ? 'med' : 'low'}">${e.prio}</span></span></div>
        <div class="kv"><span class="k">Renewal Status</span><span class="v">${statusBadge(e.status)}</span></div>
        <button class="btn btn-primary" style="margin-top:16px;width:100%;justify-content:center" onclick="toast('Renewal initiated','Task assigned to ${esc(e.person)}')">Initiate Renewal</button>
      </div>
      <div class="drawer-pane" id="pane-rn" style="display:none"><div class="timeline">${renewalTimeline()}</div></div>
      <div class="drawer-pane" id="pane-tk" style="display:none"><div class="empty"><div class="empty-ico">${I.check}</div><h4>2 open tasks</h4><p>Collect documents · Book calibration slot</p></div></div>
    </div>`);
}
function renewalTimeline() {
  const steps = ['Renewal task created','Documents collected','Application submitted','Fees paid','Query received','Response submitted','Approval received','New certificate uploaded'];
  return steps.map((s, i) => `<div class="tl-item"><div class="tl-rail"><span class="tl-dot" style="background:${i < 4 ? 'var(--primary-dark)' : 'var(--border)'}"></span>${i < steps.length - 1 ? '<span class="tl-line"></span>' : ''}</div><div class="tl-body"><div class="tl-title" style="font-size:12.5px">${s}</div><div class="tl-meta">${i < 4 ? 'Completed' : 'Pending'}</div></div></div>`).join('');
}

/* ---------- CRM PIPELINE ---------- */
VIEWS.pipeline = function (c) {
  const cols = DB.pipeline.columns;
  const actions = `<button class="btn btn-ghost hide-sm">${I.filter}Filter</button><button class="btn btn-primary" onclick="openEnquiryModal()">${I.plus}New Lead</button>`;
  const colHtml = cols.map(col => {
    const leads = DB.pipeline.leads.filter(l => l.col === col.id);
    const total = leads.reduce((a, l) => a + l.val, 0);
    return `
      <div class="kcol">
        <div class="kcol-head"><span class="kdot" style="background:${col.color}"></span><h4>${col.name}</h4><span class="kcount">${leads.length}</span></div>
        <div class="kcol-val">${inr(total)}</div>
        <div class="kcards" data-col="${col.id}">${leads.map(kanbanCard).join('')}</div>
      </div>`;
  }).join('');
  c.innerHTML = `${pageHead('CRM Pipeline', 'Drag leads between stages. Moving to Won requests PO details; Lost requests a reason.', actions)}
    <div class="kanban enter">${colHtml}</div>`;
  wireKanban(c);
};
function kanbanCard(l) {
  return `<div class="kcard" draggable="true" data-id="${l.id}" onclick="openLeadDrawer('${l.id}')">
    <div class="kcard-top"><div><div class="kcard-cust">${l.cust}</div><div class="kcard-proj">${l.proj}</div></div>${l.prio === 'high' ? '<span class="prio prio-high" style="margin-left:auto">High</span>' : ''}</div>
    <span class="kcard-tag">${l.cat}</span>
    <div class="kcard-meta"><span class="kcard-val">${inr(l.val)}</span><span>·</span><span>${l.follow}</span></div>
    <div class="kcard-foot"><span class="mini-avatar">${l.person}</span><div class="prob-bar"><span style="width:${l.prob}%"></span></div><span style="font-size:11px;color:var(--text-muted)">${l.prob}%</span></div>
  </div>`;
}
function wireKanban(c) {
  let dragged = null;
  c.querySelectorAll('.kcard').forEach(card => {
    card.addEventListener('dragstart', () => { dragged = card; card.classList.add('dragging'); });
    card.addEventListener('dragend', () => { card.classList.remove('dragging'); dragged = null; });
  });
  c.querySelectorAll('.kcards').forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('drag-over');
      if (!dragged) return;
      const id = dragged.dataset.id, newCol = zone.dataset.col;
      const lead = DB.pipeline.leads.find(l => l.id === id);
      const move = () => { lead.col = newCol; zone.appendChild(dragged); refreshColumnTotals(c); };
      if (newCol === 'lost') {
        openModal(`<div class="modal-head"><div class="modal-title">Mark as Lost</div></div><div class="modal-body"><div class="field"><label>Reason for loss <span class="req">*</span></label><select class="select" id="lostReason"><option>Price too high</option><option>Competitor selected</option><option>Project cancelled</option><option>No accreditation match</option><option>Delayed response</option></select></div></div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal();VIEWS.pipeline(document.getElementById('canvas'))">Cancel</button><button class="btn btn-primary" onclick="closeModal();toast('Lead moved to Lost','Reason logged to activity trail','info')">Confirm</button></div>`);
        move();
      } else if (newCol === 'won') {
        openModal(`<div class="modal-head"><div class="modal-title">Order Won — Purchase Order Details</div></div><div class="modal-body"><div class="field"><label>PO Number <span class="req">*</span></label><input class="input" placeholder="e.g. PO/2026/0093"></div><div class="field"><label>PO Value</label><input class="input" value="${inr(lead.val)}"></div></div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal();VIEWS.pipeline(document.getElementById('canvas'))">Cancel</button><button class="btn btn-lime" onclick="closeModal();toast('Order confirmed','Job card generation queued')">Confirm Won</button></div>`);
        move();
      } else move();
      const stageName = DB.pipeline.columns.find(x => x.id === newCol).name;
      toast('Lead moved', `${lead.cust} → ${stageName}`, 'info');
      logAudit('Status Change', 'CRM Pipeline', `${lead.cust} moved to ${stageName}`);
    });
  });
}
function refreshColumnTotals(c) {
  c.querySelectorAll('.kcol').forEach(col => {
    const zone = col.querySelector('.kcards');
    const ids = [...zone.querySelectorAll('.kcard')].map(k => k.dataset.id);
    const leads = DB.pipeline.leads.filter(l => ids.includes(l.id));
    col.querySelector('.kcount').textContent = leads.length;
    col.querySelector('.kcol-val').textContent = inr(leads.reduce((a, l) => a + l.val, 0));
  });
}
function openLeadDrawer(id) {
  const l = DB.pipeline.leads.find(x => x.id === id);
  openDrawer(`
    <div class="drawer-head"><button class="icon-btn drawer-close" onclick="closeDrawer()">${I.x}</button>
      <div style="font-size:12px;color:var(--text-muted)">${l.id} · ${l.cat}</div>
      <div style="font-size:19px;font-weight:600;margin:3px 0 4px">${l.cust}</div>
      <div class="page-desc">${l.proj}</div></div>
    <div class="drawer-tabs"><button class="drawer-tab active" data-tab="ov">Overview</button><button class="drawer-tab" data-tab="ac">Activity</button></div>
    <div class="drawer-body">
      <div class="drawer-pane" id="pane-ov">
        <div class="kv"><span class="k">Expected Value</span><span class="v">${inr(l.val)}</span></div>
        <div class="kv"><span class="k">Probability</span><span class="v">${l.prob}%</span></div>
        <div class="kv"><span class="k">Assigned To</span><span class="v">${l.person}</span></div>
        <div class="kv"><span class="k">Next Follow-up</span><span class="v">${l.follow}</span></div>
        <div class="kv"><span class="k">Priority</span><span class="v"><span class="prio prio-${l.prio === 'high' ? 'high' : l.prio === 'med' ? 'med' : 'low'}">${l.prio}</span></span></div>
        <button class="btn btn-primary" style="margin-top:16px;width:100%;justify-content:center" onclick="toast('Quotation started','Draft created for ${esc(l.cust)}')">Prepare Quotation</button>
      </div>
      <div class="drawer-pane" id="pane-ac" style="display:none"><div class="timeline">${['Enquiry received','Requirement reviewed','Site visit scheduled','Quotation drafted'].map((s,i)=>`<div class="tl-item"><div class="tl-rail"><span class="tl-dot" style="background:var(--primary-dark)"></span>${i<3?'<span class="tl-line"></span>':''}</div><div class="tl-body"><div class="tl-title" style="font-size:12.5px">${s}</div><div class="tl-meta">2 days ago</div></div></div>`).join('')}</div></div>
    </div>`);
}

/* ---------- CREDENTIALS ---------- */
let credSort = { key: 'days', dir: 1 };
VIEWS.credentials = function (c) {
  const actions = `<button class="btn btn-ghost hide-sm">${I.upload}Bulk Upload</button><button class="btn btn-ghost hide-sm">${I.export}Export</button><button class="btn btn-primary" onclick="openCredentialModal()">${I.plus}Add Credential</button>`;
  const total = DB.credentials.length;
  const valid = DB.credentials.filter(x => x.status === 'valid').length;
  const exp90 = DB.credentials.filter(x => x.days >= 0 && x.days <= 90).length;
  const renew = DB.credentials.filter(x => x.status === 'renewal').length;
  const expired = DB.credentials.filter(x => x.status === 'expired').length;
  const missing = 6;
  c.innerHTML = `${pageHead('Credentials', 'Central repository for all laboratory legal, accreditation and calibration credentials.', actions)}
    <div class="stat-strip enter">
      <div class="stat-chip"><div class="sc-val tnum">${total}</div><div class="sc-label">Total credentials</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--primary-dark)">${valid}</div><div class="sc-label"><span class="dot" style="background:var(--primary-dark)"></span>Valid</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--warning)">${exp90}</div><div class="sc-label"><span class="dot" style="background:var(--warning)"></span>Expiring in 90 days</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${renew}</div><div class="sc-label"><span class="dot" style="background:var(--info)"></span>Renewal in progress</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--danger)">${expired}</div><div class="sc-label"><span class="dot" style="background:var(--danger)"></span>Expired</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${missing}</div><div class="sc-label"><span class="dot" style="background:var(--text-muted)"></span>Missing mandatory</div></div>
    </div>
    <div class="filter-bar enter">
      <div class="filter-search">${I.search}<input placeholder="Search credentials..." id="credSearch"></div>
      <button class="fdrop">Category ${I.chevD}</button>
      <button class="fdrop">Status ${I.chevD}</button>
      <button class="fdrop">Branch ${I.chevD}</button>
      <button class="fdrop">Issuing Authority ${I.chevD}</button>
      <button class="fdrop">Responsible ${I.chevD}</button>
    </div>
    <div class="card enter"><div class="tbl-wrap"><table class="tbl" id="credTable">
      <thead><tr>
        <th style="width:36px"><span class="chk" onclick="toggleAllRows(this)"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span></th>
        <th data-k="id">ID <span class="sort-ico">↕</span></th>
        <th data-k="name">Credential <span class="sort-ico">↕</span></th>
        <th data-k="cat">Category</th>
        <th data-k="auth">Issuing Authority</th>
        <th data-k="branch">Branch</th>
        <th data-k="expiry">Expiry <span class="sort-ico">↕</span></th>
        <th data-k="days">Remaining <span class="sort-ico">↕</span></th>
        <th data-k="person">Responsible</th>
        <th data-k="status">Status</th>
        <th>Verified</th>
        <th></th>
      </tr></thead>
      <tbody id="credBody"></tbody>
    </table></div></div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;font-size:12.5px;color:var(--text-secondary)">
      <span>Showing <b>${total}</b> credentials</span>
      <div style="display:flex;gap:6px"><button class="btn btn-ghost btn-sm">${I.chevL}</button><button class="btn btn-primary btn-sm">1</button><button class="btn btn-ghost btn-sm">2</button><button class="btn btn-ghost btn-sm">${I.chevR}</button></div>
    </div>`;
  renderCredRows();
  c.querySelectorAll('#credTable thead th[data-k]').forEach(th => th.onclick = () => {
    const k = th.dataset.k; credSort.dir = credSort.key === k ? -credSort.dir : 1; credSort.key = k; renderCredRows();
  });
  c.querySelector('#credSearch').addEventListener('input', e => renderCredRows(e.target.value));
};
function renderCredRows(q = '') {
  const body = document.getElementById('credBody'); if (!body) return;
  let rows = DB.credentials.filter(x => !q || (x.name + x.auth + x.id + x.person).toLowerCase().includes(q.toLowerCase()));
  rows.sort((a, b) => (a[credSort.key] > b[credSort.key] ? 1 : -1) * credSort.dir);
  body.innerHTML = rows.map(r => `
    <tr onclick="openCredDrawer('${r.id}')">
      <td onclick="event.stopPropagation()"><span class="chk" onclick="this.classList.toggle('on');this.closest('tr').classList.toggle('selected')"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span></td>
      <td class="cell-dim tnum">${r.id}</td>
      <td class="cell-strong">${r.name}</td>
      <td class="cell-dim">${r.cat}</td>
      <td class="cell-dim">${r.auth}</td>
      <td class="cell-dim">${r.branch}</td>
      <td class="tnum">${r.expiry}</td>
      <td class="tnum">${r.days > 9000 ? '—' : r.days < 0 ? `<span style="color:var(--danger)">Expired</span>` : `<span style="display:inline-flex;align-items:center;gap:6px"><span style="width:7px;height:7px;border-radius:50%;background:${dotForDays(r.days)}"></span>${r.days}d</span>`}</td>
      <td class="cell-dim">${r.person}</td>
      <td>${statusBadge(r.status)}</td>
      <td>${r.verified ? `<span style="color:var(--primary-dark)" title="Verified">${I.check}</span>` : `<span style="color:var(--text-muted)" title="Pending">${I.clock}</span>`}</td>
      <td onclick="event.stopPropagation()"><div class="row-actions"><button class="mini-act" onclick="openCredDrawer('${r.id}')" title="View">${I.eye}</button><button class="mini-act" title="Edit">${I.edit}</button><button class="mini-act" title="More">${I.more}</button></div></td>
    </tr>`).join('');
}
function toggleAllRows(el) {
  el.classList.toggle('on');
  const on = el.classList.contains('on');
  document.querySelectorAll('#credBody .chk').forEach(chk => { chk.classList.toggle('on', on); chk.closest('tr').classList.toggle('selected', on); });
}
function openCredDrawer(id) {
  const r = DB.credentials.find(x => x.id === id);
  openDrawer(`
    <div class="drawer-head"><button class="icon-btn drawer-close" onclick="closeDrawer()">${I.x}</button>
      <div style="font-size:12px;color:var(--text-muted)">${r.id} · ${r.cat}</div>
      <div style="font-size:19px;font-weight:600;margin:3px 0 10px">${r.name}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${statusBadge(r.status)}<span class="badge badge-neutral"><span class="dot"></span>${r.conf}</span></div></div>
    <div class="drawer-tabs">
      <button class="drawer-tab active" data-tab="ov">Overview</button>
      <button class="drawer-tab" data-tab="doc">Document</button>
      <button class="drawer-tab" data-tab="rn">Renewal History</button>
      <button class="drawer-tab" data-tab="ck">Checklist</button>
      <button class="drawer-tab" data-tab="au">Audit Trail</button>
    </div>
    <div class="drawer-body">
      <div class="drawer-pane" id="pane-ov">
        <div class="kv"><span class="k">Issuing Authority</span><span class="v">${r.auth}</span></div>
        <div class="kv"><span class="k">Certificate Number</span><span class="v tnum">${r.cert}</span></div>
        <div class="kv"><span class="k">Branch</span><span class="v">${r.branch}</span></div>
        <div class="kv"><span class="k">Issue Date</span><span class="v tnum">${r.issue}</span></div>
        <div class="kv"><span class="k">Expiry Date</span><span class="v tnum">${r.expiry}</span></div>
        <div class="kv"><span class="k">Remaining</span><span class="v">${r.days > 9000 ? 'No expiry' : r.days < 0 ? 'Expired' : r.days + ' days'}</span></div>
        <div class="kv"><span class="k">Responsible Person</span><span class="v">${r.person}</span></div>
        <div class="kv"><span class="k">Verification</span><span class="v">${r.verified ? 'Verified' : 'Pending verification'}</span></div>
        <div class="kv"><span class="k">Confidentiality</span><span class="v">${r.conf}</span></div>
        <div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-primary" style="flex:1;justify-content:center" onclick="toast('Renewal initiated','Assigned to ${esc(r.person)}')">Initiate Renewal</button><button class="btn btn-ghost">${I.export}</button></div>
      </div>
      <div class="drawer-pane" id="pane-doc" style="display:none">
        <div style="aspect-ratio:1/1.25;background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;display:grid;place-items:center;color:var(--text-muted);margin-bottom:12px"><div style="text-align:center">${I.file}<div style="margin-top:8px;font-size:12px">${r.cert}.pdf · PDF preview</div></div></div>
        <div style="display:flex;gap:8px"><button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center">${I.export}Download</button><button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center">${I.upload}Replace</button><button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center">Compare</button></div>
        <div style="margin-top:14px;font-size:12px;color:var(--text-secondary)">Version history</div>
        <div class="kv"><span class="k">v3 · Current</span><span class="v">${r.issue}</span></div>
        <div class="kv"><span class="k">v2</span><span class="v" style="color:var(--text-muted)">2022-03-11 (obsolete)</span></div>
      </div>
      <div class="drawer-pane" id="pane-rn" style="display:none"><div class="timeline">${renewalTimeline()}</div></div>
      <div class="drawer-pane" id="pane-ck" style="display:none">${['Application form','Fee payment receipt','Scope document','Signatory approval','Equipment list'].map(x=>`<div class="kv"><span class="v">${x}</span><span class="v" style="margin-left:auto;color:var(--primary-dark)">${I.check}</span></div>`).join('')}</div>
      <div class="drawer-pane" id="pane-au" style="display:none"><div class="timeline">${['Created by K. Patel','Verified by R. Mehta','Document uploaded','Status set to Valid'].map((s,i)=>`<div class="tl-item"><div class="tl-rail"><span class="tl-dot" style="background:var(--primary-dark)"></span>${i<3?'<span class="tl-line"></span>':''}</div><div class="tl-body"><div class="tl-title" style="font-size:12.5px">${s}</div><div class="tl-meta">${r.issue} · 10:${20+i} AM</div></div></div>`).join('')}</div></div>
    </div>`);
}

/* ---------- ADD CREDENTIAL MODAL ---------- */
function openCredentialModal() {
  openModal(`
    <div class="modal-head"><div class="modal-title">Add Credential</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <div class="field" id="f-name"><label>Credential Name <span class="req">*</span></label><input class="input" id="cName" placeholder="e.g. NABL Accreditation Certificate"><div class="field-err">${I.info}This field is required</div></div>
      <div class="form-grid">
        <div class="field"><label>Category</label><select class="select">${['NABL & ISO','Government Approvals','Legal Documents','Client Registrations','Staff Credentials','Equipment Calibration','Financial Credentials','Accreditation Scope'].map(x=>`<option>${x}</option>`).join('')}</select></div>
        <div class="field"><label>Branch</label><select class="select">${DB.branches.map(x=>`<option>${x}</option>`).join('')}</select></div>
      </div>
      <div class="field" id="f-cert"><label>Certificate Number <span class="req">*</span></label><input class="input" id="cCert" placeholder="e.g. TC-8421"><div class="field-err">${I.info}This field is required</div></div>
      <div class="form-grid">
        <div class="field"><label>Issue Date</label><input class="input" type="date"></div>
        <div class="field"><label>Expiry Date</label><input class="input" type="date"></div>
      </div>
      <div class="field"><label>Responsible Person</label><select class="select">${DB.staff.map(s=>`<option>${s.name}</option>`).join('')}</select></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="submitCredential()">${I.check}Save Credential</button></div>`);
}
function submitCredential() {
  let ok = true;
  ['cName', 'cCert'].forEach(id => {
    const input = document.getElementById(id), field = input.closest('.field');
    if (!input.value.trim()) { field.classList.add('show-err'); input.classList.add('shake'); setTimeout(() => input.classList.remove('shake'), 350); ok = false; }
    else field.classList.remove('show-err');
  });
  if (!ok) return;
  const cn = document.getElementById('cName').value.trim();
  closeModal();
  toast('Credential saved', 'Added to repository and expiry tracker');
  logAudit('Create', 'Credentials', `Credential "${cn}" added to repository`);
}

/* ---------- APPROVALS ---------- */
VIEWS.approvals = function (c) {
  const stages = DB.approvalStages;
  const actions = `<button class="btn btn-ghost hide-sm">${I.filter}Filter</button><button class="btn btn-primary">${I.plus}New Approval</button>`;
  c.innerHTML = `${pageHead('Approvals', 'Track government, PSU, railway, metro and client registrations through their workflow.', actions)}
    <div class="grid dash-grid enter" style="margin-bottom:16px">
      ${[['In Progress',DB.approvalWorkflow.filter(a=>a.stage<10).length,'var(--info)'],['Approved',DB.approvalWorkflow.filter(a=>a.stage===10||a.stage===11).length,'var(--primary-dark)'],['Query Raised',1,'var(--warning)'],['Renewal Due',DB.approvals.filter(a=>a.status==='expiring').length,'var(--danger)']].map(([l,v,col])=>
        `<div class="col-3"><div class="card card-pad kpi hoverlift"><span class="kpi-label">${l}</span><div class="kpi-val tnum" style="color:${col}">${v}</div></div></div>`).join('')}
    </div>
    <div class="card card-pad enter" style="margin-bottom:16px">
      <div class="card-head"><h3>Approval Workflow Board</h3><div class="card-sub" style="margin-left:auto">Horizontal stage progression</div></div>
      <div style="margin-top:14px;display:flex;flex-direction:column;gap:16px">
        ${DB.approvalWorkflow.map(a => approvalRow(a, stages)).join('')}
      </div>
    </div>
    <div class="card enter"><div class="card-pad card-head"><h3>Approval Records</h3></div><div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Authority</th><th>Approved Service</th><th>Current Stage</th><th>Responsible</th><th>Progress</th></tr></thead>
      <tbody>${DB.approvalWorkflow.map(a => `<tr><td class="cell-strong">${a.name}</td><td class="cell-dim">${a.service}</td><td>${statusBadge(a.stage >= 10 ? 'approved' : a.stage === 5 ? 'submitted' : a.stage === 6 ? 'observation' : 'review')}</td><td class="cell-dim">${a.person}</td><td class="tnum">${Math.round(a.stage / 12 * 100)}%</td></tr>`).join('')}</tbody>
    </table></div></div>`;
  requestAnimationFrame(() => setTimeout(() => c.querySelectorAll('.stage-fill').forEach(f => f.style.width = f.dataset.w + '%'), 150));
};
function approvalRow(a, stages) {
  const pct = a.stage / (stages.length - 1) * 100;
  return `<div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><div class="appr-ico">${I.approval}</div><div style="flex:1"><div class="appr-name">${a.name}</div><div class="appr-auth">${a.auth} · ${a.service}</div></div><span class="badge ${a.stage >= 10 ? 'badge-approved' : 'badge-review'}"><span class="dot"></span>${stages[a.stage]}</span></div>
    <div style="position:relative;height:6px;background:var(--surface-soft);border-radius:4px;overflow:hidden"><div class="stage-fill" style="height:100%;width:0;background:var(--primary);border-radius:4px;transition:width 700ms cubic-bezier(0.22,0.61,0.36,1)" data-w="${pct}"></div></div>
    <div style="display:flex;justify-content:space-between;margin-top:5px;font-size:10.5px;color:var(--text-muted)"><span>Requirement</span><span>Submitted</span><span>Audit</span><span>Approved</span></div>
  </div>`;
}

/* ---------- CERTIFICATIONS ---------- */
VIEWS.certifications = function (c) {
  const flow = ['Draft','Result Entry','Technical Review','Quality Review','Authorised Signatory Approval','Digital Signature','Issued'];
  c.innerHTML = `${pageHead('Certifications', 'Organisation accreditation certificates and customer-facing test / calibration certificates.', `<button class="btn btn-primary">${I.plus}New Certificate</button>`)}
    <div class="grid dash-grid">
      <div class="col-6"><div class="card card-pad enter" style="height:100%"><div class="card-head"><h3>Organisation Certificates</h3></div>
        <div style="margin-top:6px">${DB.certificates.org.map(o => `<div class="appr-item"><div class="appr-ico">${I.cert}</div><div class="appr-main"><div class="appr-name">${o.name}</div><div class="appr-auth">${o.authority} · ${o.num}</div></div><div style="text-align:right"><div style="margin-bottom:4px">${statusBadge(o.status)}</div><div style="font-size:11px;color:var(--text-muted)" class="tnum">${o.expiry}</div></div></div>`).join('')}</div>
      </div></div>
      <div class="col-6"><div class="card card-pad enter" style="height:100%"><div class="card-head"><h3>Customer Test Certificates</h3><div class="card-sub" style="margin-left:auto">Live workflow</div></div>
        <div class="tbl-wrap" style="margin-top:8px"><table class="tbl"><thead><tr><th>Report</th><th>Client</th><th>Stage</th><th>Signatory</th></tr></thead>
        <tbody>${DB.certificates.customer.map(cu => `<tr><td class="cell-strong">${cu.name}<div class="cell-dim tnum" style="font-size:11px">${cu.num}</div></td><td class="cell-dim">${cu.client}</td><td><span class="badge ${cu.stage === 'Issued' ? 'badge-issued' : 'badge-review'}"><span class="dot"></span>${cu.stage}</span></td><td class="cell-dim">${cu.signatory}</td></tr>`).join('')}</tbody></table></div>
      </div></div>
      <div class="col-12"><div class="card card-pad enter"><div class="card-head"><h3>Certificate Workflow</h3></div>
        <div style="display:flex;align-items:center;gap:0;margin-top:16px;overflow-x:auto;padding-bottom:6px">
          ${flow.map((s, i) => `<div style="display:flex;align-items:center;flex-shrink:0"><div style="display:flex;flex-direction:column;align-items:center;gap:8px"><div style="width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:${i < 5 ? 'var(--primary)' : 'var(--surface-soft)'};color:${i < 5 ? 'var(--black)' : 'var(--text-muted)'};border:1px solid ${i < 5 ? 'var(--primary)' : 'var(--border)'};font-weight:700;font-size:12px">${i + 1}</div><span style="font-size:11px;color:var(--text-secondary);max-width:90px;text-align:center">${s}</span></div>${i < flow.length - 1 ? `<div style="width:40px;height:2px;background:${i < 4 ? 'var(--primary)' : 'var(--border)'};margin:0 4px;margin-bottom:22px"></div>` : ''}</div>`).join('')}
        </div>
        <div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">${['QR Verification','Revision Control','Cancellation Workflow','Superseded Marking','Download Log','Email Dispatch'].map(t => `<span class="badge badge-neutral"><span class="dot"></span>${t}</span>`).join('')}</div>
      </div></div>
    </div>`;
};

/* ---------- PACKAGE BUILDER ---------- */
let pkgSelected = [];
VIEWS.package = function (c) {
  pkgSelected = pkgSelected.length ? pkgSelected : ['d1', 'd2', 'd4', 'd6', 'd8'];
  c.innerHTML = `${pageHead('Credential Package Builder', 'Assemble tender, prequalification and empanelment document packages.', `<button class="btn btn-ghost hide-sm">${I.export}Generate ZIP</button><button class="btn btn-primary">${I.file}Generate Indexed PDF</button>`)}
    <div class="builder enter">
      <div class="card card-pad">
        <div class="card-head"><h3 style="font-size:13.5px">Available Documents</h3></div>
        <div style="margin-top:10px;max-height:520px;overflow-y:auto" id="pkgAvail"></div>
      </div>
      <div class="card card-pad">
        <div class="card-head"><h3 style="font-size:13.5px">Package Contents</h3><span class="card-sub" style="margin-left:auto">Drag to reorder</span></div>
        <div style="margin-top:10px;min-height:400px" id="pkgSelected"></div>
      </div>
      <div class="card card-pad" style="position:sticky;top:80px">
        <div class="card-head"><h3 style="font-size:13.5px">Package Summary</h3></div>
        <div class="field" style="margin-top:12px"><label>Package Name</label><input class="input" value="GMRC Prequalification 2026"></div>
        <div class="field"><label>Tender Number</label><input class="input" value="GMRC/QA/2026/0114"></div>
        <div id="pkgStats" style="margin-top:6px"></div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:14px">
          <button class="btn btn-lime" style="justify-content:center" onclick="toast('Package generated','Indexed PDF with cover page & TOC created')">${I.check}Generate Package</button>
          <label style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text-secondary)"><span class="toggle on" onclick="this.classList.toggle('on')"></span>Add cover page & TOC</label>
          <label style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text-secondary)"><span class="toggle on" onclick="this.classList.toggle('on')"></span>Apply watermark</label>
          <label style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text-secondary)"><span class="toggle" onclick="this.classList.toggle('on')"></span>Digital signature</label>
        </div>
      </div>
    </div>`;
  renderPackage();
};
function renderPackage() {
  const avail = document.getElementById('pkgAvail'), sel = document.getElementById('pkgSelected'), stats = document.getElementById('pkgStats');
  avail.innerHTML = DB.packageDocs.map(d => `<div class="doc-item ${pkgSelected.includes(d.id) ? 'selected-doc' : ''}" onclick="togglePkg('${d.id}')"><div class="doc-ico">${I.file}</div><span class="doc-name">${d.name}</span>${d.status !== 'valid' ? `<span class="prio prio-${d.status === 'expired' ? 'high' : 'med'}">${d.status}</span>` : ''}<span class="doc-add">${pkgSelected.includes(d.id) ? I.check : I.plus}</span></div>`).join('');
  const selDocs = pkgSelected.map(id => DB.packageDocs.find(d => d.id === id)).filter(Boolean);
  sel.innerHTML = selDocs.length ? selDocs.map((d, i) => `<div class="doc-item" draggable="true" data-id="${d.id}"><div class="doc-ico">${i + 1}</div><span class="doc-name">${d.name}</span><button class="mini-act" onclick="togglePkg('${d.id}')">${I.x}</button></div>`).join('') : `<div class="empty"><div class="empty-ico">${I.document}</div><h4>No documents yet</h4><p>Select documents from the left panel</p></div>`;
  const missing = 4 - selDocs.filter(d => ['d1', 'd2', 'd4', 'd8'].includes(d.id)).length;
  const expiring = selDocs.filter(d => d.status === 'expiring').length;
  const expired = selDocs.filter(d => d.status === 'expired').length;
  stats.innerHTML = `
    <div class="pkg-summary-row"><span class="k">Documents selected</span><span class="v">${selDocs.length}</span></div>
    <div class="pkg-summary-row"><span class="k">Mandatory missing</span><span class="v" style="color:${missing > 0 ? 'var(--danger)' : 'var(--primary-dark)'}">${Math.max(0, missing)}</span></div>
    <div class="pkg-summary-row"><span class="k">Expiring documents</span><span class="v" style="color:${expiring ? 'var(--warning)' : 'inherit'}">${expiring}</span></div>
    <div class="pkg-summary-row"><span class="k">Expired documents</span><span class="v" style="color:${expired ? 'var(--danger)' : 'inherit'}">${expired}</span></div>
    <div class="pkg-summary-row"><span class="k">Estimated pages</span><span class="v">${selDocs.length * 3 + 2}</span></div>`;
  // drag reorder
  let dragged = null;
  sel.querySelectorAll('.doc-item[draggable]').forEach(item => {
    item.addEventListener('dragstart', () => { dragged = item; item.style.opacity = '0.4'; });
    item.addEventListener('dragend', () => { dragged = null; item.style.opacity = '1'; renderPackage(); });
    item.addEventListener('dragover', e => { e.preventDefault(); const rect = item.getBoundingClientRect(); const after = e.clientY > rect.top + rect.height / 2; if (dragged && dragged !== item) item.parentNode.insertBefore(dragged, after ? item.nextSibling : item); });
  });
}
function togglePkg(id) { pkgSelected = pkgSelected.includes(id) ? pkgSelected.filter(x => x !== id) : [...pkgSelected, id]; renderPackage(); }

/* ---------- EXPIRY CALENDAR ---------- */
VIEWS.calendar = function (c) {
  const groups = [['Next 7 days', DB.expiries.filter(e => e.days < 7)], ['Next 30 days', DB.expiries.filter(e => e.days >= 7 && e.days < 30)], ['Next 60 days', DB.expiries.filter(e => e.days >= 30 && e.days < 60)], ['Next 90 days', DB.expiries.filter(e => e.days >= 60 && e.days < 90)]];
  c.innerHTML = `${pageHead('Expiry Calendar', 'Upcoming credential, calibration and approval expiries grouped by urgency.', `<div class="seg"><button class="on">Timeline</button><button>Month</button></div>`)}
    <div class="grid dash-grid">
      <div class="col-8"><div class="card card-pad enter"><div class="card-head"><h3>Upcoming Expiries</h3></div>
        <div class="timeline" style="margin-top:6px">${groups.map(([label, items]) => items.length ? `<div class="tl-group-label">${label} · ${items.length}</div>${renderExpiryTimeline(items)}` : '').join('')}</div>
      </div></div>
      <div class="col-4"><div class="card card-pad enter"><div class="card-head"><h3>July 2026</h3><div style="display:flex;gap:4px;margin-left:auto"><button class="mini-act">${I.chevL}</button><button class="mini-act">${I.chevR}</button></div></div>
        <div class="cal-grid" style="margin-top:12px">${['S','M','T','W','T','F','S'].map(d => `<div class="cal-dow">${d}</div>`).join('')}${calDays()}</div>
        <div style="margin-top:14px;display:flex;flex-direction:column;gap:6px">
          <div class="legend-row"><span class="lg-dot" style="background:var(--danger)"></span><span class="lg-name">Critical (< 7 days)</span></div>
          <div class="legend-row"><span class="lg-dot" style="background:var(--warning)"></span><span class="lg-name">Warning (30–60 days)</span></div>
          <div class="legend-row"><span class="lg-dot" style="background:var(--primary-dark)"></span><span class="lg-name">Safe (> 60 days)</span></div>
        </div>
      </div></div>
    </div>`;
};
function calDays() {
  const evts = { 1: 'red', 5: 'orange', 12: 'yellow', 19: 'yellow', 28: 'green' };
  let html = '';
  for (let i = 0; i < 3; i++) html += `<div class="cal-cell muted"><div class="cal-date">${29 + i}</div></div>`;
  for (let d = 1; d <= 31; d++) {
    const ev = evts[d];
    const colMap = { red: 'var(--danger-tint);color:var(--danger)', orange: '#FDEbD8;color:#F57C1F', yellow: 'var(--warning-tint);color:#9a6c00', green: 'var(--primary-tint);color:var(--primary-dark)' };
    html += `<div class="cal-cell ${d === 28 ? 'today' : ''}"><div class="cal-date">${d}</div>${ev ? `<div class="cal-ev" style="background:${colMap[ev]}">Expiry</div>` : ''}</div>`;
  }
  return html;
}

/* ---------- NOTIFICATIONS ---------- */
VIEWS.notifications = function (c) {
  const toneMap = { danger: ['var(--danger-tint)', 'var(--danger)'], warning: ['var(--warning-tint)', '#9a6c00'], primary: ['var(--primary-tint)', 'var(--primary-dark)'], info: ['var(--info-tint)', 'var(--info)'] };
  const icoMap = { alert: I.alert, clock: I.clock, check: I.check, file: I.file, inr: I.inr };
  c.innerHTML = `${pageHead('Notification Centre', 'Compliance alerts, renewal reminders and workflow updates.', `<button class="btn btn-ghost" onclick="document.querySelectorAll('.notif-item').forEach(n=>n.classList.remove('unread'));toast('All marked read','')">Mark all read</button>`)}
    <div class="grid dash-grid">
      <div class="col-8"><div class="card enter">
        <div class="card-pad" style="border-bottom:1px solid var(--border);display:flex;gap:8px"><div class="seg"><button class="on">All</button><button>Unread</button><button>Compliance</button><button>Payments</button></div></div>
        <div style="padding:8px">${DB.notifications.map(n => { const [bg, fg] = toneMap[n.tone]; return `<div class="notif-item ${n.unread ? 'unread' : ''}" onclick="this.classList.remove('unread')"><div class="notif-ico" style="background:${bg};color:${fg}">${icoMap[n.icon]}</div><div class="notif-body"><div class="notif-title">${n.title}</div><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div></div>`; }).join('')}</div>
      </div></div>
      <div class="col-4"><div class="card card-pad enter"><div class="card-head"><h3>Summary</h3></div>
        <div style="margin-top:10px">
          <div class="pkg-summary-row"><span class="k">Unread</span><span class="v" style="color:var(--danger)">3</span></div>
          <div class="pkg-summary-row"><span class="k">Compliance alerts</span><span class="v">2</span></div>
          <div class="pkg-summary-row"><span class="k">Payment reminders</span><span class="v">1</span></div>
          <div class="pkg-summary-row"><span class="k">Workflow updates</span><span class="v">3</span></div>
        </div>
        <div style="margin-top:16px;padding:14px;background:var(--surface-soft);border-radius:12px;border:1px solid var(--border)"><div style="font-size:12px;color:var(--text-secondary)">Delivery channels</div><div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"><span class="badge badge-valid"><span class="dot"></span>Email</span><span class="badge badge-valid"><span class="dot"></span>In-app</span><span class="badge badge-neutral"><span class="dot"></span>SMS</span></div></div>
      </div></div>
    </div>`;
};

/* ---------- ANALYTICS ---------- */
VIEWS.analytics = function (c) {
  c.innerHTML = `${pageHead('Analytics', 'Cross-module reporting for enquiries, revenue and compliance.', `<button class="pill-select">${I.cal}<b>FY 2026–27</b> ${I.chevD}</button><button class="btn btn-primary">${I.export}Export Report</button>`)}
    <div class="grid dash-grid">
      ${[['Total Revenue Booked',5240000,'inr','up',12.4],['Reports Issued',1842,'int','up',8.1],['Avg. Turnaround',3.2,'pct','down',6.0],['Compliance Score',86,'pct','up',6.4]].map((k,i)=>`<div class="col-3"><div class="card card-pad kpi hoverlift enter enter-${i+1}"><span class="kpi-label">${k[0]}</span><div class="kpi-val tnum counter" data-target="${k[1]}" data-format="${k[2]}">0</div><span class="delta ${k[3]}">${k[3]==='up'?I.up:I.down}${k[4]}%</span></div></div>`).join('')}
      <div class="col-8"><div class="card card-pad enter"><div class="card-head"><h3>Revenue vs Collection</h3></div><div id="anChart" style="margin-top:12px"></div></div></div>
      <div class="col-4"><div class="card card-pad enter"><div class="card-head"><h3>Revenue by Service</h3></div><div style="display:flex;gap:14px;align-items:center;margin-top:8px;flex-wrap:wrap"><div id="anDonut"></div><div class="legend" style="flex:1">${[['Material Testing',38,'var(--primary)'],['Geotechnical',24,'var(--info)'],['NDT',20,'var(--primary-dark)'],['Calibration',12,'var(--warning)'],['Inspection',6,'var(--text-muted)']].map(s=>`<div class="legend-row"><span class="lg-dot" style="background:${s[2]}"></span><span class="lg-name">${s[0]}</span><span class="lg-val">${s[1]}%</span></div>`).join('')}</div></div></div></div>
    </div>`;
  requestAnimationFrame(() => {
    animateCounters(c);
    areaChart(document.getElementById('anChart'), { labels: DB.months, series: [{ name: 'Revenue booked', values: DB.series['Revenue booked'] }, { name: 'Payment collected', values: DB.series['Payment collected'], color: 'var(--info)' }] }, { height: 300, fmtTip: v => '₹' + v + 'L' });
    donutChart(document.getElementById('anDonut'), [['Material Testing',38,'var(--primary)'],['Geotechnical',24,'var(--info)'],['NDT',20,'var(--primary-dark)'],['Calibration',12,'var(--warning)'],['Inspection',6,'var(--text-muted)']].map(s => ({ value: s[1], color: s[2] })), { size: 140, stroke: 20, center: '₹52L', centerSub: 'Total' });
  });
};

/* ---------- EQUIPMENT ---------- */
VIEWS.equipment = function (c) {
  c.innerHTML = `${pageHead('Equipment Calibration', 'Calibration validity and traceability for all laboratory instruments.', `<button class="btn btn-primary">${I.plus}Add Equipment</button>`)}
    <div class="card enter"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>ID</th><th>Instrument</th><th>Make</th><th>Last Calibration</th><th>Next Due</th><th>Remaining</th><th>Status</th><th></th></tr></thead>
    <tbody>${DB.equipment.map(e => `<tr><td class="cell-dim tnum">${e.id}</td><td class="cell-strong">${e.name}</td><td class="cell-dim">${e.make}</td><td class="tnum">${e.cal}</td><td class="tnum">${e.due}</td><td class="tnum">${e.days < 0 ? '<span style="color:var(--danger)">Expired</span>' : `<span style="display:inline-flex;align-items:center;gap:6px"><span style="width:7px;height:7px;border-radius:50%;background:${dotForDays(e.days)}"></span>${e.days}d</span>`}</td><td>${statusBadge(e.status)}</td><td><div class="row-actions"><button class="mini-act">${I.eye}</button><button class="mini-act">${I.edit}</button></div></td></tr>`).join('')}</tbody></table></div></div>`;
};

/* ---------- STAFF ---------- */
VIEWS.staff = function (c) {
  c.innerHTML = `${pageHead('Staff Credentials', 'Qualification, competency and authorised-signatory credentials.', `<button class="btn btn-primary">${I.plus}Add Staff</button>`)}
    <div class="grid dash-grid enter">${DB.staff.map(s => `<div class="col-4"><div class="card card-pad hoverlift"><div style="display:flex;gap:12px;align-items:center"><div class="avatar" style="width:44px;height:44px">${s.name.split(' ').map(w=>w[0]).join('')}</div><div><div style="font-weight:600">${s.name}</div><div class="page-desc">${s.role}</div></div></div><div class="kv" style="margin-top:12px"><span class="k">Qualification</span><span class="v">${s.qual}</span></div><div class="kv"><span class="k">Certificate</span><span class="v tnum">${s.cert}</span></div><div class="kv"><span class="k">Validity</span><span class="v tnum">${s.expiry}</span></div><div style="margin-top:10px">${statusBadge(s.status)}</div></div></div>`).join('')}</div>`;
};

/* ---------- TENDERS ---------- */
VIEWS.tenders = function (c) {
  c.innerHTML = `${pageHead('Tenders', 'Live tender opportunities with document readiness tracking.', `<button class="btn btn-primary" onclick="navigate('package')">${I.document}Build Package</button>`)}
    <div class="grid dash-grid enter">${DB.tenders.map(t => `<div class="col-6"><div class="card card-pad hoverlift"><div style="display:flex;gap:10px"><div class="appr-ico">${I.tender}</div><div style="flex:1"><div class="appr-name">${t.title}</div><div class="appr-auth">${t.client} · ${t.id}</div></div><div style="text-align:right"><div style="font-weight:700" class="tnum">${inr(t.value)}</div><div style="font-size:11px;color:var(--danger)">Due ${t.due}</div></div></div>
    <div style="display:flex;gap:8px;margin-top:14px;align-items:center"><span class="badge ${t.missing===0?'badge-valid':'badge-expiring'}"><span class="dot"></span>${t.stage}</span><span style="font-size:12px;color:var(--text-secondary)">${t.docs} docs</span>${t.missing?`<span style="font-size:12px;color:var(--danger)">${t.missing} missing</span>`:`<span style="font-size:12px;color:var(--primary-dark)">Complete</span>`}<button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="navigate('package')">Prepare ${I.arrowR}</button></div></div></div>`).join('')}</div>`;
};

/* ---------- ENQUIRIES ---------- */
VIEWS.enquiries = function (c) {
  c.innerHTML = `${pageHead('Enquiries', 'All incoming laboratory service enquiries.', `<button class="btn btn-ghost hide-sm">${I.filter}Filter</button><button class="btn btn-primary" onclick="openEnquiryModal()">${I.plus}New Enquiry</button>`)}
    <div class="filter-bar enter"><div class="filter-search">${I.search}<input placeholder="Search enquiries..."></div><button class="fdrop">Category ${I.chevD}</button><button class="fdrop">Stage ${I.chevD}</button><button class="fdrop">Assigned ${I.chevD}</button></div>
    <div class="card enter"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>ID</th><th>Customer</th><th>Project</th><th>Service</th><th>Value</th><th>Assigned</th><th>Follow-up</th><th>Stage</th><th></th></tr></thead>
    <tbody>${DB.pipeline.leads.map(l => `<tr onclick="openLeadDrawer('${l.id}')"><td class="cell-dim tnum">${l.id}</td><td class="cell-strong">${l.cust}</td><td class="cell-dim">${l.proj}</td><td class="cell-dim">${l.cat}</td><td class="tnum">${inr(l.val)}</td><td class="cell-dim">${l.person}</td><td class="cell-dim">${l.follow}</td><td>${statusBadge(l.col==='won'?'won':l.col==='lost'?'lost':l.col==='sent'?'submitted':'review')}</td><td><div class="row-actions"><button class="mini-act">${I.eye}</button></div></td></tr>`).join('')}</tbody></table></div></div>`;
};

/* ---------- CUSTOMERS ---------- */
VIEWS.customers = function (c) {
  const custs = [...new Set(DB.pipeline.leads.map(l => l.cust))].map(name => { const leads = DB.pipeline.leads.filter(l => l.cust === name); return { name, count: leads.length, val: leads.reduce((a, l) => a + l.val, 0), cat: leads[0].cat }; });
  c.innerHTML = `${pageHead('Customers', 'Government departments, infrastructure companies and industrial clients.', `<button class="btn btn-primary">${I.plus}Add Customer</button>`)}
    <div class="grid dash-grid enter">${custs.map(cu => `<div class="col-4"><div class="card card-pad hoverlift" style="cursor:pointer"><div style="display:flex;gap:12px;align-items:center"><div class="appr-ico">${I.building}</div><div style="flex:1"><div style="font-weight:600">${cu.name}</div><div class="page-desc">${cu.cat}</div></div></div><div style="display:flex;gap:16px;margin-top:14px"><div><div style="font-size:18px;font-weight:700" class="tnum">${cu.count}</div><div class="page-desc">Enquiries</div></div><div><div style="font-size:18px;font-weight:700" class="tnum">${inr(cu.val)}</div><div class="page-desc">Pipeline value</div></div></div></div></div>`).join('')}</div>`;
};

/* ---------- QUOTATIONS (rates pulled directly from PTH SOR) ---------- */
let quoteLines = [];
VIEWS.quotations = function (c) {
  const SOR = window.SOR || [];
  if (!quoteLines.length) quoteLines = [
    { name: 'Compressive strength of Concrete Cube (Upto M50 Grade)', code: 'IS 516 (Part 1/Sec 1): 2021', qty: 12, rate: 300 },
    { name: 'Concrete Mix Design', code: 'IS 10262: 2019', qty: 1, rate: 7500 },
  ];
  c.innerHTML = `${pageHead('Quotations', 'Build quotations with rates pulled directly from the PTH Schedule of Rates (FY 2026–27).', `<button class="btn btn-ghost hide-sm" onclick="navigate('sor')">${I.rate}View SOR</button><button class="btn btn-primary" onclick="saveQuotation()">${I.plus}Save Quotation</button>`)}
    <div class="grid dash-grid">
      <div class="col-8"><div class="card card-pad enter">
        <div class="card-head"><h3>Quotation Builder</h3><span class="card-sub" style="margin-left:auto">Rates auto-filled from SOR</span></div>
        <div class="form-grid" style="margin-top:12px"><div class="field"><label>Customer</label><select class="select">${[...new Set(DB.pipeline.leads.map(l=>l.cust))].map(x=>`<option>${x}</option>`).join('')}</select></div><div class="field"><label>Quotation No.</label><input class="input" value="PTH/QTN/2026/0092"></div></div>
        <div style="display:flex;gap:8px;align-items:flex-end;margin-bottom:12px;flex-wrap:wrap;padding:12px;background:var(--surface-soft);border:1px solid var(--border);border-radius:12px">
          <div style="flex:1;min-width:180px"><label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Test category</label><select class="select" id="qCat" onchange="quoteFillTests()">${SOR.map(cat=>`<option value="${cat.id}">${cat.id}. ${esc(cat.name)}</option>`).join('')}</select></div>
          <div style="flex:2;min-width:220px"><label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Test / service</label><select class="select" id="qTest"></select></div>
          <button class="btn btn-primary" onclick="quoteAddLine()">${I.plus}Add</button>
        </div>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Test / Service</th><th>IS Code</th><th>Qty</th><th>Rate (₹)</th><th>Amount</th><th></th></tr></thead><tbody id="quoteBody"></tbody></table></div>
        <div id="quoteTotals"></div>
      </div></div>
      <div class="col-4"><div class="card card-pad enter"><div class="card-head"><h3>Recent Quotations</h3></div>
        <div style="margin-top:8px">${[['PTH/QTN/2026/0091','L&T Construction','submitted'],['PTH/QTN/2026/0090','Adani Infra','review'],['PTH/QTN/2026/0089','Gujarat Metro','won'],['PTH/QTN/2026/0088','Reliance','submitted']].map(q=>`<div class="appr-item"><div class="appr-main"><div class="appr-name tnum" style="font-size:12px">${q[0]}</div><div class="appr-auth">${q[1]}</div></div>${statusBadge(q[2])}</div>`).join('')}</div>
      </div></div>
    </div>`;
  quoteFillTests();
  renderQuoteLines();
};
function saveQuotation() {
  const sub = quoteLines.reduce((a, l) => a + (l.onReq ? 0 : l.qty * l.rate), 0);
  const total = Math.round(sub * 1.18);
  const num = 'PTH/QTN/2026/' + String(92 + (DB.quotations ? DB.quotations.length : 0)).padStart(4, '0');
  (DB.quotations = DB.quotations || []).unshift({
    id: num, date: nowStamp().slice(0, 10), lines: quoteLines.map(l => ({ ...l })),
    subtotal: sub, total, status: 'submitted', by: DB.user.name,
  });
  Store.save();
  toast('Quotation saved', `${num} · ₹${total.toLocaleString('en-IN')} incl. GST`);
  logAudit('Create', 'Quotations', `Quotation ${num} saved — ${quoteLines.length} tests, ₹${total.toLocaleString('en-IN')} incl. GST`);
}
function quoteFillTests() {
  const SOR = window.SOR || [];
  const catId = +document.getElementById('qCat').value;
  const cat = SOR.find(c => c.id === catId);
  const sel = document.getElementById('qTest');
  sel.innerHTML = (cat ? cat.tests : []).map((t, i) => `<option value="${i}">${esc(t.name)} — ${t.rate != null ? '₹' + t.rate : t.rateText}</option>`).join('');
}
function quoteAddLine() {
  const SOR = window.SOR || [];
  const cat = SOR.find(c => c.id === +document.getElementById('qCat').value);
  const t = cat.tests[+document.getElementById('qTest').value];
  quoteLines.push({ name: t.name, code: t.code, qty: 1, rate: t.rate != null ? t.rate : 0, onReq: t.rate == null });
  renderQuoteLines();
  toast('Line added', `${t.name} · ${t.rate != null ? '₹' + t.rate : 'rate on request'}`, 'info');
}
function renderQuoteLines() {
  const body = document.getElementById('quoteBody'); if (!body) return;
  body.innerHTML = quoteLines.length ? quoteLines.map((l, i) => `
    <tr>
      <td class="cell-strong">${esc(l.name)}</td>
      <td class="cell-dim">${esc(l.code || '—')}</td>
      <td><input type="number" min="1" value="${l.qty}" onchange="quoteLines[${i}].qty=Math.max(1,+this.value||1);renderQuoteLines()" style="width:56px;padding:5px 8px;border:1px solid var(--border);border-radius:8px;background:var(--surface-soft);font-size:13px" class="tnum"></td>
      <td class="tnum">${l.onReq ? '<span style="color:var(--text-muted)">On request</span>' : '₹' + l.rate}</td>
      <td class="tnum cell-strong">${l.onReq ? '—' : '₹' + (l.qty * l.rate).toLocaleString('en-IN')}</td>
      <td><button class="mini-act" onclick="quoteLines.splice(${i},1);renderQuoteLines()" title="Remove">${I.x}</button></td>
    </tr>`).join('') : `<tr><td colspan="6"><div class="empty" style="padding:26px"><div class="empty-ico">${I.rate}</div><h4>No line items</h4><p>Pick a category and test above, then Add</p></div></td></tr>`;
  const sub = quoteLines.reduce((a, l) => a + (l.onReq ? 0 : l.qty * l.rate), 0);
  const gst = Math.round(sub * 0.18), total = sub + gst;
  document.getElementById('quoteTotals').innerHTML = `<div style="display:flex;justify-content:flex-end;gap:26px;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)"><div><div class="page-desc">Subtotal</div><div style="font-weight:700" class="tnum">₹${sub.toLocaleString('en-IN')}</div></div><div><div class="page-desc">GST 18%</div><div style="font-weight:700" class="tnum">₹${gst.toLocaleString('en-IN')}</div></div><div><div class="page-desc">Total</div><div style="font-weight:700;font-size:18px;color:var(--primary-dark)" class="tnum">₹${total.toLocaleString('en-IN')}</div></div></div>`;
}

/* ---------- SCHEDULE OF RATES (browsable catalog from PTH SOR) ---------- */
VIEWS.sor = function (c) {
  const SOR = window.SOR || [];
  const totalTests = SOR.reduce((a, cat) => a + cat.tests.length, 0);
  c.innerHTML = `${pageHead('Schedule of Rates', `${DB.brand.company} · FY 2026–27 — ${totalTests} accredited tests across ${SOR.length} categories. Rates flow directly into quotations.`, `<button class="btn btn-ghost hide-sm">${I.export}Export SOR</button><button class="btn btn-primary" onclick="navigate('quotations')">${I.quote}New Quotation</button>`)}
    <div class="filter-bar enter">
      <div class="filter-search">${I.search}<input placeholder="Search 310 tests by name or IS code..." id="sorSearch" oninput="renderSOR(this.value)"></div>
      <select class="fdrop" id="sorCat" onchange="renderSOR(document.getElementById('sorSearch').value)" style="min-width:200px"><option value="">All categories</option>${SOR.map(cat => `<option value="${cat.id}">${cat.id}. ${esc(cat.name)}</option>`).join('')}</select>
    </div>
    <div id="sorList" class="enter"></div>`;
  renderSOR('');
};
function renderSOR(q) {
  const SOR = window.SOR || [];
  const list = document.getElementById('sorList'); if (!list) return;
  const catFilter = document.getElementById('sorCat').value;
  q = (q || '').toLowerCase();
  let cats = SOR.filter(cat => !catFilter || cat.id === +catFilter);
  let html = '';
  cats.forEach(cat => {
    const tests = cat.tests.filter(t => !q || (t.name + ' ' + t.code).toLowerCase().includes(q));
    if (!tests.length) return;
    html += `<div class="card enter" style="margin-bottom:14px">
      <div class="card-pad card-head" style="gap:10px"><span class="badge badge-neutral"><span class="dot" style="background:var(--brand)"></span>${cat.id}</span><h3 style="font-size:14.5px">${esc(cat.name)}</h3><span class="card-sub" style="margin-left:auto">${tests.length} tests</span></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th style="width:60px">Sr.</th><th>Name of Test</th><th>IS Code Reference</th><th>Sample Qty</th><th style="text-align:right">Rate (₹)</th><th style="width:70px"></th></tr></thead>
      <tbody>${tests.map((t, i) => `<tr>
        <td class="cell-dim tnum">${i + 1}</td>
        <td class="cell-strong">${esc(t.name)}</td>
        <td class="cell-dim">${esc(t.code || '—')}</td>
        <td class="cell-dim">${esc(t.qty || '—')}</td>
        <td class="tnum cell-strong" style="text-align:right">${t.rate != null ? '₹' + t.rate.toLocaleString('en-IN') : '<span style="color:var(--text-muted);font-weight:500">' + esc(t.rateText) + '</span>'}</td>
        <td><button class="btn btn-ghost btn-sm" onclick="quoteLines.push({name:${JSON.stringify(t.name)},code:${JSON.stringify(t.code)},qty:1,rate:${t.rate || 0},onReq:${t.rate == null}});toast('Added to quotation',${JSON.stringify(t.name)},'ok')">${I.plus}</button></td>
      </tr>`).join('')}</tbody></table></div>
      ${cat.combos && cat.combos.length ? `<div class="card-pad" style="border-top:1px solid var(--border)">${cat.combos.map(cm => `<div style="font-size:12px;color:var(--primary-dark);display:flex;gap:6px;align-items:center">${I.info}${esc(cm)}</div>`).join('')}</div>` : ''}
    </div>`;
  });
  list.innerHTML = html || `<div class="empty"><div class="empty-ico">${I.search}</div><h4>No tests found</h4><p>Try a different search or category</p></div>`;
}

/* ---------- ACCREDITATION SCOPE ---------- */
VIEWS.scope = function (c) {
  const scopes = [['Concrete & Cement','IS 516, IS 4031','valid'],['Soil & Rock','IS 2720, IS 13030','valid'],['Bitumen & Aggregates','IS 1201, IS 2386','valid'],['Steel & Metals','IS 1608, IS 1786','expiring'],['Non-Destructive Testing','ASTM E164, IS 3658','valid'],['Water & Environmental','IS 3025, APHA','valid']];
  c.innerHTML = `${pageHead('Accreditation Scope', 'NABL-accredited test parameters and applicable standards.', `<button class="btn btn-primary">${I.plus}Add Scope</button>`)}
    <div class="grid dash-grid enter">${scopes.map(s=>`<div class="col-4"><div class="card card-pad hoverlift"><div class="card-head"><div class="appr-ico">${I.scope}</div><div style="margin-left:4px"><div style="font-weight:600">${s[0]}</div></div><div style="margin-left:auto">${statusBadge(s[2])}</div></div><div class="page-desc" style="margin-top:10px">Standards: ${s[1]}</div><div style="margin-top:8px;font-size:12px;color:var(--text-secondary)">Discipline: Civil / Mechanical</div></div></div>`).join('')}</div>`;
};

/* ---------- CUSTOMER PORTAL ---------- */
VIEWS.portal = function (c) {
  c.innerHTML = `${pageHead('Customer Portal', 'Client-facing preview: report status, downloads and QR verification.', '')}
    <div class="grid dash-grid">
      <div class="col-12"><div class="card card-pad enter" style="background:var(--black);color:#fff"><div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><div class="brand-logo" style="width:44px;height:44px">${brandMark()}</div><div><div style="font-size:16px;font-weight:600">Welcome, L&T Construction</div><div style="color:var(--text-muted);font-size:13px">3 reports ready for download · 1 in progress</div></div><button class="btn btn-lime" style="margin-left:auto" onclick="toast('QR verified','Certificate TC-8421 is valid & authentic','ok')">Verify Certificate</button></div></div></div>
      ${DB.certificates.customer.slice(0,4).map(cu=>`<div class="col-3"><div class="card card-pad hoverlift"><div class="appr-ico">${I.report}</div><div style="font-weight:600;margin-top:10px">${cu.name}</div><div class="page-desc tnum">${cu.num}</div><div style="margin-top:10px">${statusBadge(cu.stage==='Issued'?'issued':'review')}</div>${cu.stage==='Issued'?`<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center;margin-top:10px" onclick="toast('Download started','${esc(cu.num)}.pdf','info')">${I.export}Download</button>`:''}</div></div>`).join('')}
    </div>`;
};

/* ---------- SETTINGS ---------- */
VIEWS.settings = function (c) {
  c.innerHTML = `${pageHead('Settings', 'Branding, roles, permissions and appearance.', '')}
    <div class="grid dash-grid">
      <div class="col-3"><div class="card card-pad enter"><div class="settings-nav"><a class="active">Branding</a><a>Roles & Permissions</a><a>Data Management</a><a>Branches</a><a>Security</a><a>Appearance</a></div></div></div>
      <div class="col-9">
        <div class="card card-pad enter" style="margin-bottom:16px"><div class="card-head"><h3>Product Branding</h3><div class="card-sub" style="margin-left:auto">Configurable identity</div></div>
          <div class="form-grid" style="margin-top:12px"><div class="field"><label>Product Name</label><input class="input" id="setName" value="${DB.brand.name}"></div><div class="field"><label>Company</label><input class="input" id="setCompany" value="${DB.brand.company}"></div></div>
          <div class="field"><label>Logo image URL <span style="color:var(--text-muted);font-weight:400">— e.g. assets/img/logo.png (leave blank to use the built-in mark)</span></label><input class="input" id="setLogo" value="${DB.brand.logoUrl || ''}" placeholder="assets/img/logo.png"></div>
          <div class="field"><label>Tagline</label><input class="input" value="${DB.brand.tagline}"></div>
          <div class="field"><label>Accent Colour <span style="color:var(--text-muted);font-weight:400">— PTH orange or lab lime</span></label><div class="swatch-row">${['#E8791E','#9DDB23','#22C55E','#3F8CFF','#8B5CF6','#F59E0B','#EF4444','#14B8A6'].map((col,i)=>`<div class="swatch ${i===1?'on':''}" style="background:${col}" onclick="setAccent('${col}',this)"></div>`).join('')}</div></div>
          <button class="btn btn-primary" onclick="applyBranding()">${I.check}Save Branding</button>
        </div>
        <div class="card card-pad enter" style="margin-bottom:16px"><div class="card-head"><h3>Roles & Permissions</h3></div>
          <div class="tbl-wrap" style="margin-top:12px"><table class="perm-grid"><thead><tr><th>Role</th>${DB.perms.slice(0,7).map(p=>`<th>${p}</th>`).join('')}</tr></thead>
          <tbody>${DB.roles.slice(0,8).map((role,ri)=>`<tr><td style="font-weight:600">${role}</td>${DB.perms.slice(0,7).map((p,pi)=>{const on=ri===0||pi<(8-ri);return `<td>${on?`<span style="color:var(--primary-dark)">${I.check}</span>`:`<span style="color:var(--text-muted)">–</span>`}</td>`;}).join('')}</tr>`).join('')}</tbody></table></div>
        </div>
        ${dataManagementCard()}
      </div>
    </div>`;
  c.querySelectorAll('.settings-nav a').forEach(a => a.onclick = () => { c.querySelectorAll('.settings-nav a').forEach(x => x.classList.remove('active')); a.classList.add('active'); });
};
function dataManagementCard() {
  const info = Store.info();
  const rows = [['Users', info.counts.users], ['CRM Leads', info.counts.leads], ['Credentials', info.counts.credentials], ['Equipment', info.counts.equipment], ['Staff', info.counts.staff], ['Tenders', info.counts.tenders], ['Quotations', info.counts.quotations], ['Audit events', info.counts.audit]];
  const updated = info.updatedAt ? new Date(info.updatedAt).toLocaleString('en-IN') : '—';
  return `<div class="card card-pad enter"><div class="card-head"><div><h3>Data Management</h3><div class="card-sub">Your data is stored separately from the app. Updating features never erases it.</div></div><span class="badge badge-valid" style="margin-left:auto"><span class="dot"></span>Persisted</span></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0">
      ${rows.map(r => `<div style="flex:1;min-width:96px;padding:10px 12px;background:var(--surface-soft);border:1px solid var(--border);border-radius:12px"><div class="tnum" style="font-size:18px;font-weight:700">${r[1]}</div><div style="font-size:11px;color:var(--text-secondary)">${r[0]}</div></div>`).join('')}
    </div>
    <div style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Last saved: <span class="tnum">${updated}</span> · Storage: browser localStorage (this device)</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="backupData()">${I.export}Back up (download JSON)</button>
      <button class="btn btn-ghost" onclick="document.getElementById('restoreFile').click()">${I.upload}Restore from backup</button>
      <button class="btn btn-ghost" style="color:var(--danger)" onclick="confirmResetData()">${I.x}Reset to defaults</button>
      <input type="file" id="restoreFile" accept="application/json,.json" style="display:none" onchange="restoreData(this)">
    </div>
    <div style="margin-top:12px;padding:11px 13px;background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;font-size:12px;color:var(--text-secondary)">${I.info} <b>Tip:</b> This app keeps a clean separation — <b>code</b> (features/UI) vs <b>data</b> (records). Deploy new versions freely; your saved data stays. For multi-device/shared data, connect the backend (see README).</div>
  </div>`;
}
function backupData() {
  const stamp = nowStamp().replace(/[: ]/g, '-');
  downloadText(Store.exportJSON(), `PTH-CRM-backup-${stamp}.json`, 'application/json');
  logAudit('Export', 'Data Management', 'Full data backup downloaded (JSON)');
}
function restoreData(input) {
  const file = input.files && input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      Store.importJSON(reader.result); // rebinds DB.* and window.auditLog
      logAudit('Edit', 'Data Management', `Data restored from backup "${file.name}"`);
      renderShell(); navigate('settings');
      toast('Data restored', `Loaded backup "${file.name}"`, 'ok');
    } catch (e) {
      toast('Restore failed', e.message || 'Invalid backup file', 'err');
    }
  };
  reader.readAsText(file);
  input.value = '';
}
function confirmResetData() {
  openModal(`<div class="modal-head"><div class="modal-title">Reset all data?</div></div>
    <div class="modal-body"><p style="font-size:13.5px;color:var(--text-secondary)">This wipes your saved data on this device and restores the original sample data. Consider a <b style="color:var(--text-primary)">backup</b> first. This cannot be undone.</p></div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" style="background:var(--danger)" onclick="doResetData()">${I.x}Reset to defaults</button></div>`);
}
function doResetData() {
  Store.reset();
  closeModal(); renderShell(); navigate('settings');
  toast('Data reset', 'Restored to original sample data', 'info');
}
function setAccent(col, el) { document.querySelectorAll('.swatch').forEach(s => s.classList.remove('on')); el.classList.add('on'); document.documentElement.style.setProperty('--primary', col); }
function applyBranding() {
  DB.brand.name = document.getElementById('setName').value || DB.brand.name;
  DB.brand.company = document.getElementById('setCompany').value || DB.brand.company;
  DB.brand.logoUrl = document.getElementById('setLogo').value.trim();
  renderShell(); navigate('settings');
  toast('Branding updated', 'Logo and product identity applied across the app');
  logAudit('Edit', 'Settings', `Branding updated — product name "${DB.brand.name}"`);
}

/* ---------- USER MANAGEMENT (add / edit / delete / enable-disable) ---------- */
VIEWS.users = function (c) {
  const total = DB.users.length;
  const active = DB.users.filter(u => u.status === 'active').length;
  const disabled = total - active;
  const roles = new Set(DB.users.map(u => u.role)).size;
  c.innerHTML = `${pageHead('User Management', 'Add, modify, enable/disable and remove user profiles.', `<button class="btn btn-ghost hide-sm">${I.export}Export</button><button class="btn btn-primary" onclick="openUserModal()">${I.plus}Add User</button>`)}
    <div class="stat-strip enter">
      <div class="stat-chip"><div class="sc-val tnum">${total}</div><div class="sc-label">Total users</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--primary-dark)">${active}</div><div class="sc-label"><span class="dot" style="background:var(--primary-dark)"></span>Active</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--danger)">${disabled}</div><div class="sc-label"><span class="dot" style="background:var(--danger)"></span>Disabled</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${roles}</div><div class="sc-label"><span class="dot" style="background:var(--info)"></span>Distinct roles</div></div>
    </div>
    <div class="filter-bar enter"><div class="filter-search">${I.search}<input placeholder="Search users..." id="userSearch" oninput="renderUsersTable(this.value)"></div><button class="fdrop">Role ${I.chevD}</button><button class="fdrop">Status ${I.chevD}</button></div>
    <div class="card enter"><div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>User</th><th>Username</th><th>Email</th><th>Role</th><th>Branch</th><th>Last Login</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
      <tbody id="usersBody"></tbody>
    </table></div></div>`;
  renderUsersTable('');
};
function renderUsersTable(q) {
  const body = document.getElementById('usersBody'); if (!body) return;
  q = (q || '').toLowerCase();
  const rows = DB.users.filter(u => !q || (u.name + u.username + u.email + u.role).toLowerCase().includes(q));
  body.innerHTML = rows.length ? rows.map(u => `
    <tr>
      <td><div style="display:flex;align-items:center;gap:10px"><div class="avatar" style="width:32px;height:32px;font-size:11px;${u.status !== 'active' ? 'filter:grayscale(1);opacity:0.6' : ''}">${u.initials}</div><div><div class="cell-strong">${esc(u.name)}</div><div class="cell-dim" style="font-size:11px">${u.id}</div></div></div></td>
      <td class="cell-dim tnum">${esc(u.username)}</td>
      <td class="cell-dim">${esc(u.email)}</td>
      <td class="cell-dim">${esc(u.role)}</td>
      <td class="cell-dim">${esc(u.branch || '—')}</td>
      <td class="cell-dim tnum" style="font-size:12px">${u.lastLogin || '—'}</td>
      <td>${u.status === 'active' ? '<span class="badge badge-valid"><span class="dot"></span>Active</span>' : '<span class="badge badge-expired"><span class="dot"></span>Disabled</span>'}</td>
      <td><div style="display:flex;gap:4px;justify-content:flex-end;align-items:center">
        <span class="toggle ${u.status === 'active' ? 'on' : ''}" title="${u.status === 'active' ? 'Disable' : 'Enable'}" onclick="toggleUserStatus('${u.id}')"></span>
        <button class="mini-act" title="Edit" onclick="openUserModal('${u.id}')">${I.edit}</button>
        <button class="mini-act" title="Delete" onclick="deleteUser('${u.id}')">${I.x}</button>
      </div></td>
    </tr>`).join('') : `<tr><td colspan="8"><div class="empty" style="padding:30px"><div class="empty-ico">${I.employee}</div><h4>No users found</h4><p>Adjust the search or add a new user</p></div></td></tr>`;
}
function openUserModal(id) {
  const u = id ? DB.users.find(x => x.id === id) : null;
  const editing = !!u;
  openModal(`
    <div class="modal-head"><div class="modal-title">${editing ? 'Edit User' : 'Add User'}</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <input type="hidden" id="uId" value="${editing ? u.id : ''}">
      <div class="form-grid">
        <div class="field" id="uf-name"><label>Full Name <span class="req">*</span></label><input class="input" id="uName" value="${editing ? esc(u.name) : ''}" placeholder="e.g. Hardik" oninput="uSyncPass()"><div class="field-err">${I.info}Name is required</div></div>
        <div class="field" id="uf-username"><label>Username <span class="req">*</span></label><input class="input" id="uUsername" value="${editing ? esc(u.username) : ''}" placeholder="e.g. hardik"><div class="field-err">${I.info}Username is required</div></div>
      </div>
      <div class="field" id="uf-email"><label>Email <span class="req">*</span></label><input class="input" id="uEmail" value="${editing ? esc(u.email) : ''}" placeholder="name@pramukhtesthouse.com"><div class="field-err">${I.info}Valid email is required</div></div>
      <div class="form-grid">
        <div class="field"><label>Role</label><select class="select" id="uRole">${DB.roles.map(r => `<option ${editing && u.role === r ? 'selected' : ''}>${r}</option>`).join('')}</select></div>
        <div class="field"><label>Branch</label><select class="select" id="uBranch">${DB.branches.map(b => `<option ${editing && u.branch === b ? 'selected' : ''}>${b}</option>`).join('')}</select></div>
      </div>
      <div class="field"><label>Password</label><input class="input" id="uPass" type="password" oninput="this.dataset.touched=1" placeholder="${editing ? 'Leave blank to keep unchanged' : 'Enter a strong password'}"><div style="font-size:11.5px;color:var(--text-muted);margin-top:5px">Use a unique password of at least 12 characters.</div></div>
      <div style="display:flex;align-items:center;gap:10px;padding:12px;background:var(--surface-soft);border:1px solid var(--border);border-radius:12px">
        <span class="toggle ${!editing || u.status === 'active' ? 'on' : ''}" id="uStatus" onclick="this.classList.toggle('on')"></span>
        <div><div style="font-size:13px;font-weight:600">Account enabled</div><div style="font-size:11.5px;color:var(--text-secondary)">Disabled users cannot sign in</div></div>
      </div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveUser()">${I.check}${editing ? 'Save Changes' : 'Create User'}</button></div>`);
  if (!editing) uSyncPass();
}
function uSyncPass() {
  const name = document.getElementById('uName').value.trim();
  const pass = document.getElementById('uPass');
  const uname = document.getElementById('uUsername');
  if (name) {
    if (!pass.dataset.touched) pass.value = '';
    if (uname && !uname.value) uname.value = name.toLowerCase().replace(/\s+/g, '');
  }
}
function saveUser() {
  const id = document.getElementById('uId').value;
  const name = document.getElementById('uName').value.trim();
  const username = document.getElementById('uUsername').value.trim();
  const email = document.getElementById('uEmail').value.trim();
  let ok = true;
  const bad = (fid) => { const f = document.getElementById(fid); f.classList.add('show-err'); f.querySelector('.input').classList.add('shake'); setTimeout(() => f.querySelector('.input').classList.remove('shake'), 350); ok = false; };
  document.getElementById('uf-name').classList.remove('show-err');
  document.getElementById('uf-username').classList.remove('show-err');
  document.getElementById('uf-email').classList.remove('show-err');
  if (!name) bad('uf-name');
  if (!username) bad('uf-username');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) bad('uf-email');
  if (!ok) return;
  const role = document.getElementById('uRole').value;
  const branch = document.getElementById('uBranch').value;
  const status = document.getElementById('uStatus').classList.contains('on') ? 'active' : 'disabled';
  const initials = name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  if (id) {
    const u = DB.users.find(x => x.id === id);
    Object.assign(u, { name, username, email, role, branch, status, initials });
    toast('User updated', `${name} · ${role}`);
    logAudit('Edit', 'User Management', `User ${name} (${role}) updated`);
  } else {
    const num = (Math.max(0, ...DB.users.map(u => +u.id.split('-')[1] || 0)) + 1).toString().padStart(3, '0');
    DB.users.push({ id: 'U-' + num, name, username, email, role, branch, status, initials, lastLogin: '—' });
    toast('User created', `${name} · ${role}`);
    logAudit('Create', 'User Management', `User ${name} (${role}) created`);
  }
  closeModal();
  renderUsersTable(document.getElementById('userSearch')?.value || '');
  // refresh stat strip counts
  VIEWS.users(document.getElementById('canvas'));
}
function toggleUserStatus(id) {
  const u = DB.users.find(x => x.id === id);
  u.status = u.status === 'active' ? 'disabled' : 'active';
  renderUsersTable(document.getElementById('userSearch')?.value || '');
  toast(u.status === 'active' ? 'User enabled' : 'User disabled', `${u.name} can ${u.status === 'active' ? 'now sign in' : 'no longer sign in'}`, u.status === 'active' ? 'ok' : 'info');
  logAudit(u.status === 'active' ? 'Enable' : 'Disable', 'User Management', `User ${u.name} ${u.status === 'active' ? 'enabled' : 'disabled'}`);
}
function deleteUser(id) {
  const u = DB.users.find(x => x.id === id);
  openModal(`
    <div class="modal-head"><div class="modal-title">Delete user?</div></div>
    <div class="modal-body"><p style="font-size:13.5px;color:var(--text-secondary)">This will permanently remove <b style="color:var(--text-primary)">${esc(u.name)}</b> (${u.role}) and revoke their access. This action cannot be undone.</p></div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" style="background:var(--danger)" onclick="confirmDeleteUser('${id}')">${I.x}Delete User</button></div>`);
}
function confirmDeleteUser(id) {
  const u = DB.users.find(x => x.id === id);
  DB.users = DB.users.filter(x => x.id !== id);
  closeModal();
  VIEWS.users(document.getElementById('canvas'));
  toast('User deleted', `${u.name} removed`, 'info');
  logAudit('Delete', 'User Management', `User ${u.name} (${u.role}) permanently deleted`);
}

/* ---------- AUDIT TRAIL (activity log across all modules) ---------- */
const AUDIT_ACTION_TONE = { Login: 'info', Create: 'valid', Edit: 'renewal', 'Status Change': 'renewal', Approve: 'approved', Export: 'neutral', Delete: 'expired', Disable: 'expired', Enable: 'valid' };
VIEWS.audit = function (c) {
  const today = nowStamp().slice(0, 10);
  const todayCount = window.auditLog.filter(e => (e.ts || '').startsWith(today)).length;
  const modules = [...new Set(window.auditLog.map(e => e.module))];
  const actions = [...new Set(window.auditLog.map(e => e.action))];
  c.innerHTML = `${pageHead('Audit Trail', 'Immutable activity log of every create, edit, delete, approval and login across all modules.', `<button class="btn btn-ghost hide-sm" onclick="exportAudit()">${I.export}Export CSV</button>`)}
    <div class="stat-strip enter">
      <div class="stat-chip"><div class="sc-val tnum">${window.auditLog.length}</div><div class="sc-label">Total events</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--primary-dark)">${todayCount}</div><div class="sc-label"><span class="dot" style="background:var(--primary-dark)"></span>Today</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${modules.length}</div><div class="sc-label"><span class="dot" style="background:var(--info)"></span>Modules</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${new Set(window.auditLog.map(e => e.user)).size}</div><div class="sc-label"><span class="dot" style="background:var(--warning)"></span>Users</div></div>
    </div>
    <div class="filter-bar enter">
      <div class="filter-search">${I.search}<input placeholder="Search events, users, details..." id="auditSearch" oninput="renderAuditTable(this.value)"></div>
      <select class="fdrop" id="auditAction" onchange="renderAuditTable(document.getElementById('auditSearch').value)"><option value="">All actions</option>${actions.map(a => `<option>${a}</option>`).join('')}</select>
      <select class="fdrop" id="auditModule" onchange="renderAuditTable(document.getElementById('auditSearch').value)"><option value="">All modules</option>${modules.map(m => `<option>${m}</option>`).join('')}</select>
    </div>
    <div class="card enter"><div class="tbl-wrap"><table class="tbl">
      <thead><tr><th style="width:150px">Timestamp</th><th>User</th><th>Action</th><th>Module</th><th>Detail</th></tr></thead>
      <tbody id="auditBody"></tbody>
    </table></div></div>`;
  renderAuditTable('');
};
function renderAuditTable(q) {
  const body = document.getElementById('auditBody'); if (!body) return;
  q = (q || '').toLowerCase();
  const fA = document.getElementById('auditAction')?.value || '';
  const fM = document.getElementById('auditModule')?.value || '';
  const rows = window.auditLog.filter(e =>
    (!fA || e.action === fA) && (!fM || e.module === fM) &&
    (!q || (e.user + e.action + e.module + e.detail).toLowerCase().includes(q)));
  body.innerHTML = rows.length ? rows.map(e => `
    <tr>
      <td class="cell-dim tnum" style="font-size:12px;white-space:nowrap">${e.ts}</td>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="avatar" style="width:26px;height:26px;font-size:10px">${(e.user || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()}</div><div><div class="cell-strong" style="font-size:12.5px">${esc(e.user)}</div><div class="cell-dim" style="font-size:10.5px">${esc(e.role || '')}</div></div></div></td>
      <td><span class="badge badge-${AUDIT_ACTION_TONE[e.action] || 'neutral'}"><span class="dot"></span>${esc(e.action)}</span></td>
      <td class="cell-dim">${esc(e.module)}</td>
      <td class="cell-dim">${esc(e.detail)}</td>
    </tr>`).join('') : `<tr><td colspan="5"><div class="empty" style="padding:30px"><div class="empty-ico">${I.shield}</div><h4>No matching events</h4><p>Adjust the filters or search</p></div></td></tr>`;
}
function exportAudit() {
  const rows = [['Timestamp', 'User', 'Role', 'Action', 'Module', 'Detail'], ...auditLog.map(e => [e.ts, e.user, e.role, e.action, e.module, e.detail])];
  downloadCSV(rows, 'PTH-CRM-audit-trail.csv');
  logAudit('Export', 'Audit Trail', `Exported ${window.auditLog.length} audit events to CSV`);
}

/* ---------- Download helpers ---------- */
function downloadBlob(blob, filename, notify = true) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  if (notify) toast('Export ready', filename + ' downloaded', 'ok');
}
function downloadCSV(rows, filename) {
  const csv = rows.map(r => r.map(cell => { const s = String(cell == null ? '' : cell); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(',')).join('\n');
  downloadBlob(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }), filename);
}
function downloadText(text, filename, mime = 'text/plain') {
  downloadBlob(new Blob([text], { type: mime + ';charset=utf-8' }), filename);
}

/* stubs for remaining nav that reuse simpler renders */
VIEWS.projects = VIEWS.enquiries;

function openEnquiryModal() {
  openModal(`
    <div class="modal-head"><div class="modal-title">New Enquiry</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <div class="field" id="e-cust"><label>Customer Name <span class="req">*</span></label><input class="input" id="eCust" placeholder="e.g. Adani Infra"><div class="field-err">${I.info}Please enter a customer</div></div>
      <div class="field"><label>Project</label><input class="input" placeholder="e.g. Port Expansion — Phase 2"></div>
      <div class="form-grid">
        <div class="field"><label>Service Category</label><select class="select"><option>Material Testing</option><option>Geotechnical</option><option>NDT</option><option>Calibration</option><option>Inspection</option></select></div>
        <div class="field"><label>Expected Value</label><input class="input" placeholder="₹"></div>
      </div>
      <div class="field"><label>Assigned To</label><select class="select">${DB.staff.map(s=>`<option>${s.name}</option>`).join('')}</select></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="submitEnquiry()">${I.check}Create Enquiry</button></div>`);
}
function submitEnquiry() {
  const input = document.getElementById('eCust'), field = input.closest('.field');
  if (!input.value.trim()) { field.classList.add('show-err'); input.classList.add('shake'); setTimeout(() => input.classList.remove('shake'), 350); return; }
  closeModal(); toast('Enquiry created', 'Added to CRM pipeline · New stage');
  logAudit('Create', 'Enquiries', `Enquiry logged — ${input.value.trim()}`);
}

/* ============================================================
   CINEMATIC LANDING + BOOT
   ============================================================ */
function runCinema(done) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { done(); return; }
  const cinema = document.createElement('div');
  cinema.className = 'cinema';
  cinema.innerHTML = `
    <button class="cinema-skip" id="cinemaSkip">Skip intro →</button>
    <div class="cinema-stage">
      <div id="cinemaBoard" style="opacity:0;filter:blur(14px);transform:scale(0.86);transition:all 1.4s cubic-bezier(0.22,0.61,0.36,1)">
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:20px;box-shadow:var(--shadow-lg);overflow:hidden">
          <div style="display:flex">
            <div style="width:70px;background:var(--surface);border-right:1px solid var(--border);padding:16px 0;display:flex;flex-direction:column;align-items:center;gap:14px" id="cinemaSide">
              <div class="brand-logo" style="width:32px;height:32px">${brandMark()}</div>
              ${['overview','crm','cred','approval','cert'].map((ic,i)=>`<div class="csi" style="width:34px;height:34px;border-radius:9px;display:grid;place-items:center;color:var(--text-muted);${i===0?'background:var(--black);color:#fff':''}">${I[ic]}</div>`).join('')}
            </div>
            <div style="flex:1;padding:20px">
              <div style="height:12px;width:130px;background:var(--surface-soft);border-radius:6px;margin-bottom:16px"></div>
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px" id="cinemaKpis">
                ${[['New Enquiries','128'],['Quotation','₹47L'],['Orders','63'],['Conversion','49%']].map(k=>`<div class="cink" style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;padding:12px"><div style="font-size:10px;color:var(--text-secondary)">${k[0]}</div><div style="font-size:20px;font-weight:700;margin-top:4px">${k[1]}</div></div>`).join('')}
              </div>
              <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px">
                <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;height:120px;position:relative;overflow:hidden"><svg viewBox="0 0 300 120" width="100%" height="120" preserveAspectRatio="none"><path id="cinemaLine" d="M0,90 C50,80 60,50 100,55 C140,60 160,30 200,35 C240,40 260,15 300,20" fill="none" stroke="var(--primary)" stroke-width="3"/></svg></div>
                <div style="background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;height:120px;display:grid;place-items:center"><div style="width:70px;height:70px;border-radius:50%;border:9px solid var(--primary);border-right-color:var(--surface);border-bottom-color:var(--surface);transform:rotate(45deg)"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cinema-final" id="cinemaFinal">
        <div><div class="cf-logo">${brandMark()}</div><h1>${DB.brand.name}</h1><p>${DB.brand.company} — control every enquiry, credential, approval and certificate.</p></div>
      </div>
    </div>`;
  document.body.appendChild(cinema);

  const board = cinema.querySelector('#cinemaBoard');
  const line = cinema.querySelector('#cinemaLine');
  const finish = () => { cinema.classList.add('done'); setTimeout(() => cinema.remove(), 700); done(); };
  cinema.querySelector('#cinemaSkip').onclick = finish;

  // Scene 1: sharpen
  requestAnimationFrame(() => { board.style.opacity = '1'; board.style.filter = 'blur(0)'; board.style.transform = 'scale(1)'; });
  if (line) { const len = line.getTotalLength(); line.style.strokeDasharray = len; line.style.strokeDashoffset = len; setTimeout(() => { line.style.transition = 'stroke-dashoffset 1000ms ease'; line.style.strokeDashoffset = 0; }, 900); }

  // Scene 2: sidebar focus — move active item
  setTimeout(() => {
    const sideItems = cinema.querySelectorAll('.csi');
    sideItems[0].style.cssText = 'width:34px;height:34px;border-radius:9px;display:grid;place-items:center;color:var(--text-muted);transition:all 0.5s';
    sideItems[2].style.cssText = 'width:34px;height:34px;border-radius:9px;display:grid;place-items:center;background:var(--black);color:#fff;transition:all 0.5s';
    cinema.querySelector('#cinemaSide').style.cssText += ';box-shadow:var(--shadow-lg);z-index:3;position:relative;transform:translateX(-4px) scale(1.05);transition:all 0.6s';
  }, 3200);

  // Scene 4: float cards
  setTimeout(() => {
    cinema.querySelector('#cinemaSide').style.transform = 'translateX(0) scale(1)';
    board.style.transform = 'scale(1) perspective(1200px) rotateX(6deg)';
    board.style.transition = 'transform 1.2s cubic-bezier(0.22,0.61,0.36,1)';
    cinema.querySelectorAll('.cink').forEach((k, i) => { k.style.transition = 'transform 0.8s cubic-bezier(0.22,0.61,0.36,1),box-shadow 0.8s'; setTimeout(() => { k.style.transform = 'translateY(-10px) translateZ(30px)'; k.style.boxShadow = 'var(--shadow-lg)'; }, i * 90); });
  }, 5200);

  // Scene 6: settle + final
  setTimeout(() => {
    board.style.transform = 'scale(1)';
    cinema.querySelectorAll('.cink').forEach(k => { k.style.transform = 'none'; k.style.boxShadow = 'none'; });
  }, 8200);
  setTimeout(() => { board.style.transition = 'opacity 0.6s'; board.style.opacity = '0.12'; cinema.querySelector('#cinemaFinal').classList.add('show'); }, 9200);
  setTimeout(finish, 12500);
}

function boot() {
  renderShell();
  navigate('overview');
}

/* Login screen */
function renderLogin() {
  document.getElementById('app').innerHTML = `
    <div class="login-wrap">
      <div class="login-hero">
        <div class="login-hero-glow"></div>
        <div style="display:flex;align-items:center;gap:12px;position:relative"><div class="brand-logo" style="width:44px;height:44px">${brandMark()}</div><div><div style="font-size:18px;font-weight:700">${DB.brand.name}</div><div style="font-size:11.5px;color:rgba(255,255,255,0.55)">${DB.brand.company}</div></div></div>
        <div style="margin-top:auto;position:relative">
          <div style="font-size:32px;font-weight:700;letter-spacing:-0.03em;line-height:1.15;max-width:460px">CRM, Credentials, Accreditation & Certification for ${DB.brand.company}.</div>
          <p style="color:rgba(255,255,255,0.62);margin-top:16px;max-width:420px;font-size:14px">${DB.brand.accredited}. Manage every enquiry, quotation, credential, approval and test certificate — with the full Schedule of Rates built in.</p>
          <div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap">${['NABL','ISO/IEC 17025:2017','ISO 9001:2015','310 SOR tests'].map(t=>`<span class="badge" style="background:rgba(232,121,30,0.16);color:#F4A460"><span class="dot" style="background:var(--brand)"></span>${t}</span>`).join('')}</div>
        </div>
        <div style="margin-top:32px;color:rgba(255,255,255,0.4);font-size:12px;position:relative">© 2026 ${DB.brand.legal} · Surat, Gujarat · Secure, role-based access</div>
      </div>
      <div class="login-form-side">
        <div class="login-card">
          <div class="brand-logo" style="width:48px;height:48px;margin-bottom:18px">${brandMark()}</div>
          <h1 style="font-size:24px;font-weight:600;letter-spacing:-0.02em">Sign in to ${DB.brand.name}</h1>
          <p class="page-desc" style="margin-bottom:22px">${DB.brand.company} workspace</p>
          <div class="field"><label>Username</label>
            <select class="input" id="loginUser" onchange="loginPickUser()">${DB.users.filter(u=>u.status==='active').map((u,i)=>`<option value="${u.username}" ${i===0?'selected':''}>${u.name} — ${u.role}</option>`).join('')}</select>
          </div>
          <div class="field"><label>Access mode</label><input class="input" value="Static preview" disabled></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px"><label style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text-secondary)"><span class="toggle on" onclick="this.classList.toggle('on')"></span>Remember me</label><a style="font-size:12.5px;color:var(--primary-dark);font-weight:600">Forgot password?</a></div>
          <button class="btn btn-primary" style="width:100%;justify-content:center;padding:12px" onclick="doLogin()">Sign In ${I.arrowR}</button>
          <div style="text-align:center;margin:16px 0;color:var(--text-muted);font-size:12px">or</div>
          <button class="btn btn-ghost" style="width:100%;justify-content:center">${I.shield}Single Sign-On (SSO)</button>
          <p class="page-desc" style="text-align:center;margin-top:18px">Static preview only. Production sign-in is secured by the Django API.</p>
        </div>
      </div>
    </div>`;
}
function loginPickUser() {
  // Static preview: selecting a user changes the role being previewed.
}
function doLogin() {
  const uname = document.getElementById('loginUser')?.value;
  const u = DB.users.find(x => x.username === uname);
  if (u) { DB.user = { name: u.name, role: u.role, initials: u.initials }; u.lastLogin = nowStamp(); }
  logAudit('Login', 'Auth', `Signed in as ${DB.user.name} (${DB.user.role})`);
  boot();
  runCinema(() => {});
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  if (params.get('skip') === '1') { boot(); return; }
  renderLogin();
});

// Expose for inline handlers
Object.assign(window, { navigate, VIEWS, toast, openDrawer, closeDrawer, openModal, closeModal, openCredDrawer, openLeadDrawer, openExpiryDrawer, openCredentialModal, submitCredential, openEnquiryModal, submitEnquiry, togglePkg, toggleAllRows, setAccent, applyBranding, doLogin, loginPickUser, quickAddMenu, quoteFillTests, quoteAddLine, renderQuoteLines, renderSOR, openUserModal, saveUser, toggleUserStatus, deleteUser, confirmDeleteUser, uSyncPass, renderUsersTable, renderAuditTable, exportAudit, setOverviewPeriod, exportOverview, saveQuotation, logAudit, dataManagementCard, backupData, restoreData, confirmResetData, doResetData });
Object.defineProperty(window, 'quoteLines', { get: () => quoteLines, set: v => { quoteLines = v; } });
