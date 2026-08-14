enter enter-3" style="height:100%">
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
  const sg=ovGroup(open,x=>x.cat); ovBars('ovServiceBars',Object.entries(sg).map(([label,a])=>({label,value:a.reduce((s,x)=>s+(+x.val||0),0),count:a.length})).sort((a,b)=>b.value-a.value),inr,x=>`${x.count} open`);
  const fg=ovGroup(fus,x=>x.channel); ovBars('ovFollowupBars',Object.entries(fg).map(([label,a])=>({label,value:a.length,done:a.filter(x=>x.status==='completed').length,late:a.filter(x=>x.status!=='completed'&&followupTiming(x)==='overdue').length})).sort((a,b)=>b.value-a.value),v=>`${v} actions`,x=>`${ovPercent(x.done,x.value)}% done · ${x.late} late`);
  const clients=allClients().map(x=>({label:x.name,value:clientMetrics(x.name).openValue})).sort((a,b)=>b.value-a.value); ovBars('ovClientBars',clients,inr);
  const tg=ovGroup(tenders,x=>x.stage); ovDonut('ovTenderPie','ovTenderLegend',Object.entries(tg).map(([label,a])=>({label,value:a.length})),'Tenders');
  const og=ovGroup(open,x=>x.person); ovBars('ovOwnerBars',Object.entries(og).map(([label,a])=>({label,value:a.reduce((s,x)=>s+(+x.val||0)*(+x.prob||0)/100,0),count:a.length})).sort((a,b)=>b.value-a.value),inr,x=>`${x.count} open`);
  const tests=(window.SOR||[]).flatMap(x=>x.tests||[]), priced=tests.filter(x=>x.rate!=null); ovDonut('ovSorPie','ovSorLegend',[{label:'Fixed Rate',value:priced.length,color:'var(--primary)'},{label:'On Request',value:tests.length-priced.length,color:'var(--warning)'}],'SOR Services');
}

