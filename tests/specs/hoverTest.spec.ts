import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures'

test.describe('Test', () => {
    test.beforeEach(async ({ basePage, loginPage,  salesPage}) => {
        await basePage.openUrl();
        await loginPage.loginWithValidCreds();
        await salesPage.waitForCanvas();
    });

    test('Test', async ({ salesPage, salesHelper, basePage }) => {
        test.setTimeout(50000);
        await salesPage.clickFilterMenu(0);
        await salesPage.clickFilterMenu(1);
        const gap = 24;  // 24px is the width of the table indications on the left
        for(let k = 0; k < (await salesPage.getTabs()).length; k++){
            await salesPage.clickTab(k)
            for (let i = 0; i < (await salesPage.getFilterBrandOption()).length; i++){
                for (let j = 0; j < (await salesPage.getFilterYearOption()).length; j++){
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