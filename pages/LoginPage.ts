import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private loginEmailInput: Locator;
    private loginPasswordInput: Locator; 
    private loginButton: Locator;
    private loginForm: Locator;

    private signupForm: Locator;
    private signupNameInput: Locator;
    private signupEmailInput: Locator;
    private signupButton: Locator;

    private navbar: Locator

    constructor(page: Page) {
        super(page);

        this.loginForm = page.locator(".login-form");
        this.loginEmailInput = this.loginForm.getByPlaceholder("Email Address");
        this.loginPasswordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", {name: "Login"});
        this.navbar = page.locator(".shop-menu");
       
        this.signupForm = page.locator(".signup-form");
        this.signupNameInput = page.getByPlaceholder("Name");
        this.signupEmailInput = this.signupForm.getByPlaceholder("Email Address");
        this.signupButton = page.getByRole("button", {name: "Signup"});
    }

    async login(email: string, password: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

    async signup(name: string, email: string) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }

    findLoginConfirmationLocator(): Locator {
        return this.navbar.locator('li').filter({ hasText: 'Logged in as' });
        //updated the above to be more resilient to dev changes!
       
    }

    findLogoutConfirmationLocator(): Locator {
        return this.navbar.locator('li').filter({ hasText: 'Logout' });
       
    }


    async getLoginForm() {
        return this.loginForm;
    }

    getSignupButton(): Locator {
        return this.signupButton;
    }

    getPasswordInput(): Locator {
        return this.loginPasswordInput;
    }

    getErrorMessageLocator(): Locator {
        return this.loginForm.getByText("Your email or password is incorrect!");
    }
}