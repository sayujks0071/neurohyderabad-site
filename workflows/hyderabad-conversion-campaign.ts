import { execFile } from "child_process";
import { promisify } from "util";
import { appointments } from "../src/lib/db";

const execFileAsync = promisify(execFile);

// Mock data or query from DB for unconverted leads in Hyderabad
const HYDERABAD_LEADS = [
  { name: "Rahul S.", email: "rahul.hyderabad@example.com", condition: "Lower Back Pain", status: "Inquired" },
  { name: "Priya M.", email: "priya.m@example.com", condition: "Neck Pain", status: "Inquired" },
  { name: "Suresh K.", email: "suresh.k@example.com", condition: "Sciatica", status: "Inquired" }
];

async function createCampaignTrackerSheet(): Promise<string | null> {
  console.log("Creating Google Sheet for Hyderabad Conversion Campaign...");
  const title = `Hyderabad Conversion Campaign - ${new Date().toISOString().split("T")[0]}`;
  const args = ["sheets", "spreadsheets", "create", "--json", JSON.stringify({ properties: { title } })];

  try {
    const { stdout, stderr } = await execFileAsync("gws", args);
    if (stderr && !stderr.includes("success") && !stderr.includes("200 OK")) {
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
    jsonPayload,
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
    jsonPayload,
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

  const subject = "Following up on your spine health query - Dr. Sayuj Krishnan";
  const body = `Hi ${lead.name},

I am Dr. Sayuj Krishnan's automated assistant. We noticed you inquired about ${lead.condition} but haven't booked a consultation yet.

We are currently offering priority scheduling for patients in the Hyderabad region to ensure timely care. Please let us know if you'd like to proceed with booking a consultation or if you have any further questions regarding your ${lead.condition}.

Best regards,
The Clinic of Dr. Sayuj Krishnan
Yashoda Hospital, Hyderabad`;

  // Use gws gmail +send
  const args = ["gmail", "+send", "--to", lead.email, "--subject", subject, "--body", body];
  if (dryRun) {
    args.push("--dry-run");
  }

  try {
    const { stdout, stderr } = await execFileAsync("gws", args);
    if (stderr && !stderr.includes("success") && !stderr.includes("200 OK")) {
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

  // 2. Execute outreach
  for (const lead of HYDERABAD_LEADS) {
    // We pass --dry-run for safety unless explicitly disabled
    await sendOutreachEmail(lead, true);

    // 3. Log to CRM
    if (spreadsheetId) {
      await logLeadToSheet(spreadsheetId, lead);
    }
  }

  console.log("✅ Hyderabad Conversion Campaign completed successfully.");
}

runCampaign().catch(console.error);
