import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { LoginPage } from '../../pages/LoginPage';

test("Verify console: no major runtime errors or leakage warnings", async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("console", (message) => {
        if (message.type() === "error") {
            consoleErrors.push(message.text());
        }
    });

    await page.goto("https://automationexercise.com/");
    await page.waitForLoadState("networkidle");
    expect(consoleErrors, `Found server/client exceptions: ${consoleErrors.join(", ")}`).toEqual([]);
});

test("Verify essential HTTP security headers", async ({ page }) => {
    //note that this test fails! the website doesn't have these headers!
    //tested with facebook: verifies the headers accordingly
    const response = await page.goto("https://automationexercise.com/");
    const headers = response?.headers();
    //optional ? helps if the website is down:
    //test won't crash if response cannot be retrieved

    expect(headers?.['content-security-policy']).toBeTruthy();
    expect(headers?.['x-frame-options']).toBeDefined();
});

test("Block malicious script injection", async ({ page }) => {
    const productPage = new ProductPage(page);
    await page.goto("https://automationexercise.com/products");
    let alert = false;
    page.on("dialog", async (dialog) => {
        alert = true;
        await dialog.dismiss();
    })
    await productPage.searchProduct('<script>alert("Hacked")</script>');
    expect(alert).toBe(false);
    

});

test("Verify secure cookies", async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const password = "playwright123";
    const email  = "playwrightpractise@cv.com";

    await page.goto('https://automationexercise.com/login');
    await loginPage.login(email, password);

    const cookies = await context.cookies(); //context = browser itself.
    for (const cookie of cookies) {
        if (cookie.name === "csrftoken" || cookie.name === "sessionid") {
            expect(cookie.secure).toBe(true); //cookie of the above types must be HTTPS only
            expect(cookie.httpOnly).toBe(true); //cookie of the above types must be unreadable by JavaScript
        }
    }

});