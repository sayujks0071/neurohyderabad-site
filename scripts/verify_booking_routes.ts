
import { POST } from "../app/api/appointments/submit/route";
import { NextRequest } from "next/server";

async function main() {
  const body = {
    patientName: "Test Patient",
    email: "test@example.com",
    phone: "9876543210",
    age: "30",
    gender: "male",
    appointmentDate: "2023-12-25",
    appointmentTime: "10:00 AM",
    reason: "Test reason for appointment with sufficient length.",
    painScore: 7,
    mriScanAvailable: true
  };

  const req = new NextRequest("http://localhost:3000/api/appointments/submit", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });

  try {
    const res = await POST(req);
    const data = await res.json();

    console.log("Status:", res.status);
    console.log("Response Data:", JSON.stringify(data, null, 2));

    if (res.status !== 200) {
      console.error("Failed: Status is not 200");
      process.exit(1);
    }

    if (data.booking.painScore !== 7) {
      console.error("Failed: Pain Score mismatch");
      process.exit(1);
    }

    if (data.booking.mriScanAvailable !== true) {
      console.error("Failed: MRI Scan Available mismatch");
      process.exit(1);
    }

    console.log("Verification Passed!");
  } catch (error) {
    console.error("Error during verification:", error);
    process.exit(1);
  }
}

main();
