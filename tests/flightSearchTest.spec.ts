const { chromium } = require('playwright');
const assert = require('assert').strict;
const { getPage, closeBrowser } = require('../support/env');
const { testData } = require('../test_data/flightSearchData');
const BlazeDemoPage = require('../pages/blazeDemoPage');

let page;
let blazeDemoPage;

describe('Flight Search Tests', () => {
  before(async () => {
    page = await getPage();
    blazeDemoPage = new BlazeDemoPage(page);
    await blazeDemoPage.goto();
  });

  after(async () => {
    await closeBrowser();
  });

  testData.forEach(({ departureCity, destinationCity }) => {
    it(`should search for flights from ${departureCity} to ${destinationCity}`, async () => {
      await blazeDemoPage.selectDepartureCity(departureCity);
      await blazeDemoPage.selectDestinationCity(destinationCity);
      await blazeDemoPage.clickFindFlightsButton();
      const results = await blazeDemoPage.getFlightSearchResults();

      assert.ok(results.length > 0, 'Expected flight search results to be greater than 0');
      assert.ok(results.every(result => result.departure.includes(departureCity) && result.destination.includes(destinationCity)),
        'Expected all flight search results to match departure and destination cities');

      await blazeDemoPage.chooseFlight();
      const pageTitle = await page.title();
      assert.strictEqual(pageTitle, 'BlazeDemo Purchase', 'Expected page title to be "BlazeDemo Purchase"');
    });
  });
});