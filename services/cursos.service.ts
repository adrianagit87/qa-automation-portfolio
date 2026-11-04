import { type APIRequestContext } from '@playwright/test';

export class CursosService {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async inscribir(courseId: string) {
        return this.request.post('/api/enroll', { data: { courseId } });
    }

    async inscribirSinCurso() {
        return this.request.post('/api/enroll', { data: {} });
    }

    // GET /api/courses · docs/contrato-api.md §0 y §3. Devuelve la respuesta; ningún expect.
    async listar() {
        return this.request.get('/api/courses');
    }
}