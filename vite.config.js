import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Silencia os avisos de depreciação do @import no terminal
        silenceDeprecations: ['import', 'global-builtin'],
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        // index.html = gerador (raiz do site); demo.html = portfolio de exemplo
        main: resolve(__dirname, 'index.html'),
        demo: resolve(__dirname, 'demo.html')
      }
    }
  }
});