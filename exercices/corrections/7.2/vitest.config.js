import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: false,
    hookTimeout: 25000,
    testTimeout: 15000, // par defaut 500 (1/2 sec) ici au moins 15secs à cause des opérations en BDD
    coverage: {
      reporter: ['html'],
      reportsDirectory: './tests/coverage'
    },
    exclude: [ 'node_modules']
  }
})
