import { Locator } from '@playwright/test';
import { Page } from './page';

const canvas: string = 'div[tabindex="0"] canvas';
const salesSubItem: string = '[class*="Sales_subItem"]';
const filterMenu: string = 'span.ant-select-selection-item';
const filterBrandOption: string = '#rc_select_0_list ~ .rc-virtual-list div.ant-select-item-option-content';
const filterYearOption: string = '#rc_select_1_list ~ .rc-virtual-list div.ant-select-item-option-content';
const tab: string = '[role="tab"]';

export class SalesPage extends Page {
    constructor(page: import('@playwright/test').Page) {
        super(page);
    }

    async getCanvas(): Promise<Locator> {
        await this.page.waitForSelector(canvas);
        return await super.getElement(canvas);
    }

    async getSalesSubitem(): Promise<Locator> {
        await this.page.waitForSelector(salesSubItem);
        return (await super.getElement(salesSubItem)).first();
    }

    async getSalesSubitemText(): Promise<string> {
        const element = await this.getSalesSubitem();
        return await super.getElementText(element) ?? "";
    }

    async getFilterMenus(): Promise<Locator[]> {
        await this.page.waitForSelector(filterMenu);
        return await super.getElements(filterMenu);
    }

    async getFilterMenuText(index: number): Promise<string>{
        const elements = await this.getFilterMenus();
        return await super.getElementText(elements[index]) ?? "";
    }

    async getFilterBrandOptions(): Promise<Locator[]> {
        return await super.getElements(filterBrandOption);
    }

    async getFilterYearOptions(): Promise<Locator[]> {
        return await super.getElements(filterYearOption);
    }

    async getTabs(): Promise<Locator[]> {
        return await super.getElements(tab);
    }

    async clickFilterBrandMenu(): Promise<void> {
        const elements = await this.getFilterMenus();
        await super.clickLocatorByIndex(elements, 0);
    }

    async clickFilterYearMenu(): Promise<void> {
        const elements = await this.getFilterMenus();
        await super.clickLocatorByIndex(elements, 1);
    }

    async clickFilterBrandOption(index: number): Promise<void> {
        const elements = await this.getFilterBrandOptions();
        await super.clickLocatorByIndex(elements, index);
    }

    async clickFilterYearOption(index: number): Promise<void> {
        const elements = await this.getFilterYearOptions();
        await super.clickLocatorByIndex(elements, index);
    }

    async clickTab(index: number): Promise<void> {
        const elements = await this.getTabs();
        await super.clickLocatorByIndex(elements, index);
    }

    async hoverCanvasCoordinates(x: number, y: number): Promise<void> {
        const element = await this.getCanvas();
        await super.hoverLocatorCoordinates(element, x, y);
    }

    async waitForCanvas(): Promise<void> {
        const element = await this.getCanvas();
        await super.waitForLocator(element);
    }
}