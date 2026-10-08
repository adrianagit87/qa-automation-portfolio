import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

// Caso C01 · Ítem L1 · REQ-L04
// Login con credenciales válidas muestra el saludo con el nombre.
// Fuente: docs/fuente-demostracion-c10.md, sección "El caso C01".

test('L1 · login con credenciales válidas muestra el saludo', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // PREPARAR
  await loginPage.goto();

  // ACTUAR
  await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');

  // VERIFICAR
  await expect(loginPage.saludo).toHaveText('¡Hola, Ana!');
});

// Caso C02 · REQ-L02 · CA2
// Login con email no registrado muestra mensaje de error.
// Fuente: docs/casos-login-v2.md §5, fila C02.

test('C02 · login con email no registrado muestra error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // PREPARAR
  await loginPage.goto();

  // ACTUAR
  await loginPage.login('noexiste@ejemplo.com', 'Segura2026!');

  // VERIFICAR
  await expect(loginPage.mensajeError).toHaveText('Email o contraseña incorrectos');
});

// Caso C03 · REQ-L02 · CA2
// Login con contraseña incorrecta muestra mensaje de error.
// Fuente: docs/casos-login-v2.md §5, fila C03.

test('C03 · login con contraseña incorrecta muestra error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // PREPARAR
  await loginPage.goto();

  // ACTUAR
  await loginPage.login('ana.garcia@ejemplo.com', 'Incorrecta1!');

  // VERIFICAR
  await expect(loginPage.mensajeError).toHaveText('Email o contraseña incorrectos');
  await expect(loginPage.saludo).not.toBeVisible();
  await expect(loginPage.botonIniciarSesion).toBeVisible();
});

// Caso C04 · REQ-L01 · CA1
// Login con email vacío muestra mensaje de error de campo obligatorio.
// Fuente: docs/casos-login-v2.md §5, fila C04.

test('C04 · login con email vacío muestra error de campo obligatorio', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // PREPARAR
  await loginPage.goto();

  // ACTUAR
  await loginPage.contrasena.fill('Segura2026!');
  await loginPage.botonIniciarSesion.click();

  // VERIFICAR
  await expect(loginPage.mensajeError).toHaveText('El email es obligatorio');
});
