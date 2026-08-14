/* ============================================================
   LabCred CRM — Lightweight SVG Chart Engine
   Area chart, donut, semicircular gauge, sparklines
   ============================================================ */

const SVGNS = 'http://www.w3.org/2000/svg';
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function el(tag, attrs = {}) {
  const n = document.createElementNS(SVGNS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  return n;
}

/* ---------- Smooth path from points ---------- */
function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i], p1 = pts[i + 1];
    const cx = (p0[0] + p1[0]) / 2;
    d += ` C ${cx},${p0[1]} ${cx},${p1[1]} ${p1[0]},${p1[1]}`;
  }
  return d;
}

/* ---------- Area / line chart ---------- */
function areaChart(container, data, opts = {}) {
  container.innerHTML = '';
  const W = container.clientWidth || 720, H = opts.height || 300;
  const pad = { t: 18, r: 16, b: 30, l: 44 };
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', height: H, preserveAspectRatio: 'none' });
  svg.setAttribute('class','modern-data-chart');
  container.appendChild(svg);

  const fxId='chartGlow'+Math.random().toString(36).slice(2), fxDefs=el('defs'), fx=el('filter',{id:fxId,x:'-30%',y:'-30%',width:'160%',height:'160%'});
  fx.appendChild(el('feGaussianBlur',{stdDeviation:3,result:'blur'}));
  const merge=el('feMerge'); merge.appendChild(el('feMergeNode',{in:'blur'})); merge.appendChild(el('feMergeNode',{in:'SourceGraphic'})); fx.appendChild(merge); fxDefs.appendChild(fx); svg.appendChild(fxDefs);

  const allVals = data.series.flatMap(s => s.values);
  const max = Math.max(...allVals) * 1.12, min = 0;
  const innerW = W - pad.l - pad.r, innerH = H - pad.t - pad.b;
  const x = i => pad.l + (i / (data.labels.length - 1)) * innerW;
  const y = v => pad.t + innerH - ((v - min) / (max - min)) * innerH;

  // grid + y labels
  const gridN = 4;
  for (let g = 0; g <= gridN; g++) {
    const gy = pad.t + (g / gridN) * innerH;
    svg.appendChild(el('line', { x1: pad.l, y1: gy, x2: W - pad.r, y2: gy, stroke: 'var(--border)', 'stroke-width': 1, 'stroke-dasharray':'4 5', opacity:.82 }));
    const val = Math.round(max - (g / gridN) * max);
    const t = el('text', { x: pad.l - 8, y: gy + 4, 'text-anchor': 'end', fill: 'var(--text-muted)', 'font-size': 10.5 });
    t.textContent = val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val;
    svg.appendChild(t);
  }
  // x labels
  data.labels.forEach((lb, i) => {
    if(i<data.labels.length-1) svg.appendChild(el('line',{x1:x(i),y1:pad.t,x2:x(i),y2:pad.t+innerH,stroke:'var(--border)','stroke-width':.7,opacity:.28}));
    if (data.labels.length > 8 && i % 2 !== 0 && i !== data.labels.length - 1) return;
    const t = el('text', { x: x(i), y: H - 10, 'text-anchor': 'middle', fill: 'var(--text-muted)', 'font-size': 10.5 });
    t.textContent = lb;
    svg.appendChild(t);
  });

  const colors = ['var(--primary)', 'var(--info)', 'var(--warning)', 'var(--primary-dark)', '#7CC3FF'];
  data.series.forEach((s, si) => {
    const color = s.color || colors[si % colors.length];
    const pts = s.values.map((v, i) => [x(i), y(v)]);
    const linePath = smoothPath(pts);

    if (si === 0 && opts.fill !== false) {
      const gid = 'grad' + Math.random().toString(36).slice(2);
      const defs = el('defs');
      const lg = el('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 });
      lg.appendChild(el('stop', { offset: '0%', 'stop-color': color, 'stop-opacity': 0.42 }));
      lg.appendChild(el('stop', { offset: '52%', 'stop-color': color, 'stop-opacity': 0.13 }));
      lg.appendChild(el('stop', { offset: '100%', 'stop-color': color, 'stop-opacity': 0 }));
      defs.appendChild(lg); svg.appendChild(defs);
      const area = el('path', { d: `${linePath} L ${x(pts.length - 1)},${pad.t + innerH} L ${pad.l},${pad.t + innerH} Z`, fill: `url(#${gid})` });
      svg.appendChild(area);
    }

    const glow=el('path',{d:linePath,fill:'none',stroke:color,'stroke-width':si===0?7:5,opacity:.16,'stroke-linecap':'round',filter:`url(#${fxId})`});svg.appendChild(glow);
    const line = el('path', { d: linePath, fill: 'none', stroke: color, 'stroke-width': si === 0 ? 3 : 2.35, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
    svg.appendChild(line);
    if (!reduceMotion()) {
      const len = line.getTotalLength();
      line.style.strokeDasharray = len;
      line.style.strokeDashoffset = len;
      line.style.transition = `stroke-dashoffset ${900 + si * 120}ms cubic-bezier(0.22,0.61,0.36,1)`;
      requestAnimationFrame(() => { line.style.strokeDashoffset = 0; });
    }
    // luminous data points
    pts.forEach((p, i) => {
      const halo=el('circle',{cx:p[0],cy:p[1],r:7,fill:color,opacity:0});svg.appendChild(halo);
      const dot = el('circle', { cx: p[0], cy: p[1], r: si===0?3.6:2.8, fill: 'var(--surface)', stroke: color, 'stroke-width': 2.2, opacity: 0 });
      svg.appendChild(dot);
      setTimeout(() => { dot.style.transition = 'opacity 200ms'; dot.setAttribute('opacity', 0.9); }, reduceMotion() ? 0 : 900);
      dot.addEventListener('mouseenter',()=>{halo.setAttribute('opacity',.16);dot.setAttribute('r',si===0?5:4)});
      dot.addEventListener('mouseleave',()=>{halo.setAttribute('opacity',0);dot.setAttribute('r',si===0?3.6:2.8)});
    });
  });

  // hover tooltip
  const tip = document.createElement('div');
  tip.style.cssText = 'position:absolute;pointer-events:none;background:var(--black);color:#fff;padding:8px 11px;border-radius:9px;font-size:11.5px;opacity:0;transform:scale(0.9);transition:opacity 150ms,transform 150ms;z-index:5;box-shadow:var(--shadow-md);white-space:nowrap;';
  container.style.position = 'relative';
  container.appendChild(tip);
  const vline = el('line', { y1: pad.t, y2: pad.t + innerH, stroke: 'var(--text-muted)', 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0 });
  svg.appendChild(vline);

  const overlay = el('rect', { x: pad.l, y: pad.t, width: innerW, height: innerH, fill: 'transparent' });
  svg.appendChild(overlay);
  overlay.addEventListener('mousemove', (e) => {
    const rect = svg.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width * W;
    const i = Math.round(((px - pad.l) / innerW) * (data.labels.length - 1));
    if (i < 0 || i >= data.labels.length) return;
    vline.setAttribute('x1', x(i)); vline.setAttribute('x2', x(i)); vline.setAttribute('opacity', 1);
    let html = `<div style="font-weight:700;margin-bottom:4px">${data.labels[i]}</div>`;
    data.series.forEach((s, si) => {
      const color = s.color || colors[si % colors.length];
      const v = s.values[i];
      html += `<div style="display:flex;align-items:center;gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:${color}"></span>${s.name}: <b>${opts.fmtTip ? opts.fmtTip(v) : v}</b></div>`;
    });
    tip.innerHTML = html;
    const left = Math.min(Math.max(x(i) / W * rect.width - 40, 6), container.clientWidth - 150);
    tip.style.left = left + 'px';
    tip.style.top = (y(data.series[0].values[i]) / H * rect.height - 60) + 'px';
    tip.style.opacity = 1; tip.style.transform = 'scale(1)';
  });
  overlay.addEventListener('mouseleave', () => { tip.style.opacity = 0; tip.style.transform = 'scale(0.9)'; vline.setAttribute('opacity', 0); });
}

/* ---------- Donut chart ---------- */
function donutChart(container, segments, opts = {}) {
  container.innerHTML = '';
  const size = opts.size || 200, sw = opts.stroke || 26, r = (size - sw) / 2, cx = size / 2, cy = size / 2;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((a, s) => a + s.value, 0);
  const svg = el('svg', { viewBox: `0 0 ${size} ${size}`, width: size, height: size });
  svg.setAttribute('class','modern-donut-chart');
  svg.style.transform = 'rotate(-90deg)';
  container.appendChild(svg);
  svg.appendChild(el('circle', { cx, cy, r, fill: 'none', stroke: 'var(--surface-soft)', 'stroke-width': sw+3 }));
  svg.appendChild(el('circle', { cx, cy, r:r-sw/2-5, fill: 'none', stroke: 'var(--border)', 'stroke-width': 1, 'stroke-dasharray':'2 5', opacity:.7 }));

  let offset = 0;
  segments.forEach((s, i) => {
    const frac = s.value / total;
    const arc = el('circle', {
      cx, cy, r, fill: 'none', stroke: s.color, 'stroke-width': sw,
      'stroke-dasharray': `${Math.max(0,frac * C-3)} ${C}`, 'stroke-dashoffset': -offset, 'stroke-linecap': 'round',
    });
    if (!reduceMotion()) {
      arc.style.strokeDasharray = `0 ${C}`;
      setTimeout(() => { arc.style.transition = 'stroke-dasharray 800ms cubic-bezier(0.22,0.61,0.36,1)'; arc.style.strokeDasharray = `${Math.max(0,frac * C-3)} ${C}`; }, 100 + i * 90);
    }
    svg.appendChild(arc);
    arc.style.transition='stroke-width 220ms ease,opacity 220ms ease,filter 220ms ease';
    arc.addEventListener('mouseenter',()=>{arc.setAttribute('stroke-width',sw+5);arc.style.filter='drop-shadow(0 0 5px '+s.color+')'});
    arc.addEventListener('mouseleave',()=>{arc.setAttribute('stroke-width',sw);arc.style.filter='none'});
    offset += frac * C;
  });

  if (opts.center) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;inset:0;display:grid;place-items:center;text-align:center;';
    wrap.innerHTML = `<div><div style="font-size:26px;font-weight:700;letter-spacing:-0.02em">${opts.center}</div><div style="font-size:11px;color:var(--text-secondary)">${opts.centerSub || ''}</div></div>`;
    container.style.position = 'relative';
    container.appendChild(wrap);
  }
}

/* ---------- Semicircular segmented gauge ---------- */
function gaugeChart(container, score, segments) {
  container.innerHTML = '';
  const W = 240, H = 150, cx = W / 2, cy = 132, r = 96, sw = 18;
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', height: H });
  container.appendChild(svg);

  const polar = (ang) => [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
  const arcPath = (a0, a1) => {
    const [x0, y0] = polar(a0), [x1, y1] = polar(a1);
    const large = (a1 - a0) > Math.PI ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  };
  // background track
  svg.appendChild(el('path', { d: arcPath(Math.PI, 2 * Math.PI), fill: 'none', stroke: 'var(--surface-soft)', 'stroke-width': sw, 'stroke-linecap': 'round' }));

  const total = segments.reduce((a, s) => a + s.value, 0);
  let ang = Math.PI;
  segments.forEach((s) => {
    const frac = s.value / total;
    const a1 = ang + frac * Math.PI;
    const p = el('path', { d: arcPath(ang + 0.02, a1 - 0.02), fill: 'none', stroke: s.color, 'stroke-width': sw, 'stroke-linecap': 'round' });
    svg.appendChild(p);
    ang = a1;
  });

  // needle
  const needleAng = Math.PI + (score / 100) * Math.PI;
  const [nx, ny] = [cx + (r - 26) * Math.cos(needleAng), cy + (r - 26) * Math.sin(needleAng)];
  const needle = el('line', { x1: cx, y1: cy, x2: nx, y2: ny, stroke: 'var(--text-primary)', 'stroke-width': 3, 'stroke-linecap': 'round' });
  svg.appendChild(needle);
  svg.appendChild(el('circle', { cx, cy, r: 6, fill: 'var(--text-primary)' }));
  if (!reduceMotion()) {
    needle.style.transformOrigin = `${cx}px ${cy}px`;
    needle.style.transform = 'rotate(-90deg)';
    needle.style.transition = 'transform 1000ms cubic-bezier(0.22,0.61,0.36,1)';
    requestAnimationFrame(() => { needle.style.transform = 'rotate(0deg)'; });
  }
  const label = document.createElement('div');
  label.style.cssText = 'text-align:center;margin-top:-30px;position:relative;z-index:2;';
  label.innerHTML = `<div style="font-size:32px;font-weight:700;letter-spacing:-0.03em" class="counter" data-target="${score}">0</div><div style="font-size:11px;color:var(--text-secondary)">Compliance Score</div>`;
  container.appendChild(label);
}

/* ---------- Sparkline ---------- */
function sparkline(container, values, color) {
  const W = 78, H = 30;
  const max = Math.max(...values), min = Math.min(...values);
  const x = i => (i / (values.length - 1)) * W;
  const y = v => H - 2 - ((v - min) / (max - min || 1)) * (H - 4);
  const pts = values.map((v, i) => [x(i), y(v)]);
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H });
  const gid = 'sg' + Math.random().toString(36).slice(2);
  const defs = el('defs');
  const lg = el('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 });
  lg.appendChild(el('stop', { offset: '0%', 'stop-color': color, 'stop-opacity': 0.25 }));
  lg.appendChild(el('stop', { offset: '100%', 'stop-color': color, 'stop-opacity': 0 }));
  defs.appendChild(lg); svg.appendChild(defs);
  const d = smoothPath(pts);
  svg.appendChild(el('path', { d: `${d} L ${W},${H} L 0,${H} Z`, fill: `url(#${gid})` }));
  svg.appendChild(el('path', { d, fill: 'none', stroke: color, 'stroke-width': 1.8, 'stroke-linecap': 'round' }));
  container.appendChild(svg);
}

/* ---------- Animated counters ---------- */
function animateCounters(root = document) {
  if (reduceMotion()) {
    root.querySelectorAll('.counter').forEach(c => {
      const t = parseFloat(c.dataset.target);
      c.textContent = c.dataset.format ? window.fmt(t, c.dataset.format) : t;
    });
    return;
  }
  root.querySelectorAll('.counter').forEach(c => {
    const target = parseFloat(c.dataset.target);
    const fmt = c.dataset.format;
    const dur = 900, start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      c.textContent = fmt ? window.fmt(val, fmt) : Math.round(val).toLocaleString('en-IN');
      if (p < 1) requestAnimationFrame(step);
      else c.textContent = fmt ? window.fmt(target, fmt) : Math.round(target).toLocaleString('en-IN');
    }
    requestAnimationFrame(step);
  });
}
