// pages/CompanyPage.ts
import { Page, Locator, expect } from '@playwright/test';
import whyMultibankData from '../data/why-multibank.json';

export class CompanyPage {
    readonly page: Page;
    readonly mainHeading: Locator;
    readonly introHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainHeading = this.page.getByRole('heading', { name: whyMultibankData.mainHeading, level: 1 });
        this.introHeading = this.page.getByRole('heading', { name: new RegExp(whyMultibankData.introHeadingPattern) })
    }

    async verifyPageComponents() {
        await expect(this.mainHeading).toBeVisible();
        await expect(this.introHeading).toBeVisible();
    }

    sectionHeading(name: string): Locator {
        return this.page.getByRole('heading', { name, exact: true });
    }

    async getSectionTexts(): Promise<Record<string, string>> {
        const sections: Record<string, string> = {};

        for (const section of whyMultibankData.sections) {
            const heading = this.sectionHeading(section.heading);
            const isVisible = await heading.isVisible().catch(() => false);
            if (!isVisible) continue;

            const container = heading.locator('xpath=following::*[self::p or self::div][1]');
            sections[section.heading] = (await container.innerText().catch(() => '')).trim();
        }

        return sections;
    }
}