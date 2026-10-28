// Page object de la página de registro · C14.
//
// Línea base: el mínimo de la tarea de C13 (nombre, email, contraseña y el botón de registrarse).
// La edad la agregó @pom-agent en C14, en el intento 1 de 3, desde evidence/registro-form.html.
// Evidencia del agente: reports/pom-agent-report.md. Decisión de la QA: ACEPTADO, con motivo.
//
// Las aserciones no viven acá: viven en tests/e2e/registro.spec.ts. La preparación (crear el POM
// y llamar a goto) la hace la fixture registroPage de tests/fixtures.ts.

import { type Locator, type Page } from '@playwright/test';

export class RegistroPage {
  readonly page: Page;
  readonly nombre: Locator;
  readonly email: Locator;
  readonly contrasena: Locator;
  readonly edad: Locator;
  readonly botonCrearCuenta: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nombre = page.getByLabel('Nombre completo');
    this.email = page.getByLabel('Email');
    this.contrasena = page.getByLabel('Contraseña');
    this.edad = page.getByLabel('Edad');
    this.botonCrearCuenta = page.getByRole('button', { name: 'Crear cuenta' });
  }

  async goto() {
    await this.page.goto('/registro');
  }

  async registrarse(nombre: string, email: string, contrasena: string, edad?: string) {
    await this.nombre.fill(nombre);
    await this.email.fill(email);
    await this.contrasena.fill(contrasena);
    if (edad) {
      await this.edad.fill(edad);
    }
    await this.botonCrearCuenta.click();
  }
}
