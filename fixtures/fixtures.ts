import { test as base } from "@playwright/test";
import { Page } from "../tests/pages/page";
import { SalesPage } from "../tests/pages/salesPage.page";
import { LoginPage } from "../tests/pages/loginPage.page";

import { CanvasHelper } from "../tests/helpers/canvas.helper";

type MyFixtures = {
    basePage: Page;
    loginPage: LoginPage;
    salesPage: SalesPage;

    canvasHelper: CanvasHelper;
    
};

export const test = base.extend<MyFixtures>({
    basePage: async ({ page }, use) => {
        await use(new Page(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    salesPage: async ({ page }, use) => {
        await use(new SalesPage(page));
    },
    canvasHelper: async ({ page }, use) => {
        await use(new CanvasHelper());
    },
});