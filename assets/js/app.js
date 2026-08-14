q=savedQuotations.find(item=>item.number===number); if(!q)return; openModal(`<div class="modal-head"><div class="modal-title">Delete Quotation</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div><div class="modal-body"><p>Delete <b>${esc(number)}</b> for ${esc(q.customer)}? This cannot be undone.</p></div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" style="background:var(--danger)" onclick="confirmDeleteQuotation('${esc(number)}')">Delete</button></div>`); }
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
    if(!win){ const a=document.createElement('a'); a.href=url; a.download=`${q.number.replace(/\//g,'-')}.pdf`; document.body.appendChild(a); a.click(); a.remove();k');
    logAudit('Export','Quotations',`${q.number} generated as A4 PDF`);
  }catch(error){ toast('Could not generate PDF', error.message||'Please try again.','err'); }
  finally{ if(url) set=wrap(term,contentW,8);newPageIf(lines.length*10+3);
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
  if (count) count.textContent = html ? `Showing ${shownTests} test${shownTests === 1 ? '' : 's'} across ${shownCats} categor${shownCats === 1 ? 'y' : 'ies'}${term || sorCatFilter ? ' (filtered)' : ''}` : '';
}
/* ---------- SOR — add to quotation ---------- */
function sorAddTestToQuote(catId, idx) {
  const cat = sorCat(catId); if (!cat) return; const t = cat.tests[idx]; if (!t) return;
  quoteLines.push({ category: cat.name, name: t.name, parameters: [], code: t.code || '', qty: 1, unit: 'Sample', rate: t.rate != null ? t.rate : 0, sorRate:t.rate!=null?t.rate:null, rateText: t.rateText, onReq: t.rate == null, disc: t.rate != null ? quoteDiscountPct : 0 });
  toast('Added to quotation', `${t.name} · ${sorRateText(t)}`, 'ok');
}
function sorAddCategoryToQuote(catId) {
  const cat = sorCat(catId); if (!cat) return;
  cat.tests.forEach(t => quoteLines.push({ category: cat.name, name: t.name, parameters: [], code: t.code || '', qty: 1, unit: 'Sample', rate: t.rate != null ? t.rate : 0, sorRate:t.rate!=null?t.rate:null, rateText: t.rateText, onReq: t.rate == null, disc: t.rate != null ? quoteDiscountPct : 0 }));
  toast('Category added', `${cat.tests.length} tests from ${cat.name} added to quotation`, 'ok');
  logAudit('Create', 'Quotations', `Added SOR category "${cat.name}" (${cat.tests.length} tests) to quotation`);
}
function sorAddComboToQuote(catId, comboIdx) {
  const cat = sorCat(catId); if (!cat) return; const combo = quoteComboOptions(cat)[comboIdx]; if (!combo) return;
  quoteLines.push({ category: cat.name, name: `Package — ${combo.label}`, parameters: combo.tests.map(t => t.name), code: combo.code, qty: 1, unit: 'Package', rate: combo.rate, sorRate:combo.rate, rateText: String(combo.rate), onReq: false, disc: quoteDiscountPct });
  toast('Package added', `${combo.label} · ₹${combo.rate.toLocaleString('en-IN')}`, 'ok');
}
/* ---------- SOR — test CRUD ---------- */
function openSorTestModal(catId, idx) {
  const cat = sorCat(catId); if (!cat) return;
  const editing = idx != null && idx >= 0, t = editing ? cat.tests[idx] : { name: '', code: '', qty: '', rate: 0, rateText: '' };
  const onReq = t.rate == null;
  openModal(`<div class="modal-head"><div class="modal-title">${editing ? 'Edit Test' : 'Add Test'} — ${esc(cat.name)}</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <div class="field" id="st-name"><label>Name of Test <span class="req">*</span></label><input class="input" id="stName" value="${esc(t.name)}" placeholder="e.g. Compressive Strength"><div class="field-err">${I.info}Test name is required</div></div>
      <div class="form-grid"><div class="field"><label>IS Code Reference</label><input class="input" id="stCode" value="${esc(t.code || '')}" placeholder="e.g. IS 516"></div><div class="field"><label>Sample Quantity</label><input class="input" id="stQty" value="${esc(t.qty || '')}" placeholder="e.g. 3 Nos."></div></div>
      <div style="display:flex;align-items:center;gap:10px;padding:12px;background:var(--surface-soft);border:1px solid var(--border);border-radius:12px">
        <span class="toggle ${onReq ? 'on' : ''}" id="stOnReq" onclick="this.classList.toggle('on');const on=this.classList.contains('on');document.getElementById('stRate').disabled=on;document.getElementById('stRate').style.opacity=on?'.5':'1';document.getElementById('st-onreqtext').style.display=on?'block':'none'"></span>
        <div><div style="font-size:13px;font-weight:600">On request (no fixed rate)</div><div style="font-size:11.5px;color:var(--text-secondary)">Use for tests quoted case-by-case or bundled in a package</div></div>
      </div>
      <div class="field" style="margin-top:12px"><label>Rate excluding GST (₹)</label><input class="input tnum" id="stRate" type="number" min="0" value="${t.rate != null ? t.rate : ''}" ${onReq ? 'disabled style="opacity:.5"' : ''}></div>
      <div class="field" id="st-onreqtext" style="display:${onReq ? 'block' : 'none'}"><label>On-request label</label><input class="input" id="stRateText" value="${esc(onReq ? (t.rateText || 'On request') : '')}" placeholder="e.g. On request / Included in package"></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveSorTest(${cat.id},${editing ? idx : -1})">${I.check}${editing ? 'Save Changes' : 'Add Test'}</button></div>`);
}
function saveSorTest(catId, idx) {
  const cat = sorCat(catId); if (!cat) return;
  const name = document.getElementById('stName').value.trim();
  if (!name) { const f = document.getElementById('st-name'); f.classList.add('show-err'); const i = f.querySelector('.input'); i.classList.add('shake'); setTimeout(() => i.classList.remove('shake'), 350); return; }
  const onReq = document.getElementById('stOnReq').classList.contains('on');
  const rate = onReq ? null : Math.max(0, +document.getElementById('stRate').value || 0);
  const rec = { name, code: document.getElementById('stCode').value.trim(), qty: document.getElementById('stQty').value.trim(), rate, rateText: onReq ? (document.getElementById('stRateText').value.trim() || 'On request') : String(rate) };
  if (idx >= 0) { cat.tests[idx] = rec; logAudit('Edit', 'Schedule of Rates', `Updated "${name}" in ${cat.name}`); }
  else { cat.tests.push(rec); logAudit('Create', 'Schedule of Rates', `Added "${name}" to ${cat.name}`); }
  persistSOR(); closeModal(); toast(idx >= 0 ? 'Test updated' : 'Test added', `${name} · ${onReq ? 'On request' : '₹' + rate.toLocaleString('en-IN')}`); refreshSOR();
}
function deleteSorTest(catId, idx) {
  const cat = sorCat(catId); if (!cat) return; const t = cat.tests[idx]; if (!t) return;
  openModal(`<div class="modal-head"><div class="modal-title">Delete Test</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div><div class="modal-body"><p>Delete <b>${esc(t.name)}</b> from ${esc(cat.name)}? This cannot be undone.</p></div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" style="background:var(--danger)" onclick="confirmDeleteSorTest(${cat.id},${idx})">Delete</button></div>`);
}
function confirmDeleteSorTest(catId, idx) {
  const cat = sorCat(catId); if (!cat) return; const t = cat.tests[idx]; if (!t) return;
  cat.tests.splice(idx, 1); persistSOR(); closeModal(); toast('Test deleted', t.name, 'info'); logAudit('Delete', 'Schedule of Rates', `Deleted "${t.name}" from ${cat.name}`); refreshSOR();
}
/* ---------- SOR — category CRUD ---------- */
function openSorCategoryModal(catId) {
  const editing = catId != null, cat = editing ? sorCat(catId) : null;
  const nextId = Math.max(0, ...(window.SOR || []).map(c => c.id)) + 1;
  openModal(`<div class="modal-head"><div class="modal-title">${editing ? 'Edit Category' : 'Add Category'}</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div>
    <div class="modal-body">
      <div class="form-grid"><div class="field"><label>Category No.</label><input class="input tnum" id="scId" type="number" min="1" value="${editing ? cat.id : nextId}" ${editing ? 'readonly' : ''}></div><div class="field"></div></div>
      <div class="field" id="sc-name"><label>Category Name <span class="req">*</span></label><input class="input" id="scName" value="${editing ? esc(cat.name) : ''}" placeholder="e.g. CONCRETE & CEMENT TESTING"><div class="field-err">${I.info}Category name is required</div></div>
    </div>
    <div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveSorCategory(${editing ? cat.id : 'null'})">${I.check}${editing ? 'Save Changes' : 'Add Category'}</button></div>`);
}
function saveSorCategory(catId) {
  const name = document.getElementById('scName').value.trim();
  if (!name) { const f = document.getElementById('sc-name'); f.classList.add('show-err'); const i = f.querySelector('.input'); i.classList.add('shake'); setTimeout(() => i.classList.remove('shake'), 350); return; }
  if (catId != null) { const cat = sorCat(catId); if (cat) { cat.name = name; logAudit('Edit', 'Schedule of Rates', `Renamed category to "${name}"`); } }
  else {
    const id = Math.max(1, +document.getElementById('scId').value || (Math.max(0, ...(window.SOR || []).map(c => c.id)) + 1));
    if (sorCat(id)) { toast('Category exists', `Category ${id} already exists.`, 'err'); return; }
    window.SOR.push({ id, name, combos: [], tests: [] }); window.SOR.sort((a, b) => a.id - b.id);
    logAudit('Create', 'Schedule of Rates', `Added category "${name}"`);
  }
  persistSOR(); closeModal(); toast(catId != null ? 'Category updated' : 'Category added', name); sorCatFilter = ''; refreshSOR();
}
function deleteSorCategory(catId) {
  const cat = sorCat(catId); if (!cat) return;
  openModal(`<div class="modal-head"><div class="modal-title">Delete Category</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div><div class="modal-body"><p>Delete <b>${esc(cat.name)}</b> and its <b>${cat.tests.length} test${cat.tests.length === 1 ? '' : 's'}</b>? This cannot be undone.</p></div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" style="background:var(--danger)" onclick="confirmDeleteSorCategory(${cat.id})">Delete</button></div>`);
}
function confirmDeleteSorCategory(catId) {
  const i = (window.SOR || []).findIndex(c => c.id === +catId); if (i < 0) return;
  const cat = window.SOR[i]; window.SOR.splice(i, 1); persistSOR(); closeModal(); toast('Category deleted', cat.name, 'info'); logAudit('Delete', 'Schedule of Rates', `Deleted category "${cat.name}" (${cat.tests.length} tests)`); sorCatFilter = ''; refreshSOR();
}
/* ---------- SOR — export & reset ---------- */
function exportSOR() {
  const rows = [['Category ID', 'Category', 'Test Name', 'IS Code', 'Sample Qty', 'Rate', 'Rate Text']];
  (window.SOR || []).forEach(c => (c.tests || []).forEach(t => rows.push([c.id, c.name, t.name, t.code || '', t.qty || '', t.rate == null ? 'On request' : t.rate, t.rateText || ''])));
  downloadCSV(rows, `PTH-SOR-${window.SOR_META?.financialYear || '2026-27'}.csv`);
  logAudit('Export', 'Schedule of Rates', `Exported ${rows.length - 1} SOR rows to CSV`);
}
function resetSOR() {
  openModal(`<div class="modal-head"><div class="modal-title">Reset Schedule of Rates</div><button class="icon-btn drawer-close" onclick="closeModal()">${I.x}</button></div><div class="modal-body"><p>Restore the approved default SOR (${(window.SOR_DEFAULT || []).reduce((a, c) => a + c.tests.length, 0)} tests). All edits, additions and imports in this browser will be discarded.</p></div><div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" style="background:var(--danger)" onclick="confirmResetSOR()">Reset</button></div>`);
}
function confirmResetSOR() {
  window.SOR = JSON.parse(JSON.stringify(window.SOR_DEFAULT || [])); persistSOR(); closeModal(); sorCatFilter = ''; sorSearchTerm = '';
  toast('SOR reset', 'Restored to the approved default rates'); logAudit('Reset', 'Schedule of Rates', 'SOR restored to default'); refreshSOR();
}

