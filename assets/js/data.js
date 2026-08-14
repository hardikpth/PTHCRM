/* ============================================================
   LabCred CRM — Sample Laboratory Database
   ============================================================ */

const DB = {
  brand: {
    name: 'PTH CRM',
    company: 'Pramukh Test House',
    legal: 'PTH Consultancy Services LLP',
    tagline: 'CRM, Credentials, Accreditation & Certification Management for Laboratories',
    accredited: 'Accredited by ISO 9001:2015 & NABL as per ISO/IEC 17025:2017',
    // Authentic PTH seal (extracted from the official SOR document). Replace assets/img/logo.jpeg to change it.
    logoUrl: 'assets/img/logo.jpeg',
    address: 'Ground Floor, R.S. No. 40/1 Paiki, Mansukh Nagar, Nr. Shri Vraj Vilas Haveli, Varachha, Surat, Gujarat – 395006',
    phone: '+91-9016329736, +91-6358025135',
    accent: '#9DDB23',
  },

  branches: ['Surat (HO)', 'Ahmedabad', 'Vadodara', 'Rajkot', 'Mumbai'],
  financialYear: 'FY 2026–27',

  user: { name: 'Hardik', role: 'Laboratory Head', initials: 'HK' },

  // Login / managed users. The static build is preview-only; production auth is handled by the API.
  users: [
    { id: 'U-001', name: 'Hardik',  username: 'hardik',  email: 'hardik@pramukhtesthouse.com',  role: 'Laboratory Head',      branch: 'Surat (HO)', initials: 'HK', status: 'active', lastLogin: '2026-07-28 09:12' },
    { id: 'U-002', name: 'Tushal',  username: 'tushal',  email: 'tushal@pramukhtesthouse.com',  role: 'Quality Manager',      branch: 'Surat (HO)', initials: 'TU', status: 'active', lastLogin: '2026-07-28 08:47' },
    { id: 'U-003', name: 'Shivang', username: 'shivang', email: 'shivang@pramukhtesthouse.com', role: 'Technical Manager',    branch: 'Ahmedabad',  initials: 'SH', status: 'active', lastLogin: '2026-07-27 18:20' },
    { id: 'U-004', name: 'Jaydeep', username: 'jaydeep', email: 'jaydeep@pramukhtesthouse.com', role: 'CRM Manager',          branch: 'Surat (HO)', initials: 'JD', status: 'active', lastLogin: '2026-07-28 10:05' },
    { id: 'U-005', name: 'Nirav',   username: 'nirav',   email: 'nirav@pramukhtesthouse.com',   role: 'Authorised Signatory', branch: 'Vadodara',   initials: 'NI', status: 'active', lastLogin: '2026-07-26 16:33' },
  ],

  kpis: [
    { id: 'enq', label: 'New Enquiries', value: 128, delta: 14.8, dir: 'up', cmp: 'Compared with last month', spark: [8,12,9,14,11,17,15,19,16,22,20,26], fmt: 'int' },
    { id: 'quo', label: 'Quotation Value', value: 4720000, delta: 9.2, dir: 'up', cmp: 'Compared with last month', spark: [30,34,31,38,36,42,40,45,44,49,47,52], fmt: 'inr' },
    { id: 'ord', label: 'Orders Received', value: 63, delta: 6.1, dir: 'up', cmp: 'Compared with last month', spark: [4,6,5,7,6,8,7,9,8,10,9,11], fmt: 'int' },
    { id: 'cnv', label: 'Conversion Rate', value: 49.2, delta: 3.4, dir: 'up', cmp: 'Compared with last month', spark: [40,42,41,44,43,46,45,47,46,48,48,49], fmt: 'pct' },
    { id: 'due', label: 'Outstanding Payments', value: 842000, delta: 4.6, dir: 'down', cmp: 'Compared with last month', spark: [52,50,53,49,51,47,48,45,46,44,43,42], fmt: 'inr' },
  ],

  // Analytics series (12 months)
  months: ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul'],
  series: {
    'Enquiries received': [72,81,76,94,88,102,96,110,118,112,124,128],
    'Quotation submitted': [58,64,60,72,70,80,76,88,92,90,98,104],
    'Orders received': [30,34,31,40,38,44,42,50,52,54,58,63],
    'Revenue booked':    [22,26,24,31,29,36,34,41,44,46,49,52],
    'Payment collected': [20,23,22,28,27,33,31,38,40,42,45,47],
  },

  compliance: { score: 86, valid: 184, expiring: 12, expired: 4 },

  credentialStatus: [
    { name: 'Legal Documents', value: 42, color: 'var(--primary-dark)' },
    { name: 'NABL & ISO', value: 34, color: 'var(--primary)' },
    { name: 'Government Approvals', value: 28, color: '#B7E85A' },
    { name: 'Client Registrations', value: 22, color: 'var(--info)' },
    { name: 'Staff Credentials', value: 38, color: '#7CC3FF' },
    { name: 'Equipment Calibration', value: 26, color: 'var(--warning)' },
    { name: 'Financial Credentials', value: 8, color: 'var(--text-muted)' },
  ],

  approvals: [
    { name: 'NABL Accreditation', auth: 'National Accreditation Board (NABL)', cert: 'TC-8421', expiry: '2027-03-14', status: 'valid', prog: 100 },
    { name: 'ISO/IEC 17025:2017', auth: 'NABL / ILAC', cert: 'ISO-17025-2291', expiry: '2027-03-14', status: 'valid', prog: 100 },
    { name: 'ISO 9001:2015', auth: 'Bureau Veritas', cert: 'QMS-55190', expiry: '2026-09-02', status: 'expiring', prog: 45 },
    { name: 'Government Empanelment', auth: 'R&B Department, Gujarat', cert: 'GOV-EMP-7734', expiry: '2026-08-19', status: 'review', prog: 62 },
    { name: 'Client Vendor Registration', auth: 'L&T Construction', cert: 'VR-LT-2044', expiry: '2027-01-30', status: 'renewal', prog: 30 },
    { name: 'Authorised Signatory Approval', auth: 'NABL', cert: 'AS-118', expiry: '2027-03-14', status: 'approved', prog: 100 },
    { name: 'Equipment Calibration Status', auth: 'NABL Cal Lab', cert: 'CAL-2026-Q2', expiry: '2026-08-10', status: 'expiring', prog: 70 },
  ],

  expiries: [
    { name: 'UTM 1000kN Calibration', cat: 'Equipment Calibration', person: 'A. Sharma', expiry: '2026-08-01', days: 4, prio: 'high', status: 'renewal' },
    { name: 'ISO 9001:2015 Certificate', cat: 'NABL & ISO', person: 'R. Mehta', expiry: '2026-08-05', days: 8, prio: 'high', status: 'submitted' },
    { name: 'Concrete Cube Testing Scope', cat: 'Accreditation Scope', person: 'P. Nair', expiry: '2026-08-12', days: 15, prio: 'med', status: 'valid' },
    { name: 'GPCB Consent to Operate', cat: 'Government Approvals', person: 'S. Desai', expiry: '2026-08-19', days: 22, prio: 'med', status: 'renewal' },
    { name: 'L&T Vendor Registration', cat: 'Client Registrations', person: 'K. Patel', expiry: '2026-08-28', days: 31, prio: 'med', status: 'valid' },
    { name: 'Authorised Signatory — NDT', cat: 'Staff Credentials', person: 'M. Iyer', expiry: '2026-09-15', days: 49, prio: 'low', status: 'valid' },
    { name: 'Digital Vernier Caliper Cal.', cat: 'Equipment Calibration', person: 'A. Sharma', expiry: '2026-09-30', days: 64, prio: 'low', status: 'valid' },
    { name: 'PWD Maharashtra Empanelment', cat: 'Government Approvals', person: 'S. Desai', expiry: '2026-10-20', days: 84, prio: 'low', status: 'valid' },
  ],

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
    leads: [
      { id: 'L-2041', col: 'new', cust: 'Adani Infra', proj: 'Mundra Port Expansion', cat: 'Geotechnical', val: 480000, person: 'KP', prob: 20, prio: 'high', follow: '30 Jul' },
      { id: 'L-2042', col: 'new', cust: 'Torrent Power', proj: 'Substation Foundation', cat: 'Material Testing', val: 210000, person: 'SD', prob: 15, prio: 'med', follow: '31 Jul' },
      { id: 'L-2043', col: 'review', cust: 'GMDC Ltd', proj: 'Mine Slope Study', cat: 'Geotechnical', val: 640000, person: 'PN', prob: 35, prio: 'high', follow: '01 Aug' },
      { id: 'L-2044', col: 'review', cust: 'Shapoorji Pallonji', proj: 'Metro Viaduct QA', cat: 'NDT', val: 890000, person: 'MI', prob: 40, prio: 'high', follow: '02 Aug' },
      { id: 'L-2045', col: 'visit', cust: 'NHAI PIU Surat', proj: 'NH-48 Pavement Cores', cat: 'Material Testing', val: 320000, person: 'KP', prob: 50, prio: 'med', follow: '03 Aug' },
      { id: 'L-2046', col: 'prep', cust: 'Reliance Industries', proj: 'Jamnagar Tank Farm', cat: 'Calibration', val: 560000, person: 'SD', prob: 60, prio: 'high', follow: '29 Jul' },
      { id: 'L-2047', col: 'sent', cust: 'Gujarat Metro Rail', proj: 'Pile Integrity Testing', cat: 'NDT', val: 1120000, person: 'MI', prob: 65, prio: 'high', follow: '04 Aug' },
      { id: 'L-2048', col: 'sent', cust: 'Sardar Sarovar NNL', proj: 'Canal Lining Cubes', cat: 'Material Testing', val: 275000, person: 'PN', prob: 55, prio: 'low', follow: '05 Aug' },
      { id: 'L-2049', col: 'nego', cust: 'IRCON International', proj: 'Rail Weld Inspection', cat: 'NDT', val: 730000, person: 'MI', prob: 72, prio: 'high', follow: '28 Jul' },
      { id: 'L-2050', col: 'po', cust: 'Vadodara Municipal', proj: 'Water Line Coating QA', cat: 'Inspection', val: 415000, person: 'KP', prob: 85, prio: 'med', follow: '30 Jul' },
      { id: 'L-2051', col: 'won', cust: 'Larsen & Toubro', proj: 'Bullet Train Segment QA', cat: 'Material Testing', val: 1650000, person: 'SD', prob: 100, prio: 'high', follow: '—' },
      { id: 'L-2052', col: 'lost', cust: 'Local Builder Co.', proj: 'Residential Cubes', cat: 'Material Testing', val: 90000, person: 'PN', prob: 0, prio: 'low', follow: '—' },
    ],
  },

  credentials: [
    { id: 'CR-0001', name: 'NABL Accreditation Certificate', cat: 'NABL & ISO', auth: 'NABL', cert: 'TC-8421', branch: 'Surat (HO)', issue: '2023-03-15', expiry: '2027-03-14', days: 594, person: 'R. Mehta', status: 'valid', verified: true, conf: 'Restricted' },
    { id: 'CR-0002', name: 'ISO/IEC 17025:2017', cat: 'NABL & ISO', auth: 'NABL / ILAC', cert: 'ISO-17025-2291', branch: 'Surat (HO)', issue: '2023-03-15', expiry: '2027-03-14', days: 594, person: 'R. Mehta', status: 'valid', verified: true, conf: 'Restricted' },
    { id: 'CR-0003', name: 'ISO 9001:2015 QMS', cat: 'NABL & ISO', auth: 'Bureau Veritas', cert: 'QMS-55190', branch: 'Surat (HO)', issue: '2023-09-02', expiry: '2026-09-02', days: 36, person: 'R. Mehta', status: 'expiring', verified: true, conf: 'Internal' },
    { id: 'CR-0004', name: 'GPCB Consent to Operate', cat: 'Government Approvals', auth: 'Gujarat Pollution Control Board', cert: 'CTO-2044', branch: 'Surat (HO)', issue: '2024-08-19', expiry: '2026-08-19', days: 22, person: 'S. Desai', status: 'renewal', verified: true, conf: 'Internal' },
    { id: 'CR-0005', name: 'UTM 1000kN Calibration', cat: 'Equipment Calibration', auth: 'NABL Cal Lab', cert: 'CAL-UTM-771', branch: 'Surat (HO)', issue: '2025-08-01', expiry: '2026-08-01', days: 4, person: 'A. Sharma', status: 'renewal', verified: false, conf: 'Internal' },
    { id: 'CR-0006', name: 'L&T Vendor Registration', cat: 'Client Registrations', auth: 'L&T Construction', cert: 'VR-LT-2044', branch: 'Mumbai', issue: '2025-01-30', expiry: '2027-01-30', days: 552, person: 'K. Patel', status: 'valid', verified: true, conf: 'Confidential' },
    { id: 'CR-0007', name: 'GST Registration Certificate', cat: 'Legal Documents', auth: 'GST Department', cert: '24AABCL1234K1Z5', branch: 'Surat (HO)', issue: '2020-07-01', expiry: '—', days: 9999, person: 'Accounts', status: 'valid', verified: true, conf: 'Restricted' },
    { id: 'CR-0008', name: 'PWD Maharashtra Empanelment', cat: 'Government Approvals', auth: 'PWD Maharashtra', cert: 'PWD-EMP-9021', branch: 'Mumbai', issue: '2024-10-20', expiry: '2026-10-20', days: 84, person: 'S. Desai', status: 'valid', verified: true, conf: 'Internal' },
    { id: 'CR-0009', name: 'Authorised Signatory — NDT', cat: 'Staff Credentials', auth: 'NABL', cert: 'AS-NDT-118', branch: 'Surat (HO)', issue: '2024-09-15', expiry: '2026-09-15', days: 49, person: 'M. Iyer', status: 'valid', verified: true, conf: 'Internal' },
    { id: 'CR-0010', name: 'Digital Vernier Caliper Cal.', cat: 'Equipment Calibration', auth: 'NABL Cal Lab', cert: 'CAL-VC-338', branch: 'Ahmedabad', issue: '2025-09-30', expiry: '2026-09-30', days: 64, person: 'A. Sharma', status: 'valid', verified: true, conf: 'Internal' },
    { id: 'CR-0011', name: 'Fire Safety NOC', cat: 'Legal Documents', auth: 'Fire Dept, SMC', cert: 'FIRE-2210', branch: 'Surat (HO)', issue: '2023-06-11', expiry: '2026-06-11', days: -47, person: 'S. Desai', status: 'expired', verified: false, conf: 'Internal' },
    { id: 'CR-0012', name: 'MSME Udyam Registration', cat: 'Financial Credentials', auth: 'Ministry of MSME', cert: 'UDYAM-GJ-24-0099', branch: 'Surat (HO)', issue: '2021-04-01', expiry: '—', days: 9999, person: 'Accounts', status: 'valid', verified: true, conf: 'Internal' },
    { id: 'CR-0013', name: 'Concrete Cube Testing Scope', cat: 'Accreditation Scope', auth: 'NABL', cert: 'SC-CIVIL-041', branch: 'Surat (HO)', issue: '2024-08-12', expiry: '2026-08-12', days: 15, person: 'P. Nair', status: 'expiring', verified: true, conf: 'Internal' },
    { id: 'CR-0014', name: 'PAN Card — Organisation', cat: 'Legal Documents', auth: 'Income Tax Dept', cert: 'AABCL1234K', branch: 'Surat (HO)', issue: '2018-01-10', expiry: '—', days: 9999, person: 'Accounts', status: 'valid', verified: true, conf: 'Restricted' },
    { id: 'CR-0015', name: 'Reliance Vendor Prequalification', cat: 'Client Registrations', auth: 'Reliance Industries', cert: 'RIL-PQ-8890', branch: 'Vadodara', issue: '2025-02-14', expiry: '2027-02-14', days: 567, person: 'K. Patel', status: 'valid', verified: true, conf: 'Confidential' },
  ],

  approvalWorkflow: [
    { name: 'DFCCIL Railway Empanelment', auth: 'Dedicated Freight Corridor Corp', stage: 5, service: 'Ballast & Track Material Testing', person: 'S. Desai' },
    { name: 'Gujarat Metro Vendor', auth: 'GMRC Ltd', stage: 10, service: 'Pile Integrity & NDT', person: 'M. Iyer' },
    { name: 'GIDC Industrial Registration', auth: 'GIDC', stage: 11, service: 'Soil Investigation', person: 'P. Nair' },
    { name: 'ONGC Vendor Approval', auth: 'ONGC', stage: 6, service: 'Weld Inspection (NDT)', person: 'M. Iyer' },
    { name: 'Municipal Corp Surat', auth: 'SMC', stage: 8, service: 'Water & Coating QA', person: 'K. Patel' },
  ],

  approvalStages: [
    'Requirement Identified','Checklist Prepared','Documents Under Collection','Internal Verification',
    'Application Submitted','Query Raised','Response Submitted','Audit Scheduled','Corrective Action',
    'Approval Awaited','Approved','Renewal Due','Expired'
  ],

  certificates: {
    org: [
      { name: 'NABL Accreditation', num: 'TC-8421', authority: 'NABL', status: 'valid', expiry: '2027-03-14' },
      { name: 'ISO/IEC 17025:2017', num: 'ISO-17025-2291', authority: 'NABL/ILAC', status: 'valid', expiry: '2027-03-14' },
      { name: 'BIS Recognition', num: 'BIS-LAB-772', authority: 'Bureau of Indian Standards', status: 'valid', expiry: '2027-05-20' },
      { name: 'ISO 9001:2015', num: 'QMS-55190', authority: 'Bureau Veritas', status: 'expiring', expiry: '2026-09-02' },
      { name: 'Proficiency Testing Accred.', num: 'PT-2201', authority: 'NABL', status: 'valid', expiry: '2027-08-01' },
    ],
    customer: [
      { name: 'Concrete Cube Test Report', num: 'TR-2026-4471', client: 'L&T Construction', stage: 'Issued', signatory: 'M. Iyer', date: '2026-07-24' },
      { name: 'Soil Investigation Report', num: 'GT-2026-1180', client: 'Adani Infra', stage: 'Authorised Signatory Approval', signatory: 'P. Nair', date: '2026-07-26' },
      { name: 'Ultrasonic Weld Inspection', num: 'NDT-2026-0902', client: 'IRCON', stage: 'Quality Review', signatory: 'M. Iyer', date: '2026-07-27' },
      { name: 'Pressure Gauge Calibration', num: 'CAL-2026-3341', client: 'Reliance', stage: 'Technical Review', signatory: 'A. Sharma', date: '2026-07-27' },
      { name: 'Rebound Hammer Test', num: 'TR-2026-4489', client: 'Shapoorji', stage: 'Result Entry', signatory: '—', date: '2026-07-28' },
    ],
  },

  packageDocs: [
    { id: 'd1', name: 'Company Registration', status: 'valid' },
    { id: 'd2', name: 'GST & PAN', status: 'valid' },
    { id: 'd3', name: 'MSME Udyam', status: 'valid' },
    { id: 'd4', name: 'NABL Certificate', status: 'valid' },
    { id: 'd5', name: 'ISO 9001:2015', status: 'expiring' },
    { id: 'd6', name: 'Accreditation Scope', status: 'valid' },
    { id: 'd7', name: 'Financial Documents (3 yr)', status: 'valid' },
    { id: 'd8', name: 'Key Staff CVs', status: 'valid' },
    { id: 'd9', name: 'Equipment List', status: 'valid' },
    { id: 'd10', name: 'Calibration Certificates', status: 'expiring' },
    { id: 'd11', name: 'Work Orders', status: 'valid' },
    { id: 'd12', name: 'Completion Certificates', status: 'valid' },
    { id: 'd13', name: 'Client References', status: 'valid' },
    { id: 'd14', name: 'Fire Safety NOC', status: 'expired' },
    { id: 'd15', name: 'Organisation Chart', status: 'valid' },
    { id: 'd16', name: 'Declarations', status: 'valid' },
  ],

  notifications: [
    { icon: 'alert', tone: 'danger', title: 'Fire Safety NOC expired', text: '4 documents including Fire Safety NOC are past validity. Renewal action required.', time: '12 min ago', unread: true },
    { icon: 'clock', tone: 'warning', title: 'UTM calibration expires in 4 days', text: 'Assigned to A. Sharma. Calibration booking pending with NABL Cal Lab.', time: '1 hour ago', unread: true },
    { icon: 'check', tone: 'primary', title: 'NABL surveillance audit closed', text: 'All 3 observations addressed. Compliance health improved by 6.4%.', time: '3 hours ago', unread: true },
    { icon: 'file', tone: 'info', title: '3 test reports pending signatory approval', text: 'Reports awaiting M. Iyer authorisation before dispatch.', time: 'Yesterday', unread: false },
    { icon: 'inr', tone: 'warning', title: '₹8,42,000 payments overdue', text: '5 invoices crossed the credit period. Follow-up scheduled.', time: 'Yesterday', unread: false },
    { icon: 'file', tone: 'info', title: '2 tender submissions due this week', text: 'GMRC and DFCCIL prequalification packages pending finalisation.', time: '2 days ago', unread: false },
  ],

  tenders: [
    { id: 'T-1101', title: 'Highway Material Testing — NHAI', client: 'NHAI PIU Surat', value: 2400000, due: '2026-08-02', stage: 'Preparation', docs: 12, missing: 1 },
    { id: 'T-1102', title: 'Metro Pile Integrity Testing', client: 'Gujarat Metro Rail', value: 3600000, due: '2026-08-05', stage: 'Package Ready', docs: 16, missing: 0 },
    { id: 'T-1103', title: 'Geotechnical Investigation — GMDC', client: 'GMDC Ltd', value: 1800000, due: '2026-08-14', stage: 'Prequalification', docs: 14, missing: 2 },
    { id: 'T-1104', title: 'Railway Weld Inspection — DFCCIL', client: 'DFCCIL', value: 2900000, due: '2026-08-09', stage: 'Preparation', docs: 11, missing: 3 },
  ],

  equipment: [
    { id: 'EQ-01', name: 'Universal Testing Machine 1000kN', make: 'Instron', cal: '2025-08-01', due: '2026-08-01', days: 4, status: 'renewal' },
    { id: 'EQ-02', name: 'Compression Testing Machine 3000kN', make: 'Aimil', cal: '2026-01-15', due: '2027-01-15', days: 537, status: 'valid' },
    { id: 'EQ-03', name: 'Digital Vernier Caliper', make: 'Mitutoyo', cal: '2025-09-30', due: '2026-09-30', days: 64, status: 'valid' },
    { id: 'EQ-04', name: 'Ultrasonic Flaw Detector', make: 'Olympus', cal: '2026-02-20', due: '2027-02-20', days: 573, status: 'valid' },
    { id: 'EQ-05', name: 'Rebound Hammer', make: 'Proceq', cal: '2025-06-11', due: '2026-06-11', days: -47, status: 'expired' },
    { id: 'EQ-06', name: 'Digital Weighing Balance', make: 'Sartorius', cal: '2026-03-05', due: '2027-03-05', days: 586, status: 'valid' },
  ],

  staff: [
    { name: 'Nirav', role: 'Authorised Signatory (NDT)', qual: 'ASNT Level III', cert: 'AS-NDT-118', expiry: '2026-09-15', status: 'valid' },
    { name: 'Shivang', role: 'Technical Manager', qual: 'M.Tech Geotech', cert: 'TM-041', expiry: '2027-03-14', status: 'valid' },
    { name: 'Tushal', role: 'Quality Manager', qual: 'ISO 17025 Lead Auditor', cert: 'QM-009', expiry: '2027-03-14', status: 'valid' },
    { name: 'Hardik', role: 'Laboratory Head', qual: 'M.E. Civil (Structures)', cert: 'LH-001', expiry: '2027-03-14', status: 'valid' },
    { name: 'Jaydeep', role: 'CRM Manager', qual: 'MBA (Marketing)', cert: '—', expiry: '—', status: 'valid' },
  ],

  // User-created saved quotations (persisted by the Store layer)
  quotations: [],

  roles: ['Super Admin','Director','Laboratory Head','Quality Manager','Technical Manager','CRM Manager','Sales Executive','Tender Executive','Document Controller','Accounts Manager','Testing Engineer','Reviewer','Authorised Signatory','Technician','Customer Portal User'],
  perms: ['View','Create','Edit','Verify','Review','Approve','Issue','Download','Export','Delete','Archive','Share'],

  // Seed audit-trail entries (newest first). Live actions are appended on top and persisted to localStorage.
  seedAudit: [
    { ts: '2026-07-28 10:05', user: 'Jaydeep', role: 'CRM Manager',          action: 'Login',           module: 'Auth',        detail: 'Signed in from Surat (HO)' },
    { ts: '2026-07-28 09:41', user: 'Tushal',  role: 'Quality Manager',       action: 'Status Change',   module: 'Credentials', detail: 'ISO 9001:2015 marked Renewal Initiated' },
    { ts: '2026-07-28 09:12', user: 'Hardik',  role: 'Laboratory Head',       action: 'Login',           module: 'Auth',        detail: 'Signed in from Surat (HO)' },
    { ts: '2026-07-27 18:22', user: 'Nirav',   role: 'Authorised Signatory',  action: 'Approve',         module: 'Certifications', detail: 'Test report TC-8421 approved & issued' },
    { ts: '2026-07-27 16:48', user: 'Jaydeep', role: 'CRM Manager',           action: 'Create',          module: 'Quotations',  detail: 'Quotation PTH/QTN/2026/0091 created for L&T Construction' },
    { ts: '2026-07-27 15:10', user: 'Shivang', role: 'Technical Manager',     action: 'Create',          module: 'Enquiries',   detail: 'Enquiry ENQ-2044 logged — Gujarat Metro' },
    { ts: '2026-07-27 11:30', user: 'Hardik',  role: 'Laboratory Head',       action: 'Create',          module: 'User Management', detail: 'User Nirav created' },
    { ts: '2026-07-26 17:05', user: 'Tushal',  role: 'Quality Manager',       action: 'Export',          module: 'Reports',     detail: 'Exported compliance report (PDF)' },
  ],
};
