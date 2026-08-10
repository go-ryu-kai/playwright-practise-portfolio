import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ContactPage } from '../../pages/ContactPage';
import { faker } from '@faker-js/faker';

test.describe("UI Miscellaneous Tests", () => {

    test.beforeEach(async ({ page }) => {
        // Playwright Best Practice: Route blocking applied before navigation
        await page.route('**/*googlesyndication.com/**', route => route.abort());
        await page.route('**/*doubleclick.net/**', route => route.abort());
    });


    test("Test 6: Contact Us and Form Submit", async ({ page }) => {
        await page.goto("https://automationexercise.com/");
        
        const basePage = new HomePage(page);
        const contactPage = new ContactPage(page);

        const contactForm = basePage.findNavbarLocator("Contact Us");
        await contactForm.click();

        await expect(page).toHaveURL("https://automationexercise.com/contact_us");
        await expect(contactPage.getHeader()).toBeVisible();

        await contactPage.fillAndSubmitForm("Contact Person", "abc@xyz.com", "My Enquiry", "This Is A Test Message");
        
        await expect(contactPage.getSuccessAlert()).toBeVisible({ timeout: 15000 });
        await expect(contactPage.getSuccessAlert()).toContainText("Success! Your details have been submitted successfully.");
    });

    test("Test 7: Test Cases", async ({ page }) => {
        await page.goto("https://automationexercise.com/");
        const basePage = new HomePage(page);

        const testCases = basePage.findNavbarLocator("Test Cases");
        await testCases.click();

        await expect(page).toHaveURL("https://automationexercise.com/test_cases");
        await expect(basePage.getPageTitle()).toBeVisible();
        

    });

    test("Test Case 10: Verify Subscription to Emails in Home Page", async ({ page }) => {
        await page.goto("https://automationexercise.com/");
        const basePage = new HomePage(page);
        const email = faker.internet.email();

        await basePage.getSubscriptionInput().fill(email);
        await basePage.getSubscribeButton().click();

        await expect(basePage.getSuccessAlert()).toBeVisible({ timeout: 15000 });

    });

    test("Test Case 11: Verify Subscription to Emails in Cart Page", async ({ page }) => {
        await page.goto("https://automationexercise.com/");
        const basePage = new HomePage(page);
        await basePage.findNavbarLocator("Cart").click();
        await expect(page).toHaveURL("https://automationexercise.com/view_cart")
        
        const email = faker.internet.email();

        await basePage.getSubscriptionInput().fill(email);
        await basePage.getSubscribeButton().click();

        await expect(basePage.getSuccessAlert()).toBeVisible({ timeout: 15000 });

    });

});