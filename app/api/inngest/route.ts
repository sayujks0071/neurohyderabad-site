import { serve } from "inngest/next";
import { inngest } from "@/src/lib/inngest";
import { inngestFunctions } from "@/src/lib/inngest/functions";

export const runtime = "nodejs";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: inngestFunctions,
});
