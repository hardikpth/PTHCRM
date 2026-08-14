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

/* ---------- Persistent application configuration ---------- */
const USER_KEY = 'pth_users_v1';
const BRAND_KEY = 'pth_brand_v1';
const SCOPE_KEY = 'pth_scopes_v1';
(function loadApplicationConfiguration() {
  try {
    const users = JSON.parse(localStorage.getItem(USER_KEY));
    if (Array.isArray(users) && users.length) DB.users = users;
  } catch (e) {}
  try {
    const brand = JSON.parse(localStorage.getItem(BRAND_KEY));
    if (brand && typeof brand === 'object' && !Array.isArray(brand)) DB.brand = { ...DB.brand, ...brand };
  } catch (e) {}
  try {
    const scopes = JSON.parse(localStorage.getItem(SCOPE_KEY));
    if (Array.isArray(scopes)) DB.scopes = scopes;
  } catch (e) {}
  if (DB.brand.accent) document.documentElement.style.setProperty('--primary', DB.brand.accent);
})();
function persistUsers() { try { localStorage.setItem(USER_KEY, JSON.stringify(DB.users || [])); return true; } catch (e) { toast('Unable to save users', 'Browser storage is unavailable or full.', 'err'); return false; } }
function persistBranding() { try { localStorage.setItem(BRAND_KEY, JSON.stringify(DB.brand || {})); return true; } catch (e) { toast('Unable to save branding', 'Browser storage is unavailable or full.', 'err'); return false; } }
function persistScopes() { try { localStorage.setItem(SCOPE_KEY, JSON.stringify(DB.scopes || [])); return true; } catch (e) { toast('Unable to save scopes', 'Browser storage is unavailable or full.', 'err'); return false; } }

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
const esc = s => String(s).replace(/[&<>"'`]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;' }[c]));
function formatAppDate(value){if(value==null||value===''||value==='—')return'—';let y,m,d;if(value instanceof Date&&!isNaN(value)){y=value.getFullYear();m=value.getMonth()+1;d=value.getDate();}else{const s=String(value).trim(),iso=s.match(/^(\d{4})-(\d{2})-(\d{2})/),display=s.match(/^(\d{2})-(\d{2})-(\d{4})$/);if(iso){[,y,m,d]=iso;}else if(display)return s;else{const parsed=new Date(s);if(isNaN(parsed))return s;y=parsed.getFullYear();m=parsed.getMonth()+1;d=parsed.getDate();}}return`${String(d).padStart(2,'0')}-${String(m).padStart(2,'0')}-${y}`;}
function formatAppTime(value){if(value==null||value===''||value==='—')return'—';let h,min;if(value instanceof Date&&!isNaN(value)){h=value.getHours();min=value.getMinutes();}else{const s=String(value).trim(),iso=s.match(/T(\d{2}):(\d{2})/),clock=s.match(/^(\d{1,2}):(\d{2})(?:\s*([AP]M))?/i);if(iso){h=+iso[1];min=+iso[2];}else if(clock){h=+clock[1];min=+clock[2];if(clock[3]){const ap=clock[3].toUpperCase();h=h%12+(ap==='PM'?12:0);}}else return s;}const ap=h>=12?'PM':'AM',hour=h%12||12;return`${String(hour).padStart(2,'0')}:${String(min).padStart(2,'0')} ${ap}`;}
function formatAppDateTime(value){if(!value||value==='—')return'—';const d=value instanceof Date?value:new Date(String(value).replace(' ','T'));if(isNaN(d))return`${formatAppDate(String(value).slice(0,10))}${String(value).match(/\d{1,2}:\d{2}/)?` · ${formatAppTime(String(value).match(/\d{1,2}:\d{2}(?:\s*[AP]M)?/i)?.[0])}`:''}`;return`${formatAppDate(d)} · ${formatAppTime(d)}`;}
function parseDisplayDate(value){const m=String(value||'').trim().match(/^(\d{2})-(\d{2})-(\d{4})$/);if(!m)return'';const iso=`${m[3]}-${m[2]}-${m[1]}`,d=new Date(`${iso}T00:00:00`);return!isNaN(d)&&d.getFullYear()==+m[3]&&d.getMonth()+1==+m[2]&&d.getDate()==+m[1]?iso:'';}
function parseDisplayTime(value){const m=String(value||'').trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);if(!m)return'';let h=+m[1],min=+m[2];if(h<1||h>12||min>59)return'';h=h%12+(m[3].toUpperCase()==='PM'?12:0);return`${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}`;}
function normalizeVisibleDateTimes(root=document){const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>{if(['SCRIPT','STYLE','TEXTAREA','OPTION'].includes(n.parentElement?.tagName))return;let s=n.nodeValue;s=s.replace(/\b(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})(?::\d{2})?\b/g,(_,d,t)=>`${formatAppDate(d)} · ${formatAppTime(t)}`);s=s.replace(/\b\d{4}-\d{2}-\d{2}\b/g,d=>formatAppDate(d));s=s.replace(/\b([01]?\d|2[0-3]):([0-5]\d)\b(?!\s*[AP]M)/gi,t=>formatAppTime(t));if(s!==n.nodeValue)n.nodeValue=s;});}
function enhanceDateTimeInputs(root=document){root.querySelectorAll('input[type="date"],input[type="time"]').forEach(original=>{if(original.dataset.formatEnhanced)return;original.dataset.formatEnhanced='1';const kind=original.type,proxy=document.createElement('input');proxy.type='text';proxy.className=original.className;proxy.placeholder=kind==='date'?'DD-MM-YYYY':'HH:MM AM/PM';proxy.value=kind==='date'?formatAppDate(original.value):formatAppTime(original.value);proxy.setAttribute('aria-label',original.getAttribute('aria-label')||proxy.placeholder);original.style.display='none';original.insertAdjacentElement('afterend',proxy);const sync=()=>{const parsed=kind==='date'?parseDisplayDate(proxy.value):parseDisplayTime(proxy.value);if(!parsed){proxy.classList.add('input-format-error');toast(`Invalid ${kind} format`,kind==='date'?'Use DD-MM-YYYY.':'Use HH:MM AM/PM.','err');return;}proxy.classList.remove('input-format-error');original.value=parsed;original.dispatchEvent(new Event('change',{bubbles:true}));};proxy.addEventListener('change',sync);proxy.addEventListener('blur',()=>{if(proxy.value)sync();});});}

