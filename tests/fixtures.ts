import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegistroPage } from '../pages/registro.page';

export const test = base.extend<{ loginPage: LoginPage; registroPage: RegistroPage }>({
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
});

export { expect } from '@playwright/test';