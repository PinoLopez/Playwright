import { test, expect } from '@playwright/test';

test('Busca "M-Audio" en Wikipedia y verifica audio interfaces y MIDI controllers', async ({ page }) => 
    {
    // 1. Abre el navegador en pantalla completa
    await page.setViewportSize({ width: 1920, height: 1080 });

    // 2. Navega a la página principal de Wikipedia
    await page.goto('https://en.wikipedia.org/wiki/Wikipedia:Portada');

    // 3. Encuentra el campo de búsqueda e introduce "M-Audio"
    const searchInput = await page.$('#searchInput');
    if (searchInput) {
        await searchInput.type('M-Audio');
        await searchInput.press('Enter');
    } else {
        throw new Error('No se encontró el campo de búsqueda');
    }

    // 4. Espera a que la página de resultados de búsqueda se cargue
    await page.waitForSelector('#firstHeading');

    // 5. Verifica que el título de la página contenga "M-Audio"
    const title = await page.title();
    expect(title).toContain('M-Audio');

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

    // 6. Resalta los elementos "audio interfaces" y "MIDI controllers"
    await highlightElements(page.locator('text=audio interfaces'));
    await page.waitForTimeout(2000);

    await highlightElements(page.locator('text=MIDI controllers'));
    await page.waitForTimeout(2000);

    // Verifica que aparezcan los elementos "audio interfaces" y "MIDI controllers"
    const bodyText = await page.textContent('body');
    expect(bodyText).toContain('audio interfaces');
    await page.waitForTimeout(2000);
    expect(bodyText).toContain('MIDI controllers');
    await page.waitForTimeout(2000);
});