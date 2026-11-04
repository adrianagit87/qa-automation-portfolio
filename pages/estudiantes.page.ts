// C16 · la pantalla /estudiantes (https://playground.calidadsinhumo.com/estudiantes).
// Como LoginPage y RegistroPage: locators y navegación. Ningún expect: las aserciones viven en el test.

import { type Locator, type Page } from '@playwright/test';

export class EstudiantesPage {
  readonly page: Page;
  readonly tabla: Locator;
  readonly total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tabla = page.getByRole('table');
    // el contador de arriba de la tabla: «25 estudiantes · página 1 de 2»
    this.total = page.getByTestId('pagination-info');
  }

  async goto() {
    await this.page.goto('/estudiantes');
  }

  celda(texto: string): Locator {
    return this.tabla.getByRole('cell', { name: texto });
  }
}
