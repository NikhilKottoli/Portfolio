import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import RootLayout, { metadata } from '../../src/app/layout';
import HeroSection from '../../src/app/components/HeroSection';
import { getSiteUrl } from '../../src/lib/site';

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
    usePathname: () => '/',
}));

describe('root layout', () => {
    it('describes the site for search engines', () => {
        expect(metadata.title).toEqual({
            default: 'Nikhil Kottoli — Portfolio',
            template: '%s — Nikhil Kottoli',
        });
        expect(metadata.description).toContain('Software developer');
    });

    it('declares canonical, social card and author metadata', () => {
        expect(metadata.alternates?.canonical).toBe('/');
        expect(metadata.twitter?.images).toEqual([
            { url: '/opengraph-image', alt: 'Nikhil Kottoli — Portfolio' },
        ]);
        expect(metadata.authors).toEqual([
            { name: 'Nikhil Kottoli', url: getSiteUrl() },
        ]);
    });

    it('renders the navigation, the page and the footer', () => {
        // The layout owns the <html> element, so it is rendered to markup
        // rather than mounted into a container inside the document body.
        const html = renderToStaticMarkup(
            <RootLayout>
                <p>Page body</p>
            </RootLayout>,
        );

        expect(html).toContain('Page body');
        expect(html).toContain('<nav');
        expect(html).toContain('<footer');
        expect(html).toContain('lang="en"');
    });

    it('keeps the decorative scenery out of the way of assistive technology', () => {
        const html = renderToStaticMarkup(
            <RootLayout>
                <HeroSection />
            </RootLayout>,
        );

        expect(html).toContain('aria-hidden="true"');
    });

    it('keeps the command palette out of the prerendered markup', () => {
        // The palette is a client-only affordance: it must not add any markup
        // to the statically rendered layout.
        const html = renderToStaticMarkup(
            <RootLayout>
                <p>Page body</p>
            </RootLayout>,
        );

        expect(html).not.toContain('aria-modal="true"');
        expect(html).not.toContain('command-palette-search');
    });
});
