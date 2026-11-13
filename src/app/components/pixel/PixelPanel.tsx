import React from 'react';
import PixelIcon from './PixelIcon';

type PixelPanelProps = {
    children: React.ReactNode;
    /** Small label printed in the corner of the panel, like a GBA window title. */
    title?: string;
    /** Tones the panel surface. `recessed` reads as a sunken region. */
    tone?: 'default' | 'recessed' | 'leaf';
    /** Adds the honey corner brackets. */
    framed?: boolean;
    className?: string;
    contentClassName?: string;
    id?: string;
};

/**
 * The core GBA window: a flat surface, a hard dark-green frame and a hard
 * offset shadow. Never rounded, never blurred.
 */
const PixelPanel = ({
    children,
    title,
    tone = 'default',
    framed = false,
    className = '',
    contentClassName = '',
    id,
}: PixelPanelProps) => {
    const surface =
        tone === 'recessed'
            ? 'pk-panel-recessed'
            : tone === 'leaf'
              ? 'bg-leaf text-cream border-bark'
              : 'pk-panel';

    return (
        <section
            id={id}
            className={`${surface} ${framed ? 'pk-frame' : ''} ${className}`}
        >
            {title ? (
                <header className="flex items-center gap-2 border-b-2 border-bark/70 px-4 py-2">
                    <span className="h-2 w-2 bg-berry" aria-hidden="true" />
                    <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.18em] text-bark">
                        {title}
                    </h3>
                </header>
            ) : null}
            <div className={contentClassName}>{children}</div>
        </section>
    );
};

export default PixelPanel;
