# Selectores y locators — procedimiento y decisiones

> **La primera mitad es el procedimiento de S3**: no se llena, se usa. Lo vas a reabrir cada vez que
> automatices una pantalla nueva.
>
> **La segunda mitad, a partir de "Refinamiento de S4", sí se completa** — y es la primera vez en la
> ruta que registras algo. La diferencia importa: en S3 registrar habría sido anotar una opinión
> basada solo en una mirada; hoy vas a registrar **el resultado de una ejecución**. Eso sí se defiende.

## El ciclo, en tres movimientos

1. **Copias el HTML del elemento** — en DevTools: clic derecho sobre el nodo → Copy → **Copy outerHTML**.
2. **Pegas la instrucción de abajo + ese HTML** en la IA, en un solo mensaje.
3. **Compruebas cada propuesta en DevTools** antes de aceptar ninguna.

El paso 3 no se delega. Es el único que te pagan.

## La instrucción

```text
Analiza únicamente el outerHTML que te entrego. No modifiques archivos.

Objetivo: proponer hasta tres selectores CSS para encontrar este elemento.

Para cada opción:
1. escribe el selector literal;
2. señala qué atributo o texto del HTML utilizaste;
3. explica un posible riesgo de estabilidad;
4. indica cómo puedo comprobarlo en DevTools.

Usa solamente atributos o texto presentes en el HTML. No escribas el test completo.
Detente para que yo valide las propuestas en el DOM real.

outerHTML:
[PEGAR AQUÍ]
```

### Por qué esas frases y no otras

| Frase | Qué hace |
|---|---|
| *“Analiza únicamente el outerHTML que te entrego”* | Le acota la fuente. Sin eso propone lo que suele haber en un login, no lo que tienes delante |
| *“Usa solamente atributos o texto presentes en el HTML”* | La misma idea al revés: que no invente un `data-testid` que no existe |
| *“Detente para que yo valide”* | El gate. Sin esa frase, una herramienta con permisos podría escribir el test antes de tu revisión |
| *“Indica cómo puedo comprobarlo en DevTools”* | Te da **la forma de verificarlo**, no una promesa de que está bien |

## Cómo compruebas una propuesta

En DevTools, pestaña **Elements**, `Ctrl+F` o `Cmd+F`, pegas el selector. Miras **dos cosas**:

1. **¿Cuántas coincidencias?**
2. **¿El elemento resaltado es el que querías?**

Un número solo no es una comprobación. `1` puede ser un elemento equivocado.

## Qué hacer con lo que te devuelve

- **Si te da una recomendación o dice que una opción es “la más robusta”:** léela como una opinión.
  No se lo pediste, y la estabilidad no se puede demostrar mirando un HTML — depende de si el equipo
  se compromete a mantener ese atributo.
- **Si una propuesta no dice de qué atributo salió:** no la compruebes. Ya sabes qué hacer con ella.
- **Si te propone comprobar con `document.querySelector` en la Console:** es válido, hace lo mismo.
  La búsqueda de Elements resalta el elemento en la página, así ves cantidad **e** identidad de una.
- **Si empieza a escribir el test:** se salió del alcance. Pídele que vuelva y se detenga.

## Antes de pegar nada en una IA

Revisa que el fragmento no lleve datos privados, tokens ni credenciales reales. En este playground
son de demostración. En tu empresa esto se revisa siempre, sin excepción.

## De qué depende cada tipo de selector

No hay un ganador universal. Lo que se rompe no es el selector: es aquello de lo que depende.

| Forma | De qué depende | Se rompe cuando |
|---|---|---|
| `#email` | de un `id` | alguien lo renombra en un refactor |
| `[data-testid="…"]` | de un **acuerdo del equipo** | nadie se comprometió a mantenerlo |
| `[type="email"]` | del tipo del campo | aparece un segundo campo del mismo tipo |
| `.clase-visual` | de la apariencia | hay un rediseño |
| `form div > input` | de la estructura | alguien agrega un contenedor |