/* ---------- ACCREDITATION SCOPE ---------- */
VIEWS.scope = function (c) {
  DB.scopes ||= [
    { name:'Concrete & Cement', standards:'IS 516, IS 4031', status:'valid' }, { name:'Soil & Rock', standards:'IS 2720, IS 13030', status:'valid' },
    { name:'Bitumen & Aggregates', standards:'IS 1201, IS 2386', status:'valid' }, { name:'Steel & Metals', standards:'IS 1608, IS 1786', status:'expiring' },
    { name:'Non-Destructive Testing', standards:'ASTM E164, IS 3658', status:'valid' }, { name:'Water & Environmental', standards:'IS 3025, APHA', status:'valid' },
  ];
  c.innerHTML = `${pageHead('Accreditation Scope', 'NABL-accredited test parameters and applicable standards.', `<button class="btn btn-ghost" onclick="openPdfBulkImport('scope')">${I.upload}Bulk Import PDFs</button><button class="btn btn-primary">${I.plus}Add Scope</button>`)}
    <div class="grid dash-grid enter">${DB.scopes.map(s=>`<div class="col-4"><div class="card card-pad hoverlift"><div class="card-head"><div class="appr-ico">${I.scope}</div><div style="margin-left:4px"><div style="font-weight:600">${esc(s.name)}</div></div><div style="margin-left:auto">${statusBadge(s.status)}</div></div><div class="page-desc" style="margin-top:10px">Standards: ${esc(s.standards)}</div><div style="margin-top:8px;font-size:12px;color:var(--text-secondary)">Discipline: Civil / Mechanical</div></div></div>`).join('')}</div>`;
};

