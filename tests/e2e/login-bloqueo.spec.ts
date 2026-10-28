import { test, expect } from '../fixtures';

// Casos C09 y C10 · REQ-L03 · CA3
// Durante el bloqueo, el botón está deshabilitado y un aviso muestra los segundos que faltan.
// Fuente: docs/casos-login-v2.md §5, filas C09 y C10.
// Prueba la PANTALLA: el servidor está simulado. No dice nada de cuándo bloquea el servidor real.

test('C09 · C10 · REQ-L03 · con el servidor simulado en 429, la pantalla deshabilita el botón y muestra la espera', async ({ page, loginPage }) => {
  // PREPARAR · el servidor simulado: el login responde lo mismo que el real cuando bloquea
  await page.route('**/api/login', (ruta) => ruta.fulfill({
    status: 429,
    json: {
      error: 'Demasiados intentos fallidos. Cuenta bloqueada por 30 segundos.',
      locked: true,
      attempts: 4,
      maxAttempts: 5,
    },
  }));

  // ACTUAR
  await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta1!');

  // VERIFICAR · lo que la pantalla hace con esa respuesta
  await expect(loginPage.avisoBloqueo).toContainText('Puedes intentar de nuevo en');
  await expect(loginPage.botonBloqueado).toBeDisabled();
  await expect(loginPage.saludo).not.toBeVisible();
});
