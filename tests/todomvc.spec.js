const { test, expect } = require("@playwright/test");

test("Interacciones básicas con TodoMVC", async ({ page }) => {
  // 1. Abrir la página de TodoMVC
  await page.goto("https://todomvc.com/examples/react/", { timeout: 60000 });
  page.setDefaultTimeout(60000);

  await page.waitForSelector('.new-todo', { timeout: 60000 });

  const isVisible = await page.isVisible('.new-todo');
console.log('El selector .new-todo es visible:', isVisible);
if (!isVisible) {
  throw new Error('El campo .new-todo no está visible. Verifica el selector o la página.');
}

  // 2. Agregar nuevos elementos a la lista de tareas
  await page.fill(".new-todo", "Tarea 1"), { timeout: 60000 };
  await page.press(".new-todo", "Enter");

  await page.fill(".new-todo", "Tarea 2"), { timeout: 60000 };
  await page.press(".new-todo", "Enter");

  await page.fill(".new-todo", "Tarea 3"), { timeout: 60000 };
  await page.press(".new-todo", "Enter");

  // Verificar que las tareas se hayan agregado
  const todoItems = await page.locator(".todo-list li");
  await expect(todoItems).toHaveCount(3);

  // 3. Marcar una tarea como completada
  await page.locator(".todo-list li:nth-child(1) .toggle").check();
  const completedItems = await page.locator(".todo-list li.completed");
  await expect(completedItems).toHaveCount(1);

  // 4. Eliminar una tarea
  await page.hover(".todo-list li:nth-child(2)");
  await page.locator(".todo-list li:nth-child(2) .destroy").click();
  await expect(todoItems).toHaveCount(2);

  // 5. Filtrar tareas completadas
  await page.click('text=Completed');
  const visibleItems = await page.locator(".todo-list li");
  await expect(visibleItems).toHaveCount(1);

  // 6. Filtrar tareas activas
  await page.click('text=Active');
  const activeItems = await page.locator(".todo-list li");
  await expect(activeItems).toHaveCount(1);

  // 7. Ver todas las tareas
  await page.click('text=All');
  await expect(todoItems).toHaveCount(2);
});