/* ---------- Navigation config ---------- */
const NAV = [
  { section: 'Main', items: [
    { id: 'overview', label: 'Overview', icon: 'overview' },
  ]},
  { section: 'CRM', items: [
    { id: 'pipeline', label: 'CRM Pipeline', icon: 'crm' },
    { id: 'intelligence', label: 'CRM Intelligence', icon: 'analytics' },
    { id: 'workspace', label: 'Daily Sales Workspace', icon: 'cal' },
    { id: 'followups', label: 'Follow-ups', icon: 'clock' },
    { id: 'enquiries', label: 'Enquiries', icon: 'enquiry' },
    { id: 'createquotation', label: 'Create Quotation', icon: 'plus' },
    { id: 'quotations', label: 'Quotations', icon: 'quote' },
    { id: 'sor', label: 'Schedule of Rates', icon: 'rate' },
    { id: 'customers', label: 'Clients', icon: 'customer' },
    { id: 'tenders', label: 'Tenders', icon: 'tender' },
  ]},
  { section: 'Compliance', items: [
    { id: 'credentials', label: 'Credentials', icon: 'cred' },
    { id: 'scope', label: 'Accreditation Scope', icon: 'scope' },
    { id: 'package', label: 'Package Builder', icon: 'document' },
    { id: 'calendar', label: 'Expiry Calendar', icon: 'cal' },
  ]},
  { section: 'Operations', items: [
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
    { id: 'notifications', label: 'Alerts', icon: 'alert' },
    { id: 'portal', label: 'Client Portal', icon: 'portal' },
    { id: 'users', label: 'User Management', icon: 'employee' },
    { id: 'audit', label: 'Audit Trail', icon: 'shield' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ]},
];

/* ---------- App State ---------- */
const state = { route: 'overview', collapsed: false, theme: 'light', mobileOpen: false, period: 'Last 30 days' };
const CRM_ROUTES = new Set(['pipeline', 'intelligence', 'workspace', 'followups', 'enquiries', 'createquotation', 'quotations', 'sor', 'customers', 'tenders']);

function setRouteMotionContext(route) {
  const app = document.getElementById('app');
  const canvas = document.getElementById('canvas');
  const isCRM = CRM_ROUTES.has(route);
  app?.classList.toggle('crm-route-active', isCRM);
  if (canvas) {
    canvas.dataset.route = route;
    canvas.dataset.section = isCRM ? 'crm' : '';
  }
}

/* ---------- Audit Trail store (persisted to localStorage) ---------- */
const AUDIT_KEY = 'pth_audit_v1';
let auditLog = (() => {
  try { const s = JSON.parse(localStorage.getItem(AUDIT_KEY)); if (Array.isArray(s)) return s; } catch (e) {}
  return (DB.seedAudit || []).slice();
})();
function nowStamp() {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function logAudit(action, module, detail) {
  auditLog.unshift({ ts: nowStamp(), user: DB.user.name, role: DB.user.role, action, module, detail });
  if (auditLog.length > 800) auditLog.length = 800;
  try { localStorage.setItem(AUDIT_KEY, JSON.stringify(auditLog)); } catch (e) {}
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
  normalizeVisibleDateTimes(drawer);
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
  enhanceDateTimeInputs(scrim);
  normalizeVisibleDateTimes(scrim);
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
        <div class="topbar-user" id="topbarUser">
          <button class="avatar" id="avatarBtn" type="button" aria-label="Open user menu" aria-haspopup="menu" aria-expanded="false" title="${DB.user.name} — ${DB.user.role}">${DB.user.initials}</button>
          <div class="user-menu" id="userMenu" role="menu" hidden>
            <div class="user-menu-head"><span class="avatar">${DB.user.initials}</span><div><strong>${esc(DB.user.name)}</strong><small>${esc(DB.user.role)}</small></div></div>
            <button type="button" role="menuitem" onclick="navigate('settings');closeUserMenu()">${I.settings}Profile & Settings</button>
            <button type="button" role="menuitem" class="user-menu-logout" onclick="signOut()">${I.x}Logout</button>
          </div>
        </div>
      </header>
      <main class="canvas" id="canvas"></main>
    </div>
    <nav class="mobile-nav">
      ${['overview','pipeline','followups','credentials','notifications'].map(id => {
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
  document.getElementById('topSearch').onclick = () => openGlobalSearch();
  document.getElementById('avatarBtn').onclick = event => { event.stopPropagation(); toggleUserMenu(); };
  document.removeEventListener('click', closeUserMenuOnOutsideClick);
  document.addEventListener('click', closeUserMenuOnOutsideClick);
  const shellSearch=document.getElementById('globalSearch');
  shellSearch.addEventListener('focus',()=>openGlobalSearch(shellSearch.value));
  shellSearch.addEventListener('input',()=>openGlobalSearch(shellSearch.value));
  document.removeEventListener('keydown', globalSearchShortcut);
  document.addEventListener('keydown', globalSearchShortcut);
}

function toggleUserMenu() {
  const menu = document.getElementById('userMenu'), button = document.getElementById('avatarBtn');
  if (!menu || !button) return;
  const willOpen = menu.hidden;
  menu.hidden = !willOpen;
  button.setAttribute('aria-expanded', String(willOpen));
}
function closeUserMenu() {
  const menu = document.getElementById('userMenu'), button = document.getElementById('avatarBtn');
  if (menu) menu.hidden = true;
  if (button) button.setAttribute('aria-expanded', 'false');
}
function closeUserMenuOnOutsideClick(event) {
  if (!event.target.closest?.('#topbarUser')) closeUserMenu();
}

let globalSearchResults=[];
function globalSearchShortcut(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openGlobalSearch();}}
function globalSearchIndex(){
  const out=[],add=(module,title,sub,keywords,route,type='route',id='')=>out.push({module,title:String(title||''),sub:String(sub||''),keywords:String(keywords||''),route,type,id:String(id||'')});
  NAV.forEach(sec=>sec.items.forEach(x=>add('Module',x.label,sec.section,`${x.id} ${x.label} ${sec.section}`,x.id)));
  (DB.pipeline.leads||[]).filter(canViewCrmRecord).forEach(x=>add('Enquiry',x.cust,`${x.id} · ${x.proj}`,`${x.cat} ${x.col} ${x.person} ${x.prio} ${enterprisePermission('financial')?x.val:''}`, 'pipeline','lead',x.id));
  (followups||[]).filter(canViewCrmRecord).forEach(x=>add('Follow-up',x.customer,`${x.subject} · ${x.channel}`,`${x.id} ${x.assignee} ${x.status} ${x.priority} ${x.due} ${x.notes||''}`, 'followups','followup',x.id));
  (savedQuotations||[]).filter(canViewCrmRecord).forEach(x=>add('Quotation',x.number,`${x.customer} · ${maskFinancial(x.total||0)}`,`${x.status} ${x.date} ${x.kindAttention||''} ${(x.items||[]).map(i=>`${i.cat} ${i.name} ${i.code}`).join(' ')}`, 'quotations','quotation',x.number));
  allClients().forEach(x=>add('Client',x.name,`${x.cat||'General'} · ${x.contact||'No contact'}`,`${x.email||''} ${x.phone||''} ${x.gst||''} ${x.address||''} ${x.notes||''}`, 'customers','client',x.name));
  (DB.tenders||[]).forEach(x=>add('Tender',x.title,`${x.id} · ${x.client}`,`${x.stage} ${x.due} ${x.value} ${x.docs} ${x.missing}`, 'tenders','tender',x.id));
  (DB.credentials||[]).forEach(x=>add('Credential',x.name,`${x.id} · ${x.cat}`,`${x.auth} ${x.cert} ${x.branch} ${x.person} ${x.status} ${x.expiry}`, 'credentials','credential',x.id));
  (DB.scopes||[]).forEach(x=>add('Accreditation Scope',x.name,`${x.standards} · ${x.status}`,`${x.id||''} ${x.discipline||''}`, 'scope'));
  (window.SOR||[]).forEach(cat=>{add('SOR Category',cat.name,`${cat.id} · ${(cat.tests||[]).length} tests`,`${cat.id} ${cat.name}`, 'sor','sor',cat.name);(cat.tests||[]).forEach(t=>add('SOR Test',t.name,`${cat.name} · ${t.code||'No code'} · ${t.rate==null?'On request':inr(t.rate)}`,`${cat.id} ${cat.name} ${t.code||''} ${t.unit||''} ${t.rate??''}`, 'sor','sor',t.name));});
  (DB.users||[]).forEach(x=>add('User',x.name,`${x.role} · ${x.status}`,`${x.id} ${x.email||''} ${x.branch||''} ${x.initials||''}`, 'users'));
  (auditLog||[]).forEach((x,i)=>add('Audit Trail',`${x.action} · ${x.module}`,x.detail,`${x.ts} ${x.user} ${x.role}`, 'audit','audit',String(i)));
  return out;
}
function globalSearchScore(item,q){const terms=q.toLowerCase().split(/\s+/).filter(Boolean),title=item.title.toLowerCase(),module=item.module.toLowerCase(),hay=`${title} ${item.sub} ${item.keywords}`.toLowerCase();if(!terms.every(t=>hay.includes(t)))return-1;return terms.reduce((s,t)=>s+(title.startsWith(t)?12:title.includes(t)?8:module.includes(t)?5:2),0);}
function openGlobalSearch(seed=''){
  const current=document.querySelector('.global-search-input')?.value,query=current!=null?current:seed;
  if(!document.querySelector('.global-search-modal')){openModal(`<div class="global-search-head">${I.search}<input class="global-search-input" aria-label="Search entire application" placeholder="Search clients, tests, quotations, IDs, people, modules…" autocomplete="off"><kbd>ESC</kbd></div><div class="global-search-summary" id="globalSearchSummary"></div><div class="global-search-results" id="globalSearchResults"></div><div class="global-search-foot"><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>Enter</kbd> Open</span><span>Searches all application modules and records</span></div>`);const modal=document.querySelector('.modal');modal?.classList.add('global-search-modal');const createdInput=document.querySelector('.global-search-input');createdInput.addEventListener('input',()=>renderGlobalSearch(createdInput.value));createdInput.addEventListener('keydown',globalSearchKeydown);}else document.querySelector('.modal-scrim')?.classList.add('open');
  const input=document.querySelector('.global-search-input');if(input&&seed!==''&&input.value!==seed)input.value=seed;renderGlobalSearch(input?.value||query||'');
  setTimeout(()=>input?.focus(),30);
}
function renderGlobalSearch(query=''){
  const index=globalSearchIndex(),q=query.trim();globalSearchResults=(q?index.map(x=>({...x,score:globalSearchScore(x,q)})).filter(x=>x.score>=0).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title)):index.filter(x=>x.module==='Module')).slice(0,60);
  const host=document.getElementById('globalSearchResults'),sum=document.getElementById('globalSearchSummary');if(!host)return;if(sum)sum.innerHTML=q?`<b>${globalSearchResults.length}</b> results for “${esc(q)}”`:`Quick access · start typing to search ${index.length.toLocaleString('en-IN')} indexed records`;
  host.innerHTML=globalSearchResults.length?globalSearchResults.map((x,i)=>`<button class="global-search-result ${i===0?'selected':''}" data-search-index="${i}" onmouseenter="selectGlobalSearchResult(${i})" onclick="openGlobalSearchResult(${i})"><span class="global-search-icon">${I[x.type==='lead'?'enquiry':x.type==='quotation'?'quote':x.type==='credential'?'cred':x.type==='tender'?'tender':x.type==='client'?'customer':x.type==='sor'?'rate':x.type==='followup'?'clock':'document']||I.document}</span><span><b>${esc(x.title)}</b><small>${esc(x.sub)}</small></span><em>${esc(x.module)}</em>${I.arrowR}</button>`).join(''):`<div class="global-search-empty">${I.search}<h3>No matching records</h3><p>Try a customer, document number, test, IS code, person, status or module name.</p></div>`;
}
function selectGlobalSearchResult(i){document.querySelectorAll('.global-search-result').forEach((x,n)=>x.classList.toggle('selected',n===i));}
function globalSearchKeydown(e){const rows=[...document.querySelectorAll('.global-search-result')];if(e.key==='Escape'){closeModal();return;}if(!rows.length)return;let i=Math.max(0,rows.findIndex(x=>x.classList.contains('selected')));if(e.key==='ArrowDown'){e.preventDefault();i=Math.min(rows.length-1,i+1);selectGlobalSearchResult(i);rows[i].scrollIntoView({block:'nearest'});}if(e.key==='ArrowUp'){e.preventDefault();i=Math.max(0,i-1);selectGlobalSearchResult(i);rows[i].scrollIntoView({block:'nearest'});}if(e.key==='Enter')'')}</select></label>
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
    ${overviewVisionHTML()}
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
                <div class="appr-prog"><div class="prog-track"><span style="width:0" data-w="${a.prog}"></span></div><div class="prog-label">Expiry ${formatAppDate(a.expiry)}</div></div>
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

      <div class="col-4">
        <div class="card card-pad enter" style="height:100%">
          <div class="card-head"><div><h3>Today's Follow-ups</h3><div class="card-sub">Overdue &amp; due today</div></div><a class="kpi-link" onclick="navigate('followups')">All ${I.arrowR}</a></div>
          <div id="ovFollowups" style="margin-top:8px"></div>
          <button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center;margin-top:12px" onclick="openFollowupModal()">${I.plus}New Follow-up</button>
        </div>
      </div>

      <div class="col-12 overview-bi-head enter">
        <div><div class="eyebrow">LIVE BUSINESS INTELLIGENCE</div><h2>Executive Decision Centre</h2><p>Cross-module commercial, operational and portfolio analysis from current CRM records.</p></div>
        <button class="btn btn-ghost" onclick="navigate('analytics')">Open Report Centre ${I.arrowR}</button>
      </div>
      <div class="col-12"><div class="overview-bi-kpis" id="ovBiKpis"></div></div>

      <div class="col-12"><div class="card card-pad surat-map-card enter"><div class="card-head surat-map-head"><div><h3>Surat Business Activity Map</h3><div class="card-sub">Person-wise enquiries, site visits, meetings and closed works across Surat zones</div></div><div class="surat-map-controls"><select class="select" id="suratOwnerFilter" onchange="renderSuratActivityMap()"><option value="all">All persons</option></select><div class="seg" id="suratTypeFilter"><button class="on" data-maptype="all" onclick="setSuratMapType('all')">All</button><button data-maptype="inquiry" onclick="setSuratMapType('inquiry')">Enquiries</button><button data-maptype="visit" onclick="setSuratMapType('visit')">Visits</button><button data-maptype="meeting" onclick="setSuratMapType('meeting')">Meetings</button><button data-maptype="closed" onclick="setSuratMapType('closed')">Closed</button></div></div></div><div class="surat-map-layout"><div id="suratMap" class="surat-map"></div><aside><div id="suratMapStats" class="surat-map-stats"></div><div class="surat-map-legend"><span><i class="inquiry"></i>Enquiry</span><span><i class="visit"></i>Site visit</span><span><i class="meeting"></i>Meeting</span><span><i class="closed"></i>Closed work</span></div><div id="suratPersonList" class="surat-person-list"></div></aside></div></div></div>

      <div class="col-6"><div class="card card-pad bi-card hoverlift"><div class="card-head"><div><h3>Sales Funnel</h3><div class="card-sub">Opportunity count and stage value</div></div><a class="kpi-link" onclick="navigate('pipeline')">Pipeline ${I.arrowR}</a></div><div id="ovFunnelBars" class="bi-bars"></div></div></div>
      <div class="col-6"><div class="card card-pad bi-card hoverlift"><div class="card-head"><div><h3>Quotation Status Mix</h3><div class="card-sub">Share of saved quotations</div></div><a class="kpi-link" onclick="navigate('quotations')">Quotations ${I.arrowR}</a></div><div class="bi-donut-layout"><div id="ovQuotePie"></div><div id="ovQuoteLegend" class="legend"></div></div></div></div>
      <div class="col-6"><div class="card card-pad bi-card hoverlift"><div class="card-head"><div><h3>Opportunity by Test Category</h3><div class="card-sub">Open pipeline value concentration</div></div></div><div id="ovServiceBars" class="bi-bars"></div></div></div>
      <div class="col-6"><div class="card card-pad bi-card hoverlift"><div class="card-head"><div><h3>Follow-up Effectiveness</h3><div class="card-sub">Volume, completion and overdue activity by channel</div></div><a class="kpi-link" onclick="navigate('followups')">Actions ${I.arrowR}</a></div><div id="ovFollowupBars" class="bi-bars"></div></div></div>
      <div class="col-6"><div class="card card-pad bi-card hoverlift"><div class="card-head"><div><h3>Top Client Portfolio</h3><div class="card-sub">Clients ranked by open opportunity value</div></div><a class="kpi-link" onclick="navigate('clients')">Clients ${I.arrowR}</a></div><div id="ovClientBars" class="bi-bars"></div></div></div>
      <div class="col-6"><div class="card card-pad bi-card hoverlift"><div class="card-head"><div><h3>Tender Portfolio</h3><div class="card-sub">Current bid distribution by stage</div></div><a class="kpi-link" onclick="navigate('tenders')">Tenders ${I.arrowR}</a></div><div class="bi-donut-layout"><div id="ovTenderPie"></div><div id="ovTenderLegend" class="legend"></div></div></div></div>
      <div class="col-6"><div class="card card-pad bi-card hoverlift"><div class="card-head"><div><h3>Owner Forecast</h3><div class="card-sub">Probability-weighted opportunity value</div></div></div><div id="ovOwnerBars" class="bi-bars"></div></div></div>
      <div class="col-6"><div class="card card-pad bi-card hoverlift"><div class="card-head"><div><h3>SOR Rate Coverage</h3><div class="card-sub">Fixed-price versus on-request services</div></div><a class="kpi-link" onclick="navigate('sor')">View SOR ${I.arrowR}</a></div><div class="bi-donut-layout"><div id="ovSorPie"></div><div id="ovSorLegend" class="legend"></div></div></div></div>
    </div>
    ${overviewTargetsHTML()}
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
    const ovf = document.getElementById('ovFollowups'); if (ovf) renderOverviewFollowups(ovf);
    renderOverviewBusinessIntelligence();
    initSuratActivityMap();
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

function ovGroup(items, keyFn) { return items.reduce((g, x) => { const k = keyFn(x) || 'Unspecified'; (g[k] ||= []).push(x); return g; }, {}); }
function ovPercent(a, b) { return b ? Math.round(a / b * 100) : 0; }
function ovBars(id, rows, valueFmt = v => Number(v).toLocaleString('en-IN'), extraFmt = null) {
  const host = document.getElementById(id); if (!host) return;
  const clean = rows.filter(x => Number.isFinite(+x.value)).slice(0, 6), max = Math.max(1, ...clean.map(x => +x.value));
  host.innerHTML = clean.length ? clean.map((x, i) => `<div class="bi-bar-row"><div class="bi-bar-meta"><b title="${esc(x.label)}">${esc(x.label)}</b><span class="tnum">${esc(valueFmt(+x.value))}${extraFmt ? ` <small>${esc(extraFmt(x))}</small>` : ''}</span></div><div class="bi-bar-track"><span style="width:${Math.max(2, +x.value / max * 100)}%;--bar-index:${i}"></span></div></div>`).join('') : '<div class="empty bi-empty"><h4>No current data</h4></div>';
}
function ovDonut(id, legendId, rows, centerSub) {
  const palette = ['var(--primary)','var(--info)','var(--warning)','var(--danger)','#7958d7','#2bb8a8'], clean = rows.filter(x => +x.value > 0);
  const safe = clean.length ? clean : [{ label: 'No data', value: 1, color: 'var(--border)' }], total = clean.reduce((s, x) => s + +x.value, 0);
  safe.forEach((x, i) => x.color ||= palette[i % palette.length]);
  donutChart(document.getElementById(id), safe, { size: 166, stroke: 23, center: total, centerSub });
  const legend = document.getElementById(legendId); if (legend) legend.innerHTML = safe.map(x => `<div class="legend-row"><span class="lg-dot" style="background:${x.color}"></span><span class="lg-name">${esc(x.label)}</span><span class="lg-val tnum">${clean.length ? x.value : 0}</span></div>`).join('');
}
function renderOverviewBusinessIntelligence() {
  const leads = DB.pipeline.leads || [], open = leads.filter(x => !['won','lost'].includes(x.col));
  const quotes = savedQuotations || [], fus = followups || [], tenders = DB.tenders || [];
  const openValue = open.reduce((s,x)=>s+(+x.val||0),0), weighted = open.reduce((s,x)=>s+(+x.val||0)*(+x.prob||0)/100,0);
  const won = leads.filter(x=>x.col==='won'), overdue = fus.filter(x=>x.status!=='completed' && followupTiming(x)==='overdue');
  const tenderValue = tenders.reduce((s,x)=>s+(+x.value||0),0), quoteValue = quotes.reduce((s,x)=>s+(+x.total||0),0);
  const kpis = [['Open Pipeline',inr(openValue),'Active opportunity value'],['Weighted Forecast',inr(weighted),`${ovPercent(weighted,openValue)}% confidence-adjusted`],['Quotation Value',inr(quoteValue),`${quotes.length} quotations`],['Pipeline Win Rate',`${ovPercent(won.length,leads.length)}%`,`${won.length} opportunities won`],['Overdue Follow-ups',overdue.length,overdue.length?'Action required':'All caught up'],['Tender Portfolio',inr(tenderValue),`${tenders.length} active records`]];
  const kh = document.getElementById('ovBiKpis'); if (kh) kh.innerHTML = kpis.map((x,i)=>`<div class="card bi-number hoverlift"><span>${esc(x[0])}</span><strong class="tnum">${esc(x[1])}</strong><small>${esc(x[2])}</small><i style="--bi-index:${i}"></i></div>`).join('');

  const funnel = DB.pipeline.columns.map(c=>{const a=leads.filter(x=>x.col===c.id);return{label:c.name,value:a.reduce((s,x)=>s+(+x.val||0),0),count:a.length};});
  ovBars('ovFunnelBars', funnel, inr, x=>`${x.count} opportunities`);
  const qg=ovGroup(quotes,x=>x.status); ovDonut('ovQuotePie','ovQuoteLegend',Object.entries(qg).map(([label,a])=>({label:label[0].toUpperCase()+label.slice(1),value:a.length})),'Quotations');
  const sg=ovGroup(open,x=>x.cat); ovBars('ovServiceBars',Object.entrile="background:${x.color}"></i><div><b>${esc(x.name)}</b><small>${x.level} · ${x.days} days · ${x.action}</small></div>${I.arrowR}</button>`).join('')}</div></div></div>`;}
if(tab==='reports'){host.innerHTML=`<div class="workspace-head"><div><h3>Saved Reports & Schedules</h3><p>Reusable datasets with filtered columns and recurring schedules.</p></div><button class="btn btn-primary" onclick="openReportBuilder()">${I.plus}Build Report</button></div><div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Report</th><th>Source</th><th>Columns</th><th>Schedule</th><th>Last Run</th><th></th></tr></thead><tbody>${enterpriseCRM.savedReports.map(r=>`<tr><td><b>${esc(r.name)}</b><div class="page-desc">${esc(r.filterField?`${r.filterField} contains ${r.filterValue}`:'No filter')}</div></td><td>${titleCaseSafe(r.module)}</td><td>${r.fields.length}</td><td>${titleCaseSafe(r.schedule)}</td><td>${enterpriseCRM.reportLastRun[r.id]?formatAppDateTime(enterpriseCRM.reportLastRun[r.id]):'Never'}</td><td><button class="btn btn-sm btn-primary" onclick="runSavedReport(enterpriseCRM.savedReports.find(x=>x.id==='${r.id}'),true);renderWorkspaceTab('reports')">Run & Export</button></td></tr>`).join('')||'<tr><td colspan="6"><div class="empty"><h4>No saved reports</h4></div></td></tr>'}</tbody></table></div></div>`;}
if(tab==='approvals') renderManagementApprovalInbox(host); }
function renderManagementApprovalInbox(host){const approvals=[...enterpriseCRM.managementApprovals,...crmIntel.approvals.map(x=>({...x,type:'Quotation',record:x.quotation,title:`Commercial approval · ${x.customer}`,amount:x.value}))].filter(x=>x.status==='pending');let rows='';for(const a of approvals){const quotation=a.type==='Quotation',approve=quotation?`crmDecideApproval('${a.id}','approved')`:`decideManagementApproval('${a.id}','approved')`,reject=quotation?`crmDecideApproval('${a.id}','rejected')`:`decideManagementApproval('${a.id}','rejected')`,notesId=quotation?`approvalNotes-${a.id}`:`mapNotes-${a.id}`,actions=enterprisePermission('approve')?`<textarea class="input" id="${notesId}" placeholder="Decision notes"></textarea><div><button class="btn btn-sm btn-ghost" onclick="${reject}">Reject</button><button class="btn btn-sm btn-primary" onclick="${approve}">Approve</button></div>`:'<div class="restricted-panel">View only — management approval permission required.</div>';rows+=`<div class="card card-pad management-approval"><div><span class="badge badge-review">${esc(a.type)}</span><h3>${esc(a.title||a.record)}</h3><p>${(a.reasons||[]).map(esc).join(' · ')}</p><small>${esc(a.requestedBy)} · ${formatAppDateTime(a.requestedAt)}</small></div><strong>${enterprisePermission('financial')?inr(a.amount||0):'Restricted'}</strong>${actions}</div>`;}host.innerHTML=`<div class="workspace-head"><div><h3>Management Approval Inbox</h3><p>Commercial, credit-risk and management exceptions in one queue.</p></div><span class="badge badge-expiring">${approvals.length} pending</span></div>${rows||'<div class="empty"><h4>No approvals waiting</h4></div>'}`;}
function siteVisitCard(v,full=false){return`<article class="site-visit-card ${v.status}"><header><div><span>${esc(v.id)} · ${formatAppDate(v.date)} · ${formatAppTime(v.time)}</span><h3>${esc(v.customer)}</h3></div>${statusBadge(v.status==='checked_in'?'today':v.status==='completed'?'completed':'pending')}</header><p>${esc(v.purpose)} · ${esc(v.site)}</p><small>${I.employee} ${esc(v.owner)}${v.location?.lat?` · ${v.location.lat}, ${v.location.lng}`:''}</small><footer><button class="btn btn-sm btn-ghost" onclick="openSiteVisitModal('${v.id}')">${I.edit}Edit</button>${v.status==='planned'?`<button class="btn btn-sm btn-primary" onclick="checkInSiteVisit('${v.id}')">Check In</button>`:''}${v.status==='checked_in'?`<button class="btn btn-sm btn-primary" onclick="openVisitReport('${v.id}')">Visit Report</button>`:''}${v.status==='completed'?`<button class="btn btn-sm btn-ghost" onclick="openVisitReport('${v.id}')">View / Update Report</button>`:''}</footer></article>`;}
VIEWS.workspace=function(c){const due=workspaceActivities().filter(x=>x.due<=localDateISO()).length,visits=workspaceVisits().filter(x=>x.date===localDateISO()).length,issues=dataQualityIssues().length,approvals=enterpriseCRM.managementApprovals.filter(x=>x.status==='pending').length+crmIntel.approvals.filter(x=>x.status==='pending').length;c.innerHTML=`${pageHead('Daily Sales Workspace','Mobile-first priorities, site visits, customer intelligence, approvals and reports.',`<button class="btn btn-ghost" onclick="openEnterpriseSettings()">${I.settings}Configure</button><button class="btn btn-primary" onclick="openSiteVisitModal()">${I.plus}Plan Visit</button>`)}<div class="workspace-kpis"><div><b>${due}</b><span>Actions due</span></div><div><b>${visits}</b><span>Visits today</span></div><div><b>${approvals}</b><span>Approvals</span></div><div><b>${issues}</b><span>Data issues</span></div></div><div class="workspace-tabs">${[['today','My Day'],['visits','Site Visits'],['commercial','Competitors & Pricing'],['quality','Quality & Retention'],['reports','Reports'],['approvals','Approvals']].map((x,i)=>`<button data-workspace-tab="${x[0]}" class="${i===0?'active':''}" onclick="renderWorkspaceTab('${x[0]}')">${x[1]}</button>`).join('')}</div><div id="workspaceContent"></div>`;renderWorkspaceTab('today');};

const PIPELINE_KEY = 'pth_pipeline_v1';
// Default win-probability per stage — applied automatically as leads move between columns.
const STAGE_PROB = { new: 10, review: 25, visit: 40, prep: 55, sent: 65, nego: 75, po: 90, won: 100, lost: 0 };
let pipelineFilter = { search: '', owner: 'all', priority: 'all' };
(function loadPipeline() { try { const s = JSON.parse(localStorage.getItem(PIPELINE_KEY)); if (Array.isArray(s)) DB.pipeline.leads = s; } catch (e) {} })();
function persistPipeline() { try { localStorage.setItem(PIPELINE_KEY, JSON.stringify(DB.pipeline.leads)); } catch (e) {} }
function nextLeadId() { return `L-${String(Math.max(0, ...DB.pipeline.leads.map(l => +String(l.id).replace(/\D/g, '') || 0)) + 1).padStart(4, '0')}`; }
function filteredLeads() {
  const term = pipelineFilter.search.toLowerCase();
  return DB.pipeline.leads.filter(l =>
    canViewCrmRecord(l) &&
    (pipelineFilter.owner === 'all' || l.person === pipelineFilter.owner) &&
    (pipelineFilter.priority === 'all' || l.prio === pipelineFilter.priority) &&
    (!term || `${l.cust} ${l.proj} ${l.cat} ${l.id}`.toLowerCase().includes(term)));
}
function pipelineMetrics() {
  const open = DB.pipeline.leads.filter(l => l.col !== 'won' && l.col !== 'lost');
  const openValue = open.reduce((a, l) => a + l.val, 0);
  const weighted = open.reduce((a, l) => a + l.val * (l.prob || 0) / 100, 0);
  const won = DB.pipeline.leads.filter(l => l.col === 'won'), lost = DB.pipeline.leads.filter(l => l.col === 'lost');
  const wonValue = won.reduce((a, l) => a + l.val, 0);
  const decided = won.length + lost.length;
  const winRate = decided ? Math.round(won.length / decided * 100) : 0;
  return { openCount: open.length, openValue, weighted, wonValue, winRate };
}
VIEWS.pipeline = function (c) {
  const cols = DB.pipeline.columns;
  const m = pipelineMetrics();
  const owners = [...new Set(DB.pipeline.leads.map(l => l.person))].sort();
  const actions = `<button class="btn btn-ghost hide-sm" onclick="openDataImport('enquiries')">${I.upload}Bulk Import</button><button class="btn btn-primary" onclick="openLeadModal()">${I.plus}New Lead</button>`;
  const leads = filteredLeads();
  const colHtml = cols.map(col => {
    const colLeads = leads.filter(l => l.col === col.id);
    const total = colLeads.reduce((a, l) => a + l.val, 0);
    return `
      <div class="kcol">
        <div class="kcol-head"><span class="kdot" style="background:${col.color}"></span><h4>${col.name}</h4><span class="kcount">${colLeads.length}</span></div>
        <div class="kcol-val">${inr(total)}</div>
        <div class="kcards" data-col="${col.id}">${colLeads.map(kanbanCard).join('') || '<div class="kcol-empty">Drop leads here</div>'}</div>
      </div>`;
  }).join('');
  c.innerHTML = `${pageHead('CRM Pipeline', 'Drag leads between stages. Moving to Won captures PO details; Lost captures a reason.', actions)}
    <div class="stat-strip enter" style="margin-bottom:16px">
      <div class="stat-chip"><div class="sc-val tnum">${m.openCount}</div><div class="sc-label">Open leads</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${inr(m.openValue)}</div><div class="sc-label">Open pipeline value</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--primary-dark)">${inr(m.weighted)}</div><div class="sc-label"><span class="dot" style="background:var(--primary-dark)"></span>Weighted forecast</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${inr(m.wonValue)}</div><div class="sc-label"><span class="dot" style="background:var(--primary)"></span>Won value</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${m.winRate}%</div><div class="sc-label">Win rate</div></div>
    </div>
    <div class="filter-bar enter" style="margin-bottom:16px">
      <div class="filter-search">${I.search}<input id="pipeSearch" placeholder="Search customer, project or category..." value="${esc(pipelineFilter.search)}" oninput="setPipelineFilter('search',this.value)"></div>
      <select class="fdrop" onchange="setPipelineFilter('owner',this.value)"><option value="all">All owners</option>${owners.map(o => `<option ${pipelineFilter.owner === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>
      <select class="fdrop" onchange="setPipelineFilter('priority',this.value)"><option value="all">All priorities</option><option value="high" ${pipelineFilter.priority === 'high' ? 'selected' : ''}>High</option><option value="med" ${pipelineFilter.priority === 'med' ? 'selected' : ''}>Medium</option><option value="low" ${pipelineFilter.priority === 'low' ? 'selected' : ''}>Low</option></select>
    </div>
    <div class="kanban enter">${colHtml}</div>`;
  wireKanban(c);
};
function setPipelineFilter(key, value) { pipelineFilter[key] = value; const c = document.getElementById('canvas'); const active = document.activeElement === document.getElementById('pipeSearch'); VIEWS.pipeline(c); if (active) { const s = document.getElementById('pipeSearch'); if (s) { s.focus(); s.setSelectionRange(s.value.length, s.value.length); } } }
function kanbanCard(l) {
  const nextFu = followups.filter(f => f.leadId === l.id && f.status !== 'completed').sort((a, b) => a.due.localeCompare(b.due))[0];
  const intelligence=crmLeadScore(l),health=crmDealHealth(l);
  const fuLabel = nextFu ? formatFollowupDate(nextFu.due) : (l.follow && l.follow !== '—' ? l.follow : 'No follow-up');
  const fuOverdue = nextFu && followupTiming(nextFu) === 'overdue';
  return `<div class="kcard" draggable="true" data-id="${l.id}" onclick="openLeadDrawer('${l.id}')">
    <div class="kcard-top"><div><div class="kcard-cust">${esc(l.cust)}</div><div class="kcard-proj">${esc(l.proj)}</div></div><span class="crm-score ${intelligence.band.toLowerCase()}" title="Lead score">${intelligence.score}</span></div>
    <span class="kcard-tag">${esc(l.cat)}</span>
    <div class="page-desc" style="margin-top:7px;color:${health.color}">${health.level} · ${esc(intelligence.next)}</div>
    <div class="kcard-meta"><span class="kcard-val">${inr(l.val)}</span><span>·</span><span style="${fuOverdue ? 'color:var(--danger);font-weight:600' : ''}">${esc(fuLabel)}</span></div>
    <div class="kcard-foot"><span class="mini-avatar">${esc(l.person)}</span><div class="prob-bar"><span style="width:${l.prob}%"></span></div><span style="font-size:11px;color:var(--text-muted)">${l.prob}%</span><button class="mini-act" onclick="event.stopPropagation();newFollowupForLead('${esc(l.id)}')" title="Schedule Follow-up">${I.clock}</button></div>
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
      if (!lead || lead.col === newCol) return;
      if (newCol === 'won') openWonModal(id);        // confirm-gated: nothing commits until the modal is confirmed
      else if (newCol === 'lost') openLostModal(id);
      else commitLeadStage(id, newCol);
    });
  });
}
// Move a lead to a normal stage, apply the stage's default probability, persist and re-render.
function commitLeadStage(id, newCol) {
  const lead = DB.pipeline.leads.find(l => l.id === id); if (!lead) return;
  lead.col = newCol; lead.prob = STAGE_PROB[newCol] ?? lead.prob; lead.updatedAt=new Date().toISOString();
  if (newCol !== 'won') delete lead.po; if (newCol !== 'lost') delete lead.lostReason;
  persistPipeline();
  const stageName = DB.pipeline.columns.find(x => x.id === newCol)?.name || newCol;
  toast('Lead moved', `${lead.cust} → ${stageName}`, 'info');
  logAudit('Status Change', 'CRM Pipeline', `${lead.cust} moved to ${stageName}`);
  crmRunAutomation('lead_saved',lead);
  VIEWS.pipeline(document.getElementById('canvas'));
}
function openWonModal(id) {
  const lead = DB.pipeline.leads.find(l => l.id === id); if (!lead) return;
  openModal(`<div class="modal-head"><div class="modal-title">Order Won — Purchase Order</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <div class="kv"><span class="k">Client</span><span class="v">${esc(lead.cust)}</span></div>
      <div class="field" style="margin-top:12px"><label>PO Number <span class="req">*</span></label><input class="input" id="wonPo" placeholder="e.g. PO/2026/0093"></div>
      <div class="field"><label>PO Value (₹)</label><input class="input tnum" id="wonValue" type="number" min="0" value="${lead.val}"></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-lime" onclick="confirmWon('${id}')">${I.check}Confirm Won</button></div>`);
}
function confirmWon(id) {
  const lead = DB.pipeline.leads.find(l => l.id === id); if (!lead) retuon followupDateTimeLabel(f) { return `${formatFollowupDate(f.due)}${f.time ? ` · ${formatAppTime(f.time)}` : ''}`; }
function customerContact(name) {
  const c = (DB.customers || []).find(x => String(x.name).toLowerCase() === String(name || '').toLowerCase());
  return { phone: c?.phone || '', email: c?.email || '' };
}
// Live count of overdue + due-today follow-ups, shown as a red badge on the sidebar nav.
function updateFollowupBadge() {
  const n = followupDueCount();
  const side = document.querySelector('.nav-item[data-route="followups"]');
  if (side) {
    let b = side.querySelector('.nav-badge');
    if (n > 0) { if (!b) { b = document.createElement('span'); b.className = 'nav-badge'; side.appendChild(b); } b.textContent = n; b.style.background = 'var(--danger)'; }
    else if (b) { b.remove(); }
  }
  const mob = document.querySelector('.mobile-nav a[data-route="followups"]');
  if (mob) {
    let b = mob.querySelector('.mobile-badge');
    if (n > 0) { if (!b) { b = document.createElement('span'); b.className = 'mobile-badge'; mob.appendChild(b); } b.textContent = n; }
    else if (b) { b.remove(); }
  }
}
// Re-render whatever follow-up surfaces are currently on screen, without disturbing open drawers.
function refreshFollowupViews() {
  updateFollowupBadge();
  if (state.route === 'followups') { const canvas = document.getElementById('canvas'); if (canvas) VIEWS.followups(canvas); }
  else { const host = document.getElementById('ovFollowups'); if (host) renderOverviewFollowups(host); }
}
function newFollowupForCustomer(name) { openFollowupModal('', false, '', '', { customer: name }); }
function newFollowupForLead(id) { openFollowupModal('', false, id, ''); }
function newFollowupForQuote(number) { openFollowupModal('', false, '', number); }
function followupTiming(record) {
  if (record.status === 'completed') return 'completed';
  const today = localDateISO();
  if (record.due < today) return 'overdue';
  if (record.due === today) return 'today';
  return 'pending';
}
function formatFollowupDate(value) {
  return formatAppDate(value);
}
function followupHistoryHTML(records) {
  const sorted=[...records].sort((a,b)=>`${b.due} ${b.time}`.localeCompare(`${a.due} ${a.time}`));
  return sorted.length?`<div class="followup-history">${sorted.map(f=>{const timing=followupTiming(f);return `<div class="followup-history-item ${timing}" style="cursor:pointer" onclick="closeDrawer();openFollowupDrawer('${f.id}')"><div class="fh-date"><b>${formatFollowupDate(f.due)}</b><span>${esc(f.time||'—')}</span></div><div class="fh-main"><div class="cell-strong">${esc(f.subject)}</div><div class="cell-dim">${esc(f.channel)} · ${esc(f.assignee)}</div>${f.notes?`<div class="fh-notes">${esc(f.notes)}</div>`:''}${f.outcome?`<div class="fh-notes" style="color:var(--primary-dark)"><b>Outcome:</b> ${esc(f.outcome)}</div>`:''}</div><div>${statusBadge(timing)}</div></div>`;}).join('')}</div>`:`<div class="empty" style="padding:28px"><div class="empty-ico">${I.clock}</div><h4>No previous follow-ups</h4><p>Schedule the first follow-up for this record.</p></div>`;
}
VIEWS.followups = function (c) {
  const today = localDateISO();
  const open = followups.filter(f => f.status !== 'completed');
  const overdue = open.filter(f => f.due < today).length;
  const dueToday = open.filter(f => f.due === today).length;
  const upcoming = open.filter(f => f.due > today).length;
  const completed = followups.filter(f => f.status === 'completed').length;
  c.innerHTML = `${pageHead('Follow-up Management', 'Plan, assign and track every customer and enquiry follow-up.', `<button class="btn btn-ghost" onclick="enableFollowupReminders()" title="Desktop reminders for due follow-ups">${I.bell}Reminders</button><button class="btn btn-ghost" onclick="exportFollowups()">${I.export}Export CSV</button><button class="btn btn-primary" onclick="openFollowupModal()">${I.plus}New Follow-up</button>`)}
    <div class="stat-strip enter">
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--danger)">${overdue}</div><div class="sc-label"><span class="dot" style="background:var(--danger)"></span>Overdue</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--warning)">${dueToday}</div><div class="sc-label"><span class="dot" style="background:var(--warning)"></span>Due today</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${upcoming}</div><div class="sc-label"><span class="dot" style="background:var(--info)"></span>Upcoming</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--primary-dark)">${completed}</div><div class="sc-label"><span class="dot" style="background:var(--primary-dark)"></span>Completed</div></div>
    </div>
    ${overdue ? `<div class="card card-pad enter followup-alert"><div style="display:flex;align-items:center;gap:10px;color:var(--danger)">${I.alert}<strong>${overdue} overdue follow-up${overdue === 1 ? '' : 's'} require attention</strong><button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="setFollowupFilter('status','overdue')">Review now</button></div></div>` : ''}
    <div class="filter-bar enter">
      <div class="filter-search">${I.search}<input id="followupSearch" placeholder="Search customer, subject or enquiry..." value="${esc(followupFilter.search)}" oninput="setFollowupFilter('search',this.value)"></div>
      <select class="fdrop" onchange="setFollowupFilter('status',this.value)"><option value="open" ${followupFilter.status==='open'?'selected':''}>Open follow-ups</option><option value="all" ${followupFilter.status==='all'?'selected':''}>All statuses</option><option value="today" ${followupFilter.status==='today'?'selected':''}>Due today</option><option value="overdue" ${followupFilter.status==='overdue'?'selected':''}>Overdue</option><option value="pending" ${followupFilter.status==='pending'?'selected':''}>Upcoming</option><option value="completed" ${followupFilter.status==='completed'?'selected':''}>Completed</option></select>
      <select class="fdrop" onchange="setFollowupFilter('priority',this.value)"><option value="all">All priorities</option><option value="high" ${followupFilter.priority==='high'?'selected':''}>High priority</option><option value="med" ${followupFilter.priority==='med'?'selected':''}>Medium priority</option><option value="low" ${followupFilter.priority==='low'?'selected':''}>Low priority</option></select>
      <select class="fdrop" onchange="setFollowupFilter('assignee',this.value)"><option value="all">All assignees</option>${[...new Set(followups.map(f=>f.assignee))].sort().map(name=>`<option ${followupFilter.assignee===name?'selected':''}>${esc(name)}</option>`).join('')}</select>
    </div>
    <div class="card enter"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Due</th><th>Client / Enquiry</th><th>Follow-up</th><th>Channel</th><th>Assigned To</th><th>Priority</th><th>Status</th><th>Actions</th></tr></thead><tbody id="followupBody"></tbody></table></div></div>`;
  renderFollowupRows();
}
function setFollowupFilter(key, value) { followupFilter[key] = value; renderFollowupRows(); }
function filteredFollowups() {
  const term = followupFilter.search.toLowerCase();
  return followups.filter(f => {
    const timing = followupTiming(f);
    const statusMatch = followupFilter.status === 'all' || (followupFilter.status === 'open' ? f.status !== 'completed' : timing === followupFilter.status);
    return statusMatch && (followupFilter.priority === 'all' || f.priority === followupFilter.priority) && (followupFilter.assignee === 'all' || f.assignee === followupFilter.assignee) && (!term || `${f.customer} ${f.subject} ${f.leadId} ${f.quoteNumber||''} ${f.notes}`.toLowerCase().includes(term));
  }).sort((a,b) => (a.status === 'completed') - (b.status === 'completed') || `${a.due} ${a.time}`.localeCompare(`${b.due} ${b.time}`));
}
function renderFollowupRows() {
  const body = document.getElementById('followupBody'); if (!body) return;
  const rows = filteredFollowups();
  body.innerHTML = rows.length ? rows.map(f => {
    const timing = followupTiming(f);
    const canContact = (f.channel === 'Email' && f.email) || ((f.channel === 'WhatsApp' || f.channel === 'Call') && f.phone);
    return `<tr class="followup-row ${timing}" style="cursor:pointer" onclick="openFollowupDrawer('${f.id}')"><td><div class="cell-strong tnum">${formatFollowupDate(f.due)}</div><div class="cell-dim tnum" style="font-size:11px;margin-top:2px">${esc(f.time || '—')}</div></td><td><div class="cell-strong">${esc(f.customer)}</div><div class="cell-dim tnum" style="font-size:11px">${esc(f.leadId || f.quoteNumber || 'General')}</div></td><td><div class="cell-strong">${esc(f.subject)}</div><div class="cell-dim followup-note">${esc(f.notes || 'No notes')}</div></td><td><span class="badge badge-neutral">${esc(f.channel)}</span></td><td class="cell-dim">${esc(f.assignee)}</td><td><span class="prio prio-${f.priority === 'high' ? 'high' : f.priority === 'med' ? 'med' : 'low'}">${f.priority}</span></td><td>${statusBadge(timing)}</td><td onclick="event.stopPropagation()"><div class="row-actions">${f.status !== 'completed' ? `<button class="mini-act" onclick="openCompleteFollowup('${f.id}')" title="Complete with outcome">${I.check}</button>${canContact ? `<button class="mini-act" onclick="launchFollowupChannel('${f.id}')" title="${esc(f.channel)}">${I.enquiry}</button>` : ''}<button class="mini-act" onclick="openFollowupModal('${f.id}',true)" title="Reschedule">${I.cal}</button>` : ''}<button class="mini-act" onclick="openFollowupModal('${f.id}')" title="Edit">${I.edit}</button><button class="mini-act" onclick="deleteFollowup('${f.id}')" title="Delete">${I.x}</button></div></td></tr>`;
  }).join('') : `<tr><td colspan="8"><div class="empty"><div class="empty-ico">${I.clock}</div><h4>No follow-ups found</h4><p>Change the filters or create a new follow-up.</p></div></td></tr>`;
}
function openFollowupModal(id = '', reschedule = false, leadId = '', quoteNumber = '', prefill = {}) {
  followupReturnRoute = state.route;
  const existing = followups.find(f => f.id === id);
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const linkedLead=DB.pipeline.leads.find(l=>l.id===leadId), linkedQuote=savedQuotations?.find(q=>q.number===quoteNumber);
  const custName = prefill.customer || linkedLead?.cust || linkedQuote?.customer || '';
  const contact = existing ? {} : customerContact(custName);
  const record = existing || { leadId, quoteNumber, customer:custName, subject:'', due:localDateISO(tomorrow), time:'10:00', channel:'Call', assignee:DB.user.name, priority:'med', notes:'', phone:prefill.phone||contact.phone||'', email:prefill.email||contact.email||'' };
  const leads = DB.pipeline.leads.filter(l => canViewCrmRecord(l)&&!['won','lost'].includes(l.col));
  const activityTypes=enterpriseCRM.activityTypes.filter(x=>x.active).map(x=>x.name);
  openModal(`<div class="modal-head"><div class="modal-title">${reschedule ? 'Reschedule Follow-up' : existing ? 'Edit Follow-up' : 'New Follow-up'}</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div><div class="modal-body">
    <div class="field"><label>Linked enquiry</label><select class="select" id="fuLead" onchange="syncFollowupCustomer(this.value)"><option value="">General / no enquiry</option>${leads.map(l=>`<option value="${l.id}" ${record.leadId===l.id?'selected':''}>${esc(l.id)} · ${esc(l.cust)} · ${esc(l.proj)}</option>`).join('')}</select></div>
    <div class="field"><label>Linked quotation</label><select class="select" id="fuQuotation" onchange="syncFollowupQuotation(this.value)"><option value="">No quotation</option>${savedQuotations.map(q=>`<option value="${esc(q.number)}" ${record.quoteNumber===q.number?'selected':''}>${esc(q.number)} · ${esc(q.customer)}</option>`).join('')}</select></div>
    <div class="field"><label>Client <span class="req">*</span></label><input class="input" id="fuCustomer" value="${esc(record.customer)}" placeholder="Client name"></div>
    <div class="form-grid"><div class="field"><label>Phone</label><input class="input" id="fuPhone" value="${esc(record.phone||'')}" placeholder="+91-9876543210"></div><div class="field"><label>Email</label><input class="input" id="fuEmail" value="${esc(record.email||'')}" placeholder="name@company.com"></div></div>
    <div class="field"><label>Follow-up subject <span class="req">*</span></label><input class="input" id="fuSubject" value="${esc(record.subject)}" placeholder="Purpose and next action"></div>
    <div class="form-grid"><div class="field"><label>Due date <span class="req">*</span></label><input class="input" id="fuDue" type="date" value="${record.due}"></div><div class="field"><label>Time</label><input class="input" id="fuTime" type="time" value="${record.time || '10:00'}"></div></div>
    <div class="form-grid"><div class="field"><label>Activity Type</label><select class="select" id="fuChannel">${activityTypes.map(x=>`<option ${record.channel===x?'selected':''}>${esc(x)}</option>`).join('')}</select></div><div class="field"><label>Priority</label><select class="select" id="fuPriority"><option value="high" ${record.priority==='high'?'selected':''}>High</option><option value="med" ${record.priority==='med'?'selected':''}>Medium</option><option value="low" ${record.priority==='low'?'selected':''}>Low</option></select></div></div>
    <div class="field"><label>Assigned to</label><select class="select" id="fuAssignee">${DB.staff.map(s=>`<option ${record.assignee===s.name?'selected':''}>${esc(s.name)}</option>`).join('')}<option ${record.assignee===DB.user.name?'selected':''}>${esc(DB.user.name)}</option></select></div>
    <div class="field"><label>Notes</label><textarea class="input" id="fuNotes" style="min-height:90px;resize:vertical" placeholder="Discussion points, documents required or promised action">${esc(record.notes)}</textarea></div>
  </div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveFollowup('${id}')">${I.check}${existing ? 'Save Changes' : 'Create Follow-up'}</button></div>`);
}
function fillFollowupContact(name) {
  const c = customerContact(name), phone = document.getElementById('fuPhone'), email = document.getElementById('fuEmail');
  if (phone && !phone.value && c.phone) phone.value = c.phone;
  if (email && !email.value && c.email) email.value = c.email;
}
function syncFollowupCustomer(leadId) { const lead = DB.pipeline.leads.find(l => l.id === leadId)n-ghost" style="flex:1;justify-content:center" onclick="openFollowupModal('${f.id}',true)">${I.cal}Reschedule</button></div>
          <div style="display:flex;gap:8px;margin-top:8px"><span class="page-desc" style="align-self:center">Snooze:</span><button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center" onclick="snoozeFollowup('${f.id}',1)">+1 day</button><button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center" onclick="snoozeFollowup('${f.id}',3)">+3 days</button><button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center" onclick="snoozeFollowup('${f.id}',7)">+1 week</button></div>`:''}
        <div style="display:flex;gap:8px;margin-top:12px"><button class="btn btn-ghost" style="flex:1;justify-content:center" onclick="openFollowupModal('${f.id}')">${I.edit}Edit</button><button class="btn btn-ghost" style="flex:1;justify-content:center;color:var(--danger)" onclick="deleteFollowup('${f.id}')">${I.x}Delete</button></div>
      </div>
      <div class="drawer-pane" id="pane-hi" style="display:none">${followupHistoryHTML(related)}</div>
    </div>`);
}
// Complete a follow-up with an outcome note, optionally chaining the next follow-up.
function openCompleteFollowup(id) {
  const f = followups.find(x => x.id === id); if (!f) return;
  const next = new Date(); next.setDate(next.getDate() + 3);
  openModal(`<div class="modal-head"><div class="modal-title">Complete Follow-up</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <div class="kv"><span class="k">Client</span><span class="v">${esc(f.customer)}</span></div>
      <div class="kv"><span class="k">Subject</span><span class="v">${esc(f.subject)}</span></div>
      <div class="field" style="margin-top:12px"><label>Outcome / result</label><textarea class="input" id="fuOutcome" style="min-height:80px;resize:vertical" placeholder="What happened? Decisions, commitments, next steps.">${esc(f.outcome||'')}</textarea></div>
      <div style="display:flex;align-items:center;gap:10px;padding:12px;background:var(--surface-soft);border:1px solid var(--border);border-radius:12px;margin-top:4px">
        <span class="toggle" id="fuNextToggle" onclick="this.classList.toggle('on');document.getElementById('fuNextFields').style.display=this.classList.contains('on')?'block':'none'"></span>
        <div><div style="font-size:13px;font-weight:600">Schedule next follow-up</div><div style="font-size:11.5px;color:var(--text-secondary)">Chain the next action for ${esc(f.customer)}</div></div>
      </div>
      <div id="fuNextFields" style="display:none;margin-top:12px">
        <div class="field"><label>Next follow-up subject</label><input class="input" id="fuNextSubject" value="Follow-up: ${esc(f.subject)}"></div>
        <div class="form-grid"><div class="field"><label>Due date</label><input class="input" id="fuNextDue" type="date" value="${localDateISO(next)}"></div><div class="field"><label>Time</label><input class="input" id="fuNextTime" type="time" value="${f.time||'10:00'}"></div></div>
      </div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="confirmCompleteFollowup('${f.id}')">${I.check}Mark Complete</button></div>`);
}
function confirmCompleteFollowup(id) {
  const f = followups.find(x => x.id === id); if (!f) return;
  f.status = 'completed'; f.completedAt = new Date().toISOString(); f.outcome = document.getElementById('fuOutcome')?.value.trim() || '';
  let chained = null;
  if (document.getElementById('fuNextToggle')?.classList.contains('on')) {
    const due = document.getElementById('fuNextDue')?.value;
    if (due) {
      chained = { id: nextFollowupId(), leadId: f.leadId || '', quoteNumber: f.quoteNumber || '', customer: f.customer, phone: f.phone || '', email: f.email || '', subject: document.getElementById('fuNextSubject').value.trim() || ('Follow-up: ' + f.subject), due, time: document.getElementById('fuNextTime').value || '10:00', channel: f.channel, assignee: f.assignee, priority: f.priority, notes: '', status: 'pending', prevId: f.id, createdAt: new Date().toISOString() };
      followups.push(chained);
    }
  }
  persistFollowups(); closeModal(); closeDrawer();
  toast('Follow-up completed', chained ? `Next scheduled: ${formatFollowupDate(chained.due)}` : `${f.customer} · ${f.subject}`);
  logAudit('Complete', 'Follow-ups', `${f.id} completed${chained ? `; next ${chained.id} on ${chained.due}` : ''}`);
  refreshFollowupViews();
}
// Kept for programmatic/instant completion (no outcome prompt).
function completeFollowup(id) {
  const f = followups.find(x => x.id === id); if (!f) return;
  f.status = 'completed'; f.completedAt = new Date().toISOString(); persistFollowups();
  toast('Follow-up completed', `${f.customer} · ${f.subject}`); logAudit('Complete', 'Follow-ups', `${f.id} marked completed`); refreshFollowupViews();
}
function snoozeFollowup(id, days) {
  const f = followups.find(x => x.id === id); if (!f) return;
  const d = new Date((f.due || localDateISO()) + 'T00:00:00'); d.setDate(d.getDate() + days);
  f.due = localDateISO(d); f.status = 'pending'; persistFollowups();
  toast('Follow-up rescheduled', `${f.customer} · ${formatFollowupDate(f.due)}`);
  logAudit('Reschedule', 'Follow-ups', `${f.id} snoozed ${days} day(s) to ${f.due}`);
  refreshFollowupViews(); if (document.querySelector('.drawer.open')) openFollowupDrawer(id);
}
function deleteFollowup(id) {
  const f = followups.find(x => x.id === id); if (!f) return;
  openModal(`<div class="modal-head"><div class="modal-title">Delete Follow-up</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div><div class="modal-body"><p>Delete the follow-up <b>${esc(f.subject)}</b> for ${esc(f.customer)}? This cannot be undone.</p></div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" style="background:var(--danger)" onclick="confirmDeleteFollowup('${f.id}')">Delete</button></div>`);
}
function confirmDeleteFollowup(id) {
  const i = followups.findIndex(x => x.id === id); if (i < 0) return;
  const f = followups[i]; followups.splice(i, 1); persistFollowups(); closeModal(); closeDrawer();
  toast('Follow-up deleted', f.subject, 'info'); logAudit('Delete', 'Follow-ups', `${f.id} deleted`); refreshFollowupViews();
}
// Launch the follow-up's channel (tel: / mailto: / wa.me) using the stored phone/email.
function launchFollowupChannel(id) {
  const f = followups.find(x => x.id === id); if (!f) return;
  const phone = String(f.phone || '').replace(/\D/g, ''), email = String(f.email || '').trim();
  if (f.channel === 'Email') { if (!email) { toast('No email on file', 'Add an email to this follow-up first.', 'err'); return; } window.open(`mailto:${email}?subject=${encodeURIComponent('Follow-up: ' + f.subject)}`, '_blank'); }
  else if (f.channel === 'WhatsApp') { if (phone.length < 10) { toast('No WhatsApp number', 'Add a valid phone number first.', 'err'); return; } window.open(`https://wa.me/${phone}?text=${encodeURIComponent('Dear ' + f.customer + ', regarding ' + f.subject + '.')}`, '_blank', 'noopener'); }
  else { if (phone.length < 7) { toast('No phone number', 'Add a phone number to this follow-up first.', 'err'); return; } window.open(`tel:${phone}`); }
  logAudit('Contact', 'Follow-ups', `${f.channel} initiated for ${f.customer} (${f.id})`);
}
// ---- Due-today reminders (in-app toast + optional desktop notifications) ----
const FOLLOWUP_NOTIFY_KEY = 'pth_followup_notified_v1';
function followupNotifiedIds() { try { const o = JSON.parse(localStorage.getItem(FOLLOWUP_NOTIFY_KEY) || '{}'); return o.date === localDateISO() ? (o.ids || []) : []; } catch (e) { return []; } }
function markFollowupsNotified(ids) { try { localStorage.setItem(FOLLOWUP_NOTIFY_KEY, JSON.stringify({ date: localDateISO(), ids })); } catch (e) {} }
function dueFollowups() { const today = localDateISO(); return followups.filter(f => f.status !== 'completed' && f.due <= today).sort((a, b) => `${a.due} ${a.time}`.localeCompare(`${b.due} ${b.time}`)); }
function fireFollowupNotifications(list) {
  list.slice(0, 5).forEach(f => {
    try {
      const n = new Notification(`${followupTiming(f) === 'overdue' ? 'Overdue follow-up' : 'Follow-up due today'} — ${f.customer}`, { body: `${f.subject} · ${f.channel}${f.time ? ` at ${f.time}` : ''}`, tag: `pth-fu-${f.id}`, icon: DB.brand.logoUrl });
      n.onclick = () => { window.focus(); navigate('followups'); openFollowupDrawer(f.id); n.close(); };
    } catch (e) {}
  });
}
// Runs on boot: always shows an in-app reminder toast; also fires desktop notifications if
// already permitted. De-duplicated to once per follow-up per day via localStorage.
function notifyDueFollowups() {
  const due = dueFollowups(); if (!due.length) return;
  const already = followupNotifiedIds();
  const fresh = due.filter(f => !already.includes(f.id));
  if (!fresh.length) return;
  const overdue = due.filter(f => followupTiming(f) === 'overdue').length;
  toast(`${due.length} follow-up${due.length === 1 ? '' : 's'} need attention`, `${overdue} overdue · ${due.length - overdue} due today`, 'info');
  if ('Notification' in window && Notification.permission === 'granted') fireFollowupNotifications(fresh);
  markFollowupsNotified(due.map(f => f.id));
}
// User-gesture opt-in (button in the Follow-ups view) — requesting permission needs a click.
function enableFollowupReminders() {
  if (!('Notification' in window)) { toast('Not supported', 'This browser does not support desktop notifications.', 'err'); return; }
  const due = dueFollowups();
  if (Notification.permission === 'granted') { if (due.length) fireFollowupNotifications(due); toast('Reminders on', due.length ? `${due.length} due follow-up${due.length === 1 ? '' : 's'} shown` : 'You will be reminded when follow-ups are due.'); return; }
  if (Notification.permission === 'denied') { toast('Reminders blocked', 'Allow notifications for this site in your browser settings.', 'err'); return; }
  Notification.requestPermission().then(p => {
    if (p === 'granted') { if (due.length) { fireFollowupNotifications(due); markFollowupsNotified(due.map(f => f.id)); } toast('Reminders enabled', 'Desktop reminders are now on for due follow-ups.'); }
    else toast('Reminders not enabled', 'Notification permission was not granted.', 'info');
  });
}
// Compact "Today & Overdue" widget used on the Overview dashboard.
function renderOverviewFollowups(host) {
  const today = localDateISO();
  const list = followups.filter(f => f.status !== 'completed' && f.due <= today).sort((a, b) => `${a.due} ${a.time}`.localeCompare(`${b.due} ${b.time}`)).slice(0, 6);
  if (!list.length) { host.innerHTML = `<div class="empty" style="padding:22px"><div class="empty-ico">${I.check}</div><h4>All caught up</h4><p>No follow-ups due today.</p></div>`; return; }
  host.innerHTML = list.map(f => { const t = followupTiming(f); return `<div class="appr-item" style="cursor:pointer" onclick="openFollowupDrawer('${f.id}')"><div class="appr-main"><div class="appr-name">${esc(f.customer)}</div><div class="appr-auth">${esc(f.subject)} · ${esc(f.channel)}</div></div><div style="display:flex;align-items:center;gap:8px">${statusBadge(t)}<button class="mini-act" onclick="event.stopPropagation();openCompleteFollowup('${f.id}')" title="Complete">${I.check}</button></div></div>`; }).join('');
}
function exportFollowups() {
  const columns = ['ID','Enquiry','Client','Subject','Due Date','Time','Channel','Assignee','Priority','Status','Notes'];
  const csv = [columns, ...filteredFollowups().map(f=>[f.id,f.leadId,f.customer,f.subject,f.due,f.time,f.channel,f.assignee,f.priority,followupTiming(f),f.notes])].map(row=>row.map(v=>`"${String(v||'').replace(/"/g,'""')}"`).join(',')).join('\r\n');
  const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}), link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download=`PTH_Followups_${localDateISO()}.csv`; link.click(); setTimeout(()=>URL.revokeObjectURL(link.href),1000);
}

