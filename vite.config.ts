/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './dotenv',
  server: {
    proxy: {
      '/offline': {
        target: 'http://localhost:53242',
        changeOrigin: true,
        rewrite: path => path.replace('/offline', '')
      },
    }
  },
  resolve: {
    alias: {
      '~': '/src',
      public: '/public',
    },
  },
});
