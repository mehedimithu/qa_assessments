import { test, expect } from '@playwright/test';
import { Credentials } from '../helper_base/credentials';
import { PageLocators } from '../helper_base/page_locators';

const BASE_URL = Credentials.BASE_URL;

test.use({ baseURL: BASE_URL });
test.describe.configure({ mode: 'serial' });

test.describe('UI Tests', () => {

    test.afterEach(async ({ page, context }) => {
        // If you use built-in fixtures, Playwright auto-closes page/context.
        // Keep these only if your custom fixtures leave them open:
        await context.clearPermissions();
        await context.clearCookies();

        // Avoid closing here if the runner manages lifecycle, but if required:
        try { await page.close(); } catch { }
        try { await context.close(); } catch { }
    });

    test('Should navigate to the flight page and verify URL and  display the correct title on the flight page', async ({ page }) => {
        const pageLocators = new PageLocators(page);

        // Go to flight page and verify URL & title
        await page.goto('/flight', { waitUntil: 'networkidle' });
        await expect(page).toHaveURL(/.*flight/);

        // Make sure the title text matches the real DOM text exactly
        await expect(pageLocators.HOME_TITLE).toBeVisible();
        await expect(pageLocators.HOME_TITLE).toHaveText('Create A New Story With Every Trip');

        // Should navigate to the search criteria and verify
        await test.step('Search for flights', async () => {
            // Departure
            await pageLocators.DepartureInput.click();
            await pageLocators.DepartureInputSelectIndex.nth(1).click();

            // Destination
            await pageLocators.destinationInput.click();
            await pageLocators.destinationSelection.click();

            // Outbound date
            await pageLocators.pickadate.click();
            await pageLocators.selectDate.click();
            // Return date
            await pageLocators.pickReturnDate.click();
            await pageLocators.selectReturnDate.click();

            // Travelers and Search
            await pageLocators.travelersInput.click();
            await pageLocators.addtravellerButton.click();

        });

        // Search and wait for results
        await pageLocators.searchButton.click();
        await page.waitForTimeout(12000);

        await pageLocators.selectAirline.click();
        const priceText = await pageLocators.priceForAll.nth(1).innerText();
        const priceValue = parseInt(priceText.replace(/[^\d]/g, ''), 10);
        console.log('Price for USBangla airlines:', priceValue);

        await page.waitForTimeout(5000);

        // Select NovoAir and get price
        await pageLocators.selectNovoAir.click();
        const priceText2 = await pageLocators.priceForAll.nth(1).innerText();
        const priceValue2 = parseInt(priceText2.replace(/[^\d]/g, ''), 10);
        console.log('Price for NovoAir Airlines:', priceValue2);

        //Price Compare
        pageLocators.comparePrices('US-Bangla', priceValue, 'NovoAir', priceValue2);


    });


    test('API Test: Verify flight  API response', async ({ request }) => {

        const response = await request.get(`${BASE_URL}/flight`);
        expect(response.ok()).toBeTruthy();

        const contentType = response.headers()['content-type'] || '';
        expect(contentType).toContain('text/html');

        const body = await response.text();
        console.log('HTML length:', body.length);

        expect(body.length).toBeGreaterThan(500);
    });

});