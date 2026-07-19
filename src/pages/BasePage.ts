import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    constructor(page: Page) { this.page = page; }

    async log(message: string) {
        console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
    }
}