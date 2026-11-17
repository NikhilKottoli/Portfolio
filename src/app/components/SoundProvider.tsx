'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type SoundContextType = {
    playBgm: () => void;
    stopBgm: () => void;
    playPokeball: () => void;
    playSelect: () => void;
    isBgmPlaying: boolean;
    toggleBgm: () => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

const BGM_STORAGE_KEY = 'bgm-playing';

// A gentle C-major arpeggio (C4 E4 G4 C5 G4 E4) repeated as a loop.
const BGM_PATTERN = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63];
const NOTE_DURATION = 0.2; // seconds per note
const SCHEDULE_AHEAD = 0.3; // seconds of audio scheduled in advance
const TICK_MS = 50; // scheduler cadence

type ActiveNode = { osc: OscillatorNode; gain: GainNode };

function readStoredBgm(): boolean {
    try {
        return localStorage.getItem(BGM_STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
}

function persistBgm(playing: boolean): void {
    try {
        localStorage.setItem(BGM_STORAGE_KEY, String(playing));
    } catch {
        // Storage can be unavailable (privacy mode, SSR); the toggle still works.
    }
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [isBgmPlaying, setIsBgmPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const bgmIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const activeNodesRef = useRef<ActiveNode[]>([]);
    const playingRef = useRef(false);

    /**
     * Lazily construct the Web Audio context. This is only ever called from a
     * user-triggered handler (toggle/play), never during render or on mount,
     * so jsdom-based tests that only mount the provider are unaffected.
     */
    const getAudioContext = useCallback((): AudioContext | null => {
        if (audioContextRef.current) return audioContextRef.current;
        if (typeof window === 'undefined') return null;

        const AudioCtor: typeof AudioContext | undefined =
            typeof AudioContext !== 'undefined'
                ? AudioContext
                : (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

        if (!AudioCtor) return null;

        try {
            audioContextRef.current = new AudioCtor();
            return audioContextRef.current;
        } catch {
            return null;
        }
    }, []);

    const resumeContext = useCallback((ctx: AudioContext) => {
        if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
            void ctx.resume();
        }
    }, []);

    const setPlaying = useCallback((playing: boolean) => {
        playingRef.current = playing;
        setIsBgmPlaying(playing);
        persistBgm(playing);
    }, []);

    /** Schedule one short, low-volume note and remember it for cleanup. */
    const scheduleNote = useCallback((ctx: AudioContext, frequency: number, time: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(frequency, time);

        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(0.05, time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + NOTE_DURATION);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + NOTE_DURATION + 0.02);

        const node: ActiveNode = { osc, gain };
        activeNodesRef.current.push(node);
        osc.onended = () => {
            activeNodesRef.current = activeNodesRef.current.filter((entry) => entry !== node);
        };
    }, []);

    const stopScheduledAudio = useCallback(() => {
        if (bgmIntervalRef.current !== null) {
            clearInterval(bgmIntervalRef.current);
            bgmIntervalRef.current = null;
        }

        activeNodesRef.current.forEach(({ osc, gain }) => {
            try {
                osc.stop();
            } catch {
                // The oscillator may already have ended.
            }
            try {
                osc.disconnect();
            } catch {
                // Already disconnected.
            }
            try {
                gain.disconnect();
            } catch {
                // Already disconnected.
            }
        });
        activeNodesRef.current = [];
    }, []);

    const playBgm = useCallback(() => {
        setPlaying(true);

        // Idempotent: never start a second scheduler on top of a running one.
        if (bgmIntervalRef.current !== null) return;

        const ctx = getAudioContext();
        if (!ctx) return; // No AudioContext available: keep the state flip, skip sound.
        resumeContext(ctx);

        let nextNoteTime = ctx.currentTime + 0.05;
        let noteIndex = 0;

        const scheduler = () => {
            if (!audioContextRef.current) return;
            while (nextNoteTime < audioContextRef.current.currentTime + SCHEDULE_AHEAD) {
                scheduleNote(audioContextRef.current, BGM_PATTERN[noteIndex % BGM_PATTERN.length], nextNoteTime);
                nextNoteTime += NOTE_DURATION;
                noteIndex += 1;
            }
        };

        bgmIntervalRef.current = setInterval(scheduler, TICK_MS);
        scheduler();
    }, [getAudioContext, resumeContext, scheduleNote, setPlaying]);

    const stopBgm = useCallback(() => {
        stopScheduledAudio();
        setPlaying(false);
    }, [setPlaying, stopScheduledAudio]);

    const playPokeball = useCallback(() => {
        const ctx = getAudioContext();
        if (!ctx) return;
        resumeContext(ctx);

        // Classic Pokéball open: quick ascending arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        const now = ctx.currentTime;

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, now + i * 0.06);
            gain.gain.setValueAtTime(0.08, now + i * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.15);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + i * 0.06);
            osc.stop(now + i * 0.06 + 0.2);
        });

        // Add a little "pop" at the end
        const popOsc = ctx.createOscillator();
        const popGain = ctx.createGain();
        popOsc.type = 'sine';
        popOsc.frequency.setValueAtTime(200, now + 0.3);
        popGain.gain.setValueAtTime(0.05, now + 0.3);
        popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        popOsc.connect(popGain);
        popGain.connect(ctx.destination);
        popOsc.start(now + 0.3);
        popOsc.stop(now + 0.4);
    }, [getAudioContext, resumeContext]);

    const playSelect = useCallback(() => {
        const ctx = getAudioContext();
        if (!ctx) return;
        resumeContext(ctx);

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }, [getAudioContext, resumeContext]);

    const toggleBgm = useCallback(() => {
        if (playingRef.current) stopBgm();
        else playBgm();
    }, [playBgm, stopBgm]);

    // Restore only the saved preference. No audio is constructed or started here.
    useEffect(() => {
        const stored = readStoredBgm();
        playingRef.current = stored;
        setIsBgmPlaying(stored);
    }, []);

    // Tear down any audio that was created by user interaction on unmount.
    useEffect(() => {
        return () => {
            stopScheduledAudio();
            const ctx = audioContextRef.current;
            if (ctx) {
                try {
                    void ctx.close();
                } catch {
                    // Context may already be closed.
                }
                audioContextRef.current = null;
            }
        };
    }, [stopScheduledAudio]);

    return (
        <SoundContext.Provider value={{ playBgm, stopBgm, playPokeball, playSelect, isBgmPlaying, toggleBgm }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
}
