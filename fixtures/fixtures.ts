import { test as base } from "@playwright/test";
import { Page } from "../tests/pages/page";
import { SalesPage } from "../tests/pages/salesPage.page";
import { LoginPage } from "../tests/pages/loginPage.page";

import { SalesHelper } from "../tests/helpers/sales.helper";

type MyFixtures = {
    basePage: Page;
    loginPage: LoginPage;
    salesPage: SalesPage;

    salesHelper: SalesHelper;
    
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
    salesHelper: async ({ salesPage, basePage }, use) => {
        await use(new SalesHelper(salesPage, basePage));
    },
});