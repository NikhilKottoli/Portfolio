import React from 'react';
import PixelIcon from './pixel/PixelIcon';
import PixelSprite from './pixel/PixelSprite';
import { trainerAvatar } from './pixel/sprites';
import { socials, trainer } from '../data/trainer';

type TrainerCardProps = {
    className?: string;
};

type FieldProps = {
    label: string;
    value: string;
    icon?: React.ElementType;
};

/** One labelled row on the card, printed the way a summary screen prints stats. */
const Field = ({ label, value, icon: Icon }: FieldProps) => (
    <div className="flex items-baseline gap-2 border-b border-bark/15 py-1.5 last:border-b-0">
        <dt className="font-pixel-ui text-[0.56rem] uppercase tracking-[0.14em] text-stone">
            {label}
        </dt>
        <dd className="ml-auto text-right font-body text-[0.88rem] font-bold leading-tight text-ink">
            {value}
        </dd>
    </div>
);

/**
 * The trainer card: a collectible identity card in the style of the ones found
 * in Pokémon games. It carries the facts about Nikhil in a compact, scannable
 * layout rather than repeating the hero copy.
 */
const TrainerCard = ({ className = '' }: TrainerCardProps) => {
    return (
        <div
            className={`pk-panel overflow-hidden ${className}`}
            aria-label="Trainer card"
        >
            {/* Header strip. */}
            <div className="flex items-center justify-between gap-3 border-b-[3px] border-bark bg-leaf px-4 py-2">
                <div className="flex items-center gap-2">
                    <PixelIcon name="badge" className="h-4 w-4 text-honey" />
                    <span className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-cream">
                        Trainer Card
                    </span>
                </div>
                <span className="font-mono text-sm tracking-wide text-honey">
                    No. {trainer.id}
                </span>
            </div>

            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-5 sm:p-5">
                {/* Portrait. */}
                <div className="flex shrink-0 items-start gap-3 sm:block">
                    <div className="pk-panel-recessed flex h-[92px] w-[92px] items-center justify-center p-1.5">
                        <PixelSprite
                            art={trainerAvatar}
                            className="h-full w-auto"
                        />
                    </div>
                    <div className="sm:mt-2 sm:text-center">
                        <p className="font-pixel-ui text-[0.55rem] uppercase tracking-[0.16em] text-stone">
                            {trainer.school}
                        </p>
                        <p className="font-mono text-[1.05rem] leading-tight text-bark">
                            @{trainer.handle}
                        </p>
                    </div>
                </div>

                {/* Facts. */}
                <div className="min-w-0 flex-1">
                    <h3 className="font-pixel-ui text-base uppercase leading-tight tracking-[0.08em] text-bark sm:text-lg">
                        {trainer.name}
                    </h3>
                    <p className="mt-1 font-body text-[0.9rem] font-semibold text-leaf">
                        {trainer.role}
                    </p>

                    <dl className="mt-3">
                        <Field label="ID No." value={trainer.id} />
                        <Field label="Location" value={trainer.location} />
                        <Field label="Education" value={`${trainer.education}, ${trainer.school}`} />
                        <Field label="Org." value={trainer.currentOrg} />
                    </dl>
                </div>
            </div>

            {/* Social strip. */}
            <div className="flex flex-wrap items-center gap-2 border-t-2 border-bark bg-sand px-4 py-3">
                {socials.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        {...(social.external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        className="pk-btn px-2.5 py-1.5 font-pixel-ui text-[0.58rem] uppercase tracking-[0.14em]"
                    >
                        <PixelIcon name={social.label === 'Email' ? 'mail' : 'code'} className="h-3 w-3" />
                        {social.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TrainerCard;
