import { test as base } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';

export const test = base.extend<{ nav: NavigationPage }>({
    nav: async ({ page }, use) => {
        await page.goto('/'); 
        
        // Target the logo using the accessible 'img' role and the alt text provided
        const logo = page.getByRole('link', { name: 'Logo' });
        
        // Wait for it to be actionable and click it to navigate from Landing to Home
        await logo.click();
        await page.waitForLoadState('networkidle');
        
        await use(new NavigationPage(page));
    },
});

export { expect } from '@playwright/test';