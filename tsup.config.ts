import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/plugin.js'],
  format: ['cjs'],
  clean: true,
  target: 'node18',
  outDir: 'dist',
  external: ['tailwindcss'],
  publicDir: false,
})