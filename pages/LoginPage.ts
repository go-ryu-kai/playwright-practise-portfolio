import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private loginEmailInput: Locator;
    private loginPasswordInput: Locator; 
    private loginButton: Locator;

    constructor(page: Page) {
        super(page);

        this.loginEmailInput = page.locator("form").filter({hasText: "Login"}).getByPlaceholder("Email Address");
        this.loginPasswordInput = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", {name: "Login"});
    }

    async login(email: string, password: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }

}