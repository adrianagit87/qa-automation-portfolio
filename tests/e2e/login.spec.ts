import { test, expect } from '../fixtures';

// Caso C01 · Ítem L1 · REQ-L04
// Login con credenciales válidas muestra el saludo con el nombre.
// Fuente: docs/fuente-demostracion-c10.md, sección "El caso C01".

test('L1 · login con credenciales válidas muestra el saludo', async ({ loginPage }) => {
  // ACTUAR
  await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');

  // VERIFICAR
  await expect(loginPage.saludo).toHaveText('¡Hola, Ana!');
});

// Casos C02 a C05 · los cuatro negativos del login.
// Fuente: docs/casos-login-v2.md §5, una fila de la tabla por caso.
// Mismos pasos y mismas tres aserciones; cambian los datos y el error esperado.

const negativos = [
  {
    caso: 'C02', req: 'REQ-L02', titulo: 'login con email no registrado muestra error y no entra',
    email: 'noexiste@ejemplo.com', contrasena: 'Segura2026!', error: 'Email o contraseña incorrectos'
  },
  {
    caso: 'C03', req: 'REQ-L02', titulo: 'login con contraseña incorrecta muestra error y no entra',
    email: 'ana.garcia@ejemplo.com', contrasena: 'Incorrecta1!', error: 'Email o contraseña incorrectos'
  },
  {
    caso: 'C04', req: 'REQ-L01', titulo: 'login con email vacío muestra error de campo obligatorio y no entra',
    email: '', contrasena: 'Segura2026!', error: 'El email es obligatorio'
  },
  {
    caso: 'C05', req: 'REQ-L01', titulo: 'login con contraseña vacía muestra error de campo obligatorio y no entra',
    email: 'ana.garcia@ejemplo.com', contrasena: '', error: 'La contraseña es obligatoria'
  },
];

for (const fila of negativos) {
  test(`${fila.caso} · ${fila.req} · ${fila.titulo}`, async ({ loginPage }) => {
    // ACTUAR
    await loginPage.login(fila.email, fila.contrasena);

    // VERIFICAR · lo que SÍ pasa, lo que NO pasa, y dónde sigo
    await expect(loginPage.mensajeError).toHaveText(fila.error);
    await expect(loginPage.saludo).not.toBeVisible();
    await expect(loginPage.botonIniciarSesion).toBeVisible();
  });
}