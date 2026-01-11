
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the Sciatica page
    # Note: Using localhost:3000 as typical for Next.js
    page.goto("http://localhost:3000/conditions/sciatica-treatment-hyderabad")

    # 1. Verify Outcome Metrics Section
    # Check for the heading
    expect(page.get_by_text("Outcome metrics for Endoscopic Discectomy")).to_be_visible()

    # Check for a specific metric value to ensure it's rendering
    expect(page.get_by_text("98%")).to_be_visible()
    expect(page.get_by_text("2.1 days")).to_be_visible()

    # 2. Verify Recovery Timeline Section
    # Check for the custom title
    expect(page.get_by_text("Recovery Roadmap for Sciatica Surgery")).to_be_visible()

    # Check for a milestone
    expect(page.get_by_text("Mobilise within 3 hours of surgery")).to_be_visible()

    # Take a screenshot of the Outcome Metrics
    metrics_locator = page.get_by_text("Outcome metrics for Endoscopic Discectomy").locator("..")
    metrics_locator.screenshot(path="verification/outcome_metrics.png")

    # Take a screenshot of the Recovery Timeline
    timeline_locator = page.get_by_text("Recovery Roadmap for Sciatica Surgery").locator("..").locator("..")
    timeline_locator.screenshot(path="verification/recovery_timeline.png")

    # Take a full page screenshot for context
    page.screenshot(path="verification/sciatica_page_full.png", full_page=True)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
