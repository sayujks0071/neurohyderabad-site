
import { parseBookingData } from "../app/api/appointments/submit/validation";

// Mock the request payload
const payload = {
  patientName: "Test Patient",
  email: "test@example.com",
  phone: "9876543210",
  age: "30",
  gender: "male",
  appointmentDate: "2023-12-25",
  appointmentTime: "10:00 AM",
  reason: "Test reason for appointment with sufficient length.",
  painScore: 5,
  mriScanAvailable: true
};

try {
  const result = parseBookingData(payload);
  console.log("Validation Successful:", result);

  if (result.painScore !== 5) {
      console.error("Pain Score mismatch");
      process.exit(1);
  }
  if (result.mriScanAvailable !== true) {
      console.error("MRI Scan Available mismatch");
      process.exit(1);
  }

} catch (error) {
  console.error("Validation Failed:", error);
  process.exit(1);
}
