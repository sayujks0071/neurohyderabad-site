import { generateText } from "ai";
import { getTextModel } from "../src/lib/ai/gateway";
import * as dotenv from "dotenv";

// Load environment variables if .env exists
dotenv.config();

async function main() {
  console.log("🧪 Testing Vercel AI SDK...");

  try {
    // In this project, we use getTextModel() which handles the Vercel AI Gateway 
    // and falls back to direct OpenAI if needed.
    // Default model is gpt-4o-mini
    const model = getTextModel("gpt-4o-mini");
    console.log(`🤖 Using model: ${model.modelId}`);

    const { text } = await generateText({
      model,
      prompt: "What is love?",
    });

    console.log("\n✨ AI Response:");
    console.log(text);
  } catch (error) {
    console.error("\n❌ Error:");
    console.error(error instanceof Error ? error.message : String(error));
    
    if (error instanceof Error && (error.message.includes("API_KEY") || error.message.includes("must be set"))) {
      console.log("\n💡 Tip: Make sure OPENAI_API_KEY or AI_GATEWAY_API_KEY is set in your environment.");
      console.log("You can run this with: OPENAI_API_KEY=your_key npx tsx scripts/test-ai-love.ts");
    }
  }
}

main();
