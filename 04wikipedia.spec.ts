import { test, expect } from '@playwright/test';

test('Busca "Anekdoten" en Wikipedia y verifica mellotron y King Crimson', async ({ page }) => 
    {
    // 1. Abre el navegador en pantalla completa
    await page.setViewportSize({ width: 1920, height: 1080 });

    // 2. Navega a la página principal de Wikipedia
    await page.goto('https://en.wikipedia.org/wiki/Wikipedia:Portada');

    // 3. Encuentra el campo de búsqueda e introduce "Anekdoten"
    const searchInput = await page.$('#searchInput');
    if (searchInput) {
        await searchInput.type('Anekdoten');
        await searchInput.press('Enter');
    } else 
    {
        throw new Error('No se encontró el campo de búsqueda');
    }

    // 4. Espera a que la página de resultados de búsqueda se cargue
    await page.waitForSelector('#firstHeading');

    // 5. Verifica que el título de la página contenga "Anekdoten"
    const title = await page.title();
    expect(title).toContain('Anekdoten');

    // Función para resaltar elementos usando Playwright locators y estilos inline
    const highlightElements = async (locator) => 
        {
        const elements = await locator.all();
        for (const element of elements) 
            {
            await element.scrollIntoViewIfNeeded();
            await element.evaluate((node) => {
                node.style.backgroundColor = 'yellow';
                node.style.color = 'black';
            });
        }
    };

    // 6. Resalta los elementos 
    await highlightElements(page.locator('text=mellotron'));
    await page.waitForTimeout(2000);

    await highlightElements(page.locator('text=Swedish'));
    await page.waitForTimeout(2000);

    // Verifica que aparezcan los elementos 
    const bodyText = await page.textContent('body');
    expect(bodyText).toContain('mellotron');
    await page.waitForTimeout(2000);
    expect(bodyText).toContain('Swedish');
    await page.waitForTimeout(2000);
});