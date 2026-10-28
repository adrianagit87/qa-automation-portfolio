import { type APIRequestContext } from '@playwright/test';

export class AuthService {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(email: string, contrasena: string) {
    return this.request.post('/api/login', { data: { email, password: contrasena } });
  }
}
