const fs = require('fs');
let code = fs.readFileSync('app/_components/AIStreamingChat.tsx', 'utf8');

// Add imports for conversation, message, context, inline-citation
const newImports = `
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/src/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from "@/src/components/ai-elements/message";
import {
  Context,
  ContextTrigger,
  ContextContent as AIContextContent,
  ContextContentHeader,
  ContextContentBody,
  ContextInputUsage,
  ContextOutputUsage,
  ContextContentFooter,
} from "@/src/components/ai-elements/context";
import { RefreshCcwIcon, CopyIcon, InfoIcon } from "lucide-react";
`;

code = code.replace('import { CheckIcon, XIcon, SearchIcon, CalendarIcon, StethoscopeIcon } from "lucide-react";',
'import { CheckIcon, XIcon, SearchIcon, CalendarIcon, StethoscopeIcon, RefreshCcwIcon, CopyIcon, InfoIcon } from "lucide-react";\n' + newImports.replace('import { RefreshCcwIcon, CopyIcon, InfoIcon } from "lucide-react";', ''));

// Refactor the messages rendering part
// Replacing the <div className="h-96 overflow-y-auto p-4 space-y-4"> with <Conversation>
const oldRenderStart = `<div className="h-96 overflow-y-auto p-4 space-y-4">`;
const oldRenderEnd = `          <div ref={messagesEndRef} />
        </div>`;

