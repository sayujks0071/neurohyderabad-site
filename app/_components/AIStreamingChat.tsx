'use client';

import React, { useState, useRef, useEffect, useMemo, Fragment } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { ChainOfThought, ChainOfThoughtHeader, ChainOfThoughtContent, ChainOfThoughtStep } from "@/src/components/ai-elements/chain-of-thought";
import { Checkpoint, CheckpointTrigger, CheckpointIcon } from "@/src/components/ai-elements/checkpoint";
import { StethoscopeIcon, SearchIcon, CalendarIcon, CheckIcon, XIcon } from "lucide-react";
import { Attachments, Attachment, AttachmentPreview, AttachmentInfo, AttachmentRemove } from "@/src/components/ai-elements/attachments";
import { analytics } from "@/src/lib/analytics";
import { Suggestion, Suggestions } from "@/src/components/ai-elements/suggestion";

import {
  Confirmation,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "@/src/components/ai-elements/confirmation";
import { RefreshCcwIcon, CopyIcon, InfoIcon } from "lucide-react";

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


import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputSubmit,
} from "@/src/components/ai-elements/prompt-input";

interface AIStreamingChatProps {
  pageSlug: string;
  service?: string;
  initialMessage?: string;
}

/**
 * Enhanced Streaming Chat Component using Vercel AI SDK
 * 
 * Features:
 * - Real-time streaming responses
 * - Better UX with typing indicators
 * - Conversation history management
 * - Emergency detection
 */
