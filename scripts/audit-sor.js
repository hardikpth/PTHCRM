#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const sorPath = path.join(__dirname, '..', 'assets', 'js', 'sor.js');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(sorPath, 'utf8'), context, { filename: sorPath });

const sor = context.window.SOR;
const errors = [];
if (!Array.isArray(sor)) errors.push('window.SOR must be an array.');
if (Array.isArray(sor) && sor.length !== 0) errors.push(`Expected a clean manual catalogue; found ${sor.length} categories.`);

const result = {
  mode: 'manual-clean-start',
  categories: Array.isArray(sor) ? sor.length : null,
  tests: Array.isArray(sor) ? sor.reduce((count, category) => count + (category.tests || []).length, 0) : null,
  errors,
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = errors.length ? 1 : 0;
