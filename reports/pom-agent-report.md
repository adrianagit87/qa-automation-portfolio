# Reporte del Agente POM

## 1. Resultado
`VERIFICACIÓN SUPERADA` (12/12 en rúbrica y exit code 0).

## 2. Datos
- **Intento:** 1 de 3
- **POM:** `pages/registro.page.ts`
- **TEST:** `tests/e2e/registro.spec.ts`
- **EVIDENCIA_HTML:** `evidence/registro-form.html`
- **MAPA:** `docs/mapa-selectores.md`
- **URL:** `/registro`
- **REFERENCIA:** `pages/login.page.ts`

## 3. Rúbrica
| Criterio | Puntaje | Detalle / Líneas citadas |
|---|---|---|
| Locators | 3/3 | Todos semánticos (`getByLabel`, `getByRole`); todos con origen en HTML y trazabilidad al mapa o declarado como `SIN FILA`. |
| Aserciones fuera | 3/3 | Cero `expect`, ningún método `verificarX`, todos los locators expuestos como propiedades `readonly`. |
| Estructura | 3/3 | Molde completo: `readonly page: Page` (L13), locators `readonly` (L14-18) inicializados en constructor (L20-27), clase única para la página. |
| Acciones | 3/3 | `goto()` independiente con ruta relativa `'/registro'` (L29-31), método `registrarse` con parámetros (L33-41) sin navegación interna. |
| **Total** | **12/12** | **Superada** |

## 4. Origen de los locators
| Propiedad | Locator | Línea HTML | Fila del mapa |
|---|---|---|---|
| `nombre` | `page.getByLabel('Nombre completo')` | Línea 7 | `SIN FILA` |
| `email` | `page.getByLabel('Email')` | Línea 11 | Fila Campo email |
| `contrasena` | `page.getByLabel('Contraseña')` | Línea 15 | Fila Campo contraseña |
| `edad` | `page.getByLabel('Edad')` | Línea 19 | `SIN FILA` |
| `botonCrearCuenta` | `page.getByRole('button', { name: 'Crear cuenta' })` | Línea 22 | `SIN FILA` |

## 5. Evidencia ejecutable
- **Comando:** `npx playwright test tests/e2e/registro.spec.ts`
- **Exit code:** `0`
- **Pasados:** `2`
- **Fallidos:** `0`
- **Duración:** `4.3s`
- **Salida del runner:**
```text
Running 2 tests using 1 worker

     1 …gistro.spec.ts:11:5 › línea base: los tres campos del page object a mano
  ✓  1 …spec.ts:11:5 › línea base: los tres campos del page object a mano (1.7s)     2 …s/e2e/registro.spec.ts:19:5 › completo: los cinco controles del registro
  ✓  2 …egistro.spec.ts:19:5 › completo: los cinco controles del registro (1.6s)
  2 passed (4.3s)
```
- **Control que no opina:**
`grep -rn "new RegistroPage(page)" tests/e2e/registro.spec.ts tests/fixtures.ts`
```text
tests/fixtures.ts:12:        const registroPage = new RegistroPage(page);
```
*(Exactamente una línea, en la fixture `tests/fixtures.ts`)*.

## 6. Cambios por intento
- **Intento 1:** Se modificó únicamente `pages/registro.page.ts`:
  - Se agregó la propiedad `readonly edad: Locator;` (L17).
  - Se inicializó en constructor `this.edad = page.getByLabel('Edad');` (L25).
  - Se actualizó el método `registrarse` para incluir el parámetro opcional `edad?: string` y completar el campo si se proporciona (L33, L37-39).
  - No se modificó ningún otro archivo de código, test ni fixture.

## 7. Alcance
- **Qué no demuestra este verde:**
  - No demuestra que el formulario registre exitosamente un usuario en el backend (`tests/e2e/registro.spec.ts` solo comprueba la presencia y visibilidad de los 5 controles).
  - No valida las reglas de negocio ni validaciones de campos (errores de validación, edad mínima/máxima, email duplicado, etc.).
  - No demuestra la estabilidad a largo plazo de los locators marcados como `SIN FILA` en el DOM hasta que la QA los evalúe y confirme en el gate de su mapa de selectores.

## 8. Estado
- **Estado:** `CANDIDATO`
- **Decisión humana:** `PENDIENTE` (la palabra `ACEPTADO` no la firma el agente, la firma la QA).

## Estado del workflow · gate de la QA (2026-10-28)

Gate con las cuatro dimensiones de `revisar-con-rubrica` (C9), sobre este reporte. Fuentes: el HTML,
el mapa y el test.

| Dimensión | Resultado |
|---|---|
| **Trazabilidad** | cada locator cita su línea del HTML (7, 11, 15, 19, 22) y su fila del mapa o `SIN FILA`. Los tres `SIN FILA` están decididos al final de `docs/mapa-selectores.md` |
| **Cobertura** | están los cinco controles que pide el test: nombre, email, contraseña, edad y botón |
| **Claridad ejecutable** | muestra el comando exacto, exit code `0` y `2 passed`, literales |
| **Honestidad** | la sección 7 dice qué **no** demuestra este verde: ni el alta en el backend ni las validaciones |

Comprobado, no creído:

1. **Archivos escritos:** solo `pages/registro.page.ts` y este reporte. El test y la fixture no se tocaron.
2. **Suite e2e completa:** `npx playwright test tests/e2e` → `8 passed`.
3. **Prueba de control de la edad:** `await expect(loginPage.page.getByLabel('Edad')).toBeVisible();`
   pegada al final de L1 → rojo: `Locator: getByLabel('Edad')` · `element(s) not found`. Borrada después.

**Firma:**

```text
ACEPTADO. Escribió solo el page object y el reporte.
Agregó edad y no borró nada de lo que tenía. Los locators citan su línea del HTML
y su fila del mapa. La suite e2e da verde y la línea de la edad se puso roja en el
login. Puedo explicar este código en una entrevista.
```
