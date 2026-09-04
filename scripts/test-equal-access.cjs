const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require('node:path').join(__dirname, '../assets/js/app.js'), 'utf8');
function fn(name, context = {}) {
  const line = source.split(/\r?\n/).find(x => x.startsWith(`function ${name}(`));
  assert.ok(line, name);
  return vm.runInNewContext(`(${line})`, context);
}
test('all five staff roles have identical operational permissions', () => {
  for (const role of ['Director','Director','Director','Director','Sales Executive']) {
    const permission = fn('enterprisePermission', { enterpriseRole: () => role });
    for (const key of ['financial','pricing','allRecords','approve','configure']) assert.equal(permission(key), true);
  }
});
test('new quotations and credit risks never create approval requests', () => {
  assert.equal(fn('crmEvaluateQuotationApproval')({total:999999,discount:50}), null);
  assert.equal(fn('managementApproval')('Credit Risk','Client','Overdue',999999), null);
  assert.equal(fn('crmRuleEnabled')('rule-quote-approval'), false);
});
test('previously controlled quotations unlock without losing items or history', () => {
  const normalize = fn('unrestrictedQuotation');
  for (const status of ['approval_pending','approved','approval_rejected']) {
    const q = {number:'Q1',status,items:[{rate:100}],approvedVersion:'historical'};
    const updated = normalize(q);
    assert.equal(updated.status,'review'); assert.equal(updated.previousApprovalStatus,status);
    assert.equal(updated.items,q.items); assert.equal(updated.approvedVersion,'historical');
    assert.equal(q.status,status);
  }
  const won = {status:'won'}; assert.equal(normalize(won),won);
});
test('editing has no approval lock and lifecycle controls offer no approval states', () => {
  const edit = source.split(/\r?\n/).find(x => x.startsWith('function modifyQuotation('));
  assert.ok(!edit.includes("q.status==='approved'"));
  assert.ok(!edit.includes("q.status==='approval_pending'"));
  const drawer = source.split(/\r?\n/).find(x => x.startsWith('function openQuotationDrawer('));
  assert.ok(!drawer.includes('Approved & Locked'));
  assert.ok(drawer.includes('controlled=false'));
});
