import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures'

test.describe('Sales Page Refresh Test', () => {
    test.beforeEach(async ({ basePage, loginPage,  salesPage}) => {
        await basePage.openUrl();
        await loginPage.loginWithValidCreds();
        await salesPage.waitForCanvas();
    });

    test('Check Data and Querry Params Not Change', async ({ salesPage, basePage, page }) => {
        let curURL = await basePage.getUrl();
        let curBrandFilter = await salesPage.getFilterMenuText(0);
        let curYearFilter = await salesPage.getFilterMenuText(1);
        await page.reload();
        await salesPage.waitForCanvas();
        expect(await basePage.getUrl()).toBe(curURL);
        expect(await salesPage.getFilterMenuText(0)).toBe(curBrandFilter);
        expect(await salesPage.getFilterMenuText(1)).toBe(curYearFilter);
    })
})