/* ---------- CUSTOMER PORTAL ---------- */
VIEWS.portal = function (c) {
  c.innerHTML = `${pageHead('Client Portal', 'Client-facing preview: report status, downloads and QR verification.', '')}
    <div class="grid dash-grid">
      <div class="col-12"><div class="card card-pad enter" style="background:var(--black);color:#fff"><div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><div class="brand-logo" style="width:44px;height:44px">${brandMark()}</div><div><div style="font-size:16px;font-weight:600">Welcome, L&T Construction</div><div style="color:var(--text-muted);font-size:13px">3 reports ready for download · 1 in progress</div></div><button class="btn btn-lime" style="margin-left:auto" onclick="toast('QR verified','Certificate TC-8421 is valid & authentic','ok')">Verify Certificate</button></div></div></div>
      ${DB.certificates.customer.slice(0,4).map(cu=>`<div class="col-3"><div class="card card-pad hoverlift"><div class="appr-ico">${I.report}</div><div style="font-weight:600;margin-top:10px">${esc(cu.name)}</div><div class="page-desc tnum">${esc(cu.num)}</div><div style="margin-top:10px">${statusBadge(cu.stage==='Issued'?'issued':'review')}</div>${cu.stage==='Issued'?`<button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center;margin-top:10px" onclick="toast('Download started','${esc(cu.num)}.pdf','info')">${I.export}Download</button>`:''}</div></div>`).join('')}
    </div>`;
};

