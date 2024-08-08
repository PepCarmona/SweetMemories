import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import vueRouter from 'unplugin-vue-router/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueRouter(), vue(), vueDevTools()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/mixins.scss";',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:4000/.netlify/functions',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
