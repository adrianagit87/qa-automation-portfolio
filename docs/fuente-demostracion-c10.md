# Fuente de demostración preparada para C10

Este archivo contiene la fuente que utiliza la instructora durante la demostración de la Clase 10.
No depende de que una alumna haya entregado la tarea de C9.

> **Control previo obligatorio:** estos son datos de demostración preparados, no evidencia de una
> ejecución actual. Antes de impartir la clase, la instructora debe comprobar en el entorno real que
> las credenciales siguen funcionando y que la pantalla muestra exactamente `¡Hola, Ana!`. Si el
> producto responde de otra manera, debe registrar la observación real y ajustar la demostración.

## El caso de C10

| Campo | Decisión preparada para la demostración |
|---|---|
| **Caso elegido** | `C01` · Login con credenciales válidas muestra el saludo con el nombre. Corresponde al ítem `L1` del backlog y a `REQ-L04`. |
| **Por qué va primero** | `L1` quedó priorizado con `3 · 3 · 3 · 3 = 12` y la decisión `AUTOMATIZAR YA`. El login habilita los flujos posteriores y este caso comprueba el saludo definido por `REQ-L04`. |
| **Datos de demostración preparados** | Email: `ana.garcia@ejemplo.com` · Contraseña: `Segura2026!`. Deben verificarse contra la pantalla y el entorno antes de impartir. |
| **Resultado observado preparado** | El encabezado identificado como `login-welcome` muestra exactamente `¡Hola, Ana!`. Debe verificarse nuevamente antes de impartir. |
| **Requisito frente a observación** | `REQ-L04` exige un mensaje de bienvenida con el nombre, pero no define el texto exacto ni aclara si usa el nombre de pila o el nombre completo. La pantalla observada para preparar la demostración mostró `¡Hola, Ana!`. Esta diferencia conserva abierta `P1` de `docs/casos-login-v2.md`, sección 3. |
| **Qué NO demuestra este test** | No demuestra que el nombre mostrado sea el correcto según el negocio, que la sesión persista al navegar, que el catálogo cargue ni qué ocurre con credenciales inválidas. Tampoco resuelve `P1`. |

## Uso durante la clase

- La instructora abre este archivo como fuente de la demostración.
- Las alumnas observan, analizan y responden preguntas. No ejecutan la práctica durante la sesión.
- Si después se registra una decisión o un hallazgo en `docs/revision-login.md`, ese archivo será una
  **salida de la revisión**, no la fuente inicial del caso.
