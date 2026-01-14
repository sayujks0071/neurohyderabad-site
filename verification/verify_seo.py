from playwright.sync_api import sync_playwright

def verify_location_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to a location page
        page.goto("http://localhost:3000/neurosurgeon-banjara-hills")

        # Take a screenshot
        page.screenshot(path="verification/location_page.png", full_page=True)

        # Check for presence of components
        # We can't easily assert component names in production build, but we can check for text
        # Check for NAP Card text
        if page.get_by_text("Dr Sayuj Krishnan - Neurosurgeon near Banjara Hills").count() > 0:
            print("NAP Card title found")
        else:
            print("NAP Card title NOT found")

        # Check for CTAs
        if page.get_by_role("link", name="Book Appointment").count() > 0:
             print("Book Appointment CTA found")
        else:
             print("Book Appointment CTA NOT found")

        # Check for Local Pathways (Service links)
        if page.get_by_text("Available Services").count() > 0:
             print("Local Pathways found")
        else:
             print("Local Pathways NOT found")

        browser.close()

if __name__ == "__main__":
    verify_location_page()
