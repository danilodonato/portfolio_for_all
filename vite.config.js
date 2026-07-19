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
        // Avisa ao Vite que existem duas páginas principais no projeto
        main: resolve(__dirname, 'index.html'),
        generator: resolve(__dirname, 'generator.html')
      }
    }
  }
});