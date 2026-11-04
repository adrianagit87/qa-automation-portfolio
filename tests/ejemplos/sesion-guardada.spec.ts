import { test, expect } from '../fixtures';
import { AuthService } from '../../services/auth.service';

// EJEMPLO, no es parte de la suite del contrato.
// Login por API → se guarda la sesión en un archivo → otro test arranca con esa sesión ya puesta.
//
// Ojo con el playground, comprobado el 4/11/2026: el servidor guarda la inscripción en la sesión,
// pero ninguna pantalla la muestra (/mi-progreso es de la cuenta real de la Academia). Por eso el
// test 2 verifica la sesión del NAVEGADOR (su cookie y lo que el servidor guarda con ella) y no un
// texto en pantalla. En una app donde la pantalla sí usa la sesión, ahí iría el page.goto + expect.

const SESION = '.auth/ana.json'; // en .gitignore: quien tenga este archivo entra como Ana

// Los dos tests van en orden: el 1 escribe el archivo que el 2 lee.
test.describe.configure({ mode: 'serial' });

test('1 · login por API y se guarda la sesión', async ({ request }) => {
  // ACTUAR: login sin abrir el navegador
  const respuesta = await new AuthService(request).login('ana.garcia@ejemplo.com', 'Segura2026!');
  expect(respuesta.status()).toBe(200);

  // GUARDAR: las cookies (y el localStorage, si hubiera) van a un JSON
  await request.storageState({ path: SESION });
});

test.describe('2 · con la sesión guardada', () => {
  // CARGAR: el navegador de este test nace con la cookie del archivo, sin pasar por /login
  test.use({ storageState: SESION });

  test('el navegador ya tiene la sesión, y lo que hace con ella queda guardado', async ({ page }) => {
    // La cookie llegó al navegador sin hacer login
    const cookies = await page.context().cookies();
    expect(cookies.map((c) => c.name)).toContain('ash_session');

    // page.request usa la MISMA sesión que el navegador
    const inscripcion = await page.request.post('/api/enroll', { data: { courseId: 'fundamentos' } });
    expect(inscripcion.status()).toBe(200);

    // El servidor la guardó en esa sesión
    const progreso = await (await page.request.get('/api/progress')).json();
    expect(progreso.enrollments.map((e: { courseId: string }) => e.courseId)).toContain('fundamentos');

    // En una app real, acá seguiría la pantalla:
    // await page.goto('/mi-progreso');
    // await expect(page.getByText('Fundamentos de Testing')).toBeVisible();
  });
});
