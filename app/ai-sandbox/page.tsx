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
      parts: [{ type: 'text', text: 'Welcome to the AI Sandbox. Ask me anything, like "Why is the sky blue?"' }]
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
    <div className="flex flex-col min-h-screen pt-24 pb-8 bg-slate-950 text-slate-50 font-sans">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              AI Sandbox
            </h1>
            <p className="text-slate-400 mt-2">Real-time Vercel AI SDK Streaming</p>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-sm backdrop-blur-sm ${
                  m.role === 'user'
                    ? 'bg-blue-600/20 text-blue-50 border border-blue-500/30'
                    : 'bg-slate-800/50 text-slate-200 border border-slate-700/50'
                }`}
              >
                <div className="font-semibold text-xs opacity-50 mb-1 uppercase tracking-wider">
                  {m.role === 'user' ? 'You' : 'AI Assistant'}
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">{renderMessageContent(m)}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-slate-900/50 backdrop-blur-md border-t border-slate-800/50 sticky bottom-0 z-10">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center shadow-lg rounded-full bg-slate-800/80 border border-slate-700/50 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all"
          >
            <input
              className="w-full bg-transparent px-6 py-4 outline-none text-slate-100 placeholder-slate-500"
              value={input}
              placeholder="Type your message..."
              aria-label="Type your message"
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 rounded-full bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors text-white"
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
          <div className="text-center mt-3 text-xs text-slate-500">
            Powered by Vercel AI SDK &amp; streamText
          </div>
        </div>
      </div>
    </div>
  );
}
