import { test, expect } from '@playwright/test';

test('Verifica la página de Voivod en Wikipedia', async ({ page }) => 
    {
    // 1. Abre el navegador en pantalla completa
    await page.setViewportSize({ width: 1920, height: 1080 });

    // 2. Navega a la página de Voivod
    await page.goto('https://en.wikipedia.org/wiki/Voivod_(band)');

    // 3. Espera a que la página de resultados de búsqueda se cargue
    await page.waitForSelector('#firstHeading');

    // 4. Verifica que el título de la página contenga "Voivod (band)"
    const title = await page.title();
    expect(title).toContain('Voivod (band)');

    // Función para resaltar un solo elemento usando Playwright locators y estilos inline
    const highlightElement = async (locator) => 
        {
        const element = await locator.first();
        if (element) 
            {
            await element.scrollIntoViewIfNeeded();
            await element.evaluate((node) => 
                {
                node.style.backgroundColor = 'yellow';
                node.style.color = 'black';
            });
        }
    };

    // 5. Resalta elementos clave (opcional)
    await highlightElement(page.locator('text=Progressive metal'));
    await page.waitForTimeout(2000);

    await highlightElement(page.locator('text=Thrash metal'));
    await page.waitForTimeout(2000);

    await highlightElement(page.locator('text=1982'));
    await page.waitForTimeout(2000);

});