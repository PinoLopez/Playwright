import { test, expect } from '@playwright/test';

test('Busca "Intel" en Wikipedia y verifica datos', async ({ page }) => 
    {
    // 1. Abre el navegador 
    await page.setViewportSize({ width: 1920, height: 1080 });

    // 2. Navega a la página principal 
    await page.goto('https://en.wikipedia.org/wiki/Wikipedia:Portada');

    // 3. Encuentra el campo de búsqueda e introduce "Intel"
    const searchInput = await page.$('#searchInput');
    if (searchInput)
        {
        await searchInput.type('Intel');
        await searchInput.press('Enter');
    } else 
    {
        throw new Error('No se encontró el campo de búsqueda');
    }

    // 4. Espera a que la página de resultados de búsqueda se cargue
    await page.waitForSelector('#firstHeading');

    // 5. Verifica que el título de la página contenga "Intel"
    const title = await page.title();
    expect(title).toContain('Intel');

    // Función para resaltar un solo elemento usando Playwright locators y estilos inline
    const highlightElement = async (locator) => 
        {
        const element = await locator.first(); // Selecciona solo el primer elemento coincidente
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

    await highlightElement(page.locator('text=semiconductor chips'));
    await page.waitForTimeout(2000);

    await highlightElement(page.locator('text=multinational corporation'));
    await page.waitForTimeout(2000);

    await highlightElement(page.locator('text=1968'));
    await page.waitForTimeout(2000);

});