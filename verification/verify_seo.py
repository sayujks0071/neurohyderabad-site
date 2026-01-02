from playwright.sync_api import sync_playwright

def verify_location_pages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Test Secunderabad Page
        print("Checking Secunderabad page...")
        page.goto("http://localhost:3000/neurosurgeon-secunderabad")

        # Take screenshot
        page.screenshot(path="verification/secunderabad.png", full_page=True)

        # Check for NAP Card
        print("Checking NAP Card...")
        nap_card = page.locator("address")
        if nap_card.count() > 0:
            print("NAP Card found")
        else:
            print("NAP Card NOT found")

        # Check for CTAs
        print("Checking CTAs...")
        whatsapp_btn = page.get_by_role("link", name="WhatsApp Booking")
        if whatsapp_btn.count() > 0:
             print("WhatsApp CTA found")
        else:
             print("WhatsApp CTA NOT found")

        # Check for Map
        print("Checking Map...")
        iframe = page.locator("iframe[src*='google.com/maps']")
        if iframe.count() > 0:
             print("Map Embed found")
        else:
             print("Map Embed NOT found")

        # Check for Local Pathways
        print("Checking Local Pathways...")
        pathways = page.get_by_text("Top Treatments near Secunderabad")
        if pathways.count() > 0:
            print("Local Pathways found")
        else:
             print("Local Pathways NOT found")

        # Test Hyderabad Page (Schema check via looking for elements)
        print("Checking Hyderabad page...")
        page.goto("http://localhost:3000/neurosurgeon-hyderabad")
        page.screenshot(path="verification/hyderabad.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_location_pages()
