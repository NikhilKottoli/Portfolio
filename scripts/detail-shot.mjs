import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000';
const OUT = process.env.OUT_DIR || '/tmp/detail2';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
});

const page = await context.newPage();
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });

await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);

const shot = async (name, selector, index = 0) => {
    const element = page.locator(selector).nth(index);
    if ((await element.count()) === 0) {
        console.log(`missing: ${selector}`);
        return;
    }
    await element.screenshot({ path: `${OUT}/${name}.png` });
};

await shot('meta-row', 'section:first-of-type dl');
await shot('heading', 'section:first-of-type h1');
await shot('trainer-art', 'section:first-of-type .pk-frame');
await shot('card-fields', '[aria-label="Trainer card"] dl');
await shot('nav-middle', 'header.site-nav nav ul');
await shot('skill-card', '#skills .grid > div', 0);
await shot('status-card', '#status .grid > div', 0);
await shot('adventure-row', '#status .grid > div', 1);
await shot('project-card', '#status article', 0);
await shot('award-card', '#achievements article', 0);
await shot('footer-inner', 'footer > div');

await browser.close();
console.log('done');
