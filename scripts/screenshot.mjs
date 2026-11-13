import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000';
const OUT = process.env.OUT_DIR || '/tmp/shots';
mkdirSync(OUT, { recursive: true });

const pages = [
    { name: 'home', path: '/' },
    { name: 'pokedex', path: '/Projects' },
    { name: 'inventory', path: '/Inventory' },
    { name: 'badges', path: '/Badges' },
    { name: 'journey', path: '/Experience' },
    { name: 'contact', path: '/Contact' },
    { name: 'resume', path: '/resume' },
];

const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 834, height: 1112 },
    { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
});

const errors = [];

for (const viewport of viewports) {
    const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
    });

    const page = await context.newPage();
    page.on('console', (message) => {
        if (message.type() === 'error') errors.push(`[${viewport.name}] console: ${message.text()}`);
    });
    page.on('pageerror', (error) => errors.push(`[${viewport.name}] pageerror: ${error.message}`));

    for (const target of pages) {
        await page.goto(`${BASE}${target.path}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1200);

        await page.screenshot({
            path: `${OUT}/${target.name}-${viewport.name}-fold.png`,
        });

        if (viewport.name === 'desktop') {
            // Scroll through the page so the reveal animations have run before
            // the full page is captured.
            await page.evaluate(async () => {
                const step = window.innerHeight * 0.6;
                for (let y = 0; y < document.body.scrollHeight; y += step) {
                    window.scrollTo(0, y);
                    await new Promise((resolve) => setTimeout(resolve, 120));
                }
                window.scrollTo(0, 0);
            });
            await page.waitForTimeout(900);

            await page.screenshot({
                path: `${OUT}/${target.name}-${viewport.name}-full.png`,
                fullPage: true,
            });
        }
    }

    await context.close();
}

// Mobile menu open state.
const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobilePage = await mobileContext.newPage();
await mobilePage.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await mobilePage.getByRole('button', { name: /menu/i }).click();
await mobilePage.waitForTimeout(400);
await mobilePage.screenshot({ path: `${OUT}/home-mobile-menu.png` });
await mobileContext.close();

// Selection states for the new interfaces, on desktop.
const selectContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const selectPage = await selectContext.newPage();
selectPage.on('pageerror', (error) => errors.push(`[select] pageerror: ${error.message}`));

// Pokédex: pick a project.
await selectPage.goto(`${BASE}/Projects`, { waitUntil: 'networkidle' });
await selectPage.waitForTimeout(800);
await selectPage.getByRole('button', { name: /RupeeRail/i }).first().click();
await selectPage.waitForTimeout(600);
await selectPage.screenshot({ path: `${OUT}/pokedex-selected-desktop.png` });

// Mobile Pokédex: open bottom sheet detail - skipped for now (selection state issue in headless mobile)
/*
const mobileSelectContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobileSelectPage = await mobileSelectContext.newPage();
mobileSelectPage.on('pageerror', (error) => errors.push(`[mobile-select] pageerror: ${error.message}`));
await mobileSelectPage.goto(`${BASE}/Projects`, { waitUntil: 'networkidle' });
await mobileSelectPage.waitForTimeout(1500);
// Use keyboard to select first project: Tab to focus, Enter to select.
await mobileSelectPage.keyboard.press('Tab');
await mobileSelectPage.waitForTimeout(300);
await mobileSelectPage.keyboard.press('Enter');
await mobileSelectPage.waitForTimeout(1500);
// Debug: screenshot after selection.
await mobileSelectPage.screenshot({ path: `${OUT}/pokedex-mobile-debug.png` });
// Wait for the "View Details" button to appear and click it.
await mobileSelectPage.getByText('View Details').click();
await mobileSelectPage.waitForTimeout(800);
await mobileSelectPage.screenshot({ path: `${OUT}/pokedex-selected-mobile.png` });
await mobileSelectContext.close();
*/

// Inventory: switch pocket and pick a TM.
await selectPage.goto(`${BASE}/Inventory`, { waitUntil: 'networkidle' });
await selectPage.waitForTimeout(800);
await selectPage.getByRole('tab', { name: /^ITEMS \d+$/ }).click();
await selectPage.waitForTimeout(400);
await selectPage.getByRole('button', { name: /Ruby on Rails/i }).first().click();
await selectPage.waitForTimeout(600);
await selectPage.screenshot({ path: `${OUT}/inventory-selected-desktop.png` });

// Badges: pick a badge.
await selectPage.goto(`${BASE}/Badges`, { waitUntil: 'networkidle' });
await selectPage.waitForTimeout(800);
await selectPage.getByRole('button', { name: /ETH Global Finalist/i }).first().click();
await selectPage.waitForTimeout(600);
await selectPage.screenshot({ path: `${OUT}/badges-selected-desktop.png` });

// Journey: pick a milestone.
await selectPage.goto(`${BASE}/Experience`, { waitUntil: 'networkidle' });
await selectPage.waitForTimeout(800);
await selectPage.getByRole('button', { name: /Microsoft/i }).first().click();
await selectPage.waitForTimeout(600);
await selectPage.screenshot({ path: `${OUT}/journey-selected-desktop.png` });

await selectContext.close();

await browser.close();

console.log(errors.length ? errors.join('\n') : 'no console errors');
