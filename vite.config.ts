import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function kuberUniversalEntryPlugin(): Plugin {
  return {
    name: 'kuber-universal-entry',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const withoutRootBoot = html.replace(
          /<!--\s*KUBER_ROOT_BOOT_START\s*-->[\s\S]*?<!--\s*KUBER_ROOT_BOOT_END\s*-->/,
          ''
        );
        if (withoutRootBoot.includes('/src/main.tsx')) {
          return withoutRootBoot;
        }
        return withoutRootBoot.replace(
          '</body>',
          '    <script type="module" src="/src/main.tsx"></script>\n  </body>'
        );
      },
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [kuberUniversalEntryPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
