const { Builder, By, Key, until, Browser } = require('selenium-webdriver');

async function example() {
    
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {
    // 1. Open Google
    await driver.get('https://www.google.com');

    // 2. Find search box and type something
    await driver.findElement(By.name('q')).sendKeys('Selenium WebDriver', Key.RETURN);

    // 3. Wait for results page to load
    await driver.wait(until.titleContains('Selenium WebDriver'), 5000);

    // 4. Print page title
    const title = await driver.getTitle();
    console.log('Page title is:', title);
  } finally {
    // 5. Quit browser
    await driver.quit();
  }
}

example();