/* ---------- SETTINGS ---------- */
VIEWS.settings = function (c) {
  c.innerHTML = `${pageHead('Settings', 'Branding, roles, permissions and appearance.', '')}
    <div class="grid dash-grid">
      <div class="col-3"><div class="card card-pad enter"><div class="settings-nav"><a class="active">Branding</a><a>Quotation Layout</a><a>Roles & Permissions</a><a>Branches</a><a>Notifications</a><a>Security</a><a>Appearance</a></div></div></div>
      <div class="col-9">
        <div class="card card-pad enter" style="margin-bottom:16px"><div class="card-head"><h3>Product Branding</h3><div class="card-sub" style="margin-left:auto">Configurable identity</div></div>
          <div class="form-grid" style="margin-top:12px"><div class="field"><label>Product Name</label><input class="input" id="setName" value="${DB.brand.name}"></div><div class="field"><label>Company</label><input class="input" id="setCompany" value="${DB.brand.company}"></div></div>
          <div class="field"><label>Logo image URL <span style="color:var(--text-muted);font-weight:400">— e.g. assets/img/logo.png (leave blank to use the built-in mark)</span></label><input class="input" id="setLogo" value="${DB.brand.logoUrl || ''}" placeholder="assets/img/logo.png"></div>
          <div class="field"><label>Tagline</label><input class="input" value="${DB.brand.tagline}"></div>
          <div class="field"><label>Accent Colour <span style="color:var(--text-muted);font-weight:400">— PTH orange or lab lime</span></label><div class="swatch-row">${['#E8791E','#9DDB23','#22C55E','#3F8CFF','#8B5CF6','#F59E0B','#EF4444','#14B8A6'].map((col,i)=>`<div class="swatch ${i===1?'on':''}" style="background:${col}" onclick="setAccent('${col}',this)"></div>`).join('')}</div></div>
          <button class="btn btn-primary" onclick="applyBranding()">${I.check}Save Branding</button>
        </div>
        <div class="card card-pad enter" style="margin-bottom:16px" id="googleMapsSettings"><div class="card-head"><div><h3>Google Maps Satellite Integration</h3><div class="card-sub">Official Maps Embed API for the Surat activity dashboard</div></div><span class="badge ${googleMapsApiKey()?'badge-valid':'badge-expiring'}" style="margin-left:auto"><span class="dot"></span>${googleMapsApiKey()?'Configured':'Key Required'}</span></div><div class="field" style="margin-top:14px"><label>Google Maps Embed API key</label><div style="display:flex;gap:8px"><input class="input" id="googleMapsKey" type="password" value="${esc(googleMapsApiKey())}" placeholder="AIza…" autocomplete="off"><button class="btn btn-primary" onclick="saveGoogleMapsKey()">${I.check}Save Key</button></div><div class="page-desc" style="margin-top:7px">Enable Maps Embed API in Google Cloud and restrict the key to this application’s approved web origins. The key remains in this browser only.</div></div></div>
        <div class="card card-pad enter" style="margin-bottom:16px" id="quotationLayoutSettings"><div class="card-head"><div><h3>Quotation Layout Designer</h3><div class="card-sub">50 professional templates · editable header, footer, images, colours and typography</div></div><button class="btn btn-primary" style="margin-left:auto" onclick="saveQuotationLayout()">${I.check}Save Layout</button></div>
          <div class="form-grid" style="margin-top:14px"><div class="field"><label>Quotation header</label><input class="input" id="qlHeader" value="${esc(quotationLayout.header)}" oninput="previewQuotationLayout()"></div><div class="field"><label>Header subtitle</label><input class="input" id="qlSubheader" value="${esc(quotationLayout.subheader)}" oninput="previewQuotationLayout()"></div></div>
          <div class="field"><label>Footer text</label><textarea class="input" id="qlFooter" style="min-height:70px" oninput="previewQuotationLayout()">${esc(quotationLayout.footer)}</textarea></div>
          <div class="form-grid"><div class="field"><label>Logo URL</label><input class="input" id="qlLogo" value="${esc(quotationLayout.logoUrl||'')}" oninput="previewQuotationLayout()"></div><div class="field"><label>Font</label><select class="select" id="qlFont" onchange="previewQuotationLayout()">${['Inter','Arial','Georgia','Times New Roman'].map(x=>`<option ${quotationLayout.font===x?'selected':''}>${x}</option>`).join('')}</select></div></div>
          <div class="form-grid"><div class="field"><label>Upload header image</label><input class="input" type="file" accept="image/*" onchange="uploadQuotationAsset('headerImage',this)"></div><div class="field"><label>Upload footer image</label><input class="input" type="file" accept="image/*" onchange="uploadQuotationAsset('footerImage',this)"></div></div>
          <div class="form-grid"><div class="field"><label>Accent colour</label><input class="input" id="qlAccent" type="color" value="${quotationLayout.accent}" oninput="previewQuotationLayout()"></div><div class="field"><label>Background tint</label><input class="input" id="qlTint" type="color" value="${quotationLayout.tint}" oninput="previewQuotationLayout()"></div></div>
          <div class="ql-preview" id="qlPreview"></div>
          <div class="card-head" style="margin-top:18px"><h3>Professional Template Library</h3><span class="card-sub" style="margin-left:auto">${QUOTE_LAYOUTS.length} templates</span></div>
          <div class="ql-template-filters">${QUOTE_LAYOUT_CATEGORIES.map(cat=>`<button class="btn btn-ghost btn-sm" onclick="filterQuotationTemplates('${cat}',this)">${cat}</button>`).join('')}<button class="btn btn-ghost btn-sm" onclick="filterQuotationTemplates('',this)">Show All</button></div>
          <div class="ql-template-grid" id="qlTemplateGrid">${renderQuotationTemplateCards()}</div>
        </div>
        <div class="card card-pad enter"><div class="card-head"><h3>Roles & Permissions</h3></div>
          <div class="tbl-wrap" style="margin-top:12px"><table class="perm-grid"><thead><tr><th>Role</th>${DB.perms.slice(0,7).map(p=>`<th>${p}</th>`).join('')}</tr></thead>
          <tbody>${DB.roles.slice(0,8).map((role,ri)=>`<tr><td style="font-weight:600">${role}</td>${DB.perms.slice(0,7).map((p,pi)=>{const on=ri===0||pi<(8-ri);return `<td>${on?`<span style="color:var(--primary-dark)">${I.check}</span>`:`<span style="color:var(--text-muted)">–</span>`}</td>`;}).join('')}</tr>`).join('')}</tbody></table></div>
        </div>
      </div>
    </div>`;
  c.querySelectorAll('.settings-nav a').forEach(a => a.onclick = () => { c.querySelectorAll('.settings-nav a').forEach(x => x.classList.remove('active')); a.classList.add('active'); });
  previewQuotationLayout();
};
function setAccent(col, el) { document.querySelectorAll('.swatch').forEach(s => s.classList.remove('on')); el.classList.add('on'); document.documentElement.style.setProperty('--primary', col); }
function applyBranding() {
  DB.brand.name = document.getElementById('setName').value || DB.brand.name;
  DB.brand.company = document.getElementById('setCompany').value || DB.brand.company;
  DB.brand.logoUrl = document.getElementById('setLogo').value.trim();
  renderShell(); navigate('settings');
  toast('Branding updated', 'Logo and product identity applied across the app');
  logAudit('Edit', 'Settings', `Branding updated — product name "${DB.brand.name}"`);
}
function saveGoogleMapsKey(){const input=document.getElementById('googleMapsKey'),key=input?.value.trim()||'';if(key&&!/^AIza[\w-]{20,}$/.test(key)){toast('Check API key','Enter a valid Google Maps API key beginning with AIza.','err');return;}if(key)localStorage.setItem(GOOGLE_MAPS_KEY_STORAGE,key);else localStorage.removeItem(GOOGLE_MAPS_KEY_STORAGE);toast(key?'Google Maps configured':'Google Maps key removed',key?'Satellite view is now enabled on Overview.':'Satellite view will remain disabled.');logAudit('Edit','Settings',key?'Google Maps Embed API configured':'Google Maps API key removed');navigate('overview');}
function renderQuotationTemplateCards(category='') { return QUOTE_LAYOUTS.filter(t=>!category||t.category===category).map(t=>`<button class="ql-template ${quotationLayout.templateId===t.id?'selected':''}" onclick="selectQuotationTemplate('${t.id}')" style="--tpl-accent:${t.accent};--tpl-tint:${t.tint};--tpl-font:${t.font}"><span class="ql-template-band"></span><strong>${esc(t.name)}</strong><small>${t.id} · ${t.style}</small></button>`).join(''); }
function filterQuotationTemplates(category,button){ document.getElementById('qlTemplateGrid').innerHTML=renderQuotationTemplateCards(category); document.querySelectorAll('.ql-template-filters .btn').forEach(b=>b.classList.remove('btn-primary')); button.classList.add('btn-primary'); }
function selectQuotationTemplate(id){ const preset=QUOTE_LAYOUTS.find(t=>t.id===id); if(!preset)return; Object.assign(quotationLayout,{templateId:id,accent:preset.accent,tint:preset.tint,font:preset.font,style:preset.style}); document.getElementById('qlAccent').value=preset.accent; document.getElementById('qlTint').value=preset.tint; document.getElementById('qlFont').value=preset.font; document.querySelectorAll('.ql-template').forEach(card=>card.classList.toggle('selected',card.textContent.includes(id))); previewQuotationLayout(); }
function previewQuotationLayout(){ const header=document.getElementById('qlHeader'),preview=document.getElementById('qlPreview'); if(!header||!preview)return; quotationLayout.header=header.value; quotationLayout.subheader=document.getElementById('qlSubheader').value; quotationLayout.footer=document.getElementById('qlFooter').value; quotationLayout.logoUrl=document.getElementById('qlLogo').value.trim(); quotationLayout.font=document.getElementById('qlFont').value; quotationLayout.accent=document.getElementById('qlAccent').value; quotationLayout.tint=document.getElementById('qlTint').value; preview.innerHTML=`${quotationHeader()}<div class="ql-preview-body"><b>Quotation No. PTH/QTN/2026/0092</b><span>Client · Project · Test Category</span><div class="ql-preview-line"></div><div class="ql-preview-line short"></div></div>${quotationFooter()}`; }
function uploadQuotationAsset(key,input){ const file=input.files?.[0]; if(!file)return; if(file.size>1500000){toast('Image too large','Use an image below 1.5 MB.','err');input.value='';return;} const reader=new FileReader(); reader.onload=()=>{quotationLayout[key]=reader.result;previewQuotationLayout();toast('Image uploaded','Preview updated. Save the layout to apply it.');}; reader.readAsDataURL(file); }
function saveQuotationLayout(){ previewQuotationLayout(); localStorage.setItem(QUOTE_LAYOUT_KEY,JSON.stringify(quotationLayout)); toast('Quotation layout saved',`${QUOTE_LAYOUTS.find(t=>t.id===quotationLayout.templateId)?.name||'Custom layout'} applied to quotations`); logAudit('Edit','Settings',`Quotation layout ${quotationLayout.templateId} updated`); }

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
      <td class="cell-dim tnum" style="font-size:12px">${u.lastLogin&&u.lastLogin!=='—'?formatAppDateTime(u.lastLogin):'—'}</td>
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
        <div class="field" id="uf-username"><label>Username <span class="req">*</span></label><input class="input" id="uUsername" value="${editing ? esc(u.username) : ''}" placeholder="e.g. hardik"><div class="field-err">${Id('ePerson').value,prob:STAGE_PROB.new,prio:'med'};
  const duplicates=crmDuplicateLeads(cust,data.proj);if(duplicates.length){crmPendingLeadData=data;openModal(`<div class="modal-head"><div class="modal-title">Possible Duplicate Enquiry</div><button class="icon-btn drawer-close" onclick="crmPendingLeadData=null;closeModal()">${I.x}</button></div><div class="modal-body"><p>${duplicates.length} similar existing record${duplicates.length===1?' was':'s were'} found.</p>${duplicates.map(x=>`<div class="kv"><span class="v"><b>${esc(x.id)} · ${esc(x.cust)}</b><small style="display:block">${esc(x.proj)}</small></span></div>`).join('')}</div><div class="modal-foot"><button class="btn btn-ghost" onclick="crmPendingLeadData=null;closeModal()">Cancel</button><button class="btn btn-primary" onclick="crmConfirmDuplicateLead()">Create Separate Enquiry</button></div>`);return;}
  const lead = { id: nextLeadId(), follow: '—',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),...data };
  DB.pipeline.leads.push(lead); persistPipeline();
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
          <div class="field"><label>Password</label><input class="input" type="password" id="loginPass" value="${DEMO_PASSWORD}" autocomplete="current-password"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px"><label style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text-secondary)"><span class="toggle on" onclick="this.classList.toggle('on')"></span>Remember me</label><a style="font-size:12.5px;color:var(--primary-dark);font-weight:600">Forgot password?</a></div>
          <button class="btn btn-primary" style="width:100%;justify-content:center;padding:12px" onclick="doLogin()">Sign In ${I.arrowR}</button>
          <div style="text-align:center;margin:16px 0;color:var(--text-muted);font-size:12px">or</div>
          <button class="btn btn-ghost" style="width:100%;justify-content:center">${I.shield}Single Sign-On (SSO)</button>
          <p class="page-desc" style="text-align:center;margin-top:18px">Users: Hardik · Tushal · Shivang · Jaydeep · Nirav<br>Static preview access only · Production authentication requires a backend</p>
        </div>
      </div>
    </div>`;
}
function loginPickUser() {
  const uname = document.getElementById('loginUser').value;
  const u = DB.users.find(x => x.username === uname);
  if (u) document.getElementById('loginPass').value = u.password || DEMO_PASSWORD;
}
function doLogin() {
  const uname = document.getElementById('loginUser')?.value;
  const passInput = document.getElementById('loginPass');
  const password = passInput?.value || '';
  const u = DB.users.find(x => x.username === uname);
  if (!u || u.status !== 'active' || password !== (u.password || DEMO_PASSWORD)) {
    toast('Sign-in failed', 'Check the selected user and password.', 'err');
    passInput?.focus();
    return;
  }
  DB.user = { name: u.name, role: u.role, initials: u.initials };
  u.lastLogin = nowStamp();
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
Object.assign(window, { navigate, VIEWS, toast, openDrawer, closeDrawer, openModal, closeModal, openCredDrawer, openLeadDrawer, openQuotationDrawer, openExpiryDrawer, openCredentialModal, submitCredential, openEnquiryModal, submitEnquiry, togglePkg, toggleAllRows, setAccent, applyBranding, doLogin, loginPickUser, quickAddMenu, quoteFillTests, quoteAddLine, openCustomQuoteLine, addCustomQuoteLine, quoteAddFullSOR, confirmAddFullSOR, setQuoteDiscount, quoteSetLineRate, quoteSetLineDiscount, quoteApplyTermsTemplate, updateQuoteTermsText, renderQuoteLines, renderSOR, openUserModal, saveUser, toggleUserStatus, deleteUser, confirmDeleteUser, uSyncPass, renderUsersTable, renderAuditTable, exportAudit, setOverviewPeriod, exportOverview, saveQuotation, startNewQuotation, renderQuotationRegister, setQuotationFilter, updateQuotationStatus, duplicateQuotation, modifyQuotation, deleteQuotation, confirmDeleteQuotation, printQuotation, openQuotationSend, quotationForShare, generateQuotationPdfBlob, downloadQuotationPdf, shareQuotationPdf, formalQuotationMessage, gmailComposeUrl, emailQuotation, whatsappQuotation, renderQuotationTemplateCards, filterQuotationTemplates, selectQuotationTemplate, previewQuotationLayout, uploadQuotationAsset, saveQuotationLayout, logAudit, openFollowupModal, saveFollowup, completeFollowup, setFollowupFilter, syncFollowupCustomer, syncFollowupQuotation, exportFollowups, openFollowupDrawer, openCompleteFollowup, confirmCompleteFollowup, snoozeFollowup, deleteFollowup, confirmDeleteFollowup, launchFollowupChannel, newFollowupForCustomer, newFollowupForLead, newFollowupForQuote, updateFollowupBadge, enableFollowupReminders, notifyDueFollowups, setPipelineFilter, openLeadModal, saveLead, deleteLead, confirmDeleteLead, openWonModal, confirmWon, openLostModal, confirmLost, prepareQuotationForLead, setEnquiryFilter, exportEnquiries, setTenderFilter, openTenderModal, saveTender, openTenderDrawer, persistTenders, persistSOR, sorAddTestToQuote, sorAddCategoryToQuote, sorAddComboToQuote, openSorTestModal, saveSorTest, deleteSorTest, confirmDeleteSorTest, openSorCategoryModal, saveSorCategory, deleteSorCategory, confirmDeleteSorCategory, exportSOR, resetSOR, confirmResetSOR, openClientModal, saveClient, deleteClient, confirmDeleteClient, openClientDrawer, launchClientChannel, setClientFilter, setClientView, setClientSort, renderClients, exportClients, persistClients, persistPipeline });
Object.defineProperty(window, 'quoteLines', { get: () => quoteLines, set: v => { quoteLines = v; } });
