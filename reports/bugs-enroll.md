# Bugs de POST /api/enroll

> Evidencia del 2026-11-02, de la API del playground. La severidad queda pendiente: la decide la QA.

## BUG-ENROLL-01 · El prerequisito pendiente no se valida en la API

- **Dónde:** `POST https://playground.calidadsinhumo.com/api/enroll`
- **Dato:** `{"courseId":"playwright-cero"}`, sin sesión previa
- **Para reproducirlo:** `npx playwright test tests/api/enroll.api.spec.ts -g "caso 5"`, quitando `test.fail()`
- **Esperado:** `403`, rechazo por prerequisito pendiente. `docs/contrato-api.md` §1, caso 5, y REQ-C06: «Un curso con prerequisito pendiente debe ser rechazado tanto en la UI como en la API.»
- **Obtenido:** `200`

  ```json
  {"courseId":"playwright-cero","status":"inscrito","displayStatus":"inscrito","progress":0,"certificates":0,"enrolledAt":1793669716704,"message":"Inscripción exitosa a \"Playwright desde cero\"","spotsLeft":3}
  ```

- **Fecha y quién lo vio:** 2026-11-02, corrida del repositorio de demostración
- **Severidad:** `PENDIENTE`

## BUG-ENROLL-02 · En lista de espera, el campo de visualización dice «inscrito»

- **Dónde:** `POST https://playground.calidadsinhumo.com/api/enroll`
- **Dato:** `{"courseId":"api-testing"}`, curso sin cupos
- **Para reproducirlo:** `npx playwright test tests/api/enroll.api.spec.ts -g "REQ-C05"`, quitando `test.fail()`
- **Esperado:** REQ-C05: «Si el estudiante queda en lista de espera, el badge debe mostrar 'Lista de espera' (no 'Inscrito').»
- **Obtenido:** `200`

  ```json
  {"courseId":"api-testing","status":"lista-espera","displayStatus":"inscrito","progress":0,"certificates":0,"enrolledAt":1793669717107,"message":"Sin cupos para \"API Testing con Playwright\". Agregado a lista de espera.","spotsLeft":0}
  ```

- **Alcance:** verificado por API. No se verificó en la pantalla si el badge usa este campo.
- **Fecha y quién lo vio:** 2026-11-02, corrida del repositorio de demostración
- **Severidad:** `PENDIENTE`

## Hallazgos que no son bugs

Están en `docs/contrato-api.md` §5, con la misma fecha.

- Sin sesión, `/api/enroll` responde `200` y entrega una cookie `ash_session` nueva. El contrato no define si necesita sesión.
- Repetir la inscripción con la misma sesión devuelve `409` con `{"error":"Ya estás inscrito en este curso"}`. No está documentado.
- Un pedido sin cuerpo devuelve `500` con el body vacío. El contrato no define el body mal formado.
- `GET /api/enroll` devuelve `405`. El contrato no define los métodos que no acepta.
- El contrato se contradice: el caso 4 promete lista de espera para `api-testing`, y la tabla de REQ-C02 dice rechazado si el prerequisito no está completado.
