---
name: crear-fixture-playwright
description: "Crea fixtures a partir de preparación repetida en tests Playwright. Propone antes de editar y conserva casos, datos y verificaciones."
---

# Crear una fixture de Playwright

> Los seis campos de siempre: cuándo se usa · entrada · pasos · límites · cuándo pide decisión
> humana · salida y criterio de terminado.

## 1. Cuándo se usa

Cuando tests existentes repiten preparación que conviene reutilizar. No la uses para diagnosticar fallos ni cambiar reglas de negocio.

## 2. Entrada

| Qué | Obligatoria |
|---|---|
| Archivos de tests existentes y sus imports | Sí |
| Page Objects y fixtures utilizados por esos tests | Sí, si existen |
| Instrucciones del proyecto y alcance solicitado | Sí |

Lee los archivos reales. Si falta una entrada necesaria, pídela; no inventes rutas, métodos ni resultados esperados.

## 3. Pasos

1. Lee las entradas. Identifica preparación repetida y sepárala de datos, acciones y verificaciones de cada caso.
2. Si una fixture ya resuelve esa preparación, explica lo encontrado y detente: no la dupliques. Si no hay preparación reutilizable, explica por qué no conviene extraerla.
3. Propón nombre, tipo, archivo y tests consumidores. Indica qué queda igual y pide aprobación. No edites todavía.
4. Solo tras aprobarse, amplía el `test` del proyecto mediante `base.extend`. Usa alcance test: crea el objeto, prepara su pantalla y entrégalo con `await use(objeto)`. Cada test recibe su propia instancia.
5. Exporta el `test` ampliado y el `expect` de Playwright. Ajusta solo los imports y la preparación de los tests aprobados para recibir la fixture por nombre.
6. Revisa y muestra el diff. Comprueba que conservaste casos, requisitos, títulos, datos y aserciones. Detente.

## 4. Límites — qué NO hace

- No mueve credenciales, acciones propias del caso ni verificaciones a la fixture.
- No confunde abrir el formulario con iniciar sesión ni añade autenticación no solicitada.
- No comparte objetos mutables entre tests ni crea una fixture por caso.
- No sobrescribe fixtures existentes: propone su ampliación si corresponde.
- No modifica archivos fuera del alcance aprobado.
- No ejecuta tests, instala dependencias ni hace commits sin petición expresa.

## 5. Cuándo pide decisión humana

Para ante archivos o reglas faltantes, preparación diferente entre casos, cambios de alcance o una fixture existente que necesitaría ampliarse. Pide aprobación antes de editar.

## 6. Salida y criterio de terminado

Antes de editar: preparación común encontrada, decisión, rutas y plan; espera aprobación.
Después de una edición aprobada: archivos modificados, diff, comprobaciones y pendientes.

- [ ] Casos, REQ, títulos, datos y aserciones conservados.
- [ ] Solo preparación común extraída, sin duplicar fixtures.
- [ ] Alcance por test y archivos aprobados respetados.
- [ ] Revisión estática distinguida de ejecución: si no corrió tests, no afirma que pasan.

## 7. Cómo se prueba esta skill

| Prueba | Qué tiene que pasar |
|---|---|
| Tests que repiten preparación | Propone extracción y espera aprobación sin editar |
| Tests que ya usan la fixture | Reconoce lo resuelto y no duplica ni modifica |
| Falta un Page Object necesario | Pide el archivo; no inventa métodos |

Estas son comprobaciones propuestas; no acreditan una ejecución del agente.

## 8. Dónde se vuelve a usar

En otro conjunto de tests del proyecto que repita preparación. La primera invocación de C13 solo revisa: el login ya usa la fixture creada durante la clase.
