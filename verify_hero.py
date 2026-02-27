from playwright.sync_api import sync_playwright
import time

def verify_hero_optimization():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()

        # Navigate to home page
        print("Navigating to home page...")
        page.goto("http://localhost:3000", wait_until="domcontentloaded")

        # Wait for hero section
        hero = page.locator("section").first

        print("Waiting for initial frame load...")
        # Give it a moment for the first frame to render
        time.sleep(2)

        # Take screenshot of initial state (should show first frame)
        page.screenshot(path="verification/hero-initial.png")
        print("Initial state screenshot captured.")

        # Scroll down to trigger scroll-linked animation
        print("Scrolling down...")
        page.evaluate("window.scrollTo(0, 500)")
        time.sleep(1)
        page.screenshot(path="verification/hero-scrolled.png")

        print("Verification complete.")
        browser.close()

if __name__ == "__main__":
    verify_hero_optimization()
