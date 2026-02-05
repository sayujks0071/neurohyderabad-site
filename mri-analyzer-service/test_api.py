import requests
import os
from fpdf import FPDF

# 1. Generate Dummy PDF
pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)
pdf.cell(200, 10, txt="Patient: John Doe", ln=1, align="C")
pdf.cell(200, 10, txt="Exam: MRI Lumbar Spine", ln=1, align="C")
pdf.multi_cell(
    0,
    10,
    txt="Findings: There is a central disc herniation at L4-L5 level compressing the thecal sac. The nerve roots are impinged. L5-S1 level is normal.",
)
pdf.output("test_mri.pdf")

print("Generated test_mri.pdf")

# 2. Test API
url = "http://localhost:8001/analyze"
files = {"file": open("test_mri.pdf", "rb")}

try:
    print(f"Sending request to {url}...")
    response = requests.post(url, files=files)

    if response.status_code == 200:
        print("Success!")
        print("Response:", response.json())
    else:
        print("Failed!")
        print("Status Code:", response.status_code)
        print("Response:", response.text)

except Exception as e:
    print(f"Connection Error: {e}")
    print(
        "Ensure the server is running: bash tools/mri-analyzer-service/run_service.sh"
    )

# Cleanup
# os.remove("test_mri.pdf")
