import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { HomePage } from '../../pages/HomePage';


test("Test Case 12: Add Products In Cart", async ({page}) => {
    const productPage = new ProductPage(page);
    const basePage = new HomePage(page);
    await page.goto("https://automationexercise.com/");

    await basePage.findNavbarLocator("Products").click();

    await productPage.getHoverElementAndAddToCart();
    await expect(page.locator(".modal-confirm")).toBeVisible();
    await expect(page.locator(".modal-confirm")).toContainText("Your product has been added to cart.");

    await page.getByRole("link", {name: "View Cart"}).click();
    await  expect(page).toHaveURL("https://automationexercise.com/view_cart");



});