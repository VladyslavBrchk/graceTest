import { APIRequestContext } from '@playwright/test';

export class AdminAPI {

    constructor(private request: APIRequestContext) {
        this.request = request;
    }

    async getMonthleSalesCounts() {
        let response = await this.request
            .post('https://dev-api.grace-technology.io/admin/insurance/monthly-sales-counts', {
                data: {
                    brandIds: ["064936f5-1241-4008-b47a-62fc687d818c"],
                    year: 2024
                }
            })
        const unitResponseBody = await response.json()
        console.log(unitResponseBody)
    }
}