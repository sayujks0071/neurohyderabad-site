from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000/appointments")
        page.wait_for_timeout(3000)
        page.screenshot(path="appointments_screenshot.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    verify_frontend()