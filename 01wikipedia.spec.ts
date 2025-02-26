import { test, expect } from '@playwright/test';

test('Busca "Roland Corporation" en Wikipedia y verifica modelos 909 y 808', async ({ page }) => 
  {
  // 1. Abre el navegador en pantalla completa
  await page.setViewportSize({ width: 1920, height: 1080 });

  // 2. Navega a la página principal de Wikipedia
  await page.goto('https://es.wikipedia.org/wiki/Wikipedia:Portada');

  // 3. Encuentra el campo de búsqueda e introduce "Roland Corporation"
  const searchInput = await page.$('#searchInput');
  if (searchInput) {
    await searchInput.type('Roland Corporation');
    await searchInput.press('Enter');
  } else 
  {
    throw new Error('No se encontró el campo de búsqueda');
  }

  // 4. Espera a que la página de resultados de búsqueda se cargue
  await page.waitForSelector('#firstHeading');

  // 5. Verifica que el título de la página contenga "Roland Corporation"
  const title = await page.title();
  expect(title).toContain('Roland Corporation');

  // Función para resaltar elementos usando Playwright locators y estilos inline
  const highlightElements = async (locator) => 
    {
    const elements = await locator.all(); // Obtiene todos los elementos que coinciden con el locator
    for (const element of elements) { // Itera sobre los elementos
      await element.scrollIntoViewIfNeeded(); // Asegura que el elemento esté visible antes de resaltarlo
      await element.evaluate((node) => 
        {
        node.style.backgroundColor = 'yellow';
        node.style.color = 'black';
      });
    }
  };

  // 6. Resalta los modelos 909 y 808
  await highlightElements(page.locator('text=909'));
  await page.waitForTimeout(3000);

  await highlightElements(page.locator('text=808'));
  await page.waitForTimeout(1000);

  // Verifica que aparezcan los modelos 909, 808
  const bodyText = await page.textContent('body');
  expect(bodyText).toContain('909');
  expect(bodyText).toContain('808');

  await page.waitForTimeout(2000);
});