import { test, expect } from '@playwright/test';

test('Busca "Ibanez Musician Bass" en Wikipedia y verifica modelos MC-888 y MC-924', async ({ page }) => {
  // 1. Abre el navegador en pantalla completa
  await page.setViewportSize({ width: 1920, height: 1080 });

  // 2. Navega a la página principal de Wikipedia (en inglés)
  await page.goto('https://en.wikipedia.org/wiki/Wikipedia:Portada');

  // 3. Encuentra el campo de búsqueda e introduce "Ibanez Musician Bass"
  const searchInput = await page.$('#searchInput');
  if (searchInput) {
    await searchInput.type('Ibanez Musician Bass');
    await searchInput.press('Enter');
  } else {
    throw new Error('No se encontró el campo de búsqueda');
  }

  // 4. Espera a que la página de resultados de búsqueda se cargue
  await page.waitForSelector('#firstHeading');

  // 5. Verifica que el título de la página contenga "Ibanez Musician Bass" (CORREGIDO)
  const title = await page.title();
  expect(title).toContain('Ibanez Musician Bass'); // Coincidencia parcial y sensible a mayúsculas

  // Función para resaltar elementos usando Playwright locators y estilos inline
  const highlightElements = async (locator) => {
    const elements = await locator.all();
    for (const element of elements) {
      await element.scrollIntoViewIfNeeded();
      await element.evaluate((node) => {
        node.style.backgroundColor = 'yellow';
        node.style.color = 'black';
      });
    }
  };

  // 6. Resalta los modelos MC-888 y MC-924
  await highlightElements(page.locator('text=MC-888'));
  await page.waitForTimeout(1000);

  await highlightElements(page.locator('text=MC-924'));
  await page.waitForTimeout(1000);

  // 7. Espera 2 segundos (2000 milisegundos)
  await page.waitForTimeout(2000);

  // 8. Verifica que aparezcan los modelos MC-888 y MC-924 (opcional)
  const bodyText = await page.textContent('body');
  expect(bodyText).toContain('MC-888');
  expect(bodyText).toContain('MC-924');

  await page.waitForTimeout(2000);
});