import { defineConfig } from 'vite'
export default defineConfig({
  root: '.',
  publicDir: '..',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: '/index.html'
    }
  }
})