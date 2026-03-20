import { createOpenAI } from '@ai-sdk/openai';
console.log(createOpenAI({ apiKey: "test", baseURL: "test", headers: { "test": "test" } }));
