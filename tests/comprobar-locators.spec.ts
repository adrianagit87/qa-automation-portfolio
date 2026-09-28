import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://playground.calidadsinhumo.com/login';

test('comprueba locators semánticos del login', async ({ page }) => {
  await page.goto(LOGIN_URL);

  const email = page.getByLabel('Email');
  const password = page.getByLabel('Contraseña');
  const submit = page.getByRole('button', { name: 'Iniciar sesión' });

  await expect(email).toHaveCount(1);
  await expect(password).toHaveCount(1);
  await expect(submit).toHaveCount(1);

  await expect(email).toBeVisible();
  await expect(password).toBeVisible();
  await expect(submit).toBeVisible();
});

// Gate nuevo de C10: no tiene evidencia válida hasta que esta versión ampliada termine y se
// registre su salida real. No confundir con el 1 passed histórico de C4, que cubría el test anterior.
test('comprueba el locator y el texto observable del saludo', async ({ page }) => {
  await page.goto(LOGIN_URL);

  await page.getByLabel('Email').fill('ana.garcia@ejemplo.com');
  await page.getByLabel('Contraseña').fill('Segura2026!');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  const welcome = page.getByTestId('login-welcome');

  await expect(welcome).toHaveCount(1);
  await expect(welcome).toBeVisible();
  await expect(welcome).toHaveText('¡Hola, Ana!');
});
