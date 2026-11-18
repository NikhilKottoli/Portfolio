'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchItems, type SearchItem } from '../../lib/search';

/** Human label for each kind of entry in the index. */
const KIND_LABELS: Record<SearchItem['kind'], string> = {
    project: 'Project',
    skill: 'Skill',
    badge: 'Badge',
    journey: 'Journey',
    page: 'Page',
};

/** Everything inside the dialog that can take focus, in tab order. */
const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * The command palette.
 *
 * Cmd/Ctrl+K opens it from anywhere on the site, the arrow keys walk the
 * list, Enter navigates and Escape hands the focus back to whatever had it
 * before. Nothing is rendered until the component has mounted, so the
 * statically prerendered pages are left exactly as they were.
 */
const CommandPalette = () => {
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const restoreFocusRef = useRef<HTMLElement | null>(null);
    const openRef = useRef(false);

    const results = useMemo(() => (open ? searchItems(query) : []), [open, query]);

    const setPaletteOpen = useCallback((next: boolean) => {
        openRef.current = next;
        setOpen(next);
    }, []);

    // The palette is a client-only affordance, so it stays out of the server
    // rendered markup entirely.
    useEffect(() => {
        setMounted(true);
    }, []);

    // The global hotkey: Cmd/Ctrl+K toggles the palette, Escape closes it.
    useEffect(() => {
        if (typeof document === 'undefined') return;

        const onKeyDown = (event: KeyboardEvent) => {
            const key = typeof event.key === 'string' ? event.key : '';
            const isPaletteHotkey = key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey);

            if (isPaletteHotkey) {
                event.preventDefault();
                const nextOpen = !openRef.current;

                if (nextOpen) {
                    const activeElement = document.activeElement as HTMLElement | null;
                    restoreFocusRef.current =
                        activeElement && typeof activeElement.focus === 'function' ? activeElement : null;
                }

                setPaletteOpen(nextOpen);
                return;
            }

            if (key === 'Escape' && openRef.current) {
                setPaletteOpen(false);
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [setPaletteOpen]);

    // Move the focus into the search box when the palette opens.
    useEffect(() => {
        if (!open) return;

        inputRef.current?.focus();
    }, [open]);

    // Clear the query and hand the focus back to the page once the palette
    // is gone.
    useEffect(() => {
        if (open) return;

        setQuery('');
        setActiveIndex(0);

        const previous = restoreFocusRef.current;
        restoreFocusRef.current = null;

        if (previous && typeof previous.focus === 'function') previous.focus();
    }, [open]);

    const navigateTo = useCallback(
        (item: SearchItem) => {
            router.push(item.href);
            setPaletteOpen(false);
        },
        [router, setPaletteOpen],
    );

    const handleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setActiveIndex(0);
    }, []);

    const handleOverlayMouseDown = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (event.target === event.currentTarget) setPaletteOpen(false);
        },
        [setPaletteOpen],
    );

    /** Keep Tab cycling inside the dialog instead of leaving it. */
    const trapFocus = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (focusable.length === 0) {
            event.preventDefault();
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const current = document.activeElement;

        if (event.shiftKey) {
            if (current === first || !dialog.contains(current)) {
                event.preventDefault();
                last.focus();
            }
            return;
        }

        if (current === last) {
            event.preventDefault();
            first.focus();
        }
    }, []);

    const handleDialogKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            switch (event.key) {
                case 'ArrowDown': {
                    event.preventDefault();
                    if (results.length === 0) return;
                    setActiveIndex((current) => (current + 1) % results.length);
                    return;
                }
                case 'ArrowUp': {
                    event.preventDefault();
                    if (results.length === 0) return;
                    setActiveIndex((current) => (current - 1 + results.length) % results.length);
                    return;
                }
                case 'Enter': {
                    const selected = results[activeIndex];
                    if (!selected) return;
                    event.preventDefault();
                    navigateTo(selected);
                    return;
                }
                case 'Escape': {
                    event.preventDefault();
                    setPaletteOpen(false);
                    return;
                }
                case 'Tab': {
                    trapFocus(event);
                    return;
                }
                default:
                    return;
            }
        },
        [activeIndex, navigateTo, results, setPaletteOpen, trapFocus],
    );

    if (!mounted || !open) return null;

    const activeOptionId =
        results.length > 0 ? `command-palette-option-${Math.min(activeIndex, results.length - 1)}` : undefined;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-bark/60 p-4 pt-[12vh]"
            onMouseDown={handleOverlayMouseDown}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                className="pk-panel w-full max-w-xl overflow-hidden"
                onKeyDown={handleDialogKeyDown}
            >
                <div className="flex items-center gap-3 border-b-[3px] border-bark bg-sand px-3 py-2.5">
                    <label
                        htmlFor="command-palette-search"
                        className="font-pixel-ui text-[0.56rem] uppercase tracking-[0.14em] text-bark"
                    >
                        Search
                    </label>
                    <input
                        id="command-palette-search"
                        ref={inputRef}
                        type="text"
                        autoFocus
                        value={query}
                        onChange={handleQueryChange}
                        placeholder="Projects, skills, badges, journey"
                        aria-controls="command-palette-results"
                        aria-activedescendant={activeOptionId}
                        className="min-w-0 flex-1 bg-transparent font-mono text-lg text-bark outline-none placeholder:text-bark/40"
                    />
                </div>

                {results.length > 0 ? (
                    <ul
                        id="command-palette-results"
                        role="listbox"
                        aria-label="Search results"
                        className="max-h-80 overflow-y-auto"
                    >
                        {results.map((item, index) => (
                            <li key={item.id} role="none">
                                <button
                                    type="button"
                                    role="option"
                                    id={`command-palette-option-${index}`}
                                    aria-selected={index === activeIndex}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => navigateTo(item)}
                                    className={`flex w-full items-center gap-3 border-b border-bark/15 px-3 py-2.5 text-left transition-colors ${
                                        index === activeIndex ? 'bg-honey' : 'bg-cream hover:bg-sand'
                                    }`}
                                >
                                    <span className="shrink-0 border-2 border-bark bg-sand px-1.5 py-1 font-pixel-ui text-[0.5rem] uppercase tracking-[0.1em] text-bark">
                                        {KIND_LABELS[item.kind]}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate font-pixel-ui text-[0.68rem] uppercase tracking-[0.1em] text-bark">
                                            {item.title}
                                        </span>
                                        <span className="block truncate font-body text-sm text-stone">
                                            {item.subtitle}
                                        </span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="px-3 py-8 text-center font-pixel-ui text-[0.6rem] uppercase tracking-[0.14em] text-stone">
                        No matches
                    </p>
                )}

                <div className="border-t-2 border-bark bg-sand px-3 py-2 font-pixel-ui text-[0.5rem] uppercase tracking-[0.12em] text-bark/70">
                    Arrow keys move &middot; Enter opens &middot; Esc closes
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
