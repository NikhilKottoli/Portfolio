import React from 'react';
import PixelIcon from '../components/pixel/PixelIcon';
import PixelSprite from '../components/pixel/PixelSprite';
import ResumeDownloadButton from '../components/ResumeDownloadButton';
import SectionHeading from '../components/SectionHeading';
import { trainerAvatar } from '../components/pixel/sprites';
import { socials } from '../data/trainer';
import {
    resumeAwards,
    resumeContributions,
    resumeExperience,
    resumeProfile,
    resumeSkills,
} from '../data/resume';

/**
 * A print-friendly resume.
 *
 * The same facts that appear across the site are collected into one
 * readable document that can be saved as a PDF from the browser.
 */
const ResumePage = () => {
    return (
        <main className="bg-parchment py-12 sm:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="Trainer Dossier"
                    title="Résumé"
                    description="A single page summary of experience, awards, contributions and skills."
                    icon="book"
                    className="mb-8"
                    action={<ResumeDownloadButton />}
                />

                <article className="pk-panel p-5 sm:p-8">
                    {/* Header. */}
                    <header className="flex flex-col gap-5 border-b-2 border-bark/20 pb-6 sm:flex-row sm:items-center">
                        <div className="pk-panel-recessed flex h-24 w-24 shrink-0 items-center justify-center p-2">
                            <PixelSprite art={trainerAvatar} className="h-full w-auto" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="font-pixel-ui text-xl uppercase tracking-[0.06em] text-bark sm:text-2xl">
                                {resumeProfile.name}
                            </h2>
                            <p className="mt-1 font-body text-[1.05rem] font-bold text-leaf">
                                {resumeProfile.role}
                            </p>
                            <p className="mt-1 flex items-center gap-1.5 font-body text-[0.95rem] text-stone">
                                <PixelIcon name="pin" className="h-3.5 w-3.5 text-leaf" />
                                {resumeProfile.location}
                            </p>
                            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                                {socials.map((social) => (
                                    <li key={social.label}>
                                        <a
                                            href={social.href}
                                            {...(social.external
                                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                                : {})}
                                            className="font-mono text-[1.05rem] text-bark underline-offset-4 hover:text-berry hover:underline"
                                        >
                                            {social.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </header>

                    {/* Summary. */}
                    <section className="border-b-2 border-bark/20 py-6">
                        <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf">
                            Profile
                        </h3>
                        <p className="mt-2.5 font-body text-[1.02rem] leading-relaxed text-ink">
                            {resumeProfile.summary}
                        </p>
                        <p className="mt-3 font-body text-[0.98rem] text-stone">
                            <span className="font-bold text-ink">Education:</span>{' '}
                            {resumeProfile.education}
                        </p>
                        <p className="mt-1.5 font-body text-[0.98rem] text-stone">
                            <span className="font-bold text-ink">Interests:</span>{' '}
                            {resumeProfile.interests.join(', ')}
                        </p>
                    </section>

                    {/* Experience. */}
                    <section className="border-b-2 border-bark/20 py-6">
                        <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf">
                            Experience
                        </h3>
                        <div className="mt-4 space-y-6">
                            {resumeExperience.map((entry) => (
                                <div key={entry.role}>
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                        <h4 className="font-body text-[1.05rem] font-bold text-ink">
                                            {entry.role}
                                        </h4>
                                        <span className="font-mono text-[1.02rem] text-leaf">
                                            {entry.period}
                                        </span>
                                    </div>
                                    <p className="font-body text-[0.98rem] font-semibold text-bark">
                                        {entry.organisation}
                                        <span className="font-normal text-stone">
                                            {' '}
                                            · {entry.location}
                                        </span>
                                    </p>
                                    <p className="mt-1.5 font-body text-[0.98rem] leading-relaxed text-ink">
                                        {entry.summary}
                                    </p>
                                    <ul className="mt-2 space-y-1">
                                        {entry.highlights.map((highlight) => (
                                            <li
                                                key={highlight}
                                                className="flex gap-2 font-body text-[0.97rem] leading-relaxed text-stone"
                                            >
                                                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-berry" />
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-2 font-mono text-[1rem] leading-tight text-leaf">
                                        {entry.stack.join(' · ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Open source. */}
                    <section className="border-b-2 border-bark/20 py-6">
                        <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf">
                            Open Source
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                            {resumeContributions.map((item) => (
                                <li key={item.project} className="flex gap-2.5">
                                    <PixelIcon
                                        name="code"
                                        className="mt-1 h-4 w-4 shrink-0 text-berry"
                                    />
                                    <span className="font-body text-[0.98rem] leading-relaxed text-ink">
                                        <span className="font-bold">{item.project}</span> —{' '}
                                        {item.detail}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Awards. */}
                    <section className="border-b-2 border-bark/20 py-6">
                        <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf">
                            Awards
                        </h3>
                        <ul className="mt-3 space-y-2.5">
                            {resumeAwards.map((award) => (
                                <li
                                    key={award.title}
                                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                                >
                                    <span className="font-body text-[1rem] font-bold text-ink">
                                        {award.title}
                                    </span>
                                    <span className="font-body text-[0.95rem] text-stone">
                                        {award.position}
                                    </span>
                                    <span className="ml-auto font-mono text-[1.05rem] text-berry">
                                        {award.prize}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Skills. */}
                    <section className="pt-6">
                        <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf">
                            Skills
                        </h3>
                        <dl className="mt-3 space-y-3">
                            {resumeSkills.map((group) => (
                                <div
                                    key={group.group}
                                    className="flex flex-col gap-1 border-b border-dashed border-bark/25 pb-3 last:border-b-0 sm:flex-row sm:gap-4"
                                >
                                    <dt className="font-pixel-ui text-[0.58rem] uppercase tracking-[0.16em] text-stone sm:w-36 sm:shrink-0">
                                        {group.group}
                                    </dt>
                                    <dd className="font-mono text-[1.02rem] leading-snug text-ink">
                                        {group.items.join(' · ')}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                </article>

                <p className="mt-6 text-center font-body text-[0.92rem] text-stone">
                    Prefer a quick link?{' '}
                    <a
                        href="mailto:nikhilkottoli2005@gmail.com"
                        className="font-semibold text-berry underline-offset-4 hover:underline"
                    >
                        Send me a message
                    </a>
                    .
                </p>
            </div>
        </main>
    );
};

export default ResumePage;
