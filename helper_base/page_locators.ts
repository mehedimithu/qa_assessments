import { Page, Locator } from "@playwright/test";

export class PageLocators {
    readonly page: Page;
    readonly HOME_TITLE: Locator;
    readonly DepartureInput: Locator;
    readonly DepartureInputSelectIndex: Locator;
    readonly destinationInput: Locator;
    readonly destinationSelection: Locator;
    readonly pickadate: Locator;
    readonly selectDate: Locator;
    readonly pickReturnDate: Locator;
    readonly selectReturnDate: Locator;

    readonly travelersInput: Locator;
    readonly addtravellerButton: Locator;
    readonly searchButton: Locator;
    readonly selectAirline: Locator;
    readonly selectNovoAir: Locator;
    readonly priceForAll: Locator;


    constructor(page: Page) {
        this.page = page;
        this.HOME_TITLE = page.getByText('Create A New Story With Every');
        this.DepartureInput = page.getByTestId('departure-airport-input-form-1');
        this.DepartureInputSelectIndex = page.locator('p.font-bold.text-brand-8');
        this.destinationInput = page.getByTestId('destination-airport-input-form-1')
        this.destinationSelection = page.getByText('Dhaka, Bangladesh');
        this.pickadate = page.locator('button').filter({ hasText: 'Departure11 Sep, 2025Thursday' });
        this.selectDate = page.getByLabel('Choose Thursday, September 25th, 2025');
        this.pickReturnDate = page.getByTestId('flight-return-date-selector');
        this.selectReturnDate = page.getByLabel('Choose Saturday, September 27th, 2025');
        this.travelersInput = page.getByText('Traveller, Class');
        this.addtravellerButton = page.getByTestId('adult-number-add-button');
        this.searchButton = page.getByTestId('search-flight-button');
        this.selectAirline = page.getByTestId('airline-filter-list').getByAltText('image').first();
        this.selectNovoAir = page.getByTestId('airline-filter-list').getByAltText('image').nth(3);

        this.priceForAll = page.locator('div.line-through');


    }



    async comparePrices(airline1: string, price1: number, airline2: string, price2: number) {
        if (price1 < price2) {
            console.log(`${airline1} is cheaper: ${price1} vs ${price2}`);
        } else if (price1 > price2) {
            console.log(`${airline2} is cheaper: ${price2} vs ${price1}`);
        } else {
            console.log(`Both ${airline1} and ${airline2} have the same price: ${price1}`);
        }
    }

}