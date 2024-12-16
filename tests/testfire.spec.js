const { test, expect } = require('@playwright/test');

test('Login TestFire demo site', async ({ page }) => {
  // 1. Abrir la página de inicio de sesión
  await page.goto('https://demo.testfire.net/login.jsp');

  // 2. Llenar el formulario con credenciales válidas
  await page.fill('input[name="uid"]', 'admin'); // Campo de usuario
  await page.fill('input[name="passw"]', 'admin'); // Campo de contraseña

  // 3. Hacer clic en el botón de inicio de sesión
  await page.click('input[value="Login"]');

  // 4. Verificar que el inicio de sesión fue exitoso
  await expect(page.locator('text=Congratulations')).toBeVisible();

  // 5. Cerrar sesión
  await page.click('a:has-text("Sign Off")');

  // 6. Validar que se redirigió correctamente
  await expect(page).toHaveURL('https://demo.testfire.net/index.jsp'); // Validar URL
  // Usar un selector alternativo si el texto esperado no es visible
  await expect(page.locator('a:has-text("Sign In")')).toBeVisible();

  // Captura de pantalla para verificar visualmente
  await page.screenshot({ path: 'logout-page.png' });

  // Imprimir contenido HTML para inspección
  console.log(await page.content());
});
