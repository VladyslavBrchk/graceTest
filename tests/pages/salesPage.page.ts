import { Locator } from '@playwright/test';
import { Page } from './page';

const canvas: string = 'div > canvas'

class SalesPage extends Page {
    constructor(page: import('@playwright/test').Page) {
        super(page);
    }

    async getCanvas(): Promise<Locator> {
        await this.page.waitForSelector(canvas);
        return await super.getElement(canvas);
    }

    async hoverCanvasCoordinates(x: number, y: number): Promise<void> {
        const element = await this.getCanvas();
        await super.hoverLocatorCoordinates(element, x, y)
    }
}

export { SalesPage };