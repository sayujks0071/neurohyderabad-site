import { test, expect } from '@playwright/test';

test.describe('Treatments Section', () => {
  test('verify comprehensive treatments section', async ({ page }) => {
    await page.goto('http://localhost:3000/best-neurosurgeon-in-hyderabad');
    const heading = page.locator('h2:has-text("Comprehensive Neurosurgical Treatments")');
    await expect(heading).toBeVisible();
    await heading.scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
  });
});
