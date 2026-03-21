import { chromium, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const dateStr = new Date().toISOString().split('T')[0];
  const outputDir = path.join(process.cwd(), 'openclaw', 'reports', dateStr);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let hasErrors = false;

  console.log(`Starting Daily Playwright Automation... Outputs saving to ${outputDir}`);

  // Task 1: QA Testing
  try {
    console.log('--- Task 1: Form QA Testing ---');
    await runFormQaTesting(outputDir);
    console.log('Task 1 completed successfully.');
  } catch (error) {
    console.error('Task 1 failed:', error);
    hasErrors = true;
  }

  // Task 2: Mobile Responsiveness Audit
  try {
    console.log('--- Task 2: Mobile Responsiveness Audit ---');
    await runMobileAudit(outputDir);
    console.log('Task 2 completed successfully.');
  } catch (error) {
    console.error('Task 2 failed:', error);
    hasErrors = true;
  }

  // Task 3: WhatsApp Reminder Automation
  try {
    console.log('--- Task 3: WhatsApp Reminder Automation ---');
    await runWhatsAppReminder(outputDir);
    console.log('Task 3 completed successfully.');
  } catch (error) {
    console.error('Task 3 failed:', error);
    hasErrors = true;
  }

  if (hasErrors) {
    console.error('One or more tasks failed. Exiting with code 1.');
    process.exit(1);
  } else {
    console.log('All tasks completed successfully.');
    process.exit(0);
  }
}

async function runFormQaTesting(outputDir: string) {
  // Use headless: true as PDF generation requires it.
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating to appointments page...');
    await page.goto('https://www.drsayuj.info/appointments', { waitUntil: 'networkidle' });

    // Step 1: Scheduling
    // Wait for the Patient Portal skeleton to be replaced by the dynamic PatientPortal component
    // Select an appointment type.
    console.log('Selecting appointment type...');
    const typeButtons = page.locator('button:has-text("General Consultation"), button:has-text("Consultation"), button:has-text("New Consultation"), text="New Consultation"');
    if (await typeButtons.count() > 0) {
      await typeButtons.first().click();
    } else {
      console.log("Could not find type buttons, trying to locate active elements.");
      // Just click any active button in the scheduling area
      const activeBtns = page.locator('button').filter({ hasText: /Consultation|Checkup|Follow/i });
      if (await activeBtns.count() > 0) {
        await activeBtns.first().click();
      }
    }

    // Select the first date button
    console.log('Selecting date...');
    const dateButtons = page.locator('button[aria-label*="Select date"]');
    if (await dateButtons.count() > 0) {
      await dateButtons.first().click();
    } else {
      const possibleDates = page.locator('button').filter({ hasText: /Mon|Tue|Wed|Thu|Fri|Sat|Sun/i });
      if (await possibleDates.count() > 0) {
         await possibleDates.first().click();
      }
    }

    // Select the first time button
    console.log('Selecting time...');
    const timeButtons = page.locator('button').filter({ hasText: /10:00|10:30|11:00|11:30|AM|PM/i });
    if (await timeButtons.count() > 0) {
      await timeButtons.first().click();
    }

    console.log('Clicking Next Step...');
    await page.click('button:has-text("Next Step")');

    // Step 2: Patient Details
    console.log('Filling out patient details...');
    await page.waitForSelector('input[name="name"]', { timeout: 10000 });

    await page.fill('input[name="name"]', 'Ravi Kumar');
    await page.fill('input[name="age"]', '45');
    await page.selectOption('select[name="gender"]', 'male');
    await page.fill('input[name="phone"]', '9876543210');
    await page.fill('input[name="email"]', 'ravi@gmail.com');
    await page.fill('textarea[name="symptoms"]', 'Severe back pain for the last 2 weeks.');

    // Set pain score to 8
    await page.fill('input[name="painScore"]', '8');

    // Click submit button
    console.log('Submitting the form...');
    // In PatientPortal.tsx: <Button type="submit">Confirm Booking <ChevronRight /></Button>
    const submitBtn = page.locator('button[type="submit"]', { hasText: /Confirm Booking/i });
    await submitBtn.click();

    // Wait for success message
    // In PatientPortal.tsx: h2 "Appointment Request Received"
    console.log('Waiting for success confirmation...');
    await page.waitForSelector('text="Appointment Request Received"', { timeout: 15000 });

    console.log('Capturing screenshots and PDF...');
    await page.screenshot({ path: path.join(outputDir, 'form_test_result.png'), fullPage: true });
    await page.pdf({ path: path.join(outputDir, 'form_test.pdf'), format: 'A4' });

  } finally {
    await browser.close();
  }
}

