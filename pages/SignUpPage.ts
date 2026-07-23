import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

//https://automationexercise.com/signup

export class SignUpPage extends BasePage {
    private signupName: Locator;
    //private signupEmail: Locator;
    private signupButton: Locator;
    private titleMrRadio: Locator;
    private passwordInput: Locator;
    private dobDayInput: Locator;
    private dobMonthInput: Locator;
    private dobYearInput: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private addressInput: Locator;
    private countrySelect: Locator;
    private stateInput: Locator;
    private cityInput: Locator;
    private zipcodeInput: Locator;
    private mobileNumberInput: Locator;

    constructor(page: Page) {
        super(page);
        this.signupName = page.locator("#name");
        //this.signupEmail = page.locator("#email");
        //we don't need the email as it has already been filled in and greyed out from the previous screen
        this.signupButton = page.getByRole("button", {name: "Create Account"});
        this.passwordInput = page.locator("#password");
        this.dobDayInput = page.locator("#days");
        this.dobMonthInput = page.locator("#months");
        this.dobYearInput = page.locator("#years");
        this.firstNameInput = page.locator("#first_name");
        this.lastNameInput = page.locator("#last_name");
        this.addressInput = page.locator("#address1");
        this.countrySelect = page.locator("#country");
        this.stateInput = page.locator("#state");
        this.cityInput = page.locator("#city");
        this.zipcodeInput = page.locator("#zipcode");
        this.mobileNumberInput = page.locator("#mobile_number");
        this.titleMrRadio = page.locator("#id_gender1");

    }

    async fillSignupForm(name: string, password: string, day: string, month: string, year: string, firstName: string, lastName: string, address: string, country: string, state: string, city: string, zipcode: string, mobileNumber: string) {
        await this.titleMrRadio.check();
        await this.signupName.fill(name);
        //await this.signupEmail.fill(email);
        await this.passwordInput.fill(password);
        await this.dobDayInput.selectOption({ index: parseInt(day) - 1 }); // Select the day by index (0-based)
        await this.dobMonthInput.selectOption({ label: month }); // Select the month by label
        await this.dobYearInput.selectOption({ label: year }); // Select the year by label
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.addressInput.fill(address);
        await this.countrySelect.selectOption({ label: country });
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipcodeInput.fill(zipcode);
        await this.mobileNumberInput.fill(mobileNumber);
        await this.titleMrRadio.check();
        await this.signupButton.click();
    }
}