Y un aviso que te va a ahorrar una mañana: **el mismo `id` puede existir en otra página.** `#email`
no identifica *el email del login*: identifica *el email de la página que esté abierta*.

---

# Refinamiento de S4

> **Retirada en C12 (7 de octubre de 2026).** Los locators del login viven en `pages/login.page.ts`:
> es código que se ejecuta y que avisa cuando está mal. Esta tabla queda como registro de **por qué**
> se eligió cada uno y ya no se actualiza. Si un locator del login cambia, se cambia en el page object.

Hoy le sumamos a lo anterior los **locators de Playwright**, que buscan por cómo una persona percibe
el elemento —su rol, su etiqueta, su texto visible—, un criterio que CSS no puede expresar.

## LEES · Instrucción de refinamiento

```text
Para cada selector CSS ya comprobado, propone un locator de Playwright que represente cómo una
persona reconoce el elemento. Usa solo información observable en el HTML entregado. Señala qué
condición podría hacer fallar tu propuesta. No modifiques archivos y detente para que yo valide.
```

Comparada con la instrucción de S3 cambió una cosa y se agregó otra:

- **Cambió el criterio:** ya no pedimos "cómo está construido" sino "cómo lo reconoce una persona".
- **Se agregó:** *"señala qué condición podría hacer fallar tu propuesta"*. No le pedimos que nos diga
  que su respuesta es buena, sino **cuándo dejaría de serlo**.

## ESCRIBES · Comparación CSS ↔ locator

> **Por qué aquí sí se escribe y en S3 no.** La columna que manda es **Evidencia ejecutable**: lo que
> devolvió `npm test`. Un locator sin ejecutar sigue siendo una propuesta, y una propuesta no se
> registra.

| Elemento | Selector CSS | Locator semántico propuesto | Evidencia ejecutable | Decisión y límite |
|---|---|---|---|---|
| Campo email | `[data-testid="login-email"]` | `getByLabel('Email')` | **Evidencia histórica de C4:** `tests/comprobar-locators.spec.ts` comprobó una coincidencia visible; `Materiales-S4.md` registró `1 passed`. | Conservamos el locator por etiqueta porque representa cómo una persona reconoce el campo. Deja de ser válido si cambia o desaparece la etiqueta accesible `Email`. |
| Campo contraseña | `[data-testid="login-password"]` | `getByLabel('Contraseña')` | **Evidencia histórica de C4:** el mismo test comprobó una coincidencia visible dentro de la ejecución registrada como `1 passed`. | Conservamos el locator por etiqueta por la misma razón. Deja de ser válido si cambia o desaparece la etiqueta accesible `Contraseña`. |
| Botón Iniciar sesión | `[data-testid="login-submit"]` | `getByRole('button', { name: 'Iniciar sesión' })` | **Evidencia histórica de C4:** el mismo test comprobó una coincidencia visible dentro de la ejecución registrada como `1 passed`. | Conservamos rol y nombre accesible porque describen el control como lo percibe una persona. Deja de ser válido si cambia el rol o el nombre accesible. |
| Saludo tras el login | `[data-testid="login-welcome"]` | `getByTestId('login-welcome')` | **Comprobación directa del 2026-09-27:** el código servido por el producto contiene un `<h1 data-testid="login-welcome">` cuyo texto se forma como `¡Hola, {primer nombre}!`; `POST /api/login` respondió `200` para la cuenta demo y devolvió `Ana García`. **Runtime Playwright pendiente:** Chromium no inició por `SystemAppearance not found`, antes de abrir la página. | Conservamos **este** test id como decisión propuesta, no como regla universal. La estructura y los datos actuales lo respaldan, pero el gate de ejecución Playwright debe completarse antes de impartir C10. Depende de que el equipo mantenga `login-welcome`. |
| Mensaje de error del login | `[data-testid="login-error"]` | `getByTestId('login-error')` | **Ejecución Playwright del 2026-09-27:** tras enviar el formulario aparece un único `<div data-testid="login-error">`. Con email no registrado y con contraseña incorrecta muestra `Email o contraseña incorrectos`; con email vacío, `El email es obligatorio`; con contraseña vacía, `La contraseña es obligatoria`. El mensaje no tiene `role="alert"`. | Conservamos el test id porque el mensaje no tiene rol ni etiqueta accesible propios: el único `role="alert"` de la página es el anunciador de rutas de Next.js, que queda vacío. Los textos son **observados, no exigidos**: `P3` sigue abierta en `docs/casos-login-v2.md`. Depende de que el equipo mantenga `login-error`. |

