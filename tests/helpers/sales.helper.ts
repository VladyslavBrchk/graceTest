import { Locator } from '@playwright/test';
import { SalesPage } from '../pages/salesPage.page';
import { Page } from '../pages/page';

export class SalesHelper {

  readonly salesPage: SalesPage;
  readonly basePage: Page;

  constructor(salesPage: SalesPage, basePage: Page) {
    this.salesPage = salesPage;
    this.basePage = basePage;
  }

  async getCanvasValuesArray(gap: number): Promise<number[]> {
    let arr: number[] = []
    await this.basePage.pause(500); //this is pause to wait for animation of the canvas to be played
    for (let i = 0; i < 12; i++) {
      const element = await this.salesPage.getCanvas();
      const boundingBox = await element.boundingBox();
      const width = boundingBox ? boundingBox.width : null ?? 0;
      const height = boundingBox ? boundingBox.height : null ?? 0;
      const columnWidth = (width - gap) / 12;
      const hoverHigh = height / 2;
      const hoverWidth = gap + columnWidth / 2 + columnWidth * (i)
      await this.salesPage.hoverCanvasCoordinates(hoverWidth, hoverHigh);
      let str = await this.salesPage.getSalesSubitemText();
      let match = str.match(/\d+/);
      arr.push(match ? parseInt(match[0]) : 0)
    }
    return arr;
  }
}