import { test, expect } from '../fixtures';

// El test del page object de registro · C14.
// Dice qué nombres tiene que exponer pages/registro.page.ts. Las aserciones viven acá, no en el POM.
// La preparación la hace la fixture registroPage de tests/fixtures.ts: crea el POM y llama a goto().
//
// ESTE ARCHIVO NO SE MODIFICA. Es la fuente contra la que se mide el page object.
// Si se cambia la expectativa para que pase, se fabricó el resultado.

// 1 · La línea base: los tres campos del mínimo de la tarea, los que ya tenía tu page object a mano.
test('línea base: los tres campos del page object a mano', async ({ registroPage }) => {
  // VERIFICAR
  await expect(registroPage.nombre).toBeVisible();
  await expect(registroPage.email).toBeVisible();
  await expect(registroPage.contrasena).toBeVisible();
});

// 2 · Completo: los tres de arriba, más la edad y el botón. Es el objetivo del agente.
test('completo: los cinco controles del registro', async ({ registroPage }) => {
  // VERIFICAR
  await expect(registroPage.nombre).toBeVisible();
  await expect(registroPage.email).toBeVisible();
  await expect(registroPage.contrasena).toBeVisible();
  await expect(registroPage.edad).toBeVisible();
  await expect(registroPage.botonCrearCuenta).toBeVisible();
});
