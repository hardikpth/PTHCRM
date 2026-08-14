/* ============================================================
   PTH CRM — Clean production-ready database
   ============================================================ */

// Public preview credential only. Do not reuse this password for production authentication.
const DEMO_PASSWORD = 'PTH-Demo!8vK4mQ27';

// Clear previously seeded demo records once for every browser that opened the prototype.
const CLEAN_START_VERSION = 'pth_clean_start_2026_08_14_v1';
try {
  if (localStorage.getItem(CLEAN_START_VERSION) !== '1') {
    [
      'pth_audit_v1', 'pth_overview_strategy_v1', 'pth_crm_intelligence_v1',
      'pth_enterprise_crm_v1', 'pth_pipeline_v1', 'pth_followups_v1',
      'pth_followup_notified_v1', 'pth_crm_credentials_v1', 'pth_tenders_v1',
      'pth_clients_v1', 'pth_quotations_v1', 'pth_users_v1', 'pth_brand_v1',
      'pth_scopes_v1'
    ].forEach(key => localStorage.removeItem(key));
    localStorage.setItem(CLEAN_START_VERSION, '1');
  }
} catch (e) {}

const DB = {
  brand: {
    name: 'PTH CRM',
    company: 'Pramukh Test House',
    legal: 'PTH Consultancy Services LLP',
    tagline: 'CRM, Credentials, Accreditation & Certification Management for Laboratories',
    accredited: 'Accredited by ISO 9001:2015 & NABL as per ISO/IEC 17025:2017',
    logoUrl: 'assets/img/logo.jpeg',
    address: 'Ground Floor, R.S. No. 40/1 Paiki, Mansukh Nagar, Nr. Shri Vraj Vilas Haveli, Varachha, Surat, Gujarat – 395006',
    phone: '+91-9016329736, +91-6358025135',
    accent: '#9DDB23',
  },

  branches: ['Surat (HO)', 'Ahmedabad', 'Vadodara', 'Rajkot', 'Mumbai'],
  financialYear: 'FY 2026–27',
  user: { name: 'Hardik', role: 'Laboratory Head', initials: 'HK' },

  // Managed preview users are retained so each role can access the clean workspace.
  users: [
    { id: 'U-001', name: 'Hardik', username: 'hardik', email: 'hardik@pramukhtesthouse.com', phone: '+91-9016329736', role: 'Laboratory Head', branch: 'Surat (HO)', initials: 'HK', status: 'active', lastLogin: '—' },
    { id: 'U-002', name: 'Tushal', username: 'tushal', email: 'tushal@pramukhtesthouse.com', role: 'Quality Manager', branch: 'Surat (HO)', initials: 'TU', status: 'active', lastLogin: '—' },
    { id: 'U-003', name: 'Shivang', username: 'shivang', email: 'shivang@pramukhtesthouse.com', role: 'Technical Manager', branch: 'Ahmedabad', initials: 'SH', status: 'active', lastLogin: '—' },
    { id: 'U-004', name: 'Jaydeep', username: 'jaydeep', email: 'jaydeep@pramukhtesthouse.com', role: 'CRM Manager', branch: 'Surat (HO)', initials: 'JD', status: 'active', lastLogin: '—' },
    { id: 'U-005', name: 'Nirav', username: 'nirav', email: 'nirav@pramukhtesthouse.com', role: 'Authorised Signatory', branch: 'Vadodara', initials: 'NI', status: 'active', lastLogin: '—' },
  ],

  kpis: [
    { id: 'enq', label: 'New Enquiries', value: 0, delta: 0, dir: 'up', cmp: 'No activity yet', spark: [0,0,0,0,0,0,0,0,0,0,0,0], fmt: 'int' },
    { id: 'quo', label: 'Quotation Value', value: 0, delta: 0, dir: 'up', cmp: 'No activity yet', spark: [0,0,0,0,0,0,0,0,0,0,0,0], fmt: 'inr' },
    { id: 'ord', label: 'Orders Received', value: 0, delta: 0, dir: 'up', cmp: 'No activity yet', spark: [0,0,0,0,0,0,0,0,0,0,0,0], fmt: 'int' },
    { id: 'cnv', label: 'Conversion Rate', value: 0, delta: 0, dir: 'up', cmp: 'No activity yet', spark: [0,0,0,0,0,0,0,0,0,0,0,0], fmt: 'pct' },
    { id: 'due', label: 'Outstanding Payments', value: 0, delta: 0, dir: 'down', cmp: 'No activity yet', spark: [0,0,0,0,0,0,0,0,0,0,0,0], fmt: 'inr' },
  ],
  months: ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul'],
  series: {
    'Enquiries received': Array(12).fill(0),
    'Quotation submitted': Array(12).fill(0),
    'Orders received': Array(12).fill(0),
    'Revenue booked': Array(12).fill(0),
    'Payment collected': Array(12).fill(0),
  },

  compliance: { score: 0, valid: 0, expiring: 0, expired: 0 },
  credentialStatus: [
    { name: 'Legal Documents', value: 0, color: 'var(--primary-dark)' },
    { name: 'NABL & ISO', value: 0, color: 'var(--primary)' },
    { name: 'Government Approvals', value: 0, color: '#B7E85A' },
    { name: 'Client Registrations', value: 0, color: 'var(--info)' },
    { name: 'Staff Credentials', value: 0, color: '#7CC3FF' },
    { name: 'Equipment Calibration', value: 0, color: 'var(--warning)' },
    { name: 'Financial Credentials', value: 0, color: 'var(--text-muted)' },
  ],

  approvals: [],
  expiries: [],
  pipeline: {
    columns: [
      { id: 'new', name: 'New', color: 'var(--text-muted)' },
      { id: 'review', name: 'Requirement Review', color: 'var(--info)' },
      { id: 'visit', name: 'Site Visit', color: '#7CC3FF' },
      { id: 'prep', name: 'Quotation Preparation', color: 'var(--warning)' },
      { id: 'sent', name: 'Quotation Submitted', color: '#E6A817' },
      { id: 'nego', name: 'Negotiation', color: '#F0B84A' },
      { id: 'po', name: 'Purchase Order Awaited', color: 'var(--primary)' },
      { id: 'won', name: 'Won', color: 'var(--primary-dark)' },
      { id: 'lost', name: 'Lost', color: 'var(--danger)' },
    ],
    leads: [],
  },
  customers: [],
  credentials: [],
  approvalWorkflow: [],
  approvalStages: [
    'Requirement Identified','Checklist Prepared','Documents Under Collection','Internal Verification',
    'Application Submitted','Query Raised','Response Submitted','Audit Scheduled','Corrective Action',
    'Approval Awaited','Approved','Renewal Due','Expired'
  ],
  certificates: { org: [], customer: [] },
  packageDocs: [],
  notifications: [],
  tenders: [],
  equipment: [],
  staff: [],
  scopes: [],
  documentImports: {},

  roles: ['Super Admin','Director','Laboratory Head','Quality Manager','Technical Manager','CRM Manager','Sales Executive','Tender Executive','Document Controller','Accounts Manager','Testing Engineer','Reviewer','Authorised Signatory','Technician','Client Portal User'],
  perms: ['View','Create','Edit','Verify','Review','Approve','Issue','Download','Export','Delete','Archive','Share'],
  seedAudit: [],
};
