import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: false,
        setupFiles: ['./tests/setup.ts'],
        include: ['tests/**/*.test.{ts,tsx}'],
        exclude: ['**/node_modules/**', '**/.next/**', '**/coverage/**'],
        css: false,
        clearMocks: true,
        restoreMocks: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            reportsDirectory: './coverage',
            include: ['src/**/*.{ts,tsx,js,jsx}'],
            exclude: [
                'node_modules/**',
                '.next/**',
                'src/**/*.css',
                'src/app/icon.svg',
                // Dead create-react-app leftovers, not part of the Next.js app.
                'src/App.js',
                'src/index.js',
            ],
        },
    },
});
