'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type SoundContextType = {
    playBgm: () => void;
    stopBgm: () => void;
    playPokeball: () => void;
    playSelect: () => void;
    isBgmPlaying: boolean;
    toggleBgm: () => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [isBgmPlaying, setIsBgmPlaying] = useState(false);
    const bgmRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize audio elements
    useEffect(() => {
        // Background music - using a subtle ambient loop
        bgmRef.current = new Audio('/sounds/bgm.mp3');
        bgmRef.current.loop = true;
        bgmRef.current.volume = 0.15;

        // Initialize AudioContext for Web Audio API sounds
        const initAudioContext = () => {
            if (typeof window !== 'undefined' && !audioContextRef.current) {
                try {
                    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                } catch {
                    // AudioContext not available
                }
            }
        };

        // Initialize on first user interaction
        const handleInteraction = () => {
            initAudioContext();
            if (audioContextRef.current?.state === 'suspended') {
                audioContextRef.current.resume();
            }
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };

        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);

        return () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const createPokeballSound = () => {
        return () => {
            const ctx = audioContextRef.current;
            if (!ctx) return;
            
            if (ctx.state === 'suspended') ctx.resume();
            
            // Classic Pokéball open: quick ascending arpeggio
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            const now = ctx.currentTime;
            
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'square';
                osc.frequency.value = freq;
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
            popOsc.frequency.value = 200;
            popGain.gain.setValueAtTime(0.05, now + 0.3);
            popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            popOsc.connect(popGain);
            popGain.connect(ctx.destination);
            popOsc.start(now + 0.3);
            popOsc.stop(now + 0.4);
        };
    };

    const createSelectSound = () => {
        return () => {
            const ctx = audioContextRef.current;
            if (!ctx) return;
            
            if (ctx.state === 'suspended') ctx.resume();
            
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.value = 880; // A5
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        };
    };

    const playPokeball = createPokeballSound();
    const playSelect = createSelectSound();

    const playBgm = () => {
        if (bgmRef.current) {
            bgmRef.current.play().catch(() => {
                // Autoplay blocked, will play on user interaction
            });
            setIsBgmPlaying(true);
        }
    };

    const stopBgm = () => {
        if (bgmRef.current) {
            bgmRef.current.pause();
            bgmRef.current.currentTime = 0;
        }
        setIsBgmPlaying(false);
    };

    const toggleBgm = () => {
        if (isBgmPlaying) stopBgm();
        else playBgm();
    };

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