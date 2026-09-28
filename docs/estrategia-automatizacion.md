# Estrategia de automatización — Academia sin Humo

**Sistema bajo prueba:** `https://playground.calidadsinhumo.com`
**Especificación:** `https://playground.calidadsinhumo.com/documentacion`
**Fecha de esta versión:**
**Responsable:**

> Este archivo **no es un ejercicio de clase**. Es el backlog que dirige lo que se construye desde
> C10: cuando abras Playwright, el primer test sale de la sección 5 de este archivo.
>
> Tres reglas que lo sostienen:
>
> 1. **Ningún ítem entra sin fuente.** Si no puedes decir de qué archivo, REQ o fila salió, no es un
>    candidato: es una idea. Las ideas van a la sección 6.
> 2. **Las columnas «decisión» y «razón» las escribes tú.** El score ordena la conversación; no la
>    cierra. Desde C7, quien propone los números puede ser una skill. Quien firma, no.
> 3. **«No automatizar» no significa «no probar».** Cada descarte dice qué se hace en su lugar.

---

## 0. De dónde salieron los candidatos

| Fuente | Qué aporta | Dónde vive |
|---|---|---|
| `docs/contrato-api.md` §4 y §5 | las discrepancias con su REQ y las incógnitas que escribiste ejecutando | C6 |
| `docs/contrato-api.md` §10 | **tu lista cruda**: todo lo que se te ocurrió probar, sin ordenar | tarea de C6 |
| `docs/mapa-selectores.md` | los elementos del login ya localizados y comprobados en el DOM real | C3 · C4 |
| Lo que sé de mi equipo | cada cuánto sale una versión, qué está por cambiar, qué datos puedo preparar | mi cabeza — y por eso ninguna IA lo tiene |

---

## 1. Contexto que hoy tengo (lo que la IA no puede saber)

> Rellena lo que sepas. Lo que no sepas, escríbelo como pregunta: también es información, y es la
> entrada nº 2 de la skill que prioriza. Si esta sección está vacía, la mitad de los puntajes va a
> volver marcada `SIN CONTEXTO` — y eso es correcto, no es un fallo.

- **Cada cuánto sale una versión nueva:**
- **Qué parte del producto está por cambiar o en construcción:**
- **Qué datos de prueba puedo preparar o resetear sin pedirle permiso a nadie:**
- **Qué falla dejaría a un usuario afuera del producto:**
- **Cuánto tiempo tengo por semana para mantener tests:**

---

## 2. Los cuatro criterios y la escala

Cada candidato se puntúa de **1 a 3** en cuatro criterios. **Los cuatro apuntan en la misma
dirección: más alto = mejor candidato a automatizar.**

| Criterio | La pregunta | 1 punto | 2 puntos | 3 puntos |
|---|---|---|---|---|
| **Frecuencia** | ¿cada cuánto habría que volver a correr esta prueba? | una sola vez | de vez en cuando, en alguna versión | en cada versión, o todos los días |
| **Estabilidad** | ¿cambia seguido lo que esta prueba verifica? | cambia cada semana o está en construcción | cambia a veces | estable desde hace meses |
| **Riesgo** | si esto falla en producción, ¿qué tan grave es? | cosmético: nadie se entera | molesta, pero se puede seguir trabajando | crítico: acceso, datos, dinero, seguridad |
| **Mantenimiento** | ¿cuánto trabajo cuesta mantener vivo este test? | caro: dato que se prepara a mano, espera fija, depende de terceros, selector frágil | mantenible con esfuerzo | barato: dato controlado, selector estable, respuesta textual |

> **Ojo con el cuarto.** Es el que se lee al revés: **3 es el más FÁCIL de mantener.** Está invertido
> a propósito para que los cuatro sumen en la misma dirección y el total se lea derecho.

**Total** = suma de los cuatro. Va de **4** a **12**.

| Total | Zona | Lectura |
|---|---|---|
| 10 – 12 | 🟢 verde | candidato claro |
| 7 – 9 | 🟡 amarillo | hay una tensión entre criterios: decides tú y lo argumentas |
| 4 – 6 | 🔴 rojo | no automatizar por ahora |

> **La zona es una lectura, no una sentencia.** Un total de 10 con **estabilidad = 1** puede ser un
> no: significa que el test se va a romper todas las semanas antes de haber encontrado un bug. Un
> criterio en 1 puede tumbar un puntaje alto, y eso se escribe en la columna «razón».
>
> Y al revés también: **tres candidatos pueden sacar 12 y terminar con tres decisiones distintas.**
> Eso pasó en C7 con las filas `L1`, `E2` y `CAT1` de la sección 3. El total no las separó; las
> separaron tres preguntas que los cuatro criterios no hacen:
>
> - **¿para qué está este test?** — si no puedes declarar su propósito, no entra;
> - **¿cuándo se escribe?** — un test contra un bug conocido y sin arreglar nace en rojo;
> - **¿qué bug atraparía que no atrape otro?** — si la respuesta es «ninguno», es redundante.

