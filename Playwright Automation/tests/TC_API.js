import { test, expect } from '@playwright/test';
import { blogURL } from '../config'

test('Very Basic API test asserting the PrestaShop Blog API', async ({ request }) => {
    const response = await request.get(blogURL);

    //console.log(response);

    expect(response).toBeOK();
    expect(response.status()).toBe(200);
    const responseBody = await response.body();
    //console.log(responseBody);

})