/* ---------- CREDENTIALS ---------- */
let credSort = { key: 'days', dir: 1 };
let credDataCategory = 'all';
let credFilters = { status: '', branch: '', authority: '', person: '' };
const CREDENTIAL_KEY = 'pth_crm_credentials_v1';
(function loadCredentials() { try { const saved = JSON.parse(localStorage.getItem(CREDENTIAL_KEY)); if (Array.isArray(saved)) DB.credentials = saved; } catch (e) {} })();
function persistCredentials() { try { localStorage.setItem(CREDENTIAL_KEY, JSON.stringify(DB.credentials)); } catch (e) {} }
function credentialDataGroup(record) {
  if (record.dataCategory) return record.dataCategory;
  return /financial|gst|pan|msme|udyam|tax|bank|turnover|balance|income/i.test(`${record.cat} ${record.name}`) ? 'Financial Data' : 'Technical Data';
}
function setCredentialDataCategory(category) {
  credDataCategory = category;
  renderCredRows(document.getElementById('credSearch')?.value || '');
  document.querySelectorAll('[data-cred-category]').forEach(button => {
    button.classList.toggle('btn-primary', button.dataset.credCategory === category);
    button.classList.toggle('btn-ghost', button.dataset.credCategory !== category);
  });
}
VIEWS.credentials = function (c) {
  const actions = `<button class="btn btn-ghost hide-sm" onclick="openPdfBulkImport('credentials')">${I.upload}Bulk Import PDFs</button><button class="btn btn-ghost hide-sm" onclick="exportCredentials()">${I.export}Export</button><button class="btn btn-primary" onclick="openCredentialModal()">${I.plus}Add Credential</button>`;
  const total = DB.credentials.length + DB.approvalWorkflow.length + DB.certificates.org.length;
  const valid = DB.credentials.filter(x => x.status === 'valid').length;
  const exp90 = DB.credentials.filter(x => x.days >= 0 && x.days <= 90).length;
  const renew = DB.credentials.filter(x => x.status === 'renewal').length;
  const expired = DB.credentials.filter(x => x.status === 'expired').length;
  const missing = 6;
  c.innerHTML = `${pageHead('Credentials', 'One repository for financial data, technical data, approvals and certifications.', actions)}
    <div class="filter-bar enter" style="margin-bottom:16px">
      <strong style="font-size:13px;margin-right:4px">Data Category</strong>
      <button class="btn btn-sm ${credDataCategory === 'all' ? 'btn-primary' : 'btn-ghost'}" data-cred-category="all" onclick="setCredentialDataCategory('all')">All</button>
      <button class="btn btn-sm ${credDataCategory === 'financial' ? 'btn-primary' : 'btn-ghost'}" data-cred-category="financial" onclick="setCredentialDataCategory('financial')">Financial Data</button>
      <button class="btn btn-sm ${credDataCategory === 'technical' ? 'btn-primary' : 'btn-ghost'}" data-cred-category="technical" onclick="setCredentialDataCategory('technical')">Technical Data</button>
    </div>
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
      <select class="select" aria-label="Filter credentials by status" onchange="credFilters.status=this.value;renderCredRows(document.getElementById('credSearch').value)"><option value="">All statuses</option>${[...new Set(DB.credentials.map(x=>x.status))].sort().map(x=>`<option value="${esc(x)}">${esc(x.charAt(0).toUpperCase()+x.slice(1))}</option>`).join('')}</select>
      <select class="select" aria-label="Filter credentials by branch" onchange="credFilters.branch=this.value;renderCredRows(document.getElementById('credSearch').value)"><option value="">All branches</option>${[...new Set(DB.credentials.map(x=>x.branch))].sort().map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select>
      <select class="select" aria-label="Filter credentials by issuing authority" onchange="credFilters.authority=this.value;renderCredRows(document.getElementById('credSearch').value)"><option value="">All authorities</option>${[...new Set(DB.credentials.map(x=>x.auth))].sort().map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select>
      <select class="select" aria-label="Filter credentials by responsible person" onchange="credFilters.person=this.value;renderCredRows(document.getElementById('credSearch').value)"><option value="">All responsible people</option>${[...new Set(DB.credentials.map(x=>x.person))].sort().map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select>
    </div>
    <div class="card enter"><div class="tbl-wrap"><table class="tbl" id="credTable">
      <thead><tr>
        <th style="width:36px"><span class="chk" onclick="toggleAllRows(this)"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span></th>
        <th data-k="id">ID <span class="sort-ico">↕</span></th>
        <th data-k="name">Credential <span class="sort-ico">↕</span></th>
        <th>Data Category</th>
        <th data-k="cat">Document Type</th>
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
      <span id="credShowing">Showing credentials</span>
    </div>
    <div id="credentialIncludedRecords"></div>`;
  renderCredRows();
  c.querySelectorAll('#credTable thead th[data-k]').forEach(th => th.onclick = () => {
    const k = th.dataset.k; credSort.dir = credSort.key === k ? -credSort.dir : 1; credSort.key = k; renderCredRows();
  });
  c.querySelector('#credSearch').addEventListener('input', e => renderCredRows(e.target.value));
};
function renderCredRows(q = '') {
  const body = document.getElementById('credBody'); if (!body) return;
  let rows = DB.credentials.filter(x => {
    const group = credentialDataGroup(x);
    const categoryMatch = credDataCategory === 'all' || group.toLowerCase().startsWith(credDataCategory);
    const filterMatch = (!credFilters.status || x.status === credFilters.status) && (!credFilters.branch || x.branch === credFilters.branch) && (!credFilters.authority || x.auth === credFilters.authority) && (!credFilters.person || x.person === credFilters.person);
    return categoryMatch && filterMatch && (!q || (x.name + x.auth + x.id + x.person + x.cat + group).toLowerCase().includes(q.toLowerCase()));
  });
  rows.sort((a, b) => (a[credSort.key] > b[credSort.key] ? 1 : -1) * credSort.dir);
  body.innerHTML = rows.map(r => `
    <tr onclick="openCredDrawer('${r.id}')">
      <td onclick="event.stopPropagation()"><span class="chk" onclick="this.classList.toggle('on');this.closest('tr').classList.toggle('selected')"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span></td>
      <td class="cell-dim tnum">${esc(r.id)}</td>
      <td class="cell-strong">${esc(r.name)}</td>
      <td><span class="badge badge-neutral"><span class="dot"></span>${credentialDataGroup(r)}</span></td>
      <td class="cell-dim">${esc(r.cat)}</td>
      <td class="cell-dim">${esc(r.auth)}</td>
      <td class="cell-dim">${esc(r.branch)}</td>
      <td class="tnum">${esc(formatAppDate(r.expiry))}</td>
      <td class="tnum">${r.days > 9000 ? '—' : r.days < 0 ? `<span style="color:var(--danger)">Expired</span>` : `<span style="display:inline-flex;align-items:center;gap:6px"><span style="width:7px;height:7px;border-radius:50%;background:${dotForDays(r.days)}"></span>${r.days}d</span>`}</td>
      <td class="cell-dim">${esc(r.person)}</td>
      <td>${statusBadge(r.status)}</td>
      <td>${r.verified ? `<span style="color:var(--primary-dark)" title="Verified">${I.check}</span>` : `<span style="color:var(--text-muted)" title="Pending">${I.clock}</span>`}</td>
      <td onclick="event.stopPropagation()"><div class="row-actions"><button class="mini-act" onclick="openCredDrawer('${r.id}')" title="View">${I.eye}</button><button class="mini-act" onclick="openCredentialModal('${r.id}')" title="Edit">${I.edit}</button></div></td>
    </tr>`).join('');
  const showing = document.getElementById('credShowing');
  if (showing) showing.innerHTML = `Showing <b>${rows.length}</b> credential record${rows.length === 1 ? '' : 's'}`;
  renderIncludedCredentialRecords(q);
}
function exportCredentials() {
  const rows = [['ID','Credential','Data Category','Document Type','Issuing Authority','Certificate Number','Branch','Issue Date','Expiry Date','Responsible Person','Status','Verified']];
  DB.credentials.filter(x => credDataCategory === 'all' || credentialDataGroup(x).toLowerCase().startsWith(credDataCategory)).forEach(x => rows.push([x.id,x.name,credentialDataGroup(x),x.cat,x.auth,x.cert,x.branch,x.issue,x.expiry === '—' ? '' : x.expiry,x.person,x.status,x.verified ? 'Yes' : 'No']));
  downloadCSV(rows, `PTH-Credentials-${localDateISO()}.csv`);
  logAudit('Export','Credentials',`Exported ${rows.length - 1} credential records`);
}
function renderIncludedCredentialRecords(q = '') {
  const host = document.getElementById('credentialIncludedRecords'); if (!host) return;
  if (credDataCategory === 'financial') { host.innerHTML = ''; return; }
  const term = q.toLowerCase();
  const approvals = DB.approvalWorkflow.filter(a => !term || `${a.name} ${a.auth} ${a.service} ${a.person}`.toLowerCase().includes(term));
  const certificates = DB.certificates.org.filter(o => !term || `${o.name} ${o.authority} ${o.num}`.toLowerCase().includes(term));
  host.innerHTML = `<div class="grid dash-grid enter" style="margin-top:16px">
    <div class="col-6"><div class="card card-pad" style="height:100%"><div class="card-head"><h3>Approvals</h3><span class="badge badge-neutral" style="margin-left:auto">Technical Data</span></div>
      <div style="margin-top:10px">${approvals.map(a => `<div class="appr-item"><div class="appr-ico">${I.approval}</div><div class="appr-main"><div class="appr-name">${esc(a.name)}</div><div class="appr-auth">${esc(a.auth)} · ${esc(a.service)}</div></div>${statusBadge(a.stage >= 10 ? 'approved' : a.stage === 5 ? 'submitted' : 'review')}</div>`).join('') || '<div class="page-desc">No matching approvals.</div>'}</div>
    </div></div>
    <div class="col-6"><div class="card card-pad" style="height:100%"><div class="card-head"><h3>Certifications</h3><span class="badge badge-neutral" style="margin-left:auto">Technical Data</span></div>
      <div style="margin-top:10px">${certificates.map(o => `<div class="appr-item"><div class="appr-ico">${I.cert}</div><div class="appr-main"><div class="appr-name">${esc(o.name)}</div><div class="appr-auth">${esc(o.authority)} · ${esc(o.num)}</div></div>${statusBadge(o.status)}</div>`).join('') || '<div class="page-desc">No matching certifications.</div>'}</div>
    </div></div>
  </div>`;
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
        <div class="kv"><span class="k">Data Category</span><span class="v">${credentialDataGroup(r)}</span></div>
        <div class="kv"><span class="k">Document Type</span><span class="v">${r.cat}</span></div>
        <div class="kv"><span class="k">Issuing Authority</span><span class="v">${r.auth}</span></div>
        <div class="kv"><span class="k">Certificate Number</span><span class="v tnum">${r.cert}</span></div>
        <div class="kv"><span class="k">Branch</span><span class="v">${r.branch}</span></div>
        <div class="kv"><span class="k">Issue Date</span><span class="v tnum">${formatAppDate(r.issue)}</span></div>
        <div class="kv"><span class="k">Expiry Date</span><span class="v tnum">${formatAppDate(r.expiry)}</span></div>
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
        <div class="kv"><span class="k">v3 · Current</span><span class="v">${formatAppDate(r.issue)}</span></div>
        <div class="kv"><span class="k">v2</span><span class="v" style="color:var(--text-muted)">2022-03-11 (obsolete)</span></div>
      </div>
      <div class="drawer-pane" id="pane-rn" style="display:none"><div class="timeline">${renewalTimeline()}</div></div>
      <div class="drawer-pane" id="pane-ck" style="display:none">${['Application form','Fee payment receipt','Scope document','Signatory approval','Equipment list'].map(x=>`<div class="kv"><span class="v">${x}</span><span class="v" style="margin-left:auto;color:var(--primary-dark)">${I.check}</span></div>`).join('')}</div>
      <div class="drawer-pane" id="pane-au" style="display:none"><div class="timeline">${['Created by K. Patel','Verified by R. Mehta','Document uploaded','Status set to Valid'].map((s,i)=>`<div class="tl-item"><div class="tl-rail"><span class="tl-dot" style="background:var(--primary-dark)"></span>${i<3?'<span class="tl-line"></span>':''}</div><div class="tl-body"><div class="tl-title" style="font-size:12.5px">${s}</div><div class="tl-meta">${formatAppDate(r.issue)} · ${formatAppTime(`10:${20+i}`)}</div></div></div>`).join('')}</div></div>
    </div>`);
}

/* ---------- ADD CREDENTIAL MODAL ---------- */
function openCredentialModal(id = '') {
  const record = id ? DB.credentials.find(x => x.id === id) : null;
  const selected = (value, expected) => value === expected ? ' selected' : '';
  const responsiblePeople = [...new Set([record?.person, DB.user.name, ...DB.staff.map(s => s.name), ...(DB.users||[]).map(u=>u.name)].filter(Boolean))];
  openModal(`
    <div class="modal-head"><div class="modal-title">${record ? 'Edit' : 'Add'} Credential</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <input type="hidden" id="cId" value="${esc(record?.id || '')}">
      <div class="field" id="f-name"><label>Credential Name <span class="req">*</span></label><input class="input" id="cName" value="${esc(record?.name || '')}" placeholder="e.g. NABL Accreditation Certificate"><div class="field-err">${I.info}This field is required</div></div>
      <div class="form-grid">
        <div class="field"><label>Data Category <span class="req">*</span></label><select class="select" id="cDataCategory"><option${selected(record?.dataCategory || 'Technical Data','Technical Data')}>Technical Data</option><option${selected(record?.dataCategory,'Financial Data')}>Financial Data</option></select></div>
        <div class="field"><label>Branch</label><select class="select" id="cBranch">${DB.branches.map(x=>`<option${selected(record?.branch || DB.branches[0],x)}>${x}</option>`).join('')}</select></div>
      </div>
      <div class="field"><label>Document Type</label><select class="select" id="cDocumentType">${['Approval','Certification','NABL & ISO','Legal Document','Client Registration','Financial Document','Accreditation Scope','Other'].map(x=>`<option${selected(record?.cat,x)}>${x}</option>`).join('')}</select></div>
      <div class="field" id="f-cert"><label>Certificate Number <span class="req">*</span></label><input class="input" id="cCert" value="${esc(record?.cert || '')}" placeholder="e.g. TC-8421"><div class="field-err">${I.info}This field is required</div></div>
      <div class="form-grid">
        <div class="field"><label>Issue Date</label><input class="input" id="cIssue" type="date" value="${esc(record?.issue || localDateISO())}"></div>
        <div class="field"><label>Expiry Date</label><input class="input" id="cExpiry" type="date" value="${esc(record?.expiry === '—' ? '' : (record?.expiry || ''))}"></div>
      </div>
      <div class="field"><label>Responsible Person</label><select class="select" id="cPerson">${responsiblePeople.map(name=>`<option${selected(record?.person || DB.user.name,name)}>${esc(name)}</option>`).join('')}</select></div>
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
  const id = document.getElementById('cId').value;
  const dataCategory = document.getElementById('cDataCategory').value;
  const documentType = document.getElementById('cDocumentType').value;
  const expiry = document.getElementById('cExpiry').value;
  const days = expiry ? Math.ceil((new Date(`${expiry}T23:59:59`) - new Date()) / 86400000) : 9999;
  const existing = id ? DB.credentials.find(x => x.id === id) : null;
  const nextNumber = Math.max(0, ...DB.credentials.map(x => Number(String(x.id).match(/\d+/)?.[0]) || 0)) + 1;
  const value = { ...(existing || {}), id: id || `CR-${String(nextNumber).padStart(4, '0')}`, name: cn, dataCategory, cat: documentType, auth: existing?.auth || 'Pending classification', cert: document.getElementById('cCert').value.trim(), branch: document.getElementById('cBranch').value, issue: document.getElementById('cIssue').value || localDateISO(), expiry: expiry || '—', days, person: document.getElementById('cPerson').value, status: days < 0 ? 'expired' : (existing?.status || 'review'), verified: existing?.verified || false, conf: existing?.conf || 'Internal', updatedAt: new Date().toISOString() };
  if (existing) Object.assign(existing, value); else DB.credentials.push(value);
  persistCredentials();
  if(!existing){credDataCategory='all';credFilters={status:'',branch:'',authority:'',person:''};}
  closeModal();
  navigate('credentials');
  toast(existing ? 'Credential updated' : 'Credential saved', existing ? 'Repository and expiry tracker updated' : 'Added to repository and expiry tracker');
  logAudit(existing ? 'Edit' : 'Create', 'Credentials', `Credential "${cn}" ${existing ? 'updated' : 'added to repository'}`);
}