export default function AIStreamingChat({ 
  pageSlug, 
  service,
  initialMessage = "Hello! I'm Dr. Sayuj's AI assistant. I can help you book appointments, answer questions about neurosurgical conditions, and provide information about our clinic. How can I assist you today?"
}: AIStreamingChatProps) {
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [checkpoints, setCheckpoints] = useState<{messageIndex: number}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create transport with dependencies
  const transport = useMemo(() => new DefaultChatTransport({
    api: '/api/ai/chat',
    body: { pageSlug, service },
  }), [pageSlug, service]);

  const initialMessages = useMemo<UIMessage[]>(() => [
    {
      id: 'initial',
      role: 'assistant',
      parts: [{ type: 'text', text: initialMessage }]
    },
  ], [initialMessage]);

  // Initialize useChat hook with explicit generic type to prevent excessive narrowing
  const { messages, setMessages, sendMessage, status, error, addToolApprovalResponse } = useChat<UIMessage>({
    transport,
    messages: initialMessages,
    onFinish: (options) => {
      const message = options.message;
      // Get text content from parts
      const textContent = message.parts
        .filter(part => part.type === 'text')
        .map(part => (part as any).text)
        .join(' ');

      const emergencyKeywords = ['emergency', 'urgent', 'immediately', 'call', 'stroke', 'seizure'];
      const hasEmergency = emergencyKeywords.some(keyword => 
        textContent.toLowerCase().includes(keyword)
      );
      
      if (hasEmergency) {
        setShowEmergencyAlert(true);
      }

      analytics.aiAssistant.message('assistant');
    },
    onError: (error) => {
      console.error('Chat error:', error);
      analytics.aiAssistant.error(error.message);
    }
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Create checkpoint every 5 messages
    if (messages.length > 0 && messages.length % 5 === 0) {
      const isAlreadyCheckpoint = checkpoints.some(cp => cp.messageIndex === messages.length - 1);
      if (!isAlreadyCheckpoint) {
        setCheckpoints([...checkpoints, { messageIndex: messages.length - 1 }]);
      }
    }
  }, [messages.length, checkpoints]);

  const restoreToCheckpoint = (messageIndex: number) => {
    setMessages(messages.slice(0, messageIndex + 1));
    setCheckpoints(checkpoints.filter(cp => cp.messageIndex <= messageIndex));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onFormSubmit = async (message: { text: string; files?: FileList | undefined }) => {
    if (!message.text.trim() && (!message.files || message.files.length === 0)) return;
    if (isLoading) return;

    analytics.aiAssistant.message('user');

    setInput('');
    await sendMessage({
      text: message.text,
      files: message.files ? message.files : undefined
    });
    setFiles(undefined);
  };

  // Wrapper for quick actions
  const handleQuickAction = async (action: string) => {
    analytics.aiAssistant.message('user');
    await sendMessage({ text: action });
  };

  const quickActions = [
    "I need to book a new consultation",
    "I want to reschedule my appointment",
    "I have severe headache and dizziness",
    "I need information about spine surgery",
    "What are your clinic hours?",
    "Tell me about endoscopic spine surgery"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Emergency Alert */}
      {showEmergencyAlert && (
        <div className="mb-6 p-4 bg-[var(--color-error-light)] border border-[var(--color-error)] text-[var(--color-error-700)] rounded-lg animate-pulse">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🚨</div>
            <div>
              <h3 className="font-bold">Emergency Detected</h3>
              <p className="text-sm">
                If this is a medical emergency, please call <strong>+91-9778280044</strong> immediately 
                or visit the nearest emergency room.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary-500)] to-purple-600 text-white p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[var(--color-surface)] bg-opacity-20 rounded-full flex items-center justify-center mr-3">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold">Dr. Sayuj's AI Assistant</h3>
              <p className="text-[var(--color-primary-100)] text-sm">Powered by Vercel AI SDK</p>
            </div>
          </div>
        </div>

        {/* Messages */}

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
                              <Attachment key={`${message.id}-file-${i}`} data={file as any}>
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
                                  <ChainOfThoughtHeader>{isCompleted ? `Completed: ${label}` : `Thinking: ${label}`}</ChainOfThoughtHeader>
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
                        <div className="inline-block relative">
                          <Context maxTokens={8000} usedTokens={textContent.length * 2} usage={{ inputTokens: textContent.length, outputTokens: textContent.length, totalTokens: textContent.length * 2 } as any} modelId="openai:gpt-4">
                            <ContextTrigger asChild>
                              <button className="h-6 text-xs gap-1 px-2 hover:bg-slate-100 rounded border border-transparent flex items-center text-slate-500">
                                <InfoIcon className="size-3" /> Context
                              </button>
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
        </Conversation>

        {/* Quick Actions - Only show if just initial message */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">Quick actions:</p>
            <Suggestions>
              {quickActions.map((action, index) => (
                <Suggestion
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  suggestion={action}
                  disabled={isLoading}
                  className="bg-[var(--color-primary-50)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)] transition-colors disabled:opacity-50"
                />
              ))}
            </Suggestions>
          </div>
        )}

        {/* Input Form */}
        <div className="p-4 border-t border-[var(--color-border)]">
          {files && files.length > 0 && (
            <div className="mb-2">
              <Attachments variant="inline">
                {Array.from(files).map((file, i) => (
                  <Attachment
                    key={`upload-${i}`}
                    data={{ id: `upload-${i}`, name: file.name, contentType: file.type } as any}
                    onRemove={() => {
                      setFiles(undefined);
                    }}
                  >
                    <AttachmentPreview />
                    <AttachmentInfo />
                    <AttachmentRemove />
                  </Attachment>
                ))}
              </Attachments>
            </div>
          )}

          <PromptInput
            onSubmit={(msg) => {
              onFormSubmit({ text: msg.text, files: files });
            }}
          >
            <PromptInputTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              disabled={isLoading}
            />
            <PromptInputFooter>
              <PromptInputTools>
                <label className="flex items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-[var(--color-primary-50)] text-[var(--color-text-secondary)] transition-colors">
                  <span className="sr-only">Upload file</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFiles(e.target.files || undefined)}
                    multiple
                    disabled={isLoading}
                  />
                </label>
              </PromptInputTools>
              <PromptInputSubmit
                disabled={!input.trim() || isLoading}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>

      {/* Features Info */}
      <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
        <div className="bg-[var(--color-primary-50)] p-4 rounded-lg">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="font-semibold text-[var(--color-primary-800)]">Streaming Responses</h4>
          <p className="text-sm text-[var(--color-primary-500)]">Real-time AI responses</p>
        </div>
        <div className="bg-[var(--color-success-light)] p-4 rounded-lg">
          <div className="text-2xl mb-2">🔒</div>
          <h4 className="font-semibold text-[var(--color-success)]">Secure & Private</h4>
          <p className="text-sm text-[var(--color-success-700)]">HIPAA-compliant handling</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">🧠</div>
          <h4 className="font-semibold text-purple-800">AI Powered</h4>
          <p className="text-sm text-purple-600">Advanced AI technology</p>
        </div>
      </div>

      {/* Fallback Contact Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Prefer to speak directly? Call us at{' '}
          <a href="tel:+919778280044" className="text-[var(--color-primary-500)] hover:underline font-medium">
            +91-9778280044
          </a>
        </p>
      </div>
    </div>
  );
}
