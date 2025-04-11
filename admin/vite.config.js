import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Type': 'text/css' // Ensures local dev serves CSS correctly
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          // Ensure CSS files get proper naming and content-type
          return `assets/${extType}/[name]-[hash][extname]`;
        },
      }
    }
  },
  // Add base URL if needed for deployment
  base: process.env.NODE_ENV === 'production' ? '/' : '/'
});