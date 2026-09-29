import { test, expect } from '@playwright/test';

// Caso C01 · Ítem L1 · REQ-L04
// Login con credenciales válidas muestra el saludo con el nombre.
// Fuente: docs/fuente-demostracion-c10.md, sección "El caso C01".
// Locators: docs/mapa-selectores.md, tabla de refinamiento S4.

test('L1 · login con credenciales válidas muestra el saludo', async ({ page }) => {
  // PREPARAR
  await page.goto('/login');

  // ACTUAR
  await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
  await page.getByLabel('Contraseña').fill('Segura2026!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // VERIFICAR
  await expect(page.getByTestId('login-welcome')).toHaveText('¡Hola, Ana!');
});

// Caso C02 · REQ-L02 · CA2
// Login con email no registrado muestra mensaje de error.
// Fuente: docs/casos-login-v2.md §5, fila C02.
// Locators: docs/mapa-selectores.md, tabla de refinamiento S4.

test('C02 · login con email no registrado muestra error', async ({ page }) => {
  // PREPARAR
  await page.goto('/login');

  // ACTUAR
  await page.getByLabel('Email').fill('noexiste@ejemplo.com');
  await page.getByLabel('Contraseña').fill('Segura2026!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // VERIFICAR
  await expect(page.getByTestId('login-error')).toHaveText('Email o contraseña incorrectos');
});

// Caso C03 · REQ-L02 · CA2
// Login con contraseña incorrecta muestra mensaje de error.
// Fuente: docs/casos-login-v2.md §5, fila C03.
// Locators: docs/mapa-selectores.md, tabla de refinamiento S4.

test('C03 · login con contraseña incorrecta muestra error', async ({ page }) => {
  // PREPARAR
  await page.goto('/login');

  // ACTUAR
  await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
  await page.getByLabel('Contraseña').fill('Incorrecta1!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // VERIFICAR
  await expect(page.getByTestId('login-error')).toHaveText('Email o contraseña incorrectos');
});

// Caso C04 · REQ-L01 · CA1
// Login con email vacío muestra mensaje de error de campo obligatorio.
// Fuente: docs/casos-login-v2.md §5, fila C04.
// Locators: docs/mapa-selectores.md, tabla de refinamiento S4.

test('C04 · login con email vacío muestra error de campo obligatorio', async ({ page }) => {
  // PREPARAR
  await page.goto('/login');

  // ACTUAR
  await page.getByLabel('Contraseña').fill('Segura2026!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // VERIFICAR
  await expect(page.getByTestId('login-error')).toHaveText('El email es obligatorio');
});
