import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures'

test.describe('Sales Page Tests', () => {
    test.beforeEach(async ({ basePage, loginPage,  salesPage}) => {
        await basePage.openUrl();
        await loginPage.loginWithValidCreds();
        await salesPage.waitForCanvas();
    });

    test('Check Data and Querry Params Change', async ({ salesPage, salesHelper, basePage }) => {
        await salesPage.clickFilterBrandMenu();
        await salesPage.clickFilterYearMenu();
        const gap = 24;  // 24px is the width of the table indications on the left
        for(let k = 0; k < (await salesPage.getTabs()).length; k++){
            await salesPage.clickTab(k)
            for (let i = 0; i < (await salesPage.getFilterBrandOptions()).length; i++){
                for (let j = 0; j < (await salesPage.getFilterYearOptions()).length; j++){
                    let prevArr = await salesHelper.getCanvasValuesArray(gap);
                    let prevURL = await basePage.getUrl();
                    await salesPage.clickFilterBrandMenu();
                    await salesPage.clickFilterBrandOption(i);
                    await salesPage.clickFilterYearMenu();
                    await salesPage.clickFilterYearOption(j);
                    let curArr = await salesHelper.getCanvasValuesArray(gap);
                    let curURL = await basePage.getUrl();
                    if(!(i == 0 && j == 0)){
                        expect(curArr).not.toBe(prevArr);
                        expect(curURL).not.toBe(prevURL);
                    }
                }
            }
        }        
    })
    
    test('Check Filter Dropdown Menus', async ({ salesPage, salesHelper }) => {
        await salesPage.clickFilterBrandMenu();
        expect(await salesHelper.checkFilterOptionsAreVisible("Brand")).toBeTruthy()
        await salesPage.clickFilterYearMenu();
        expect(await salesHelper.checkFilterOptionsAreVisible("Year")).toBeTruthy()
    })

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