import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private navbar: Locator
    private emailSubscription: Locator;
    private subscribeButton: Locator;
    private successfulSubscription: Locator;

    constructor(page: Page) {
        super(page);
        this.navbar = page.locator(".shop-menu");
        this.emailSubscription = page.locator("#susbscribe_email");
        this.subscribeButton = page.locator("#subscribe");
        this.successfulSubscription = page.locator(".alert-success");
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

    getSuccessfulSub(): Locator {
        return this.successfulSubscription;
    }

}