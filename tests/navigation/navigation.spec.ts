import { test, expect } from '../../src/fixtures/baseFixture';
import navigationData from '../../src/data/navigation.json';

test.describe('Navigation & Layout Verification', () => {

    for (const item of navigationData.marketing.items) {
        test(`Verify navigation: ${item.label} resolves to correct destination`, async ({ page, nav }) => {
            await nav.goTo(item.label);

            // Assert: Validate URL destination
            await expect(page).toHaveURL(new RegExp(item.expectedUrlPattern));

            const errorHeading = page.getByRole('heading', { name: /Page not found/i });
            await expect(errorHeading).not.toBeVisible();
        });
    }
});