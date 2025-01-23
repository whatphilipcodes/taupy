import { defineConfig } from 'vite';
import { spawnSync } from 'child_process';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// using this plugin instead of adding the command to the tauri config prevents ecycle error in dev mode
const runPyInstall = () => {
  return {
    name: 'run-pyinstall',
    buildStart() {
      spawnSync('pnpm', ['pyinstall'], { stdio: 'inherit' });
    },
  };
};

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [runPyInstall(), tailwindcss(), react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },

  build: {
    outDir: './dist-front',
  },
}));
