import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/test-component');

  // Verify chat loads
  await expect(page.locator('text=Dr. Sayuj\'s AI Assistant')).toBeVisible();
});
