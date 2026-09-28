# JavaScript esencial para leer tests

## Test observado

- Archivo: `tests/orden-ejecucion.spec.ts`
- Fecha:
- Responsable:

## 1. Mapa de lectura

| Fragmento real | Cómo lo leo | ¿Prepara o espera? | Evidencia de ejecución |
|---|---|---|---|
| `const LOGIN_URL = ...` | guarda la URL con un nombre | prepara información | ocurre antes del test |
| `async ({ page }) => {` | función asíncrona que recibe `page` | abre un bloque que puede usar `await` | contiene los pasos |
| `const email = page.getByLabel('Email')` | crea una descripción del campo | prepara un locator; no espera | aparece después del log 2 |
| `await page.goto(LOGIN_URL)` | inicia la navegación y espera su promesa | espera | log 1 termina antes del log 2 |
| `await expect(email).toHaveCount(1)` | espera la comprobación de cantidad | espera | bloque 3 termina antes del 4 |

## 2. Predicción y resultado

**Comando del ejercicio de predicción:**

```bash
npx playwright test tests/orden-ejecucion.spec.ts -g "confirma el orden"
```

**Orden de los tres mensajes que predigo antes de ejecutar:**

1.
2.
3.

**Orden de los tres mensajes observado en la terminal:**

1.
2.
3.

**¿Coincidieron? ¿Qué corregí?**

## 3. Experimento controlado

- Línea donde retiré temporalmente `await`:
- Resultado esperado:
- Resultado real:
- Por qué falló o cambió:
- Evidencia de que restauré el archivo y volvió a verde:

**Comando de cierre para comprobar el archivo completo:**

```bash
npm test -- tests/orden-ejecucion.spec.ts
```

**Resultado de cierre esperado:** `2 passed`.

## 4. Capacidad de IA — leer código en orden

Usa esta instrucción con un agente de proyecto cuando recibas un test que no entiendes:

```text
Analiza únicamente el código que te entrego. No modifiques archivos.

Objetivo: ayudarme a predecir el orden de ejecución.

Devuelve una tabla con:
1. fragmento literal;
2. explicación en lenguaje sencillo;
3. si solo prepara información o inicia una operación asíncrona;
4. qué promesa espera cada await;
5. qué afirmación necesita comprobarse ejecutando.

No afirmes que toda línea de Playwright necesita await. Marca los resultados como pendientes hasta
que yo entregue logs reales.
Detente para que yo escriba mi predicción y ejecute el test.

Código:
[PEGAR AQUÍ]
```

## 4b. Instrucción 2 — Explicar un error con mi propio documento

> Se usa **después** del experimento controlado, con el archivo ya restaurado. El objetivo no es
> arreglar nada: es comprobar si tu vocabulario alcanza y encontrar los huecos que te faltan.

**Antes de pegar nada, escribe tu predicción:**

- Creo que la IA me va a explicar el error diciendo que:

```text
Esta tabla es mi mapa de lectura del test. Es mi vocabulario: solo entiendo estos términos.

Explícame el error de abajo usando únicamente las palabras que aparecen en mi tabla.

Si para explicarlo necesitas un término que no está en mi tabla, no lo uses: nómbralo aparte, en una
lista al final, y dime en una línea qué tendría que entender yo primero.

No modifiques archivos y no propongas la corrección: el archivo ya está restaurado.

Mi tabla:
[PEGAR LA TABLA DE LA SECCIÓN 1]

El error:
[PEGAR LA SALIDA DEL ROJO CONTROLADO]
```

**Gate de esta consulta:** no es *“¿tiene razón?”*. Es **¿pude seguir la explicación de punta a punta
con lo que ya sé?**

- **¿Coincidió con mi predicción?**
- **¿En qué punto tuve que releer?**

### Lo que todavía no entiendo

Los términos que la IA marcó como fuera de tu vocabulario. Esta lista es tu plan de estudio, y crece
por huecos detectados trabajando, no por copiar teoría.

| Término | Qué tendría que entender primero | ¿Ya lo resolví? |
|---|---|---|
|  |  |  |

## 5. Gate humano

- [ ] La explicación cita el código real.
- [ ] Diferencia creación de locator y operación asíncrona.
- [ ] No confunde `1 passed` con una coincidencia.
- [ ] Comparé la predicción con los logs reales.
- [ ] Restauré el test después del experimento.
- [ ] Pedí la explicación del error con mi propio vocabulario y anoté los términos que me faltaban.

## 6. Portabilidad del procedimiento

- **Entrada:** código real del test.
- **Salida:** tabla de lectura y afirmaciones pendientes de ejecución.
- **Gate:** comparar la predicción con logs y resultado del runner.
- **Condición de cierre:** explicación actualizada, archivo restaurado y `2 passed`.

En un agente de IDE o CLI puedes señalar el archivo. En una aplicación de chat debes pegar el
fragmento y ejecutar el test por tu cuenta. No se requieren subagentes para leer un único flujo.
