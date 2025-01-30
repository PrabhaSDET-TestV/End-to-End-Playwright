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

});
test("FirstScript Page", async({page}) => {
    //Automatically done by playwright -> Instance of the new browser created and new page/tab also created
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});