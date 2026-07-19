import { Page, Locator } from '@playwright/test';
import { TradingSection } from './TradingSection';

export class HomePage {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly tradingSection: TradingSection;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.getByRole('heading', { name: 'Crypto for everyone' });
        this.tradingSection = new TradingSection(this.page);
    }

    async getPageTitle(): Promise<string> {
        return await this.pageTitle.innerText();
    }

    async navigateToTradingSection() {
        await this.tradingSection.scrollIntoView();
    }
}