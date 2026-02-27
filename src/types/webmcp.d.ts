// webmcp.d.ts
// Experimental types for WebMCP API (Chrome 146+)
// Based on: https://github.com/webmachinelearning/webmcp

export interface ToolInputSchema {
  type: "object";
  properties: Record<string, unknown>;
  required?: string[];
  [key: string]: unknown;
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: ToolInputSchema;
  handler: (args: any) => Promise<any> | any;
}

export interface ModelContext {
  registerTool(tool: ToolDefinition): void;
}

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}
