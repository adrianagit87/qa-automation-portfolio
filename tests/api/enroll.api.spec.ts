import { test, expect } from '../fixtures';

// POST /api/enroll · los cinco casos de REQ-A03, en seis tests.
// Fuente: docs/contrato-api.md §1 (tabla de REQ-A03, REQ-C02, REQ-C03, REQ-C05 y REQ-C06).
// Cada test recibe su propio `request`: arranca sin sesión y sin inscripciones previas.

test('caso 1 · REQ-A03 · inscribirse a un curso con cupo devuelve 200 e inscrito', async ({ cursos }) => {
    // ACTUAR
    const respuesta = await cursos.inscribir('fundamentos');

    // VERIFICAR
    expect(respuesta.status()).toBe(200);
    const cuerpo = await respuesta.json();
    expect(cuerpo.status).toBe('inscrito');
});

test('caso 2 · REQ-A01 · sin courseId devuelve 400 y dice qué falta', async ({ cursos }) => {
    const respuesta = await cursos.inscribirSinCurso();

    expect(respuesta.status()).toBe(400);
    const cuerpo = await respuesta.json();
    expect(cuerpo.error).toBe('El campo courseId es obligatorio');
});

test('caso 3 · REQ-A03 · un curso que no existe devuelve 404', async ({ cursos }) => {
    const respuesta = await cursos.inscribir('no-existe');

    expect(respuesta.status()).toBe(404);
    const cuerpo = await respuesta.json();
    expect(cuerpo.error).toBe('Curso no encontrado');
});

test('caso 4 · REQ-A03 · un curso sin cupos deja en lista de espera', async ({ cursos }) => {
    const respuesta = await cursos.inscribir('api-testing');

    expect(respuesta.status()).toBe(200);
    const cuerpo = await respuesta.json();
    expect(cuerpo.status).toBe('lista-espera');
});

test('caso 4 · REQ-C05 · en lista de espera no se muestra como inscrito', async ({ cursos }) => {
    test.fail(); // BUG-ENROLL-02, visto el 2/11/2026: displayStatus dice "inscrito" en lista de espera.
    const respuesta = await cursos.inscribir('api-testing');

    const cuerpo = await respuesta.json();
    expect(cuerpo.displayStatus).not.toBe('inscrito');
});

test('caso 5 · REQ-C06 · con el prerequisito pendiente rechaza con 403', async ({ cursos }) => {
    //test.fail(); // BUG-ENROLL-01, visto el 2/11/2026: responde 200 inscrito y REQ-C06 pide rechazo.
    const respuesta = await cursos.inscribir('playwright-cero');

    expect(respuesta.status()).toBe(403);
});