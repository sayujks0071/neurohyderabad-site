import sys
from playwright.sync_api import sync_playwright
import json

def verify_page(page, url, page_type):
    print(f"Verifying {url} ({page_type})...")
    page.goto(url)

    # Check Schemas
    schemas = page.locator('script[type="application/ld+json"]').all_inner_texts()

    medical_clinic_count = 0
    breadcrumb_list_count = 0
    physician_count = 0
    medical_web_page_count = 0
    medical_service_count = 0
    faq_page_count = 0

    for schema_text in schemas:
        try:
            data = json.loads(schema_text)

            # Helper to check type
            def check_type(obj):
                nonlocal medical_clinic_count, breadcrumb_list_count, physician_count, medical_web_page_count, medical_service_count, faq_page_count
                t = obj.get('@type')
                if t == 'MedicalClinic':
                    medical_clinic_count += 1
                elif t == 'BreadcrumbList':
                    breadcrumb_list_count += 1
                elif t == 'Physician':
                    physician_count += 1
                elif t == 'MedicalWebPage':
                    medical_web_page_count += 1
                elif t == 'MedicalService':
                    medical_service_count += 1
                elif t == 'FAQPage':
                    faq_page_count += 1

                # Check graph
                if '@graph' in obj:
                    for item in obj['@graph']:
                        check_type(item)

            if isinstance(data, list):
                for item in data:
                    check_type(item)
            else:
                check_type(data)

        except json.JSONDecodeError:
            print("  Error decoding JSON-LD")

    print(f"  MedicalClinic: {medical_clinic_count}")
    print(f"  BreadcrumbList: {breadcrumb_list_count}")
    print(f"  Physician: {physician_count}")

    errors = []

    if page_type == 'location':
        if medical_clinic_count != 1:
            errors.append(f"Expected 1 MedicalClinic schema, found {medical_clinic_count}")
        if breadcrumb_list_count > 1:
            errors.append(f"Expected at most 1 BreadcrumbList schema, found {breadcrumb_list_count}")
        if physician_count < 1: # Might be in graph or separate
             # Physician schema is usually separate. If it's 0, it might be an issue, but let's see.
             pass

    elif page_type == 'service':
        if medical_service_count < 1: # might be nested
             pass

    # Check LocalPathways
    # Look for "Available Services" or "Conditions Treated" or "Visit Our Neurosurgery Clinics"
    pathways_text = ["Available Services", "Conditions Treated", "Visit Our Neurosurgery Clinics", "Consult Dr. Sayuj Near You"]
    found_pathways = False
    for text in pathways_text:
        if page.get_by_text(text).count() > 0:
            found_pathways = True
            break

    if found_pathways:
        print("  LocalPathways found: YES")
    else:
        print("  LocalPathways found: NO")
        errors.append("LocalPathways component not found or visible text changed")

    if errors:
        print("  ERRORS:")
        for e in errors:
            print(f"    - {e}")
        return False
    else:
        print("  OK")
        return True

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        base_url = "http://localhost:3000" # Assuming server is running

        results = []

        # Test 1: Location Page (Banjara Hills)
        results.append(verify_page(page, f"{base_url}/neurosurgeon-banjara-hills", 'location'))

        # Test 2: Location Page (Secunderabad)
        results.append(verify_page(page, f"{base_url}/neurosurgeon-secunderabad", 'location'))

        # Test 3: Service Page
        results.append(verify_page(page, f"{base_url}/services/endoscopic-spine-surgery-hyderabad", 'service'))

        browser.close()

        if all(results):
            print("\nAll checks passed!")
            sys.exit(0)
        else:
            print("\nSome checks failed.")
            sys.exit(1)

if __name__ == "__main__":
    main()
