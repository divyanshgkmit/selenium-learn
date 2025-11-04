const { Builder, Browser, By, Key } = require("selenium-webdriver");

(async function example() {
    const driver = await new Builder().forBrowser(Browser.SAFARI).build();

    console.log("Safari launched!");

    await driver.manage().window().maximize();

    await driver.get("https://demoecom.com/shop/");

    const searchBox = await driver.findElement(By.className('wc-block-product-search__field'));
    await searchBox.sendKeys('shirt', Key.RETURN);

    await driver.sleep(1000);

    const addToCart = await driver.findElement(
        By.xpath('//*[@id="wc-column-container"]/ul/li[1]/a[2]')
    );
    await addToCart.click();

    await driver.sleep(1000);

    // Click on Cart icon
    const cartIcon = await driver.findElement(
        By.xpath('//*[@id="site-navigation"]/div/div[2]/span/a')
    );
    await cartIcon.click();

    await driver.sleep(2000);

    // Click on Checkout button
    const checkoutButton = await driver.findElement(
        By.css('.checkout-button.button.alt.wc-forward')
    );
    await checkoutButton.click();

    await driver.sleep(2000);

    // Fill first name
    const firstName = await driver.findElement(By.id('billing_first_name'));
    await firstName.sendKeys('Divyansh');

    // Fill email
    const email = await driver.findElement(By.id('billing_email'));
    await email.sendKeys('divyanshjain@gmail.com');

    await driver.sleep(2000);

    // Click on Place Order
    const placeOrder = await driver.findElement(By.xpath('//*[@id="place_order"]'));
    await placeOrder.click();

    console.log("Order placed.");

    await driver.sleep(5000);

    console.log("Test done.");
    await driver.quit();
})();
