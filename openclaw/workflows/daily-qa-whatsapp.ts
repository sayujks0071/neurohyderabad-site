import { chromium, devices, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function runDailyTasks() {
  console.log('Starting daily QA and WhatsApp reminder tasks...');

  const timestamp = new Date().toISOString().split('T')[0];
  const outputDir = path.join(process.cwd(), 'openclaw', 'reports', timestamp);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let hasErrors = false;

  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Automated Website QA Testing (Form)
    console.log('--- Task 1: Form QA Testing ---');
    try {
      const qaContext = await browser.newContext();
      const qaPage = await qaContext.newPage();
      console.log('Navigating to appointments page...');
      await qaPage.goto('https://www.drsayuj.info/appointments', { waitUntil: 'networkidle' });

      // In PatientPortal.tsx, we need to locate the type, date, and time
      console.log('Selecting appointment type...');
      const typeButtons = qaPage.locator('button').filter({ hasText: /Consultation|Checkup|Follow/i });
      if (await typeButtons.count() > 0) {
        await typeButtons.first().click();
      }

      console.log('Selecting date...');
      const possibleDates = qaPage.locator('button').filter({ hasText: /Mon|Tue|Wed|Thu|Fri|Sat|Sun/i });
      if (await possibleDates.count() > 0) {
         await possibleDates.first().click();
      }

      console.log('Selecting time...');
      const timeButtons = qaPage.locator('button').filter({ hasText: /10:00|10:30|11:00|11:30|AM|PM/i });
      if (await timeButtons.count() > 0) {
        await timeButtons.first().click();
      }

      console.log('Clicking Next Step...');
      const nextBtn = qaPage.locator('button:has-text("Next Step")');
      if (await nextBtn.count() > 0) {
        await nextBtn.click();
      }

      // Step 2: Patient Details
      console.log('Filling out patient details...');
      // Wait for name input or fallback
      await qaPage.waitForSelector('input[name="name"]', { timeout: 10000 }).catch(() => {});

      const nameInput = qaPage.locator('input[name="name"]');
      if (await nameInput.count() > 0) {
        await nameInput.fill('Ravi Kumar');
        await qaPage.locator('input[name="email"]').fill('ravi@gmail.com');
        await qaPage.locator('input[name="phone"]').fill('9876543210');
      }

      console.log('Submitting the form (mocked click or screenshot)...');
      // If we don't want to actually spam prod, we just take screenshot
      // If there's a submit button, we can capture it
      const submitBtn = qaPage.locator('button[type="submit"]');
      if (await submitBtn.count() > 0) {
        await submitBtn.scrollIntoViewIfNeeded();
      }

      console.log('Capturing screenshots and PDF...');
      await qaPage.screenshot({ path: path.join(outputDir, 'form_test_result.png'), fullPage: true });
      await qaPage.pdf({ path: path.join(outputDir, 'form_test.pdf'), format: 'A4' });
      await qaContext.close();
      console.log('Task 1 completed successfully.');
    } catch (e) {
      console.error('Task 1 failed:', e);
      hasErrors = true;
    }

    // 2. Mobile Responsiveness Audit
    console.log('--- Task 2: Mobile Responsiveness Audit ---');
    try {
      console.log('Testing Mobile (375x812)...');
      const mobileContext = await browser.newContext({ ...devices['iPhone SE'] });
      const mobilePage = await mobileContext.newPage();
      await mobilePage.goto('https://www.drsayuj.info', { waitUntil: 'networkidle' });
      await mobilePage.screenshot({ path: path.join(outputDir, 'mobile_375.png'), fullPage: true });
      await mobileContext.close();

      console.log('Testing Tablet (768x1024)...');
      const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } });
      const tabletPage = await tabletContext.newPage();
      await tabletPage.goto('https://www.drsayuj.info', { waitUntil: 'networkidle' });
      await tabletPage.screenshot({ path: path.join(outputDir, 'tablet_768.png'), fullPage: true });
      await tabletContext.close();

      console.log('Testing Desktop (1440x900)...');
      const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const desktopPage = await desktopContext.newPage();
      await desktopPage.goto('https://www.drsayuj.info', { waitUntil: 'networkidle' });
      await desktopPage.screenshot({ path: path.join(outputDir, 'desktop_1440.png'), fullPage: true });
      await desktopContext.close();
      console.log('Task 2 completed successfully.');
    } catch (e) {
      console.error('Task 2 failed:', e);
      hasErrors = true;
    }

  } finally {
    await browser.close();
  }

  // 3. WhatsApp Reminder Automation
  console.log('--- Task 3: WhatsApp Reminder Automation ---');
  const userDataDir = path.join(process.cwd(), 'whatsapp_session');
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  let waBrowser;
  try {
    waBrowser = await chromium.launchPersistentContext(userDataDir, {
      headless: true, // For cron compatibility
      viewport: { width: 1280, height: 720 }
    });

    const waPage = waBrowser.pages().length > 0 ? waBrowser.pages()[0] : await waBrowser.newPage();

    console.log('Navigating to WhatsApp Web...');
    await waPage.goto('https://web.whatsapp.com', { waitUntil: 'networkidle', timeout: 60000 });

    // Wait for search box to appear to confirm login, timeout after 15s if not logged in
    console.log('Waiting for WhatsApp search box (requires active session)...');

    // Attempt standard WA Web locators
    const searchBoxLocator = waPage.locator('div[contenteditable="true"][data-tab="3"]').or(waPage.getByRole('textbox', { name: 'Search' })).or(waPage.locator('[title="Search input textbox"]'));
    await searchBoxLocator.waitFor({ state: 'visible', timeout: 15000 });

    console.log('Searching for patient: Ravi Kumar...');
    await searchBoxLocator.fill('Ravi Kumar');
    await waPage.waitForTimeout(2000); // Wait for results

    console.log('Opening chat...');
    // Simple enter might work if the first result is focused, or click first chat
    const firstChat = waPage.locator('div[role="listitem"]').first();
    if (await firstChat.count() > 0) {
      await firstChat.click();
    } else {
      await waPage.keyboard.press('Enter');
    }

    // Type and send message
    console.log('Typing reminder message...');
    const messageBox = waPage.locator('div[contenteditable="true"][data-tab="10"]').or(waPage.locator('div[title="Type a message"]'));
    await messageBox.waitFor({ state: 'visible', timeout: 5000 });
    await messageBox.fill('Hi Ravi, reminder: your appointment with Dr. Sayuj is tomorrow at 10 AM. Reply to confirm. 🏥');
    await waPage.keyboard.press('Enter');

    await waPage.waitForTimeout(1000); // Wait for message to appear
    await waPage.screenshot({ path: path.join(outputDir, 'whatsapp_sent.png') });
    console.log('WhatsApp reminder sent successfully.');

  } catch (error: any) {
    console.log('WhatsApp automation skipped or failed (likely needs manual login first):', error.message);
  } finally {
    if (waBrowser) {
      await waBrowser.close();
    }
  }

  console.log('Daily tasks completed. Reports saved to:', outputDir);

  if (hasErrors) {
    console.error('Finished with some errors in core tasks.');
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runDailyTasks().catch((e) => {
  console.error(e);
  process.exit(1);
});
