'use client';

import React, { useState, useRef, useEffect, useMemo, Fragment } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { analytics } from "@/src/lib/analytics";
import { CheckIcon, XIcon, SearchIcon, CalendarIcon, StethoscopeIcon } from "lucide-react";
import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@/components/ai-elements/checkpoint";
import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
} from "@/components/ai-elements/chain-of-thought";
import {
  Confirmation,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "@/components/ai-elements/confirmation";
import {
  Attachments,
  Attachment,
  AttachmentPreview,
  AttachmentInfo,
  AttachmentRemove,
} from "@/components/ai-elements/attachments";

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

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    analytics.aiAssistant.message('user');

    const userMessage = input;
    setInput('');
    // Use helper object with text property for convenience
    // Pass files to the API
    await sendMessage({
      text: userMessage,
      files: files
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
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => {
            // Helper to get text content from parts
            const textContent = message.parts
              .filter(part => part.type === 'text')
              .map(part => (part as any).text)
              .join('');

            return (
              <Fragment key={message.id}>
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

                  {message.parts?.filter(part => part.type === "tool-invocation").map((part: any) => {
                    const tool = part;

                    // Determine chain of thought icon and label
                    let icon = StethoscopeIcon;
                    let label = "Processing tool: " + tool.toolName;
                    if (tool.toolName === "searchContent") {
                      icon = SearchIcon;
                      label = "Searching medical information...";
                    } else if (tool.toolName === "checkAvailability") {
                      icon = CalendarIcon;
                      label = "Checking schedule availability...";
                    } else if (tool.toolName === "getServices" || tool.toolName === "getLocations") {
                      icon = StethoscopeIcon;
                      label = "Retrieving clinic details...";
                    }

                    const isCompleted = tool.state === "result";

                    return (
                      <div key={tool.toolInvocationId} className="mt-4">
                        {/* Display Chain of Thought for non-approval tools or tools that haven't required approval yet */}
                        {tool.toolName !== "bookAppointment" && (
                          <div className="mb-2">
                            <ChainOfThought defaultOpen={!isCompleted}>
                              <ChainOfThoughtHeader>
                                {isCompleted ? `Completed: ${label}` : `Thinking: ${label}`}
                              </ChainOfThoughtHeader>
                              <ChainOfThoughtContent>
                                <ChainOfThoughtStep
                                  icon={icon}
                                  label={label}
                                  description={isCompleted ? "Tool executed successfully" : "Tool is currently executing"}
                                  status={isCompleted ? "complete" : "active"}
                                />
                                {isCompleted && tool.result && (
                                  <div className="text-xs mt-2 bg-black/5 p-2 rounded max-h-32 overflow-y-auto">
                                    <pre className="whitespace-pre-wrap font-mono">
                                      {typeof tool.result === 'string' ? tool.result : JSON.stringify(tool.result).slice(0, 150) + "..."}
                                    </pre>
                                  </div>
                                )}
                              </ChainOfThoughtContent>
                            </ChainOfThought>
                          </div>
                        )}

                        {tool.approval && (
                          <Confirmation approval={tool.approval} state={tool.state}>
                            <ConfirmationRequest>
                              <p>This action requires your confirmation:</p>
                              <div className="bg-[var(--color-surface)] p-2 rounded text-xs mt-2 overflow-x-auto text-[var(--color-text-primary)] border border-[var(--color-border)]">
                                {tool.toolName === "bookAppointment" ? (
                                  <div>
                                    <p className="font-semibold mb-1">Book Appointment</p>
                                    <ul className="list-disc pl-4">
                                      <li><strong>Patient:</strong> {tool.args.patientName}</li>
                                      <li><strong>Date:</strong> {tool.args.appointmentDate} at {tool.args.appointmentTime}</li>
                                      <li><strong>Reason:</strong> {tool.args.reason}</li>
                                      <li><strong>Contact:</strong> {tool.args.phone}</li>
                                    </ul>
                                  </div>
                                ) : (
                                  <pre>{JSON.stringify(tool.args, null, 2)}</pre>
                                )}
                              </div>
                              <p className="mt-2 text-sm">Do you approve this booking?</p>
                            </ConfirmationRequest>
                            <ConfirmationAccepted>
                              <CheckIcon className="size-4" />
                              <span>You approved this booking request</span>
                            </ConfirmationAccepted>
                            <ConfirmationRejected>
                              <XIcon className="size-4" />
                              <span>You rejected this booking request</span>
                            </ConfirmationRejected>
                            <ConfirmationActions>
                              <ConfirmationAction
                                variant="outline"
                                onClick={() =>
                                  addToolApprovalResponse({
                                    id: tool.toolInvocationId,
                                    approved: false,
                                  })
                                }
                              >
                                Reject
                              </ConfirmationAction>
                              <ConfirmationAction
                                variant="default"
                                className="bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)]"
                                onClick={() =>
                                  addToolApprovalResponse({
                                    id: tool.toolInvocationId,
                                    approved: true,
                                  })
                                }
                              >
                                Approve
                              </ConfirmationAction>
                            </ConfirmationActions>
                          </Confirmation>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              {checkpoints.find(cp => cp.messageIndex === index) && (
                <div className="flex justify-center my-4">
                  <Checkpoint>
                    <CheckpointIcon />
                    <CheckpointTrigger onClick={() => restoreToCheckpoint(index)}>
                      Restore previous conversation state
                    </CheckpointTrigger>
                  </Checkpoint>
                </div>
              )}
              </Fragment>
            );
          })}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[var(--color-background)] text-[var(--color-text-primary)] px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--color-primary-500)]"></div>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-start">
              <div className="bg-[var(--color-error-light)] text-[var(--color-error-800)] px-4 py-2 rounded-lg">
                <p className="text-sm">
                  {error.message || "I'm having trouble right now. Please call +91-9778280044 for immediate assistance."}
                </p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions - Only show if just initial message */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  disabled={isLoading}
                  className="text-xs bg-[var(--color-primary-50)] text-[var(--color-primary-700)] px-3 py-1 rounded-full hover:bg-[var(--color-primary-100)] transition-colors disabled:opacity-50"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={onFormSubmit} className="p-4 border-t border-[var(--color-border)]">
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
          <div className="flex space-x-2">
            <label className="flex items-center justify-center px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg cursor-pointer hover:bg-[var(--color-primary-50)] text-[var(--color-text-secondary)] transition-colors">
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
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-gradient-to-r from-[var(--color-primary-500)] to-purple-600 text-white rounded-lg hover:from-[var(--color-primary-700)] hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
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
