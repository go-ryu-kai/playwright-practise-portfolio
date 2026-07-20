import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private navbar: Locator

    constructor(page: Page) {
        super(page);
        this.navbar = page.locator(".shop-menu");
    }

    findNavbarLocator(reference: string): Locator {
        return this.navbar.locator('li').filter({ hasText: reference });
    }

}