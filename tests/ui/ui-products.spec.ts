import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

test.beforeEach(async ({page}) => {
    await page.goto("https://automationexercise.com/products");
});

test('Test 1: Validated Product Search', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.searchProduct("Blue Top");

    const searchHeaderText = await productPage.getSearchHeaderText();
    expect(searchHeaderText.toUpperCase()).toContain("SEARCHED PRODUCTS")

    const searchResultsCount = await productPage.getProductResultsCount();
    expect(searchResultsCount).toBeGreaterThan(0);

    const firstSearchResult = await productPage.getFirstSearchResult();
    await expect(firstSearchResult).toContainText("Blue Top");
});

test('Test 3: Cart Addition via Hover Overlay', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.searchProduct("Blue Top");

    const searchResultsCount = await productPage.getProductResultsCount();
    expect(searchResultsCount).toBeGreaterThan(0);

    await productPage.getHoverElementAndAddToCart();

    await expect(page.locator(".modal-confirm")).toBeVisible();
    await expect(page.locator(".modal-confirm")).toContainText("Your product has been added to cart.")
    
});