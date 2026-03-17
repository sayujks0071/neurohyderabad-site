'use client';

import React, { useState, useRef, useEffect, useMemo, Fragment } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { ChainOfThought, ChainOfThoughtHeader, ChainOfThoughtContent, ChainOfThoughtStep, ChainOfThoughtSearchResults, ChainOfThoughtSearchResult } from "@/src/components/ai-elements/chain-of-thought";
import { Checkpoint, CheckpointTrigger, CheckpointIcon } from "@/src/components/ai-elements/checkpoint";
import { Confirmation, ConfirmationRequest, ConfirmationAccepted, ConfirmationRejected, ConfirmationActions, ConfirmationAction } from "@/src/components/ai-elements/confirmation";
import { Attachments, Attachment, AttachmentPreview, AttachmentInfo, AttachmentRemove } from "@/src/components/ai-elements/attachments";
import { analytics } from "@/src/lib/analytics";
import { Suggestion, Suggestions } from "@/src/components/ai-elements/suggestion";
import { CalendarIcon, SearchIcon, StethoscopeIcon, CheckIcon, XIcon } from "lucide-react";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputTools, PromptInputSubmit } from "@/src/components/ai-elements/prompt-input";
import { Shimmer } from "@/src/components/ai-elements/shimmer";

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
      createCheckpoint(messages.length - 1);
    }
  }, [messages.length]);

  const createCheckpoint = (messageIndex: number) => {
    const isAlreadyCheckpoint = checkpoints.some(cp => cp.messageIndex === messageIndex);
    if (!isAlreadyCheckpoint) {
      setCheckpoints([...checkpoints, { messageIndex }]);
    }
  };

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
      experimental_attachments: message.files
    } as any);
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
    "Tell me about endoscopic spine surgery",
    "Cost of slip disc surgery",
    "Book an appointment",
    "How does machine learning work?"
  ];

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col relative size-full rounded-lg border">
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
      <div className="bg-[var(--color-surface)] rounded-2xl shadow-lg overflow-hidden flex-1 flex flex-col h-full">
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-full">
          {messages.map((message, index) => {
            // Helper to get text content from parts
            const textContent = message.parts
              .filter(part => part.type === 'text')
              .map(part => (part as any).text)
              .join('');

            const checkpoint = checkpoints.find(cp => cp.messageIndex === index);

            // Find tool invocations that need approval
            const toolInvocations = message.parts?.filter(
              (part) => part.type === "tool-invocation" || part.type.startsWith("tool-")
            ) as any[];

            // Find reasoning parts
            const reasoningParts = message.parts?.filter(
              (part) => part.type === "reasoning"
            ) as any[];

            return (
              <Fragment key={message.id}>
              {reasoningParts?.length > 0 && (
                <div className="flex justify-start mb-2">
                  <ChainOfThought>
                    <ChainOfThoughtHeader>
                      <span className="text-sm font-medium text-[var(--color-primary-600)]">AI Clinical Analysis</span>
                    </ChainOfThoughtHeader>
                    <ChainOfThoughtContent>
                      {reasoningParts.map((part, index) => (
                        <ChainOfThoughtStep
                          key={`reasoning-${index}`}
                          icon={StethoscopeIcon}
                          label="Analysis step"
                          description={(part as any).text}
                          status="complete"
                        />
                      ))}
                    </ChainOfThoughtContent>
                  </ChainOfThought>
                </div>
              )}

              <div
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-[var(--color-primary-500)] text-white'
                      : 'bg-[var(--color-background)] text-[var(--color-text-primary)]'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{textContent}</p>

                  {((message as any).experimental_attachments || message.parts?.filter((p: any) => (p.type as string) === "file" || (p.type as string) === "image")).length > 0 && (
                    <div className="mt-2">
                      <Attachments variant="list">
                        {((message as any).experimental_attachments || message.parts?.filter((p: any) => (p.type as string) === "file" || (p.type as string) === "image")).map((file: any, i: number) => (
                          <Attachment key={`${message.id}-file-${i}`} data={file as any}>
                            <AttachmentInfo />
                          </Attachment>
                        ))}
                      </Attachments>
                    </div>
                  )}

                  {message.parts?.map((part: any, i: number) => {
                    const isBookAppointment =
                      (part.type === 'tool-invocation' && part.toolName === 'bookAppointment') ||
                      part.type === 'tool-bookAppointment';

                    if (isBookAppointment && part.approval) {
                      const args = part.args || part.input || {};
                      return (
                        <div key={`${message.id}-tool-${i}`} className="mt-4">
                          <Confirmation approval={part.approval} state={part.state}>
                            <ConfirmationRequest>
                              <div className="space-y-2 text-sm text-left">
                                <p className="font-semibold text-slate-800">Book Appointment Request</p>
                                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                                  <li><strong>Patient:</strong> {args.patientName}</li>
                                  <li><strong>Date:</strong> {args.appointmentDate} at {args.appointmentTime}</li>
                                  <li><strong>Contact:</strong> {args.phone}</li>
                                  <li><strong>Reason:</strong> {args.reason}</li>
                                </ul>
                              </div>
                              <br />
                              <span className="text-slate-700">Do you approve booking this appointment?</span>
                            </ConfirmationRequest>
                            <ConfirmationAccepted>
                              <CheckIcon className="size-4" />
                              <span>Appointment booking approved</span>
                            </ConfirmationAccepted>
                            <ConfirmationRejected>
                              <XIcon className="size-4" />
                              <span>Appointment booking rejected</span>
                            </ConfirmationRejected>
                            <ConfirmationActions>
                              <ConfirmationAction
                                variant="outline"
                                onClick={() =>
                                  addToolApprovalResponse({
                                    id: part.approval!.id,
                                    approved: false,
                                  })
                                }
                              >
                                Reject
                              </ConfirmationAction>
                              <ConfirmationAction
                                variant="default"
                                onClick={() =>
                                  addToolApprovalResponse({
                                    id: part.approval!.id,
                                    approved: true,
                                  })
                                }
                              >
                                Approve
                              </ConfirmationAction>
                            </ConfirmationActions>
                          </Confirmation>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              {toolInvocations?.map((tool: any) => {
                if (!tool.approval) return null;

                return (
                  <Confirmation key={tool.toolCallId || tool.type} approval={tool.approval} state={tool.state}>
                    <ConfirmationRequest>
                      This action requires your approval:{" "}
                      <code>{tool.toolName || tool.type.replace('tool-', '')}</code>
                      <br />
                      Do you approve this action?
                    </ConfirmationRequest>
                    <ConfirmationAccepted>
                      <CheckIcon className="size-4" />
                      <span>You approved this tool execution</span>
                    </ConfirmationAccepted>
                    <ConfirmationRejected>
                      <XIcon className="size-4" />
                      <span>You rejected this tool execution</span>
                    </ConfirmationRejected>
                    <ConfirmationActions>
                      <ConfirmationAction
                        variant="outline"
                        onClick={() =>
                          addToolApprovalResponse({
                            id: tool.approval!.id,
                            approved: false,
                          })
                        }
                      >
                        Reject
                      </ConfirmationAction>
                      <ConfirmationAction
                        variant="default"
                        onClick={() =>
                          addToolApprovalResponse({
                            id: tool.approval!.id,
                            approved: true,
                          })
                        }
                      >
                        Approve
                      </ConfirmationAction>
                    </ConfirmationActions>
                  </Confirmation>
                );
              })}

              {checkpoint && (
                <Checkpoint>
                  <CheckpointIcon />
                  <CheckpointTrigger
                    onClick={() => restoreToCheckpoint(checkpoint.messageIndex)}
                  >
                    Restore checkpoint
                  </CheckpointTrigger>
                </Checkpoint>
              )}
              </Fragment>
            );
            })}

            {isLoading && (
              <div className="flex justify-start items-center gap-2 p-2 pl-4 text-slate-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--color-primary-500)]"></div>
                <Shimmer className="text-sm font-medium text-[var(--color-primary-600)]">AI is analyzing your request...</Shimmer>
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm m-4">
                {error.message || "An error occurred. Please try again or call +91-9778280044."}
              </div>
            )}
            <div ref={messagesEndRef} className="h-px" />
        </div>

        {/* Quick Actions - Only show if just initial message */}
        {messages.length <= 1 && (
          <div className="p-4">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3 font-semibold">Quick actions:</p>
            <Suggestions>
              {quickActions.map((action, index) => (
                <Suggestion
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  suggestion={action}
                  className="text-xs border-[var(--color-primary-500)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)] transition-colors disabled:opacity-50 whitespace-nowrap"
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
                    data={{ id: `upload-${i}`, filename: file.name, mediaType: file.type, type: "file" } as any}
                    onRemove={() => {
                      // Remove specific file from FileList object
                      if (files) {
                        const dt = new DataTransfer();
                        Array.from(files).forEach((f, index) => {
                          if (index !== i) dt.items.add(f);
                        });
                        setFiles(dt.files.length > 0 ? dt.files : undefined);
                      }
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
                <label
                  className="flex items-center justify-center p-2 rounded-lg cursor-pointer hover:bg-[var(--color-primary-50)] text-[var(--color-text-secondary)] transition-colors"
                  title="Upload MRI scans or medical reports"
                >
                  <span className="sr-only">Upload MRI scans or medical reports</span>
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
