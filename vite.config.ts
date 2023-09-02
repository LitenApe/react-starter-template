/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './dotenv',
  test: {
    setupFiles: ['./src/test/setup-mocks.ts'],
    reporters: ['verbose'],
    environment: 'jsdom',
  },
  server: {
    proxy: {
      '/offline': {
        target: 'http://localhost:53242',
        changeOrigin: true,
        rewrite: (path) => path.replace('/offline', ''),
      },
    },
  },
  resolve: {
    alias: {
      '~': '/src',
      public: '/public',
    },
  },
});
