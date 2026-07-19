import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {

    private readonly menuButton = this.page.getByRole('button', { name: 'Open menu' });

    async goTo(tab: string) {
        // If the menu button is visible (mobile view), we MUST click it first
        if (await this.menuButton.isVisible()) {
            await expect(this.menuButton).toBeEnabled();
            await this.menuButton.click();
            await this.log('Hamburger menu opened');
        }
        await this.log(`Navigating to: ${tab}`);
        await this.page.getByRole('link', { name: tab, exact: true }).click();
    }
}