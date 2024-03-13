import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures'

test.use({ ignoreHTTPSErrors: true });

test.describe('Test', () => {
    test.beforeEach(async ({ basePage }) => {
        await basePage.openUrl();
    });

    test('Test', async ({ basePage, salesPage, loginPage, canvasHelper, page }) => {
        await loginPage.loginWithValidCreds();
        await page.waitForTimeout(5000);
        let canvas = await salesPage.getCanvas();
        let coordinates = await canvasHelper.hoverColumnCoordinates(canvas, 24, 1);
        await salesPage.hoverCanvasCoordinates(coordinates[0], coordinates[1])
    })
})