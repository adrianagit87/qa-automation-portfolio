---
trigger: always_on
---

# Criterio QA — reglas estables de este repositorio

> ## Este archivo llega dado, y llega a medio hacer. A propósito.
>
> **Qué es:** las reglas que ya venías repitiendo en cada pedido, escritas **una sola vez**. No se
> invocan: están siempre activas. Cualquier capacidad de este repositorio —la skill de hoy y las que
> vengan— trabaja debajo de estas reglas.
>
> **Por qué está incompleto:** acá abajo hay **cuatro** reglas, y son las cuatro que la skill de hoy
> necesita para funcionar. Entre C1 y C7 apareció bastante más que eso: cómo se pide un diagnóstico,
> qué locators se usan, cómo se explica código, qué se hace con una discrepancia. **Eso se cosecha en
> C8**, que es la clase donde este repositorio se convierte en un sistema de trabajo completo.
>
> **Qué NO va en este archivo:** el contexto del producto (eso vive en `docs/`) y los procedimientos
> con pasos (eso vive en `.agents/skills/`).

---

## 1. Honestidad sobre la fuente

Estas tres reglas son la misma idea con tres nombres, uno por artefacto. La idea es: **cuando falta
un dato, se escribe que falta.**

| Regla                                                                                                                                                                                                                                                     | Cuándo aplica               | Nació en |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------- |
| Si un dato no está en lo que te entregué, escribe `SIN FUENTE` en esa celda y sigue. No lo completes con lo probable.                                                                                                                                     | cualquier tabla o documento | C1 · C6  |
| Si un puntaje depende de información que no te di, escribe `SIN CONTEXTO` y di en una línea qué dato necesitas. No lo adivines.                                                                                                                           | priorización                | C7       |
| **No inventes** endpoints, pantallas, requerimientos, campos ni comportamientos. La superficie real del sistema bajo prueba está en `docs/contrato-api.md` y en `docs/mapa-selectores.md`. Si algo no está ahí, no existe hasta que alguien lo verifique. | siempre                     | C6 · C7  |

---

## 2. Quién decide

| Regla                                                                                           | Nació en |
| ----------------------------------------------------------------------------------------------- | -------- |
| No completes las columnas «decisión» ni «razón» de ningún documento. **Esas dos las firmo yo.** | C7       |

---

## 3. Cómo crece este archivo

Una regla entra acá cuando cumple las tres condiciones:

1. **Ya la escribiste al menos dos veces** en pedidos distintos.
2. **Vale para más de un artefacto.** Si solo aplica a un procedimiento, va dentro de esa skill, no acá.
3. **No es contexto del producto.** *"El curso `api-testing` no tiene cupo"* no es una regla: es un
   dato, y los datos viven en `docs/`.

Si una regla deja de cumplirse en la práctica, se borra. Un archivo de reglas que nadie respeta
enseña justo lo contrario de lo que dice.

---

## 4. Para cosechar en C8

> **Esta sección la llenas tú, en la tarea, y la vas a usar el miércoles.** Escribe crudo: no
> ordenes, no clasifiques y no decidas si cada línea es una regla, un dato o un procedimiento. Eso es
> exactamente el trabajo de C8, y hacerlo antes te lo arruina.

### Reglas mías que deberían estar siempre encendidas

> Cosas que le repetiste a la IA más de una vez entre C1 y C7, en pedidos de temas distintos.

- le pedí que me dijera qué dato le faltaba en vez de suponerlo (C1, C6)
- le pedí que no inventara selectores que no estaban en el HTML que le pasé (C3, C4)
- le pedí que citara de qué parte del contrato sacaba cada afirmación (C6)
- el login se bloquea después de cinco intentos fallidos
- le pedí que me explicara el test en el orden en que se ejecuta (C5)

### Cosas que hice más de una vez y que todavía no son skill

> Procedimientos que repetiste. Una de estas va a ser tu **segunda skill**, y en C8 la vas a
> empaquetar sin que nadie te lleve de la mano.

- comparar la respuesta real de la API contra el contrato (C6)
- revisar los selectores que propone la IA contra el DOM real (C3, C4)

---

## 5. Cosechadas en C8

| Regla                                                                                                                                                                                                                                                                                                              | Cuándo aplica                              | Nació en                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | --------------------------- |
| Un caso sin fuente no es un caso. Cada caso de prueba cita el criterio de aceptación o el requerimiento del que sale y el fragmento textual que lo justifica. Si no encuentras el fragmento, el caso no entra a la tabla: se escribe como pregunta abierta, con lo que haría falta saber para convertirlo en caso. | cualquier caso de prueba, escenario o test | C8                          |
| Si un rango no dice si incluye los extremos, no elijas una lectura: escribe una pregunta que cite el fragmento y marca los casos de los extremos como `POR CONFIRMAR`.                                                                                                                                             | cualquier criterio con un rango numérico   | C8 · de la capa E del login |

---

*Semilla entregada en C7 con cuatro reglas · cosechada en C8.*

---

## 6. Cosechadas en C10

> Escritas el día que aparecieron los tests.

| Regla                                                                                                                                                                                                                                 | Cuándo aplica                                       | Nació en |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------- |
| Si un locator se apoya en la apariencia o la estructura —clase CSS, cadena estructural o XPath—, no entra. En su lugar va `getByRole`, `getByLabel` o `getByText`. `getByTestId` entra cuando puedo justificarlo y señalar su fuente. | cualquier test o selector                           | C3 · C4  |
| Ningún selector se acepta sin comprobarlo contra el DOM real o ejecutarlo. Una propuesta plausible no es evidencia.                                                                                                                   | cualquier locator, lo proponga una persona o una IA | C3 · C4  |
| Ninguna espera fija: nada de `waitForTimeout`, `sleep` ni milisegundos sueltos. Se usan acciones y aserciones con autoespera.                                                                                                         | cualquier test de Playwright                        | C5 · C10 |
