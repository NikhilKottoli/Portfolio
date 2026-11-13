'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PixelIcon from './pixel/PixelIcon';
import PixelSprite from './pixel/PixelSprite';
import MenuSelector from './pixel/MenuSelector';
import { trainerAvatar } from './pixel/sprites';
import { navItems, socials, trainer } from '../data/trainer';
import { useSound } from './SoundProvider';

const SOCIAL_ICONS: Record<string, 'code' | 'user' | 'mail'> = {
    GitHub: 'code',
    LinkedIn: 'user',
    Email: 'mail',
};

/**
 * The trainer menu.
 *
 * The desktop layout reads like a GBA menu row: a portrait on the left, the
 * destinations in the middle, and the social links plus resume on the right.
 * On mobile the same options fold into a dropdown panel.
 */
const Navbar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const { isBgmPlaying, toggleBgm } = useSound();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        const onScroll = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
            setProgress(Math.min(1, Math.max(0, ratio)) * 100);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [open]);

    const isActive = (path: string) =>
        path === '/' ? pathname === '/' : pathname.startsWith(path);

    return (
        <header className="site-nav sticky top-0 z-50">
            <div className="relative border-b-[3px] border-bark bg-cream/95 backdrop-blur-[2px]">
                {/* Read-through progress strip. */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] bg-bark/10"
                >
                    <div
                        className="h-full bg-berry transition-[width] duration-150"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <nav
                    aria-label="Main"
                    className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2.5 sm:px-5"
                >
                    {/* Identity. */}
                    <Link
                        href="/"
                        className="group flex shrink-0 items-center gap-2.5"
                        aria-label={`${trainer.name} — home`}
                    >
                        <span className="pk-panel-recessed flex h-10 w-10 items-center justify-center p-1 transition-transform group-hover:-translate-y-0.5">
                            <PixelSprite art={trainerAvatar} className="h-full w-auto" />
                        </span>
                        <span className="hidden leading-tight sm:block">
                            <span className="block font-pixel-ui text-[0.62rem] uppercase tracking-[0.14em] text-bark">
                                {trainer.firstName}
                            </span>
                            <span className="block font-pixel-ui text-[0.62rem] uppercase tracking-[0.14em] text-leaf">
                                {trainer.lastName}
                            </span>
                        </span>
                    </Link>

                    {/* Destinations. */}
                    <ul className="ml-auto hidden items-center gap-1 lg:flex">
                        {navItems.map((item) => {
                            const active = isActive(item.path);

                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        aria-current={active ? 'page' : undefined}
                                        className={`flex items-center gap-1.5 border-2 px-2.5 py-1.5 font-pixel-ui text-[0.58rem] uppercase tracking-[0.12em] transition-colors ${
                                            active
                                                ? 'border-bark bg-leaf text-cream'
                                                : 'border-transparent text-bark hover:border-bark hover:bg-sand'
                                        }`}
                                    >
                                        {active ? (
                                            <MenuSelector className="text-honey" />
                                        ) : (
                                            <PixelIcon name={item.icon} className="h-3 w-3" />
                                        )}
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Social links and resume. */}
                    <div className="ml-auto hidden items-center gap-1.5 lg:ml-3 lg:flex">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                {...(social.external
                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                    : {})}
                                aria-label={social.label}
                                title={social.label}
                                className="flex h-8 w-8 items-center justify-center border-2 border-bark bg-cream text-bark transition-colors hover:bg-honey"
                            >
                                <PixelIcon
                                    name={SOCIAL_ICONS[social.label] ?? 'code'}
                                    className="h-3.5 w-3.5"
                                />
                            </a>
                        ))}
                        {/* BGM Toggle */}
                        <button
                            type="button"
                            onClick={toggleBgm}
                            aria-label={isBgmPlaying ? 'Pause music' : 'Play music'}
                            title={isBgmPlaying ? 'Pause music' : 'Play music'}
                            className="flex h-8 w-8 items-center justify-center border-2 border-bark bg-cream text-bark transition-colors hover:bg-honey"
                        >
                            <PixelIcon
                                name={isBgmPlaying ? 'speaker' : 'speakerOff'}
                                className="h-3.5 w-3.5"
                            />
                        </button>
                        <Link
                            href="/resume"
                            className="pk-btn pk-btn-leaf ml-1 px-3 py-1.5 font-pixel-ui text-[0.56rem] uppercase tracking-[0.12em]"
                        >
                            <PixelIcon name="book" className="h-3 w-3" />
                            Resume
                        </Link>
                    </div>

                    {/* Mobile trigger. */}
                    <button
                        type="button"
                        onClick={() => setOpen((current) => !current)}
                        aria-expanded={open}
                        aria-controls="trainer-menu"
                        className="ml-auto flex items-center gap-2 border-2 border-bark bg-sand px-3 py-2 font-pixel-ui text-[0.58rem] uppercase tracking-[0.14em] text-bark lg:hidden"
                    >
                        Menu
                        <PixelIcon name={open ? 'arrowDown' : 'arrowRight'} className="h-3 w-3" />
                    </button>
                </nav>

                {/* Mobile menu panel. */}
                {open ? (
                    <div
                        id="trainer-menu"
                        className="border-t-2 border-bark bg-cream lg:hidden"
                    >
                        <ul className="mx-auto flex max-w-6xl flex-col px-3 py-3 sm:px-5">
                            {navItems.map((item) => {
                                const active = isActive(item.path);

                                return (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            aria-current={active ? 'page' : undefined}
                                            onClick={() => setOpen(false)}
                                            className={`flex items-center gap-2.5 border-2 px-3 py-2.5 font-pixel-ui text-[0.62rem] uppercase tracking-[0.14em] ${
                                                active
                                                    ? 'border-bark bg-leaf text-cream'
                                                    : 'border-transparent text-bark hover:bg-sand'
                                            }`}
                                        >
                                            {active ? (
                                                <MenuSelector className="text-honey" />
                                            ) : (
                                                <PixelIcon name={item.icon} className="h-3.5 w-3.5" />
                                            )}
                                            {item.name}
                                            <span className="ml-auto hidden font-body text-xs normal-case tracking-normal opacity-70 sm:inline">
                                                {item.caption}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}

                            <li className="mt-2 flex flex-wrap items-center gap-2 border-t-2 border-dashed border-bark/30 pt-3">
                                {socials.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        {...(social.external
                                            ? { target: '_blank', rel: 'noopener noreferrer' }
                                            : {})}
                                        className="pk-btn px-2.5 py-1.5 font-pixel-ui text-[0.56rem] uppercase tracking-[0.12em]"
                                    >
                                        <PixelIcon
                                            name={SOCIAL_ICONS[social.label] ?? 'code'}
                                            className="h-3 w-3"
                                        />
                                        {social.label}
                                    </a>
                                ))}
                                <Link
                                    href="/resume"
                                    className="pk-btn pk-btn-leaf px-2.5 py-1.5 font-pixel-ui text-[0.56rem] uppercase tracking-[0.12em]"
                                >
                                    <PixelIcon name="book" className="h-3 w-3" />
                                    Resume
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : null}
            </div>
        </header>
    );
};

export default Navbar;
