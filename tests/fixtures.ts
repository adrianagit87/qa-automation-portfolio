import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegistroPage } from '../pages/registro.page';
import { CursosService } from '../services/cursos.service';

export const test = base.extend<{ loginPage: LoginPage; registroPage: RegistroPage; cursos: CursosService }>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    },
    registroPage: async ({ page }, use) => {
        const registroPage = new RegistroPage(page);
        await registroPage.goto();
        await use(registroPage);
    },
    cursos: async ({ request }, use) => {
        await use(new CursosService(request));
    },
});

export { expect } from '@playwright/test';