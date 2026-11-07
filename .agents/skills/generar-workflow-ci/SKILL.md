---
name: generar-workflow-ci
description: Propone el workflow de GitHub Actions que corre la suite de Playwright del repositorio (.github/workflows/playwright.yml). Antes comprueba que la suite pasa en local; propone el archivo y se detiene. Solo lo escribe cuando la QA responde PLAN APROBADO. No hace commit ni push.
---

# Generar el workflow de CI

> Novena skill del repositorio. Nace en C17. Toca un solo archivo, y solo después de la aprobación.

## 1. Pasos

1. **Inventario, sin tocar nada.** Lee `package.json`, `package-lock.json` y `playwright.config.ts`.
   Anota la rama actual (`git branch --show-current`), la versión mayor de Node (`node --version`), si
   ya existe `.github/workflows/playwright.yml` y si el reporter genera `playwright-report/`. Si falta
   `package-lock.json`, **para**: sin él, la máquina de GitHub no puede reconstruir las dependencias.
2. **El comando, en local.** Corre `npx playwright test` una vez y copia el resumen literal. Si hay
   `failed`, **para** y dice qué tests fallaron: un pipeline que nace rojo avisa de algo que nadie
   diagnosticó. No los toca.
3. **Plan.** Presenta lo que comprobó en los pasos 1 y 2, el YAML completo hecho con el molde de la
   sección 2, y cada línea que difiera del molde con su razón. Si el archivo ya existía, muestra qué
   cambiaría. Termina con `Estado: PLAN_PENDIENTE · Archivos modificados: 0 · Esperando: PLAN APROBADO`
   y **se detiene**.
4. **Con `PLAN APROBADO`**, crea solo `.github/workflows/playwright.yml` (y la carpeta, si falta).
   Muestra `git diff --check` y `git status --short`. No hace commit ni push.

## 2. El molde · verificado en GitHub el 7/11/2026

```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browser
        run: npx playwright install --with-deps chromium
      - name: Run Playwright tests
        run: npx playwright test
      - uses: actions/upload-artifact@v5
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

Solo cambian dos datos, y salen del paso 1: la rama (en `branches`) y `node-version`.

## 3. Límites

- El comando del YAML es el mismo del paso 2: `npx playwright test`, sin `--project` ni filtros.
- Permisos: solo `contents: read`. Nunca permisos de escritura.
- Nada de secrets, deploy, Docker, matrices, otros navegadores ni otros jobs, aunque parezcan buena
  idea: si hacen falta, los decide la QA aparte.
- No toca tests ni `playwright.config.ts`. Nunca agrega `test.fail()` ni `skip` para que el run pase.
- No dice que el workflow funciona: eso lo dice el primer run en GitHub.

## 4. Lo que revisa la QA antes de aprobar

1. ¿Corre **el mismo comando** que corrió en mi máquina?
2. ¿Guarda **el reporte aunque los tests fallen**?
3. ¿Agregó **algo que no pedí**?

---

*Novena skill de `qa-automation-portfolio`. Sirve para cualquier repositorio de Playwright con npm.*
