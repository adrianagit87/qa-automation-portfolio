import { test, expect } from '../fixtures';

/**
 * C16 · Flujo integrado UI + API
 *
 * Patrón: la capa API establece la verdad → la capa UI tiene que reflejarla.
 *
 * Fuente de los tres requerimientos:
 *   https://playground.calidadsinhumo.com/documentacion  ·  sección 8
 *   REQ-N01  El listado muestra a los estudiantes paginados, 10 por página.
 *   REQ-N02  El total de páginas es ceil(total / pageSize). Con 25 estudiantes y 10 por
 *            página son 3 páginas; ningún estudiante debe quedar inalcanzable.
 *   REQ-N03  Cada página muestra exactamente pageSize registros distintos. La página 1
 *            empieza en el primer registro y ningún registro se repite entre páginas.
 *
 * El endpoint GET /api/students no está documentado: se descubrió en Network y quedó
 * registrado en docs/contrato-api.md §0 como observación con fecha.
 *
 * La API la representa services/estudiantes.service.ts (fixture estudiantes) y la pantalla,
 * pages/estudiantes.page.ts (fixture estudiantesPage), las dos en tests/fixtures.ts.
 * Los pedidos y los locators viven ahí; las aserciones, acá.
 *
 * Verificado el 2026-08-18 y el 2026-10-04:
 *   ✓ el primero pasa
 *   ✘ los dos siguientes fallan por DISCREPANCIA_CONTRATO_PRODUCTO: no se corrigen.
 *     Córrelo, lee los dos rojos y su evidencia, y recién ahí márcalos como fallos
 *     esperados con test.fail(), como en C13 y C15 (las dos líneas están en recursos-s16/LEEME.md).
 */

test('la lista de estudiantes muestra lo que devuelve la API', async ({ estudiantes, estudiantesPage }) => {
  // 1 · La capa API establece la verdad
  const respuesta = await estudiantes.listar(1, 10);
  expect(respuesta.status()).toBe(200);
  const datos = await respuesta.json();

  // 2 · El dato dinámico compartido: nace acá, lo consume la UI.
  //     No se escribe literal: si lo escribiera, estaría comparando la pantalla
  //     contra mi memoria en vez de contra la otra capa.
  const primerEstudiante = datos.items[0].name;
  const totalDeclarado = datos.total;

  // 3 · La capa UI tiene que reflejar esa verdad.
  //     Recién ahora se abre la pantalla: la fixture estudiantesPage no navega sola.
  await estudiantesPage.goto();
  await expect(estudiantesPage.celda(primerEstudiante)).toBeVisible();
  await expect(estudiantesPage.total).toContainText(`${totalDeclarado} estudiantes`);

  // 4 · Limpieza: NO APLICA. Este escenario no crea nada en el servidor.
  //     Un afterEach vacío es una omisión; un comentario que explica es una decisión.
});

test('REQ-N01 · REQ-N03 · la página devuelve exactamente pageSize registros', async ({ estudiantes }) => {
  test.fail(); // BUG-STUDENTS-01, visto el 3/11/2026: la página 1 trae 11 registros y el id 11 se repite en la 2.
  const respuesta = await estudiantes.listar(1, 10);
  const datos = await respuesta.json();

  // REQ-N01: "El listado muestra a los estudiantes paginados, 10 por página."
  // Observado 2026-08-18 y 2026-10-03: devuelve 11. Y el id 11 (Karen Ávila) aparece también
  // en la página 2, lo que además incumple REQ-N03.
  expect(datos.items).toHaveLength(datos.pageSize);
});

test('REQ-N02 · ningún estudiante queda inalcanzable', async ({ estudiantes }) => {
  test.fail(); // BUG-STUDENTS-02, visto el 3/11/2026: totalPages 2 con 25 estudiantes; la cuenta da 3.
  const respuesta = await estudiantes.listar(1, 10);
  const datos = await respuesta.json();

  // REQ-N02: "El total de páginas es ceil(total / pageSize)."
  // Observado 2026-08-18 y 2026-10-03: total 25, pageSize 10, totalPages 2. La cuenta da 3.
  // La UI muestra "página 1 de 2": los estudiantes 22 a 25 no se alcanzan desde
  // la interfaz, aunque ?page=3 sí los devuelve.
  expect(datos.totalPages).toBe(Math.ceil(datos.total / datos.pageSize));
});
