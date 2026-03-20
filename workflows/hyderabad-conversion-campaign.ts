import { execFile } from "child_process";
import { promisify } from "util";
import { patients } from "../src/lib/db";

const execFileAsync = promisify(execFile);

// Encode email to base64url for standard `gws gmail users messages send`
function encodeBase64Url(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getHyderabadLeads() {
  // If database is not configured, fallback to mock data
  if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
    console.log("No database configured, using mock leads for Hyderabad.");
    return [
      { name: "Rahul S.", email: "rahul.hyderabad@example.com", condition: "Lower Back Pain", status: "Inquired" },
      { name: "Priya M.", email: "priya.m@example.com", condition: "Neck Pain", status: "Inquired" },
      { name: "Suresh K.", email: "suresh.k@example.com", condition: "Sciatica", status: "Inquired" }
    ];
  }

  try {
    // In a real scenario, this would be a specialized query to find unconverted leads from Hyderabad
    // Since we don't have a direct location query in the patients table schema shown, we'll
    // fetch recent patients and filter for demonstration if they don't have completed appointments
    const { getRecent } = require("../src/lib/db").appointments;
    const recent = await getRecent(100);

    // Filter for those who only have 'pending' or 'inquired' status
    const unconverted = recent.filter((a: any) =>
      a.status === 'pending' || a.status === 'inquired'
    );

    // Limit to a small batch and map to expected lead format
    return unconverted.slice(0, 10).map((a: any) => ({
      name: a.patient_name,
      email: a.patient_email,
      condition: a.chief_complaint || "Spine/Brain condition",
      status: a.status
    }));
  } catch (error) {
    console.error("Failed to fetch leads from DB:", error);
    return [];
  }
}

async function createCampaignTrackerSheet(): Promise<string | null> {
  console.log("Creating Google Sheet for Hyderabad Conversion Campaign...");
  const title = `Hyderabad Conversion Campaign - ${new Date().toISOString().split("T")[0]}`;

  const args = [
    "sheets",
    "spreadsheets",
    "create",
    "--json",
    JSON.stringify({ properties: { title } })
  ];

  try {
    const { stdout, stderr } = await execFileAsync("gws", args);
    if (stderr) {
      console.warn("gws sheets stderr:", stderr);
    }
    const response = JSON.parse(stdout);
    console.log(`Sheet created: https://docs.google.com/spreadsheets/d/${response.spreadsheetId}`);
    return response.spreadsheetId;
  } catch (error) {
    console.error("Failed to create Google Sheet:", error);
    return null;
  }
}

async function addHeaderRow(spreadsheetId: string) {
  const range = "Sheet1!A1:E1";
  const jsonPayload = JSON.stringify({
    values: [["Date", "Name", "Email", "Condition", "Status"]]
  });

  const args = [
    "sheets",
    "spreadsheets",
    "values",
    "append",
    "--params",
    JSON.stringify({ spreadsheetId, range, valueInputOption: "USER_ENTERED" }),
    "--json",
    jsonPayload
  ];

  try {
    await execFileAsync("gws", args);
    console.log("Header row added to sheet.");
  } catch (error) {
    console.error("Failed to add header row:", error);
  }
}

async function logLeadToSheet(spreadsheetId: string, lead: any) {
  const range = "Sheet1!A2";
  const jsonPayload = JSON.stringify({
    values: [[new Date().toISOString().split("T")[0], lead.name, lead.email, lead.condition, lead.status]]
  });

  const args = [
    "sheets",
    "spreadsheets",
    "values",
    "append",
    "--params",
    JSON.stringify({ spreadsheetId, range, valueInputOption: "USER_ENTERED" }),
    "--json",
    jsonPayload
  ];

  try {
    await execFileAsync("gws", args);
    console.log(`Logged ${lead.name} to tracker.`);
  } catch (error) {
    console.error(`Failed to log ${lead.name} to tracker:`, error);
  }
}

async function sendOutreachEmail(lead: any, dryRun = false) {
  console.log(`Preparing outreach email for ${lead.name}...`);

  const subject = "Following up on your health query - Dr. Sayuj Krishnan";
  const body = `Hi ${lead.name},

I am Dr. Sayuj Krishnan's automated assistant. We noticed you recently reached out regarding your ${lead.condition} but haven't proceeded with a consultation.

To ensure timely care, we are currently offering priority scheduling for patients in the Hyderabad region. Would you like to proceed with booking a consultation or do you have any questions regarding your ${lead.condition}?

You can book directly at: https://www.drsayuj.info/appointments

Best regards,
The Clinic of Dr. Sayuj Krishnan
Yashoda Hospital, Hyderabad`;

  // Use standard gws email sending format
  const encodedEmail = encodeBase64Url(
    `To: ${lead.email}\nSubject: ${subject}\n\n${body}`
  );

  const payload = {
    raw: encodedEmail,
    subject: subject
  };

  const args = [
    "gmail",
    "users",
    "messages",
    "send",
    "--params",
    JSON.stringify({ userId: "me" }),
    "--json",
    JSON.stringify(payload)
  ];

  if (dryRun) {
    args.push("--dry-run");
  }

  try {
    const { stdout, stderr } = await execFileAsync("gws", args);
    if (stderr) {
      console.warn("gws gmail stderr:", stderr);
    }
    console.log(`Sent outreach to ${lead.email}`);
  } catch (error) {
    console.error(`Failed to send email to ${lead.email}:`, error);
  }
}

async function runCampaign() {
  console.log("🚀 Starting Hyderabad Conversion Campaign (GWS Workflow)...");

  // 1. Create a tracking sheet
  const spreadsheetId = await createCampaignTrackerSheet();
  if (spreadsheetId) {
    await addHeaderRow(spreadsheetId);
  }

  // 2. Get Leads
  const leads = await getHyderabadLeads();
  console.log(`Found ${leads.length} leads for outreach.`);

  // 3. Execute outreach
  const dryRun = process.env.DRY_RUN !== 'false';
  if (dryRun) {
    console.log("Running in DRY RUN mode. No emails will be sent.");
  }

  for (const lead of leads) {
    if (lead.email) {
      await sendOutreachEmail(lead, dryRun);

      // 4. Log to CRM
      if (spreadsheetId) {
        await logLeadToSheet(spreadsheetId, lead);
      }
    } else {
      console.log(`Skipping ${lead.name} due to missing email.`);
    }
  }

  console.log("✅ Hyderabad Conversion Campaign completed successfully.");
}

runCampaign().catch(console.error);
