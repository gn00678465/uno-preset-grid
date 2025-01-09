import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    cache: false,
    coverage: {
      provider: 'v8'
    },
  },
})