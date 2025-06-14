import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
    },
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
});
