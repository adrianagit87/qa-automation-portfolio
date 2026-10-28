import { test, expect } from '@playwright/test';
import { AuthService } from '../../services/auth.service';

// Caso C08 · REQ-L03 · CA3
// Cuatro intentos fallidos todavía no bloquean: el bloqueo es a los cinco.
// Fuente: docs/casos-login-v2.md §5, fila C08.
// Prueba el SERVIDOR real, sin pantalla y sin simular nada.

test('C08 API · REQ-L03 · el cuarto intento fallido todavía no bloquea', async ({ request }) => {
  test.fail(); // Bug conocido, visto el 28/10/2026: el servidor bloquea al cuarto intento y REQ-L03 dice al quinto.
  const auth = new AuthService(request);

  // ACTUAR · cuatro intentos fallidos seguidos, con la misma sesión
  await auth.login('ana.garcia@ejemplo.com', 'Incorrecta1!');
  await auth.login('ana.garcia@ejemplo.com', 'Incorrecta1!');
  await auth.login('ana.garcia@ejemplo.com', 'Incorrecta1!');
  const cuarto = await auth.login('ana.garcia@ejemplo.com', 'Incorrecta1!');

  // VERIFICAR · el cuarto todavía es un error común, no un bloqueo
  expect(cuarto.status()).toBe(401);
});
