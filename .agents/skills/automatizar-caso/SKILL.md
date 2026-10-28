---
name: automatizar-caso
description: Toma una fila firmada «AUTOMATIZAR YA» del backlog de docs/estrategia-automatizacion.md y la convierte en un test E2E de Playwright trazable, usando los Page Objects y las fixtures que ya existen. Propone antes de escribir, ejecuta, clasifica cada fallo y nunca cambia lo esperado para que pase.
---

# Automatizar un caso del backlog

> Skill extra del repositorio: no nació en una clase. Cierra el camino que abre
> `priorizar-automatizacion` (C7): aquella **propone puntajes** y la QA **firma**; esta toma lo que la
> QA firmó y lo **escribe**. No vuelve a decidir si vale la pena: eso ya está decidido, y tiene firma.
>
> Dos fases, como `generar-pom` (C14): **generar** y **verificar**. Trabaja debajo de
> `.agents/rules/criterio-qa.md`, que ya prohíbe inventar.

## 1. Entrada

`FILA` (el `#` de la fila en `docs/estrategia-automatizacion.md` §3, por ejemplo `L1`) ·
`ARCHIVO_OBJETIVO` (el `.spec.ts` que puede tocar) · `COMANDO_OBJETIVO` (con qué se corre). Si falta
una: `ENTRADA_FALTANTE`, y no empieza.

**Regla 0 — solo lo firmado.** Antes que nada, abre `docs/estrategia-automatizacion.md` §3 y lee la
fila entera. Sigue **solo** si se cumplen las tres:

1. la columna «Decisión (mía)» dice `AUTOMATIZAR YA`;
2. la columna «Razón (mía)» está escrita;
3. la columna «Fuente» señala un archivo, un REQ o una fila que existe.

Si la decisión es `AUTOMATIZAR DESPUÉS DE …`, `PROBAR A MANO`, `EXPLORATORIO` o `NO PROBAR`, o si
falta la razón: `FILA_NO_HABILITADA`, se dice cuál de las tres falla, y no empieza. **La zona verde
no alcanza**: verde es un puntaje; la decisión es de la QA.

Si la fila está habilitada pero el bloque «Firma de esta versión del backlog» está vacío, **no se
frena**: se avisa en una línea al principio del plan, para que la QA firme.

**Y si la fila es de API** (su fuente es `docs/contrato-api.md` y no hay pantalla): no es para esta
skill, que escribe tests de pantalla. Se dice, y no empieza.

**Lo esperado sale de la fuente de la fila, nunca de lo que muestra el producto hoy.** Un texto
copiado de la pantalla hace un test que no puede fallar.

## 2. Fase generar

1. **Inventario.** Lee `playwright.config.ts` (la `baseURL`), `tests/fixtures.ts`, `pages/`,
   `docs/mapa-selectores.md` y los tests de `tests/e2e/`. **Se respetan sus convenciones**: el test
   pide el Page Object por su fixture (nunca `new LoginPage(page)` en el test), los locators viven en
   el Page Object (nunca un `page.getBy…` suelto en el test), el comentario de cabecera
   `// Caso · Ítem · REQ` + `// Fuente:`, el título `<ítem> · <REQ> · …` y los bloques
   `// ACTUAR` y `// VERIFICAR`.
2. **¿Ya existe?** Si en `tests/` hay un test cuyo título empieza con el `#` de la fila: `YA_EXISTE`,
   se señala archivo y línea, y no se escribe otro. Un caso con dos tests son dos lugares que
   arreglar.
3. **Plan.** Una fila por caso que cubre la fila del backlog:
   `caso · ítem · REQ · pasos (métodos del Page Object) · dato · resultado esperado · línea textual de la fuente`.
   Si un paso necesita un locator o un método que el Page Object **no tiene**, ese caso va a
   **«no puedo cubrir»** con el elemento que falta. No se agrega al Page Object: un locator nuevo
   necesita el HTML real, y eso es trabajo de `generar-pom` (C14). Lo mismo si el caso necesita un
   dato que el entorno no puede preparar.
4. Presenta `PLAN_PENDIENTE` y **detente**. Archivos modificados: 0. Sigue solo con `PLAN APROBADO`.
5. **Aplicar.** Un test por caso aprobado, ninguno extra. Cada aserción va sobre el **locator**
   (`await expect(loginPage.saludo).toHaveText(…)`), nunca sobre un valor ya leído (`isVisible()`,
   `count()`, `textContent()`). En un caso negativo, las tres de siempre: lo que **sí** pasa, lo que
   **no** pasa y **dónde sigo**.
