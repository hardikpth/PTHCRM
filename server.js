#!/usr/bin/env node
/* ============================================================
   LabCred CRM — Zero-dependency local static server
   Run:  node server.js   (or  npm start)
   ============================================================ */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ROOT = __dirname;
const PORT = process.env.PORT || 5173;
const HOST = process.env.HOST || '127.0.0.1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

function safeJoin(base, target) {
  const targetPath = path.resolve(base, '.' + target);
  const relative = path.relative(base, targetPath);
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return targetPath;
}

const server = http.createServer((req, res) => {
  try {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Method Not Allowed');
      return;
    }

    let urlPath;
    try {
      urlPath = decodeURIComponent(req.url.split('?')[0]);
    } catch (_) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad Request');
      return;
    }
    if (urlPath === '/') urlPath = '/index.html';

    let filePath = safeJoin(ROOT, urlPath);
    if (!filePath) {
      res.writeHead(403); res.end('Forbidden'); return;
    }

    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        // Only extensionless browser routes get the SPA shell. Missing assets must be 404s.
        if (path.extname(urlPath)) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Not Found');
          return;
        }
        filePath = path.join(ROOT, 'index.html');
      }
      const ext = path.extname(filePath).toLowerCase();
      const type = MIME[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': type,
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer',
        // Defense-in-depth. Inline handlers/styles require 'unsafe-inline' for now;
        // object-src/base-uri/frame-ancestors still limit injection blast radius.
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src https://fonts.gstatic.com",
          "img-src 'self' data: blob:",
          "connect-src 'self'",
          "object-src 'none'",
          "base-uri 'none'",
          "frame-ancestors 'none'",
        ].join('; '),
      });
      if (req.method === 'HEAD') res.end();
      else fs.createReadStream(filePath).pipe(res);
    });
  } catch (e) {
    res.writeHead(500); res.end('Server error');
  }
});

server.listen(PORT, HOST, () => {
  const url = `http://${HOST}:${PORT}/`;
  console.log('\n  \x1b[1mPTH CRM\x1b[0m — Pramukh Test House · local server running');
  console.log('  ────────────────────────────────────────');
  console.log(`  ➜  Local:   \x1b[32m${url}\x1b[0m`);
  console.log(`  ➜  Direct:  ${url}?skip=1  (skip login/intro)`);
  console.log('\n  Press Ctrl+C to stop.\n');

  // Auto-open the default browser (Windows / macOS / Linux)
  if (!process.env.NO_OPEN) {
    const opener = process.platform === 'win32' ? `start "" "${url}"`
      : process.platform === 'darwin' ? `open "${url}"`
      : `xdg-open "${url}"`;
    const child = exec(opener, () => {});
    child.on('error', () => {});
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  Port ${PORT} is already in use. Try: set PORT=8080 && node server.js\n`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
