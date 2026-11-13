import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import RootLayout, { metadata } from '../../src/app/layout';
import HeroSection from '../../src/app/components/HeroSection';

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
    usePathname: () => '/',
}));

describe('root layout', () => {
    it('describes the site for search engines', () => {
        expect(metadata.title).toBe('Nikhil Kottoli — Portfolio');
        expect(metadata.description).toContain('Software developer');
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
});
