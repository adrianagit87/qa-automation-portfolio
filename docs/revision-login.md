# Revisión — Casos de prueba · Login v2

> **Artefacto revisado:** sección 5 de `docs/casos-login-v2.md` — 13 casos (C01 a C13)
> **Fuentes:** `docs/HU-login.md` (CA1–CA4, notas del equipo) + sección 3 de `docs/casos-login-v2.md`
> (preguntas abiertas P1–P8)
> **Reglas aplicadas:** `.agents/rules/criterio-qa.md`
> **Skill:** `revisar-con-rubrica`
> **Fecha:** 2026-09-24
> **Responsable de las decisiones:** QA dueña del repositorio

---

## 1. Puntajes

| Dimensión | Puntaje | En qué se apoya |
|---|---|---|
| **D1 · Trazabilidad** | **3** | Los 13 casos citan criterio (CA), requerimiento (REQ-L0x) y fragmento entrecomillado. Cada fragmento citado aparece literal en HU-login.md. |
| **D2 · Cobertura** | **2** | Los cuatro criterios tienen casos, hay negativos y bordes, pero queda al menos un requisito de las fuentes sin ninguna pieza. Ver «QUÉ FALTA». |
| **D3 · Claridad ejecutable** | **2** | La mayoría de los casos traen datos concretos y resultado observable, pero hay piezas donde el resultado queda a interpretación. Hallazgos abajo. |
| **D4 · Honestidad sobre lo no verificable** | **3** | Los textos no fijados por la fuente llevan `POR CONFIRMAR` con puntero a pregunta abierta (P1, P3, P4). Ningún caso afirma un texto que la historia no respalda. |

**Total: 10 / 12**

---

## 2. Hallazgos

| # | Pieza citada | Dimensión | Qué encontré | Por qué importa |
|---|---|---|---|---|
| H01 | C10 | D3 · Claridad ejecutable | El resultado esperado dice *«Se muestra un timer visual con una cuenta regresiva de segundos.»* sin especificar un dato observable concreto: no dice desde qué número inicia la cuenta regresiva, ni dónde buscar el timer en la pantalla. | Dos personas podrían discrepar sobre si un elemento que dice «Espere…» sin número es o no es «una cuenta regresiva de segundos». Sin un dato concreto que observar, el resultado de este caso depende de la interpretación de quien lo ejecute. |
| H02 | C09 | D3 · Claridad ejecutable | Los datos dicen *«La cuenta está bloqueada (5 fallos previos), quedan segundos en el timer.»* sin decir cuántos segundos deben quedar. El resultado dice *«El botón de login está deshabilitado y no se puede hacer clic.»* sin decir cómo se verifica «no se puede hacer clic». | Alguien que lo ejecute tiene que decidir en qué momento del bloqueo observarlo y qué evidencia constituye «no se puede hacer clic» (atributo `disabled`, pointer-events, intento de clic sin efecto). |
| H03 | C12 | D3 · Claridad ejecutable | El resultado esperado dice *«Login exitoso: se muestra mensaje de bienvenida con el nombre del usuario.»* sin marcar `POR CONFIRMAR` ni apuntar a P4 como sí lo hacen C01 y C13 para la misma verificación. | El mismo resultado se trata de forma distinta dentro del artefacto: C01 y C13 marcan `POR CONFIRMAR → P4`, pero C12 no. Quien lo ejecute no sabe si en C12 debe verificar el nombre con el mismo rigor que en C01 y C13. |
| H04 | Conjunto C07–C11 | D2 · Cobertura | CA3 dice *«la cuenta se bloquea por 30 segundos»*. Hay un caso para el momento 0 del timer (C11), pero ninguna pieza verifica que la duración del bloqueo sea efectivamente 30 segundos. | El número 30 es un dato del requisito. Sin una pieza que lo verifique, la duración podría estar mal configurada y ningún caso lo detectaría. |

---

## 3. Qué falta — cobertura

