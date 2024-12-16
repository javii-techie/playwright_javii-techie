const { test, expect } = require('@playwright/test');

test('Mockaroo - Verificar inicio de sesión', async ({ page }) => {
  // 1. Visitar la página principal de Mockaroo
  await page.goto('https://mockaroo.com/');

  // 2. Hacer clic en "Sign In"
  await page.click('text=Sign In');

  // 3. Llenar las credenciales de inicio de sesión
  await page.fill('input[name="email"]', 'tu_correo@example.com');
  await page.fill('input[name="password"]', 'tu_contraseña');

  // 4. Hacer clic en el botón de inicio de sesión
  await page.click('button:has-text("Sign In")');

  // 5. Esperar a que aparezca un elemento que confirme que el usuario ha iniciado sesión
  const userProfileLocator = page.locator('text=Your Account'); // Cambia esto si hay otro texto específico tras iniciar sesión
  await expect(userProfileLocator).toBeVisible();

  console.log('Inicio de sesión verificado con éxito.');
});
