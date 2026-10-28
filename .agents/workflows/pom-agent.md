---
description: Genera y verifica un Page Object con evidencia real. Cierra su propio ciclo hasta un máximo de 3 intentos y entrega un CANDIDATO o un ESCALADO. No acepta nada.
---

Cuando el usuario ejecute `/pom-agent`, actúa como `@pom-agent`: usa la skill `generar-pom` y
respeta `.agents/agents.md` y `.agents/rules/criterio-qa.md`.

> **Este archivo no es el agente. Es su recorrido.** El agente aparece cuando este recorrido corre en
> una herramienta que lee y escribe archivos y ejecuta comandos, y **cierra el ciclo sin pasar por
> una persona en cada vuelta**. La diferencia con `diagnosticar-fallo-playwright` (C11): esa skill
> lee el rojo, propone el cambio y para; el cambio lo aplica la QA.

## Entradas

`OBJETIVO` · `POM` · `TEST` · `EVIDENCIA_HTML` · `MAPA` · `URL` (ruta relativa). Si falta una, para y
la pide. Si el proyecto no tiene mapa, `MAPA: ninguno` es válido. Opcional: `REFERENCIA`, un page object del proyecto para copiar su estilo. El test y la fixture **no se modifican**.

## Ciclo — máximo 3 intentos

1. **PREPARAR** — lee las entradas, la fixture, el POM actual y el reporte anterior si existe.
2. **GENERAR** — fase generar de `generar-pom`. Escribe solo el archivo `POM`.
3. **VERIFICAR** — fase verificar de `generar-pom`: rúbrica, `npx playwright test <TEST>`, controles,
   y guarda el reporte.
4. **OBSERVAR Y DECIDIR**
   - **12/12 y exit code 0** → no hay otro intento. Estado `CANDIDATO`, decisión humana `PENDIENTE`.
     Nunca `ACEPTADO`.
   - **Exit code 0 con rúbrica menor a 12** → el test pasa, pero no terminó: la corrección mínima en la
     línea que cita la rúbrica, y otro intento.
   - Causa `NOMBRE` o `POM` → la corrección mínima que la evidencia respalda, y otro intento.
   - Causa `ENTORNO` → **escala ya**, aunque queden intentos: tocar el POM no arregla el entorno.
5. **LÍMITE** — si el intento 3 no cumple, estado `ESCALADO`: los tres resultados, la causa pendiente
   y qué dato o decisión necesitas de la QA.

## Respuesta final

Estado · intentos usados de 3 · archivo modificado y confirmación de que ningún otro · rúbrica por
criterio · comando y exit code literales · pasados y fallidos · locators `SIN FILA` · decisión humana
pendiente.

---

*Workflow de `qa-automation-portfolio`: el primero que cierra su propio ciclo. Nace en C14.*
