#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const sorPath = path.join(__dirname, '..', 'assets', 'js', 'sor.js');

function loadSOR() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(sorPath, 'utf8'), context, { filename: sorPath });
  return context.window.SOR;
}

function fixShiftedColumns(category) {
  category.tests.forEach(test => {
    if (!/^(IS|ASTM|BS|EN|DIN|IRC|MORTH)\b/i.test(test.qty)) return;
    const context = test.name;
    test.name = `${test.code} — ${context}`;
    test.code = test.qty;
    test.qty = 'Not specified';
  });
}

function applyObjectiveFixes(sor) {
  [18, 22].forEach(id => fixShiftedColumns(sor.find(category => category.id === id)));

  [33, 34].forEach(id => {
    sor.find(category => category.id === id).tests.forEach(test => {
      if (!test.qty.trim()) test.qty = 'As per site scope';
    });
  });

  const replacements = new Map([
    ['Compressive Strength (Compete 3, 7 and 28 days cycle)', 'Compressive Strength (Complete 3, 7 and 28 days cycle)'],
    ['Combined Ferric Oxide and Alumina (R203)', 'Combined Ferric Oxide and Alumina (R2O3)'],
    ['Chloride (CI) Content', 'Chloride (Cl) Content'],
    ['Water Soluble Sulphate as SO3 (CI.10)', 'Water Soluble Sulphate as SO3 (Cl. 10)'],
    ['Water Soluble Sulphate as SO4 (CI.10)', 'Water Soluble Sulphate as SO4 (Cl. 10)'],
    ['Sulphate (SO) Content', 'Sulphate (SO3) Content'],
  ]);

  sor.forEach(category => category.tests.forEach(test => {
    if (replacements.has(test.name)) test.name = replacements.get(test.name);
  }));
}

function audit(sor) {
  const tests = sor.flatMap(category => category.tests.map((test, index) => ({
    ...test,
    categoryId: category.id,
    row: index + 1,
  })));
  const errors = [];
  const warnings = [];
  const ids = sor.map(category => category.id);

  if (sor.length !== 34) errors.push(`Expected 34 categories; found ${sor.length}.`);
  if (tests.length !== 310) errors.push(`Expected 310 tests; found ${tests.length}.`);
  if (new Set(ids).size !== ids.length) errors.push('Duplicate category IDs found.');
  if (ids.some((id, index) => id !== index + 1)) errors.push('Category IDs are not sequential from 1 to 34.');

  const rowKeys = new Map();
  tests.forEach(test => {
    ['name', 'code', 'qty', 'rateText'].forEach(field => {
      if (typeof test[field] !== 'string' || !test[field].trim()) {
        warnings.push(`Category ${test.categoryId}, row ${test.row}: missing ${field}.`);
      }
    });
    if (test.rate !== null && (!Number.isFinite(test.rate) || test.rate < 0)) {
      errors.push(`Category ${test.categoryId}, row ${test.row}: invalid rate.`);
    }
    const displayedRate = test.rateText.match(/\d[\d,]*/)?.[0]?.replace(/,/g, '');
    if (test.rate !== null && String(test.rate) !== displayedRate) {
      errors.push(`Category ${test.categoryId}, row ${test.row}: rate/rateText mismatch.`);
    }
    const key = `${test.categoryId}|${test.name.trim().toLowerCase()}|${test.code.trim().toLowerCase()}`;
    if (rowKeys.has(key)) errors.push(`Duplicate test rows: category ${test.categoryId}, rows ${rowKeys.get(key)} and ${test.row}.`);
    else rowKeys.set(key, test.row);
  });

  return {
    categories: sor.length,
    tests: tests.length,
    pricedTests: tests.filter(test => test.rate !== null).length,
    onRequestTests: tests.filter(test => test.rate === null).length,
    errors,
    warnings,
  };
}

const sor = loadSOR();
if (process.argv.includes('--fix')) {
  applyObjectiveFixes(sor);
  const output = '/* PTH CRM — Schedule of Rates FY 2026-27 (audited import; source: PTH_SOR_2026-27_Final_Complete.docx) */\n' +
    `window.SOR = ${JSON.stringify(sor)};\n`;
  fs.writeFileSync(sorPath, output, 'utf8');
}

const result = audit(sor);
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.errors.length ? 1 : 0;
