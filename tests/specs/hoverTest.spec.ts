import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures'

test.describe('Filter Changing Tests', () => {
    test.beforeEach(async ({ basePage, loginPage,  salesPage}) => {
        await basePage.openUrl();
        await loginPage.loginWithValidCreds();
        await salesPage.waitForCanvas();
    });

    test('Check Data and Querry Params Change', async ({ salesPage, salesHelper, basePage }) => {
        test.setTimeout(50000);
        await salesPage.clickFilterMenu(0);
        expect(await salesHelper.checkFilterOptionsAreVisible("Brand")).toBeTruthy()
        await salesPage.clickFilterMenu(1);
        expect(await salesHelper.checkFilterOptionsAreVisible("Year")).toBeTruthy()
        const gap = 24;  // 24px is the width of the table indications on the left
        for(let k = 0; k < (await salesPage.getTabs()).length; k++){
            await salesPage.clickTab(k)
            for (let i = 0; i < (await salesPage.getFilterBrandOptions()).length; i++){
                for (let j = 0; j < (await salesPage.getFilterYearOptions()).length; j++){
                    let prevArr = await salesHelper.getCanvasValuesArray(gap);
                    let prevURL = await basePage.getUrl();
                    await salesPage.clickFilterMenu(0);
                    await salesPage.clickFilterBrandOption(i);
                    await salesPage.clickFilterMenu(1);
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
})