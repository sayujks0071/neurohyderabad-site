import * as ai from 'ai';
import * as openaiAgents from '@openai/agents';

console.log("--- Exports of 'ai' ---");
console.log(Object.keys(ai).filter(key => key.includes('Agent') || key.includes('Tool')));

console.log("\n--- Exports of '@openai/agents' ---");
console.log(Object.keys(openaiAgents).filter(key => key.includes('Agent') || key.includes('Tool')));
