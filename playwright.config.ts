// playwright.config.ts
module.exports = 
{
  // ... otras configuraciones
  use: 
  {
    headless: false, // Habilita el modo "headed"
  },
  testMatch: 
  [
    '01wikipedia.spec.ts',
    '02wikipedia.spec.ts',
  ],
};
