import { test, expect } from '@playwright/test';

test('Verifica la página del País Vasco en Wikipedia', async ({ page }) => {
    // 1. Abre el navegador en pantalla completa
    await page.setViewportSize({ width: 1920, height: 1080 });

    // 2. Navega a la página del País Vasco
    await page.goto('https://en.wikipedia.org/wiki/Basque_Country_(autonomous_community)');

    // 3. Espera a que la página de resultados de búsqueda se cargue
    await page.waitForSelector('#firstHeading');

    // 4. Verifica que el título de la página contenga "Basque Country"
    const title = await page.title();
    expect(title).toContain('Basque Country');

    // Función para resaltar un solo elemento usando Playwright locators y estilos inline
    const highlightElement = async (locator) => {
        const element = await locator.first();
        if (element) {
            await expect(element).toBeVisible({ timeout: 10000 });
            await element.scrollIntoViewIfNeeded({ timeout: 10000 });
            await element.evaluate((node) => {
                node.style.backgroundColor = 'yellow';
                node.style.color = 'black';
            });
        }
    };

    // 5. Resalta elementos clave del País Vasco
    await highlightElement(page.locator('text=Bilbao'));
    await page.waitForTimeout(2000);

    await highlightElement(page.locator('text=San Sebastián'));
    await page.waitForTimeout(2000);

    await highlightElement(page.locator('text=Vitoria-Gasteiz'));
    await page.waitForTimeout(2000);
});