**Decisiones posibles** (no son solo dos):

`AUTOMATIZAR YA` · `AUTOMATIZAR DESPUÉS DE …` · `PROBAR A MANO` · `EXPLORATORIO` · `NO PROBAR`

| Decisión | Cuándo | Qué significa |
|---|---|---|
| `AUTOMATIZAR YA` | verde y sin condición pendiente | entra a la primera tanda |
| `AUTOMATIZAR DESPUÉS DE …` | el candidato vale, pero falta algo concreto | se escribe **qué** falta: un arreglo, un dato de prueba, que el rediseño termine |
| `PROBAR A MANO` | no vale el mantenimiento, pero sí la verificación | queda en el checklist de la versión |
| `EXPLORATORIO` | no hay expectativa definida todavía | se reserva tiempo para mirarlo sin guion |
| `NO PROBAR` | ni el riesgo ni la frecuencia lo justifican | se escribe igual, con su razón, para no volver a discutirlo el mes que viene |

---

## 3. El backlog priorizado

> Ordenado por decisión, no por total. Las dos primeras filas vienen resueltas como ejemplo: se
> conservan, se corrigen o se borran, pero **no se copian**: cada fila tiene que tener tu razón.

| # | Candidato | Fuente | Frec | Estab | Riesgo | Mant | Total | Zona | Decisión (mía) | Razón (mía) | Qué cambiaría mi decisión |
|---|---|---|---:|---:|---:|---:|---:|---|---|---|---|
| E1 | `POST /api/enroll` con body `{}` devuelve `400` y el mensaje `El campo courseId es obligatorio` | `contrato-api.md` §1 caso 2 · REQ-A03 | 3 | 2 | 2 | 3 | 10 | 🟢 | AUTOMATIZAR YA | Es el test más barato de todo el backlog: una request, un status y un texto exacto. Sirve de canario: si este endpoint se toca, se entera primero. | Si el mensaje vuelve a cambiar. Este mismo caso devolvía `500` el 11 de agosto y `400` el 17: seis días. Si cambia otra vez, la estabilidad baja a 1 y lo saco de la primera tanda. |
| V1 | El botón *Iniciar sesión* conserva el color de marca y el título queda centrado | `mapa-selectores.md` · ningún REQ lo respalda | 1 | 2 | 1 | 1 | 5 | 🔴 | NO PROBAR · se mira en la revisión visual de cada versión | Es cosmético y no hay ningún requerimiento que lo defina, así que el test no podría citar una fuente. Además, una aserción de color se rompe con cada retoque de marca. | Si apareciera un requerimiento de contraste accesible, dejaría de ser cosmético: riesgo pasa a 3 y se automatiza con la herramienta de accesibilidad de C18. |
| L1 | Login por pantalla con credenciales válidas muestra el mensaje de bienvenida con el nombre del usuario | `mapa-selectores.md` · REQ-L04 | 3 | 3 | 3 | 3 | 12 | 🟢 | AUTOMATIZAR YA | Es el arranque de la suite: si no se puede entrar, no sigue nada. Y es el único test del backlog que verifica REQ-L04, el saludo con el nombre: si el login entra pero saluda mal, ningún otro test se entera. | Si el equipo anuncia un rediseño del login, la estabilidad baja a 2 y lo reviso antes de escribirlo. |
|  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |  |  |  |  |  |

### Firma de esta versión del backlog

> **Esto no es una formalidad.** Firmar quiere decir que si dentro de un mes alguien pregunta por qué
> un ítem quedó afuera, la razón está escrita y tiene tu nombre al lado. Una tabla generada por una
> skill y sin firmar no es un backlog: es una propuesta.

- **Firmo yo:**
- **Fecha:**
- **Filas firmadas:** ___ de ___
- **Quién propuso los puntajes:** `.agents/skills/priorizar-automatizacion` · corrida del ___
- **Lo que NO firmo todavía, y qué dato me falta:**

---

## 4. Los descartes, con su razón

> Un descarte sin razón escrita se vuelve a discutir el mes que viene. Uno con razón escrita se
> defiende en treinta segundos.

