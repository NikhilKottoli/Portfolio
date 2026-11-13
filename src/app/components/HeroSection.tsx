'use client';

import React from 'react';
import Link from 'next/link';
import DialogueBox from './pixel/DialogueBox';
import PixelIcon from './pixel/PixelIcon';
import PixelScene from './pixel/PixelScene';
import PixelSprite from './pixel/PixelSprite';
import TrainerCard from './TrainerCard';
import {
    emberlingSprite,
    grassSprite,
    leaflingSprite,
    shadowSprite,
    trainerSprite,
} from './pixel/sprites';
import { trainer } from '../data/trainer';

const META = [
    { icon: 'pin' as const, label: 'Location', value: trainer.location },
    { icon: 'book' as const, label: 'Education', value: `${trainer.education}, ${trainer.school}` },
    { icon: 'flag' as const, label: 'Current role', value: trainer.currentRole },
];

/**
 * The opening screen.
 *
 * The left half introduces the trainer, the right half shows the character
 * standing in a small pixel environment, and the dialogue box below opens the
 * conversation the way a Pokémon game would.
 */
const HeroSection = () => {
    return (
        <section className="relative isolate overflow-hidden border-b-[3px] border-bark bg-parchment">
            <PixelScene />

            <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-20">
                <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:gap-8">
                    {/* Introduction. */}
                    <div className="max-w-2xl">
                        <span className="pk-chip px-3 py-1.5 font-pixel-ui text-[0.6rem] uppercase tracking-[0.2em] text-bark">
                            <PixelIcon name="badge" className="h-3.5 w-3.5 text-berry" />
                            Trainer Profile
                        </span>

                        <h1 className="pk-text-shadow mt-5 font-pixel text-[clamp(1.7rem,6vw,3rem)] uppercase leading-[1.25] text-bark">
                            {trainer.name}
                        </h1>

                        <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-ink sm:text-xl">
                            {trainer.intro}
                        </p>

                        <dl className="mt-6 grid gap-2.5 sm:grid-cols-3">
                            {META.map((item) => (
                                <div
                                    key={item.label}
                                    className="pk-panel-recessed flex items-start gap-2 px-3 py-2.5"
                                >
                                    <PixelIcon
                                        name={item.icon}
                                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf"
                                    />
                                    <div className="min-w-0">
                                        <dt className="font-pixel-ui text-[0.52rem] uppercase tracking-[0.16em] text-stone">
                                            {item.label}
                                        </dt>
                                        <dd className="mt-0.5 font-body text-[0.82rem] font-semibold leading-snug text-ink">
                                            {item.value}
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            <Link
                                href="/Projects"
                                className="pk-btn pk-btn-primary px-5 py-3 font-pixel-ui text-[0.64rem] uppercase tracking-[0.16em]"
                            >
                                <PixelIcon name="folder" className="h-4 w-4" />
                                View my projects
                            </Link>
                            <Link
                                href="/resume"
                                className="pk-btn pk-btn-leaf px-5 py-3 font-pixel-ui text-[0.64rem] uppercase tracking-[0.16em]"
                            >
                                <PixelIcon name="book" className="h-4 w-4" />
                                Download resume
                            </Link>
                        </div>
                    </div>

                    {/* Trainer artwork. */}
                    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                        <div className="pk-panel pk-frame relative overflow-hidden bg-cream/85 px-6 pb-4 pt-8">
                            <div className="absolute inset-x-0 top-0 h-1.5 bg-honey" aria-hidden="true" />

                            <div className="relative flex items-end justify-center">
                                <PixelSprite
                                    art={shadowSprite}
                                    className="absolute bottom-1 left-1/2 h-6 w-40 -translate-x-1/2 opacity-25"
                                />
                                <PixelSprite
                                    art={trainerSprite}
                                    className="relative w-[13rem] max-w-full animate-bob sm:w-[15rem]"
                                />
                            </div>

                            {/* Companions. */}
                            <PixelSprite
                                art={leaflingSprite}
                                className="absolute left-3 top-6 h-14 w-14 animate-drift"
                            />
                            <PixelSprite
                                art={emberlingSprite}
                                className="absolute right-3 top-10 h-12 w-12 animate-drift [animation-delay:-3s]"
                            />

                            <div className="relative mt-4 flex items-end justify-between gap-3">
                                <PixelSprite art={grassSprite} className="h-6 w-28" />
                                <p className="font-pixel-ui text-[0.55rem] uppercase tracking-[0.16em] text-stone">
                                    No. {trainer.id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dialogue and trainer card. */}
                <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
                    <DialogueBox speaker="Nikhil">{trainer.dialogue}</DialogueBox>
                    <TrainerCard />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
