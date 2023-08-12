/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './dotenv',
  test: {
    browser: {
      enabled: true,
      name: 'chrome',
      headless: true,
    },
  },
  resolve: {
    alias: {
      '~': '/src',
      public: '/public',
    },
  },
});
