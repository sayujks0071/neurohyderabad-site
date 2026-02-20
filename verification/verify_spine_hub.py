from playwright.sync_api import sync_playwright
import time

def verify_spine_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the page
        print("Navigating to Spine Surgery Hub...")
        page.goto("http://localhost:3000/services/spine-surgery-hyderabad")

        # Wait for content to load
        page.wait_for_load_state("networkidle")

        # Verify TrustProof
        print("Checking for TrustProof...")
        # Look for the story title
        page.wait_for_selector('text="Walking Pain-Free After TLIF"', timeout=10000)
        print("TrustProof story found.")

        # Verify Meet Dr Sayuj
        print("Checking for Meet Dr Sayuj...")
        page.wait_for_selector('text="Meet Dr. Sayuj Krishnan"', timeout=5000)
        print("Meet Dr Sayuj section found.")

        # Verify Cost Section
        print("Checking for Cost Transparency...")
        page.wait_for_selector('text="Estimated Cost of Treatment"', timeout=5000)
        print("Cost Transparency section found.")

        # Verify Insurance (inside Cost Section)
        print("Checking for Insurance info...")
        page.wait_for_selector('text="Insurance & Financial Support"', timeout=5000)
        print("Insurance info found.")

        # Take full page screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/spine_hub_verified.png", full_page=True)

        browser.close()
        print("Verification complete.")

if __name__ == "__main__":
    verify_spine_page()
