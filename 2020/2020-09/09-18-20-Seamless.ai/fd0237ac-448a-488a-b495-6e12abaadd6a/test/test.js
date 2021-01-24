const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver'), chrome = require('selenium-webdriver/chrome');
var driver;
let name, origin, destination, price, rating, addBtn, sortPrice, sortRating, flightItems, originFilter, destFilter;
const options = new chrome.Options();
options.addArguments(
    'headless'
);

describe('Phone Directory app \n', function() {
  this.timeout(100000);

  before(function(done) {
      driver = new Builder()
          .forBrowser('chrome')
          .setChromeOptions(options)
          .build();
      driver.get('http://localhost:8000')
          .then(() => {
              done();
          });
  });

  after(function() {
      driver.quit();
  })

  beforeEach(async function() {
      driver.navigate().refresh();
      name = await driver.findElement(By.id("name"));
      mobile = await driver.findElement(By.id("mobile"));
      email = await driver.findElement(By.id("email"));
      price = await driver.findElement(By.id("summaryTable"));
      error = await driver.findElement(By.id("error"));
      submit = await driver.findElement(By.id("submit"));
      nameColumn = await driver.findElement(By.id("nameColumn"));
      search = await driver.findElement(By.id("search"));
  })

  it('should show error when input fields are empty', async function() {
    name.sendKeys('');
    mobile.sendKeys('');
    email.sendKeys('');
    await submit.click();
    const hasNoItemAdded = await driver.executeScript("return document.querySelectorAll('#summaryTable tbody').length === 1");
    const displayError = await driver.executeScript("return getComputedStyle(document.getElementsByClassName('error')[0]).display !== 'none'");
    expect(hasNoItemAdded).to.be.true;
    expect(displayError).to.be.true;
  });

  it('should show error when Invalid Inputs are given', async function() {
    // Invalid Name
    name.sendKeys('12345678');
    mobile.sendKeys('9898989898');
    email.sendKeys('admin@xyzcompany.com');
    await submit.click();
    let hasNoItemAdded = await driver.executeScript("return document.querySelectorAll('#summaryTable tbody').length === 1");
    let displayError = await driver.executeScript("return getComputedStyle(document.getElementsByClassName('error')[0]).display !== 'none'");
    expect(hasNoItemAdded).to.be.true;
    expect(displayError).to.be.true;

    name.sendKeys('John doe of South california State');
    mobile.sendKeys('9898989898');
    email.sendKeys('admin@xyzcompany.com');
    await submit.click();
    hasNoItemAdded = await driver.executeScript("return document.querySelectorAll('#summaryTable tbody').length === 1");
    displayError = await driver.executeScript("return getComputedStyle(document.getElementsByClassName('error')[0]).display !== 'none'");
    expect(hasNoItemAdded).to.be.true;
    expect(displayError).to.be.true;


    // Invalid Mobile
    name.sendKeys('John doe');
    mobile.sendKeys('98989898989');
    email.sendKeys('admin@xyzcompany.com');
    await submit.click();
    hasNoItemAdded = await driver.executeScript("return document.querySelectorAll('#summaryTable tbody').length === 1");
    displayError = await driver.executeScript("return getComputedStyle(document.getElementsByClassName('error')[0]).display !== 'none'");
    expect(hasNoItemAdded).to.be.true;
    expect(displayError).to.be.true;

    name.sendKeys('John doe');
    mobile.sendKeys('abcdefghi');
    email.sendKeys('admin@xyz.com');
    await submit.click();
    hasNoItemAdded = await driver.executeScript("return document.querySelectorAll('#summaryTable tbody').length === 1");
    displayError = await driver.executeScript("return getComputedStyle(document.getElementsByClassName('error')[0]).display !== 'none'");
    expect(hasNoItemAdded).to.be.true;
    expect(displayError).to.be.true;

    // Invalid Email
    name.sendKeys('John doe');
    mobile.sendKeys('9898989898');
    email.sendKeys('admin@xyz.com');
    await submit.click();
    hasNoItemAdded = await driver.executeScript("return document.querySelectorAll('#summaryTable tbody').length === 1");
    displayError = await driver.executeScript("return getComputedStyle(document.getElementsByClassName('error')[0]).display !== 'none'");
    expect(hasNoItemAdded).to.be.true;
    expect(displayError).to.be.true;

    name.sendKeys('John doe');
    mobile.sendKeys('9898989898');
    email.sendKeys('abc zyx@xyz.com');
    await submit.click();
    hasNoItemAdded = await driver.executeScript("return document.querySelectorAll('#summaryTable tbody').length === 1");
    displayError = await driver.executeScript("return getComputedStyle(document.getElementsByClassName('error')[0]).display !== 'none'");
    expect(hasNoItemAdded).to.be.true;
    expect(displayError).to.be.true;

    name.sendKeys('John doe');
    mobile.sendKeys('8989898989');
    email.sendKeys('adminadminadminadminadminadminadminadminadmin@xyzcompany.com');
    await submit.click();
    hasNoItemAdded = await driver.executeScript("return document.querySelectorAll('#summaryTable tbody').length === 1");
    displayError = await driver.executeScript("return getComputedStyle(document.getElementsByClassName('error')[0]).display !== 'none'");
    expect(hasNoItemAdded).to.be.true;
    expect(displayError).to.be.true;

  });

  it('should add the contact on clicking Add', async function() {
    name.sendKeys('John Doe');
    mobile.sendKeys('9898989898');
    email.sendKeys('admin2@xyzcompany.com');
    await submit.click();
    name.sendKeys('John');
    mobile.sendKeys('8989898989');
    email.sendKeys('admin3@xyzcompany.com');
    await submit.click();
    const tbody = "document.querySelectorAll('#summaryTable tbody')[0]";
    const hasItemAdded = await driver.executeScript(`return ${tbody}.childElementCount === 3 &&
      ${tbody}.children[0].children[0].innerText === "Admin" && ${tbody}.children[0].children[1].innerText === "9999999999" && ${tbody}.children[0].children[2].innerText === "admin@xyzcompany.com" &&
      ${tbody}.children[1].children[0].innerText === "John Doe" && ${tbody}.children[1].children[1].innerText === "9898989898" && ${tbody}.children[1].children[2].innerText === "admin2@xyzcompany.com" &&
      ${tbody}.children[2].children[0].innerText === "John" && ${tbody}.children[2].children[1].innerText === "8989898989" && ${tbody}.children[2].children[2].innerText === "admin3@xyzcompany.com"`);
    const noError = await driver.executeScript("return getComputedStyle(document.getElementsByClassName('error')[0]).display === 'none'");
    expect(hasItemAdded).to.be.true;
    expect(noError).to.be.true;
  });

  it('should reset after adding a contact', async function() {
    name.sendKeys('John Doe');
    mobile.sendKeys('9898989898');
    email.sendKeys('admin@xyzcompany.com');
    await submit.click();
    let messageDisplay = await name.getAttribute('value');
    expect(messageDisplay).to.equal('');
    messageDisplay = await email.getAttribute('value');
    expect(messageDisplay).to.equal('');
    messageDisplay = await mobile.getAttribute('value');
    expect(messageDisplay).to.equal('');
  });
  
  it('should allow sort by Contact Name Ascending', async function() {
    name.sendKeys('John Doe');
    mobile.sendKeys('9898989898');
    email.sendKeys('admin@xyzcompany.com');
    await submit.click();

    name.sendKeys('Xavier');
    mobile.sendKeys('9898989898');
    email.sendKeys('admin@xyzcompany.com');
    await submit.click();

    // Ascending
    await nameColumn.click();
    let name1 = "document.querySelectorAll('#summaryTable tbody')[0].children[0].children[0].innerText.toLowerCase()";
    let name2 = "document.querySelectorAll('#summaryTable tbody')[0].children[1].children[0].innerText.toLowerCase()";
    let name3 = "document.querySelectorAll('#summaryTable tbody')[0].children[2].children[0].innerText.toLowerCase()";
    let sorted = await driver.executeScript(`return (${name1} < ${name2}) && (${name1} < ${name3}) && (${name2} < ${name3})`);
    expect(sorted).to.be.true;
    driver.takeScreenshot().then(
      function(image, err) {
        require('fs').writeFile('name-sorting-ascending.png', image, 'base64', function(err) {});
      }
    );
  });

  it('should allow sort by Contact Name Descending', async function() {
    name.sendKeys('John Doe');
    mobile.sendKeys('9898989898');
    email.sendKeys('admin@xyzcompany.com');
    await submit.click();

    name.sendKeys('Xavier');
    mobile.sendKeys('9898989898');
    email.sendKeys('admin@xyzcompany.com');
    await submit.click();

    // Ascending
    await nameColumn.click();
    await nameColumn.click();
    name1 = "document.querySelectorAll('#summaryTable tbody')[0].children[1].children[0].innerText.toLowerCase()";
    name2 = "document.querySelectorAll('#summaryTable tbody')[0].children[2].children[0].innerText.toLowerCase()";
    name3 = "document.querySelectorAll('#summaryTable tbody')[0].children[3].children[0].innerText.toLowerCase()";
    sorted = await driver.executeScript(`return !(${name1} < ${name2}) || (${name1} < ${name3}) || (${name2} < ${name3})`);
    expect(sorted).to.be.true;
  });

  it('should show #f2f2f2 in alternate rows', async function() {
    name.sendKeys('John Doe');
    mobile.sendKeys('9898989898');
    email.sendKeys('admin@xyzcompany.com');
    await submit.click();

    name.sendKeys('Xavier');
    mobile.sendKeys('9898989898');
    email.sendKeys('admin4@xyzcompany.com');
    await submit.click();

    name.sendKeys('Xavier calvin');
    mobile.sendKeys('9898984898');
    email.sendKeys('admin5@xyzcompany.com');
    await submit.click();
    const hasBg = await driver.executeScript("return  getComputedStyle(document.querySelectorAll('#summaryTable tbody')[0].children[0]).background.includes('rgb(242, 242, 242)') && getComputedStyle(document.querySelectorAll('#summaryTable tbody')[0].children[2]).background.includes('rgb(242, 242, 242)')");
    expect(hasBg).to.be.true;
  });

  it('should show correct rows if searched with mobile number', async function() {
    name.sendKeys('John Doe');
    mobile.sendKeys('9876543210');
    email.sendKeys('admin3@xyzcompany.com');
    await submit.click();

    name.sendKeys('Xavier');
    mobile.sendKeys('9876540000');
    email.sendKeys('admin4@xyzcompany.com');
    await submit.click();

    name.sendKeys('Xavier Mahnu');
    mobile.sendKeys('8876540000');
    email.sendKeys('admin5@xyzcompany.com');
    await submit.click();

    const tbody = "document.querySelectorAll('#summaryTable tbody')[0]";
    search.sendKeys('987654');
    let correctRows = await driver.executeScript(`return document.querySelectorAll('#summaryTable tbody')[0].childElementCount === 2 &&
      ${tbody}.children[0].children[0].innerText === "John Doe" && ${tbody}.children[0].children[1].innerText === "9876543210" && ${tbody}.children[0].children[2].innerText === "admin3@xyzcompany.com"
      ${tbody}.children[1].children[0].innerText === "Xavier" && ${tbody}.children[1].children[1].innerText === "9876540000" && ${tbody}.children[1].children[2].innerText === "admin4@xyzcompany.com"`);

    expect(correctRows).to.be.true;
    search.clear();
    search.sendKeys('9876543210');
    correctRows = await driver.executeScript(`return document.querySelectorAll('#summaryTable tbody')[0].childElementCount === 1 && 
      ${tbody}.children[0].children[0].innerText === "John Doe" && ${tbody}.children[0].children[1].innerText === "9876543210" && ${tbody}.children[0].children[2].innerText === "admin3@xyzcompany.com"`);
    expect(correctRows).to.be.true;
    driver.takeScreenshot().then(
      function(image, err) {
        require('fs').writeFile('search.png', image, 'base64', function(err) {});
      }
    );
  });

  it('should show No Results found <div>, if no Mobile numbers gets filtered in search', async function() {
    name.sendKeys('John Doe');
    mobile.sendKeys('9876543210');
    email.sendKeys('admin3@xyzcompany.com');
    await submit.click();

    const tbody = "document.querySelectorAll('#summaryTable tbody')[0]";
    search.sendKeys('0000000000');
    let correctRows = await driver.executeScript(`return document.querySelectorAll('#summaryTable tbody')[0].childElementCount === 0 && getComputedStyle(document.getElementById('noResult')).display !== 'none'`);
    expect(correctRows).to.be.true;
    driver.takeScreenshot().then(
      function(image, err) {
        require('fs').writeFile('noResult.png', image, 'base64', function(err) {});
      }
    );
  });
});
