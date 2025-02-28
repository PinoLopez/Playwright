// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, // Habilita el modo "headed"
  },
  testMatch: '/*.spec.ts',
  workers: 1, // Limita el número de workers a 1 para ejecutar las pruebas secuencialmente
  fullyParallel: false, // Deshabilita la ejecución paralela
  projects: [
    {
      name: 'sequential',
      retries: 0,
      fullyParallel: false,
    },
  ],
});