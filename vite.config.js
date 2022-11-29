import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],

  base: '/dogs-app/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/less/variables.less";`,
      },
    },
  },
});
