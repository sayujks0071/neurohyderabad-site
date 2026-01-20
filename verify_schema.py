import json
from playwright.sync_api import sync_playwright

def verify_appointment_schema():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Increase timeout for initial compile
        page = browser.new_page()

        print("Navigating to appointment page...")
        try:
            page.goto("http://localhost:3000/appointments", timeout=60000)
        except Exception as e:
            print(f"Navigation failed: {e}")
            browser.close()
            return

        print("Page loaded. Checking metadata...")

        # Verify Title
        title = page.title()
        print(f"Page Title: {title}")
        if "Best Neurosurgeon Hyderabad" not in title:
            print("❌ Title verification failed! 'Best Neurosurgeon Hyderabad' not found.")
        else:
            print("✅ Title verification passed.")

        # Verify Description
        description = page.locator('meta[name="description"]').get_attribute("content")
        print(f"Page Description: {description}")
        if "best neurosurgeon in Hyderabad" not in description:
            print("❌ Description verification failed! 'best neurosurgeon in Hyderabad' not found.")
        else:
            print("✅ Description verification passed.")

        # Verify JSON-LD
        print("Checking JSON-LD...")
        scripts = page.locator('script[type="application/ld+json"]').all()
        found_schema = False

        for script in scripts:
            content = script.text_content()
            try:
                data = json.loads(content)
                # Check if it's the graph we added
                if "@graph" in data:
                    for item in data["@graph"]:
                        if item.get("@type") == "Physician":
                            print("✅ Found Physician schema")

                            # Verify fields
                            if item.get("priceRange") == "₹₹":
                                print("✅ priceRange is '₹₹'")
                            else:
                                print(f"❌ priceRange is {item.get('priceRange')}")

                            if "Neurosurgery" in item.get("availableService", []):
                                print("✅ availableService includes Neurosurgery")

                            if item.get("url") == "https://drsayuj.com/appointments": # Assuming SITE_URL is this, need to check env or config
                                print(f"✅ URL matches: {item.get('url')}")
                            else:
                                print(f"ℹ️ URL is: {item.get('url')}")

                            found_schema = True
            except json.JSONDecodeError:
                continue

        if not found_schema:
            print("❌ Physician schema not found in JSON-LD scripts.")

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification_screenshot.png")
        print("Screenshot saved to verification_screenshot.png")

        browser.close()

if __name__ == "__main__":
    verify_appointment_schema()
