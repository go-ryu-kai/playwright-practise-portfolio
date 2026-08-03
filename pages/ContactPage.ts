import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
    private header: Locator;
    private nameInput: Locator;
    private emailInput: Locator;
    private subjectInput: Locator;
    private messageInput: Locator;
    private fileUpload: Locator;
    private submitContact: Locator;
    private successAlert: Locator;

    constructor(page: Page) {
        super(page);

        this.header = page.getByRole('heading', { name: "CONTACT US" });
        this.nameInput = page.getByPlaceholder("Name");
        this.emailInput = page.getByRole("textbox", { name: "Email", exact: true });
        this.subjectInput = page.getByPlaceholder("Subject");
        this.messageInput = page.getByPlaceholder("Your Message Here");
        this.fileUpload = page.locator('input[type="file"]');
        this.submitContact = page.getByRole("button", { name: "Submit" });
        this.successAlert = page.locator('.alert-success');
    }

    getHeader(): Locator {
        return this.header;
    }

    getSuccessAlert(): Locator {
        return this.successAlert;
    }

    async fillAndSubmitForm(name: string, email: string, subject: string, content: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(content);
        await this.fileUpload.setInputFiles('fixtures/sample.txt');

        // Handle the confirm dialog right before submitting
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await this.submitContact.click();
    }
}