| # | Hueco | Fuente · fragmento |
|---|---|---|
| F1 | Ninguna pieza comprueba que el timer inicie en 30 ni que la duración total del bloqueo sea exactamente 30 segundos. | CA3 · REQ-L03 · *«la cuenta se bloquea por 30 segundos»* |
| F2 | Ninguna pieza verifica qué pasa al intentar un 6.° intento durante el bloqueo (si el sistema lo rechaza, extiende el timer o lo ignora). P7 lo reconoce, pero no hay pieza que verifique al menos el comportamiento observable. | CA3 · REQ-L03 · *«después de 5 intentos fallidos consecutivos, la cuenta se bloquea»* + P7 |
| F3 | Ninguna pieza prueba un email con formato inválido (ej. `sinArroba`). Si el sistema valida formato antes de consultar credenciales, ese comportamiento queda sin pieza. *(Si el equipo decide que no está en alcance porque la fuente no lo menciona explícitamente, esta viñeta se descarta.)* | CA1 · REQ-L01 · *«El login requiere email y contraseña»* |
| F4 | Ninguna pieza verifica que tras 3 fallos + 1 éxito el contador vuelva a 0. P6 lo reconoce, pero mientras no se resuelva, queda sin pieza y sin `POR CONFIRMAR`. | CA3 · REQ-L03 · *«5 intentos fallidos **consecutivos**»* + P6 |

---

## 4. Lo que no se pudo evaluar

| Qué | Por qué |
|---|---|
| Si los fragmentos citados coinciden con `docs/contrato-api.md` o `docs/mapa-selectores.md`. | No se entregaron como fuente en esta revisión. |
| Si las credenciales de prueba (`ana.garcia@ejemplo.com` / `Segura2026!`) siguen siendo válidas. | Se responde ejecutando, no revisando el artefacto. |
| Si P8 (redirección post-login) debería tener al menos un caso `POR CONFIRMAR`. | La historia no menciona redirección; sin decisión del equipo sobre alcance, no se puede clasificar como hueco. |

---

## 5. Decisiones de la QA

> Una fila por hallazgo y una por viñeta de «qué falta». Nada se modifica en el artefacto hasta que
> la decisión esté firmada aquí.

| ID | Tipo | Resumen | Decisión | Acción resultante |
|---|---|---|---|---|
| H01 | hallazgo | C10 — resultado del timer sin dato observable concreto | `ACEPTO Y CORRIJO` | Corregir resultado de C10: *«se ve un número de segundos que baja de a uno»*. Que empiece en 30 lo prueba el caso nuevo de F1, no C10. |
| H02 | hallazgo | C09 — datos y resultado del botón deshabilitado sin criterio de verificación | `ACEPTO Y CORRIJO` | Corregir datos y resultado de C09: *«con el timer todavía corriendo, el botón se ve apagado y al hacer clic no pasa nada»*. |
| H03 | hallazgo | C12 — resultado de bienvenida sin `POR CONFIRMAR → P4` (inconsistencia con C01/C13) | `ACEPTO Y CORRIJO` | Agregar `POR CONFIRMAR → P4` al resultado de C12, igual que C01 y C13. |
| H04 | hallazgo | C07–C11 — ninguna pieza verifica la duración de 30 s | `ACEPTO Y CORRIJO` | No se tocan los casos existentes. Se agrega un caso nuevo (ver F1). |
| F1 | cobertura | Duración del bloqueo = 30 s sin pieza | `ACEPTO Y CORRIJO` | Caso nuevo: comprobar que el timer arranca en 30 y que el botón vuelve a funcionar cuando llega a 0. |
| F2 | cobertura | 6.° intento durante bloqueo sin pieza | `ACEPTO Y NO CORRIJO HOY` | Desde la pantalla no se puede (botón apagado). Por API la historia no dice qué debería pasar. La duda ya es P7; cuando el equipo la responda, se escribe el caso. |
| F3 | cobertura | Email con formato inválido sin pieza | `RECHAZO` | CA1 dice «Ambos son obligatorios»: exige llenar los campos, no cómo debe estar escrito el email. Probar formato sería probar una regla que nadie escribió. Si producto agrega una regla de formato, ahí se escribe. |
| F4 | cobertura | Reset del contador tras éxito sin pieza | `ACEPTO Y NO CORRIJO HOY` | «Consecutivos» implica reset, pero la historia no lo dice explícitamente. La duda ya es P6; cuando el equipo la responda, se escribe el caso. |

---

*Revisión producida con `revisar-con-rubrica` · qa-automation-portfolio · 2026-09-24*

---

## Revisión del test de C10

| ID | Hallazgo | Decisión de QA | Acción |
|---|---|---|---|
| C10-J1 | REQ-L04 no define el texto exacto del saludo ni si usa nombre de pila o nombre completo. | ACEPTADO | Mantengo provisionalmente la expectativa observada `¡Hola, Ana!` y elevo P4 para decisión de negocio. No cambio el requisito, el producto ni el test sin confirmación. |
