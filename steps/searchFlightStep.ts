import { expect } from '@playwright/test';
import { BlazeDemoPage } from '../pages/blazeDemoPage';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();
let blazeDemoPage: BlazeDemoPage;

Given('I am on the BlazeDemo homepage', async ({page}) => {
  blazeDemoPage = new BlazeDemoPage(page);
  await blazeDemoPage.goto();
});

When('I select the departure city {string}', async ({page},departureCity: string) => {
  await blazeDemoPage.selectDepartureCity(departureCity);
});

When('I select the destination city {string}', async ({page},destinationCity: string) => {
  await blazeDemoPage.selectDestinationCity(destinationCity);
});

When('I click the {string} button', async ({page},buttonText: string) => {
  await blazeDemoPage.clickFindFlightsButton();
});

// Then('I should see flight search results', async ({page}) => {
//   const results = await blazeDemoPage.getFlightSearchResults();
//   expect(results.length).toBeGreaterThan(0);
// });

// Then('I should see flights from {string} to {string}', async ({page},departureCity: string, destinationCity: string) => {
//   const results = await blazeDemoPage.getFlightSearchResults();
//   const filteredResults = results.filter(result =>
//     result.departure.includes(departureCity) && result.destination.includes(destinationCity)
//   );
//   expect(filteredResults.length).toBeGreaterThan(0);
// });

When('I choose a flight', async ({page}) => {
  await blazeDemoPage.chooseFlight();
});

Then('I should be on the flight confirmation page', async ({page}) => {
  const pageTitle = await blazeDemoPage.getPageTitle();
  expect(pageTitle).toBe('BlazeDemo Purchase');
});