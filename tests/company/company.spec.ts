import { test, expect } from '../../src/fixtures/baseFixture';
import { CompanyPage } from '../../src/pages/CompanyPage';
import whyMultibankData from '../../src/data/why-multibank.json';

test.describe('Company Page Verification', () => {

    let companyPage: CompanyPage;

    test.beforeEach(async ({ page, nav }) => {
        nav.goTo('Company');
        companyPage = new CompanyPage(page);
    });

    test('Verify content and layout for company page', async ({ page, nav }) => {
        await expect(companyPage.mainHeading).toBeVisible();
        await companyPage.verifyPageComponents();
        for (const section of whyMultibankData.sections) {
            await expect(companyPage.sectionHeading(section.heading)).toBeVisible();

            if (section.textPattern) {
                await expect(companyPage.page.getByText(new RegExp(section.textPattern, 'i'))).toBeVisible();
            }
        }
    });
});