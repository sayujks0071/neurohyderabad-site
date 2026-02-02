"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Send,
  X,
  Bot,
  User,
  Loader2,
  Sparkles,
  ExternalLink,
  Globe,
} from "lucide-react";
import { trackMiddlewareEvent } from "@/src/lib/middleware/rum";
import { sendChatMessage } from "./neuralinkApi";
import SpeechButton from "./SpeechButton";

interface Message {
  role: "user" | "bot";
  text: string;
  sources?: any[];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hello! I am Dr. Sayuj's AI assistant. I can answer questions about neurosurgery, appointments, and clinic details. How can I help today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) {
        trackMiddlewareEvent('chat_widget_open', {
          source: 'appointment_chatbot'
        });
      }
      return newState;
    });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const startTime = performance.now();
    const userMessage = input.trim();
    const history = messages
      .filter((msg) => msg.text.trim().length > 0)
      .map((msg) => ({ role: msg.role, text: msg.text }));

    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
      { role: "bot", text: "" },
    ]);
    setIsTyping(true);

    trackMiddlewareEvent('chat_message_sent', {
      source: 'appointment_chatbot'
    });

    try {
      const result = await sendChatMessage(userMessage, history);
      const endTime = performance.now();
      const duration = endTime - startTime;

      trackMiddlewareEvent('chat_response_received', {
        source: 'appointment_chatbot',
        duration_ms: Math.round(duration),
        success: true
      });

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "bot",
          text:
            result.text ||
            "I could not fetch a response right now. Please try again or contact the clinic directly.",
          sources: result.sources,
        };
        return updated;
      });
    } catch (error) {
      console.error("Chat error:", error);
      const endTime = performance.now();
      const duration = endTime - startTime;

      trackMiddlewareEvent('chat_error', {
        source: 'appointment_chatbot',
        duration_ms: Math.round(duration),
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "bot",
          text: "I apologize, but I encountered an error. Please try again or contact our clinic directly.",
        };
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[90]">
      <button
        onClick={toggleChat}
        className={`p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group ${
          isOpen
            ? "bg-slate-800 text-white scale-90"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-110"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold whitespace-nowrap">
              Web AI Assistant
            </span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 left-0 w-[380px] h-[550px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 ring-1 ring-slate-900/5">
          <div className="bg-slate-900 p-5 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Real-time Neuro AI</h4>
                <div className="flex items-center text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                  <Sparkles className="w-2.5 h-2.5 mr-1" /> Google Search Enabled
                </div>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 opacity-60" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-200">
            {messages.map((msg, idx) => (
              <div
                key={`${msg.role}-${idx}`}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`flex max-w-[90%] ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      msg.role === "user"
                        ? "ml-2 bg-blue-100 text-blue-700"
                        : "mr-2 bg-slate-200 text-slate-600"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`relative p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                    {isTyping &&
                      idx === messages.length - 1 &&
                      msg.role === "bot" &&
                      !msg.text && <Loader2 className="w-4 h-4 animate-spin opacity-50" />}

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                          Sources Found
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sources.map(
                            (chunk, sIdx) =>
                              chunk.web && (
                                <a
                                  key={sIdx}
                                  href={chunk.web.uri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-bold text-blue-600 hover:bg-blue-50"
                                >
                                  <ExternalLink className="w-2.5 h-2.5 mr-1" />
                                  {chunk.web.title || "Link"}
                                </a>
                              )
                          )}
                        </div>
                      </div>
                    )}

                    {msg.role === "bot" && msg.text && (
                      <div className="mt-2 pt-2 flex justify-end">
                        <SpeechButton
                          text={msg.text}
                          variant="light"
                          className="scale-75 origin-right"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="p-4 bg-white border-t border-slate-100 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about symptoms, appointments, or reports..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`p-2.5 rounded-xl transition-all shadow-md ${
                !input.trim() || isTyping
                  ? "bg-slate-200 text-slate-400"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
