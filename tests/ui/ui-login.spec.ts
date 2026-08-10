import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe("UI Login Tests", () => {

    test.beforeEach(async ({page}) => {
        await page.goto("https://automationexercise.com/login");
    });

    test("Test Case 1: Register User", async ({ page }) => {
        const loginPage = new LoginPage(page);

        const name = "Portfolio QA";
        const email  = "playwrightpractise2@cv.com";

        await loginPage.signup(name, email);
        await expect(page).toHaveURL("https://automationexercise.com/signup");
        
    });
    test("Test Case 2: Login User with correct email and password", async ({ page }) => {
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

    test("Test Case 3: Login User with incorrect email and password", async ({ page }) => {
        const loginPage = new LoginPage(page);

        const password = "error123987!";
        const email  = "playwrightpractise@cv.com";

        await loginPage.login(email, password);
        const errorBanner = loginPage.getErrorMessageLocator();
        await expect(errorBanner).toBeVisible();
        
    });


    test("Test Case 4: Logout User", async ({ page }) => {
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

    test("Test Case 5: Register User with existing email", async ({ page }) => {
        const loginPage = new LoginPage(page);  

        const name = "Existing Email";
        const email  = "playwrightpractise@cv.com";  

        await loginPage.signup(name, email);
        await expect(loginPage.getExistingEmailError()).toBeVisible();
    });

    test("Test N: Password Masking", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await expect(loginPage.getPasswordInput()).toHaveAttribute("type", "password");

    });

});