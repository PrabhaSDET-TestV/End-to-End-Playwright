import {test, expect} from "@playwright/test"

test("FirstScript", async({browser}) => {
    //Chrome -> Plugins, Cookies, Proxy
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

});
