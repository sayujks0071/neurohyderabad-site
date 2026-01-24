import { ToolLoopAgent } from 'ai';
import { openai } from "@ai-sdk/openai";
import { z } from 'zod';
import * as dotenv from 'dotenv';

// Load environment variables from .env if it exists
dotenv.config();

async function main() {
  console.log("🤖 Initializing Dr. Sayuj Krishnan's AI ToolLoopAgent (v6)...");

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: OPENAI_API_KEY is not set.");
    console.log("Usage: OPENAI_API_KEY=your_key npx tsx scripts/test-tool-loop-agent.ts");
    process.exit(1);
  }

  // Create the agent
  const agent = new ToolLoopAgent({
    model: openai("gpt-4o"), // Use a valid model name
    instructions: `You are Dr. Sayuj Krishnan's expert AI Medical Assistant. 
    Your goal is to assist patients with clinic information and appointment inquiries.
    Dr. Sayuj Krishnan is a Neurosurgeon in Hyderabad.
    
    Clinic Location: Yashoda Hospital, Malakpet, Hyderabad.
    
    You have access to tools to help you answer questions accurately.`,
    tools: {
      get_clinic_info: {
        description: 'Get information about the clinic hours and location',
        parameters: z.object({}),
        execute: async () => {
          console.log("🔧 Tool Called: get_clinic_info");
          return {
            location: 'Yashoda Hospital, Room 317, OPD Block, Malakpet, Hyderabad, Telangana 500036',
            hours: 'Monday – Saturday: 10:00 AM – 1:00 PM & 5:00 PM – 7:30 PM IST. Sunday: Closed.',
            contact: '+91-9778280044',
            email: 'hellodr@drsayuj.info'
          };
        }
      },
      check_available_slots: {
        description: 'Check available appointment slots for a specific date',
        parameters: z.object({
          date: z.string().describe('The date to check in YYYY-MM-DD format'),
        }),
        execute: async ({ date }) => {
          console.log(`🔧 Tool Called: check_available_slots for ${date}`);
          // Mocking availability
          return {
            date,
            availableSlots: ['10:30 AM', '11:00 AM', '5:30 PM', '6:15 PM'],
            note: 'Slots are subject to change. Final confirmation will be provided by our care coordinator.'
          };
        }
      }
    },
  });

  const query = "Where is the clinic located and what are the available slots for tomorrow?";
  console.log(`\n👤 User: ${query}`);
  console.log("⏳ Processing...\n");

  try {
    const result = await agent.run({
      prompt: query,
    });

    console.log("\n✨ Agent Response:");
    console.log(result.text);
    
    if (result.toolCalls && result.toolCalls.length > 0) {
      console.log("\n🛠️ Tools Used:");
      result.toolCalls.forEach((call, index) => {
        console.log(`${index + 1}. ${call.toolName} (${JSON.stringify(call.args)})`);
      });
    }

  } catch (error) {
    console.error("\n❌ Error running agent:");
    console.error(error instanceof Error ? error.message : String(error));
  }
}

main();
