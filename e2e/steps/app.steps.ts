//import { BrowserTransferStateModule } from "@angular/platform-browser";
import { When } from "cucumber";

const { Given,Then } = require('cucumber');
const { browser, by } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));


Given('The app is open on {string}', { timeout: 25 * 1000 }, async (string) => {
    await browser.get('http://' + string + ':4200/');
    await browser.sleep(2000);
    await chai.expect(browser.element(by.id('query')).isDisplayed()).to.eventually.be.true;
});

When('I click on {string} radio button',{ timeout: 25 * 1000 }, async (btn) => {
    let btnxpath = `//label[contains(text(), "${btn}")]/../input`;
     chai.expect(await browser.element(by.xpath(btnxpath)).isDisplayed()).to.be.true;
   // await expect(browser.element(by.xpath(btnxpath)).isDisplayed()).toBe(true);
    await browser.element(by.xpath(btnxpath)).click();
});

When('I enter {string} in text box and click on search button',{ timeout: 25 * 1000 },async(searchValue) =>{
let searchfield = `//input[@id = "query"]`;
let searchBtn = `//button[@type = "submit"]`;

await chai.expect(await browser.element(by.xpath(searchfield)).isDisplayed()).to.be.true;
await browser.element(by.xpath(searchfield)).clear();
await browser.element(by.xpath(searchfield)).sendKeys(searchValue);
await browser.element(by.xpath(searchBtn)).click();
await browser.sleep(3000);

})

Then('I check the {string} as {string}',async(context,matchingData) => {
    let fieldXpath ;
    
    switch (context){
        case "Title":
        case "Name":    
            fieldXpath = `//div[@class = "card"]//h6`;
        break;
        case "Population":
            fieldXpath = `//div[text() = "Population:"]/following-sibling::div`;
        break;
        case "Climate":
            fieldXpath = `//div[text() = "Climate:"]/following-sibling::div`;
        break;
        case "Gravity":
            fieldXpath = `//div[text() = "Gravity:"]/following-sibling::div`;
        break;
        case "Gender":
            fieldXpath = `//div[text() = "Gender:"]/following-sibling::div`;
        break;
        case "Birth-year":
            fieldXpath = `//div[text() = "Birth year:"]/following-sibling::div`;
        break;
        case "Eye-color":
            fieldXpath = `//div[text() = "Eye color:"]/following-sibling::div`;
        break;
        case "Skin-color":
            fieldXpath = `//div[text() = "Skin color:"]/following-sibling::div`;
        break;

    }
   let webElementText = await browser.element(by.xpath(fieldXpath)).getText();
    chai.expect(webElementText).to.equal(matchingData);

});

Then('the total results fetched should be {string}',async(matchingData) => {
matchingData = parseInt(matchingData);
let totalResults = `//h6[contains(@class, "card-subtitle")]`;
let totalCount = await browser.element.all(by.xpath(totalResults)).count();
chai.expect(totalCount).to.equal(matchingData);

});

Then('No Result is displayed', async () => {
    let totalResults = `//h6[contains(@class, "card-subtitle")]`;
    let totalCount = await browser.element.all(by.xpath(totalResults)).count();
    
    chai.expect(totalCount).to.equal(0);
    await chai.expect(browser.element(by.xpath(`//div[text() = "Not found."]`)).isDisplayed()).to.eventually.be.true;
})