La última fila importa tanto como las otras tres: **refactorizar no es reemplazar todo el CSS.**
Cuando el elemento no tiene una señal que la persona perciba —un contenedor, un bloque que agrupa—
conservar CSS o `getByTestId` es la decisión correcta, y hay que poder explicar por qué.

## ESCRIBES · Elemento nuevo pedido a la IA, verificado ejecutando

> Elige un elemento que **no** esté arriba. Pídele a la IA **un** locator con la instrucción de
> refinamiento, pégalo en la única línea marcada de `tests/comprobar-propuesta-ia.spec.ts` y ejecuta:
>
> ```bash
> npm test -- tests/comprobar-propuesta-ia.spec.ts
> ```

| Elemento | Locator propuesto por la IA | Condición de fallo que ella señaló | Resultado de la ejecución | Decisión |
|---|---|---|---|---|
| Título de la página | | | `1 passed` / `Expected: 1` `Received: …` | |

**Gate:** no es "¿la IA acertó?". Es **puedo decir de dónde salió cada cosa**: qué propuso, qué
condición de fallo declaró y qué devolvió el comando. Un locator no es un test: la IA no escribió ni
una línea de ese archivo.

## Cierre de S4

- [ ] Cada fila tiene su CSS y su locator semántico al lado.
- [ ] Email, contraseña y botón conservan la evidencia histórica de C4.
- [ ] `login-welcome` fue ejecutado y tiene un resultado real registrado antes de impartir C10.
- [ ] Hay al menos un caso donde decidí **conservar** CSS o test id, con su razón.

## Evidencia preparada para C10

La comprobación ejecutable está en `tests/comprobar-locators.spec.ts` y se lanza con:

```bash
npm test -- tests/comprobar-locators.spec.ts
```

El primer test vuelve a comprobar email, contraseña y botón, que ya tienen evidencia histórica de
C4. El segundo realiza el login y comprueba por separado el locator `login-welcome` y el texto
`¡Hola, Ana!`; esa ampliación todavía no tiene evidencia de ejecución válida.

**Estado de la verificación del 2026-09-27:** la comprobación HTTP confirmó las etiquetas `Email` y
`Contraseña`, el botón `Iniciar sesión`, los `data-testid` del formulario y la implementación de
`login-welcome`. La API de login respondió `200` con la persona `Ana García`, por lo que el código
servido formaría el saludo `¡Hola, Ana!`. La ejecución Playwright no llegó a abrir la página:
Chromium terminó durante el arranque con `Critical error: required built-in appearance
SystemAppearance not found`. Este documento no convierte ese fallo de infraestructura en un fallo
del producto ni registra una salida verde inexistente. **El runtime Playwright sigue siendo un gate
previo a C10:** debe ejecutarse en un entorno donde Chromium pueda iniciar.

Esta comprobación **no sustituye** el test E2E de C10. Aquí validamos previamente los locators y el
resultado observable. En C10 construiremos el test trazable que representa el caso priorizado `L1`
y revisaremos qué demuestra.

## Pregunta abierta para S5

Ya tienes locators que encuentran el elemento correcto. ¿Qué falta para que eso sea una **prueba**?
Encontrar un elemento no es todavía comprobar que la aplicación hace lo que promete.
