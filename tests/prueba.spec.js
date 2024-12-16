const { test, expect } = require('@playwright/test');

test('Login Test - The Internet', async ({ page }) => {
  // 1. Visitar la página de inicio de sesión de Herokuapp
  await page.goto('http://the-internet.herokuapp.com/login');

  // 2. Completar el formulario de inicio de sesión
  await page.fill('input[name="username"]', 'tomsmith');  // Usuario de prueba
  await page.fill('input[name="password"]', 'SuperSecretPassword!');  // Contraseña de prueba

  // 3. Esperar que el botón de inicio de sesión esté visible
  await page.waitForSelector('button[type="submit"]', { state: 'visible' });

  // 4. Hacer clic en el botón de inicio de sesión (forzarlo si es necesario)
  await page.click('button[type="submit"]', { force: true });

  // 5. Esperar que la página redirija después del inicio de sesión
  await page.waitForURL('http://the-internet.herokuapp.com/secure');  // URL de éxito

  // 6. Verificar que la página de destino tenga el texto esperado
  await expect(page.locator('div.flash.success')).toContainText('You logged into a secure area!');

  // Opcional: Esperar por un tiempo adicional (solo para fines de visualización)
  await page.waitForTimeout(2000);  // 2 segundos

  // 7. Cerrar el navegador
  await page.close();
});
