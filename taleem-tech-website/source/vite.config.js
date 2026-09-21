import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/taleemtech-agency/',
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
