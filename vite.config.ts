/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './dotenv',
  test: {
    setupFiles: ['./test/setup-mocks.ts'],
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      exclude: [
        'coverage/**',
        'dist/**',
        'packages/*/test?(s)/**',
        '**/*.d.ts',
        '**/virtual:*',
        '**/__x00__*',
        '**/\x00*',
        'cypress/**',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/*{.,-}{test,spec}.?(c|m)[jt]s?(x)',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/vitest.{workspace,projects}.[jt]s?(on)',
        '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
        '**/__mocks__/**',
      ],
    },
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
