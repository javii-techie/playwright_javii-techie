const { test, expect } = require('@playwright/test');

test('Interacción con Mockaroo', async ({ page }) => {
    // 1. Acceder al sitio de Mockaroo
    await page.goto('https://mockaroo.com/');
  
    // Esperar a que un elemento con el texto principal esté visible, por ejemplo, el título en h1 o el primer texto relevante.
    await page.waitForSelector('h1'); // Asegura que el h1 esté presente en la página
  
    // Verificar si contiene el texto "Mockaroo" en el h1
    const titleLocator = page.locator('h1');
    await expect(titleLocator).toContainText('Mockaroo'); // Esto verificará si el <h1> contiene el texto "Mockaroo"
  
    // 2. Validar el título principal
    await expect(titleLocator).toContainText('Mockaroo');
  
    // 3. Personalización de datos generados
    // Limpiar los campos existentes
    await page.click('text=Clear All Fields');
    
    // Agregar un nuevo campo de datos
    await page.click('text=Add another field');
    await page.fill('input[name="schema[fields_attributes][0][name]"]', 'First Name');
    await page.click('button:has-text("Choose a Type")');
    await page.fill('input[placeholder="Search"]', 'First Name');
    await page.keyboard.press('Enter');
  
    // Agregar otro campo
    await page.click('text=Add another field');
    await page.fill('input[name="schema[fields_attributes][1][name]"]', 'Last Name');
    await page.click('button:has-text("Choose a Type")');
    await page.fill('input[placeholder="Search"]', 'Last Name');
    await page.keyboard.press('Enter');
  
    // Cambiar el formato de salida
    await page.selectOption('select#schema_file_format', 'json'); // Cambiar a formato JSON
  
    // 4. Descargar datos generados
    const [download] = await Promise.all([
      page.waitForEvent('download'), // Esperar a que se inicie la descarga
      page.click('text=Download Data') // Hacer clic en el botón de descarga
    ]);
  
    // Guardar el archivo descargado
    const downloadPath = await download.path();
    console.log(`Archivo descargado en: ${downloadPath}`);
  
    // Validar que el archivo se descargó correctamente
    await expect(downloadPath).not.toBeNull();
  
    // 5. Validar redirección o finalización (opcional)
    console.log('Prueba completada con éxito');
});
