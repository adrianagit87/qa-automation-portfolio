---
name: reportar-bug
description: Redacta reportes de bug a partir de evidencia copiada y de una fuente (contrato, historia de usuario o requisito). Separa bugs de hallazgos sin fuente. No inventa datos y no decide la severidad.
---

# Reportar un bug

> Los seis campos de siempre: cuándo se usa · entrada · pasos · límites · cuándo pide decisión
> humana · salida y criterio de terminado.

## 1. Cuándo se usa

Cuando ya viste un comportamiento distinto del esperado y tienes la evidencia copiada. Sirve para
una API o para una pantalla, en este curso o en tu trabajo.

**Cuándo NO se usa:** para averiguar por qué falló un test (`diagnosticar-fallo-playwright`), ni
para decidir si el producto está bien.

## 2. Entrada

| Qué | Obligatoria |
|---|---|
| **Evidencia** copiada de lo que pasó: la respuesta, el mensaje o la descripción de la captura | Sí |
| **Fuente**: el archivo y la sección que dicen qué tenía que pasar | Sí, para llamarlo bug |
| **Fecha** en que se vio, y quién lo vio | Sí |
| **Dónde** escribir el reporte, y el **número** de cada bug si ya lo tiene | Sí |
| **Observaciones** que la fuente no define | Si las hay |

Si falta algo obligatorio, **lo pide**. No lo completa.

## 3. Pasos

1. **Lee** la evidencia y la fuente, en el archivo real.
2. **Separa.** Es **bug** si la fuente dice una cosa y la evidencia muestra otra. Es **hallazgo** si la
   fuente no lo define o se contradice.
3. **Escribe cada bug** con estas piezas:
   - **Título:** qué falla, en una línea.
   - **Dónde:** el endpoint con su método, o la pantalla, exactos.
   - **Dato:** lo que se mandó o se escribió, exacto.
   - **Para reproducirlo:** el comando o los pasos. Si no vienen en la evidencia, los arma con la dirección,
     el método y el dato, y avisa que no los ejecutó.
   - **Esperado:** la referencia de la fuente y la frase **textual**.
   - **Obtenido:** copiado de la evidencia, sin resumir.
   - **Fecha** y quién lo vio.
   - **Severidad:** `PENDIENTE`.
4. **Escribe «Hallazgos que no son bugs»**, si los hay: qué se observó, la fecha y quién lo vio.
5. **Comprueba** que cada frase citada está textual en la fuente y que cada resultado está en la
   evidencia. Lo que no esté, lo marca como `SIN COMPROBAR`.
6. **Entrega y para.**

## 4. Límites — qué NO hace

- No agrega nada que no esté en la evidencia o en la fuente.
- No parafrasea una cita ni resume un resultado.
- No decide la severidad.
- No afirma la causa del bug.
- No llama bug a algo que la fuente no define.
- No cambia ni borra líneas de la fuente.
- No crea tickets ni publica nada.

## 5. Cuándo pide decisión humana

- Falta la evidencia, o la fuente.
- La fuente se contradice: lo anota como hallazgo y pregunta.
- La evidencia no alcanza para saber qué pasó.
- Siempre, para la severidad.

## 6. Salida y criterio de terminado

El archivo del reporte. Y, en la conversación, una lista corta: qué bugs escribió, qué hallazgos separó
y qué quedó `SIN COMPROBAR`.

- [ ] Cada bug tiene **dónde exacto · dato exacto · resultado exacto · fuente citada · fecha**.
- [ ] Las citas están textuales en la fuente.
- [ ] Los resultados están en la evidencia.
- [ ] La severidad dice `PENDIENTE`.

**El reporte lo firma quien lo revisa:** la QA comprueba cada pieza y decide la severidad.

## 7. Cómo se prueba esta skill

| Prueba | Con qué | Qué tiene que pasar |
|---|---|---|
| **El bug** | el caso 5 de `POST /api/enroll`, con su respuesta | un bug que cita REQ-C06 textual y `Severidad: PENDIENTE` |
| **Sin fuente** | el `405` de `GET /api/enroll` | un hallazgo, no un bug |
| **Sin evidencia** | solo el nombre del bug | pide la evidencia y no escribe el reporte |

---

*Nace en C15. Se vuelve a usar con cualquier bug del curso, y en tu trabajo con tu propia fuente.*
