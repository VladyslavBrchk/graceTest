import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures'

test.describe('Sales Page API Tests', () => {
    test.beforeEach(async ({ basePage, loginPage,  salesPage}) => {
        await basePage.openUrl();
        await loginPage.loginWithValidCreds();
        await salesPage.waitForCanvas();
    });

    test('Check Backend Responses', async ({ salesPage, basePage, page, adminAPI }) => {

    })
})