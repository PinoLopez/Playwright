// playwright.config.ts
module.exports = 
{
  // ... otras configuraciones
  use: 
  {
    headless: false, // Habilita el modo "headed"
  },
  testMatch: '/*.spec.ts',
};
