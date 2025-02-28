import { test, expect } from '@playwright/test';

test('Verifica la página de Enrique Morente en Wikipedia', async ({ page }) => {
    // 1. Abre el navegador en pantalla completa
    await page.setViewportSize({ width: 1920, height: 1080 });

    // 2. Navega a la página de Enrique Morente
    await page.goto('https://en.wikipedia.org/wiki/Enrique_Morente');

    // 3. Espera a que la página de resultados de búsqueda se cargue
    await page.waitForSelector('#firstHeading');

    // 4. Verifica que el título de la página contenga "Enrique Morente"
    const title = await page.title();
    expect(title).toContain('Enrique Morente');

    // Función para resaltar un solo elemento usando Playwright locators y estilos inline
    const highlightElement = async (locator) => {
        const element = await locator.first();
        if (element) {
            await element.scrollIntoViewIfNeeded();
            await element.evaluate((node) => {
                node.style.backgroundColor = 'yellow';
                node.style.color = 'black';
            });
        }
    };

    // 5. Resalta elementos clave 
    await highlightElement(page.locator('text=Flamenco singer'));
    await page.waitForTimeout(2000);

    await highlightElement(page.locator('text=Granada'));
    await page.waitForTimeout(2000);

});