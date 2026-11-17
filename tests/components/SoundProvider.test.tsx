import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SoundProvider, useSound } from '../../src/app/components/SoundProvider';

/** Minimal Web Audio stub: no jsdom implementation exists, and no real audio is needed. */
function makeAudioContextStub() {
    const oscillators: any[] = [];
    const gains: any[] = [];

    const makeParam = () => ({
        value: 0,
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
    });

    const ctx: any = {
        currentTime: 0,
        state: 'suspended',
        destination: {},
        close: vi.fn(() => Promise.resolve()),
        resume: vi.fn(() => {
            ctx.state = 'running';
            return Promise.resolve();
        }),
        createGain: vi.fn(() => {
            const gain: any = { gain: makeParam(), connect: vi.fn(), disconnect: vi.fn() };
            gains.push(gain);
            return gain;
        }),
        createOscillator: vi.fn(() => {
            const osc: any = {
                type: 'square',
                frequency: makeParam(),
                connect: vi.fn(),
                disconnect: vi.fn(),
                start: vi.fn(),
                stop: vi.fn(),
                onended: null,
            };
            oscillators.push(osc);
            return osc;
        }),
        oscillators,
        gains,
    };

    // A constructable mock that hands back the shared fake context.
    const FakeAudioContext = vi.fn(function () {
        return ctx;
    }) as unknown as typeof AudioContext;

    return { FakeAudioContext, ctx };
}

function Consumer() {
    const { isBgmPlaying, toggleBgm, playPokeball, playSelect } = useSound();

    return (
        <div>
            <span data-testid="status">{isBgmPlaying ? 'on' : 'off'}</span>
            <button type="button" onClick={toggleBgm}>
                toggle music
            </button>
            <button type="button" onClick={playPokeball}>
                play pokeball
            </button>
            <button type="button" onClick={playSelect}>
                play select
            </button>
        </div>
    );
}

function renderConsumer() {
    return render(
        <SoundProvider>
            <Consumer />
        </SoundProvider>,
    );
}

describe('SoundProvider', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        localStorage.clear();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.useRealTimers();
        localStorage.clear();
    });

    it('restores the saved preference without constructing any audio on mount', () => {
        localStorage.setItem('bgm-playing', 'true');
        const { FakeAudioContext } = makeAudioContextStub();
        vi.stubGlobal('AudioContext', FakeAudioContext);

        renderConsumer();

        expect(screen.getByTestId('status')).toHaveTextContent('on');
        expect(FakeAudioContext).not.toHaveBeenCalled();
    });

    it('defaults to off when nothing is stored', () => {
        renderConsumer();

        expect(screen.getByTestId('status')).toHaveTextContent('off');
    });

    it('toggles state, persists it, and schedules a looping chiptune lazily', () => {
        const { FakeAudioContext, ctx } = makeAudioContextStub();
        vi.stubGlobal('AudioContext', FakeAudioContext);

        renderConsumer();
        const toggle = screen.getByRole('button', { name: /toggle music/i });

        expect(FakeAudioContext).not.toHaveBeenCalled();
        fireEvent.click(toggle);

        expect(screen.getByTestId('status')).toHaveTextContent('on');
        expect(localStorage.getItem('bgm-playing')).toBe('true');
        expect(FakeAudioContext).toHaveBeenCalledTimes(1);
        expect(ctx.resume).toHaveBeenCalled();
        expect(ctx.oscillators.length).toBeGreaterThan(0);
        expect(ctx.gains.length).toBe(ctx.oscillators.length);
        expect(ctx.oscillators.every((osc: any) => osc.type === 'square')).toBe(true);

        // The scheduler keeps adding notes as time advances.
        const before = ctx.oscillators.length;
        ctx.currentTime = 2;
        vi.advanceTimersByTime(500);
        expect(ctx.oscillators.length).toBeGreaterThan(before);
    });

    it('clears scheduled audio when turned off and stays off', () => {
        const { FakeAudioContext, ctx } = makeAudioContextStub();
        vi.stubGlobal('AudioContext', FakeAudioContext);

        renderConsumer();
        const toggle = screen.getByRole('button', { name: /toggle music/i });

        fireEvent.click(toggle);
        fireEvent.click(toggle);

        expect(screen.getByTestId('status')).toHaveTextContent('off');
        expect(localStorage.getItem('bgm-playing')).toBe('false');

        // Every oscillator and gain was stopped/disconnected on teardown.
        expect(ctx.oscillators.every((osc: any) => osc.stop.mock.calls.length >= 2)).toBe(true);
        expect(ctx.oscillators.every((osc: any) => osc.disconnect.mock.calls.length > 0)).toBe(true);
        expect(ctx.gains.every((gain: any) => gain.disconnect.mock.calls.length > 0)).toBe(true);

        // Advancing the clock cannot schedule anything after the loop is cleared.
        const countAtStop = ctx.oscillators.length;
        ctx.currentTime = 10;
        vi.advanceTimersByTime(2000);
        expect(ctx.oscillators.length).toBe(countAtStop);

        // Turning back on starts a fresh loop without throwing.
        fireEvent.click(toggle);
        expect(screen.getByTestId('status')).toHaveTextContent('on');
        expect(FakeAudioContext).toHaveBeenCalledTimes(1);
    });

    it('still flips the toggle when AudioContext is unavailable', () => {
        vi.stubGlobal('AudioContext', undefined);

        renderConsumer();
        const toggle = screen.getByRole('button', { name: /toggle music/i });

        fireEvent.click(toggle);
        expect(screen.getByTestId('status')).toHaveTextContent('on');
        expect(localStorage.getItem('bgm-playing')).toBe('true');

        fireEvent.click(toggle);
        expect(screen.getByTestId('status')).toHaveTextContent('off');
        expect(localStorage.getItem('bgm-playing')).toBe('false');
    });

    it('keeps the Pokeball and select effects working', () => {
        const { FakeAudioContext, ctx } = makeAudioContextStub();
        vi.stubGlobal('AudioContext', FakeAudioContext);

        renderConsumer();

        fireEvent.click(screen.getByRole('button', { name: /play pokeball/i }));
        fireEvent.click(screen.getByRole('button', { name: /play select/i }));

        // Pokeball (5 notes) + select (1 note) = 6 oscillators, no BGM loop.
        expect(ctx.oscillators.length).toBe(6);
        expect(FakeAudioContext).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('status')).toHaveTextContent('off');
    });
});