| Candidato descartado | Por qué no se automatiza | Qué se hace en su lugar |
|---|---|---|
| El botón *Iniciar sesión* conserva el color de marca | cosmético y sin requerimiento que lo respalde | revisión visual en cada versión |
|  |  |  |
|  |  |  |

---

## 5. Los tres primeros

> Esta es la sección que se abre en **C10**. Lo que esté acá arriba es lo que se implementa primero.

| Orden | Candidato | Por qué va primero | Qué evidencia voy a producir |
|---|---|---|---|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |

**Lo que hoy no se puede verificar** (y por qué):

-

---

## 6. Ideas sin fuente

> Lo que se te ocurrió pero todavía no puedes rastrear a un archivo, un REQ o una observación
> propia. No entra al backlog hasta que tenga fuente. **Esta sección no es un fracaso: es la
> antesala.** Muchas veces una idea sin fuente es en realidad una pregunta que nadie hizo todavía.

-

---

## 7. Cómo se prioriza: la skill

> **La instrucción de priorización no está en este archivo.** Vive en un solo lugar:
> `.agents/skills/priorizar-automatizacion/SKILL.md`, la primera skill de este repositorio.
>
> La razón es práctica, no estética: cuando un procedimiento tiene dos copias, se corrige una y la
> otra sigue circulando vieja. Este archivo guarda **los criterios, la escala y las decisiones** —el
> formato del documento—. La skill guarda **el procedimiento** —qué se le pide, con qué límites y
> dónde para—.

Lo que hay que saber para trabajar con ella:

| | |
|---|---|
| **Qué necesita** | 1 · la lista de candidatos con fuente (`contrato-api.md` §10 o la sección 6 de acá) · 2 · el contexto de equipo de la sección 1 · 3 · los criterios de la sección 2 |
| **Qué devuelve** | una tabla con `# · candidato · fuente · Frec · Estab · Riesgo · Mant · Total · Zona · qué dato me falta` |
| **Qué NO devuelve** | las columnas «decisión» y «razón». Esas dos no aparecen en su salida, por diseño |
| **Cuándo para y pregunta** | cuando un puntaje depende de un dato que no está en el repositorio |

**El único pedido que hace falta escribir**, si tu herramienta lee el repositorio:

```text
Usa la skill priorizar-automatizacion sobre los candidatos de docs/contrato-api.md §10
y el contexto de docs/estrategia-automatizacion.md §1.
```

Si tu herramienta **no** ve tus archivos, la sección 8 del `SKILL.md` explica qué pegar a mano. No
cambian los pasos, ni los límites, ni el criterio de terminado: cambia dónde vive el contexto.

---

## 8. Gate humano

- [ ] Cada ítem del backlog tiene su fuente: archivo, REQ o fila. Ninguno dice "se me ocurrió".
- [ ] Cada ítem tiene decisión **y** razón escritas por mí, no por la skill.
- [ ] Cada celda que la skill marcó `SIN CONTEXTO` está resuelta, o dice qué dato falta y a quién se lo voy a pedir.
- [ ] Hay al menos un descarte con su razón y con qué se hace en su lugar.
- [ ] La columna «qué cambiaría mi decisión» está llena en los tres primeros.
- [ ] Puedo defender el orden de la sección 5 delante de alguien que proponga otro.
- [ ] La firma de la sección 3 está completa, con fecha y con el número de filas firmadas.
- [ ] No hay ni una línea de código de test en este archivo. Eso empieza en C10.

**La prueba de la reunión:** si alguien señala una fila y pregunta *"¿por qué esto va antes que
aquello?"*, la respuesta tiene que ser una razón escrita, no *"lo puso la IA"* ni *"sumó más"*.

---

## 9. Adónde va este archivo

- **C8** convierte este repositorio en un sistema de trabajo completo: las reglas de
  `.agents/rules/criterio-qa.md` cosechadas de verdad, `agents.md` entendido, la portabilidad a otras
  herramientas y una segunda skill empaquetada sin guía paso a paso.
- **C9** toma la fila `L1` de la sección 3 y le genera casos de prueba con un juez que los revisa.
- **C10** abre la sección 5 y toma el primer ítem: ese es el primer test de Playwright del curso.
- **C11 a C17** vuelven acá cada vez que hay que decidir qué se prueba a continuación.
- **C18 a C20** lo usan como estrategia del proyecto final: un backlog con razones escritas es la
  parte del portfolio que se puede defender en una entrevista.

Este archivo es **vivo**: se revisa cuando el producto cambia, cuando cambia el equipo o cuando una
decisión envejece. Una estrategia de hace seis meses que nadie tocó no es una estrategia: es un
documento.
