'use client';

import React from 'react';
import Link from 'next/link';
import PixelIcon, { type PixelIconName } from './pixel/PixelIcon';
import PixelSprite from './pixel/PixelSprite';
import PixelDivider from './pixel/PixelDivider';
import Reveal from './pixel/Reveal';
import SectionHeading from './SectionHeading';
import { emberlingSprite, leaflingSprite, trainerSprite } from './pixel/sprites';
import { socials } from '../data/trainer';

const SOCIAL_ICONS: Record<string, PixelIconName> = {
    GitHub: 'code',
    LinkedIn: 'user',
    Email: 'mail',
    CodeChef: 'chip',
};

type ContactLink = {
    label: string;
    href: string;
    external: boolean;
    /** Short explanation of what this channel is for. */
    detail: string;
};

const contactLinks: ContactLink[] = [
    ...socials.map((social) => ({
        ...social,
        detail:
            social.label === 'GitHub'
                ? 'Repositories, projects and upstream contributions.'
                : social.label === 'LinkedIn'
                  ? 'Professional profile and work history.'
                  : 'The fastest way to reach me directly.',
    })),
    {
        label: 'CodeChef',
        href: 'https://www.codechef.com/users/nikhil_k0tt0li',
        external: true,
        detail: 'Competitive programming practice and ratings.',
    },
    {
        label: 'Resume',
        href: '/resume',
        external: false,
        detail: 'A one-page summary of experience, awards and skills.',
    },
];

/**
 * The Contact section — a Pokémon communication terminal.
 *
 * Every channel is a plain link with a visible address, so there is never a
 * question of how to get in touch. No form is included because there is no
 * working submission endpoint behind one.
 */
const Contact = () => {
    return (
        <section
            className="relative flex min-h-[78svh] flex-col items-center justify-center overflow-hidden border-t-[3px] border-bark bg-parchment py-20 sm:py-28"
            id="contact"
        >
            <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
                <SectionHeading
                    align="center"
                    eyebrow="Rest at a Bench"
                    title="Let's Connect"
                    description="Open to internships, research roles, and interesting problems. Pick a channel."
                    icon="heart"
                    className="mb-10 sm:mb-12"
                />

                {/* Link list. */}
                <Reveal>
                    <div className="pk-panel overflow-hidden text-left">
                        {/* Terminal header. */}
                        <div className="flex items-center justify-between border-b-[3px] border-bark bg-leaf px-4 py-2.5">
                            <div className="flex items-center gap-2">
                                <PixelIcon name="mail" className="h-4 w-4 text-honey" />
                                <span className="font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-cream">
                                    Communication Terminal
                                </span>
                            </div>
                            <span className="font-mono text-[0.95rem] text-honey">Online</span>
                        </div>

                        <ul>
                            {contactLinks.map((link, index) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        {...(link.external
                                            ? { target: '_blank', rel: 'noopener noreferrer' }
                                            : {})}
                                        className={`group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-sand sm:px-5 ${
                                            index > 0 ? 'border-t border-bark/15' : ''
                                        }`}
                                    >
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-bark bg-honey transition-transform group-hover:-translate-y-0.5">
                                            <PixelIcon
                                                name={SOCIAL_ICONS[link.label] ?? 'code'}
                                                className="h-5 w-5 text-bark"
                                            />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-center gap-2">
                                                <span className="font-pixel-ui text-[0.72rem] uppercase tracking-[0.12em] text-bark">
                                                    {link.label}
                                                </span>
                                                {link.external ? (
                                                    <PixelIcon
                                                        name="arrowRight"
                                                        className="h-3 w-3 shrink-0 text-berry"
                                                    />
                                                ) : null}
                                            </span>
                                            <span className="mt-1 block font-body text-[0.9rem] leading-snug text-stone">
                                                {link.detail}
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>

                {/* Direct address. */}
                <Reveal delay={120}>
                    <div className="mt-10 flex flex-col items-center gap-4 sm:mt-12">
                        <PixelDivider className="w-full max-w-sm" />

                        <span className="font-pixel-ui text-[0.58rem] uppercase tracking-[0.28em] text-stone">
                            Direct address
                        </span>

                        <a
                            href="mailto:nikhilkottoli2005@gmail.com"
                            className="break-all font-mono text-[1.15rem] leading-tight text-leaf underline-offset-4 hover:text-berry hover:underline"
                        >
                            nikhilkottoli2005@gmail.com
                        </a>

                        <div className="mt-3 flex items-end gap-3 opacity-80">
                            <PixelSprite art={leaflingSprite} className="h-10 w-10 animate-drift" />
                            <PixelSprite art={trainerSprite} className="h-24 w-auto animate-bob" />
                            <PixelSprite
                                art={emberlingSprite}
                                className="h-9 w-9 animate-drift [animation-delay:-3s]"
                            />
                        </div>

                        <span className="mt-1 font-pixel-ui text-[0.56rem] uppercase tracking-[0.28em] text-stone">
                            The bench is always free
                        </span>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Contact;
