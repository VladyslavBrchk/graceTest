export class UrlHelper {
    async parseQueryString(url: string): Promise<string[]> {
        const urlSearchParams = new URLSearchParams(url);
        const year = urlSearchParams.get('year') ?? '';
        const tab = urlSearchParams.get('tab') ?? '';
        const brand = urlSearchParams.get('brand') ?? '';
        return [year, tab, brand];
    }
}