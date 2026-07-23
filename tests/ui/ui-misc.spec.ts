import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ContactPage } from '../../pages/ContactPage';

test.beforeEach(async ({ page }) => {
    // Playwright Best Practice: Route blocking applied before navigation
    await page.route('**/*googlesyndication.com/**', route => route.abort());
    await page.route('**/*doubleclick.net/**', route => route.abort());
});


test("Test 1: Contact Us and Form Submit", async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    
    const basePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    const contactForm = basePage.findNavbarLocator("Contact Us");
    await contactForm.click();

    await expect(page).toHaveURL("https://automationexercise.com/contact_us");
    await expect(contactPage.getHeader()).toBeVisible();

    page.once('dialog', dialog => dialog.accept());

    await contactPage.fillAndSubmitForm("Contact Person", "abc@xyz.com", "My Enquiry", "This Is A Test Message");
    
    const successAlert = page.locator('.status.alert.alert-success');
    await expect(successAlert).toBeVisible({ timeout: 15000 });
    await expect(successAlert).toContainText("Success! Your details have been submitted successfully.");
});

test("Test 2: Test Cases", async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    const basePage = new HomePage(page);

    const testCases = basePage.findNavbarLocator("Test Cases");
    await testCases.click();

    await expect(page).toHaveURL("https://automationexercise.com/test_cases");
    await expect(page.locator('b')).toBeVisible();
    
});