async function runMobileAudit(outputDir: string) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating to homepage for Mobile Audit...');
    await page.goto('https://www.drsayuj.info', { waitUntil: 'networkidle' });

    // Mobile (iPhone SE: 375x812)
    console.log('Testing Mobile (375x812)...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1000); // Allow layout to adjust
    await page.screenshot({ path: path.join(outputDir, 'mobile_375.png'), fullPage: true });

    // Tablet (768x1024)
    console.log('Testing Tablet (768x1024)...');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outputDir, 'tablet_768.png'), fullPage: true });

    // Desktop (1440x900)
    console.log('Testing Desktop (1440x900)...');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outputDir, 'desktop_1440.png'), fullPage: true });

  } finally {
    await browser.close();
  }
}

async function runWhatsAppReminder(outputDir: string) {
  // Use persistent context for WhatsApp to keep login session.
  // Using headless: false might be needed, but we can try headless: true.
  // For WhatsApp, usually a virtual display is needed if headless: false.
  // The problem mentions "playwright-cli -s=whatsapp open https://web.whatsapp.com --persistent"
  const sessionDir = path.join(process.cwd(), 'whatsapp_session');

  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
  }

  // Use headless: true as xvfb might not be easily configurable in all CI environments natively here.
  // Actually, let's use headless: false if we have xvfb, but in pure playwright script headless: true might work.
  // If we must be headless: true and it fails, it's better than failing entirely because of missing xvfb.
  const context = await chromium.launchPersistentContext(sessionDir, {
    headless: true, // Attempt headless for better CI compatibility
  });

  try {
    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

    console.log('Navigating to WhatsApp Web...');
    await page.goto('https://web.whatsapp.com', { waitUntil: 'networkidle' });

    // Wait for the search box to appear, indicating successful login or session
    // Since this is a mock automation and we might not actually be logged in (no scanned QR),
    // we'll wait with a short timeout. In real-world, this would wait for login.
    console.log('Waiting for WhatsApp search box (requires active session)...');
    try {
      // Data-tab="3" is commonly the search input or we can just look for contenteditable="true"
      const searchBox = page.locator('div[contenteditable="true"][data-tab="3"]');
      await searchBox.waitFor({ state: 'visible', timeout: 30000 }); // 30s timeout to allow QR scan in real life

      console.log('Searching for patient: Ravi Kumar...');
      await searchBox.fill('Ravi Kumar');

      // Wait a moment for search results
      await page.waitForTimeout(2000);

      // Click the first chat result
      console.log('Opening chat...');
      const firstChat = page.locator('div[role="listitem"]').first();
      await firstChat.click();

      // Wait for message input
      const messageBox = page.locator('div[contenteditable="true"][data-tab="10"]');
      await messageBox.waitFor({ state: 'visible' });

      console.log('Typing reminder message...');
      await messageBox.fill("Hi Ravi, reminder: your appointment with Dr. Sayuj is tomorrow at 10 AM. Reply to confirm. 🏥");
      await page.keyboard.press('Enter');

      console.log('Capturing WhatsApp screenshot...');
      await page.waitForTimeout(1000); // Wait for message to appear in chat
      await page.screenshot({ path: path.join(outputDir, 'whatsapp_sent.png') });
    } catch (e) {
      console.log('WhatsApp login/search failed. Taking debug screenshot. Note: requires manual QR scan once.');
      await page.screenshot({ path: path.join(outputDir, 'whatsapp_debug.png') });
      throw new Error("WhatsApp automation failed. Ensure session is logged in.");
    }
  } finally {
    await context.close();
  }
}

main().catch(console.error);
