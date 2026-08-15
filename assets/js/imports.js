/* PTH CRM — Bulk import utilities (Excel/CSV data and named PDF records) */
'use strict';

const IMPORT_SPECS = {
  enquiries: {
    label: 'Enquiries',
    columns: ['Client', 'Project', 'Service', 'Value', 'Assigned', 'Follow Up', 'Stage'],
  },
  quotations: {
    label: 'Quotations',
    columns: ['Test Category', 'Test / Service', 'IS Code', 'Qty', 'Unit', 'Rate', 'Discount'],
  },
  sor: {
    label: 'Schedule of Rates',
    columns: ['Category ID', 'Category', 'Test Name', 'IS Code', 'Sample Qty', 'Rate', 'Rate Text'],
  },
  customers: {
    label: 'Clients',
    columns: ['Client Name', 'Category', 'Contact Person', 'Email', 'Phone'],
  },
};

const PDF_IMPORT_SPECS = {
  credentials: { label: 'Credentials', route: 'credentials' },
  scope: { label: 'Accreditation Scope', route: 'scope' },
};

const keyOf = value => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const rowValue = (row, ...aliases) => {
  const keyed = Object.fromEntries(Object.entries(row).map(([key, value]) => [keyOf(key), value]));
  for (const alias of aliases) if (keyOf(alias) in keyed) return keyed[keyOf(alias)];
  return '';
};
const numberValue = value => {
  const parsed = Number(String(value ?? '').replace(/[₹,\s]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
};

const PIPELINE_STAGE_ALIASES = {
  new:'new', enquiry:'new', inquiry:'new', review:'review', requirementreview:'review', underreview:'review',
  visit:'visit', sitevisit:'visit', prep:'prep', preparation:'prep', quotationpreparation:'prep',
  sent:'sent', submitted:'sent', quotationsubmitted:'sent', nego:'nego', negotiation:'nego',
  po:'po', purchaseorder:'po', purchaseorderawaited:'po', won:'won', lost:'lost',
};
const pipelineStageValue = value => PIPELINE_STAGE_ALIASES[keyOf(value)] || 'new';
const importDateValue = value => {
  const raw = String(value || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return '';
  const date = new Date(`${raw}T00:00:00`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== raw ? '' : raw;
};

function openDataImport(module) {
  const spec = IMPORT_SPECS[module];
  if (!spec) return;
  openModal(`
    <div class="modal-head"><div class="modal-title">Import ${spec.label}</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <div style="padding:12px;border:1px solid var(--border);border-radius:12px;background:var(--surface-soft);margin-bottom:14px">
        <div style="font-weight:600;font-size:13px">Excel or CSV format</div>
        <div class="page-desc" style="margin-top:4px">First row must contain column headings. Required template columns:</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">${spec.columns.map(c => `<span class="badge badge-neutral">${c}</span>`).join('')}</div>
      </div>
      <div class="field"><label>Select file <span class="req">*</span></label><input class="input" id="bulkDataFile" type="file" accept=".xlsx,.xls,.csv,.ods"></div>
      <div class="page-desc">The first worksheet will be imported. Blank rows are ignored. Existing prototype data is retained and imported rows are appended or updated.</div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="downloadImportTemplate('${module}')">Download CSV Template</button><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="runDataImport('${module}')">${I.upload}Import</button></div>`);
}

function downloadImportTemplate(module) {
  const spec = IMPORT_SPECS[module];
  const csv = spec.columns.map(value => `"${value.replace(/"/g, '""')}"`).join(',') + '\r\n';
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `PTH_${spec.label.replace(/\s+/g, '_')}_Import_Template.csv`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

async function runDataImport(module) {
  const file = document.getElementById('bulkDataFile')?.files?.[0];
  if (!file) { toast('Select an import file', 'Excel or CSV file is required.', 'err'); return; }
  if (!window.XLSX) { toast('Excel importer unavailable', 'Reload the application and try again.', 'err'); return; }
  try {
    const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array', cellDates: false });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false }).filter(row => Object.values(row).some(value => String(value).trim()));
    if (!rows.length) { toast('Nothing to import', 'The first worksheet contains no data rows.', 'err'); return; }
    const imported = applyDataImport(module, rows);
    closeModal();
    toast('Bulk import completed', `${imported} ${IMPORT_SPECS[module].label.toLowerCase()} row${imported === 1 ? '' : 's'} imported.`);
    logAudit('Bulk Import', IMPORT_SPECS[module].label, `${imported} rows imported from ${file.name}`);
    refreshImportRoute(module);
  } catch (error) {
    toast('Import failed', error.message || 'The workbook could not be read.', 'err');
  }
}

function applyDataImport(module, rows) {
  if (module === 'enquiries') {
    rows.forEach((row, index) => DB.pipeline.leads.push({
      id: `L-${Date.now().toString().slice(-6)}-${index + 1}`,
      col: pipelineStageValue(rowValue(row, 'Stage')),
      cust: String(rowValue(row, 'Client', 'Client Name', 'Customer', 'Customer Name')).trim() || 'Unnamed Client',
      proj: String(rowValue(row, 'Project')).trim() || 'Imported Enquiry',
      cat: String(rowValue(row, 'Service', 'Category')).trim() || 'General',
      val: numberValue(rowValue(row, 'Value', 'Expected Value')),
      person: String(rowValue(row, 'Assigned', 'Responsible')).trim() || 'Unassigned',
      prob: 20, prio: 'med', follow: String(rowValue(row, 'Follow Up', 'Follow-up')).trim() || '—',
    }));
    if (window.persistPipeline) window.persistPipeline();
  } else if (module === 'quotations') {
    rows.forEach(row => {
      const rateRaw = rowValue(row, 'Rate');
      const rate = numberValue(rateRaw);
      const onReq = /request|demand/i.test(String(rateRaw)) || !rate;
      quoteLines.push({
        category: String(rowValue(row, 'Test Category', 'Category')).trim() || 'Imported Services',
        name: String(rowValue(row, 'Test / Service', 'Test', 'Service')).trim() || 'Imported Service',
        code: String(rowValue(row, 'IS Code', 'Standard')).trim(),
        qty: Math.max(1, numberValue(rowValue(row, 'Qty', 'Quantity')) || 1),
        unit: String(rowValue(row, 'Unit', 'UOM')).trim() || 'Sample',
        disc: onReq ? 0 : Math.min(100, Math.max(0, numberValue(rowValue(row, 'Discount', 'Discount %', 'Disc')))),
        rate, rateText: onReq ? 'On request' : String(rate), onReq,
      });
    });
  } else if (module === 'sor') {
    rows.forEach(row => {
      const id = Math.max(1, Math.round(numberValue(rowValue(row, 'Category ID', 'Category No'))));
      const categoryName = String(rowValue(row, 'Category')).trim() || `Imported Category ${id}`;
      let category = window.SOR.find(item => item.id === id);
      if (!category) { category = { id, name: categoryName, combos: [], tests: [] }; window.SOR.push(category); }
      const name = String(rowValue(row, 'Test Name', 'Name of Test', 'Test')).trim();
      if (!name) throw new Error('Every SOR row requires a Test Name.');
      const rateRaw = rowValue(row, 'Rate');
      const rate = numberValue(rateRaw);
      const onReq = /request|demand/i.test(String(rateRaw)) || !rate;
      const test = {
        name, code: String(rowValue(row, 'IS Code', 'Standard')).trim(),
        qty: String(rowValue(row, 'Sample Qty', 'Quantity')).trim() || 'Not specified',
        rate: onReq ? null : rate,
        rateText: String(rowValue(row, 'Rate Text')).trim() || (onReq ? 'On request' : String(rate)),
      };
      const existing = category.tests.findIndex(item => keyOf(item.name) === keyOf(name) && keyOf(item.code) === keyOf(test.code));
      if (existing >= 0) category.tests[existing] = test; else category.tests.push(test);
    });
    window.SOR.sort((a, b) => a.id - b.id);
    if (window.persistSOR) window.persistSOR();
  } else if (module === 'customers') {
    DB.customers ||= [];
    rows.forEach(row => {
      const name = String(rowValue(row, 'Client Name', 'Client', 'Customer Name', 'Customer')).trim();
      if (!name) throw new Error('Every client row requires a Client Name.');
      const record = {
        name, cat: String(rowValue(row, 'Category', 'Industry')).trim() || 'General',
        contact: String(rowValue(row, 'Contact Person', 'Contact')).trim(),
        email: String(rowValue(row, 'Email')).trim(), phone: String(rowValue(row, 'Phone', 'Mobile')).trim(),
        gst: String(rowValue(row, 'GST', 'GSTIN', 'Registration')).trim(), address: String(rowValue(row, 'Address', 'City')).trim(),
      };
      const existing = DB.customers.findIndex(item => keyOf(item.name) === keyOf(name));
      if (existing >= 0) DB.customers[existing] = record; else DB.customers.push(record);
    });
    if (window.persistClients) window.persistClients();
  }
  return rows.length;
}

function refreshImportRoute(module) {
  const route = module === 'sor' ? 'sor' : module === 'quotations' ? 'createquotation' : module;
  if (module === 'quotations') { navigate('createquotation'); return; }
  if (state.route === route && window.VIEWS?.[route]) VIEWS[route](document.getElementById('canvas'));
}

function openPdfBulkImport(module) {
  const spec = PDF_IMPORT_SPECS[module];
  if (!spec) return;
  openModal(`
    <div class="modal-head"><div class="modal-title">Bulk Import ${spec.label} PDFs</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <div style="padding:12px;border:1px solid var(--border);border-radius:12px;background:var(--surface-soft);margin-bottom:14px">
        <div style="font-weight:600;font-size:13px">One PDF = one named record</div>
        <div class="page-desc" style="margin-top:4px">Use the particular record name as the filename. Example: <b>NABL Accreditation Certificate.pdf</b>. Underscores are converted to spaces.</div>
      </div>
      ${module === 'credentials' ? '<div class="field"><label>Data Category <span class="req">*</span></label><select class="select" id="bulkPdfDataCategory"><option>Technical Data</option><option>Financial Data</option></select></div>' : ''}
      <div class="field"><label>Select PDF files <span class="req">*</span></label><input class="input" id="bulkPdfFiles" type="file" accept="application/pdf,.pdf" multiple></div>
      <div class="page-desc">Duplicate filenames in the same module are skipped. PDF contents remain local to this browser session.</div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="runPdfBulkImport('${module}')">${I.upload}Import PDFs</button></div>`);
}

function pdfRecordName(filename) {
  return filename.replace(/\.pdf$/i, '').replace(/[_]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function runPdfBulkImport(module) {
  const files = [...(document.getElementById('bulkPdfFiles')?.files || [])];
  if (!files.length) { toast('Select PDF files', 'At least one named PDF is required.', 'err'); return; }
  if (files.some(file => file.type !== 'application/pdf' && !/\.pdf$/i.test(file.name))) { toast('PDF files only', 'Remove non-PDF files and try again.', 'err'); return; }
  DB.documentImports ||= {};
  DB.documentImports[module] ||= [];
  let added = 0;
  files.forEach(file => {
    const name = pdfRecordName(file.name);
    if (!name || DB.documentImports[module].some(record => keyOf(record.name) === keyOf(name))) return;
    const documentRecord = { name, filename: file.name, size: file.size, url: URL.createObjectURL(file), importedAt: new Date().toISOString(), dataCategory: document.getElementById('bulkPdfDataCategory')?.value || 'Technical Data' };
    DB.documentImports[module].push(documentRecord);
    addPdfModuleRecord(module, documentRecord);
    added += 1;
  });
  closeModal();
  toast('PDF import completed', `${added} named PDF record${added === 1 ? '' : 's'} added to ${PDF_IMPORT_SPECS[module].label}.`);
  logAudit('Bulk PDF Import', PDF_IMPORT_SPECS[module].label, `${added} named PDF records imported`);
  navigate(PDF_IMPORT_SPECS[module].route);
}

function addPdfModuleRecord(module, record) {
  if (module === 'credentials') {
    DB.credentials.push({ id: `CR-${String(DB.credentials.length + 1).padStart(4, '0')}`, name: record.name, dataCategory: record.dataCategory, cat: 'Imported PDF', auth: 'Pending classification', cert: record.filename, branch: DB.branches[0], issue: new Date().toISOString().slice(0, 10), expiry: '—', days: 9999, person: DB.user.name, status: 'review', verified: false, conf: 'Internal', documentUrl: record.url });
    if (window.persistCredentials) window.persistCredentials();
  } else if (module === 'approvals') {
    DB.approvalWorkflow.push({ name: record.name, auth: 'Imported PDF', stage: 0, service: record.filename, person: DB.user.name, documentUrl: record.url });
  } else if (module === 'certifications') {
    DB.certificates.org.push({ name: record.name, num: record.filename, authority: 'Pending classification', status: 'review', expiry: '—', documentUrl: record.url });
  } else if (module === 'scope') {
    DB.scopes ||= [];
    DB.scopes.push({ name: record.name, standards: 'See imported PDF', status: 'review', documentUrl: record.url });
    if (window.persistScopes) window.persistScopes();
  }
}

Object.assign(window, { openDataImport, runDataImport, downloadImportTemplate, openPdfBulkImport, runPdfBulkImport });
