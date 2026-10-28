---
name: generar-pom
description: Completa un Page Object de Playwright desde el HTML real, el test que lo usa y su fixture, lo verifica con una rúbrica de cuatro criterios y ejecutando el test, y deja la evidencia en reports/pom-agent-report.md. No toca el test ni la fixture y no acepta nada.
---

# Generar y verificar un Page Object

> Sexta skill del repositorio y la primera que escribe un archivo de código. Tiene dos fases:
> **generar** y **verificar**. Estar en el mismo archivo no crea un verificador independiente: la
> revisión independiente es la de la QA, en el gate.

## 1. Entrada

| Qué | Ejemplo |
|---|---|
| `POM` · el page object que se completa (si no existe, se crea) | `pages/registro.page.ts` |
| `TEST` · el test, que pide el POM por una fixture | `tests/e2e/registro.spec.ts` |
| `EVIDENCIA_HTML` · el `outerHTML` real | `evidence/registro-form.html` |
| `MAPA` · cómo elige locators esta QA, y por qué (o `ninguno`) | `docs/mapa-selectores.md` |
| `URL` · ruta relativa a la `baseURL` de `playwright.config.ts` | `/registro` |
| *(opcional)* `REFERENCIA` · un page object del proyecto para copiar su estilo | `pages/login.page.ts` |
| *(opcional)* el reporte del intento anterior | `reports/pom-agent-report.md` |

Si falta una, **para y la pide**. El `outerHTML` no trae la dirección: la ruta no se deduce.

## 2. Fase generar

1. **Lee el test y `tests/fixtures.ts`.** Los nombres que usa el test no se cambian ni se traducen.
   La fixture crea el POM y llama a `goto()`: el POM no navega por su cuenta.
2. **Lee el mapa y la `REFERENCIA`**: el criterio de locators y el estilo (nombres en castellano,
   `getByLabel` para campos, `getByRole` para botones). Sin `REFERENCIA`, el estilo son los pasos 5 y 7.
3. **Lee el HTML.** Lo que no está ahí, no existe.
4. **Completa, no reescribas.** Si el POM no existe, lo crea con el molde del paso 7. Lo que el POM ya expone se queda con su nombre (el `header` de C12 lo
   usa `tests/e2e/header.spec.ts`). Con reporte anterior, corrige solo lo que el reporte respalda.
5. **Locators en este orden:** `getByLabel` → `getByRole` con nombre → `getByPlaceholder` →
   `getByText` → `getByTestId` (este último, con la razón).
6. **Origen de cada locator:** su línea del HTML y la fila del mapa que lo respalda, o `SIN FILA`.
   Con `MAPA: ninguno`, elige por el orden del paso 5 y todos quedan `SIN FILA`: decide la QA.
7. **Molde:** `readonly page: Page`, locators `readonly` en el constructor, `goto()` con la ruta
   relativa y nada más, métodos de acción con parámetros, **cero `expect`** y ningún `verificarX`.

## 3. Fase verificar

1. **Rúbrica**, de 1 a 3 por criterio, total sobre 12. Todo puntaje menor a 3 cita la línea del POM
   (regla heredada de `revisar-con-rubrica`); un número sin línea no vale.

   | Criterio | 3 | 2 | 1 |
   |---|---|---|---|
   | Locators | todos semánticos, con origen | uno frágil, o sin origen | CSS, XPath, `nth` |
   | Aserciones fuera | cero `expect`, cada locator expuesto | un `verificarX` | hay `expect` |
   | Estructura | molde completo, un POM por página | falta `readonly` o mezcla páginas | sin clase |
   | Acciones | `goto()` aparte con ruta relativa, datos por parámetro | dirección completa o datos fijos | navegación dentro de las acciones |

   No se compensa: solo `12/12` cuenta.
2. **Ejecuta exactamente** `npx playwright test <TEST>`, sin filtros ni otro reporter. Copia comando,
   exit code, pasados, fallidos y duración, literales.
3. **Si falló, lee el rojo como la QA:** ubícalo en la tabla de lecturas de
   `.agents/skills/diagnosticar-fallo-playwright/SKILL.md` (§3, paso 2) y abre `error-context.md` en
   `test-results/` antes del intento siguiente. Clasifica la causa:
   `NOMBRE` (`was called with undefined`: al POM le falta un nombre que el test pide; no es ninguna de las cuatro lecturas) ·
   `POM` (lectura 2 o violación de modo estricto) · `ENTORNO` (navegador, red, config: **no se toca
   el POM**).
4. **Control que no opina**, con su salida copiada:
   `grep -rn "new <Clase>(page)" <TEST> tests/fixtures.ts` → una línea, en la fixture.
   En **Cambios por intento**, la lista de archivos que escribió: solo el POM y el reporte.

## 4. Límites

- No toca el test, `tests/fixtures.ts`, otros POM, la configuración ni la aplicación.
- No borra ni renombra lo que el POM ya exponía.
- No inventa la ruta, selectores, resultados ni duraciones.
- No cambia el comando para obtener otro resultado.
- No escribe `ACEPTADO`: esa palabra es de la QA.
- No agrega esperas fijas: nada de `waitForTimeout`, `sleep` ni milisegundos sueltos (`criterio-qa.md` §6).

## 5. Salida: `reports/pom-agent-report.md`

En este orden: **Resultado** (`VERIFICACIÓN SUPERADA` solo con 12/12 y exit code 0) · **Datos**
(intento y rutas) · **Rúbrica** con líneas citadas · **Origen de los locators** (propiedad · locator ·
línea del HTML · fila del mapa o `SIN FILA`) · **Evidencia ejecutable** (comando, exit code, conteos,
lectura y causa si falló, salida del control) · **Cambios por intento** · **Alcance** (qué no
demuestra este verde) · **Estado** (lo completa el workflow).

---

*Sexta skill de `qa-automation-portfolio`. Nace en C14. La usa `.agents/workflows/pom-agent.md`.*
