import { expect, Locator, Page } from '@playwright/test';
import { TradingPair } from '../models/TradingPair';
import { BasePage } from './BasePage';


export class TradingSection extends BasePage {

    readonly page: Page;
    readonly sectionHeading: Locator;
    readonly topGainersTitle: Locator;
    readonly trendingTitle: Locator;
    readonly topLosersTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.sectionHeading = this.page.getByRole('heading', { name: 'Catch your next trade' });
        this.topGainersTitle = this.page.getByRole('heading', { name: 'Top Gainers' });
        this.trendingTitle = this.page.getByRole('heading', { name: 'Trending Now' });
        this.topLosersTitle = this.page.getByRole('heading', { name: 'Top Losers' });
    }

    async scrollIntoView() {
        await this.sectionHeading.scrollIntoViewIfNeeded();
        await expect(this.sectionHeading).toBeVisible();
    }

    async verifySectionLoaded() {
        await expect(this.sectionHeading).toBeVisible();
    }

    async verifyCategories() {
        await expect(this.topGainersTitle).toBeVisible();
        await expect(this.trendingTitle).toBeVisible();
        await expect(this.topLosersTitle).toBeVisible();
    }

    async getTopGainers(): Promise<TradingPair[]> {
        return await this.getTradingPairs(this.topGainersTitle);
    }

    async getTrendingNow(): Promise<TradingPair[]> {
        return await this.getTradingPairs(this.trendingTitle);
    }

    async getTopLosers(): Promise<TradingPair[]> {
        return await this.getTradingPairs(this.topLosersTitle);
    }

    private async getTradingPairs(heading: Locator): Promise<TradingPair[]> {

        /**
         * Card container:
         *
         * <div class="flex basis-full flex-col bg-card">
         *
         */

        const card = heading.locator('xpath=ancestor::div[contains(@class,"bg-card")]').first();

        /**
         * Rows:
         *
         * <div class="flex items-center justify-between">
         *
         */

        const rows = card.locator('div.flex.items-center.justify-between');
        const count = await rows.count();
        const tradingPairs: TradingPair[] = [];

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const name = await row
                .locator('img')
                .getAttribute('alt');
            const price = await row
                .locator('div.inline-flex')
                .first()
                .innerText();
            const percentage = await row
                .locator('span.text-success, span.text-fail')
                .innerText();
            tradingPairs.push({
                name: name ?? '',
                price,
                percentage
            });
        }
        return tradingPairs;
    }
}