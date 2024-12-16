const { test, expect } = require('@playwright/test');

test('Validar Radio Button "Yes" en DemoQA', async ({ page }) => {
    // Navegar a la página de Radio Button
    await page.goto('https://demoqa.com/radio-button');

    // Seleccionar el radio button "Yes"
    await page.click('label[for="yesRadio"]');
  
    // Validar que el texto en #result refleja "Yes"
    await expect(page.locator('.text-success')).toContainText('Yes', { timeout: 10000 });

    console.log('Prueba completada con éxito');
});
