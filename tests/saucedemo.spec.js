const { test, expect } = require('@playwright/test');

test('Prueba de inicio de sesión en Sauce Demo', async ({ page }) => {
    // 1. Acceder al sitio de Sauce Demo
    await page.goto('https://www.saucedemo.com/');

    // 2. Completar las credenciales de usuario
    await page.fill('input[data-test="username"]', 'standard_user'); // Usuario
    await page.fill('input[data-test="password"]', 'secret_sauce'); // Contraseña

    // 3. Hacer clic en el botón de inicio de sesión
    await page.click('input[data-test="login-button"]');

    // 4. Validar que el inicio de sesión fue exitoso
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // Verificar URL
    await expect(page.locator('.title')).toHaveText('Products'); // Verificar el título en la página

    console.log('Inicio de sesión exitoso.');

    // 5. Cerrar sesión (opcional)
    await page.click('#react-burger-menu-btn'); // Abrir el menú lateral
    await page.click('#logout_sidebar_link'); // Cerrar sesión
    await expect(page).toHaveURL('https://www.saucedemo.com/'); // Validar redirección al login

    console.log('Cierre de sesión exitoso.');
});
