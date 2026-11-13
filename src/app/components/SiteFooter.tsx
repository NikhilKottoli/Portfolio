import React from 'react';
import Link from 'next/link';
import PixelIcon from './pixel/PixelIcon';
import PixelSprite from './pixel/PixelSprite';
import PixelDivider from './pixel/PixelDivider';
import { grassSprite, trainerAvatar } from './pixel/sprites';
import { navItems, socials, trainer } from '../data/trainer';

const SOCIAL_ICONS: Record<string, 'code' | 'user' | 'mail'> = {
    GitHub: 'code',
    LinkedIn: 'user',
    Email: 'mail',
};

/**
 * The end of the page: a quiet sign-off with the same menu the header uses,
 * so every destination is reachable from the bottom too.
 */
const SiteFooter = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer relative mt-auto overflow-hidden border-t-[3px] border-bark bg-cream">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
                <div className="flex flex-col items-center gap-7 text-center">
                    <Link
                        href="/"
                        className="flex flex-col items-center gap-3"
                        aria-label={`${trainer.name} — back to home`}
                    >
                        <span className="pk-panel-recessed flex h-14 w-14 items-center justify-center p-1.5">
                            <PixelSprite art={trainerAvatar} className="h-full w-auto" />
                        </span>
                        <span className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-bark">
                            {trainer.name}
                        </span>
                    </Link>

                    <p className="max-w-md font-body text-[0.98rem] leading-relaxed text-stone">
                        {trainer.tagline} Building systems, exploring new technologies and
                        contributing to open source.
                    </p>

                    <PixelDivider className="w-full max-w-md" />

                    <nav aria-label="Footer">
                        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className="font-pixel-ui text-[0.58rem] uppercase tracking-[0.14em] text-bark underline-offset-4 hover:text-berry hover:underline"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                {...(social.external
                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                    : {})}
                                className="pk-btn px-3 py-2 font-pixel-ui text-[0.56rem] uppercase tracking-[0.12em]"
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
                            className="pk-btn pk-btn-leaf px-3 py-2 font-pixel-ui text-[0.56rem] uppercase tracking-[0.12em]"
                        >
                            <PixelIcon name="book" className="h-3 w-3" />
                            Resume
                        </Link>
                    </div>

                    <p className="font-mono text-[1.05rem] leading-none text-stone">
                        © {year} {trainer.name} · {trainer.school}
                    </p>
                </div>
            </div>

            {/* A strip of grass to close the page. */}
            <div
                aria-hidden="true"
                className="flex h-8 items-end justify-between gap-2 overflow-hidden border-t-2 border-bark/15 bg-sand px-2"
            >
                <PixelSprite art={grassSprite} className="h-7 w-24" />
                <PixelSprite art={grassSprite} className="h-6 w-20 opacity-70" />
                <PixelSprite art={grassSprite} className="h-7 w-28 opacity-90" />
                <PixelSprite art={grassSprite} className="h-5 w-16 opacity-60" />
            </div>
        </footer>
    );
};

export default SiteFooter;
