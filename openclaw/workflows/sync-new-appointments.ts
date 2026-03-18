import { appointments } from "../../src/lib/db";
import { syncAppointmentToCalendar } from "./sync-calendar";
import { appendIntakeToSheets } from "./sync-intake-sheets";

/**
 * Automates fetching newly created appointments (from the last 24 hours)
 * and syncing them to Google Calendar and Google Sheets via GWS CLI.
 */
export async function syncRecentAppointmentsToGWS() {
  try {
    console.log("[GWS Sync] Fetching recent appointments to sync...");
    // Fetch recent 50 appointments. In a real system we would filter by created_at >= yesterday
    // or keep track of synced status. We'll simulate fetching yesterday's appointments.
    const recentAppointments = await appointments.getRecent(50);

    // Filter to last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const newAppointments = recentAppointments.filter((apt: any) => {
      const createdDate = new Date(apt.created_at);
      return createdDate >= yesterday;
    });

    console.log(`[GWS Sync] Found ${newAppointments.length} appointments created in the last 24 hours.`);

    for (const apt of newAppointments) {
      console.log(`[GWS Sync] Processing appointment for ${apt.patient_name}`);

      // 1. Sync to Calendar
      // We need to parse preferred_date and preferred_time
      // Format: "2026-03-10" and "10:00" -> "2026-03-10T10:00:00+05:30"
      if (apt.preferred_date && apt.preferred_time && typeof apt.preferred_time === 'string') {
        try {
          // Calculate end time (assuming 30 mins)
          const startTimeParts = apt.preferred_time.split(':');
          const startDate = new Date(`${apt.preferred_date}T${apt.preferred_time}:00`);
          const endDate = new Date(startDate.getTime() + 30 * 60000);

          // Helper to get local time string avoiding TZ shifting issues if possible
          // Assuming the date/time strings are strictly IST.
          const startDateTimeStr = `${apt.preferred_date}T${apt.preferred_time}:00+05:30`;

          const endHours = endDate.getHours().toString().padStart(2, '0');
          const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
          const endDateTimeStr = `${apt.preferred_date}T${endHours}:${endMinutes}:00+05:30`;

          const description = `Reason: ${apt.chief_complaint || 'N/A'} | Phone: ${apt.patient_phone || 'N/A'} | Email: ${apt.patient_email || 'N/A'}`;

          await syncAppointmentToCalendar(
            apt.patient_name as string,
            startDateTimeStr,
            endDateTimeStr,
            description
          );
        } catch (calError) {
          console.error(`[GWS Sync] Error syncing ${apt.patient_name} to calendar:`, calError);
        }
      }

      // 2. Sync to Intake Sheets
      try {
        const spreadsheetId = process.env.SHEET_ID || "DEFAULT_SHEET_ID";
        const createdAt = apt.created_at as string;
        const patientData = [
          createdAt ? createdAt.split('T')[0] : new Date().toISOString().split('T')[0],       // Date
          (apt.patient_name as string) || "Unknown",                   // Name
          apt.patient_age?.toString() || "",  // Age
          (apt.patient_gender as string) || "",           // Gender
          (apt.chief_complaint as string) || "",          // Conditions
          (apt.patient_phone as string) || "",            // Phone
          (apt.status as string) || "New"                 // Status
        ];

        await appendIntakeToSheets(spreadsheetId, patientData);
      } catch (sheetsError) {
        console.error(`[GWS Sync] Error syncing ${apt.patient_name} to sheets:`, sheetsError);
      }
    }

    console.log("[GWS Sync] Completed processing recent appointments.");
  } catch (error) {
    console.error("[GWS Sync] Process failed:", error);
    throw error;
  }
}

// Execute if run directly
if (require.main === module) {
  syncRecentAppointmentsToGWS().catch(console.error);
}
