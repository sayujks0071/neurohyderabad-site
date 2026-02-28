interface Navigator {
  modelContext?: {
    registerTool: (tool: {
      name: string;
      description: string;
      inputSchema: {
        type: string;
        properties: Record<string, any>;
      };
      execute: (args: any) => Promise<{ content: Array<{ type: string; text: string }> }>;
    }) => void;
  };
}
