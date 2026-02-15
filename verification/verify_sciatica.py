from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to Sciatica page...")
            page.goto("http://localhost:3000/conditions/sciatica-pain-treatment-hyderabad")

            # Wait for main content
            page.wait_for_selector("h1")

            # Screenshot the Red Flags section
            # Locator might need adjustment if the section text changed, but I kept the H2 text.
            header = page.locator("h2:has-text('Red Flags: When to See a Doctor Urgently')")
            section = header.locator("..") # Parent section
            section.screenshot(path="verification/sciatica_red_flags.png")
            print("Screenshot saved to verification/sciatica_red_flags.png")

            # Verify Schema content
            schemas = page.locator('script[type="application/ld+json"]').all_inner_texts()
            found_symptoms = False
            for s in schemas:
                # Remove spaces/newlines for simpler check
                clean_s = s.replace(" ", "").replace("\n", "")
                if '"@type":"MedicalCondition"' in clean_s and '"signOrSymptom"' in clean_s:
                    found_symptoms = True
                    print("SUCCESS: MedicalCondition schema with symptoms found!")
                    break

            if not found_symptoms:
                print("FAILURE: MedicalCondition schema with symptoms NOT found.")
                # Print schema for debugging (truncated)
                print("Found schemas (first 200 chars):", [s[:200] for s in schemas])

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
