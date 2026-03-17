'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState, useMemo } from 'react';
import { DefaultChatTransport, type UIMessage } from 'ai';

export default function AISandbox() {
  const [input, setInput] = useState('');

  const transport = useMemo(() => new DefaultChatTransport({
    api: '/api/ai/sandbox',
  }), []);

  const initialMessages = useMemo<UIMessage[]>(() => [
    {
      id: 'initial',
      role: 'assistant',
      parts: [{ type: 'text', text: 'Welcome to the Ask AI Sandbox. I am ready to demonstrate real-time text streaming. Ask me anything, for example: "Why is the sky blue?"' }]
    },
  ], []);

  const { messages, sendMessage, status } = useChat<UIMessage>({
    transport,
    messages: initialMessages,
  });

  const isLoading = status === 'submitted' || status === 'streaming';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const renderMessageContent = (m: UIMessage) => {
    if (m.parts && m.parts.length > 0) {
      return m.parts
        .filter(part => part.type === 'text')
        .map(part => (part as any).text)
        .join(' ');
    }
    return '';
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-8 bg-slate-50 font-sans">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
              Ask AI Sandbox
            </h1>
            <p className="text-slate-500 font-medium">Real-time Vercel AI SDK Streaming</p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-6 min-h-[50vh] flex flex-col justify-end">
            <div className="space-y-6 overflow-y-auto mb-4 custom-scrollbar pr-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-6 py-4 shadow-sm ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-blue-500/30'
                        : 'bg-white border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div className={`font-bold text-[10px] mb-1.5 uppercase tracking-widest ${m.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                      {m.role === 'user' ? 'You' : 'AI Assistant'}
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed">{renderMessageContent(m)}</div>
                  </div>
                </div>
              ))}
              {isLoading && status === 'streaming' && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-white border border-slate-200 text-slate-400 rounded-2xl rounded-bl-none px-6 py-4 shadow-sm text-sm flex items-center gap-2">
                    <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></span>
                    <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce delay-100"></span>
                    <span className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="mt-auto">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center shadow-lg rounded-2xl bg-white border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50 transition-all group"
              >
                <input
                  className="w-full bg-transparent px-6 py-4 outline-none text-slate-700 placeholder-slate-400 rounded-2xl"
                  value={input}
                  placeholder="Type your message..."
                  aria-label="Type your message"
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/30 text-white hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:translate-y-0 transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="text-center mt-6 text-xs text-slate-400 font-medium tracking-wide uppercase">
            Powered by Vercel AI SDK • streamText
          </div>
        </div>
      </div>
    </div>
  );
}
