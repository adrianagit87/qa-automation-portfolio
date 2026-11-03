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
}