let suratMapType = 'all';
const GOOGLE_MAPS_KEY_STORAGE = 'pth_google_maps_embed_key';
function googleMapsApiKey(){ return localStorage.getItem(GOOGLE_MAPS_KEY_STORAGE)||''; }
const SURAT_ZONES = [
  {name:'Adajan',x:31,y:35},{name:'Rander',x:39,y:18},{name:'Katargam',x:54,y:20},{name:'Varachha',x:70,y:32},
  {name:'Vesu',x:42,y:73},{name:'Athwa',x:43,y:55},{name:'Udhna',x:62,y:68},{name:'Pandesara',x:55,y:84},
  {name:'Hazira',x:14,y:61},{name:'Palsana',x:79,y:84},{name:'Kamrej',x:86,y:28},{name:'Olpad',x:17,y:20}
];
function suratZoneFor(text) { let h=0; for(const ch of String(text||'')) h=(h*31+ch.charCodeAt(0))>>>0; return SURAT_ZONES[h%SURAT_ZONES.length]; }
function suratMapActivities() {
  const leads=DB.pipeline.leads||[], items=[];
  leads.filter(x=>x.col!=='lost').forEach(x=>items.push({type:'inquiry',person:x.person||'Unassigned',customer:x.cust,detail:x.proj,value:+x.val||0,zone:suratZoneFor(x.cust+x.proj),leadId:x.id}));
  followups.filter(x=>['Site Visit','Meeting'].includes(x.channel)).forEach(x=>{const lead=leads.find(l=>l.id===x.leadId);items.push({type:x.channel==='Site Visit'?'visit':'meeting',person:lead?.person||x.assignee||'Unassigned',customer:x.customer,detail:x.subject,value:lead?.val||0,zone:suratZoneFor(x.customer+x.subject),leadId:x.leadId});});
  leads.filter(x=>x.col==='won').forEach(x=>items.push({type:'closed',person:x.person||'Unassigned',customer:x.cust,detail:x.proj,value:+x.val||0,zone:suratZoneFor(x.cust+x.proj+'closed'),leadId:x.id}));
  return items;
}
function initSuratActivityMap() {
  const select=document.getElementById('suratOwnerFilter'); if(!select)return;
  const people=[...new Set(suratMapActivities().map(x=>x.person))].sort(); select.innerHTML='<option value="all">All persons</option>'+people.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('');
  renderSuratActivityMap();
}
function setSuratMapType(type) { suratMapType=type; document.querySelectorAll('#suratTypeFilter button').forEach(x=>x.classList.toggle('on',x.dataset.maptype===type)); renderSuratActivityMap(); }
function renderSuratActivityMap() {
  const host=document.getElementById('suratMap'); if(!host)return; const owner=document.getElementById('suratOwnerFilter')?.value||'all';
  const all=suratMapActivities(), rows=all.filter(x=>(owner==='all'||x.person===owner)&&(suratMapType==='all'||x.type===suratMapType));
  const offsets={inquiry:[-1.8,-1.8],visit:[1.8,-1.8],meeting:[-1.8,1.8],closed:[1.8,1.8]};
  const apiKey=googleMapsApiKey(), satellite=apiKey?`<iframe class="surat-google-map" title="Google Maps satellite view of Surat" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" src="https://www.google.com/maps/embed/v1/view?key=${encodeURIComponent(apiKey)}&center=21.1702%2C72.8311&zoom=12&maptype=satellite&language=en&region=IN"></iframe>`:`<div class="surat-map-config"><div>${I.map||I.info}</div><h3>Google Satellite Map Ready</h3><p>Add a Google Maps Embed API key in Settings to load the official Surat satellite view.</p><button class="btn btn-primary" onclick="navigate('settings')">Configure Google Maps ${I.arrowR}</button></div>`;
  host.innerHTML=`${satellite}<svg class="surat-activity-overlay ${apiKey?'':'map-unconfigured'}" viewBox="0 0 900 520" role="img" aria-label="CRM activity markers over Surat satellite map">${rows.map((x,i)=>{const o=offsets[x.type],cx=x.zone.x*9+o[0]*i%14,cy=x.zone.y*5.2+o[1]*i%14;return `<g class="surat-marker ${x.type}" transform="translate(${cx} ${cy})" onclick="${x.leadId?`openLeadDrawer('${esc(x.leadId)}')`:''}"><circle r="12"/><circle r="4" class="marker-core"/><title>${esc(x.customer)} · ${esc(x.detail)} · ${esc(x.person)} · ${inr(x.value)}</title></g>`}).join('')}</svg><div class="surat-map-badge">GOOGLE SATELLITE · SURAT</div><a class="surat-map-open" href="https://www.google.com/maps/search/?api=1&query=Surat%2C%20Gujarat" target="_blank" rel="noopener">Open in Google Maps ↗</a>`;
  const counts={inquiry:0,visit:0,meeting:0,closed:0};rows.forEach(x=>counts[x.type]++); const labels={inquiry:'Enquiries',visit:'Site Visits',meeting:'Meetings',closed:'Closed Works'},stats=document.getElementById('suratMapStats'); if(stats)stats.innerHTML=Object.entries(counts).map(([k,v])=>`<div class="map-stat ${k}"><strong class="tnum">${v}</strong><span>${labels[k]}</span></div>`).join('');
  const pg=ovGroup(rows,x=>x.person), list=document.getElementById('suratPersonList');
  const personRows=Object.entries(pg).sort((a,b)=>b[1].length-a[1].length).map(([p,a])=>`<button onclick="document.getElementById('suratOwnerFilter').value='${esc(p)}';renderSuratActivityMap()"><span class="avatar">${esc(p.replace(/[^A-Z]/g,'').slice(0,2)||p.slice(0,2))}</span><b>${esc(p)}</b><small>${a.length} activities · ${inr(a.reduce((s,x)=>s+x.value,0))}</small></button>`).join('');
  if(list)list.innerHTML=`<div class="map-side-title">Person-wise activity</div>${personRows||'<div class="empty bi-empty"><h4>No activity for this filter</h4></div>'}`;
}

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
      <div class="tl-right"><div class="tl-days ${e.days < 7 ? 'crit' : e.days < 30 ? 'warn' : ''}">${e.days < 0 ? 'Expired' : e.days + 'd'}</div><div class="tl-meta">${formatAppDate(e.expiry)}</div></div>
    </div>`).join('');
}

function openExpiryDrawer(name) {
  const e = DB.expiries.find(x => x.name === name) || DB.expiries[0];
  openDrawer(`
    <div class="drawer-head">
      <button clask="confirmDeleteLead('${id}')">Delete</button></div>`);
}
function confirmDeleteLead(id) {
  const i = DB.pipeline.leads.findIndex(x => x.id === id); if (i < 0) return;
  const l = DB.pipeline.leads[i]; DB.pipeline.leads.splice(i, 1); persistPipeline(); closeModal(); closeDrawer();
  toast('Lead deleted', l.cust, 'info'); logAudit('Delete', 'CRM Pipeline', `${l.cust} lead deleted`);
  if (state.route === 'enquiries') VIEWS.enquiries(document.getElementById('canvas'));
  else VIEWS.pipeline(document.getElementById('canvas'));
}
function openLeadDrawer(id) {
  const l = DB.pipeline.leads.find(x => x.id === id); if (!l) return;
  const intelligence=crmLeadScore(l),health=crmDealHealth(l);
  const stage = DB.pipeline.columns.find(x => x.id === l.col);
  const leadFollowups = followups.filter(f => f.leadId === l.id);
  const quotes = (savedQuotations || []).filter(q => String(q.customer).toLowerCase() === String(l.cust).toLowerCase());
  openDrawer(`
    <div class="drawer-head"><button class="icon-btn drawer-close" onclick="closeDrawer()">${I.x}</button>
      <div style="font-size:12px;color:var(--text-muted)">${esc(l.id)} · ${esc(l.cat)}</div>
      <div style="font-size:19px;font-weight:600;margin:3px 0 4px">${esc(l.cust)}</div>
      <div class="page-desc">${esc(l.proj)}</div>
      <div style="margin-top:10px">${statusBadge(l.col === 'won' ? 'won' : l.col === 'lost' ? 'lost' : l.col === 'sent' ? 'submitted' : 'review')} <span class="badge badge-neutral" style="margin-left:6px"><span class="dot" style="background:${stage?.color || 'var(--text-muted)'}"></span>${esc(stage?.name || l.col)}</span></div></div>
    <div class="drawer-tabs"><button class="drawer-tab active" data-tab="ov">Overview</button><button class="drawer-tab" data-tab="in">Intelligence</button><button class="drawer-tab" data-tab="fu">Follow-ups (${leadFollowups.length})</button><button class="drawer-tab" data-tab="ac">Activity</button></div>
    <div class="drawer-body">
      <div class="drawer-pane" id="pane-ov">
        <div class="kv"><span class="k">Expected Value</span><span class="v">${inr(l.val)}</span></div>
        <div class="kv"><span class="k">Probability</span><span class="v">${l.prob}%</span></div>
        <div class="kv"><span class="k">Weighted</span><span class="v">${inr(l.val * (l.prob || 0) / 100)}</span></div>
        <div class="kv"><span class="k">Assigned To</span><span class="v">${esc(l.person)}</span></div>
        <div class="kv"><span class="k">Priority</span><span class="v"><span class="prio prio-${l.prio === 'high' ? 'high' : l.prio === 'med' ? 'med' : 'low'}">${esc(l.prio)}</span></span></div>
        ${l.po ? `<div class="kv"><span class="k">Purchase Order</span><span class="v">${esc(l.po.number)} · ${inr(l.po.value)}</span></div>` : ''}
        ${l.lostReason ? `<div class="kv"><span class="k">Lost Reason</span><span class="v">${esc(l.lostReason.reason)}</span></div>${l.lostReason.notes ? `<div style="margin-top:8px;padding:10px;border-radius:10px;background:var(--surface-soft);border:1px solid var(--border);font-size:13px">${esc(l.lostReason.notes)}</div>` : ''}` : ''}
        <div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-primary" style="flex:1;justify-content:center" onclick="closeDrawer();newFollowupForLead('${esc(l.id)}')">${I.clock}Schedule Follow-up</button><button class="btn btn-ghost" style="flex:1;justify-content:center" onclick="closeDrawer();prepareQuotationForLead('${esc(l.id)}')">${I.quote}Prepare Quotation</button></div>
        <div style="display:flex;gap:8px;margin-top:8px"><button class="btn btn-ghost" style="flex:1;justify-content:center" onclick="openLeadModal('${esc(l.id)}')">${I.edit}Edit Lead</button><button class="btn btn-ghost" style="flex:1;justify-content:center;color:var(--danger)" onclick="deleteLead('${esc(l.id)}')">${I.x}Delete</button></div>
      </div>
      <div class="drawer-pane" id="pane-in" style="display:none"><div class="crm-intel-hero"><span class="crm-score ${intelligence.band.toLowerCase()}">${intelligence.score}</span><div><b>${intelligence.band} opportunity</b><small style="display:block;color:${health.color}">${health.level} · ${health.age} days since activity</small></div></div><div class="kv"><span class="k">Next best action</span><span class="v">${esc(intelligence.next)}</span></div><div class="kv"><span class="k">Recommended owner</span><span class="v">${esc(crmRecommendOwner(l.cat))}</span></div><div class="kv"><span class="k">Weighted forecast</span><span class="v">${inr(l.val*(l.prob||0)/100)}</span></div><div style="margin-top:12px"><b>Score factors</b>${intelligence.reasons.map(x=>`<div class="page-desc" style="margin-top:6px">${I.check} ${esc(x)}</div>`).join('')||'<div class="page-desc">Insufficient engagement data.</div>'}</div><button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:16px" onclick="closeDrawer();openCadenceModal('${l.id}')">${I.clock}Start Sales Cadence</button></div>
      <div class="drawer-pane" id="pane-fu" style="display:none"><button class="btn btn-primary" style="width:100%;justify-content:center;margin-bottom:14px" onclick="closeDrawer();newFollowupForLead('${esc(l.id)}')">${I.plus}New Follow-up</button>${followupHistoryHTML(leadFollowups)}</div>
      <div class="drawer-pane" id="pane-ac" style="display:none">${leadActivityHTML(l, leadFollowups, quotes)}</div>
    </div>`);
}
// Real activity trail for a lead — derived from its stage, follow-ups and linked quotations.
function leadActivityHTML(l, leadFollowups, quotes) {
  const events = [];
  if (l.po) events.push({ t: `Order won — PO ${l.po.number}`, m: inr(l.po.value), when: l.po.wonAt });
  if (l.lostReason) events.push({ t: `Marked lost — ${l.lostReason.reason}`, m: l.lostReason.notes || '', when: l.lostReason.lostAt });
  quotes.forEach(q => events.push({ t: `Quotation ${q.number}`, m: `₹${Number(q.total || 0).toLocaleString('en-IN')} · ${q.status}`, when: q.date }));
  leadFollowups.forEach(f => events.push({ t: `${f.status === 'completed' ? 'Follow-up completed' : 'Follow-up scheduled'} — ${f.subject}`, m: `${f.channel} · ${followupDateTimeLabel(f)}${f.outcome ? ` · ${f.outcome}` : ''}`, when: f.completedAt || f.due }));
  events.sort((a, b) => String(b.when || '').localeCompare(String(a.when || '')));
  if (!events.length) return `<div class="empty" style="padding:28px"><div class="empty-ico">${I.clock}</div><h4>No activity yet</h4><p>Schedule a follow-up or prepare a quotation.</p></div>`;
  return `<div class="timeline">${events.map((e, i) => `<div class="tl-item"><div class="tl-rail"><span class="tl-dot" style="background:var(--primary-dark)"></span>${i < events.length - 1 ? '<span class="tl-line"></span>' : ''}</div><div class="tl-body"><div class="tl-title" style="font-size:12.5px">${esc(e.t)}</div><div class="tl-meta">${esc(e.m || '')}${e.when ? ` · ${esc(formatFollowupDate(String(e.when).slice(0,10)))}` : ''}</div></div></div>`).join('')}</div>`;
}
function prepareQuotationForLead(id) {
  const l = DB.pipeline.leads.find(x => x.id === id);
  startNewQuotation(l ? l.cust : '');
}

/* ---------- FOLLOW-UP MANAGEMENT ---------- */
const FOLLOWUP_KEY = 'pth_followups_v1';
let followupFilter = { search: '', status: 'open', priority: 'all', assignee: 'all' };
let followupReturnRoute = 'followups';
let followups = (() => {
  try { const saved = JSON.parse(localStorage.getItem(FOLLOWUP_KEY)); if (Array.isArray(saved)) return saved; } catch (e) {}
  return [];
})();
function persistFollowups() { localStorage.setItem(FOLLOWUP_KEY, JSON.stringify(followups)); updateFollowupBadge(); }
function localDateISO(date = new Date()) { const d = new Date(date.getTime() - date.getTimezoneOffset() * 60000); return d.toISOString().slice(0, 10); }
function nextFollowupId() { return `FU-${String(Math.max(0, ...followups.map(f => +String(f.id).replace(/\D/g, '') || 0)) + 1).padStart(4, '0')}`; }
function openFollowups() { return followups.filter(f => f.status !== 'completed'); }
function followupDueCount() { const today = localDateISO(); return openFollowups().filter(f => f.due <= today).length; }
function followupDateTimeLabel(f) { return `${formatFollowupDate(f.due)}${f.time ? ` · ${formatAppTime(f.time)}` : ''}`; }
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
  const leads = DB.pipeline.leads.filter(l => canViewCrmRecord(l)&&!['won','lost'].includes(l.col));llowupHistoryHTML(related)}</div>
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
      <div class="drawer-pane" id="pane-au" style="display:none"><div class="timeline">${['Created by K. Patel','Verified by ><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveSorTest(${cat.id},${editing ? idx : -1})">${I.check}${editing ? 'Save Changes' : 'Add Test'}</button></div>`);
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
      <div class="col-12"><div class="card card-pad enter"><div class="empty"><div class="empty-ico">${I.portal}</div><h4>No client portal records yet</h4><p>Issued customer certificates and reports will appear here.</p></div></div></div>
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
          <div class="field"><label>Tagline</label><input class="input" id="setTagline" value="${DB.brand.tagline}"></div>
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
function setAccent(col, el) { document.querySelectorAll('.swatch').forEach(s => s.classList.remove('on')); el.classList.add('on'); DB.brand.accent=col; document.documentElement.style.setProperty('--primary', col); }
function applyBranding() {
  DB.brand.name = document.getElementById('setName').value || DB.brand.name;
  DB.brand.company = document.getElementById('setCompany').value || DB.brand.company;
  DB.brand.logoUrl = document.getElementById('setLogo').value.trim();
  DB.brand.tagline = document.getElementById('setTagline').value.trim();
  persistBranding();
  renderShell(); navigate('settings');
  toast('Branding updated', 'Logo and product identity applied across the app');
  logAudit('Edit', 'Settings', `Branding updated — product name "${DB.brand.name}"`);
}
function saveGoogleMapsKey(){const input=document.getElementById('googleMapsKey'),key=input?.value.trim()||'';if(key&&!/^AIza[\w-]{20,}$/.test(key)){toast('Check API key','Enter a valid Google Maps API key beginning with AIza.','err');return;}if(key)localStorage.setItem(GOOGLE_MAPS_KEY_STORAGE,key);else localStorage.removeItem(GOOGLE_MAPS_KEY_STORAGE);toast(key?'Google Maps configured':'Google Maps key removed',key?'Satellite view is now enabled on Overview.':'Satellite view will remain disabled.');logAudit('Edit','Settings',key?'Google Maps Embed API configured':'Google Maps API key removed');navigate('overview');}
function renderQuotationTemplateCards(category='') { return QUOTE_LAYOUTS.filter(t=>!category||t.category===category).map(t=>`<button class="ql-template ${quotationLayout.templateId===t.id?'selected':''}" onclick="selectQuotationTemplate('${t.id}')" style="--tpl-accent:${t.accent};--tpl-tint:${t.tint};--tpl-font:${t.font}"><span class="ql-template-band"></span><strong>${esc(t.name)}</strong><small>${t.id} · ${t.style}</small></button>`).join(''); }
function filterQuotationTemplates(category,button){ document.getElementById('qlTemplateGrid').innerHTML=renderQuotationTemplateCards(category); document.querySelectorAll('.ql-template-filters .btn').forEach(b=>b.classList.remove('btn-primary')); button.classList.add('btn-primary'); }
function selectQuotationTemplate(id){ const preset=QUOTE_LAYOUTS.find(t=>t.id===id); if(!preset)return; Object.assign(quotationLayout,{templateId:id,accent:preset.accent,tint:preset.tint,font:preset.font,style:preset.style}); document.getElementById('qlAccent').value=preset.accent; document.getElementById('qlTint').value=preset.tint; document.getElementById('qlFont').value=preset.font; document.querySelectorAll('.ql-template').forEach(card=>card.classList.toggle('selected',card.textContent.includes(id))); previewQuotationLayout(); }
function previewQuotationLayout(){ const header=document.getElementById('qlHeader'),preview=document.getElementById('qlPreview'); if(!header||!preview)return; quotationLayout.header=header.value; quotationLayout.subheader=document.getElementById('qlSubheader').value; quotationLayout.footer=document.getElementById('qlFooter').value; quotationLayout.logoUrl=document.getElementById('qlLogo').value.trim(); quotationLayout.font=document.getElementById('qlFont').value; quotationLayout.accent=document.getElementById('qlAccent').value; quotationLayout.tint=document.getElementById('qlTint').value; preview.innerHTML=`${quotationHeader()}<div class="ql-preview-body"><b>Quotation No. ${esc(nextQuotationNumber())}</b><span>Client Name · Kind Attention · Test Category</span><div class="ql-preview-line"></div><div class="ql-preview-line short"></div></div>${quotationFooter()}`; }
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
        <div class="field" id="uf-username"><label>Username <span class="req">*</span></label><input class="input" id="uUsername" value="${editing ? esc(u.username) : ''}" placeholder="e.g. hardik"><div class="field-err">${I.info}Username is required</div></div>
      </div>
      <div class="form-grid"><div class="field" id="uf-email"><label>Email <span class="req">*</span></label><input class="input" id="uEmail" value="${editing ? esc(u.email) : ''}" placeholder="name@pramukhtesthouse.com"><div class="field-err">${I.info}Valid email is required</div></div><div class="field"><label>Mobile Number</label><input class="input" id="uPhone" value="${editing ? esc(u.phone||'') : ''}" placeholder="+91-9876543210"></div></div>
      <div class="form-grid">
        <div class="field"><label>Role</label><select class="select" id="uRole">${DB.roles.map(r => `<option ${editing && u.role === r ? 'selected' : ''}>${r}</option>`).join('')}</select></div>
        <div class="field"><label>Branch</label><select class="select" id="uBranch">${DB.branches.map(b => `<option ${editing && u.branch === b ? 'selected' : ''}>${b}</option>`).join('')}</select></div>
      </div>
      <div class="field"><label>Password</label><input class="input" id="uPass" type="password" oninput="this.dataset.touched=1" placeholder="${editing ? 'Leave blank to keep unchanged' : 'Enter a preview password'}"><div style="font-size:11.5px;color:var(--text-muted);margin-top:5px">Preview-only password; production authentication requires a backend.</div></div>
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
    if (!pass.dataset.touched) pass.value = DEMO_PASSWORD;
    if (uname && !uname.value) uname.value = name.toLowerCase().replace(/\s+/g, '');
  }
}
function saveUser() {
  const id = document.getElementById('uId').value;
  const name = document.getElementById('uName').value.trim();
  const username = document.getElementById('uUsername').value.trim();
  const email = document.getElementById('uEmail').value.trim();
  const phone = document.getElementById('uPhone').value.trim();
  const password = document.getElementById('uPass')?.value.trim() || '';
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
    Object.assign(u, { name, username, email, phone, role, branch, status, initials });
    if (password) u.password = password;
    toast('User updated', `${name} · ${role}`);
    logAudit('Edit', 'User Management', `User ${name} (${role}) updated`);
  } else {
    const num = (Math.max(0, ...DB.users.map(u => +u.id.split('-')[1] || 0)) + 1).toString().padStart(3, '0');
    DB.users.push({ id: 'U-' + num, name, username, email, phone, role, branch, status, initials, password: password || DEMO_PASSWORD, lastLogin: '—' });
    toast('User created', `${name} · ${role}`);
    logAudit('Create', 'User Management', `User ${name} (${role}) created`);
  }
  persistUsers();
  closeModal();
  renderUsersTable(document.getElementById('userSearch')?.value || '');
  // refresh stat strip counts
  VIEWS.users(document.getElementById('canvas'));
}
function toggleUserStatus(id) {
  const u = DB.users.find(x => x.id === id);
  u.status = u.status === 'active' ? 'disabled' : 'active';
  persistUsers();
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
