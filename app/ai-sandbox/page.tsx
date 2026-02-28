'use client';

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import Header from '../components/HeaderRefactored'
import Footer from '../components/Footer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AISandboxPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    // @ts-ignore
    api: '/api/ai/sandbox',
  }) as any;

  // Ref for the messages container to scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      {/* Increased top margin significantly to clear the fixed header which seems very tall in screenshots */}
      <main className="flex-grow container mx-auto px-4 py-8 relative z-0" style={{ marginTop: '200px' }}>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[70vh] border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 relative z-10">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Sandbox
            </h1>
            <p className="text-blue-100 text-sm">Experience real-time AI streaming</p>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20">
                <p className="mb-2">Start a conversation to see the streaming magic!</p>
                <div className="text-xs border border-dashed border-gray-300 rounded p-2 inline-block">
                  Try: "Why is the sky blue?"
                </div>
              </div>
            )}

            {messages.map((m: any) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100 relative z-10">
            <form onSubmit={handleSubmit} className="relative">
              <input
                className="w-full p-3 pr-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask anything..."
                autoFocus
              />
              <button
                type="submit"
                disabled={!input || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
