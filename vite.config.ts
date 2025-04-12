/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@src': resolve(__dirname, './src'),
      '@os/theflames-src': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './src/assets'),
      '@styles': resolve(__dirname, './src/styles'),
      '@components': resolve(__dirname, './src/components'),
      '@features': resolve(__dirname, './src/features'),
      '@lib': resolve(__dirname, './src/lib'),
      '@hooks': resolve(__dirname, './src/lib/hooks'),
      '@services': resolve(__dirname, './src/lib/services'),
      '@constants': resolve(__dirname, './src/lib/constants'),
      '@utils': resolve(__dirname, './src/lib/utils'),
      '@utilities': resolve(__dirname, './src/utilities'),
      '@pages': resolve(__dirname, './src/pages'),
      '@types': resolve(__dirname, './src/types'),
    },
  },
});
