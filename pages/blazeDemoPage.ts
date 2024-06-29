import { Page } from "@playwright/test";

export class BlazeDemoPage {
    getPageTitle() {
       return 'BlazeDemo Purchase'
    }
    page:Page

    constructor(page) {

      this.page = page;
    }
  
    async goto() {
      await this.page.goto('https://blazedemo.com/');
    }
  
    async selectDepartureCity(departureCity) {
      await this.page.selectOption('select[name="fromPort"]', departureCity);
    }
  
    async selectDestinationCity(destinationCity) {
      await this.page.selectOption('select[name="toPort"]', destinationCity);
    }
  
    async clickFindFlightsButton() {
      await Promise.all([
        this.page.waitForNavigation(),
        this.page.click('input[value="Find Flights"]'),
      ]);
    }
  
    // async getFlightSearchResults() {
    //  return await this.page.$$eval('table > tbody > tr', rows =>
    //     rows.map(row => ({
    //       departure: row.cells[0].textContent.trim(),
    //       destination: row.cells[1].textContent.trim(),
    //       flightNumber: row.cells[2].textContent.trim(),
    //       airline: row.cells[3].textContent.trim(),
    //       departs: row.cells[4].textContent.trim(),
    //       arrives: row.cells[5].textContent.trim(),
    //       price: row.cells[6].textContent.trim(),
    //       chooseFlightLink: row.cells[7].querySelector('a').getAttribute('href'),
    //     }))
    //   );
    // }
  
    async chooseFlight() {
      await Promise.all([
        this.page.waitForURL('**/purchase.php'),
        this.page.click('table > tbody > tr:nth-child(1) td:last-child a'),
      ]);
    }
  }
  