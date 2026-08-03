import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private navbar: Locator
    private emailSubscription: Locator;
    private subscribeButton: Locator;
    private successMessage: Locator;
    private pageTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.navbar = page.locator(".shop-menu");
        this.emailSubscription = page.locator("#susbscribe_email");
        this.subscribeButton = page.locator("#subscribe");
        this.successMessage = page.locator(".alert-success");
        this.pageTitle = page.locator('.title');
    }

    findNavbarLocator(reference: string): Locator {
        return this.navbar.locator('li').filter({ hasText: reference });
    }

    getSubscriptionInput(): Locator {
        return this.emailSubscription;
    }

    getSubscribeButton(): Locator {
        return this.subscribeButton;
    }

    getSuccessAlert(): Locator {
        return this.successMessage;
    }

    getPageTitle(): Locator {
        return this.pageTitle;
    }

}