import { describe, expect, it } from 'vitest';
import { cn as cnFromLib } from '../../src/lib/utils';
import { cn as cnFromComponents } from '../../src/components/utils';

/**
 * `cn` is the class-name helper used across the project. It is duplicated in
 * `src/lib/utils.js` and `src/components/utils.js`, so both copies are
 * covered here to stop them drifting apart.
 */
const implementations = [
    { name: 'src/lib/utils.js', cn: cnFromLib },
    { name: 'src/components/utils.js', cn: cnFromComponents },
];

describe.each(implementations)('cn ($name)', ({ cn }) => {
    it('joins class names', () => {
        expect(cn('flex', 'items-center')).toBe('flex items-center');
    });

    it('drops empty values', () => {
        expect(cn('flex', null, undefined, '')).toBe('flex');
    });

    it('drops falsy values', () => {
        expect(cn('flex', false as unknown as string)).toBe('flex');
    });

    it('supports the conditional object syntax', () => {
        expect(cn('base', { active: true, hidden: false })).toBe('base active');
    });

    it('supports the array syntax', () => {
        expect(cn(['flex', 'gap-2'], 'text-sm')).toBe('flex gap-2 text-sm');
    });

    it('lets a later class win a Tailwind conflict', () => {
        expect(cn('p-2', 'p-4')).toBe('p-4');
        expect(cn('text-sm text-pale', 'text-lg')).toBe('text-pale text-lg');
    });

    it('keeps classes that do not conflict', () => {
        expect(cn('rounded-lg border', 'shadow-md')).toBe('rounded-lg border shadow-md');
    });
});

describe('cn', () => {
    it('behaves the same in both module locations', () => {
        const inputs = ['flex', { active: true }, ['gap-2'], 'p-2', 'p-4'];

        expect(cnFromLib(...inputs)).toBe(cnFromComponents(...inputs));
    });
});
