import { test, expect } from '../../src/fixtures/baseFixture';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Trading Section Validation', () => {

    let homePage: HomePage;

    test.beforeEach(async ({ page, nav }) => {
        homePage = new HomePage(page);
        await homePage.navigateToTradingSection();
    });

    test('Validate Top Gainers', async () => {
        const pairs = await homePage.tradingSection.getTopGainers();
        expect(pairs.length).toBeGreaterThan(0);
        for (const pair of pairs) {
            expect(pair.name).not.toBe('');
            expect(pair.price).toMatch(/\$/);
            expect(pair.percentage).toMatch(/%/);
        }
        console.log('Top Gainers:', pairs);
    });

    test('Validate Trending Now', async () => {
        const pairs = await homePage.tradingSection.getTrendingNow();
        expect(pairs.length).toBeGreaterThan(0);
        for (const pair of pairs) {
            expect(pair.name).not.toBe('');
            expect(pair.price).toMatch(/\$/);
            expect(pair.percentage).toMatch(/%/);
        }
        console.log('Trending:', pairs);
    });
    
    test('Validate Top Losers', async () => {
        const pairs = await homePage.tradingSection.getTopLosers();
        expect(pairs.length).toBeGreaterThan(0);
        for (const pair of pairs) {
            expect(pair.name).not.toBe('');
            expect(pair.price).toMatch(/\$/);
            expect(pair.percentage).toMatch(/%/);
        }
        console.log('Top Losers:', pairs);
    });
});