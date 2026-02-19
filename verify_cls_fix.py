from playwright.sync_api import sync_playwright

def verify_cls_fix():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000/")

        # Locate the placeholder element by its distinct class
        placeholder = page.locator(".animate-pulse.bg-gray-200")

        # Verify it exists
        if placeholder.count() > 0:
            print("Placeholder found.")

            # Get the class attribute
            classes = placeholder.get_attribute("class")
            print(f"Classes: {classes}")

            # Verify new classes are present
            if "h-[1500px]" in classes and "md:h-[750px]" in classes and "lg:h-[600px]" in classes:
                print("SUCCESS: New height classes found.")
            else:
                print("FAILURE: New height classes NOT found.")

            # Take screenshot
            page.screenshot(path="verification_cls_fix.png")
        else:
            print("FAILURE: Placeholder not found (maybe already loaded?).")

        browser.close()

if __name__ == "__main__":
    verify_cls_fix()
