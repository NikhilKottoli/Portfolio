import { expect } from 'vitest';

/**
 * Every host the site is allowed to link out to. Adding a new destination
 * means adding it here as well, which keeps stray links from slipping in.
 */
const KNOWN_EXTERNAL_HOSTS = [
    'github.com',
    'gitlab.com',
    'devpost.com',
    'devspot.app',
    'dorahacks.io',
    'hfi2026.nitk.ac.in',
    'reviews.freebsd.org',
    'www.codechef.com',
    'www.linkedin.com',
    'codemasters-swart.vercel.app',
    '684f67f55264e77559942f2f--polkaflownikhil.netlify.app',
];

const PLACEHOLDER = /example\.(com|org)|localhost|TODO|FIXME|xxx|placeholder/i;

/**
 * Every link that opens a new tab must also carry `rel="noopener"`, and every
 * remote link must open in a new tab. Both rules are easy to break when a
 * link is added by hand and are invisible in the browser.
 */
export const expectSafeExternalLinks = (container: HTMLElement): void => {
    const newTabLinks = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'));

    for (const link of newTabLinks) {
        expect(link.getAttribute('rel') ?? '').toContain('noopener');
        expect(link.getAttribute('href') ?? '').toMatch(/^https:\/\//);
    }

    const remoteLinks = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'));

    for (const link of remoteLinks) {
        expect(link.getAttribute('target')).toBe('_blank');
    }
};

/**
 * Every remote link has to be a well formed address on a host the site is
 * allowed to use, and no two links may point at the same place.
 */
export const expectKnownExternalLinks = (container: HTMLElement): void => {
    const remoteLinks = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'));
    const seen = new Set<string>();

    for (const link of remoteLinks) {
        const href = link.getAttribute('href') ?? '';

        expect(() => new URL(href), `${href} is not a valid address`).not.toThrow();

        const url = new URL(href);

        expect(url.protocol, `${href} is not https`).toBe('https:');
        expect(KNOWN_EXTERNAL_HOSTS, `${href} points at an unknown host`).toContain(url.hostname);
        expect(href, `${href} still holds a placeholder`).not.toMatch(PLACEHOLDER);
        expect(seen.has(href), `${href} is used more than once`).toBe(false);

        seen.add(href);
    }
};

/** Images must always carry an `alt` attribute so assistive tech gets a usable description. */
export const expectImagesHaveAltText = (container: HTMLElement): void => {
    const images = Array.from(container.querySelectorAll('img'));

    for (const image of images) {
        expect(image).toHaveAttribute('alt');
    }
};

/** Decorative images should be hidden from assistive technology. */
export const expectDecorativeImagesAreHidden = (container: HTMLElement): void => {
    const images = Array.from(container.querySelectorAll('img[alt=""]'));

    for (const image of images) {
        expect(image).toHaveAttribute('aria-hidden', 'true');
    }
};