const newRender = `
        <Conversation className="h-96 relative bg-[var(--color-surface)]">
          <ConversationContent className="p-4 space-y-6">
            {messages.map((message, index) => {
              const textContent = message.parts
                .filter(part => part.type === 'text')
                .map(part => (part as any).text)
                .join('');

              const isLastMessage = index === messages.length - 1;

              return (
                <Fragment key={message.id}>
                  <Message from={message.role} className="w-full">
                    <MessageContent className={message.role === 'user' ? 'bg-[var(--color-primary-500)] text-white p-3 rounded-lg max-w-[85%] ml-auto' : 'w-full'}>
                      {textContent && (
                        <div className={message.role === 'user' ? 'text-sm' : ''}>
                          {message.role === 'assistant' ? (
                            <MessageResponse>{textContent}</MessageResponse>
                          ) : (
                            textContent
                          )}
                        </div>
                      )}

                      {/* Attachments */}
                      {((message as any).experimental_attachments || message.parts?.filter(p => (p.type as string) === "file" || (p.type as string) === "image")).length > 0 && (
                        <div className="mt-2">
                          <Attachments variant="list">
                            {((message as any).experimental_attachments || message.parts?.filter(p => (p.type as string) === "file" || (p.type as string) === "image")).map((file: any, i: number) => (
                              <Attachment key={\`\${message.id}-file-\${i}\`} data={file as any}>
                                <AttachmentInfo />
                              </Attachment>
                            ))}
                          </Attachments>
                        </div>
                      )}

                      {/* Tools (Confirmation / CoT) */}
                      {message.parts?.filter(part => part.type === "tool-invocation").map((part: any) => {
                        const tool = part;
                        let icon = StethoscopeIcon;
                        let label = "Processing tool: " + tool.toolName;
                        if (tool.toolName === "searchContent") { icon = SearchIcon; label = "Searching medical information..."; }
                        else if (tool.toolName === "checkAvailability") { icon = CalendarIcon; label = "Checking schedule availability..."; }
                        else if (tool.toolName === "getServices" || tool.toolName === "getLocations") { icon = StethoscopeIcon; label = "Retrieving clinic details..."; }
                        const isCompleted = tool.state === "result";

                        return (
                          <div key={tool.toolInvocationId} className="mt-4">
                            {tool.toolName !== "bookAppointment" && (
                              <div className="mb-2">
                                <ChainOfThought defaultOpen={!isCompleted}>
                                  <ChainOfThoughtHeader>{isCompleted ? \`Completed: \${label}\` : \`Thinking: \${label}\`}</ChainOfThoughtHeader>
                                  <ChainOfThoughtContent>
                                    <ChainOfThoughtStep icon={icon} label={label} description={isCompleted ? "Tool executed successfully" : "Tool is currently executing"} status={isCompleted ? "complete" : "active"} />
                                    {isCompleted && tool.result && (
                                      <div className="text-xs mt-2 bg-black/5 p-2 rounded max-h-32 overflow-y-auto">
                                        <pre className="whitespace-pre-wrap font-mono">{typeof tool.result === 'string' ? tool.result : JSON.stringify(tool.result).slice(0, 150) + "..."}</pre>
                                      </div>
                                    )}
                                  </ChainOfThoughtContent>
                                </ChainOfThought>
                              </div>
                            )}

                            {tool.approval && (
                              <Confirmation approval={tool.approval} state={tool.state}>
                                <ConfirmationRequest>
                                  <p className="font-medium text-sm text-[var(--color-text-primary)] mb-2">This action requires your confirmation:</p>
                                  <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs">
                                    {tool.toolName === "bookAppointment" ? (
                                      <div className="text-slate-700">
                                        <p className="font-semibold mb-2 text-slate-900">Appointment Request</p>
                                        <ul className="space-y-1">
                                          <li><span className="font-medium">Patient:</span> {tool.args.patientName}</li>
                                          <li><span className="font-medium">Date/Time:</span> {tool.args.appointmentDate} at {tool.args.appointmentTime}</li>
                                          <li><span className="font-medium">Reason:</span> {tool.args.reason}</li>
                                          <li><span className="font-medium">Contact:</span> {tool.args.phone}</li>
                                        </ul>
                                      </div>
                                    ) : (
                                      <pre className="text-slate-700">{JSON.stringify(tool.args, null, 2)}</pre>
                                    )}
                                  </div>
                                </ConfirmationRequest>
                                <ConfirmationAccepted>
                                  <CheckIcon className="size-4 text-green-600" />
                                  <span className="text-green-700 font-medium text-sm">You approved this request</span>
                                </ConfirmationAccepted>
                                <ConfirmationRejected>
                                  <XIcon className="size-4 text-red-600" />
                                  <span className="text-red-700 font-medium text-sm">You rejected this request</span>
                                </ConfirmationRejected>
                                <ConfirmationActions className="mt-3">
                                  <ConfirmationAction variant="outline" onClick={() => addToolApprovalResponse({ id: tool.toolInvocationId, approved: false })}>Reject</ConfirmationAction>
                                  <ConfirmationAction variant="default" className="bg-[var(--color-primary-600)]" onClick={() => addToolApprovalResponse({ id: tool.toolInvocationId, approved: true })}>Approve</ConfirmationAction>
                                </ConfirmationActions>
                              </Confirmation>
                            )}
                          </div>
                        );
                      })}
                    </MessageContent>
                  </Message>

                  {/* Message Actions */}
                  {message.role === 'assistant' && isLastMessage && textContent && (
                    <div className="flex justify-between items-center mt-2 pl-12">
                      <MessageActions className="opacity-100 flex gap-2">
                        <MessageAction tooltip="Copy message" label="Copy" onClick={() => navigator.clipboard.writeText(textContent)}>
                          <CopyIcon className="size-3" />
                        </MessageAction>
                        {/* We use an internal Context display as a "Best use case" demo for this message */}
                        <div className="inline-block relative">
                          <Context maxTokens={8000} usedTokens={textContent.length * 2} usage={{ inputTokens: textContent.length, outputTokens: textContent.length, totalTokens: textContent.length * 2 }} modelId="openai:gpt-4">
                            <ContextTrigger className="h-6 text-xs gap-1 px-2 hover:bg-slate-100 rounded border border-transparent flex items-center text-slate-500">
                              <InfoIcon className="size-3" /> Context
                            </ContextTrigger>
                            <AIContextContent className="w-64">
                              <ContextContentHeader>AI Model Usage</ContextContentHeader>
                              <ContextContentBody>
                                <ContextInputUsage />
                                <ContextOutputUsage />
                              </ContextContentBody>
                              <ContextContentFooter />
                            </AIContextContent>
                          </Context>
                        </div>
                      </MessageActions>
                    </div>
                  )}

                  {/* Checkpoints */}
                  {checkpoints.find(cp => cp.messageIndex === index) && (
                    <div className="flex justify-center my-4">
                      <Checkpoint>
                        <CheckpointIcon />
                        <CheckpointTrigger onClick={() => restoreToCheckpoint(index)}>Restore previous conversation state</CheckpointTrigger>
                      </Checkpoint>
                    </div>
                  )}
                </Fragment>
              );
            })}

            {isLoading && (
              <div className="flex justify-start items-center gap-2 p-2 pl-4 text-slate-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-400"></div>
                <span className="text-sm">AI is thinking...</span>
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm m-4">
                {error.message || "An error occurred. Please try again or call +91-9778280044."}
              </div>
            )}
            <div ref={messagesEndRef} className="h-px" />
          </ConversationContent>
          <ConversationScrollButton className="absolute bottom-4 left-1/2 -translate-x-1/2" />
        </Conversation>`;

const startIndex = code.indexOf(oldRenderStart);
const endIndex = code.indexOf(oldRenderEnd) + oldRenderEnd.length;

if (startIndex !== -1 && endIndex !== -1) {
  code = code.substring(0, startIndex) + newRender + code.substring(endIndex);
  fs.writeFileSync('app/_components/AIStreamingChat.tsx', code);
  console.log('Successfully rewrote AIStreamingChat.tsx');
} else {
  console.log('Failed to find start or end index for rendering part');
  console.log('startIndex:', startIndex, 'endIndex:', endIndex);
}

// Add streamdown styles to globals.css if not present
const cssPath = 'app/globals.css';
let css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
if (!css.includes('@source "../node_modules/streamdown/dist/*.js";')) {
  css = `@source "../node_modules/streamdown/dist/*.js";\n` + css;
  fs.writeFileSync(cssPath, css);
  console.log('Added streamdown to globals.css');
}
