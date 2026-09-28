# QA Automation Portfolio

Proyecto acumulativo de la Ruta QA Automation con IA. Cada sesión agrega algo y nada se borra: el
historial de Git cuenta cómo creció.

**Sistema bajo prueba:** [Academia sin Humo](https://playground.calidadsinhumo.com) · especificación
en [/documentacion](https://playground.calidadsinhumo.com/documentacion).

## Qué demuestra hoy

- Puedo instalar y ejecutar un proyecto Playwright, y leer la evidencia de un fallo antes de corregirlo.
- Puedo elegir locators semánticos y comprobar que encuentran un único elemento visible.
- Puedo leer un contrato de API y detectar dónde el producto no cumple lo que promete.
- Puedo derivar casos de prueba desde una historia de usuario, con trazabilidad a cada criterio.
- Puedo priorizar qué automatizar por riesgo y dejar la decisión escrita.
- Puedo dirigir a un agente de IA con reglas y skills del repositorio, y revisar su salida contra una rúbrica.

## Comandos

```bash
npm install
npx playwright install chromium
npm test
```

| Comando | Para qué |
|---|---|
| `npm test` | Ejecuta todos los tests. |
| `npm run test:list` | Lista los tests sin ejecutarlos. |
| `npm run test:ui` | Abre el modo interactivo de Playwright. |
| `npm run report` | Abre el último reporte HTML. |

## Estructura

```
.agents/          Instrucciones para la IA: índice, reglas y skills del repositorio
  agents.md       Qué es este proyecto y dónde está la verdad
  rules/          Criterio QA que toda IA respeta acá adentro
  skills/         Capacidades reutilizables (priorizar, derivar casos, revisar con rúbrica)
docs/             Historias, casos, contrato, estrategia, mapa de selectores y revisiones
evidence/         Evidencia de las primeras sesiones
tests/            Tests de Playwright (tests/e2e/ y tests/api/ se llenan desde C10)
pages/            Reservado para page objects
```

## Historia del proyecto

| Sesión | Aporte | Evidencia |
|---|---|---|
| S1 | Criterio para validar salidas de IA | `evidence/s1-validacion-ia.md` · `docs/prompt-template.md` |
| S2 | Primer ciclo reproducible, diagnóstico de fallos con IA y Git | `tests/primer-ciclo.spec.ts` · `docs/flujo-ia-diagnostico-fallos.md` |
| S3 | Procedimiento para elegir selectores | `docs/mapa-selectores.md` (primera mitad) |
| S4 | Locators semánticos comprobados en el login real | `tests/comprobar-locators.spec.ts` · `tests/comprobar-propuesta-ia.spec.ts` |
| S5 | JavaScript esencial y orden de ejecución asíncrona | `tests/orden-ejecucion.spec.ts` · `docs/js-esencial.md` |
| S6 | Lectura del contrato de la API | `docs/contrato-api.md` |
| S7 | Sistema de la IA en el repo y priorización por riesgo | `.agents/agents.md` · `.agents/rules/criterio-qa.md` · `.agents/skills/priorizar-automatizacion/` · `docs/estrategia-automatizacion.md` |
| S8 | Casos de prueba derivados de historias de usuario | `docs/HU-login.md` · `docs/HU-registro.md` · `.agents/skills/derivar-casos-de-hu/` · `docs/casos-login.md` |
| S9 | Revisión de casos con rúbrica | `docs/casos-login-v2.md` · `.agents/skills/revisar-con-rubrica/` · `docs/revision-login.md` |
| S10 | `baseURL` compartida y fuente del primer test E2E del login | `playwright.config.ts` · `docs/fuente-demostracion-c10.md` · `docs/mapa-selectores.md` |
