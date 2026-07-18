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
    await  expect(page).toHaveURL("https://automationexercise.com");
    const loginConfirmationElement = loginPage.findLoginConfirmationLocator();
    await expect(loginConfirmationElement).toContainText("Logged in as "+name);

    //The above kept failing. Why?
    //toContainText() is a web-first assertion, it must be awaited.

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

});

test("Test 5: Register User using Existing Email", async ({ page }) => {
    const loginPage = new LoginPage(page);  

    const name = "Existing Email";
    const email  = "playwrightpractise@cv.com";  

    await loginPage.signup(name, email);
    await expect(page.getByText("Email Address already exist!")).toBeVisible();
});

test("Test 6: Logout User", async ({ page }) => {
    const loginPage = new LoginPage(page);

    const password = "playwright123";
    const email  = "playwrightpractise@cv.com";
    const name = "Playwright CV";

    await loginPage.login(email, password);
    await  expect(page).toHaveURL("https://automationexercise.com");
    const loginConfirmationElement = loginPage.findLoginConfirmationLocator();
    await expect(loginConfirmationElement).toContainText("Logged in as "+name);

    const logoutConfirmationElement = loginPage.findLogoutConfirmationLocator();
    await logoutConfirmationElement.click();
    await  expect(page).toHaveURL("https://automationexercise.com/login");


});