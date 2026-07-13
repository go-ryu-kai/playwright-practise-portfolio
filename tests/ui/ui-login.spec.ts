import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.beforeEach(async ({page}) => {
    await page.goto("https://automationexercise.com/login");
});

test("Test 1: Valid Login Happy Path", async ({ page }) => {
    const loginPage = new LoginPage(page);

    const password = "playwright123";
    const email  = "playwrightpractise@cv.com";
    const name = "Playwright CV";

    await loginPage.login(email, password);
    expect(page).toHaveURL("https://automationexercise.com");
    const loginConfirmationElement = await loginPage.findLoginConfirmation(name);
    expect(loginConfirmationElement).toContain("Logged in as "+name);

});

test("Test 2: Invalid Login: Bad Password", async ({ page }) => {
    const loginPage = new LoginPage(page);

    const password = "error123987!";
    const email  = "playwrightpractise@cv.com";

    await loginPage.login(email, password);
    const errorBanner = loginPage.getErrorMessageLocator();
    await expect(errorBanner).toBeVisible();
    
});

test("Test 3: Sign Up New User (Not Full Journey)", async ({ page }) => {
    const loginPage = new LoginPage(page);

    const name = "Portfolio QA";
    const email  = "playwrightpractise2@cv.com";

    await loginPage.signup(name, email);
    await expect(page).toHaveURL("https://automationexercise.com/signup");
    
});

test("Test 4: Password Masking", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.getPasswordInput()).toHaveAttribute("type", "password");

})
