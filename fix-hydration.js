const fs = require('fs');
let code = fs.readFileSync('app/_components/AIStreamingChat.tsx', 'utf8');

// Replace Button wrapped by TooltipTrigger to use asChild manually, or just avoid having <ContextTrigger> (which is a button) inside <MessageAction> (which is a button)

code = code.replace(
`<MessageAction tooltip="Copy message" label="Copy" onClick={() => navigator.clipboard.writeText(textContent)}>
                          <CopyIcon className="size-3" />
                        </MessageAction>
                        {/* We use an internal Context display as a "Best use case" demo for this message */}
                        <div className="inline-block relative">
                          <Context maxTokens={8000} usedTokens={textContent.length * 2} usage={{ inputTokens: textContent.length, outputTokens: textContent.length, totalTokens: textContent.length * 2 } as any} modelId="openai:gpt-4">
                            <ContextTrigger className="h-6 text-xs gap-1 px-2 hover:bg-slate-100 rounded border border-transparent flex items-center text-slate-500">
                              <InfoIcon className="size-3" /> Context
                            </ContextTrigger>`,
`<MessageAction tooltip="Copy message" label="Copy" onClick={() => navigator.clipboard.writeText(textContent)}>
                          <CopyIcon className="size-3" />
                        </MessageAction>
                        <div className="inline-block relative">
                          <Context maxTokens={8000} usedTokens={textContent.length * 2} usage={{ inputTokens: textContent.length, outputTokens: textContent.length, totalTokens: textContent.length * 2 } as any} modelId="openai:gpt-4">
                            <ContextTrigger asChild>
                              <button className="h-6 text-xs gap-1 px-2 hover:bg-slate-100 rounded border border-transparent flex items-center text-slate-500">
                                <InfoIcon className="size-3" /> Context
                              </button>
                            </ContextTrigger>`);
fs.writeFileSync('app/_components/AIStreamingChat.tsx', code);
