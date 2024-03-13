import { Locator } from '@playwright/test';

class CanvasHelper {

  async hoverColumnCoordinates(tab: Locator, gap: number, columnIdex: number): Promise<number[]> {
    const boundingBox = await tab.boundingBox();
    
    const width = boundingBox ? boundingBox.width : null ?? 0;
    const height = boundingBox ? boundingBox.height : null ?? 0;

    const columnWidth = (width - gap) / 12

    const hoverHigh = height / 2;
    const hoverWidth = gap + columnWidth/2 + columnWidth * (columnIdex-1)

    return [hoverWidth, hoverHigh]
  }
}

export { CanvasHelper }