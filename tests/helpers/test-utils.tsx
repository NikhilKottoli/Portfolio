import React from 'react';
import { render } from '@testing-library/react';
import { SoundProvider } from '../../src/app/components/SoundProvider';

export function renderWithSound(ui: React.ReactElement) {
    return {
        ...render(<SoundProvider>{ui}</SoundProvider>),
    };
}

// Re-export everything from testing-library
export * from '@testing-library/react';