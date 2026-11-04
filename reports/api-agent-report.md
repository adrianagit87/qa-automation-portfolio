# Reporte de @api-agent — GET /api/courses

- **Fecha:** 2026-11-03
- **Modo:** `CONTINUAR` (había base: `CursosService`, fixture `cursos`, `tests/api/enroll.api.spec.ts`)
- **Objetivo:** cubrir `docs/contrato-api.md` §3, `GET /api/courses`, incluida la pregunta de si necesita sesión
- **Fuente:** `docs/contrato-api.md`
- **Alcance:** `tests/api/courses.api.spec.ts` · `services/cursos.service.ts` · `reports/api-agent-report.md`
- **Estado:** `ESCALADO`
- **Intentos:** 1 de 3

---

## 1. Lista blanca de rutas (contrato §0)

`POST /api/login` · `POST /api/enroll` · `GET /api/courses` · `GET /api/auth/me` · `GET /api/progress`

Rutas usadas por la suite: `GET /api/courses` y, en la fila 3, `POST /api/enroll`.

## 2. Plan aprobado y trazabilidad

La QA aprobó el plan con `todo aprobado` (2026-11-03 21:16). El agente lo interpretó como
`PLAN APROBADO`, con ① entra y ② entra.

| # | Test | Método + ruta | Dato | Status esperado | REQ | Línea textual del contrato |
|---|---|---|---|---|---|---|
| 1 | `courses 1 · REQ-C01 · el catálogo responde 200 con courses y total` | `GET /api/courses` | sin sesión | `200` | REQ-C01 | §3: «Status esperado `200`» · «Qué devuelve `{"courses":[...],"total":N}`» |
| 2 | `courses 2 · REQ-C01 · cada curso trae los nueve campos prometidos` | `GET /api/courses` | sin sesión | `200` | REQ-C01 | §3: «Campos de cada curso `id`, `title`, `description`, `level`, `duration`, `prerequisiteId`, `maxStudents`, `enrolled`, `icon`». Guarda `courses.length > 0` aprobada (①) |
| 3 | `courses 3 · REQ-C04 · inscribirse reduce en 1 los cupos disponibles` | `GET` → `POST /api/enroll` → `GET` | `courseId: "fundamentos"` | `200` (§3 y §1 caso 1) | REQ-C04 | §3: «Al inscribirse exitosamente, el número de cupos disponibles debe reducirse en 1.» Lectura aprobada (②), `SIN FUENTE`: cupos disponibles = `maxStudents − enrolled` |

### Rúbrica de trazabilidad: 8/8

| Punto | Resultado |
|---|---|
| Cada test cita un REQ | ✓ |
| El REQ existe en la fuente | ✓ REQ-C01 está nombrado en §3, aunque su texto no figura en el contrato; REQ-C04 figura textual en §3 |
| La ruta está en la lista blanca | ✓ |
| El status sale de §0–§3 | ✓ |
| Las aserciones dicen qué se rompió | ✓ cada `expect` lleva su mensaje |
| Los datos dinámicos no están fijados | ✓ la fila 3 compara la diferencia, no el valor |
| Se respetan las convenciones | ✓ fixture `cursos`, método `listar()` en `CursosService`, ninguna llamada a `request` desde el test |
| Nada fuera del alcance | ✓ |

## 3. Ejecución

El primer intento corrió dentro del sandbox, sin red, y dio `getaddrinfo ENOTFOUND` en los tres
tests. Fue una limitación del entorno del agente, no del test ni del producto. Se repitió el mismo
comando con red.

```text
Comando  : npx playwright test tests/api/courses.api.spec.ts
Exit code: 1
Pasados  : 2
Fallidos : 1
Primer error:
  courses 3 · REQ-C04 · inscribirse reduce en 1 los cupos disponibles
  Error: los cupos disponibles no bajaron exactamente en 1
  Expected: 5
  Received: 6
```

## 4. Fallos clasificados

| Test | Clasificación | REQ | Línea textual | Por qué esta clasificación |
|---|---|---|---|---|
| `courses 3` | `AMBIGÜEDAD_DEL_CONTRATO` | REQ-C04 | «Al inscribirse exitosamente, el número de cupos disponibles debe reducirse en 1.» | Después de una inscripción con `200`, `maxStudents − enrolled` siguió en 6. El contrato no dice qué campo representa los «cupos disponibles», ni si `enrolled` es global o depende de la sesión. Con esa lectura sin fuente, el agente no puede afirmar que el producto incumple: puede que la lectura esté mal. No se corrige ni se cambia lo esperado; se escala. |

Si la QA confirma que «cupos disponibles» significa `maxStudents − enrolled`, el mismo rojo pasa a
ser `DISCREPANCIA_CONTRATO_PRODUCTO`. Esa reclasificación la decide la QA.

## 5. ¿Necesita sesión? — observación, no regla

Los tests 1 y 2 corrieron **sin sesión** y recibieron `200` con el catálogo completo.
Observación del 2026-11-03: hoy `GET /api/courses` responde sin sesión. El contrato sigue sin
definirlo (§3: «el documento no lo dice»). Es una muestra, no una regla, y le corresponde a la QA
llevarla a §5 del contrato.

## 6. No puedo cubrir

| Pregunta | Motivo |
|---|---|
| Si el endpoint necesita sesión (como regla) | §3 dice «el documento no lo dice». Solo hay una observación (§5 de este reporte) |
| El mismo endpoint con sesión | Las credenciales no están en la fuente: `ENTRADA_FALTANTE` |
| `total` frente a `courses.length` | El contrato no los relaciona |
| Valores y formatos de `level`, `duration`, `icon` y `prerequisiteId` | No están definidos en §3 |
| Métodos no aceptados o ruta mal escrita | No están definidos para este endpoint |

Fuera del objetivo: `services/estudiantes.service.ts` llama a `/api/students`, una ruta que no
está en §0. No se tocó.

## 7. Archivos tocados

- `services/cursos.service.ts`: se agregó `listar()`
- `tests/api/courses.api.spec.ts`: creado, con 3 tests
- `reports/api-agent-report.md`: este archivo

---

**Decisión humana: PENDIENTE**

