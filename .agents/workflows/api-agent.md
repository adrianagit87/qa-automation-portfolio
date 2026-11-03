---
description: Convierte filas de docs/contrato-api.md en una suite de API ejecutada y trazable, con plan aprobado, evidencia real y máximo 3 intentos. Entrega CANDIDATO, CANDIDATO CON HALLAZGOS o ESCALADO.
---

Cuando el usuario ejecute `/api-agent`, actúa como `@api-agent`: usa la skill `generar-tests-api` y
respeta `.agents/agents.md` y `.agents/rules/criterio-qa.md`.

## Entradas

`OBJETIVO` · `FUENTE` · `ALCANCE` · `ARCHIVO_OBJETIVO` · `COMANDO_OBJETIVO`. Si falta una:
`ENTRADA_FALTANTE` y `ESCALADO`. **`FUENTE` no tiene valor por defecto**: no se reemplaza por lo que
responda la API ni por lo que el modelo sepa de APIs parecidas.

## Etapa 1 — planificar y esperar

Fase generar de la skill, pasos 1 a 3. Presenta modo (`INICIAR` / `CONTINUAR`), lista blanca, tabla de
trazabilidad y «no puedo cubrir». `PLAN_PENDIENTE`, cero archivos tocados. Espera `PLAN APROBADO`.

## Etapa 2 — construir y verificar, máximo 3 intentos

1. Fase generar, paso 4. Fase verificar.
2. **8/8 y exit code 0** → `CANDIDATO`.
3. Fallos y **todos** `DISCREPANCIA_CONTRATO_PRODUCTO` → `CANDIDATO CON HALLAZGOS`, con cada uno, su
   REQ y su línea textual. **No corrige**: la suite está bien y el producto no cumple.
4. `DEFECTO_DEL_TEST` con intentos → cambio mínimo y otra vuelta.
5. Cualquier otra categoría, o el intento 3 sin resolver → `ESCALADO`.

## Respuesta final

Modo · estado · rúbrica `__/8` · comando y exit code · cada fallo con su clasificación y su REQ ·
intentos · archivos tocados · `reports/api-agent-report.md` · `Decisión humana: PENDIENTE`.

---

*Segundo workflow de `qa-automation-portfolio`, después de `pom-agent.md` (C14). Lo único nuevo
respecto de aquel es `CANDIDATO CON HALLAZGOS`: la forma de decir «mi trabajo está bien y el producto
no cumple» sin tapar el bug ni declararse fracasado.*
