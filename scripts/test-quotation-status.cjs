const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../assets/js/app.js'), 'utf8');
function expression(name, context = {}) {
  const line = source.split(/\r?\n/).find(x => x.startsWith(`function ${name}(`));
  assert.ok(line, `Missing ${name}`);
  return vm.runInNewContext(`(${line})`, context);
}
const statuses = [['under_process','Under Process'],['won','Won'],['lost','Lost'],['no_answer','No Answer']];
test('legacy quotation statuses normalize to Under Process', () => {
  const normalize = expression('normalizeQuotationStatus');
  for (const old of ['review','submitted','negotiation','approval_pending','approved','approval_rejected',undefined]) assert.equal(normalize(old),'under_process');
  for (const current of ['under_process','won','lost','no_answer']) assert.equal(normalize(current),current);
});
test('all requested quotation statuses can be recorded', () => {
  const apply = expression('applyQuotationStatus',{QUOTATION_STATUS_OPTIONS:statuses,DB:{user:{name:'Nirav'}}});
  for (const status of ['under_process','won','no_answer']) {
    const q={status:'under_process'}; assert.equal(apply(q,status),true); assert.equal(q.status,status);
    assert.equal(q.statusUpdatedBy,'Nirav'); assert.equal(q.statusHistory.at(-1).to,status);
  }
});
test('Lost requires and stores a reason with audit metadata', () => {
  const apply = expression('applyQuotationStatus',{QUOTATION_STATUS_OPTIONS:statuses,DB:{user:{name:'Nirav'}}});
  const q={status:'under_process'};
  assert.equal(apply(q,'lost','  '),false); assert.equal(q.status,'under_process');
  assert.equal(apply(q,'lost','Client selected another laboratory'),true);
  assert.equal(q.status,'lost'); assert.equal(q.lostReason.reason,'Client selected another laboratory');
  assert.equal(q.lostReason.by,'Nirav'); assert.equal(q.statusHistory.at(-1).reason,q.lostReason.reason);
});
test('quotation UI exposes only the four requested statuses', () => {
  assert.match(source,/Change Quotation Status/);
  assert.match(source,/Reason for Lost/);
  assert.match(source,/A reason is mandatory/);
  const options=source.match(/const QUOTATION_STATUS_OPTIONS=([^;]+);/)[1];
  assert.ok(!/submitted|negotiation|review/.test(options));
  assert.equal((source.match(/function openQuotationDrawer\(/g)||[]).length,1);
});
