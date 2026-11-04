// C16 · GET /api/students, el endpoint que alimenta /estudiantes (docs/contrato-api.md §0).
// Como AuthService y CursosService: habla con la API y devuelve la respuesta. Ningún expect.

import { type APIRequestContext } from '@playwright/test';

export class EstudiantesService {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async listar(pagina: number, tamano: number) {
    return this.request.get(`/api/students?page=${pagina}&pageSize=${tamano}`);
  }
}
