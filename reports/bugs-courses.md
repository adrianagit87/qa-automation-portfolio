# Bugs de GET /api/courses

> Evidencia del 2026-11-03, de la API del playground: corrida de `@api-agent` con
> `npx playwright test tests/api/courses.api.spec.ts` (exit code 1, 2 pasados y 1 fallido). Detalle en
> `reports/api-agent-report.md`. La severidad la decide la QA.

## Bugs

Ninguno. En esta corrida, ningún resultado contradice algo que `docs/contrato-api.md` defina. Lo
que se observó está abajo, como hallazgos.

## Hallazgos que no son bugs

### H-COURSES-01 · Después de una inscripción exitosa, `maxStudents − enrolled` no baja

- **Dónde:** `GET https://playground.calidadsinhumo.com/api/courses`, antes y después de `POST https://playground.calidadsinhumo.com/api/enroll`
- **Dato:** `{"courseId":"fundamentos"}`, sin sesión previa. Las tres llamadas salieron desde el mismo `request`.
- **Para reproducirlo:** `npx playwright test tests/api/courses.api.spec.ts -g "courses 3"`. El agente no ejecutó el comando con `-g`: corrió el archivo completo.
- **Lo que dice la fuente:** `docs/contrato-api.md` §3, REQ-C04: «Al inscribirse exitosamente, el número de cupos disponibles debe reducirse en 1.»
- **Obtenido** (copiado de la salida del runner):

  ```text
  courses 3 · REQ-C04 · inscribirse reduce en 1 los cupos disponibles
  Error: los cupos disponibles no bajaron exactamente en 1
  Expected: 5
  Received: 6
  ```

  La inscripción respondió `200`: la aserción anterior, `la inscripción no fue exitosa`, no falló.
- **Por qué no es un bug:** el contrato no dice qué campo representa los «cupos disponibles». El
  test usa `maxStudents − enrolled`, una lectura que la QA aprobó en el plan y que no tiene fuente.
  Tampoco está definido si `enrolled` es global o depende de la sesión.
- **Pregunta para el equipo de producto:** ¿«cupos disponibles» significa `maxStudents − enrolled`
  en `GET /api/courses`, o es otro campo? Como dato de contexto, la evidencia del 2026-11-02 en
  `reports/bugs-enroll.md` muestra que `POST /api/enroll` devuelve un campo `spotsLeft`, que tampoco
  figura en el contrato.
- **Si se confirma `maxStudents − enrolled`:** pasa a ser un bug con REQ-C04 como fuente.
- **Fecha y quién lo vio:** 2026-11-03, corrida de `@api-agent`

### H-COURSES-02 · `GET /api/courses` responde sin sesión

- **Dónde:** `GET https://playground.calidadsinhumo.com/api/courses`
- **Dato:** ninguno, sin cookie `ash_session`
- **Obtenido:** `courses 1` y `courses 2` pasaron. El endpoint respondió `200`, con `courses` como array, `total` como número y los nueve campos en cada curso.
- **Lo que dice la fuente:** `docs/contrato-api.md` §3: «¿Necesita sesión? | **el documento no lo dice**»
- **Por qué no es un bug:** el contrato no lo define. Es una observación con fecha, no una regla.
- **Fecha y quién lo vio:** 2026-11-03, corrida de `@api-agent`

## SIN COMPROBAR

- Los valores crudos de `maxStudents` y `enrolled` del curso `fundamentos`, antes y después de
  inscribirse. La evidencia solo muestra el resultado de la resta (`Expected: 5`, `Received: 6`), no
  los bodies.
- El body de la respuesta de `POST /api/enroll` en esta corrida. Solo consta que respondió `200`.

---

**Severidad: PENDIENTE** · El reporte lo firma la QA que lo revisa.

