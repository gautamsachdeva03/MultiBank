import { Locator, Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly logo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = this.page.getByRole('link', { name: 'Logo' });
    }

    async clickOnLogo() {
        await this.logo.click();
    }
}