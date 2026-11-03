---
name: generar-tests-api
description: Convierte filas de docs/contrato-api.md en tests de API de Playwright trazables, los ejecuta y clasifica cada fallo, sin inventar rutas, status ni campos. Propone antes de escribir y nunca corrige un fallo que no sea del test.
---

# Generar y verificar tests de API desde el contrato

> Octava skill del repositorio. Nace en C16. Dos fases: **generar** y **verificar**. Trabaja debajo de
> `.agents/rules/criterio-qa.md` §1, que ya prohíbe inventar: esta skill lo vuelve un procedimiento
> con una parada.

## 1. Entrada

`OBJETIVO` · `FUENTE` (**obligatoria y única**: `docs/contrato-api.md`) · `ALCANCE` (los archivos que
puede tocar) · `ARCHIVO_OBJETIVO` · `COMANDO_OBJETIVO`. Si falta una: `ENTRADA_FALTANTE`, y no empieza.

**Regla 0 — la superficie permitida.** Antes que nada, lee la §0 de `FUENTE` y arma la **lista
blanca de rutas**. Solo se escriben tests contra esas. Cualquier otra ruta no existe.

**Y el status esperado sale del contrato (§0–§3), nunca de lo que responde el producto ni de las
observaciones de §4–§5.** Un status copiado de la respuesta hace un test que no puede fallar.

## 2. Fase generar

1. **Inventario.** Lee `playwright.config.ts` (la `baseURL`), `tests/fixtures.ts`, `services/` y los
   tests de `tests/api/`. Si hay base, modo `CONTINUAR`: **se respetan sus convenciones** —el Service
   Object del endpoint (`services/<x>.service.ts`), la fixture que lo entrega y el estilo de títulos
   `caso · REQ · …`—. Si el endpoint no tiene método en su Service Object, se agrega uno; no se llama
   a `request` desde el test.
2. **Plan.** Una fila por caso: `caso · método + ruta · dato · status esperado · REQ · línea textual
   del contrato`. Lo que no tiene fila en el contrato va a **«no puedo cubrir»**, con el motivo.
3. Presenta `PLAN_PENDIENTE` y **detente**. Archivos modificados: 0. Sigue solo con `PLAN APROBADO`.
4. **Aplicar.** Un test por fila aprobada, ninguna extra. El REQ en el título y la línea textual del
   contrato en un comentario encima de la aserción. Status **y** el campo que el contrato promete.
   Datos dinámicos (ids, fechas, cupos): se afirma la regla, nunca el valor.
5. Toca solo `ALCANCE`. No toca el contrato, la configuración ni otros tests.

## 3. Fase verificar

1. **Trazabilidad**, ocho puntos: cada test cita un REQ · el REQ existe en `FUENTE` · la ruta está en
   la lista blanca · el status sale de §0–§3 · las aserciones dicen qué se rompió · los datos
   dinámicos no están fijados · se respetan las convenciones · nada fuera de `ALCANCE`. Solo **8/8**
   habilita un candidato.
2. **Ejecuta exactamente** `COMANDO_OBJETIVO`. Copia comando, exit code, pasados, fallidos y el primer
   error, literales.
3. **Clasifica cada fallo**: `DEFECTO_DEL_TEST` (el código contradice la fuente: se corrige, cambio
   mínimo) · `DISCREPANCIA_CONTRATO_PRODUCTO` · `AMBIGÜEDAD_DEL_CONTRATO` · `BLOQUEO_DE_ENTORNO` ·
   `ENTRADA_FALTANTE`. Las cuatro últimas **no se corrigen**: se escalan.
4. **Nunca** cambia un status esperado para que pase, y **nunca** marca un test con `test.fail()`:
   decidir que un rojo es un bug conocido es de la QA.
5. Escribe `reports/api-agent-report.md`: lista blanca · tabla de trazabilidad · ejecución · fallos
   clasificados · «no puedo cubrir» · archivos tocados · `Decisión humana: PENDIENTE`.

---

*Octava skill de `qa-automation-portfolio`. La usa `.agents/workflows/api-agent.md`.*
