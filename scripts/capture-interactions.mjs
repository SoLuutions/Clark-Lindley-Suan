#!/usr/bin/env node
/**
 * scripts/capture-interactions.mjs
 *
 * Captures 16:10 (1440×900) WebP poster screenshots for all seven interactive
 * concept studies in /interactions/*.html after their entrance animations settle.
 *
 * Usage:
 *   node scripts/capture-interactions.mjs
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const POSTERS_DIR = path.join(ROOT_DIR, 'interactions', 'posters');

const DEMOS = [
  { slug: 'things-i-love', settleMs: 4200 },
  { slug: 'quiet-cup',     settleMs: 2800 },
  { slug: 'maison-lorvert',settleMs: 2200 },
  { slug: 'corner-table',  settleMs: 2600 },
  { slug: 'atelier-rouge', settleMs: 1800 },
  { slug: 'verger',        settleMs: 4200 },
  { slug: 'momosato',      settleMs: 2800 }
];

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4':  'video/mp4',
  '.glb':  'model/gltf-binary',
  '.woff2':'font/woff2'
};

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    const fallbackPaths = [
      process.env.PLAYWRIGHT_MODULE_PATH,
      '/home/soluutions/.local/share/mise/installs/npm-playwright/1.64.1/node_modules/.mise/playwright@1.64.1/node_modules/playwright/index.mjs',
      '/home/soluutions/.local/share/mise/installs/npm-playwright/1.64.1/lib/node_modules/playwright/index.mjs'
    ].filter(Boolean);

    for (const candidate of fallbackPaths) {
      if (fs.existsSync(candidate)) {
        return await import(pathToFileURL(candidate).href);
      }
    }
    throw new Error('Could not resolve playwright module. Install playwright or set PLAYWRIGHT_MODULE_PATH.');
  }
}

function startStaticServer(rootDir) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const reqUrl = new URL(req.url, 'http://127.0.0.1');
        let relPath = decodeURIComponent(reqUrl.pathname);
        if (relPath.endsWith('/')) relPath += 'index.html';
        const safePath = path.normalize(path.join(rootDir, relPath));
        if (!safePath.startsWith(rootDir)) {
          res.writeHead(403);
          res.end('Forbidden');
          return;
        }
        if (!fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        const ext = path.extname(safePath).toLowerCase();
        res.writeHead(200, {
          'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
          'Cache-Control': 'no-cache'
        });
        fs.createReadStream(safePath).pipe(res);
      } catch (err) {
        res.writeHead(500);
        res.end(String(err));
      }
    });

    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({ server, port: address.port });
    });
  });
}

async function main() {
  fs.mkdirSync(POSTERS_DIR, { recursive: true });
  const { chromium } = await loadPlaywright();
  const { server, port } = await startStaticServer(ROOT_DIR);

  const launchOptions = {
    headless: true
  };
  if (fs.existsSync('/usr/bin/chromium')) {
    launchOptions.executablePath = '/usr/bin/chromium';
  }

  const browser = await chromium.launch(launchOptions);
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1
    });

    for (const demo of DEMOS) {
      const page = await context.newPage();
      const url = `http://127.0.0.1:${port}/interactions/${demo.slug}.html`;
      const errors = [];
      page.on('pageerror', (err) => errors.push(err.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      console.log(`Capturing ${demo.slug} at 1440×900...`);
      await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(demo.settleMs);

      const tmpPng = path.join(POSTERS_DIR, `${demo.slug}.tmp.png`);
      const outWebp = path.join(POSTERS_DIR, `${demo.slug}.webp`);

      await page.screenshot({ path: tmpPng, type: 'png' });

      execFileSync('magick', [tmpPng, '-quality', '84', outWebp]);
      fs.unlinkSync(tmpPng);

      const stat = fs.statSync(outWebp);
      console.log(`  -> Saved ${path.relative(ROOT_DIR, outWebp)} (${(stat.size / 1024).toFixed(1)} KB)`);
      if (errors.length > 0) {
        console.warn(`  ! Console/page errors on ${demo.slug}:`, errors);
      }
      await page.close();
    }

    await context.close();
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
