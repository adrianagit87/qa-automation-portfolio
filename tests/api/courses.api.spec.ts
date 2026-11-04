import { test, expect } from '../fixtures';

// GET /api/courses · docs/contrato-api.md §3 (REQ-C01, REQ-C04).
// Cada test recibe su propio `request`: arranca SIN sesión. El contrato no dice si el endpoint la
// necesita (§3, «¿Necesita sesión? el documento no lo dice»): un 401/403 acá es una ambigüedad del
// contrato, no un defecto del test. Ningún test afirma que la necesita ni que no.

const CAMPOS_DE_CURSO = [
    'id',
    'title',
    'description',
    'level',
    'duration',
    'prerequisiteId',
    'maxStudents',
    'enrolled',
    'icon',
];

test('courses 1 · REQ-C01 · el catálogo responde 200 con courses y total', async ({ cursos }) => {
    // ACTUAR
    const respuesta = await cursos.listar();

    // VERIFICAR
    // §3: «Status esperado | `200`»
    expect(respuesta.status(), 'GET /api/courses no respondió el 200 que promete §3').toBe(200);

    // §3: «Qué devuelve | `{"courses":[...],"total":N}`»
    const cuerpo = await respuesta.json();
    expect(Array.isArray(cuerpo.courses), 'el campo "courses" no es un array').toBe(true);
    expect(typeof cuerpo.total, 'el campo "total" no es un número').toBe('number');
});

test('courses 2 · REQ-C01 · cada curso trae los nueve campos prometidos', async ({ cursos }) => {
    const respuesta = await cursos.listar();

    // §3: «Status esperado | `200`»
    expect(respuesta.status(), 'GET /api/courses no respondió el 200 que promete §3').toBe(200);

    const cuerpo = await respuesta.json();
    // Guarda aprobada por la QA (plan, nota ①): sin cursos, el chequeo de campos no prueba nada.
    // §0: «listar cursos con cupos y prerequisitos»
    expect(cuerpo.courses.length, 'el catálogo vino vacío: no hay cursos para verificar').toBeGreaterThan(0);

    // §3: «Campos de cada curso | `id`, `title`, `description`, `level`, `duration`, `prerequisiteId`, `maxStudents`, `enrolled`, `icon`»
    for (const curso of cuerpo.courses) {
        for (const campo of CAMPOS_DE_CURSO) {
            expect(curso, `al curso "${curso.id}" le falta el campo "${campo}"`).toHaveProperty(campo);
        }
    }
});

test('courses 3 · REQ-C04 · inscribirse reduce en 1 los cupos disponibles', async ({ cursos }) => {
    test.fail(); // BUG-COURSES-01, visto el 3/11/2026: después de inscribirse, los cupos de fundamentos siguen igual.
    // Lectura aprobada por la QA (plan, nota ②), SIN FUENTE en el contrato:
    // cupos disponibles = maxStudents − enrolled.
    const cuposDe = async (courseId: string) => {
        const respuesta = await cursos.listar();
        expect(respuesta.status(), 'GET /api/courses no respondió el 200 que promete §3').toBe(200);
        const { courses } = await respuesta.json();
        const curso = courses.find((c: { id: string }) => c.id === courseId);
        expect(curso, `el curso "${courseId}" no aparece en el catálogo`).toBeTruthy();
        return curso.maxStudents - curso.enrolled;
    };

    // PREPARAR
    const antes = await cuposDe('fundamentos');

    // ACTUAR · §1, caso 1: `{"courseId":"fundamentos"}` → `200` e inscrito
    const inscripcion = await cursos.inscribir('fundamentos');
    expect(inscripcion.status(), 'la inscripción no fue exitosa: REQ-C04 no aplica').toBe(200);

    // VERIFICAR
    // §3: «Al inscribirse exitosamente, el número de cupos disponibles debe reducirse en 1.»
    const despues = await cuposDe('fundamentos');
    expect(despues, 'los cupos disponibles no bajaron exactamente en 1').toBe(antes - 1);
});

