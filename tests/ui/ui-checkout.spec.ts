import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { HomePage } from '../../pages/HomePage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';
import { SignUpPage } from '../../pages/SignUpPage';
import { faker } from '@faker-js/faker';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { PaymentPage } from '../../pages/PaymentPage';

test.beforeEach(async ({ page }) => {
    // Playwright Best Practice: Route blocking applied before navigation
    await page.route('**/*googlesyndication.com/**', route => route.abort());
    await page.route('**/*doubleclick.net/**', route => route.abort());
});


test("Test Case 12: Add Products In Cart", async ({page}) => {
    const productPage = new ProductPage(page);
    const basePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await page.goto("https://automationexercise.com/");

    await basePage.findNavbarLocator("Products").click();

    await productPage.getHoverElementAndAddToCart();
    await expect(page.locator(".modal-confirm")).toBeVisible();
    await expect(page.locator(".modal-confirm")).toContainText("Your product has been added to cart.");

    await page.getByRole("link", {name: "View Cart"}).click();
    await  expect(page).toHaveURL("https://automationexercise.com/view_cart");

    //The blue top was added, so we must verify that it has the price of Rs. 500 and quantity of 1
    //The checkout page is a table with id=cart_info_table, and each item is a row with id="product-n" where n is a number

    //Note:
    //When querying HTML tables, scope your row locators directly to tbody tr
    //(or specific row IDs like #product-1)
    //so your scripts skip table headers (thead tr).
    const firstRow = cartPage.getFirstCartItemRow();
    await expect(firstRow).toBeVisible();
    await expect(firstRow.locator(".cart_description")).toBeVisible();
    await expect(firstRow.locator(".cart_price")).toBeVisible();
    await expect(firstRow.locator(".cart_quantity")).toBeVisible();
    await expect(firstRow.locator(".cart_description")).toContainText("Blue Top");
    await expect(firstRow.locator(".cart_price")).toContainText("Rs. 500");
    await expect(firstRow.locator(".cart_quantity")).toContainText("1");


});


test("Test Case 13: Verify Product Quantity in Cart", async ({page}) => {
    const productPage = new ProductPage(page);
    const basePage = new HomePage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    await page.goto("https://automationexercise.com/");

    await basePage.findNavbarLocator("Products").click();

    await productPage.getFirstDetailsAndClick();
    await expect(page).toHaveURL(/\/product_details\/\d+/);
    await expect(productDetailPage.getProductInformationSection()).toBeVisible();
   
    
    const quantityInput = productDetailPage.getQuantityInput();
    await quantityInput.fill("4");

    await productDetailPage.getAddToCartButton().click();
    await expect(page.locator(".modal-confirm")).toBeVisible();
    await expect(page.locator(".modal-confirm")).toContainText("Your product has been added to cart.");

    await page.getByRole("link", {name: "View Cart"}).click();
    await  expect(page).toHaveURL("https://automationexercise.com/view_cart");  

    await expect(cartPage.getFirstCartItemDescription()).toContainText("Blue Top");
    await expect(cartPage.getFirstCartItemQuantity()).toContainText("4");

});

test("Test Case 14: Place Order: Register During Checkout", async ({page}) => {
    const productPage = new ProductPage(page);
    const basePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);
    const cartPage = new CartPage(page);   
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    const cardNumber = faker.finance.creditCardNumber({ issuer: 'visa' }); 
    const cardExpiry = faker.date.future().toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' });
    const cardCVV = faker.finance.creditCardCVV();


    await page.goto("https://automationexercise.com/");

    await basePage.findNavbarLocator("Products").click();
    await productPage.getHoverElementAndAddToCart();
    await page.getByRole("link", {name: "View Cart"}).click();
    await expect(page).toHaveURL("https://automationexercise.com/view_cart");

    //Now on cart page, click on "Proceed To Checkout"
    const checkoutButton = cartPage.getCheckoutButton();
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();
    await page.getByRole("link", {name: "Register / Login"}).click();
    await expect(page).toHaveURL("https://automationexercise.com/login"); 
   
    // Fill all details in Signup and create account
    const name = "Test Case 14";
    const email  = faker.internet.exampleEmail();
    await loginPage.signup(name, email);
    await expect(page).toHaveURL("https://automationexercise.com/signup");
    
    //we don't need to fill in the email as it has already been filled in and greyed out from the previous screen
    await signUpPage.fillSignupForm(name, "password123", "1", "January", "1990", "Test", "User", "123 Test St", "United States", "California", "Los Angeles", "90001", "1234567890");
    await expect(page).toHaveURL("https://automationexercise.com/account_created");
    await expect(page.locator(".title")).toContainText("Account Created!");
    await page.getByRole("link", {name: "Continue"}).click();
    await expect(page).toHaveURL("https://automationexercise.com/");

    //Click back on the View Cart button and verify that our Blue Top is still in the cart with a quantity of 1
    await basePage.findNavbarLocator("Cart").click();
    await expect(page).toHaveURL("https://automationexercise.com/view_cart");
    await expect(cartPage.getFirstCartItemDescription()).toContainText("Blue Top");
    await expect(cartPage.getFirstCartItemQuantity()).toContainText("1");
    await cartPage.getCheckoutButton().click();
    await expect(page).toHaveURL("https://automationexercise.com/checkout");

    expect(checkoutPage.getDeliveryAddressLocator()).toContainText("Test User");
    expect(checkoutPage.getBillingAddressLocator()).toContainText("Test User");
    expect(checkoutPage.getDeliveryAddressLocator()).toContainText("123 Test St");
    expect(checkoutPage.getOrderSummaryLocator()).toContainText("Blue Top");
    await checkoutPage.getOrderCommentInput().fill("This is a test order comment.");
    await checkoutPage.getPlaceOrderButton().click();

    await expect(page).toHaveURL("https://automationexercise.com/payment");
    await paymentPage.fillPaymentForm("Test User", cardNumber, cardCVV, cardExpiry.split("/")[0], cardExpiry.split("/")[1]);
    await paymentPage.getPayAndConfirmOrderButton().click();
    await expect(page).toHaveURL("https://automationexercise.com/payment_done/500");
    await expect(page.locator(".title")).toContainText("Order Placed!");
    await page.getByText("Continue").click();
    await expect(page).toHaveURL("https://automationexercise.com/");
    await basePage.findNavbarLocator("Cart").click();
    await expect(page.locator(".text-center")).toContainText("Cart is empty!"); 

});


