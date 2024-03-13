import { Locator, Page as PlaywrightPage } from '@playwright/test';

class Page {
    /**
    * @param {PlaywrightPage} page
    */
    constructor(public page: PlaywrightPage) {}

    async openUrl(url?: string): Promise<void> {
        await this.page.goto(url ?? '/');
        await this.page.waitForLoadState('load');
    }

    async getUrl(): Promise<string> {
        return this.page.url();
    }

    async getElement(selector: string): Promise<Locator> {
        return this.page.locator(selector);
    }

    async getElements(selector: string): Promise<Locator[]> {
        return await this.page.locator(selector).all();
    }

    async clickLocator(locator: Locator) {
        await locator.click();
    }

    async clickLocatorCoordinates(locator: Locator, x: number, y: number) {
        await locator.click({ position: { x: x, y: y }});
    }
    
    async hoverLocator(locator: Locator) {
        await locator.hover();
    }

    async hoverLocatorCoordinates(locator: Locator, x: number, y: number) {
        await locator.hover({ position: { x: x, y: y }});
    }
   
    async pressKey(key: string): Promise<void> {
        await this.page.keyboard.press(key)
    }

    async enterText(locator: Locator, text: string) {
        await locator.fill(text);
    }

}

export { Page };
