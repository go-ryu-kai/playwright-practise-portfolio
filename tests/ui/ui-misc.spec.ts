import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ContactPage } from '../../pages/ContactPage';


test("Test 1: Contact Us and Form Submit", async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    
    const basePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    const contactForm = basePage.findContactFormLocator();
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

    const testCases = basePage.findTestCasesLocator();
    await testCases.click();

    await expect(page).toHaveURL("https://automationexercise.com/test_cases");
    await expect(page.locator('b')).toBeVisible();
    
});