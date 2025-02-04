const { test, expect } = require('@playwright/test');

test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'IPHONE 13 PRO';
   const products = page.locator(".card-body");

   await page.goto("https://rahulshettyacademy.com/client");

   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();

   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();

   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   
   const count = await products.count();
   for(let i = 0; i < count; i++) {
      if( await products.nth(i).locator(`b`).textContent() === productName ) {
         await products.nth(i).getByRole("button", { name : " Add To Cart" }).click();
         break;
      }
   }

   await page.locator(`[routerlink*='cart']`).click();
   await page.waitForLoadState('networkidle');
   const bool = await page.locator(`h3:has-text('${productName}')`).isVisible();
   expect(bool).toBeTruthy();

   await page.locator(`text=Checkout`).click();
   await page.locator(`(//input[@class='input txt'])[1]`).fill("345");
   await page.locator(`(//input[@class='input txt'])[2]`).fill("Prabhakaran Ravi");
   await page.locator(`[name='coupon']`).fill("rahulshettyacademy");
   await page.getByRole('button', { name: 'Apply Coupon' }).click();
   
   await page.locator(`[placeholder*='Country']`).click();
   await page.locator(`[placeholder*='Country']`).pressSequentially("Ind" , { delay: 100 });
   const dropDown = page.locator(`.ta-results`);
   await dropDown.waitFor();

   const optionsCount = await dropDown.locator(`button`).count();
   for(let i=0; i < optionsCount; i++) {
      const text = await dropDown.locator(`button`).nth(i).textContent();
      if(text.trim() === "India"){
         await dropDown.locator(`button`).nth(i).click();
         break;
      }
   }

   await expect(page.locator(`.user__name label`)).toHaveText(email);
   await page.locator(`.action__submit`).click();
   await expect(page.locator(`.hero-primary`)).toHaveText(` Thankyou for the order. `);
   const orderID = await page.locator(`.em-spacer-1 .ng-star-inserted`).textContent();
   console.log(orderID);

   await page.locator(`label[routerlink*='myorders']`).click();
   await page.locator(`tbody`).waitFor();
   const rows = page.locator(`tbody tr`);
   for(let i = 0; i < await rows.count(); i++) {
      const rowOrderID = await rows.nth(i).locator(`th`).textContent();
      if( orderID.includes(rowOrderID)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }

   }

   const orderIdDetails = await page.locator(".col-text").textContent();
   console.log(orderIdDetails)
   expect(orderID.includes(orderIdDetails)).toBeTruthy();

})