import { chromium, devices, Browser, BrowserContext, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const dateStr = new Date().toISOString().split('T')[0];
  const reportDir = path.join('health-reports', 'daily-automation', dateStr);

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  console.log("Running Daily Playwright Automation...");
  let hasFailures = false;

  // 1. Automated Website QA Testing (Contact/Appointment Form)
  console.log("Running QA tests...");
  let browser: Browser | null = null;
  let context: BrowserContext | null = null;
  let page: Page | null = null;

  try {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto('https://www.drsayuj.info', { timeout: 30000 });

    // Fill form (adjusting selectors based on standard inputs or labels since exact 'e12' is pseudo-code)
    // We want this to strictly fail if the inputs are not found so we are properly alerted of broken forms.
    const nameInput = page.getByLabel(/Patient Full Name|Name/i).first();
    await nameInput.waitFor({ state: 'visible', timeout: 10000 });
    await nameInput.fill("Ravi Kumar");

    const emailInput = page.getByLabel(/Email/i).first();
    await emailInput.fill("ravi@gmail.com");

    const phoneInput = page.getByLabel(/Phone|Contact/i).first();
    await phoneInput.fill("9876543210");

    // We still try-catch this specific optional combo box, because many clinics don't have a simple generic combo box.
    // The core inputs (Name, Email, Phone) are enough to fail the form test if the page structure fundamentally changes.
    try {
      await page.getByRole('combobox').selectOption({ label: "Consultation" });
    } catch(e) {
      console.log("No simple combobox for Consultation found, continuing with form test.");
    }

    // Omit final submission step to prevent spamming live clinic system
    // await page.getByRole('button', { name: /Submit|Book/i }).click();

    await page.screenshot({ path: path.join(reportDir, 'form_test_result.png') });
    await page.pdf({ path: path.join(reportDir, 'form_test.pdf') });
  } catch (e) {
    console.error("QA tests encountered a critical failure:", e);
    hasFailures = true;
  } finally {
    if (browser) await browser.close();
  }

  // 2. Mobile Responsiveness Audit (Screenshots)
  console.log("Running Mobile Responsiveness Audit...");
  try {
    browser = await chromium.launch({ headless: true });

    // iPhone SE
    context = await browser.newContext(devices['iPhone SE']);
    page = await context.newPage();
    await page.goto('https://www.drsayuj.info');
    await page.screenshot({ path: path.join(reportDir, 'mobile_375.png') });

    // Tablet
    context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    page = await context.newPage();
    await page.goto('https://www.drsayuj.info');
    await page.screenshot({ path: path.join(reportDir, 'tablet_768.png') });

    // Desktop
    context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    page = await context.newPage();
    await page.goto('https://www.drsayuj.info');
    await page.screenshot({ path: path.join(reportDir, 'desktop_1440.png') });
  } catch (e) {
    console.error("Mobile Responsiveness Audit encountered a failure:", e);
    hasFailures = true;
  } finally {
    if (browser) await browser.close();
  }

  // 3. WhatsApp Web Appointment Reminder Automation
  console.log("Running WhatsApp reminders...");
  if (fs.existsSync('whatsapp_session.json')) {
    try {
      // using headless: false as whatsapp often blocks or complicates headless sessions
      // xvfb-run supports this fine since it provides a virtual display.
      browser = await chromium.launch({ headless: false });
      // Explicitly loading authenticated session state to bypass QR code login
      context = await browser.newContext({ storageState: 'whatsapp_session.json' });
      page = await context.newPage();

      await page.goto('https://web.whatsapp.com');

      // Wait for the chat list to load
      await page.waitForSelector('div[title="Search input textbox"]', { timeout: 60000 });

      // Search for patient
      await page.locator('div[title="Search input textbox"]').fill('Ravi Kumar');
      await page.waitForTimeout(2000);

      // Click on the chat (assuming first result)
      await page.locator('span[title="Ravi Kumar"]').click();

      // Type message
      await page.locator('div[title="Type a message"]').fill("Hi Ravi, reminder: your appointment with Dr. Sayuj is tomorrow at 10 AM. Reply to confirm. 🏥");
      await page.keyboard.press('Enter');

      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(reportDir, 'whatsapp_sent.png') });
    } catch(e) {
      console.error("WhatsApp automation encountered an error or elements not found:", e);
      hasFailures = true;
    } finally {
      if (browser) await browser.close();
    }
  } else {
    console.log("whatsapp_session.json not found, skipping WhatsApp reminders.");
  }

  console.log("Daily Playwright Automation finished.");

  if (hasFailures) {
    console.error("Some tasks failed during automation. Exiting with code 1.");
    process.exit(1);
  }
})();
