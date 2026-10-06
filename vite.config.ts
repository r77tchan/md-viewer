import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  base: '/md-viewer/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^lowlight$/,
        replacement: fileURLToPath(new URL('./src/lib/lowlightWithoutCommon.ts', import.meta.url)),
      },
    ],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
})
