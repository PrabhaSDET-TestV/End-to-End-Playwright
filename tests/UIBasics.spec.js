import {test, expect} from "@playwright/test"

/**
 * Playwright Test is based on the concept of test fixtures. Test fixtures are used to establish the environment for each test, giving the test everything it needs and nothing else. 
 * Test fixtures are isolated between tests. With fixtures, you can group tests based on their meaning, instead of their common setup.
 * 
 * page,context,browser,browserName,request
 */
test("FirstScript", async({browser}) => {
    //Chrome -> Plugins, Cookies, Proxy
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

});
test.only("FirstScript Page", async({page}) => {
    //Automatically done by playwright -> Instance of the new browser created and new page/tab also created
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    const userName = page.locator(`#username`);
    const pwd = page.locator(`[type='password']`);
    const signIn = page.locator(`#signInBtn`);

    await userName.fill(`rahulshettyacademy`);
    await pwd.fill(`learn`);
    await signIn.click();

    console.log(await page.locator(`[style*='block']`).textContent());

    await expect(page.locator(`[style*='block']`)).toContainText(`Incorrect`);

    await pwd.fill(``);
    await pwd.fill(`learning`);
    await signIn.click();

    const cardTitle = page.locator(`.card-body a`);
    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(0).textContent());
    
    console.log(await cardTitle.allTextContents());
});

test("UI Controls", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const dropdown = page.locator(`select.form-control`);
    await dropdown.selectOption("consult");

    await page.locator(`.radiotextsty`).nth(1).click();
    await page.locator(`#okayBtn`).click();

    console.log(await page.locator(`.radiotextsty`).nth(1).isChecked());
    await expect(page.locator(`.radiotextsty`).nth(1)).toBeChecked();

    await page.locator(`#terms`).click();
    await expect(page.locator(`#terms`)).toBeChecked();
    await page.locator(`#terms`).uncheck();
    expect(await page.locator(`#terms`).isChecked()).toBeFalsy();

    const documentLink = page.locator(`[href*='documents-request']`);
    await expect(documentLink).toHaveAttribute("class","blinkingText");
});

test("Child page handle", async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator(`[href*='documents-request']`);

    const [ newPage ] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
        ]
    )

    const text = await newPage.locator(`.red`).textContent();
    console.log(text);
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0].split(".")[0];
    console.log(domain);


});