/* ---------- APPROVALS ---------- */
VIEWS.approvals = function (c) {
  const stages = DB.approvalStages;
  const actions = `<button class="btn btn-ghost hide-sm" onclick="openPdfBulkImport('approvals')">${I.upload}Bulk Import PDFs</button><button class="btn btn-ghost hide-sm">${I.filter}Filter</button><button class="btn btn-primary">${I.plus}New Approval</button>`;
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
  c.innerHTML = `${pageHead('Certifications', 'Organisation accreditation certificates and customer-facing test / calibration certificates.', `<button class="btn btn-ghost" onclick="openPdfBulkImport('certifications')">${I.upload}Bulk Import PDFs</button><button class="btn btn-primary">${I.plus}New Certificate</button>`)}
    <div class="grid dash-grid">
      <div class="col-6"><div class="card card-pad enter" style="height:100%"><div class="card-head"><h3>Organisation Certificates</h3></div>
        <div style="margin-top:6px">${DB.certificates.org.map(o => `<div class="appr-item"><div class="appr-ico">${I.cert}</div><div class="appr-main"><div class="appr-name">${o.name}</div><div class="appr-auth">${o.authority} · ${o.num}</div></div><div style="text-align:right"><div style="margin-bottom:4px">${statusBadge(o.status)}</div><div style="font-size:11px;color:var(--text-muted)" class="tnum">${formatAppDate(o.expiry)}</div></div></div>`).join('')}</div>
      </div></div>
      <div class="col-6"><div class="card card-pad enter" style="height:100%"><div class="card-head"><h3>Client Test Certificates</h3><div class="card-sub" style="margin-left:auto">Live workflow</div></div>
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

// Preserve old bookmarks while keeping approvals and certifications in one module.
VIEWS.approvals = VIEWS.certifications = function () { navigate('credentials'); };

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

/* ---------- TENDERS ---------- */
const TENDER_KEY='pth_tenders_v1';
(function loadTenders(){try{const saved=JSON.parse(localStorage.getItem(TENDER_KEY));if(Array.isArray(saved))DB.tenders=saved;}catch(e){}DB.tenders=DB.tenders||[];})();
function persistTenders(){try{localStorage.setItem(TENDER_KEY,JSON.stringify(DB.tenders));}catch(e){}}
let tenderFilter={search:'',stage:'all',deadline:'all'};
function tenderDays(t){return Math.ceil((new Date(`${t.due}T23:59:59`)-new Date())/86400000);}
function shownTenders(){const term=tenderFilter.search.toLowerCase();return DB.tenders.filter(t=>(tenderFilter.stage==='all'||t.stage===tenderFilter.stage)&&(tenderFilter.deadline==='all'||(tenderFilter.deadline==='overdue'?tenderDays(t)<0:tenderFilter.deadline==='7'?tenderDays(t)>=0&&tenderDays(t)<=7:tenderDays(t)>7))&&(!term||`${t.id} ${t.title} ${t.client}`.toLowerCase().includes(term))).sort((a,b)=>a.due.localeCompare(b.due));}
VIEWS.tenders = function (c) {
  const list=shownTenders(),stages=[...new Set(DB.tenders.map(t=>t.stage))].sort(),due7=DB.tenders.filter(t=>tenderDays(t)>=0&&tenderDays(t)<=7).length,overdue=DB.tenders.filter(t=>tenderDays(t)<0&&!['Submitted','Won','Lost'].includes(t.stage)).length,ready=DB.tenders.filter(t=>!t.missing).length,total=DB.tenders.reduce((s,t)=>s+(t.value||0),0);
  c.innerHTML = `${pageHead('Tenders', 'Opportunity tracking, bid readiness, deadlines and submission control.', `<button class="btn btn-ghost" onclick="openDataImport('tenders')">${I.upload}Bulk Import</button><button class="btn btn-ghost" onclick="navigate('package')">${I.document}Build Package</button><button class="btn btn-primary" onclick="openTenderModal()">${I.plus}Add Tender</button>`)}
    <div class="stat-strip enter"><div class="stat-chip"><div class="sc-val">${DB.tenders.length}</div><div class="sc-label">Opportunities</div></div><div class="stat-chip"><div class="sc-val">${inr(total)}</div><div class="sc-label">Bid value</div></div><div class="stat-chip"><div class="sc-val" style="color:var(--danger)">${overdue}</div><div class="sc-label">Overdue</div></div><div class="stat-chip"><div class="sc-val">${due7}</div><div class="sc-label">Due in 7 days</div></div><div class="stat-chip"><div class="sc-val" style="color:var(--primary-dark)">${ready}</div><div class="sc-label">Package ready</div></div></div>
    <div class="filter-bar enter"><div class="filter-search">${I.search}<input placeholder="Search tender, client or ID..." value="${esc(tenderFilter.search)}" oninput="setTenderFilter('search',this.value)"></div><select class="fdrop" onchange="setTenderFilter('stage',this.value)"><option value="all">All stages</option>${stages.map(s=>`<option ${tenderFilter.stage===s?'selected':''}>${esc(s)}</option>`).join('')}</select><select class="fdrop" onchange="setTenderFilter('deadline',this.value)"><option value="all">All deadlines</option><option value="overdue" ${tenderFilter.deadline==='overdue'?'selected':''}>Overdue</option><option value="7" ${tenderFilter.deadline==='7'?'selected':''}>Due in 7 days</option><option value="later" ${tenderFilter.deadline==='later'?'selected':''}>Later</option></select></div>
    <div class="grid dash-grid enter">${list.map(t => {const days=tenderDays(t),readiness=Math.max(0,Math.round(((t.docs-t.missing)/Math.max(1,t.docs))*100));return `<div class="col-6"><div class="card card-pad hoverlift" style="cursor:pointer" onclick="openTenderDrawer('${esc(t.id)}')"><div style="display:flex;gap:10px"><div class="appr-ico">${I.tender}</div><div style="flex:1"><div class="appr-name">${esc(t.title)}</div><div class="appr-auth">${esc(t.client)} · ${esc(t.id)}</div></div><div style="text-align:right"><div style="font-weight:700" class="tnum">${inr(t.value)}</div><div style="font-size:11px;color:${days<0?'var(--danger)':days<=7?'var(--warning)':'var(--text-secondary)'}">${days<0?`${Math.abs(days)}d overdue`:days===0?'Due today':`${days}d remaining`}</div></div></div><div class="prob-bar" style="margin-top:14px;width:100%"><span style="width:${readiness}%"></span></div><div style="display:flex;gap:8px;margin-top:10px;align-items:center"><span class="badge ${t.missing===0?'badge-valid':'badge-expiring'}"><span class="dot"></span>${esc(t.stage)}</span><span class="page-desc">${readiness}% ready · ${t.missing||0} missing</span><button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="event.stopPropagation();newFollowupForCustomer(${esc(JSON.stringify(t.client))})">${I.clock}</button><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openTenderModal('${esc(t.id)}')">${I.edit}</button></div></div></div>`;}).join('')||`<div class="col-12"><div class="empty"><h4>No tenders match the filters</h4></div></div>`}</div>`;
};
function setTenderFilter(key,value){tenderFilter[key]=value;VIEWS.tenders(document.getElementById('canvas'));}
function openTenderModal(id=''){const t=DB.tenders.find(x=>x.id===id),rec=t||{id:`T-${String(Math.max(0,...DB.tenders.map(x=>+String(x.id).replace(/\D/g,'')||0))+1).padStart(4,'0')}`,title:'',client:'',value:0,due:localDateISO(),stage:'Preparation',docs:0,missing:0};openModal(`<div class="modal-head"><div class="modal-title">${t?'Edit':'Add'} Tender</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div><div class="modal-body"><div class="form-grid"><div class="field"><label>Tender ID</label><input class="input" id="tdId" value="${esc(rec.id)}" ${t?'readonly':''}></div><div class="field"><label>Deadline</label><input class="input" id="tdDue" type="date" value="${esc(rec.due)}"></div></div><div class="field"><label>Title <span class="req">*</span></label><input class="input" id="tdTitle" value="${esc(rec.title)}"></div><div class="field"><label>Client <span class="req">*</span></label><input class="input" id="tdClient" value="${esc(rec.client)}"></div><div class="form-grid"><div class="field"><label>Estimated Value</label><input class="input" id="tdValue" type="number" min="0" value="${rec.value||0}"></div><div class="field"><label>Stage</label><select class="select" id="tdStage">${['Identified','Prequalification','Preparation','Package Ready','Submitted','Won','Lost'].map(s=>`<option ${rec.stage===s?'selected':''}>${s}</option>`).join('')}</select></div></div><div class="form-grid"><div class="field"><label>Required Documents</label><input class="input" id="tdDocs" type="number" min="0" value="${rec.docs||0}"></div><div class="field"><label>Missing Documents</label><input class="input" id="tdMissing" type="number" min="0" value="${rec.missing||0}"></div></div></div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveTender('${esc(id)}')">${I.check}Save Tender</button></div>`);}
function saveTender(editId=''){const id=document.getElementById('tdId').value.trim(),title=document.getElementById('tdTitle').value.trim(),client=document.getElementById('tdClient').value.trim(),due=document.getElementById('tdDue').value;if(!id||!title||!client||!due){toast('Tender details required','ID, title, client and deadline are required.','err');return;}const docs=Math.max(0,+document.getElementById('tdDocs').value||0),missing=Math.min(docs,Math.max(0,+document.getElementById('tdMissing').value||0)),record={id,title,client,due,value:Math.max(0,+document.getElementById('tdValue').value||0),stage:document.getElementById('tdStage').value,docs,missing,updatedAt:new Date().toISOString()};const idx=DB.tenders.findIndex(x=>x.id===editId);if(idx>=0)DB.tenders[idx]={...DB.tenders[idx],...record};else{if(DB.tenders.some(x=>x.id===id)){toast('Tender ID exists',id,'err');return;}DB.tenders.push(record);tenderFilter={search:'',stage:'all',deadline:'all'};}persistTenders();closeModal();toast(idx>=0?'Tender updated':'Tender added',`${id} · ${client}`);logAudit(idx>=0?'Edit':'Create','Tenders',`${id} · ${title}`);VIEWS.tenders(document.getElementById('canvas'));}
function openTenderDrawer(id){const t=DB.tenders.find(x=>x.id===id);if(!t)return;const days=tenderDays(t),ready=Math.max(0,Math.round(((t.docs-t.missing)/Math.max(1,t.docs))*100));openDrawer(`<div class="drawer-head"><button class="icon-btn drawer-close" onclick="closeDrawer()">${I.x}</button><div class="page-desc">${esc(t.id)} · ${esc(t.client)}</div><div style="font-size:19px;font-weight:600;margin-top:4px">${esc(t.title)}</div></div><div class="drawer-body"><div class="kv"><span class="k">Bid Value</span><span class="v">${inr(t.value)}</span></div><div class="kv"><span class="k">Deadline</span><span class="v">${formatFollowupDate(t.due)} · ${days<0?`${Math.abs(days)} days overdue`:`${days} days left`}</span></div><div class="kv"><span class="k">Stage</span><span class="v">${esc(t.stage)}</span></div><div class="kv"><span class="k">Readiness</span><span class="v">${ready}%</span></div><div class="kv"><span class="k">Documents</span><span class="v">${t.docs-t.missing}/${t.docs} complete</span></div><div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-primary" style="flex:1;justify-content:center" onclick="closeDrawer();openTenderModal('${esc(t.id)}')">${I.edit}Update</button><button class="btn btn-ghost" style="flex:1;justify-content:center" onclick="closeDrawer();navigate('package')">${I.document}Package</button></div><button class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:8px" onclick="closeDrawer();newFollowupForCustomer(${esc(JSON.stringify(t.client))})">${I.clock}Schedule Follow-up</button></div>`);}

/* ---------- ENQUIRIES ---------- */
let enquiryFilter={search:'',category:'all',stage:'all',owner:'all'};
function shownEnquiries(){const term=enquiryFilter.search.toLowerCase();return DB.pipeline.leads.filter(l=>canViewCrmRecord(l)&&(enquiryFilter.category==='all'||l.cat===enquiryFilter.category)&&(enquiryFilter.stage==='all'||l.col===enquiryFilter.stage)&&(enquiryFilter.owner==='all'||l.person===enquiryFilter.owner)&&(!term||`${l.id} ${l.cust} ${l.proj} ${l.cat}`.toLowerCase().includes(term))).sort((a,b)=>(b.createdAt||'').localeCompare(a.createdAt||''));}
VIEWS.enquiries = function (c) {
  const list=shownEnquiries(),cats=[...new Set(DB.pipeline.leads.map(l=>l.cat))].sort(),owners=[...new Set(DB.pipeline.leads.map(l=>l.person))].sort(),open=DB.pipeline.leads.filter(l=>!['won','lost'].includes(l.col)),noAction=open.filter(l=>!followups.some(f=>f.leadId===l.id&&f.status!=='completed')).length,high=open.filter(l=>l.prio==='high').length;
  c.innerHTML = `${pageHead('Enquiries', 'Qualification, ownership, next-action control and quotation conversion.', `<button class="btn btn-ghost" onclick="exportEnquiries()">${I.export}Export</button><button class="btn btn-ghost" onclick="openDataImport('enquiries')">${I.upload}Bulk Import</button><button class="btn btn-primary" onclick="openEnquiryModal()">${I.plus}New Enquiry</button>`)}<div class="stat-strip enter"><div class="stat-chip"><div class="sc-val">${DB.pipeline.leads.length}</div><div class="sc-label">Total enquiries</div></div><div class="stat-chip"><div class="sc-val">${open.length}</div><div class="sc-label">Open</div></div><div class="stat-chip"><div class="sc-val" style="color:var(--danger)">${high}</div><div class="sc-label">High priority</div></div><div class="stat-chip"><div class="sc-val" style="color:${noAction?'var(--warning)':'var(--primary-dark)'}">${noAction}</div><div class="sc-label">Without next action</div></div></div>
    <div class="filter-bar enter"><div class="filter-search">${I.search}<input placeholder="Search enquiries..." value="${esc(enquiryFilter.search)}" oninput="setEnquiryFilter('search',this.value)"></div><select class="fdrop" onchange="setEnquiryFilter('category',this.value)"><option value="all">All categories</option>${cats.map(x=>`<option ${enquiryFilter.category===x?'selected':''}>${esc(x)}</option>`).join('')}</select><select class="fdrop" onchange="setEnquiryFilter('stage',this.value)"><option value="all">All stages</option>${DB.pipeline.columns.map(x=>`<option value="${x.id}" ${enquiryFilter.stage===x.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select><select class="fdrop" onchange="setEnquiryFilter('owner',this.value)"><option value="all">All owners</option>${owners.map(x=>`<option ${enquiryFilter.owner===x?'selected':''}>${esc(x)}</option>`).join('')}</select></div>
    <div class="page-desc" style="margin:0 2px 10px">Showing ${list.length} of ${DB.pipeline.leads.length} enquiries</div><div class="card enter"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>ID</th><th>Client / Project</th><th>Service</th><th>Value</th><th>Owner</th><th>Next Action</th><th>Stage</th><th></th></tr></thead><tbody>${list.map(l=>{const next=followups.filter(f=>f.leadId===l.id&&f.status!=='completed').sort((a,b)=>a.due.localeCompare(b.due))[0];return `<tr onclick="openLeadDrawer('${esc(l.id)}')"><td class="cell-dim tnum">${esc(l.id)}</td><td><div class="cell-strong">${esc(l.cust)}</div><div class="page-desc">${esc(l.proj)}</div></td><td class="cell-dim">${esc(l.cat)}</td><td class="tnum cell-strong">${inr(l.val)}</td><td class="cell-dim">${esc(l.person)}</td><td>${next?`<span style="color:${followupTiming(next)==='overdue'?'var(--danger)':'inherit'}">${formatFollowupDate(next.due)} · ${esc(next.subject)}</span>`:`<span class="badge badge-expiring"><span class="dot"></span>No action</span>`}</td><td><span class="badge badge-neutral"><span class="dot"></span>${esc(DB.pipeline.columns.find(x=>x.id===l.col)?.name||l.col)}</span></td><td onclick="event.stopPropagation()"><div class="row-actions"><button class="mini-act" onclick="newFollowupForLead('${esc(l.id)}')" title="Follow-up">${I.clock}</button><button class="mini-act" onclick="prepareQuotationForLead('${esc(l.id)}')" title="Create quotation">${I.quote}</button><button class="mini-act" onclick="openLeadModal('${esc(l.id)}')" title="Edit">${I.edit}</button></div></td></tr>`}).join('')||`<tr><td colspan="8"><div class="empty"><h4>No enquiries found</h4></div></td></tr>`}</tbody></table></div></div>`;
};
function setEnquiryFilter(key,value){enquiryFilter[key]=value;VIEWS.enquiries(document.getElementById('canvas'));}
function exportEnquiries(){const rows=[['ID','Client','Project','Category','Value','Stage','Probability','Owner','Priority','Next Follow-up']];shownEnquiries().forEach(l=>{const next=followups.filter(f=>f.leadId===l.id&&f.status!=='completed').sort((a,b)=>a.due.localeCompare(b.due))[0];rows.push([l.id,l.cust,l.proj,l.cat,l.val,DB.pipeline.columns.find(x=>x.id===l.col)?.name||l.col,l.prob,l.person,l.prio,next?.due||'']);});downloadCSV(rows,`PTH-Enquiries-${localDateISO()}.csv`);logAudit('Export','Enquiries',`Exported ${rows.length-1} enquiries`);}

/* ---------- CUSTOMERS ---------- */
/* ---------- CLIENTS (formerly Customers) ---------- */
const CLIENT_KEY = 'pth_clients_v1';
(function loadClients() { try { const s = JSON.parse(localStorage.getItem(CLIENT_KEY)); if (Array.isArray(s)) DB.customers = s; } catch (e) {} DB.customers = DB.customers || []; })();
function persistClients() { try { localStorage.setItem(CLIENT_KEY, JSON.stringify(DB.customers || [])); } catch (e) {} }
function findClient(name) { return (DB.customers || []).find(x => String(x.name).toLowerCase() === String(name || '').toLowerCase()); }
// Client metrics rolled up from pipeline leads, quotations and follow-ups.
function clientMetrics(name) {
  const key = String(name).toLowerCase();
  const leads = DB.pipeline.leads.filter(l => String(l.cust).toLowerCase() === key);
  const open = leads.filter(l => l.col !== 'won' && l.col !== 'lost');
  const quotes = (savedQuotations || []).filter(q => String(q.customer).toLowerCase() === key);
  const fus = followups.filter(f => String(f.customer).toLowerCase() === key);
  return { leads: leads.length, open: open.length, openValue: open.reduce((a, l) => a + l.val, 0), won: leads.filter(l => l.col === 'won').length, quotes: quotes.length, fus, openFus: fus.filter(f => f.status !== 'completed').length };
}
// Unified client list: stored records + pipeline-derived names not yet on file.
function allClients() {
  const map = new Map();
  (DB.customers || []).forEach(c => map.set(String(c.name).toLowerCase(), { ...c }));
  DB.pipeline.leads.forEach(l => { const k = String(l.cust).toLowerCase(); if (!map.has(k)) map.set(k, { name: l.cust, cat: l.cat || 'General', contact: '', email: '', phone: '', derived: true }); });
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
let clientFilter = { search: '', cat: 'all', status: 'all' };
let clientView = 'list';
let clientSort = { key: 'name', dir: 1 };
// Most recent dated touchpoint (quotation or follow-up) for a client.
function clientLastActivity(name) {
  const key = String(name).toLowerCase();
  const dates = [];
  (savedQuotations || []).forEach(q => { if (String(q.customer).toLowerCase() === key && q.date) dates.push(q.date); });
  followups.forEach(f => { if (String(f.customer).toLowerCase() === key) dates.push((f.completedAt || f.due || '').slice(0, 10)); });
  dates.sort(); return dates.length ? dates[dates.length - 1] : '';
}
function clientStatusOf(m) {
  if (m.open > 0) return { key: 'active', label: 'Active', cls: 'badge-valid' };
  if (m.won > 0) return { key: 'won', label: 'Client', cls: 'badge-won' };
  if (m.leads > 0) return { key: 'dormant', label: 'Dormant', cls: 'badge-neutral' };
  return { key: 'prospect', label: 'Prospect', cls: 'badge-review' };
}
function shownClients() {
  const term = clientFilter.search.toLowerCase();
  let list = allClients().filter(x => {
    const m = clientMetrics(x.name);
    return (clientFilter.cat === 'all' || x.cat === clientFilter.cat)
      && (clientFilter.status === 'all' || clientStatusOf(m).key === clientFilter.status)
      && (!term || `${x.name} ${x.cat} ${x.contact || ''} ${x.email || ''} ${x.phone || ''}`.toLowerCase().includes(term));
  });
  const k = clientSort.key, d = clientSort.dir;
  list.sort((a, b) => {
    let av, bv;
    if (k === 'value') { av = clientMetrics(a.name).openValue; bv = clientMetrics(b.name).openValue; }
    else if (k === 'leads') { av = clientMetrics(a.name).open; bv = clientMetrics(b.name).open; }
    else if (k === 'activity') { av = clientLastActivity(a.name); bv = clientLastActivity(b.name); }
    else { av = String(a[k] || '').toLowerCase(); bv = String(b[k] || '').toLowerCase(); }
    return (av > bv ? 1 : av < bv ? -1 : 0) * d;
  });
  return list;
}
VIEWS.customers = function (c) {
  const clients = allClients();
  const cats = [...new Set(clients.map(x => x.cat).filter(Boolean))].sort();
  const totalPipeline = DB.pipeline.leads.filter(l => l.col !== 'won' && l.col !== 'lost').reduce((a, l) => a + l.val, 0);
  const active = clients.filter(x => clientMetrics(x.name).open > 0).length;
  const dueFus = followups.filter(f => f.status !== 'completed' && f.due <= localDateISO()).length;
  const actions = `<span class="view-toggle">${['grid','list'].map(v => `<button class="${clientView === v ? 'on' : ''}" onclick="setClientView('${v}')" title="${v} view">${v === 'grid' ? I.grid : I.overview}</button>`).join('')}</span><button class="btn btn-ghost hide-sm" onclick="exportClients()">${I.export}Export</button><button class="btn btn-ghost" onclick="openDataImport('customers')">${I.upload}Bulk Import</button><button class="btn btn-primary" onclick="openClientModal()">${I.plus}Add Client</button>`;
  c.innerHTML = `${pageHead('Clients', 'Government departments, infrastructure companies and industrial clients.', actions)}
    <div class="stat-strip enter" style="margin-bottom:16px">
      <div class="stat-chip"><div class="sc-val tnum">${clients.length}</div><div class="sc-label">Total clients</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--primary-dark)">${active}</div><div class="sc-label"><span class="dot" style="background:var(--primary-dark)"></span>Active</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${inr(totalPipeline)}</div><div class="sc-label">Open pipeline value</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${(savedQuotations || []).length}</div><div class="sc-label">Quotations</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:${dueFus ? 'var(--danger)' : 'var(--text-muted)'}">${dueFus}</div><div class="sc-label"><span class="dot" style="background:var(--danger)"></span>Follow-ups due</div></div>
    </div>
    <div class="filter-bar enter">
      <div class="filter-search">${I.search}<input id="clientSearch" placeholder="Search clients by name, contact, email or phone..." value="${esc(clientFilter.search)}" oninput="setClientFilter('search',this.value)"></div>
      <select class="fdrop" onchange="setClientFilter('cat',this.value)"><option value="all">All industries</option>${cats.map(x => `<option ${clientFilter.cat === x ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select>
      <select class="fdrop" onchange="setClientFilter('status',this.value)"><option value="all">All statuses</option><option value="active" ${clientFilter.status === 'active' ? 'selected' : ''}>Active</option><option value="won" ${clientFilter.status === 'won' ? 'selected' : ''}>Won client</option><option value="prospect" ${clientFilter.status === 'prospect' ? 'selected' : ''}>Prospect</option><option value="dormant" ${clientFilter.status === 'dormant' ? 'selected' : ''}>Dormant</option></select>
      <select class="fdrop" onchange="setClientSort(this.value)"><option value="name" ${clientSort.key === 'name' ? 'selected' : ''}>Sort: Name</option><option value="value" ${clientSort.key === 'value' ? 'selected' : ''}>Sort: Pipeline value</option><option value="leads" ${clientSort.key === 'leads' ? 'selected' : ''}>Sort: Open leads</option><option value="activity" ${clientSort.key === 'activity' ? 'selected' : ''}>Sort: Last activity</option></select>
    </div>
    <div id="clientCount" class="page-desc enter" style="margin:2px 2px 12px"></div>
    <div id="clientBody" class="enter"></div>`;
  renderClients();
};
function setClientFilter(key, value) { clientFilter[key] = value; renderClients(); }
function setClientView(v) { clientView = v; VIEWS.customers(document.getElementById('canvas')); }
function setClientSort(v) { clientSort = { key: v, dir: v === 'value' || v === 'leads' || v === 'activity' ? -1 : 1 }; renderClients(); }
function renderClients() {
  const body = document.getElementById('clientBody'); if (!body) return;
  const list = shownClients(), total = allClients().length;
  const count = document.getElementById('clientCount'); if (count) count.textContent = `Showing ${list.length} of ${total} clients`;
  if (!list.length) { body.innerHTML = `<div class="empty" style="padding:40px"><div class="empty-ico">${I.customer}</div><h4>No clients found</h4><p>Adjust the search or add a new client.</p></div>`; return; }
  if (clientView === 'list') {
    body.innerHTML = `<div class="card client-list-card"><div class="tbl-wrap"><table class="tbl client-list-table"><thead><tr><th>Client</th><th>Industry</th><th>Contact Person</th><th>Phone</th><th>Email</th><th>GST / Reg.</th><th>Address</th><th>Notes</th><th style="text-align:right">Leads</th><th style="text-align:right">Open</th><th style="text-align:right">Won</th><th style="text-align:right">Pipeline</th><th style="text-align:right">Quotations</th><th style="text-align:right">Follow-ups</th><th>Last Activity</th><th>Status</th><th>Options</th></tr></thead><tbody>${list.map(cu => {
      const m = clientMetrics(cu.name), st = clientStatusOf(m), la = clientLastActivity(cu.name), nameJson = esc(JSON.stringify(cu.name));
      return `<tr style="cursor:pointer" onclick="openClientDrawer(${nameJson})">
        <td class="cell-strong">${esc(cu.name)}</td>
        <td class="cell-dim">${esc(cu.cat || 'General')}</td>
        <td class="cell-dim">${esc(cu.contact || '—')}</td>
        <td class="cell-dim tnum">${esc(cu.phone || '—')}</td>
        <td class="cell-dim">${cu.email ? `<a href="mailto:${esc(cu.email)}" onclick="event.stopPropagation()">${esc(cu.email)}</a>` : '—'}</td>
        <td class="cell-dim tnum">${esc(cu.gst || '—')}</td>
        <td class="cell-dim client-list-copy">${esc(cu.address || '—')}</td>
        <td class="cell-dim client-list-copy">${esc(cu.notes || '—')}</td>
        <td class="tnum" style="text-align:right">${m.leads}</td>
        <td class="tnum" style="text-align:right">${m.open}</td>
        <td class="tnum" style="text-align:right">${m.won}</td>
        <td class="tnum cell-strong" style="text-align:right">${inr(m.openValue)}</td>
        <td class="tnum" style="text-align:right">${m.quotes}</td>
        <td class="tnum" style="text-align:right">${m.openFus} open / ${m.fus.length}</td>
        <td class="cell-dim tnum">${la ? formatFollowupDate(la) : '—'}</td>
        <td><span class="badge ${st.cls}"><span class="dot"></span>${st.label}</span></td>
        <td class="client-actions-cell" onclick="event.stopPropagation()"><div class="client-row-actions">
          <button class="btn btn-ghost btn-sm" onclick="openClientDrawer(${nameJson})">${I.customer}View details</button>
          <button class="btn btn-ghost btn-sm" onclick="openClientModal(${nameJson})">${I.edit}Modify</button>
          <button class="btn btn-primary btn-sm" onclick="startNewQuotation(${nameJson})">${I.quote}Create quotation</button>
          <button class="btn btn-ghost btn-sm" onclick="newFollowupForCustomer(${nameJson})">${I.clock}Follow-up</button>
          <button class="btn btn-ghost btn-sm" onclick="shareClientContact(${nameJson})">${I.export}Send contact details</button>
          <button class="btn btn-ghost btn-sm" onclick="launchClientChannel(${nameJson},'call')">Call</button>
          <button class="btn btn-ghost btn-sm" onclick="launchClientChannel(${nameJson},'email')">Email</button>
          <button class="btn btn-ghost btn-sm" onclick="launchClientChannel(${nameJson},'whatsapp')">WhatsApp</button>
          <button class="btn btn-ghost btn-sm client-delete-action" onclick="deleteClient(${nameJson})">${I.x}Delete</button>
        </div></td>
      </tr>`;
    }).join('')}</tbody></table></div></div>`;
    return;
  }
  if (clientView === 'list') {
    body.innerHTML = `<div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Client</th><th>Industry</th><th>Contact</th><th style="text-align:right">Open</th><th style="text-align:right">Pipeline</th><th style="text-align:right">Quotes</th><th>Last activity</th><th>Status</th><th></th></tr></thead><tbody>${list.map(cu => {
      const m = clientMetrics(cu.name), st = clientStatusOf(m), la = clientLastActivity(cu.name), nameJson = esc(JSON.stringify(cu.name));
      return `<tr style="cursor:pointer" onclick="openClientDrawer(${nameJson})">
        <td class="cell-strong">${esc(cu.name)}</td>
        <td class="cell-dim">${esc(cu.cat || 'General')}</td>
        <td class="cell-dim">${[cu.contact, cu.phone].filter(Boolean).map(esc).join(' · ') || '—'}</td>
        <td class="tnum" style="text-align:right">${m.open}</td>
        <td class="tnum cell-strong" style="text-align:right">${inr(m.openValue)}</td>
        <td class="tnum" style="text-align:right">${m.quotes}</td>
        <td class="cell-dim tnum">${la ? formatFollowupDate(la) : '—'}</td>
        <td><span class="badge ${st.cls}"><span class="dot"></span>${st.label}</span></td>
        <td onclick="event.stopPropagation()"><div class="row-actions"><button class="mini-act" onclick="newFollowupForCustomer(${nameJson})" title="Follow-up">${I.clock}</button><button class="mini-act" onclick="startNewQuotation(${nameJson})" title="Quotation">${I.quote}</button><button class="mini-act" onclick="openClientModal(${nameJson})" title="Edit">${I.edit}</button><button class="mini-act" onclick="deleteClient(${nameJson})" title="Delete">${I.x}</button></div></td>
      </tr>`;
    }).join('')}</tbody></table></div></div>`;
    return;
  }
  body.innerHTML = `<div class="grid dash-grid">${list.map(cu => {
    const m = clientMetrics(cu.name), st = clientStatusOf(m), nameJson = esc(JSON.stringify(cu.name));
    return `<div class="col-4"><div class="card card-pad hoverlift" style="cursor:pointer" onclick="openClientDrawer(${nameJson})">
      <div style="display:flex;gap:12px;align-items:center"><div class="appr-ico">${I.building}</div><div style="flex:1;min-width:0"><div style="font-weight:600">${esc(cu.name)}</div><div class="page-desc">${esc(cu.cat || 'General')}</div></div><span class="badge ${st.cls}" style="align-self:flex-start"><span class="dot"></span>${st.label}</span></div>
      ${(cu.contact || cu.phone || cu.email) ? `<div class="page-desc" style="margin-top:10px;line-height:1.6">${[cu.contact, cu.phone, cu.email].filter(Boolean).map(esc).join(' · ')}</div>` : ''}
      <div style="display:flex;gap:16px;margin-top:14px">
        <div><div style="font-size:18px;font-weight:700" class="tnum">${m.open}</div><div class="page-desc">Open leads</div></div>
        <div><div style="font-size:18px;font-weight:700" class="tnum">${inr(m.openValue)}</div><div class="page-desc">Pipeline value</div></div>
        <div><div style="font-size:18px;font-weight:700" class="tnum">${m.quotes}</div><div class="page-desc">Quotations</div></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:14px" onclick="event.stopPropagation()"><button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center" onclick="newFollowupForCustomer(${nameJson})">${I.clock}Follow-up</button><button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center" onclick="startNewQuotation(${nameJson})">${I.quote}Quote</button></div>
    </div></div>`;
  }).join('')}</div>`;
}
function exportClients() {
  const rows = [['Client','Industry','Contact Person','Phone','Email','GST / Registration','Address','Notes','Total Leads','Open Leads','Won Leads','Pipeline Value','Quotations','Open Follow-ups','Total Follow-ups','Status','Last Activity']];
  shownClients().forEach(cu => { const m = clientMetrics(cu.name), st = clientStatusOf(m), la = clientLastActivity(cu.name); rows.push([cu.name, cu.cat || '', cu.contact || '', cu.phone || '', cu.email || '', cu.gst || '', cu.address || '', cu.notes || '', m.leads, m.open, m.won, m.openValue, m.quotes, m.openFus, m.fus.length, st.label, la || '']); });
  downloadCSV(rows, `PTH-Clients-${localDateISO()}.csv`);
  logAudit('Export', 'Clients', `Exported ${rows.length - 1} clients to CSV`);
}
function openClientModal(name) {
  const editing = !!name, c = editing ? (findClient(name) || allClients().find(x => x.name === name)) : null;
  const rec = c || { name: '', cat: 'General', contact: '', email: '', phone: '', gst: '', address: '', notes: '' };
  const cats = ['Government','Infrastructure','Construction','Industrial','Railway','Metro Rail','Power & Energy','Municipal','Private Builder','Other'];
  openModal(`<div class="modal-head"><div class="modal-title">${editing ? 'Edit Client' : 'Add Client'}</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <div class="field" id="cl-name"><label>Client Name <span class="req">*</span></label><input class="input" id="clName" value="${esc(rec.name)}" placeholder="Enter client name" ${editing ? 'readonly' : ''}><div class="field-err">${I.info}Client name is required</div></div>
      <div class="form-grid"><div class="field"><label>Industry</label><select class="select" id="clCat">${cats.concat(rec.cat && !cats.includes(rec.cat) ? [rec.cat] : []).map(x => `<option ${rec.cat === x ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select></div><div class="field"><label>Contact Person</label><input class="input" id="clContact" value="${esc(rec.contact || '')}" placeholder="e.g. R. Sharma"></div></div>
      <div class="form-grid"><div class="field"><label>Phone</label><input class="input" id="clPhone" value="${esc(rec.phone || '')}" placeholder="+91-9876543210"></div><div class="field"><label>Email</label><input class="input" id="clEmail" value="${esc(rec.email || '')}" placeholder="name@company.com"></div></div>
      <div class="form-grid"><div class="field"><label>GST / Registration No.</label><input class="input" id="clGst" value="${esc(rec.gst || '')}" placeholder="e.g. 24AABCL1234K1Z5"></div><div class="field"><label>Address</label><input class="input" id="clAddress" value="${esc(rec.address || '')}" placeholder="City / site"></div></div>
      <div class="field"><label>Notes</label><textarea class="input" id="clNotes" style="min-height:70px;resize:vertical" placeholder="Account notes, credit terms, key requirements">${esc(rec.notes || '')}</textarea></div>
      ${customFieldsForm('client',rec)}
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveClient(${editing ? esc(JSON.stringify(name)) : "''"})">${I.check}${editing ? 'Save Changes' : 'Add Client'}</button></div>`);
}
function saveClient(originalName) {
  const name = document.getElementById('clName').value.trim();
  if (!name) { const f = document.getElementById('cl-name'); f.classList.add('show-err'); const i = f.querySelector('.input'); i.classList.add('shake'); setTimeout(() => i.classList.remove('shake'), 350); return; }
  const existing = findClient(originalName || name);
  const rec = { name, cat: document.getElementById('clCat').value, contact: document.getElementById('clContact').value.trim(), phone: document.getElementById('clPhone').value.trim(), email: document.getElementById('clEmail').value.trim(), gst: document.getElementById('clGst').value.trim(), address: document.getElementById('clAddress').value.trim(), notes: document.getElementById('clNotes').value.trim(), customFields:{...(existing?.customFields||{}),client:collectCustomFields('client')} };
  if (existing) Object.assign(existing, rec); else DB.customers.push(rec);
  persistClients(); if(!existing)clientFilter={search:'',cat:'all',status:'all'}; closeModal();
  toast(existing ? 'Client updated' : 'Client added', `${name} · ${rec.cat}`); logAudit(existing ? 'Edit' : 'Create', 'Clients', `${name} ${existing ? 'updated' : 'added'}`);
  if (state.route === 'customers') VIEWS.customers(document.getElementById('canvas'));
}
function deleteClient(name) {
  const c = findClient(name);
  const m = clientMetrics(name);
  openModal(`<div class="modal-head"><div class="modal-title">Delete Client</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div><div class="modal-body"><p>Remove <b>${esc(name)}</b> from the client list?${!c ? ' This client is derived from pipeline leads and will reappear while those leads exist.' : ''}${m.leads ? ` <br><span class="page-desc">${m.leads} pipeline lead(s) and ${m.quotes} quotation(s) will remain.</span>` : ''}</p></div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" style="background:var(--danger)" onclick="confirmDeleteClient(${esc(JSON.stringify(name))})">Delete</button></div>`);
}
function confirmDeleteClient(name) {
  const i = (DB.customers || []).findIndex(x => String(x.name).toLowerCase() === String(name).toLowerCase());
  if (i >= 0) { DB.customers.splice(i, 1); persistClients(); }
  closeModal(); closeDrawer(); toast('Client removed', name, 'info'); logAudit('Delete', 'Clients', `${name} removed`);
  if (state.route === 'customers') VIEWS.customers(document.getElementById('canvas'));
}
function launchClientChannel(name, kind) {
  const c = findClient(name) || {}; const phone = String(c.phone || '').replace(/\D/g, ''), email = String(c.email || '').trim();
  if (kind === 'email') { if (!email) { toast('No email on file', 'Add an email to this client first.', 'err'); return; } window.open(`mailto:${email}`, '_blank'); }
  else if (kind === 'whatsapp') { if (phone.length < 10) { toast('No WhatsApp number', 'Add a valid phone number first.', 'err'); return; } window.open(`https://wa.me/${phone}`, '_blank', 'noopener'); }
  else { if (phone.length < 7) { toast('No phone number', 'Add a phone number first.', 'err'); return; } window.open(`tel:${phone}`); }
  logAudit('Contact', 'Clients', `${kind} initiated for ${name}`);
}
function clientContactText(name) {
  const c = findClient(name) || allClients().find(x => String(x.name).toLowerCase() === String(name).toLowerCase()) || { name };
  return [c.name, c.contact && `Contact: ${c.contact}`, c.phone && `Phone: ${c.phone}`, c.email && `Email: ${c.email}`, c.gst && `GST / Registration: ${c.gst}`, c.address && `Address: ${c.address}`].filter(Boolean).join('\n');
}
async function shareClientContact(name) {
  const text = clientContactText(name);
  try {
    if (navigator.share) {
      await navigator.share({ title: `${name} contact details`, text });
      toast('Contact details shared', name);
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      toast('Contact details copied', 'Paste them into WhatsApp, email or any message.');
    } else {
      window.prompt('Copy these contact details:', text);
    }
    logAudit('Share', 'Clients', `Contact details prepared for ${name}`);
  } catch (error) {
    if (error?.name !== 'AbortError') toast('Unable to share contact', 'Please copy the details from View details.', 'err');
  }
}
// 360° client drawer.
function openClientDrawer(name) {
  const c = findClient(name) || allClients().find(x => x.name === name) || { name, cat: 'General' };
  const m = clientMetrics(name); const key = String(name).toLowerCase();
  const leads = DB.pipeline.leads.filter(l => String(l.cust).toLowerCase() === key);
  const quotes = (savedQuotations || []).filter(q => String(q.customer).toLowerCase() === key);
  const canPhone = !!c.phone, canEmail = !!c.email;
  const finance=clientFinance(name),risk=creditRisk(name),retention=retentionState(name),crossSell=crossSellRecommendations(name);
  openDrawer(`
    <div class="drawer-head"><button class="icon-btn drawer-close" onclick="closeDrawer()">${I.x}</button>
      <div style="font-size:12px;color:var(--text-muted)">Client · ${esc(c.cat || 'General')}</div>
      <div style="font-size:19px;font-weight:600;margin:3px 0 4px">${esc(c.name)}</div>
      ${c.contact ? `<div class="page-desc">${esc(c.contact)}</div>` : ''}
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="btn btn-ghost btn-sm" ${canPhone ? '' : 'disabled style="opacity:.5"'} onclick="launchClientChannel(${esc(JSON.stringify(name))},'call')">${I.clock}Call</button>
        <button class="btn btn-ghost btn-sm" ${canEmail ? '' : 'disabled style="opacity:.5"'} onclick="launchClientChannel(${esc(JSON.stringify(name))},'email')">${I.enquiry}Email</button>
        <button class="btn btn-ghost btn-sm" ${canPhone ? '' : 'disabled style="opacity:.5"'} onclick="launchClientChannel(${esc(JSON.stringify(name))},'whatsapp')">${I.enquiry}WhatsApp</button>
      </div></div>
    <div class="drawer-tabs"><button class="drawer-tab active" data-tab="ov">Overview</button><button class="drawer-tab" data-tab="finance">Credit</button><button class="drawer-tab" data-tab="sell">Cross-sell</button><button class="drawer-tab" data-tab="tl">360° Timeline</button><button class="drawer-tab" data-tab="ld">Leads (${leads.length})</button><button class="drawer-tab" data-tab="qt">Quotes (${quotes.length})</button><button class="drawer-tab" data-tab="fu">Follow-ups (${m.fus.length})</button></div>
    <div class="drawer-body">
      <div class="drawer-pane" id="pane-ov">
        <div class="kv"><span class="k">Industry</span><span class="v">${esc(c.cat || 'General')}</span></div>
        ${c.phone ? `<div class="kv"><span class="k">Phone</span><span class="v">${esc(c.phone)}</span></div>` : ''}
        ${c.email ? `<div class="kv"><span class="k">Email</span><span class="v">${esc(c.email)}</span></div>` : ''}
        ${c.gst ? `<div class="kv"><span class="k">GST / Reg.</span><span class="v">${esc(c.gst)}</span></div>` : ''}
        ${c.address ? `<div class="kv"><span class="k">Address</span><span class="v">${esc(c.address)}</span></div>` : ''}
        <div class="kv"><span class="k">Open Pipeline</span><span class="v">${inr(m.openValue)} · ${m.open} lead(s)</span></div>
        <div class="kv"><span class="k">Won</span><span class="v">${m.won}</span></div>
        <div class="kv"><span class="k">Open Follow-ups</span><span class="v">${m.openFus}</span></div>
        <div class="kv"><span class="k">Retention</span><span class="v"><i class="risk-dot" style="background:${retention.color}"></i>${retention.level} · ${retention.days} days</span></div>
        ${c.notes ? `<div style="margin-top:14px"><div class="page-desc" style="margin-bottom:4px">Notes</div><div style="font-size:13px">${esc(c.notes)}</div></div>` : ''}
        <div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-primary" style="flex:1;justify-content:center" onclick="closeDrawer();newFollowupForCustomer(${esc(JSON.stringify(name))})">${I.clock}Follow-up</button><button class="btn btn-ghost" style="flex:1;justify-content:center" onclick="closeDrawer();startNewQuotation(${esc(JSON.stringify(name))})">${I.quote}Quotation</button></div>
        <div style="display:flex;gap:8px;margin-top:8px"><button class="btn btn-ghost" style="flex:1;justify-content:center" onclick="openClientModal(${esc(JSON.stringify(name))})">${I.edit}Edit</button><button class="btn btn-ghost" style="flex:1;justify-content:center;color:var(--danger)" onclick="deleteClient(${esc(JSON.stringify(name))})">${I.x}Delete</button></div>
      </div>
      <div class="drawer-pane" id="pane-finance" style="display:none">${enterprisePermission('financial')?`<div class="risk-panel risk-${risk.level}"><span>Credit risk</span><b>${risk.level.toUpperCase()}</b><small>${esc(risk.reason)}</small></div><div class="kv"><span class="k">Credit Limit</span><span class="v">${inr(finance.creditLimit)}</span></div><div class="kv"><span class="k">Outstanding</span><span class="v">${inr(finance.outstanding)}</span></div><div class="kv"><span class="k">Overdue</span><span class="v">${inr(finance.overdue)}</span></div><div class="kv"><span class="k">Payment Ratio</span><span class="v">${risk.ratio}%</span></div><div class="kv"><span class="k">Last Payment</span><span class="v">${finance.lastPayment?formatAppDate(finance.lastPayment):'Not recorded'}</span></div><button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:14px" onclick="openClientFinanceModal(${esc(JSON.stringify(name))})">Update Credit & Payment</button>`:'<div class="restricted-panel">Financial information is restricted for your role.</div>'}</div>
      <div class="drawer-pane" id="pane-sell" style="display:none"><p class="page-desc">Based on historical SOR categories and related testing families.</p>${crossSell.map(x=>`<div class="cross-sell-card"><div><b>${esc(x.category)}</b><small>${esc(x.reason)}</small></div><button class="btn btn-sm btn-primary" onclick="closeDrawer();startNewQuotation(${esc(JSON.stringify(name))})">Quote</button></div>`).join('')||'<div class="empty"><h4>No additional category identified</h4></div>'}</div>
      <div class="drawer-pane" id="pane-tl" style="display:none">${crmTimelineHTML(name)}</div>
      <div class="drawer-pane" id="pane-ld" style="display:none">${leads.length ? leads.map(l => `<div class="appr-item" style="cursor:pointer" onclick="closeDrawer();openLeadDrawer('${esc(l.id)}')"><div class="appr-main"><div class="appr-name">${esc(l.proj)}</div><div class="appr-auth">${esc(l.cat)} · ${inr(l.val)}</div></div>${statusBadge(l.col === 'won' ? 'won' : l.col === 'lost' ? 'lost' : 'review')}</div>`).join('') : `<div class="empty" style="padding:24px"><h4>No leads</h4></div>`}</div>
      <div class="drawer-pane" id="pane-qt" style="display:none">${quotes.length ? quotes.map(q => `<div class="appr-item" style="cursor:pointer" onclick="closeDrawer();openQuotationDrawer('${esc(q.number)}')"><div class="appr-main"><div class="appr-name">${esc(q.number)}</div><div class="appr-auth">₹${Number(q.total || 0).toLocaleString('en-IN')} · ${formatFollowupDate(q.date)}</div></div>${statusBadge(q.status)}</div>`).join('') : `<div class="empty" style="padding:24px"><h4>No quotations</h4></div>`}</div>
      <div class="drawer-pane" id="pane-fu" style="display:none"><button class="btn btn-primary" style="width:100%;justify-content:center;margin-bottom:14px" onclick="closeDrawer();newFollowupForCustomer(${esc(JSON.stringify(name))})">${I.plus}New Follow-up</button>${followupHistoryHTML(m.fus)}</div>
    </div>`);
}

/* ---------- QUOTATIONS (rates pulled directly from PTH SOR) ---------- */
const QUOTATION_KEY = 'pth_quotations_v1';
let savedQuotations = (() => {
  try { const saved=JSON.parse(localStorage.getItem(QUOTATION_KEY)); if(Array.isArray(saved)) return saved; } catch(e) {}
  return [];
})();
function persistQuotations(){ localStorage.setItem(QUOTATION_KEY,JSON.stringify(savedQuotations)); }
function quotationFinancialYear(dateValue=localDateISO()){
  const date=new Date(`${String(dateValue).slice(0,10)}T00:00:00`),year=date.getFullYear(),start=date.getMonth()>=3?year:year-1;
  return `${String(start).slice(-2)}-${String(start+1).slice(-2)}`;
}
function quotationDateCode(dateValue=localDateISO()){return String(dateValue).slice(0,10).replace(/-/g,'');}
function nextQuotationNumber(dateValue=localDateISO()){
  const fy=quotationFinancialYear(dateValue),pattern=new RegExp(`^PTH/${fy.replace('-','\\-')}/\\d{8}/(\\d+)$`),max=Math.max(0,...savedQuotations.map(q=>+(String(q.number).match(pattern)?.[1]||0)));
  return `PTH/${fy}/${quotationDateCode(dateValue)}/${String(max+1).padStart(3,'0')}`;
}
const QUOTE_LAYOUT_KEY='pth_quotation_layout_v1';
const QUOTE_LAYOUT_FAMILIES=[
  ['Executive Navy','#17324d','#d7e5f2','Inter'],['Laboratory Green','#176b4d','#dff2e9','Inter'],['PTH Orange','#d96b12','#fff0e3','Inter'],['Slate Professional','#334155','#e9eef4','Arial'],['Royal Blue','#1d4ed8','#e5edff','Arial'],
  ['Teal Precision','#0f766e','#dff7f4','Inter'],['Maroon Classic','#7f1d1d','#f8e7e7','Georgia'],['Graphite Minimal','#252a2e','#eceeef','Arial'],['Indigo Technical','#4338ca','#ecebff','Inter'],['Gold Corporate','#8a6415','#fbf3d9','Georgia']
];
const QUOTE_LAYOUT_CATEGORIES=['Material Testing','Soil Investigation','Non-Destructive Testing','Pile Testing','General Laboratory'];
const QUOTE_LAYOUTS=QUOTE_LAYOUT_CATEGORIES.flatMap((category,ci)=>QUOTE_LAYOUT_FAMILIES.map((family,fi)=>({id:`QT-${ci*10+fi+1}`,name:`${category} · ${family[0]}`,category,accent:family[1],tint:family[2],font:family[3],style:fi%3===0?'banded':fi%3===1?'bordered':'minimal'})));
const PTH_QUOTATION_HEADER='assets/img/pth-letterhead.png';
const PTH_QUOTATION_FOOTER='assets/img/pth-letter-footer.png';
const PTH_QUOTATION_HEADER_PRINT='assets/img/pth-letterhead-print.jpg';
const PTH_QUOTATION_FOOTER_PRINT='assets/img/pth-letter-footer-print.jpg';
let quotationLayout=(()=>{const defaults={templateId:'QT-1',header:'PTH CONSULTANCY SERVICES LLP',subheader:'Civil Engineering Material Testing Laboratory',footer:'',logoUrl:DB.brand.logoUrl,headerImage:PTH_QUOTATION_HEADER,footerImage:PTH_QUOTATION_FOOTER,accent:'#17324d',tint:'#d7e5f2',font:'Inter',style:'banded'};try{const saved=JSON.parse(localStorage.getItem(QUOTE_LAYOUT_KEY)||'{}');return {...defaults,...saved,headerImage:saved.headerImage||PTH_QUOTATION_HEADER,footerImage:saved.footerImage||PTH_QUOTATION_FOOTER};}catch(e){return defaults;}})();
function quotationLayoutStyle(){return `--ql-accent:${quotationLayout.accent};--ql-tint:${quotationLayout.tint};--ql-font:${quotationLayout.font}`;}
function quotationHeader(){const hasImage=!!quotationLayout.headerImage;return `<div class="quotation-print-header ${quotationLayout.style}${hasImage?' official-letterhead':''}" style="${quotationLayoutStyle()}">${hasImage?`<img class="ql-wide-image" src="${quotationLayout.headerImage}" alt="PTH quotation letterhead">`:''}<div class="ql-head-row">${!hasImage&&quotationLayout.logoUrl?`<img class="ql-logo" src="${quotationLayout.logoUrl}" alt="Company logo">`:''}${!hasImage?`<div><div class="ql-title">${esc(quotationLayout.header)}</div><div class="ql-subtitle">${esc(quotationLayout.subheader)}</div></div>`:''}<div class="ql-document-title">QUOTATION</div></div></div>`;}
function quotationFooter(){const hasImage=!!quotationLayout.footerImage;return `<div class="quotation-print-footer${hasImage?' official-letter-footer':''}" style="${quotationLayoutStyle()}">${hasImage?`<img class="ql-wide-image" src="${quotationLayout.footerImage}" alt="PTH quotation footer">`:''}${quotationLayout.footer?`<div>${esc(quotationLayout.footer)}</div>`:''}</div>`;}
let quoteLines = [];
let quoteDiscountPct = 0;
let quoteTermsKey = 'material';
let quoteTermsText = '';
let editingQuotationNumber = '';
let editingQuotationCustomer = '';
let quoteKindAttention = '';
function currentQuotationRepresentative(){const user=DB.users?.find(u=>u.name===DB.user?.name)||DB.user||{};return {name:user.name||'PTH Representative',phone:user.phone||DB.brand.phone||'',email:user.email||''};}
function quotationCategories(items=quoteLines){return [...new Set((items||[]).map(item=>item.category).filter(Boolean))];}
function quotationCategoryHeading(){return 'Quotation for Testing Services';}
function updateQuotationHeading(){}
const QUOTE_TERMS = {
  material: `1. Rates are for laboratory testing only and exclude GST.\n2. Samples shall be supplied in the quantity and condition specified in the SOR.\n3. Testing will follow the stated IS/ASTM standard.\n4. Reports will be issued after receipt of complete samples, instructions and payment.\n5. Retesting, witnessing, sample collection and special preparation are chargeable extra.`,
  soil: `1. Rates exclude GST, site mobilisation, transport, permits and stay.\n2. Bore locations, access and underground-utility clearance are in the client scope.\n3. Quantities are provisional; billing will be based on actual executed depth/tests.\n4. Water, electricity, safe working access and site coordination shall be provided by the client.\n5. The report timeline starts after completion of fieldwork and receipt of required project information.`,
  ndt: `1. Rates exclude GST, mobilisation, scaffolding, access platforms and surface preparation.\n2. Test locations and structural drawings shall be confirmed by the client/consultant.\n3. Results represent the tested locations only and require engineering interpretation.\n4. Safe access, shutdown permissions and work permits are in the client scope.\n5. Additional locations and repeat visits will be billed separately.`,
  pile: `1. Rates exclude GST, mobilisation and site-enabling works.\n2. Pile identification, drawings, casting records and test sequence shall be provided before mobilisation.\n3. Pile heads must be prepared and safely accessible as required by the selected test method.\n4. Client shall provide power, lighting, access and traffic/safety control.\n5. Repeat attendance caused by site unreadiness will be chargeable.`,
  pileload: `1. Rates exclude GST, kentledge/reaction system, excavation, pile-head preparation and mobilisation.\n2. Loading arrangement, calibrated reaction frame and safe working platform are in the client scope unless quoted separately.\n3. Test load and acceptance criteria must be approved before execution.\n4. Continuous site access, power, lighting and safety supervision shall be provided by the client.\n5. Standby time and additional load cycles will be billed separately.`,
  general: `1. All listed rates exclude GST; applicable GST will be added extra.\n2. Work outside the stated scope will be quoted separately.\n3. Delivery timelines begin after receipt of complete inputs, samples and confirmation.\n4. Payment and report release will follow the agreed commercial terms.\n5. This quotation is subject to final technical review and scope confirmation.`,
};
function startNewQuotation(customer=''){ quoteLines=[]; quoteDiscountPct=0; quoteTermsKey='material'; quoteTermsText=QUOTE_TERMS.material; quoteKindAttention=''; editingQuotationNumber=''; editingQuotationCustomer=customer||''; navigate('createquotation'); }
let quotationFilter={search:'',status:'all',validity:'all'};
function quotationValidUntil(q){if(q.validUntil)return q.validUntil;const d=new Date(`${q.date||localDateISO()}T00:00:00`);d.setDate(d.getDate()+30);return localDateISO(d);}
function quotationExpiryState(q){if(['won','lost','rejected'].includes(q.status))return 'closed';const days=Math.ceil((new Date(`${quotationValidUntil(q)}T23:59:59`)-new Date())/86400000);return days<0?'expired':days<=7?'expiring':'valid';}
VIEWS.quotations = function(c){
  const total=savedQuotations.reduce((sum,q)=>sum+(q.total||0),0), submitted=savedQuotations.filter(q=>q.status==='submitted').length, won=savedQuotations.filter(q=>q.status==='won').length,expired=savedQuotations.filter(q=>quotationExpiryState(q)==='expired').length,expiring=savedQuotations.filter(q=>quotationExpiryState(q)==='expiring').length;
  c.innerHTML=`${pageHead('Quotations','Lifecycle, validity, follow-ups, revisions and commercial conversion tracking.',`<button class="btn btn-ghost" onclick="openDataImport('quotations')">${I.upload}Bulk Import</button><button class="btn btn-primary" onclick="startNewQuotation()">${I.plus}Create Quotation</button>`)}
    <div class="stat-strip enter"><div class="stat-chip"><div class="sc-val tnum">${savedQuotations.length}</div><div class="sc-label">Total quotations</div></div><div class="stat-chip"><div class="sc-val tnum">${submitted}</div><div class="sc-label">Submitted</div></div><div class="stat-chip"><div class="sc-val tnum" style="color:var(--primary-dark)">${won}</div><div class="sc-label">Won</div></div><div class="stat-chip"><div class="sc-val tnum" style="color:var(--warning)">${expiring}</div><div class="sc-label">Expiring in 7 days</div></div><div class="stat-chip"><div class="sc-val tnum" style="color:var(--danger)">${expired}</div><div class="sc-label">Expired</div></div><div class="stat-chip"><div class="sc-val tnum">${inr(total)}</div><div class="sc-label">Quotation value</div></div></div>
    <div class="filter-bar enter"><div class="filter-search">${I.search}<input placeholder="Search quotation or client..." value="${esc(quotationFilter.search)}" oninput="setQuotationFilter('search',this.value)"></div><select class="fdrop" onchange="setQuotationFilter('status',this.value)"><option value="all">All statuses</option>${[['review','Review'],['approval_pending','Approval Pending'],['approved','Approved & Locked'],['approval_rejected','Approval Rejected'],['submitted','Submitted'],['negotiation','Negotiation'],['won','Won'],['lost','Lost']].map(s=>`<option value="${s[0]}" ${quotationFilter.status===s[0]?'selected':''}>${s[1]}</option>`).join('')}</select><select class="fdrop" onchange="setQuotationFilter('validity',this.value)"><option value="all">All validity</option><option value="valid" ${quotationFilter.validity==='valid'?'selected':''}>Valid</option><option value="expiring" ${quotationFilter.validity==='expiring'?'selected':''}>Expiring</option><option value="expired" ${quotationFilter.validity==='expired'?'selected':''}>Expired</option></select></div>
    <div class="card enter"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Quotation No.</th><th>Date</th><th>Client</th><th>Line Items</th><th>Total incl. GST</th><th>Status</th><th></th></tr></thead><tbody id="quotationRegister"></tbody></table></div></div>`; renderQuotationRegister('');
};
function setQuotationFilter(key,value){quotationFilter[key]=value;renderQuotationRegister();}
function resetQuotationFilters(){quotationFilter={search:'',status:'all',validity:'all'};}
function renderQuotationRegister(search){ const body=document.getElementById('quotationRegister'); if(!body)return;if(search!=null)quotationFilter.search=search;const term=quotationFilter.search.toLowerCase(); const rows=savedQuotations.filter(q=>canViewCrmRecord(q)&&(quotationFilter.status==='all'||q.status===quotationFilter.status)&&(quotationFilter.validity==='all'||quotationExpiryState(q)===quotationFilter.validity)&&(!term||`${q.number} ${q.customer} ${q.status}`.toLowerCase().includes(term))).sort((a,b)=>b.number.localeCompare(a.number)); body.innerHTML=rows.length?rows.map(q=>{const validity=quotationExpiryState(q);return `<tr onclick="openQuotationDrawer('${esc(q.number)}')"><td><div class="cell-strong tnum">${esc(q.number)}</div><div class="page-desc">Valid to ${formatFollowupDate(quotationValidUntil(q))}</div></td><td class="cell-dim tnum">${formatFollowupDate(q.date)}</td><td class="cell-strong">${esc(q.customer)}</td><td class="tnum">${q.lines}</td><td class="tnum cell-strong">${maskFinancial(q.total||0)}</td><td>${statusBadge(q.status)} ${validity==='expired'?'<span class="badge badge-expired">Expired</span>':validity==='expiring'?'<span class="badge badge-expiring">Expiring</span>':''}</td><td onclick="event.stopPropagation()"><div class="row-actions quotation-actions"><button class="mini-act" onclick="openQuotationDrawer('${esc(q.number)}')" title="Open">${I.eye}</button><button class="mini-act" onclick="newFollowupForQuote('${esc(q.number)}')" title="Follow-up">${I.clock}</button><button class="mini-act" onclick="duplicateQuotation('${esc(q.number)}')" title="Duplicate / revise">${I.copy||I.plus}</button><button class="mini-act" onclick="modifyQuotation('${esc(q.number)}')" title="Modify">${I.edit}</button><button class="mini-act" onclick="openQuotationSend('${esc(q.number)}')" title="Print / Send">${I.export}</button><button class="mini-act danger" onclick="deleteQuotation('${esc(q.number)}')" title="Delete">${I.x}</button></div></td></tr>`}).join(''):`<tr><td colspan="7"><div class="empty"><h4>No quotations found</h4></div></td></tr>`; }
function updateQuotationStatus(number,status){const q=savedQuotations.find(x=>x.number===number);if(!q)return;if(['approval_pending','approved','approval_rejected'].includes(q.status)){toast('Controlled quotation status','Use the CRM Intelligence approval inbox or create a revision.','err');return;}q.status=status;q.statusUpdatedAt=new Date().toISOString();persistQuotations();closeDrawer();toast('Quotation status updated',`${number} · ${status}`);logAudit('Status Change','Quotations',`${number} → ${status}`);VIEWS.quotations(document.getElementById('canvas'));}
function editableQuotationItems(q){
  if(q.items?.length)return q.items.map(item=>({...item}));
  const total=Math.max(0,Number(q.total)||0);
  const rate=total>0?total-Math.round(total*18/118):0;
  return [{category:'Legacy Quotation',name:'Original quotation scope — verify and update before issue',parameters:[],code:q.number,qty:1,unit:'Lump Sum',rate,rateText:String(rate),onReq:false,disc:0,custom:true,legacy:true}];
}
function duplicateQuotation(number){const q=savedQuotations.find(x=>x.number===number);if(!q)return;const legacy=!q.items?.length;editingQuotationNumber='';editingQuotationCustomer=q.customer;quoteKindAttention=q.kindAttention||'';quoteDiscountPct=legacy?0:(q.discount||0);quoteLines=editableQuotationItems(q);quoteTermsText=q.terms||QUOTE_TERMS.material;navigate('createquotation');toast(legacy?'Legacy quotation reconstructed':'Quotation copied',legacy?'A review-required lump-sum line was created from the saved total.':`Creating a new revision from ${number}`,'info');}
function openQuotationDrawer(number){ const q=savedQuotations.find(item=>item.number===number); if(!q)return; const history=followups.filter(f=>f.quoteNumber===number),validity=quotationExpiryState(q),controlled=['approval_pending','approved','approval_rejected'].includes(q.status),statuses=[['review','Review'],['approval_pending','Approval Pending'],['approved','Approved & Locked'],['approval_rejected','Approval Rejected'],['submitted','Submitted'],['negotiation','Negotiation'],['won','Won'],['lost','Lost']]; openDrawer(`<div class="drawer-head"><button class="icon-btn drawer-close" onclick="closeDrawer()">${I.x}</button><div style="font-size:12px;color:var(--text-muted)">Quotation</div><div style="font-size:19px;font-weight:600;margin:3px 0">${esc(q.number)}</div><div class="page-desc">${esc(q.customer)}</div></div><div class="drawer-tabs"><button class="drawer-tab active" data-tab="ov">Overview</button><button class="drawer-tab" data-tab="fu">Follow-ups (${history.length})</button></div><div class="drawer-body"><div class="drawer-pane" id="pane-ov"><div class="kv"><span class="k">Date</span><span class="v">${formatFollowupDate(q.date)}</span></div><div class="kv"><span class="k">Valid Until</span><span class="v">${formatFollowupDate(quotationValidUntil(q))} · ${validity}</span></div><div class="kv"><span class="k">Line Items</span><span class="v">${q.lines}</span></div><div class="kv"><span class="k">Total incl. GST</span><span class="v">${maskFinancial(q.total||0)}</span></div><div class="field" style="margin-top:14px"><label>Lifecycle Status</label><select class="select" ${controlled?'disabled':''} onchange="updateQuotationStatus('${esc(q.number)}',this.value)">${statuses.map(s=>`<option value="${s[0]}" ${q.status===s[0]?'selected':''}>${s[1]}</option>`).join('')}</select>${controlled?'<div class="page-desc" style="margin-top:6px">Controlled by commercial approval workflow.</div>':''}</div><div style="display:grid;gap:8px;margin-top:16px"><button class="btn btn-primary" onclick="closeDrawer();newFollowupForQuote('${esc(q.number)}')">${I.clock}Follow-up</button><button class="btn btn-ghost" onclick="closeDrawer();duplicateQuotation('${esc(q.number)}')">${I.copy||I.plus}Revise</button><button class="btn btn-ghost" onclick="openQuotationComparison('${esc(q.number)}')">${I.analytics||I.eye}Compare Revisions</button></div></div><div class="drawer-pane" id="pane-fu" style="display:none"><button class="btn btn-primary" style="width:100%;justify-content:center;margin-bottom:14px" onclick="closeDrawer();newFollowupForQuote('${esc(q.number)}')">${I.plus}New Follow-up</button>${followupHistoryHTML(history)}</div></div>`); }
function sorRateText(test) {
  if (test.rate == null) return test.rateText;
  const plain = String(test.rateText || '').replace(/[,₹\s]/g, '');
  return plain === String(test.rate) ? `₹${test.rate.toLocaleString('en-IN')}` : `₹${test.rateText}`;
}
function quoteComboOptions(cat) {
  const combos = [];
  if (cat.packageRate) combos.push({ label: 'Complete Package', rate: cat.packageRate, tests: cat.tests, code: 'Approved SOR package' });
  (cat.combos || []).forEach(text => {
    if (/PACKAGE RATE:/i.test(text)) return;
    const range = text.match(/Sr\.\s*No\.?\s*(\d+)\s*to\s*(\d+)/i), price = text.match(/₹\s*([\d,]+)/);
    if (!range || !price) return;
    const start = Math.max(0,+range[1]-1), end = Math.min(cat.tests.length,+range[2]);
    combos.push({ label:'Combo Package Offer', rate:+price[1].replace(/,/g,''), tests:cat.tests.slice(start,end), code:`SOR Sr. No. ${range[1]} to ${range[2]}` });
  });
  return combos;
}
VIEWS.createquotation = function (c) {
  const SOR = window.SOR || [];
  if (!quoteTermsText) quoteTermsText = QUOTE_TERMS[quoteTermsKey];
  c.innerHTML = `${pageHead(editingQuotationNumber?'Modify Quotation':'Create Quotation', 'Build a quotation from the PTH Schedule of Rates (FY 2026–27). Listed rates exclude GST; GST is added separately.', `<button class="btn btn-ghost" onclick="openDataImport('quotations')">${I.upload}Bulk Import</button><button class="btn btn-ghost" onclick="printQuotation()">${I.export}Print / Save PDF</button><button class="btn btn-ghost" onclick="openQuotationSend(document.getElementById('qNumber').value,true)">${I.enquiry}Email / WhatsApp</button><button class="btn btn-ghost hide-sm" onclick="navigate('sor')">${I.rate}View SOR</button><button class="btn btn-primary" onclick="saveQuotation()">${I.check}Save Quotation</button>`)}
    <div class="grid dash-grid quotation-page">
      <div class="col-9"><div class="card card-pad enter quotation-sheet quote-layout" style="${quotationLayoutStyle()}">
        ${quotationHeader()}
        <div class="card-head quote-editor-head"><h3>Quotation Builder</h3><span class="card-sub" style="margin-left:auto">Rates auto-filled from SOR</span></div>
        <div class="form-grid quote-identity" style="margin-top:12px"><div class="field"><label>Client</label><select class="select" id="qCustomer">${[...new Set([...DB.pipeline.leads.map(l=>l.cust),...(DB.customers||[]).map(x=>x.name)])].map(x=>`<option ${editingQuotationCustomer===x?'selected':''}>${esc(x)}</option>`).join('')}</select></div><div class="field"><label>Quotation No.</label><input class="input" id="qNumber" value="${editingQuotationNumber||nextQuotationNumber()}" readonly></div><div class="field"><label>Kind Attention</label><input class="input" id="qKindAttention" value="${esc(quoteKindAttention)}" placeholder="Name / designation of recipient"></div><div class="field"><label>PTH Representative</label><div class="quotation-representative">${esc(currentQuotationRepresentative().name)} · ${esc(currentQuotationRepresentative().phone)}</div></div></div>
        <div class="quote-builder-controls" style="display:flex;gap:8px;align-items:flex-end;margin-bottom:12px;flex-wrap:wrap;padding:12px;background:var(--surface-soft);border:1px solid var(--border);border-radius:12px">
          <div style="flex:1;min-width:180px"><label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Test category</label><select class="select" id="qCat" onchange="quoteFillTests()">${SOR.map(cat=>`<option value="${cat.id}">${cat.id}. ${esc(cat.name)}</option>`).join('')}</select></div>
          <div style="flex:2;min-width:220px"><label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Test / service</label><select class="select" id="qTest"></select></div>
          <button class="btn btn-primary" onclick="quoteAddLine()">${I.plus}Add</button>
          <button class="btn btn-ghost" onclick="openCustomQuoteLine()">${I.plus}Custom Service</button>
          <button class="btn btn-ghost" onclick="quoteAddFullSOR()" title="Add every SOR test as a line item with quantity 1">${I.rate}Add Full SOR</button>
        </div>
        <div class="tbl-wrap"><table class="tbl quotation-table"><thead id="quoteHead"></thead><tbody id="quoteBody"></tbody></table></div>
        <div id="quoteTotals"></div>
        <div class="quote-terms"><div class="card-head"><h3>Terms & Conditions</h3><span class="card-sub" style="margin-left:auto">${esc(quoteTermsKey.toUpperCase())} template</span></div><div class="quote-terms-text">${esc(quoteTermsText).replace(/\n/g,'<br>')}</div></div>
        ${quotationFooter()}
      </div></div>
      <div class="col-3"><div class="card card-pad enter quote-controls"><div class="card-head"><h3>Commercial Options</h3></div>
        <div class="field" style="margin-top:12px"><label>Discount (%) <span style="font-weight:400;color:var(--text-muted)">— applies to all lines</span></label><input class="input" id="qDiscount" type="number" min="0" max="100" step="0.01" value="${quoteDiscountPct || ''}" placeholder="No discount" oninput="setQuoteDiscount(this.value)"><div style="font-size:11.5px;color:var(--text-muted);margin-top:5px">Sets every line's discount. You can still edit the Discount % on each row individually.</div></div>
        <div class="field"><label>Terms template</label><select class="select" id="qTermsTemplate" onchange="quoteApplyTermsTemplate(this.value)"><option value="material" ${quoteTermsKey==='material'?'selected':''}>Material Testing</option><option value="soil" ${quoteTermsKey==='soil'?'selected':''}>Soil Investigation</option><option value="ndt" ${quoteTermsKey==='ndt'?'selected':''}>Non-Destructive Testing</option><option value="pile" ${quoteTermsKey==='pile'?'selected':''}>Pile Testing</option><option value="pileload" ${quoteTermsKey==='pileload'?'selected':''}>Pile Load Tests</option><option value="general" ${quoteTermsKey==='general'?'selected':''}>General Testing</option></select></div>
        <div class="field"><label>Edit selected terms</label><textarea class="input" id="qTermsText" style="min-height:210px;resize:vertical" oninput="updateQuoteTermsText(this.value)">${esc(quoteTermsText)}</textarea></div>
      </div></div>
    </div>`;
  quoteFillTests();
  renderQuoteLines();
};
function saveQuotation() {
  if (!quoteLines.length) { toast('Add quotation items', 'At least one test or service is required.', 'err'); return; }
  const customer=document.getElementById('qCustomer')?.value, number=document.getElementById('qNumber')?.value;
  if (!customer || !number) { toast('Quotation details required', 'Select a customer before saving.', 'err'); return; }
  const totals=calculateQuoteTotals();
  const representative=currentQuotationRepresentative();
  const validDate=new Date();validDate.setDate(validDate.getDate()+30);
  const existing=savedQuotations.findIndex(q=>q.number===number),previous=existing>=0?savedQuotations[existing]:null,previousSnapshot=previous?JSON.parse(JSON.stringify(previous)):null;
  const record={ number, customer, kindAttention:document.getElementById('qKindAttention')?.value.trim()||'', representative, categoryHeading:quotationCategoryHeading(), date:previous?.date||localDateISO(), validUntil:previous?.validUntil||localDateISO(validDate), status:previous?.status||'review', createdBy:previous?.createdBy||DB.user.name, updatedAt:new Date().toISOString(), lines:quoteLines.length, total:totals.total, discount:quoteDiscountPct, terms:quoteTermsText, items:quoteLines.map(item=>({...item})) };
  if(existing>=0)savedQuotations[existing]={...savedQuotations[existing],...record}; else savedQuotations.push(record);
  if(previousSnapshot)captureQuotationRevision(previousSnapshot,savedQuotations[existing]);
  persistQuotations();crmRunAutomation('quotation_saved',savedQuotations.find(q=>q.number===number)||record); resetQuotationFilters(); toast('Quotation saved', `${number} · ₹${totals.total.toLocaleString('en-IN')} incl. GST`); logAudit(existing>=0?'Edit':'Create','Quotations',`${number} saved for ${customer}`); navigate('quotations');
}
function modifyQuotation(number){ const q=savedQuotations.find(item=>item.number===number); if(!q)return;if(q.status==='approval_pending'){toast('Approval pending','This quotation cannot be modified until the commercial decision is recorded.','err');return;}if(q.status==='approved'){toast('Approved version is locked','A revision has been created so the approved version remains unchanged.','info');duplicateQuotation(number);return;} const legacy=!q.items?.length; editingQuotationNumber=q.number; editingQuotationCustomer=q.customer; quoteKindAttention=q.kindAttention||''; quoteDiscountPct=legacy?0:(q.discount||0); quoteLines=editableQuotationItems(q).map(item=>{const l={...item}; if(l.disc==null) l.disc=(!l.onReq&&quoteDiscountPct>0)?quoteDiscountPct:0; return l;}); quoteTermsText=q.terms||QUOTE_TERMS.material; navigate('createquotation'); if(legacy)toast('Legacy quotation reconstructed','Review the lump-sum scope line before saving or issuing this quotation.','info'); }
function deleteQuotation(number){ const q=savedQuotations.find(item=>item.number===number); if(!q)return; openModal(`<div class="modal-head"><div class="modal-title">Delete Quotation</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div><div class="modal-body"><p>Delete <b>${esc(number)}</b> for ${esc(q.customer)}? This cannot be undone.</p></div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" style="background:var(--danger)" onclick="confirmDeleteQuotation('${esc(number)}')">Delete</button></div>`); }
function confirmDeleteQuotation(number){ const index=savedQuotations.findIndex(q=>q.number===number); if(index<0)return; savedQuotations.splice(index,1); persistQuotations(); closeModal(); VIEWS.quotations(document.getElementById('canvas')); toast('Quotation deleted',number,'info'); logAudit('Delete','Quotations',`${number} deleted`); }
async function printQuotation(){
  const number=document.getElementById('qNumber')?.value;
  if(!quoteLines.length && !savedQuotations.find(item=>item.number===number)){ toast('Add quotation items','Add at least one line item before printing.','err'); return; }
  let url;
  try{
    const q=quotationForShare(number);
    const blob=await generateQuotationPdfBlob(q);
    url=URL.createObjectURL(blob);
    const win=window.open(url,'_blank','noopener');
    if(!win){ const a=document.createElement('a'); a.href=url; a.download=`${q.number.replace(/\//g,'-')}.pdf`; document.body.appendChild(a); a.click(); a.remove(); toast('Quotation PDF ready','Pop-up blocked — the A4 PDF was downloaded instead.','info'); }
    else toast('Quotation PDF ready','Opened in a new tab — use its Print / Save controls.','ok');
    logAudit('Export','Quotations',`${q.number} generated as A4 PDF`);
  }catch(error){ toast('Could not generate PDF', error.message||'Please try again.','err'); }
  finally{ if(url) setTimeout(()=>URL.revokeObjectURL(url),60000); }
}
function quotationForShare(number){ return savedQuotations.find(item=>item.number===number)||{number,customer:document.getElementById('qCustomer')?.value||'Customer',kindAttention:document.getElementById('qKindAttention')?.value.trim()||'',representative:currentQuotationRepresentative(),categoryHeading:quotationCategoryHeading(),date:localDateISO(),items:quoteLines.map(x=>({...x})),lines:quoteLines.length,discount:quoteDiscountPct,total:calculateQuoteTotals().total,terms:quoteTermsText}; }
function formalQuotationMessage(q){const rep=q.representative||currentQuotationRepresentative();return `Dear ${q.kindAttention||q.customer},\n\nGreetings from ${DB.brand.company}.\n\nPlease find attached our ${quotationCategoryHeading()} bearing quotation number ${q.number}, submitted for your kind review and consideration. The quotation includes the proposed scope of services, applicable rates, taxes, and commercial terms.\n\nShould you require any clarification or modification, please feel free to contact ${rep.name} at ${rep.phone}. We will be pleased to assist you.\n\nWe look forward to the opportunity of working with you and establishing a successful professional association.\n\nThank you.\n\nWarm regards,\n${rep.name}\nPTH Representative\n${rep.phone}${rep.email?`\n${rep.email}`:''}\n${DB.brand.company}`; }
function pdfSafeText(value){ return String(value??'').normalize('NFKD').replace(/[^\x20-\x7E]/g,ch=>ch==='₹'?'Rs. ':ch==='–'||ch==='—'?'-':''); }
function wrapPdfLine(text,max=92){ const words=pdfSafeText(text).split(/\s+/),lines=[]; let line=''; words.forEach(word=>{if((line+' '+word).trim().length>max){if(line)lines.push(line);line=word;}else line=(line+' '+word).trim();}); if(line)lines.push(line); return lines; }
async function embedQuotationImage(pdfDoc,source){if(!source)return null;const bytes=await fetch(source).then(r=>{if(!r.ok)throw new Error(`Unable to load quotation artwork: ${source}`);return r.arrayBuffer();});const type=String(source).split(/[?#]/)[0].toLowerCase();return type.endsWith('.jpg')||type.endsWith('.jpeg')?pdfDoc.embedJpg(bytes):pdfDoc.embedPng(bytes);}
async function generateQuotationPdfBlob(q){
  if(!window.PDFLib)throw new Error('PDF generator is unavailable. Refresh the CRM and try again.');
  const {PDFDocument,StandardFonts,rgb}=window.PDFLib;
  const pdfDoc=await PDFDocument.create();
  const font=await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold=await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const [letterhead,letterFooter]=await Promise.all([embedQuotationImage(pdfDoc,PTH_QUOTATION_HEADER_PRINT),embedQuotationImage(pdfDoc,PTH_QUOTATION_FOOTER_PRINT)]);
  const items=q.items?.length?q.items:(q.number===document.getElementById('qNumber')?.value?quoteLines:[]);
  const rep=q.representative||currentQuotationRepresentative();
  // Per-line discount %. Older quotations store one overall q.discount and items without `disc`;
  // fall back to that so legacy records still render their discount.
  const legacyPct=Number(q.discount)||0;
  const discPctOf=it=>{const d=(it&&it.disc!=null)?Number(it.disc):legacyPct;return Number.isFinite(d)?Math.min(100,Math.max(0,d)):0;};
  const hasDiscount=items.some(it=>!it.onReq&&discPctOf(it)>0);

  // ---- palette (accent derived from the selected quotation layout) ----
  const hex=(h,fallback)=>{const m=/^#?([0-9a-f]{6})$/i.exec(String(h||''));if(!m)return fallback;const n=parseInt(m[1],16);return rgb(((n>>16)&255)/255,((n>>8)&255)/255,(n&255)/255);};
  const accent=hex(quotationLayout.accent,rgb(.09,.20,.30));
  const ink=rgb(.12,.13,.14), soft=rgb(.42,.45,.49), lineColor=rgb(.76,.79,.82), zebra=rgb(.972,.976,.982), white=rgb(1,1,1);

  // ---- A4 geometry: header/footer heights computed from actual image aspect ----
  const pageW=595.28,pageH=841.89,M=34,contentW=pageW-2*M;
  const headerH=letterhead?pageW*letterhead.height/letterhead.width:92;
  const footerH=letterFooter?pageW*letterFooter.height/letterFooter.width:30;
  const topY=pageH-headerH-16;           // first baseline below the letterhead
  const bottomLimit=footerH+28;          // content never crosses into the footer band

  const safe=t=>pdfSafeText(t);
  const wOf=(t,s,f=font)=>f.widthOfTextAtSize(safe(t),s);
  const wrap=(t,width,s,f=font)=>{const words=safe(t).split(/\s+/).filter(Boolean);const out=[];let ln='';words.forEach(w=>{const test=ln?ln+' '+w:w;if(wOf(test,s,f)>width&&ln){out.push(ln);ln=w;}else ln=test;});if(ln)out.push(ln);return out.length?out:[''];};
  const rupees=n=>'Rs. '+Math.round(n).toLocaleString('en-IN');
  let page,y,pageNo=0;

  const startPage=()=>{
    page=pdfDoc.addPage([pageW,pageH]);pageNo++;
    if(letterhead)page.drawImage(letterhead,{x:0,y:pageH-headerH,width:pageW,height:headerH});
    if(letterFooter)page.drawImage(letterFooter,{x:0,y:0,width:pageW,height:footerH});
    y=topY;
    page.drawText('QUOTATION',{x:M,y,size:15,font:bold,color:accent});
    if(pageNo>1)page.drawText('(continued)',{x:M+wOf('QUOTATION',15,bold)+8,y:y+1,size:9,font,color:soft});
    page.drawText(safe(q.number),{x:pageW-M-wOf(q.number,10,bold),y:y+2,size:10,font:bold,color:ink});
    y-=9;
    page.drawLine({start:{x:M,y},end:{x:pageW-M,y},thickness:1.2,color:accent});
    y-=18;
  };
  const newPageIf=h=>{if(y-h<bottomLimit)startPage();};

  startPage();

  // ---- meta block (first page only) ----
  const leftPairs=[['Client Name',q.customer],['Date',formatFollowupDate(q.date||localDateISO())],['Representative',rep.name]];
  const rightPairs=[['Kind Attention',q.kindAttention||'-'],['Contact',rep.phone||'-']];
  const rowsN=Math.max(leftPairs.length,rightPairs.length), mRow=15, boxH=rowsN*mRow+12, half=contentW/2;
  page.drawRectangle({x:M,y:y-boxH,width:contentW,height:boxH,borderColor:lineColor,borderWidth:.7,color:rgb(.986,.99,1)});
  const drawPairs=(pairs,ox)=>{let ry=y-16;pairs.forEach(([l,v])=>{page.drawText(l+':',{x:ox,y:ry,size:8,font:bold,color:soft});const lw=wOf(l+':',8,bold);page.drawText(safe(wrap(v,half-lw-22,8.3)[0]),{x:ox+lw+6,y:ry,size:8.3,font,color:ink});ry-=mRow;});};
  drawPairs(leftPairs,M+10);drawPairs(rightPairs,M+half+6);
  y-=boxH+14;
  wrap('Sub: '+quotationCategoryHeading(),contentW,9.5,bold).forEach(l=>{page.drawText(safe(l),{x:M,y,size:9.5,font:bold,color:ink});y-=13;});
  y-=6;

  // ---- table columns (Description flexes to fill the page width) ----
  const cols=hasDiscount
    ?[{k:'sr',t:'Sr.',w:28,a:'center'},{k:'desc',t:'Description (Category and Service)',w:0,a:'left'},{k:'qty',t:'Qty',w:38,a:'center'},{k:'unit',t:'Unit',w:52,a:'center'},{k:'rate',t:'Rate',w:74,a:'right'},{k:'disc',t:'Discount',w:74,a:'right'},{k:'amt',t:'Amount',w:80,a:'right'}]
    :[{k:'sr',t:'Sr.',w:30,a:'center'},{k:'desc',t:'Description (Category and Service)',w:0,a:'left'},{k:'qty',t:'Qty',w:44,a:'center'},{k:'unit',t:'Unit',w:62,a:'center'},{k:'rate',t:'Rate',w:86,a:'right'},{k:'amt',t:'Amount',w:92,a:'right'}];
  cols.find(c=>c.k==='desc').w=contentW-cols.reduce((s,c)=>s+c.w,0);
  const colX=[];{let x=M;cols.forEach(c=>{colX.push(x);x+=c.w;});}
  const descW=cols.find(c=>c.k==='desc').w;

  const drawTableHeader=()=>{
    const h=20;
    page.drawRectangle({x:M,y:y-h,width:contentW,height:h,color:accent});
    cols.forEach((c,i)=>{const tx=c.a==='right'?colX[i]+c.w-6-wOf(c.t,8,bold):c.a==='center'?colX[i]+(c.w-wOf(c.t,8,bold))/2:colX[i]+6;page.drawText(safe(c.t),{x:tx,y:y-13.5,size:8,font:bold,color:white});});
    y-=h;
  };
  drawTableHeader();

  if(!items.length){
    page.drawRectangle({x:M,y:y-26,width:contentW,height:26,borderColor:lineColor,borderWidth:.5});
    page.drawText('No line items captured for this quotation.',{x:M+8,y:y-16,size:8.5,font,color:soft});
    y-=26;
  }

  items.forEach((item,index)=>{
    const qty=Number(item.qty||1),unit=item.unit||'Sample',dp=discPctOf(item);
    const gross=item.onReq?0:qty*Number(item.rate||0),lineDisc=Math.round(gross*dp/100),amount=gross-lineDisc;
    const nameLines=wrap(item.name||'Service',descW-12,8.2,bold);
    const metaBits=[item.category,item.code?('Ref: '+item.code):'',item.parameters?.length?('Parameters: '+item.parameters.join('; ')):''].filter(Boolean).join('   |   ');
    const metaLines=metaBits?wrap(metaBits,descW-12,7,font):[];
    const rowH=Math.max(24,8+nameLines.length*10+(metaLines.length?metaLines.length*8.4+2:0)+4);
    if(y-rowH<bottomLimit){startPage();drawTableHeader();}
    const top=y;
    if(index%2===1)page.drawRectangle({x:M,y:top-rowH,width:contentW,height:rowH,color:zebra});
    cols.forEach((c,i)=>{
      page.drawRectangle({x:colX[i],y:top-rowH,width:c.w,height:rowH,borderColor:lineColor,borderWidth:.5});
      if(c.k==='desc'){
        let ty=top-13;
        nameLines.forEach(l=>{page.drawText(safe(l),{x:colX[i]+6,y:ty,size:8.2,font:bold,color:ink});ty-=10;});
        if(metaLines.length)ty-=2;
        metaLines.forEach(l=>{page.drawText(safe(l),{x:colX[i]+6,y:ty,size:7,font,color:soft});ty-=8.4;});
        return;
      }
      let val='';
      if(c.k==='sr')val=String(index+1);
      else if(c.k==='qty')val=String(qty);
      else if(c.k==='unit')val=unit;
      else if(c.k==='rate')val=item.onReq?'On request':rupees(item.rate||0);
      else if(c.k==='disc')val=lineDisc?rupees(lineDisc)+` (${dp}%)`:'-';
      else if(c.k==='amt')val=item.onReq?'-':rupees(amount);
      const s=7.8, tw=wOf(val,s,font), tx=c.a==='right'?colX[i]+c.w-6-tw:c.a==='center'?colX[i]+(c.w-tw)/2:colX[i]+6;
      page.drawText(safe(val),{x:tx,y:top-rowH/2-s/2+1.5,size:s,font,color:ink});
    });
    y-=rowH;
  });

  // ---- totals box (right aligned) ----
  const gSum=items.reduce((s,it)=>s+(it.onReq?0:Number(it.qty||1)*Number(it.rate||0)),0);
  const dSum=items.reduce((s,it)=>s+(it.onReq?0:Math.round(Number(it.qty||1)*Number(it.rate||0)*discPctOf(it)/100)),0);
  const taxable=gSum-dSum, gst=Math.round(taxable*.18), grand=taxable+gst;
  const tRows=[['Subtotal (excl. GST)',gSum],...(hasDiscount?[['Discount',-dSum],['Taxable Value',taxable]]:[]),['GST @ 18% (extra)',gst],['Grand Total (incl. GST)',grand]];
  const boxW=248, boxX=pageW-M-boxW, rowH=16, tH=tRows.length*rowH+8;
  newPageIf(tH+10);
  y-=10;
  page.drawRectangle({x:boxX,y:y-tH,width:boxW,height:tH,borderColor:lineColor,borderWidth:.7});
  let ry=y-15;
  tRows.forEach((r,i)=>{
    const strong=i===tRows.length-1;
    if(strong)page.drawRectangle({x:boxX,y:ry-4.5,width:boxW,height:rowH,color:accent});
    const col=strong?white:ink, s=strong?9.2:8.3, f=strong?bold:font, val=(r[1]<0?'- ':'')+rupees(Math.abs(r[1]));
    page.drawText(safe(r[0]),{x:boxX+9,y:ry,size:s,font:f,color:col});
    page.drawText(safe(val),{x:boxX+boxW-9-wOf(val,s,f),y:ry,size:s,font:f,color:col});
    ry-=rowH;
  });
  y-=tH+18;

  // ---- terms ----
  newPageIf(34);
  page.drawText('TERMS & CONDITIONS',{x:M,y,size:10,font:bold,color:accent});y-=7;
  page.drawLine({start:{x:M,y},end:{x:M+152,y},thickness:.9,color:accent});y-=14;
  String(q.terms||quoteTermsText||'As per mutually agreed commercial terms.').split('\n').map(t=>t.trim()).filter(Boolean).forEach(term=>{
    const lines=wrap(term,contentW,8);newPageIf(lines.length*10+3);
    lines.forEach(l=>{page.drawText(safe(l),{x:M,y,size:8,font,color:ink});y-=10;});y-=2;
  });

  // ---- signature block ----
  newPageIf(58);
  y-=14;
  const forLine='For '+DB.brand.legal;
  page.drawText(safe(forLine),{x:pageW-M-wOf(forLine,9,bold),y,size:9,font:bold,color:ink});
  page.drawText('Prepared by: '+safe(rep.name),{x:M,y,size:8.3,font,color:ink});
  if(rep.phone)page.drawText(safe(rep.phone),{x:M,y:y-12,size:8.3,font,color:soft});
  y-=42;
  page.drawText('Authorised Signatory',{x:pageW-M-wOf('Authorised Signatory',8.5,font),y,size:8.5,font,color:soft});

  // ---- page numbers (above footer band, after all pages exist) ----
  const pages=pdfDoc.getPages(),tot=pages.length;
  pages.forEach((p,i)=>{const label=`Page ${i+1} of ${tot}`,lw=font.widthOfTextAtSize(label,7.5);p.drawText(label,{x:(pageW-lw)/2,y:footerH+10,size:7.5,font,color:soft});});

  const bytes=await pdfDoc.save();
  return new Blob([bytes],{type:'application/pdf'});
}
async function downloadQuotationPdf(q,blob){const pdfBlob=blob||await generateQuotationPdfBlob(q),link=document.createElement('a');link.href=URL.createObjectURL(pdfBlob);link.download=`${q.number.replace(/\//g,'-')}.pdf`;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1500);return link.download;}
async function shareQuotationPdf(number,channel){ const q=quotationForShare(number),blob=await generateQuotationPdfBlob(q),filename=`${q.number.replace(/\//g,'-')}.pdf`,file=new File([blob],filename,{type:'application/pdf'}),message=formalQuotationMessage(q); try{if(navigator.canShare?.({files:[file]})){await navigator.share({title:`Quotation ${q.number}`,text:message,files:[file]});closeModal();toast('Quotation shared',`${filename} attached successfully`);logAudit('Share','Quotations',`${q.number} shared with PDF`);return;}}catch(error){if(error.name==='AbortError')return;} await downloadQuotationPdf(q,blob); toast('PDF downloaded',`Attach ${filename} in the prepared ${channel==='email'?'email':'WhatsApp message'}.`,'info'); if(channel==='email')emailQuotation(number,message);else whatsappQuotation(number,message); }
function openQuotationSend(number,fromBuilder=false){ const q=quotationForShare(number); openModal(`<div class="modal-head"><div class="modal-title">Share PDF Quotation</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div><div class="modal-body"><div class="kv"><span class="k">Quotation</span><span class="v tnum">${esc(q.number)}</span></div><div class="kv"><span class="k">Client</span><span class="v">${esc(q.customer)}</span></div><div class="field" style="margin-top:14px"><label>Email address</label><input class="input" id="quoteSendEmail" type="email" placeholder="customer@example.com"></div><div class="field"><label>WhatsApp number with country code</label><input class="input" id="quoteSendPhone" placeholder="919876543210"></div><div class="quotation-message-preview"><strong>Formal submission message</strong><div>${esc(formalQuotationMessage(q)).replace(/\n/g,'<br>')}</div></div><div class="page-desc" style="margin-top:10px">On supported devices, Email/WhatsApp uses secure file sharing with the PDF attached. Otherwise the PDF downloads first and a prepared message opens for manual attachment.</div></div><div class="modal-foot" style="flex-wrap:wrap"><button class="btn btn-ghost" onclick="downloadQuotationPdf(quotationForShare('${esc(q.number)}'))">${I.export}Download PDF</button><button class="btn btn-ghost" onclick="shareQuotationPdf('${esc(q.number)}','email')">${I.enquiry}Email with PDF</button><button class="btn btn-primary" onclick="shareQuotationPdf('${esc(q.number)}','whatsapp')">WhatsApp with PDF</button></div>`); }
function gmailComposeUrl(email,subject,message){const params=new URLSearchParams({view:'cm',fs:'1',to:email,su:subject,body:message});return `https://mail.google.com/mail/?${params.toString()}`;}
function emailQuotation(number,message=formalQuotationMessage(quotationForShare(number))){ const q=quotationForShare(number),email=document.getElementById('quoteSendEmail')?.value.trim()||''; if(!email){toast('Email required','Enter the recipient email address.','err');return;} const subject=`Submission of Quotation ${q.number} - ${DB.brand.company}`;window.open(gmailComposeUrl(email,subject,message),'_blank','noopener');toast('Gmail opened','Attach the downloaded quotation PDF, review the message, and click Send.','info'); }
function whatsappQuotation(number,message=formalQuotationMessage(quotationForShare(number))){ const phone=(document.getElementById('quoteSendPhone')?.value||'').replace(/\D/g,''); if(phone.length<10){toast('Valid WhatsApp number required','Enter number with country code.','err');return;} window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`,'_blank','noopener'); }
function quoteFillTests() {
  const SOR = window.SOR || [];
  const catId = +document.getElementById('qCat').value;
  const cat = SOR.find(c => c.id === catId);
  const sel = document.getElementById('qTest');
  const combos = cat ? quoteComboOptions(cat) : [];
  sel.innerHTML = cat ? `${combos.map((combo,i)=>`<option value="combo:${i}">FULL COMBO: ${esc(combo.label)} — ₹${combo.rate.toLocaleString('en-IN')} (${combo.tests.length} parameters)</option>`).join('')}${cat.tests.map((t,i)=>`<option value="test:${i}">${esc(t.name)} — ${esc(sorRateText(t))}</option>`).join('')}` : '';
}
function quoteAddLine() {
  const SOR = window.SOR || [];
  const cat = SOR.find(c => c.id === +document.getElementById('qCat').value);
  const selection = document.getElementById('qTest').value;
  const [kind,index] = selection.split(':');
  let t, parameters = [];
  if (kind === 'combo') {
    const combo = quoteComboOptions(cat)[+index];
    parameters = combo.tests.map(test => test.name);
    t = { name:`Full Combo Test — ${combo.label}`, code:combo.code, rate:combo.rate, rateText:String(combo.rate) };
  } else t = cat.tests[+index];
  quoteLines.push({ category:cat.name, name:t.name, parameters, code:t.code, qty:1, unit:'Sample', rate:t.rate!=null?t.rate:0, sorRate:t.rate!=null?t.rate:null, rateText:t.rateText, onReq:t.rate==null, disc:t.rate!=null?quoteDiscountPct:0 });
  renderQuoteLines();
  updateQuotationHeading();
  toast('Line added', `${t.name} · ${sorRateText(t)} excl. GST`, 'info');
}
function openCustomQuoteLine() {
  openModal(`<div class="modal-head"><div class="modal-title">Add Custom Service (Out of SOR)</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div><div class="modal-body"><div class="field"><label>Custom category</label><input class="input" id="qcCategory" value="Additional Services"></div><div class="field"><label>Service description <span class="req">*</span></label><input class="input" id="qcName" placeholder="e.g. Special site visit and engineering assessment"></div><div class="form-grid"><div class="field"><label>Reference / specification</label><input class="input" id="qcCode" placeholder="Client specification"></div><div class="field"><label>Quantity</label><input class="input" id="qcQty" type="number" min="1" value="1"></div></div><div class="field"><label>Rate excluding GST <span style="font-weight:400;color:var(--text-muted)">— leave blank for On request</span></label><input class="input" id="qcRate" type="number" min="0" placeholder="₹"></div></div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="addCustomQuoteLine()">${I.plus}Add Service</button></div>`);
}
function addCustomQuoteLine() {
  const name = document.getElementById('qcName').value.trim();
  if (!name) { toast('Service description required', 'Enter the out-of-SOR service name.', 'err'); return; }
  const rate = Math.max(0,+document.getElementById('qcRate').value||0), onReq = !rate;
  quoteLines.push({ category:document.getElementById('qcCategory').value.trim()||'Additional Services', name, parameters:[], code:document.getElementById('qcCode').value.trim(), qty:Math.max(1,+document.getElementById('qcQty').value||1), unit:'Sample', rate, rateText:onReq?'On request':String(rate), onReq, disc:onReq?0:quoteDiscountPct, custom:true });
  closeModal(); renderQuoteLines(); updateQuotationHeading(); toast('Custom service added', `${name} · Out of SOR`, 'info');
}
function quoteAddFullSOR() {
  const SOR = window.SOR || [];
  const total = SOR.reduce((a, c) => a + (c.tests ? c.tests.length : 0), 0);
  if (!total) { toast('SOR unavailable', 'No Schedule of Rates tests are loaded.', 'err'); return; }
  openModal(`<div class="modal-head"><div class="modal-title">Add Full Schedule of Rates</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body"><p>Add <b>${total} tests</b> from <b>${SOR.length} categories</b> to this quotation, each with quantity <b>1</b>.</p><p class="page-desc" style="margin-top:8px">Existing line items are kept and any duplicates are skipped. Rates are auto-filled from the SOR; you can edit quantity, rate and discount per line afterwards.</p></div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="closeModal();confirmAddFullSOR()">${I.plus}Add All ${total} Tests</button></div>`);
}
function confirmAddFullSOR() {
  const SOR = window.SOR || [];
  const kk = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const lineKey = l => `${kk(l.category)}|${kk(l.name)}|${kk(l.code)}`;
  const existing = new Set(quoteLines.map(lineKey));
  let added = 0;
  SOR.forEach(cat => (cat.tests || []).forEach(t => {
    const line = { category: cat.name, name: t.name, parameters: [], code: t.code, qty: 1, unit: 'Sample', rate: t.rate != null ? t.rate : 0, rateText: t.rateText, onReq: t.rate == null, disc: t.rate != null ? quoteDiscountPct : 0 };
    const key = lineKey(line);
    if (existing.has(key)) return;
    existing.add(key); quoteLines.push(line); added += 1;
  }));
  renderQuoteLines(); updateQuotationHeading();
  toast(added ? 'Full SOR added' : 'Nothing to add', added ? `${added} test${added === 1 ? '' : 's'} added with quantity 1` : 'All SOR tests are already in the quotation.', added ? 'ok' : 'info');
  if (added) logAudit('Create', 'Quotations', `Full SOR added to quotation (${added} tests)`);
}
function setQuoteDiscount(value) { quoteDiscountPct = Math.min(100,Math.max(0,+value||0)); quoteLines.forEach(l => { if (!l.onReq) l.disc = quoteDiscountPct; }); renderQuoteLines(); }
function quoteSetLineRate(i, value) {
  const l = quoteLines[i]; if (!l) return;
  const v = Math.max(0, +value || 0);
  if (v > 0) { l.rate = v; l.rateText = String(v); l.onReq = false; }
  else { l.rate = 0; l.rateText = 'On request'; l.onReq = true; l.disc = 0; }
  renderQuoteLines();
}
function quoteSetLineDiscount(i, value) {
  const l = quoteLines[i]; if (!l) return;
  l.disc = Math.min(100, Math.max(0, +value || 0));
  renderQuoteLines();
}
function quoteApplyTermsTemplate(key) {
  quoteTermsKey = key in QUOTE_TERMS ? key : 'general'; quoteTermsText = QUOTE_TERMS[quoteTermsKey];
  const field=document.getElementById('qTermsText'); if(field) field.value=quoteTermsText;
  const terms=document.querySelector('.quote-terms-text'); if(terms) terms.innerHTML=esc(quoteTermsText).replace(/\n/g,'<br>');
  const label=document.querySelector('.quote-terms .card-sub'); if(label) label.textContent=quoteTermsKey.toUpperCase()+' template';
}
function updateQuoteTermsText(value) {
  quoteTermsText = value;
  const terms=document.querySelector('.quote-terms-text'); if(terms) terms.innerHTML=esc(quoteTermsText).replace(/\n/g,'<br>');
}
function calculateQuoteTotals() {
  const gross=quoteLines.reduce((a,l)=>a+(l.onReq?0:l.qty*l.rate),0);
  const discount=quoteLines.reduce((a,l)=>a+(l.onReq?0:Math.round(l.qty*l.rate*(l.disc||0)/100)),0);
  const net=gross-discount, gst=Math.round(net*.18);
  return { gross,discount,net,gst,total:net+gst };
}
function renderQuoteLines() {
  const body = document.getElementById('quoteBody'); if (!body) return;
  const head = document.getElementById('quoteHead');
  if (head) head.innerHTML = `<tr>
    <th style="width:46px">Sr. No.</th>
    <th>Description (Category and Service)</th>
    <th class="q-center" style="width:58px">Qty</th>
    <th class="q-center" style="width:84px">Unit</th>
    <th class="q-num" style="width:100px">Rate (₹)</th>
    <th class="q-num" style="width:96px">Discount %</th>
    <th class="q-num" style="width:104px">Amount</th>
    <th style="width:40px"></th>
  </tr>`;
  const inS = 'padding:5px 7px;border:1px solid var(--border);border-radius:8px;background:var(--surface-soft);font-size:13px';
  body.innerHTML = quoteLines.length ? quoteLines.map((l, i) => {
    const gross = l.onReq ? 0 : l.qty * l.rate;
    const disc = Math.round(gross * (l.disc || 0) / 100);
    const amount = gross - disc;
    return `
    <tr>
      <td class="tnum cell-dim">${i+1}</td>
      <td><div class="quote-description-category">${esc(l.category || 'Uncategorised')}</div><div class="cell-strong">${esc(l.name)}</div>${l.code?`<div class="quote-description-code">Reference: ${esc(l.code)}</div>`:''}${l.parameters?.length?`<div class="quote-params">(${l.parameters.map(esc).join('; ')})</div>`:''}${l.custom?'<div class="quote-custom-tag">Out of SOR</div>':''}</td>
      <td class="q-center"><input type="number" min="1" value="${l.qty}" onchange="quoteLines[${i}].qty=Math.max(1,+this.value||1);renderQuoteLines()" style="width:48px;${inS};text-align:center" class="tnum"></td>
      <td class="q-center"><input type="text" value="${esc(l.unit || 'Sample')}" onchange="quoteLines[${i}].unit=this.value.trim()||'Sample';renderQuoteLines()" style="width:74px;${inS};text-align:center"></td>
      <td class="q-num"><input type="number" min="0" step="1" value="${l.onReq ? '' : l.rate}" placeholder="On request" onchange="quoteSetLineRate(${i},this.value)" title="Enter a rate, or leave blank for On request" style="width:86px;${inS};text-align:right" class="tnum"></td>
      <td class="q-num"><input type="number" min="0" max="100" step="0.5" value="${l.disc || 0}" ${l.onReq ? 'disabled' : ''} onchange="quoteSetLineDiscount(${i},this.value)" title="Discount % for this line" style="width:60px;${inS};text-align:right;${l.onReq?'opacity:.5':''}" class="tnum"></td>
      <td class="tnum q-num cell-strong">${l.onReq ? '—' : '₹' + amount.toLocaleString('en-IN')}${disc>0?`<div class="quote-line-discount"><small>− ₹${disc.toLocaleString('en-IN')}</small></div>`:''}</td>
      <td><button class="mini-act" onclick="quoteLines.splice(${i},1);renderQuoteLines();updateQuotationHeading()" title="Remove">${I.x}</button></td>
    </tr>`;
  }).join('') : `<tr><td colspan="8"><div class="empty" style="padding:26px"><div class="empty-ico">${I.rate}</div><h4>No line items</h4><p>Pick a category and test above, then Add</p></div></td></tr>`;
  const {gross,discount,net,gst,total}=calculateQuoteTotals();
  document.getElementById('quoteTotals').innerHTML = `<div class="quote-totals"><div><div class="page-desc">Subtotal (excl. GST)</div><div class="tnum quote-total-val">₹${gross.toLocaleString('en-IN')}</div></div>${discount>0?`<div class="quote-discount"><div class="page-desc">Discount</div><div class="tnum quote-total-val">− ₹${discount.toLocaleString('en-IN')}</div></div><div><div class="page-desc">Taxable value</div><div class="tnum quote-total-val">₹${net.toLocaleString('en-IN')}</div></div>`:''}<div><div class="page-desc">GST 18% (extra)</div><div class="tnum quote-total-val">₹${gst.toLocaleString('en-IN')}</div></div><div><div class="page-desc">Grand Total (incl. GST)</div><div class="tnum quote-grand-total">₹${total.toLocaleString('en-IN')}</div></div></div>`;
}

/* ---------- SCHEDULE OF RATES (browsable catalog from PTH SOR) ---------- */
/* ---------- SCHEDULE OF RATES — master data store ---------- */
const SOR_KEY = 'pth_sor_v1';
// Snapshot the pristine SOR shipped in sor.js BEFORE applying any saved overrides, so Reset works.
window.SOR_DEFAULT = window.SOR_DEFAULT || JSON.parse(JSON.stringify(window.SOR || []));
(function loadSOR() { try { const s = JSON.parse(localStorage.getItem(SOR_KEY)); if (Array.isArray(s)) window.SOR = s; } catch (e) {} })();
function persistSOR() { try { localStorage.setItem(SOR_KEY, JSON.stringify(window.SOR || [])); } catch (e) {} }
function sorCat(id) { return (window.SOR || []).find(c => c.id === +id); }
function sorStats() {
  const S = window.SOR || [], tests = S.flatMap(c => c.tests || []);
  const priced = tests.filter(t => t.rate != null);
  const packages = S.reduce((a, c) => a + ((c.combos ? c.combos.length : 0) + (c.packageRate ? 1 : 0)), 0);
  const avg = priced.length ? Math.round(priced.reduce((a, t) => a + t.rate, 0) / priced.length) : 0;
  return { cats: S.length, tests: tests.length, priced: priced.length, onReq: tests.length - priced.length, packages, avg };
}
function refreshSOR() { const s = document.getElementById('sorSearch'); if (s && state.route === 'sor') VIEWS.sor(document.getElementById('canvas')); }
VIEWS.sor = function (c) {
  const SOR = window.SOR || [];
  const st = sorStats();
  const actions = `<button class="btn btn-ghost hide-sm" onclick="openDataImport('sor')">${I.upload}Import Excel</button><button class="btn btn-ghost hide-sm" onclick="exportSOR()">${I.export}Export</button><button class="btn btn-ghost" onclick="openSorCategoryModal()">${I.plus}Add Category</button><button class="btn btn-primary" onclick="startNewQuotation()">${I.quote}New Quotation</button>`;
  c.innerHTML = `${pageHead('Schedule of Rates', `${DB.brand.company} · FY ${window.SOR_META?.financialYear || '2026-27'} — master test rate list. All rates exclude GST; ${window.SOR_META?.gstRate || 18}% GST is added extra.`, actions)}
    <div class="stat-strip enter" style="margin-bottom:16px">
      <div class="stat-chip"><div class="sc-val tnum">${st.cats}</div><div class="sc-label">Categories</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${st.tests}</div><div class="sc-label">Total tests</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--primary-dark)">${st.priced}</div><div class="sc-label"><span class="dot" style="background:var(--primary-dark)"></span>Priced</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--text-muted)">${st.onReq}</div><div class="sc-label"><span class="dot" style="background:var(--text-muted)"></span>On request</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${st.packages}</div><div class="sc-label">Packages</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${inr(st.avg)}</div><div class="sc-label">Avg. rate</div></div>
    </div>
    <div class="filter-bar enter">
      <div class="filter-search">${I.search}<input placeholder="Search ${st.tests} tests by name, IS code or category..." id="sorSearch" value="${esc(sorSearchTerm)}" oninput="renderSOR(this.value)"></div>
      <select class="fdrop" id="sorCat" onchange="renderSOR(document.getElementById('sorSearch').value)" style="min-width:200px"><option value="">All categories</option>${SOR.map(cat => `<option value="${cat.id}" ${sorCatFilter == cat.id ? 'selected' : ''}>${cat.id}. ${esc(cat.name)}</option>`).join('')}</select>
      <button class="btn btn-ghost btn-sm hide-sm" onclick="resetSOR()" title="Restore the approved default rates">Reset to default</button>
    </div>
    <div id="sorCount" class="page-desc enter" style="margin:2px 2px 12px"></div>
    <div id="sorList" class="enter"></div>`;
  renderSOR(sorSearchTerm);
};
let sorSearchTerm = '';
let sorCatFilter = '';
function renderSOR(q) {
  const SOR = window.SOR || [];
  const list = document.getElementById('sorList'); if (!list) return;
  sorCatFilter = document.getElementById('sorCat')?.value || '';
  sorSearchTerm = q || '';
  const term = (q || '').toLowerCase();
  const cats = SOR.filter(cat => !sorCatFilter || cat.id === +sorCatFilter);
  let html = '', shownTests = 0, shownCats = 0;
  cats.forEach(cat => {
    const tests = (cat.tests || []).filter(t => !term || (t.name + ' ' + (t.code || '') + ' ' + (t.qty || '') + ' ' + cat.name).toLowerCase().includes(term));
    if (!tests.length) return;
    shownTests += tests.length; shownCats += 1;
    const packages = quoteComboOptions(cat);
    html += `<div class="card enter" style="margin-bottom:14px">
      <div class="card-pad card-head" style="gap:10px;flex-wrap:wrap"><span class="badge badge-neutral"><span class="dot" style="background:var(--brand)"></span>${cat.id}</span><h3 style="font-size:14.5px">${esc(cat.name)}</h3><span class="card-sub">${tests.length} test${tests.length === 1 ? '' : 's'}</span>
        <div class="row-actions" style="margin-left:auto">
          <button class="btn btn-ghost btn-sm" onclick="sorAddCategoryToQuote(${cat.id})" title="Add all tests to quotation">${I.quote}Add all</button>
          <button class="mini-act" onclick="openSorTestModal(${cat.id})" title="Add test">${I.plus}</button>
          <button class="mini-act" onclick="openSorCategoryModal(${cat.id})" title="Edit category">${I.edit}</button>
          <button class="mini-act" onclick="deleteSorCategory(${cat.id})" title="Delete category">${I.x}</button>
        </div>
      </div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th style="width:52px">Sr.</th><th>Name of Test</th><th>IS Code Reference</th><th>Sample Qty</th><th style="text-align:right">Rate (₹, excl. GST)</th><th style="width:118px"></th></tr></thead>
      <tbody>${tests.map((t, i) => { const idx = cat.tests.indexOf(t); return `<tr>
        <td class="cell-dim tnum">${i + 1}</td>
        <td class="cell-strong">${esc(t.name)}</td>
        <td class="cell-dim">${esc(t.code || '—')}</td>
        <td class="cell-dim">${esc(t.qty || '—')}</td>
        <td class="tnum cell-strong" style="text-align:right">${t.rate != null ? esc(sorRateText(t)) : `<span style="color:var(--text-muted);font-weight:500">${esc(t.rateText || 'On request')}</span>`}</td>
        <td onclick="event.stopPropagation()"><div class="row-actions"><button class="mini-act" onclick="sorAddTestToQuote(${cat.id},${idx})" title="Add to quotation">${I.plus}</button><button class="mini-act" onclick="openSorTestModal(${cat.id},${idx})" title="Edit">${I.edit}</button><button class="mini-act" onclick="deleteSorTest(${cat.id},${idx})" title="Delete">${I.x}</button></div></td>
      </tr>`; }).join('')}</tbody></table></div>
      ${packages.length ? `<div class="card-pad sor-combos">${packages.map((p, pi) => `<div class="sor-combo"><span class="sor-combo-icon">${I.info}</span><span><b>${esc(p.label)}</b> — ₹${p.rate.toLocaleString('en-IN')} · ${p.tests.length} tests</span><button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="sorAddComboToQuote(${cat.id},${pi})">${I.quote}Add package</button></div>`).join('')}</div>` : ''}
    </div>`;
  });
  list.innerHTML = html || `<div class="empty"><div class="empty-ico">${I.search}</div><h4>No tests found</h4><p>Try a different search or category</p></div>`;
  const count = document.getElementById('sorCount');
  if (count) count.textContent = html ? `Showing ${shownTests} test${shownTests === 1 ? '' : 's'} acros!== id);
  persistUsers();
  closeModal();
  VIEWS.users(document.getElementById('canvas'));
  toast('User deleted', `${u.name} removed`, 'info');
  logAudit('Delete', 'User Management', `User ${u.name} (${u.role}) permanently deleted`);
}

/* ---------- AUDIT TRAIL (activity log across all modules) ---------- */
const AUDIT_ACTION_TONE = { Login: 'info', Create: 'valid', Edit: 'renewal', 'Status Change': 'renewal', Approve: 'approved', Export: 'neutral', Delete: 'expired', Disable: 'expired', Enable: 'valid' };
VIEWS.audit = function (c) {
  const today = nowStamp().slice(0, 10);
  const todayCount = auditLog.filter(e => (e.ts || '').startsWith(today)).length;
  const modules = [...new Set(auditLog.map(e => e.module))];
  const actions = [...new Set(auditLog.map(e => e.action))];
  c.innerHTML = `${pageHead('Audit Trail', 'Immutable activity log of every create, edit, delete, approval and login across all modules.', `<button class="btn btn-ghost hide-sm" onclick="exportAudit()">${I.export}Export CSV</button>`)}
    <div class="stat-strip enter">
      <div class="stat-chip"><div class="sc-val tnum">${auditLog.length}</div><div class="sc-label">Total events</div></div>
      <div class="stat-chip"><div class="sc-val tnum" style="color:var(--primary-dark)">${todayCount}</div><div class="sc-label"><span class="dot" style="background:var(--primary-dark)"></span>Today</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${modules.length}</div><div class="sc-label"><span class="dot" style="background:var(--info)"></span>Modules</div></div>
      <div class="stat-chip"><div class="sc-val tnum">${new Set(auditLog.map(e => e.user)).size}</div><div class="sc-label"><span class="dot" style="background:var(--warning)"></span>Users</div></div>
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
  const rows = auditLog.filter(e =>
    (!fA || e.action === fA) && (!fM || e.module === fM) &&
    (!q || (e.user + e.action + e.module + e.detail).toLowerCase().includes(q)));
  body.innerHTML = rows.length ? rows.map(e => `
    <tr>
      <td class="cell-dim tnum" style="font-size:12px;white-space:nowrap">${formatAppDateTime(e.ts)}</td>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="avatar" style="width:26px;height:26px;font-size:10px">${(e.user || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()}</div><div><div class="cell-strong" style="font-size:12.5px">${esc(e.user)}</div><div class="cell-dim" style="font-size:10.5px">${esc(e.role || '')}</div></div></div></td>
      <td><span class="badge badge-${AUDIT_ACTION_TONE[e.action] || 'neutral'}"><span class="dot"></span>${esc(e.action)}</span></td>
      <td class="cell-dim">${esc(e.module)}</td>
      <td class="cell-dim">${esc(e.detail)}</td>
    </tr>`).join('') : `<tr><td colspan="5"><div class="empty" style="padding:30px"><div class="empty-ico">${I.shield}</div><h4>No matching events</h4><p>Adjust the filters or search</p></div></td></tr>`;
}
function exportAudit() {
  const rows = [['Timestamp', 'User', 'Role', 'Action', 'Module', 'Detail'], ...auditLog.map(e => [e.ts, e.user, e.role, e.action, e.module, e.detail])];
  downloadCSV(rows, 'PTH-CRM-audit-trail.csv');
  logAudit('Export', 'Audit Trail', `Exported ${auditLog.length} audit events to CSV`);
}

/* ---------- CSV download helper ---------- */
function downloadCSV(rows, filename) {
  const csv = rows.map(r => r.map(cell => { const s = String(cell == null ? '' : cell); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(',')).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  toast('Export ready', filename + ' downloaded', 'ok');
}

/* stubs for remaining nav that reuse simpler renders */
VIEWS.projects = VIEWS.enquiries;

function openEnquiryModal() {
  openModal(`
    <div class="modal-head"><div class="modal-title">New Enquiry</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <div class="field" id="e-cust"><label>Client Name <span class="req">*</span></label><input class="input" id="eCust" placeholder="Enter client name"><div class="field-err">${I.info}Please enter a customer</div></div>
      <div class="field"><label>Project</label><input class="input" id="eProj" placeholder="e.g. Port Expansion — Phase 2"></div>
      <div class="form-grid">
        <div class="field"><label>Service Category</label><select class="select" id="eCat"><option>Material Testing</option><option>Geotechnical</option><option>NDT</option><option>Calibration</option><option>Inspection</option></select></div>
        <div class="field"><label>Expected Value (₹)</label><input class="input tnum" id="eVal" type="number" min="0" placeholder="0"></div>
      </div>
      <div class="field"><label>Assigned To</label><select class="select" id="ePerson">${[...new Set([...DB.staff.map(s=>s.name), DB.user.name])].map(n=>`<option>${esc(n)}</option>`).join('')}</select></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="submitEnquiry()">${I.check}Create Enquiry</button></div>`);
}
function submitEnquiry() {
  const input = document.getElementById('eCust'), field = input.closest('.field');
  const cust = input.value.trim();
  if (!cust) { field.classList.add('show-err'); input.classList.add('shake'); setTimeout(() => input.classList.remove('shake'), 350); return; }
  const data={col:'new',cust,proj:document.getElementById('eProj').value.trim()||'New enquiry',cat:document.getElementById('eCat').value,val:Math.max(0,+document.getElementById('eVal').value||0),person:document.getElementById('ePerson').value,prob:STAGE_PROB.new,prio:'med'};
  const duplicates=crmDuplicateLeads(cust,data.proj);if(duplicates.length){crmPendingLeadData=data;openModal(`<div class="modal-head"><div class="modal-title">Possible Duplicate Enquiry</div><button class="icon-btn drawer-close" onclick="crmPendingLeadData=null;closeModal()">${I.x}</button></div><div class="modal-body"><p>${duplicates.length} similar existing record${duplicates.length===1?' was':'s were'} found.</p>${duplicates.map(x=>`<div class="kv"><span class="v"><b>${esc(x.id)} · ${esc(x.cust)}</b><small style="display:block">${esc(x.proj)}</small></span></div>`).join('')}</div><div class="modal-foot"><button class="btn btn-ghost" onclick="crmPendingLeadData=null;closeModal()">Cancel</button><button class="btn btn-primary" onclick="crmConfirmDuplicateLead()">Create Separate Enquiry</button></div>`);return;}
  const lead = { id: nextLeadId(), follow: '—',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),...data };
  DB.pipeline.leads.push(lead); persistPipeline();
  enquiryFilter={search:'',category:'all',stage:'all',owner:'all'};
  crmRunAutomation('lead_created',lead);crmRunAutomation('lead_saved',lead);
  closeModal(); toast('Enquiry created', `${cust} · added to pipeline (New)`);
  logAudit('Create', 'Enquiries', `Enquiry logged — ${cust} (${lead.id})`);
  if (state.route === 'pipeline') VIEWS.pipeline(document.getElementById('canvas'));
  else if (state.route === 'enquiries') VIEWS.enquiries(document.getElementById('canvas'));
  else if (state.route === 'overview') navigate('pipeline');
}

/* ============================================================
   ADVANCED ANALYTICS & REPORT CENTRE
   ============================================================ */
const ANALYTICS_REPORTS=[['executive','Executive Overview'],['leadscore','Lead Scoring & Health'],['forecast','Forecast & Targets'],['winloss','Win / Loss Intelligence'],['approvals','Commercial Approvals'],['automation','Workflow Automation'],['users','User Performance'],['departments','Department Performance'],['tests','Test-wise Analysis'],['parameters','Parameter-wise Analysis'],['funnel','Sales Funnel'],['quotations','Quotation Performance'],['followups','Follow-up Effectiveness'],['clients','Client Intelligence'],['owners','Owner Performance'],['tenders','Tender Intelligence'],['sor','SOR Rate Intelligence'],['compliance','Compliance Health']];
const ANALYTICS_PERIODS=[['daily','Daily'],['weekly','Weekly'],['monthly','Monthly'],['yearly','Yearly'],['lifetime','Lifetime'],['custom','Custom']];
let analyticsState={report:'executive',period:'yearly',from:'2026-01-01',to:localDateISO()};
const anPct=(a,b)=>b?Math.round(a/b*1000)/10:0;
const anFmt=(v,t)=>t==='inr'?inr(+v||0):t==='pct'?`${(+v||0).toLocaleString('en-IN',{maximumFractionDigits:1})}%`:t==='date'?(v?formatFollowupDate(String(v).slice(0,10)):'—'):typeof v==='number'?v.toLocaleString('en-IN',{maximumFractionDigits:2}):String(v??'—');
const anGroup=(list,fn)=>list.reduce((o,x)=>{const k=fn(x)||'Unspecified';(o[k]||=[]).push(x);return o;},{});
const anInRange=d=>!d||((!analyticsState.from||String(d).slice(0,10)>=analyticsState.from)&&(!analyticsState.to||String(d).slice(0,10)<=analyticsState.to));
function analyticsRecordInRange(x,fields){const d=fields.map(k=>x?.[k]).find(Boolean);return d?anInRange(d):analyticsState.period==='lifetime';}
function setAnalyticsPeriod(period){const now=new Date(),end=localDateISO(now);let start='';if(period==='daily')start=end;else if(period==='weekly'){const d=new Date(now),day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);start=localDateISO(d);}else if(period==='monthly')start=`${end.slice(0,7)}-01`;else if(period==='yearly')start=`${end.slice(0,4)}-01-01`;else if(period==='lifetime'){start='';}else{analyticsState.period='custom';refreshAnalyticsView();return;}analyticsState={...analyticsState,period,from:start,to:period==='lifetime'?'':end};refreshAnalyticsView();}
function analyticsPersonAliases(name){const u=(DB.users||[]).find(x=>x.name===name),parts=String(name).trim().split(/\s+/),initials=(u?.initials||parts.map(x=>x[0]).join('')).toUpperCase();return new Set([String(name).toLowerCase(),initials.toLowerCase(),parts.map(x=>x[0]).join('').toLowerCase()]);}
function analyticsUserReport(base){
  const periodLeads=(DB.pipeline.leads||[]).filter(x=>analyticsRecordInRange(x,['createdAt','updatedAt'])),quotes=savedQuotations.filter(x=>anInRange(x.date)),fus=followups.filter(x=>anInRange(x.due)),audits=auditLog.filter(x=>anInRange(x.ts));
  const names=[...new Set([...(DB.users||[]).map(x=>x.name),...periodLeads.map(x=>x.person),...fus.map(x=>x.assignee),...audits.map(x=>x.user)].filter(Boolean))];
  const rows=names.map(name=>{const aliases=analyticsPersonAliases(name),match=v=>aliases.has(String(v||'').toLowerCase()),ls=periodLeads.filter(x=>match(x.person)),fs=fus.filter(x=>match(x.assignee)),as=audits.filter(x=>match(x.user)),qs=quotes.filter(x=>match(x.representative?.name||x.createdBy)),open=ls.filter(x=>!['won','lost'].includes(x.col)),won=ls.filter(x=>x.col==='won'),done=fs.filter(x=>x.status==='completed'),late=fs.filter(x=>x.status!=='completed'&&followupTiming(x)==='overdue'),pipeline=open.reduce((s,x)=>s+(+x.val||0),0),weighted=open.reduce((s,x)=>s+(+x.val||0)*(+x.prob||0)/100,0),qv=qs.reduce((s,x)=>s+(+x.total||0),0),score=Math.min(100,Math.round(anPct(won.length,Math.max(1,ls.length))*.32+anPct(done.length,Math.max(1,fs.length))*.28+Math.min(100,as.length*8)*.2+Math.min(100,weighted/10000)*.2));const user=(DB.users||[]).find(x=>x.name===name);return[name,user?.role||'Opportunity Owner',ls.length,open.length,won.length,pipeline,weighted,qs.length,qv,fs.length,anPct(done.length,fs.length),late.length,as.length,score];}).sort((a,b)=>b[13]-a[13]||b[6]-a[6]);
  return{...base,kpis:[['People Reported',rows.length,'int'],['Activities',rows.reduce((s,x)=>s+x[12],0),'int'],['Assigned Opportunities',rows.reduce((s,x)=>s+x[2],0),'int'],['Weighted Forecast',rows.reduce((s,x)=>s+x[6],0),'inr'],['Follow-up Completion',anPct(rows.reduce((s,x)=>s+x[9]*x[10]/100,0),rows.reduce((s,x)=>s+x[9],0)),'pct'],['Average Performance',rows.length?rows.reduce((s,x)=>s+x[13],0)/rows.length:0,'pct']],columns:[['User','text'],['Role','text'],['Leads','int'],['Open','int'],['Won','int'],['Pipeline','inr'],['Weighted Forecast','inr'],['Quotes','int'],['Quote Value','inr'],['Follow-ups','int'],['Completion','pct'],['Overdue','int'],['System Activities','int'],['Performance Score','pct']],rows,insights:[`Top performer: ${rows[0]?.[0]||'No activity'} (${anFmt(rows[0]?.[13]||0,'pct')}).`,`${rows.filter(x=>x[11]>0).length} users have overdue follow-ups.`,`${rows.filter(x=>x[12]===0&&x[2]===0&&x[9]===0).length} users recorded no activity in this period.`],chart:13};
}
function analyticsDepartmentFor(module=''){const m=String(module).toLowerCase();if(/enquir|quotation|crm|follow|client/.test(m))return'CRM & Sales';if(/credential|certif|approval|compliance|audit/.test(m))return'Quality & Compliance';if(/test|sor|scope|technical|report/.test(m))return'Technical Operations';if(/tender|package/.test(m))return'Tendering';if(/user|auth|setting|admin/.test(m))return'Management & Administration';return'General Operations';}
function analyticsDepartmentReport(base){
  const audits=auditLog.filter(x=>anInRange(x.ts)),leads=(DB.pipeline.leads||[]).filter(x=>analyticsRecordInRange(x,['createdAt','updatedAt'])),quotes=savedQuotations.filter(x=>anInRange(x.date)),fus=followups.filter(x=>anInRange(x.due)),tenders=(DB.tenders||[]).filter(x=>analyticsRecordInRange(x,['createdAt','updatedAt','due'])),creds=(DB.credentials||[]).filter(x=>analyticsRecordInRange(x,['updatedAt','issue']));
  const departments=['CRM & Sales','Quality & Compliance','Technical Operations','Tendering','Management & Administration','General Operations'];
  const rows=departments.map(d=>{const acts=audits.filter(x=>analyticsDepartmentFor(x.module)===d),isCRM=d==='CRM & Sales',isTender=d==='Tendering',isQuality=d==='Quality & Compliance',isTechnical=d==='Technical Operations',l=isCRM?leads:[],q=isCRM?quotes:[],f=isCRM?fus:[],t=isTender?tenders:[],c=isQuality?creds:[],catalogue=isTechnical&&analyticsState.period==='lifetime'?(window.SOR||[]).flatMap(x=>x.tests||[]).length:0,records=l.length+q.length+f.length+t.length+c.length+catalogue,value=l.reduce((s,x)=>s+(+x.val||0),0)+q.reduce((s,x)=>s+(+x.total||0),0)+t.reduce((s,x)=>s+(+x.value||0),0),done=f.filter(x=>x.status==='completed').length,health=isCRM?Math.round((anPct(l.filter(x=>x.col==='won').length,Math.max(1,l.length))+anPct(done,Math.max(1,f.length)))/2):isTender?anPct(t.filter(x=>x.stage==='Won'||x.stage==='Submitted').length,Math.max(1,t.length)):isQuality?anPct(c.filter(x=>x.verified).length,Math.max(1,c.length)):Math.min(100,acts.length*10),score=Math.min(100,Math.round(health*.65+Math.min(100,acts.length*8)*.35));return[d,records,acts.length,l.length,q.length,f.length,t.length,c.length,value,health,score];}).sort((a,b)=>b[10]-a[10]||b[1]-a[1]);
  return{...base,kpis:[['Departments',rows.length,'int'],['Total Records',rows.reduce((s,x)=>s+x[1],0),'int'],['Recorded Activities',rows.reduce((s,x)=>s+x[2],0),'int'],['Business Value',rows.reduce((s,x)=>s+x[8],0),'inr'],['Average Health',rows.length?rows.reduce((s,x)=>s+x[9],0)/rows.length:0,'pct'],['Average Performance',rows.length?rows.reduce((s,x)=>s+x[10],0)/rows.length:0,'pct']],columns:[['Department','text'],['Records','int'],['Activities','int'],['Enquiries','int'],['Quotations','int'],['Follow-ups','int'],['Tenders','int'],['Credentials','int'],['Financial Value','inr'],['Operational Health','pct'],['Performance Score','pct']],rows,insights:[`Leading department: ${rows[0]?.[0]||'No activity'} (${anFmt(rows[0]?.[10]||0,'pct')}).`,`${rows.reduce((s,x)=>s+x[2],0)} system activities were recorded in this period.`,`CRM & Sales generated ${inr(rows.find(x=>x[0]==='CRM & Sales')?.[8]||0)} in tracked business value.`],chart:10};
}
const analyticsTestKey=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function analyticsQuotationLines(){return savedQuotations.filter(q=>anInRange(q.date)).flatMap(q=>(q.items||[]).map(item=>({q,item,gross:item.onReq?0:(+item.qty||0)*(+item.rate||0),discount:item.onReq?0:(+item.qty||0)*(+item.rate||0)*(+item.disc||0)/100})));}
function analyticsTestReport(base){
  const catalogue=new Map();(window.SOR||[]).forEach(cat=>(cat.tests||[]).forEach(t=>{const key=analyticsTestKey(t.name),r=catalogue.get(key)||{name:t.name,cats:new Set(),codes:new Set(),rates:[],occ:0,onReq:0};r.cats.add(cat.name);if(t.code)r.codes.add(t.code);r.occ++;if(t.rate==null)r.onReq++;else r.rates.push(+t.rate);catalogue.set(key,r);}));
  const commercial=new Map();analyticsQuotationLines().forEach(({q,item,gross,discount})=>{const key=analyticsTestKey(item.name),r=commercial.get(key)||{name:item.name,cats:new Set(),codes:new Set(),lines:0,qty:0,gross:0,discount:0,net:0,customers:new Set()};r.cats.add(item.category||'Uncategorised');if(item.code)r.codes.add(item.code);r.lines++;r.qty+=+item.qty||0;r.gross+=gross;r.discount+=discount;r.net+=gross-discount;r.customers.add(q.customer);commercial.set(key,r);});
  const keys=new Set([...catalogue.keys(),...commercial.keys()]),rows=[...keys].map(key=>{const c=catalogue.get(key),m=commercial.get(key),rates=c?.rates||[];return[c?.name||m?.name,[...(c?.cats||m?.cats||[])].join(' / '),[...(c?.codes||m?.codes||[])].join(' / '),c?.occ||0,c?anPct(rates.length,c.occ):0,rates.length?Math.min(...rates):0,rates.length?rates.reduce((s,x)=>s+x,0)/rates.length:0,rates.length?Math.max(...rates):0,m?.lines||0,m?.qty||0,m?.gross||0,m?.discount||0,m?.net||0,m?.customers.size||0];}).sort((a,b)=>b[12]-a[12]||b[8]-a[8]||a[0].localeCompare(b[0]));
  const quoted=rows.filter(x=>x[8]>0),gross=rows.reduce((s,x)=>s+x[10],0),discount=rows.reduce((s,x)=>s+x[11],0);return{...base,kpis:[['Unique Tests',rows.length,'int'],['Quoted Tests',quoted.length,'int'],['Unquoted Tests',rows.length-quoted.length,'int'],['Quoted Quantity',rows.reduce((s,x)=>s+x[9],0),'int'],['Net Test Value',rows.reduce((s,x)=>s+x[12],0),'inr'],['Average Discount',anPct(discount,gross),'pct']],columns:[['Test / Service','text'],['Category','text'],['Standard / Code','text'],['SOR Occurrences','int'],['Fixed-rate Coverage','pct'],['Minimum Rate','inr'],['Average Rate','inr'],['Maximum Rate','inr'],['Quoted Lines','int'],['Quoted Qty','int'],['Gross Value','inr'],['Discount','inr'],['Net Value','inr'],['Customers','int']],rows,insights:[`Most valuable quoted test: ${quoted[0]?.[0]||'No quoted tests'} (${inr(quoted[0]?.[12]||0)}).`,`${rows.filter(x=>x[4]===0).length} tests are entirely on-request or outside the priced SOR.`,`${rows.length-quoted.length} tests had no quotation demand in the selected period.`],chart:12};
}
function analyticsParameterReport(base){
  const catalogue=new Map();(window.SOR||[]).forEach(cat=>(cat.tests||[]).forEach(t=>{const key=analyticsTestKey(t.name),r=catalogue.get(key)||{name:t.name,cats:new Set(),codes:new Set(),occ:0,priced:0,parents:new Set()};r.cats.add(cat.name);if(t.code)r.codes.add(t.code);r.occ++;if(t.rate!=null)r.priced++;r.parents.add(cat.name);catalogue.set(key,r);}));
  const usage=new Map();analyticsQuotationLines().forEach(({q,item,gross,discount})=>{const params=item.parameters?.length?item.parameters:[item.name],share=Math.max(1,params.length);params.forEach(name=>{const key=analyticsTestKey(name),r=usage.get(key)||{name,parents:new Set(),cats:new Set(),direct:0,package:0,qty:0,value:0,customers:new Set()};r.parents.add(item.name);r.cats.add(item.category||'Uncategorised');if(item.parameters?.length)r.package++;else r.direct++;r.qty+=(+item.qty||0)/share;r.value+=(gross-discount)/share;r.customers.add(q.customer);usage.set(key,r);});});
  const keys=new Set([...catalogue.keys(),...usage.keys()]),rows=[...keys].map(key=>{const c=catalogue.get(key),u=usage.get(key);return[c?.name||u?.name,[...(u?.parents||c?.parents||[])].join(' / '),[...(c?.cats||u?.cats||[])].join(' / '),[...(c?.codes||[])].join(' / '),c?.occ||0,u?.direct||0,u?.package||0,(u?.direct||0)+(u?.package||0),u?.qty||0,c?anPct(c.priced,c.occ):0,u?.value||0,u?.customers.size||0];}).sort((a,b)=>b[10]-a[10]||b[7]-a[7]||a[0].localeCompare(b[0]));
  const used=rows.filter(x=>x[7]>0);return{...base,kpis:[['Unique Parameters',rows.length,'int'],['Used Parameters',used.length,'int'],['Direct Selections',rows.reduce((s,x)=>s+x[5],0),'int'],['Package Inclusions',rows.reduce((s,x)=>s+x[6],0),'int'],['Allocated Quantity',rows.reduce((s,x)=>s+x[8],0),'int'],['Allocated Value',rows.reduce((s,x)=>s+x[10],0),'inr']],columns:[['Parameter','text'],['Parent Test / Package','text'],['Category','text'],['Standard / Code','text'],['SOR Occurrences','int'],['Direct Quotes','int'],['Package Quotes','int'],['Total Usage','int'],['Allocated Qty','int'],['Rate Coverage','pct'],['Allocated Value','inr'],['Customers','int']],rows,insights:[`Highest-value parameter: ${used[0]?.[0]||'No used parameters'} (${inr(used[0]?.[10]||0)} allocated).`,`${rows.reduce((s,x)=>s+x[6],0)} parameter inclusions came through full-combo packages.`,`${rows.length-used.length} parameters had no quotation usage in the selected period.`],chart:10};
}
function analyticsReportData(id=analyticsState.report){
  const leads=DB.pipeline.leads||[],open=leads.filter(x=>!['won','lost'].includes(x.col)),won=leads.filter(x=>x.col==='won'),quotes=savedQuotations.filter(x=>anInRange(x.date)),fus=followups.filter(x=>anInRange(x.due)),td=DB.tenders||[],sor=window.SOR||[],openVal=open.reduce((s,x)=>s+(+x.val||0),0),weighted=open.reduce((s,x)=>s+(+x.val||0)*(+x.prob||0)/100,0);
  const base={id,title:ANALYTICS_REPORTS.find(x=>x[0]===id)?.[1]||'Report',kpis:[],columns:[],rows:[],insights:[],chart:1,generated:formatAppDateTime(new Date())};
  if(id==='users')return analyticsUserReport(base);
  if(id==='departments')return analyticsDepartmentReport(base);
  if(id==='tests')return analyticsTestReport(base);
  if(id==='parameters')return analyticsParameterReport(base);
  if(id==='leadscore'){const rows=leads.map(l=>{const s=crmLeadScore(l),h=crmDealHealth(l);return[l.id,l.cust,l.cat,s.score,s.band,h.level,h.age,l.person,l.val,l.val*(l.prob||0)/100,s.next];}).sort((a,b)=>b[3]-a[3]);return{...base,kpis:[['Hot Leads',rows.filter(x=>x[4]==='Hot').length,'int'],['Warm Leads',rows.filter(x=>x[4]==='Warm').length,'int'],['At Risk',rows.filter(x=>x[5]==='At Risk').length,'int'],['Healthy',rows.filter(x=>x[5]==='Healthy').length,'int'],['Avg. Score',rows.length?rows.reduce((s,x)=>s+x[3],0)/rows.length:0,'int']],columns:[['ID','text'],['Client','text'],['Category','text'],['Score','int'],['Band','text'],['Health','text'],['Inactive Days','int'],['Owner','text'],['Value','inr'],['Weighted','inr'],['Next Action','text']],rows,insights:[`${rows.filter(x=>x[4]==='Hot').length} hot opportunities should receive priority.`,`${rows.filter(x=>x[5]==='At Risk').length} opportunities require recovery action.`,`Average lead score is ${Math.round(rows.length?rows.reduce((s,x)=>s+x[3],0)/rows.length:0)}.`],chart:3};}
  if(id==='forecast'){const f=crmForecast(),g=anGroup(open,x=>x.person),rows=Object.entries(g).map(([name,a])=>[name,a.length,a.reduce((s,x)=>s+(+x.val||0),0),a.reduce((s,x)=>s+(+x.val||0)*(+x.prob||0)/100,0),a.filter(x=>(+x.prob||0)>=50).reduce((s,x)=>s+(+x.val||0),0),a.filter(x=>(+x.prob||0)>=75).reduce((s,x)=>s+(+x.val||0),0)]).sort((a,b)=>b[3]-a[3]);return{...base,kpis:[['Open Pipeline',openVal,'inr'],['Weighted',f.weighted,'inr'],['Best Case',f.best,'inr'],['Committed',f.commit,'inr'],['Won',f.won,'inr'],['Target Attainment',f.attainment,'pct']],columns:[['Owner','text'],['Open Deals','int'],['Open Value','inr'],['Weighted','inr'],['Best Case','inr'],['Committed','inr']],rows,insights:[`Committed forecast is ${inr(f.commit)}.`,`Weighted coverage is ${f.target?Math.round(f.weighted/f.target*100):0}% of target.`,`Forecast leader: ${rows[0]?.[0]||'None'}.`],chart:3};}
  if(id==='winloss'){const decided=leads.filter(x=>['won','lost'].includes(x.col)),g=anGroup(decided,x=>x.col==='won'?'Won':(x.lostReason?.reason||'Unspecified')),rows=Object.entries(g).map(([reason,a])=>[reason,a.length,a.reduce((s,x)=>s+(+x.val||0),0),anPct(a.length,decided.length)]).sort((a,b)=>b[1]-a[1]),wins=decided.filter(x=>x.col==='won');return{...base,kpis:[['Decided',decided.length,'int'],['Won',wins.length,'int'],['Lost',decided.length-wins.length,'int'],['Win Rate',anPct(wins.length,decided.length),'pct'],['Won Value',wins.reduce((s,x)=>s+(+x.po?.value||+x.val||0),0),'inr']],columns:[['Outcome / Reason','text'],['Opportunities','int'],['Value','inr'],['Share','pct']],rows,insights:[`Win rate is ${anPct(wins.length,decided.length)}%.`,`Primary loss reason: ${rows.find(x=>x[0]!=='Won')?.[0]||'No losses recorded'}.`,`Won portfolio value is ${inr(wins.reduce((s,x)=>s+(+x.po?.value||+x.val||0),0))}.`],chart:1};}
  if(id==='approvals'){const rows=crmIntel.approvals.map(a=>[a.id,a.quotation,a.customer,a.value,a.reasons.join('; '),a.status,a.requestedBy,a.requestedAt,a.decidedBy||'',a.decidedAt||'']);return{...base,kpis:[['Requests',rows.length,'int'],['Pending',rows.filter(x=>x[5]==='pending').length,'int'],['Approved',rows.filter(x=>x[5]==='approved').length,'int'],['Rejected',rows.filter(x=>x[5]==='rejected').length,'int'],['Controlled Value',rows.reduce((s,x)=>s+x[3],0),'inr']],columns:[['Approval ID','text'],['Quotation','text'],['Client','text'],['Value','inr'],['Triggers','text'],['Status','text'],['Requested By','text'],['Requested','date'],['Decided By','text'],['Decided','date']],rows,insights:[`${rows.filter(x=>x[5]==='pending').length} commercial approvals await decision.`,`${rows.filter(x=>x[5]==='approved').length} approved versions are locked.`,`${inr(rows.filter(x=>x[5]==='pending').reduce((s,x)=>s+x[3],0))} is pending control.`],chart:3};}
  if(id==='automation'){const rows=crmIntel.automationLog.map(x=>[x.ts,x.rule,x.record,x.detail,x.user]);return{...base,kpis:[['Automation Events',rows.length,'int'],['Active Rules',crmIntel.rules.filter(x=>x.enabled).length,'int'],['Paused Rules',crmIntel.rules.filter(x=>!x.enabled).length,'int'],['Active Cadences',crmIntel.enrollments.filter(x=>x.status==='active').length,'int']],columns:[['Timestamp','date'],['Rule','text'],['Record','text'],['Action','text'],['Actor','text']],rows,insights:[`${crmIntel.rules.filter(x=>x.enabled).length} workflow rules are active.`,`${crmIntel.enrollments.filter(x=>x.status==='active').length} sales cadences are active.`,`${rows.length} automated actions are fully traceable.`],chart:0};}
  if(id==='executive'){const qv=quotes.reduce((s,x)=>s+(+x.total||0),0),tv=td.reduce((s,x)=>s+(+x.value||0),0),tests=sor.flatMap(x=>x.tests||[]);return {...base,kpis:[['Open Pipeline',openVal,'inr'],['Weighted Forecast',weighted,'inr'],['Quotation Value',qv,'inr'],['Won Opportunities',won.length,'int'],['Overdue Follow-ups',fus.filter(x=>x.status!=='completed'&&followupTiming(x)==='overdue').length,'int'],['Tender Value',tv,'inr']],columns:[['Business Area','text'],['Records','int'],['Financial Value','inr'],['Health / Conversion','pct']],rows:[['Enquiries',leads.length,leads.reduce((s,x)=>s+(+x.val||0),0),anPct(won.length,leads.length)],['Quotations',quotes.length,qv,anPct(quotes.filter(x=>x.status==='won').length,quotes.length)],['Follow-ups',fus.length,0,anPct(fus.filter(x=>x.status==='completed').length,fus.length)],['Tenders',td.length,tv,anPct(td.filter(x=>x.stage==='Won').length,td.length)],['SOR Tests',tests.length,tests.filter(x=>x.rate!=null).reduce((s,x)=>s+x.rate,0),anPct(tests.filter(x=>x.rate!=null).length,tests.length)]],insights:[`${open.length} active opportunities represent ${inr(openVal)}.`,`Weighted forecast equals ${anPct(weighted,openVal)}% of open pipeline.`,`${fus.filter(x=>x.status!=='completed'&&followupTiming(x)==='overdue').length} overdue actions need attention.`],chart:2};}
  if(id==='funnel'){const g=anGroup(leads,x=>x.col),rows=DB.pipeline.columns.map(c=>{const a=g[c.id]||[];return[c.name,a.length,a.reduce((s,x)=>s+(+x.val||0),0),a.length?Math.round(a.reduce((s,x)=>s+(+x.prob||0),0)/a.length):0,a.reduce((s,x)=>s+(+x.val||0)*(+x.prob||0)/100,0)]});return{...base,kpis:[['Total Leads',leads.length,'int'],['Open Value',openVal,'inr'],['Weighted Value',weighted,'inr'],['Win Rate',anPct(won.length,leads.length),'pct']],columns:[['Stage','text'],['Leads','int'],['Value','inr'],['Avg. Probability','pct'],['Weighted Forecast','inr']],rows,insights:[`Largest stage: ${[...rows].sort((a,b)=>b[2]-a[2])[0]?.[0]||'None'}.`,`${open.filter(x=>x.prio==='high').length} high-priority opportunities remain open.`,`Overall win rate is ${anPct(won.length,leads.length)}%.`],chart:2};}
  if(id==='quotations'){const g=anGroup(quotes,x=>x.status),rows=Object.entries(g).map(([k,a])=>[k,a.length,a.reduce((s,x)=>s+(+x.total||0),0),a.length?a.reduce((s,x)=>s+(+x.total||0),0)/a.length:0,anPct(a.length,quotes.length)]).sort((a,b)=>b[2]-a[2]),value=quotes.reduce((s,x)=>s+(+x.total||0),0);return{...base,kpis:[['Quotations',quotes.length,'int'],['Total Value',value,'inr'],['Average Value',quotes.length?value/quotes.length:0,'inr'],['Won Rate',anPct(quotes.filter(x=>x.status==='won').length,quotes.length),'pct'],['Expired',quotes.filter(x=>quotationExpiryState(x)==='expired').length,'int']],columns:[['Status','text'],['Count','int'],['Value','inr'],['Average','inr'],['Share','pct']],rows,insights:[`${quotes.filter(x=>x.status==='submitted').length} submitted quotations await action.`,`${quotes.filter(x=>quotationExpiryState(x)==='expiring').length} quotations expire within seven days.`,`Won value: ${inr(quotes.filter(x=>x.status==='won').reduce((s,x)=>s+(+x.total||0),0))}.`],chart:2};}
  if(id==='followups'){const g=anGroup(fus,x=>x.channel),done=fus.filter(x=>x.status==='completed'),late=fus.filter(x=>x.status!=='completed'&&followupTiming(x)==='overdue'),rows=Object.entries(g).map(([k,a])=>[k,a.length,a.filter(x=>x.status==='completed').length,a.filter(x=>x.status!=='completed'&&followupTiming(x)==='overdue').length,anPct(a.filter(x=>x.status==='completed').length,a.length)]).sort((a,b)=>b[1]-a[1]);return{...base,kpis:[['Follow-ups',fus.length,'int'],['Completed',done.length,'int'],['Completion Rate',anPct(done.length,fus.length),'pct'],['Overdue',late.length,'int'],['High Priority Open',fus.filter(x=>x.priority==='high'&&x.status!=='completed').length,'int']],columns:[['Channel','text'],['Total','int'],['Completed','int'],['Overdue','int'],['Completion Rate','pct']],rows,insights:[`${late.length} follow-ups are overdue.`,`Most-used channel: ${rows[0]?.[0]||'None'}.`,`${fus.filter(x=>x.priority==='high'&&x.status!=='completed').length} high-priority actions remain.`],chart:1};}
  if(id==='clients'){const rows=allClients().map(c=>{const m=clientMetrics(c.name);return[c.name,c.cat||'General',m.leads,m.open,m.openValue,m.quotes,m.fus.filter(x=>x.status!=='completed').length,clientLastActivity(c.name)||''];}).sort((a,b)=>b[4]-a[4]);return{...base,kpis:[['Clients',rows.length,'int'],['Active Clients',rows.filter(x=>x[3]>0).length,'int'],['Pipeline Value',rows.reduce((s,x)=>s+x[4],0),'inr'],['Clients with Quotes',rows.filter(x=>x[5]>0).length,'int']],columns:[['Client','text'],['Industry','text'],['Leads','int'],['Open','int'],['Pipeline Value','inr'],['Quotes','int'],['Open Follow-ups','int'],['Last Activity','date']],rows,insights:[`Top client: ${rows[0]?.[0]||'None'} (${inr(rows[0]?.[4]||0)}).`,`${rows.filter(x=>x[3]===0).length} clients have no open opportunity.`,`${rows.filter(x=>x[6]>0).length} clients require follow-up.`],chart:4};}
  if(id==='owners'){const g=anGroup(leads,x=>x.person),rows=Object.entries(g).map(([k,a])=>[k,a.length,a.filter(x=>!['won','lost'].includes(x.col)).length,a.reduce((s,x)=>s+(+x.val||0),0),a.reduce((s,x)=>s+(+x.val||0)*(+x.prob||0)/100,0),a.filter(x=>x.col==='won').length,anPct(a.filter(x=>x.col==='won').length,a.length)]).sort((a,b)=>b[4]-a[4]);return{...base,kpis:[['Owners',rows.length,'int'],['Assigned Leads',leads.length,'int'],['Weighted Forecast',weighted,'inr'],['Average Win Rate',rows.length?rows.reduce((s,x)=>s+x[6],0)/rows.length:0,'pct']],columns:[['Owner','text'],['Assigned','int'],['Open','int'],['Total Value','inr'],['Weighted Forecast','inr'],['Won','int'],['Win Rate','pct']],rows,insights:[`Forecast leader: ${rows[0]?.[0]||'None'} (${inr(rows[0]?.[4]||0)}).`,`${rows.filter(x=>x[2]>3).length} owners manage more than three open opportunities.`,`Assignment coverage is ${anPct(leads.filter(x=>x.person).length,leads.length)}%.`],chart:4};}
  if(id==='tenders'){const g=anGroup(td,x=>x.stage),rows=Object.entries(g).map(([k,a])=>[k,a.length,a.reduce((s,x)=>s+(+x.value||0),0),a.length?Math.round(a.reduce((s,x)=>s+Math.max(0,Math.round(((x.docs-x.missing)/Math.max(1,x.docs))*100)),0)/a.length):0,a.filter(x=>tenderDays(x)<0&&!['Submitted','Won','Lost'].includes(x.stage)).length]).sort((a,b)=>b[2]-a[2]);return{...base,kpis:[['Tenders',td.length,'int'],['Bid Value',td.reduce((s,x)=>s+(+x.value||0),0),'inr'],['Package Ready',td.filter(x=>!x.missing).length,'int'],['Due in 7 Days',td.filter(x=>tenderDays(x)>=0&&tenderDays(x)<=7).length,'int'],['Overdue',td.filter(x=>tenderDays(x)<0&&!['Submitted','Won','Lost'].includes(x.stage)).length,'int']],columns:[['Stage','text'],['Count','int'],['Bid Value','inr'],['Avg. Readiness','pct'],['Overdue','int']],rows,insights:[`${td.filter(x=>x.missing>0).length} packages have missing documents.`,`Largest stage: ${rows[0]?.[0]||'None'}.`,`Tender win rate is ${anPct(td.filter(x=>x.stage==='Won').length,td.length)}%.`],chart:2};}
  if(id==='sor'){const rows=sor.map(c=>{const a=c.tests||[],p=a.filter(x=>x.rate!=null),rates=p.map(x=>x.rate);return[c.id,c.name,a.length,p.length,a.length-p.length,p.length?p.reduce((s,x)=>s+x.rate,0)/p.length:0,rates.length?Math.min(...rates):0,rates.length?Math.max(...rates):0,(c.combos?.length||0)+(c.packageRate?1:0)]}),tests=sor.flatMap(x=>x.tests||[]),priced=tests.filter(x=>x.rate!=null);return{...base,kpis:[['Categories',sor.length,'int'],['Tests',tests.length,'int'],['Priced',priced.length,'int'],['On Request',tests.length-priced.length,'int'],['Average Rate',priced.length?priced.reduce((s,x)=>s+x.rate,0)/priced.length:0,'inr']],columns:[['No.','int'],['Category','text'],['Tests','int'],['Priced','int'],['On Request','int'],['Average Rate','inr'],['Minimum','inr'],['Maximum','inr'],['Packages','int']],rows,insights:[`${anPct(priced.length,tests.length)}% of tests have fixed rates.`,`${[...rows].sort((a,b)=>b[2]-a[2])[0]?.[1]||'None'} has the largest catalogue.`,`${rows.reduce((s,x)=>s+x[8],0)} packages are configured.`],chart:2};}
  const cr=DB.credentials||[],g=anGroup(cr,x=>x.status),rows=Object.entries(g).map(([k,a])=>[k,a.length,a.filter(x=>x.days<0).length,a.filter(x=>x.days>=0&&x.days<=90).length,a.filter(x=>x.verified).length,anPct(a.filter(x=>x.verified).length,a.length)]);return{...base,kpis:[['Credentials',cr.length,'int'],['Verified',cr.filter(x=>x.verified).length,'int'],['Expired',cr.filter(x=>x.days<0).length,'int'],['Expiring ≤90 Days',cr.filter(x=>x.days>=0&&x.days<=90).length,'int'],['Verification Rate',anPct(cr.filter(x=>x.verified).length,cr.length),'pct']],columns:[['Status','text'],['Records','int'],['Expired','int'],['Expiring ≤90d','int'],['Verified','int'],['Verification Rate','pct']],rows,insights:[`${cr.filter(x=>x.days<0).length} expired records require action.`,`${cr.filter(x=>x.days>=0&&x.days<=30).length} expire within 30 days.`,`${cr.filter(x=>!x.verified).length} remain unverified.`],chart:1};
}
function refreshAnalyticsView(){renderAdvancedAnalytics();const c=document.getElementById('canvas');enhanceDateTimeInputs(c);normalizeVisibleDateTimes(c);}
function setAnalyticsReport(id){analyticsState.report=id;refreshAnalyticsView();}
function setAnalyticsDate(k,v){const next={...analyticsState,[k]:v,period:'custom'};if(next.from&&next.to&&next.from>next.to){toast('Invalid date range','From date must be before To date.','err');return;}analyticsState=next;refreshAnalyticsView();}
function analyticsPeriodLabel(){return analyticsState.period==='lifetime'?'Lifetime':`${analyticsState.from?formatAppDate(analyticsState.from):'Beginning'} to ${analyticsState.to?formatAppDate(analyticsState.to):'Today'}`;}
function renderAdvancedAnalytics(){const c=document.getElementById('canvas');if(!c)return;const r=analyticsReportData(),max=Math.max(1,...r.rows.map(x=>+x[r.chart]||0));c.innerHTML=`${pageHead('Analytics & Reports','User-wise and department-wise performance intelligence with daily, weekly, monthly, yearly and lifetime reporting.',`<button class="btn btn-ghost" onclick="analyticsExportCurrent()">${I.export}Export Current</button><button class="btn btn-ghost" onclick="analyticsExportAll()">${I.document}All Reports</button><button class="btn btn-primary" onclick="analyticsPrintReport()">${I.export}Print / PDF</button>`)}<div class="analytics-period-strip">${ANALYTICS_PERIODS.slice(0,5).map(x=>`<button class="${analyticsState.period===x[0]?'active':''}" onclick="setAnalyticsPeriod('${x[0]}')">${x[1]}</button>`).join('')}<span>${I.cal}${esc(analyticsPeriodLabel())}</span></div><div class="analytics-toolbar card"><div><label>Report</label><select class="select" onchange="setAnalyticsReport(this.value)">${ANALYTICS_REPORTS.map(x=>`<option value="${x[0]}" ${analyticsState.report===x[0]?'selected':''}>${x[1]}</option>`).join('')}</select></div><div><label>Period</label><select class="select" onchange="setAnalyticsPeriod(this.value)">${ANALYTICS_PERIODS.map(x=>`<option value="${x[0]}" ${analyticsState.period===x[0]?'selected':''}>${x[1]}</option>`).join('')}</select></div><div><label>From</label><input class="input" type="date" value="${analyticsState.from}" onchange="setAnalyticsDate('from',this.value)"></div><div><label>To</label><input class="input" type="date" value="${analyticsState.to}" onchange="setAnalyticsDate('to',this.value)"></div><div class="analytics-generated">Generated<br><b>${esc(r.generated)}</b></div></div><div class="analytics-report-tabs">${ANALYTICS_REPORTS.map(x=>`<button class="${analyticsState.report===x[0]?'active':''}" onclick="setAnalyticsReport('${x[0]}')">${x[1]}</button>`).join('')}</div><div class="grid dash-grid analytics-kpis">${r.kpis.map(x=>`<div class="col-4"><div class="card card-pad analytics-kpi"><span class="kpi-label">${esc(x[0])}</span><div class="kpi-val tnum">${esc(anFmt(x[1],x[2]))}</div></div></div>`).join('')}</div><div class="grid dash-grid"><div class="col-8"><div class="card card-pad"><div class="card-head"><h3>${esc(r.title)} Distribution</h3><span class="card-sub">${ANALYTICS_PERIODS.find(x=>x[0]===analyticsState.period)?.[1]||'Custom'}</span></div><div class="analytics-bars">${r.rows.slice(0,10).map(x=>`<div class="analytics-bar-row"><div class="analytics-bar-label">${esc(x[0])}</div><div class="analytics-bar-track"><span style="width:${Math.max(2,(+x[r.chart]||0)/max*100)}%"></span></div><div class="analytics-bar-value tnum">${esc(anFmt(x[r.chart],r.columns[r.chart]?.[1]))}</div></div>`).join('')||'<div class="empty"><h4>No data</h4></div>'}</div></div></div><div class="col-4"><div class="card card-pad analytics-insights"><div class="card-head"><h3>Smart Insights</h3></div>${r.insights.map((x,i)=>`<div class="analytics-insight"><span>${i+1}</span><p>${esc(x)}</p></div>`).join('')}</div></div></div><div class="card analytics-detail"><div class="card-pad card-head"><h3>${esc(r.title)} — Detailed Report</h3><span class="card-sub">${r.rows.length} rows · ${esc(analyticsPeriodLabel())}</span></div><div class="tbl-wrap"><table class="tbl"><thead><tr>${r.columns.map(x=>`<th>${esc(x[0])}</th>`).join('')}</tr></thead><tbody>${r.rows.length?r.rows.map(row=>`<tr>${row.map((v,i)=>`<td class="${['inr','int','pct'].includes(r.columns[i]?.[1])?'tnum':''}">${esc(anFmt(v,r.columns[i]?.[1]))}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${r.columns.length}"><div class="empty"><h4>No data in selected period</h4></div></td></tr>`}</tbody></table></div></div>`;}
VIEWS.analytics=function(){renderAdvancedAnalytics();};
function analyticsExportCurrent(){const r=analyticsReportData();downloadCSV([[r.title],[`Period ${analyticsPeriodLabel()}`],[],r.columns.map(x=>x[0]),...r.rows],`PTH-${r.id}-${analyticsState.period}-report-${localDateISO()}.csv`);logAudit('Export','Analytics',`${r.title} exported`);}
function analyticsExportAll(){const rows=[];ANALYTICS_REPORTS.forEach(([id])=>{const r=analyticsReportData(id);rows.push([r.title],r.columns.map(x=>x[0]),...r.rows,[]);});downloadCSV(rows,`PTH-All-Analytics-${localDateISO()}.csv`);logAudit('Export','Analytics','All reports exported');}
function analyticsPrintReport(){const r=analyticsReportData(),w=window.open('','_blank');if(!w){toast('Pop-up blocked','Allow pop-ups to generate the report.','err');return;}w.document.write(`<!doctype html><html><head><title>${esc(r.title)}</title><style>body{font:12px Arial;margin:25px;color:#17201c}h1{margin:0}.meta{color:#65736c;margin:5px 0 15px}.k{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:15px 0}.k div{border:1px solid #bec9c2;padding:9px}.k b{display:block;font-size:18px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #bec9c2;padding:7px;text-align:left}th{background:#e7efe8}@page{size:A4 landscape;margin:12mm}</style></head><body><h1>${esc(r.title)}</h1><div class="meta">${esc(DB.brand.company)} · ${esc(analyticsPeriodLabel())} · ${esc(r.generated)}</div><div class="k">${r.kpis.map(x=>`<div>${esc(x[0])}<b>${esc(anFmt(x[1],x[2]))}</b></div>`).join('')}</div><table><thead><tr>${r.columns.map(x=>`<th>${esc(x[0])}</th>`).join('')}</tr></thead><tbody>${r.rows.map(row=>`<tr>${row.map((v,i)=>`<td>${esc(anFmt(v,r.columns[i]?.[1]))}</td>`).join('')}</tr>`).join('')}</tbody></table><h3>Smart Insights</h3><ul>${r.insights.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><script>setTimeout(()=>print(),250)<\/script></body></html>`);w.document.close();logAudit('Print','Analytics',`${r.title} (${analyticsState.period}) report generated`);}

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
      <div id="cinemaBoard" style="opacity:0;filter:blur(14px);transform:scale(0.86);transition:all 0.7s cubic-bezier(0.22,0.61,0.36,1)">
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
  let cinemaFinished = false;
  const finish = () => {
    if (cinemaFinished) return;
    cinemaFinished = true;
    cinema.classList.add('done');
    setTimeout(() => cinema.remove(), 350);
    done();
  };
  cinema.title = 'Click anywhere to skip intro';
  cinema.addEventListener('click', finish);
  cinema.querySelector('#cinemaSkip').onclick = finish;

  // Scene 1: sharpen
  requestAnimationFrame(() => { board.style.opacity = '1'; board.style.filter = 'blur(0)'; board.style.transform = 'scale(1)'; });
  if (line) { const len = line.getTotalLength(); line.style.strokeDasharray = len; line.style.strokeDashoffset = len; setTimeout(() => { line.style.transition = 'stroke-dashoffset 500ms ease'; line.style.strokeDashoffset = 0; }, 450); }

  // Scene 2: sidebar focus — move active item
  setTimeout(() => {
    const sideItems = cinema.querySelectorAll('.csi');
    sideItems[0].style.cssText = 'width:34px;height:34px;border-radius:9px;display:grid;place-items:center;color:var(--text-muted);transition:all 0.25s';
    sideItems[2].style.cssText = 'width:34px;height:34px;border-radius:9px;display:grid;place-items:center;background:var(--black);color:#fff;transition:all 0.25s';
    cinema.querySelector('#cinemaSide').style.cssText += ';box-shadow:var(--shadow-lg);z-index:3;position:relative;transform:translateX(-4px) scale(1.05);transition:all 0.3s';
  }, 1600);

  // Scene 4: float cards
  setTimeout(() => {
    cinema.querySelector('#cinemaSide').style.transform = 'translateX(0) scale(1)';
    board.style.transform = 'scale(1) perspective(1200px) rotateX(6deg)';
    board.style.transition = 'transform 0.6s cubic-bezier(0.22,0.61,0.36,1)';
    cinema.querySelectorAll('.cink').forEach((k, i) => { k.style.transition = 'transform 0.4s cubic-bezier(0.22,0.61,0.36,1),box-shadow 0.4s'; setTimeout(() => { k.style.transform = 'translateY(-10px) translateZ(30px)'; k.style.boxShadow = 'var(--shadow-lg)'; }, i * 45); });
  }, 2600);

  // Scene 6: settle + final
  setTimeout(() => {
    board.style.transform = 'scale(1)';
    cinema.querySelectorAll('.cink').forEach(k => { k.style.transform = 'none'; k.style.boxShadow = 'none'; });
  }, 4100);
  setTimeout(() => { board.style.transition = 'opacity 0.3s'; board.style.opacity = '0.12'; cinema.querySelector('#cinemaFinal').classList.add('show'); }, 4600);
  setTimeout(finish, 6250);
}

function boot() {
  renderShell();
  navigate('overview');
  updateFollowupBadge();
  setTimeout(notifyDueFollowups, 1200);
}

/* Login screen */
const APP_AUTH_SESSION_KEY='pth_app_auth_session_v1';
function saveAppSession(user,remember=true){
  localStorage.removeItem(APP_AUTH_SESSION_KEY);sessionStorage.removeItem(APP_AUTH_SESSION_KEY);
  if(!remember)return;
  localStorage.setItem(APP_AUTH_SESSION_KEY,JSON.stringify({username:user.username,expiresAt:Date.now()+30*24*60*60*1000}));
}
function restoreAppSession(){
  let session=null;
  for(const storage of [localStorage,sessionStorage]){try{const candidate=JSON.parse(storage.getItem(APP_AUTH_SESSION_KEY)||'null');if(candidate){session=candidate;break;}}catch(error){}}
  if(!session||session.expiresAt<Date.now()){localStorage.removeItem(APP_AUTH_SESSION_KEY);sessionStorage.removeItem(APP_AUTH_SESSION_KEY);return null;}
  const user=DB.users.find(item=>item.username===session.username&&item.status==='active');
  if(!user){localStorage.removeItem(APP_AUTH_SESSION_KEY);sessionStorage.removeItem(APP_AUTH_SESSION_KEY);return null;}
  DB.user={name:user.name,role:user.role,initials:user.initials};return user;
}
async function signOut(){localStorage.removeItem(APP_AUTH_SESSION_KEY);sessionStorage.removeItem(APP_AUTH_SESSION_KEY);await window.PTHBackend?.signOut?.();location.href=location.pathname;}
async function storePasswordInBrowser(user,password){
  if(!document.getElementById('loginSavePassword')?.checked)return;
  if(!window.PasswordCredential||!navigator.credentials?.store)return;
  try{await navigator.credentials.store(new PasswordCredential({id:user.username,name:user.name,password}));}catch(error){}
}
async function fillPasswordFromBrowser(){
  if(!window.PasswordCredential||!navigator.credentials?.get)return;
  try{const credential=await navigator.credentials.get({password:true,mediation:'optional'});if(!credential)return;const user=DB.users.find(item=>item.username===credential.id&&item.status==='active');if(!user)return;const select=document.getElementById('loginUser'),password=document.getElementById('loginPass');if(select)select.value=user.username;if(password)password.value=credential.password||'';}catch(error){}
}
function renderLogin() {
  document.getElementById('app').innerHTML = `
    <div class="login-wrap">
      <div class="login-hero">
        <div class="login-hero-glow"></div>
        <div style="display:flex;align-items:center;gap:12px;position:relative"><div class="brand-logo" style="width:44px;height:44px">${brandMark()}</div><div><div style="font-size:18px;font-weight:700">${DB.brand.name}</div><div style="font-size:11.5px;color:rgba(255,255,255,0.55)">${DB.brand.company}</div></div></div>
        <div style="margin-top:auto;position:relative">
          <div style="font-size:32px;font-weight:700;letter-spacing:-0.03em;line-height:1.15;max-width:460px">CRM, Credentials, Accreditation & Certification for ${DB.brand.company}.</div>
          <p style="color:rgba(255,255,255,0.62);margin-top:16px;max-width:420px;font-size:14px">${DB.brand.accredited}. Manage every enquiry, quotation, credential, approval and test certificate — with the full Schedule of Rates built in.</p>
          <div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap">${['NABL','ISO/IEC 17025:2017','ISO 9001:2015',`${(window.SOR||[]).reduce((a,c)=>a+(c.tests?c.tests.length:0),0)} SOR tests`].map(t=>`<span class="badge" style="background:rgba(232,121,30,0.16);color:#F4A460"><span class="dot" style="background:var(--brand)"></span>${t}</span>`).join('')}</div>
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
          <div class="field"><label>Password</label><input class="input" type="password" id="loginPass" value="${window.PTHBackend?.enabled?'':DEMO_PASSWORD}" autocomplete="current-password"></div>
          <div style="display:grid;gap:10px;margin-bottom:18px"><label style="display:flex;align-items:center;gap:9px;font-size:12.5px;color:var(--text-secondary)"><input type="checkbox" id="loginSavePassword">Save password in this browser</label><label style="display:flex;align-items:center;gap:9px;font-size:12.5px;color:var(--text-secondary)"><input type="checkbox" id="loginKeepSignedIn" checked>Keep me signed in after refresh</label><a style="font-size:12.5px;color:var(--primary-dark);font-weight:600">Forgot password?</a></div>
          <button class="btn btn-primary" style="width:100%;justify-content:center;padding:12px" onclick="doLogin()">Sign In ${I.arrowR}</button>
          <div style="text-align:center;margin:16px 0;color:var(--text-muted);font-size:12px">or</div>
          <button class="btn btn-ghost" style="width:100%;justify-content:center">${I.shield}Single Sign-On (SSO)</button>
          <p class="page-desc" style="text-align:center;margin-top:18px">Users: Hardik · Tushal · Shivang · Jaydeep · Nirav<br>Static preview access only · Production authentication requires a backend</p>
        </div>
      </div>
    </div>`;
  setTimeout(fillPasswordFromBrowser,0);
}
function loginPickUser() {
  const uname = document.getElementById('loginUser').value;
  const u = DB.users.find(x => x.username === uname);
  if (u&&!window.PTHBackend?.enabled) document.getElementById('loginPass').value = u.password || DEMO_PASSWORD;
}
async function doLogin() {
  const uname = document.getElementById('loginUser')?.value;
  const passInput = document.getElementById('loginPass');
  const password = passInput?.value || '';
  const u = DB.users.find(x => x.username === uname);
  const remember=document.getElementById('loginKeepSignedIn')?.checked===true;
  if (window.PTHBackend?.enabled) {
    try {
      await window.PTHBackend.signIn(u?.email || `${uname}@pramukhtesthouse.com`, password);
    } catch (error) {
      toast('Secure sign-in failed', error.message || 'Check your email and password.', 'err');
      passInput?.focus();
      return;
    }
    await storePasswordInBrowser(u,password);saveAppSession(u,remember);location.reload();
    return;
  } else if (!u || u.status !== 'active' || password !== (u.password || DEMO_PASSWORD)) {
    toast('Sign-in failed', 'Check the selected user and password.', 'err');
    passInput?.focus();
    return;
  }
  DB.user = { name: u.name, role: u.role, initials: u.initials };
  await storePasswordInBrowser(u,password);
  saveAppSession(u,remember);
  u.lastLogin = nowStamp();
  logAudit('Login', 'Auth', `Signed in as ${DB.user.name} (${DB.user.role})`);
  boot();
  runCinema(() => {});
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const restoredUser=restoreAppSession();
  if (window.PTHBackend?.enabled && window.PTHBackend.hasSession() && restoredUser) { boot(); return; }
  if (!window.PTHBackend?.enabled && restoredUser) { boot(); return; }
  if (params.get('skip') === '1' && !window.PTHBackend?.enabled) { boot(); return; }
  renderLogin();
});

// Expose for inline handlers and cross-module import persistence.
Object.assign(window, { persistUsers, persistBranding, persistCredentials, persistScopes, resetQuotationFilters, signOut });
Object.assign(window, { navigate, VIEWS, toast, openDrawer, closeDrawer, openModal, closeModal, openCredDrawer, openLeadDrawer, openQuotationDrawer, openExpiryDrawer, openCredentialModal, submitCredential, openEnquiryModal, submitEnquiry, togglePkg, toggleAllRows, setAccent, applyBranding, doLogin, loginPickUser, quickAddMenu, quoteFillTests, quoteAddLine, openCustomQuoteLine, addCustomQuoteLine, quoteAddFullSOR, confirmAddFullSOR, setQuoteDiscount, quoteSetLineRate, quoteSetLineDiscount, quoteApplyTermsTemplate, updateQuoteTermsText, renderQuoteLines, renderSOR, openUserModal, saveUser, toggleUserStatus, deleteUser, confirmDeleteUser, uSyncPass, renderUsersTable, renderAuditTable, exportAudit, setOverviewPeriod, exportOverview, saveQuotation, startNewQuotation, renderQuotationRegister, setQuotationFilter, updateQuotationStatus, duplicateQuotation, modifyQuotation, deleteQuotation, confirmDeleteQuotation, printQuotation, openQuotationSend, quotationForShare, generateQuotationPdfBlob, downloadQuotationPdf, shareQuotationPdf, formalQuotationMessage, gmailComposeUrl, emailQuotation, whatsappQuotation, renderQuotationTemplateCards, filterQuotationTemplates, selectQuotationTemplate, previewQuotationLayout, uploadQuotationAsset, saveQuotationLayout, logAudit, openFollowupModal, saveFollowup, completeFollowup, setFollowupFilter, syncFollowupCustomer, syncFollowupQuotation, exportFollowups, openFollowupDrawer, openCompleteFollowup, confirmCompleteFollowup, snoozeFollowup, deleteFollowup, confirmDeleteFollowup, launchFollowupChannel, newFollowupForCustomer, newFollowupForLead, newFollowupForQuote, updateFollowupBadge, enableFollowupReminders, notifyDueFollowups, setPipelineFilter, openLeadModal, saveLead, deleteLead, confirmDeleteLead, openWonModal, confirmWon, openLostModal, confirmLost, prepareQuotationForLead, setEnquiryFilter, exportEnquiries, setTenderFilter, openTenderModal, saveTender, openTenderDrawer, persistTenders, persistSOR, sorAddTestToQuote, sorAddCategoryToQuote, sorAddComboToQuote, openSorTestModal, saveSorTest, deleteSorTest, confirmDeleteSorTest, openSorCategoryModal, saveSorCategory, deleteSorCategory, confirmDeleteSorCategory, exportSOR, resetSOR, confirmResetSOR, openClientModal, saveClient, deleteClient, confirmDeleteClient, openClientDrawer, launchClientChannel, setClientFilter, setClientView, setClientSort, renderClients, exportClients, persistClients, persistPipeline });
Object.defineProperty(window, 'quoteLines', { get: () => quoteLines, set: v => { quoteLines = v; } });
