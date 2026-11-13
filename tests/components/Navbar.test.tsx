import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavBar from '../../src/app/components/Navbar';
import { SoundProvider } from '../../src/app/components/SoundProvider';

const { pathState } = vi.hoisted(() => ({ pathState: { current: '/' } }));

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: vi.fn() }),
    usePathname: () => pathState.current,
}));

const NAV_DESTINATIONS = [
    { name: 'TRAINER CARD', path: '/' },
    { name: 'POKÉDEX', path: '/Projects' },
    { name: 'INVENTORY', path: '/Inventory' },
    { name: 'BADGES', path: '/Badges' },
    { name: 'JOURNEY', path: '/Experience' },
    { name: 'CONTACT', path: '/Contact' },
];

describe('NavBar', () => {
    beforeEach(() => {
        pathState.current = '/';

        Object.defineProperty(document.documentElement, 'scrollHeight', {
            configurable: true,
            value: 2000,
        });
        Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 });
        Object.defineProperty(window, 'scrollY', { configurable: true, value: 0, writable: true });
    });

    it('shows the maker of the site', () => {
        render(<SoundProvider><NavBar /></SoundProvider>);

        expect(screen.getByText('Nikhil')).toBeInTheDocument();
        expect(screen.getByText('Kottoli')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: /Nikhil Kottoli — home/i }),
        ).toBeInTheDocument();
    });

    it('offers a destination for every section', () => {
        render(<SoundProvider><NavBar /></SoundProvider>);

        for (const { name, path } of NAV_DESTINATIONS) {
            expect(screen.getByRole('link', { name })).toHaveAttribute('href', path);
        }
    });

    it('uses a unique destination for every section', () => {
        const paths = NAV_DESTINATIONS.map((item) => item.path);

        expect(new Set(paths).size).toBe(paths.length);
    });

    it('marks the destination of the current route', () => {
        pathState.current = '/Projects';

        render(<SoundProvider><NavBar /></SoundProvider>);

        expect(screen.getByRole('link', { name: 'POKÉDEX' })).toHaveAttribute(
            'aria-current',
            'page',
        );
        expect(screen.getByRole('link', { name: 'TRAINER CARD' })).not.toHaveAttribute('aria-current');
    });

    it('opens and closes the mobile menu', async () => {
        const user = userEvent.setup();
        render(<SoundProvider><NavBar /></SoundProvider>);

        const trigger = screen.getByRole('button', { name: /menu/i });
        expect(trigger).toHaveAttribute('aria-expanded', 'false');

        await user.click(trigger);
        expect(trigger).toHaveAttribute('aria-expanded', 'true');

        await user.click(trigger);
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('repeats the destinations inside the mobile menu', async () => {
        const user = userEvent.setup();
        render(<SoundProvider><NavBar /></SoundProvider>);

        await user.click(screen.getByRole('button', { name: /menu/i }));

        const menu = within(document.getElementById('trainer-menu') as HTMLElement);

        for (const { name } of NAV_DESTINATIONS) {
            expect(menu.getByRole('link', { name: new RegExp(name) })).toBeInTheDocument();
        }
    });

    it('closes the mobile menu when the route changes', async () => {
        const user = userEvent.setup();
        const { rerender } = render(<SoundProvider><NavBar /></SoundProvider>);

        await user.click(screen.getByRole('button', { name: /menu/i }));
        expect(screen.getByRole('button', { name: /menu/i })).toHaveAttribute(
            'aria-expanded',
            'true',
        );

        pathState.current = '/Contact';
        rerender(<SoundProvider><NavBar /></SoundProvider>);

        expect(screen.getByRole('button', { name: /menu/i })).toHaveAttribute(
            'aria-expanded',
            'false',
        );
    });

    it('closes the mobile menu after navigating', async () => {
        const user = userEvent.setup();
        render(<SoundProvider><NavBar /></SoundProvider>);

        await user.click(screen.getByRole('button', { name: /menu/i }));

        const menu = within(document.getElementById('trainer-menu') as HTMLElement);
        await user.click(menu.getByRole('link', { name: /JOURNEY/ }));

        expect(screen.getByRole('button', { name: /menu/i })).toHaveAttribute(
            'aria-expanded',
            'false',
        );
    });

    it('offers a resume from the menu', () => {
        render(<SoundProvider><NavBar /></SoundProvider>);

        expect(screen.getAllByRole('link', { name: /resume/i })[0]).toHaveAttribute(
            'href',
            '/resume',
        );
    });

    it('shows how far the page has been scrolled', async () => {
        const { container } = render(<SoundProvider><NavBar /></SoundProvider>);

        const progress = container.querySelector('[style*="width"]') as HTMLElement;
        expect(progress.style.width).toBe('0%');

        window.scrollY = 500;
        window.dispatchEvent(new Event('scroll'));

        await waitFor(() => expect(progress.style.width).toBe('50%'));
    });

    it('never scrolls past the end of the page', async () => {
        const { container } = render(<SoundProvider><NavBar /></SoundProvider>);

        const progress = container.querySelector('[style*="width"]') as HTMLElement;

        window.scrollY = 5000;
        window.dispatchEvent(new Event('scroll'));

        await waitFor(() => expect(progress.style.width).toBe('100%'));
    });
});