6. Toca solo `ARCHIVO_OBJETIVO`. No toca el Page Object, las fixtures, la configuración, el backlog
   ni otros tests.

## 3. Fase verificar

1. **Trazabilidad**, ocho puntos: cada test cita el ítem y el REQ de la fila · el REQ existe en la
   fuente · lo esperado sale de la fuente, no de la pantalla · el test usa la fixture · ningún locator
   fuera del Page Object · ninguna espera fija (`.agents/rules/criterio-qa.md` §6) · ninguna aserción
   sobre un valor ya leído · nada fuera de `ARCHIVO_OBJETIVO`. Solo **8/8** habilita un candidato.
2. **Ejecuta exactamente** `COMANDO_OBJETIVO`. Copia comando, exit code, pasados, fallidos y el
   primer error, literales.
3. **Si es un caso negativo y dio verde**, cada aserción de `// VERIFICAR` pasa la **prueba de
   control** de `diagnosticar-fallo-playwright` (C11): se pega al final del test positivo, se corre
   solo ese, **tiene que ponerse rojo**, y se borra. Si da verde, esa línea no distingue nada.
4. **Clasifica cada fallo**: `DEFECTO_DEL_TEST` (el código contradice la fuente: se corrige, cambio
   mínimo, y se vuelve a correr) · `DISCREPANCIA_FUENTE_PRODUCTO` (el test está bien y el producto
   hace otra cosa: es un candidato a bug) · `FALTA_EN_POM` · `AMBIGÜEDAD_DE_LA_FUENTE` ·
   `BLOQUEO_DE_ENTORNO`. Las cuatro últimas **no se corrigen**: se escalan.
5. **Nunca** cambia un resultado esperado para que pase, y **nunca** marca un test con `test.fail()`:
   decidir que un rojo es un bug conocido es de la QA.
6. Escribe `reports/automatizar-caso-report.md`: la fila del backlog con su decisión · plan aprobado ·
   trazabilidad 8/8 · ejecución · prueba de control · fallos clasificados · «no puedo cubrir» ·
   archivos tocados · `Decisión humana: PENDIENTE`.

## 4. Cuándo para y pregunta

- la fila no está habilitada (Regla 0);
- la fuente dice dos cosas distintas, o no fija el texto que habría que afirmar;
- el Page Object no tiene lo que el caso necesita;
- el caso necesita un estado que el entorno no conserva entre una corrida y otra;
- el test da rojo y el código coincide con la fuente: eso no se arregla, se le muestra a la QA.

## 5. Cómo se prueba esta skill

Se repite cada vez que se toca este archivo. Las tres corridas paran en `PLAN_PENDIENTE` o antes:
ninguna escribe código.

| Prueba | Con qué | Qué tiene que pasar |
|---|---|---|
| **Caso conocido** | `FILA = L1`, el login válido, que ya tiene su test en `tests/e2e/login.spec.ts` | responde `YA_EXISTE` y señala el test. Después, pídele solo el plan y compáralo con ese test: mismos pasos, mismo dato, mismo `toHaveText` |
| **Fila no habilitada** | `FILA = V1`, firmada `NO PROBAR` (si la borraste, cualquier fila tuya que no diga `AUTOMATIZAR YA`) | `FILA_NO_HABILITADA`, sin plan |
| **Fila de API** | `FILA = E1`, que sale de `docs/contrato-api.md` | dice que no es para esta skill porque es de API, sin plan |

**Si el plan del caso conocido difiere de tu test**, la pregunta no es quién tiene razón: es cuál de
los dos se respalda con la fuente. Si el tuyo, la que corrige es la sección 2 de este archivo. Si el
del plan, el que se corrige es tu test.

**Y si alguna corrida no para donde dice la tabla**, la línea de límite quedó floja: se abre la
sección que corresponde, se escribe la línea que falta y se vuelve a correr. Una skill se corrige
editando el archivo, no repitiendo el pedido.

---

*Skill extra de `qa-automation-portfolio`. Se usa después de C14: necesita las fixtures de C13 y,
cuando falta un locator, `generar-pom`.*
