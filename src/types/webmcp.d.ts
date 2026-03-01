// src/types/webmcp.d.ts

/**
 * WebMCP API Draft Definitions
 * Based on Draft Community Group Report, 23 February 2026
 * https://webmachinelearning.github.io/webmcp/
 */

export interface ModelContextTool {
  name: string;
  description: string;
  inputSchema?: object;
  execute: (input: any, client: ModelContextClient) => Promise<any> | any;
  annotations?: ToolAnnotations;
}

export interface ToolAnnotations {
  readOnlyHint?: boolean;
}

export interface ModelContextClient {
  requestUserInteraction: (callback: () => Promise<any>) => Promise<any>;
}

export interface ModelContextOptions {
  tools?: ModelContextTool[];
}

export interface ModelContext {
  provideContext(options?: ModelContextOptions): void;
  clearContext(): void;
  registerTool(tool: ModelContextTool): void;
  unregisterTool(name: string): void;
}

declare global {
  interface Navigator {
    readonly modelContext?: ModelContext;
  }
}
