import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private navbar: Locator

    constructor(page: Page) {
        super(page);

        this.navbar = page.locator(".shop-menu");
       
       
    }
    
    findLoginConfirmationLocator(): Locator {
        return this.navbar.locator('li').filter({ hasText: 'Logged in as' });
    }

    findLogoutConfirmationLocator(): Locator {
        return this.navbar.locator('li').filter({ hasText: 'Logout' });
    }

    findContactFormLocator(): Locator {
        return this.navbar.locator('li').filter({ hasText: 'Contact us' });
    }

    findTestCasesLocator(): Locator {
        return this.navbar.locator('li').filter({ hasText: 'Test Cases' });
    }

}