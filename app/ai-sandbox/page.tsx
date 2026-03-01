// @ts-nocheck
'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import HeaderRefactored from '../components/HeaderRefactored'
import Footer from '../components/Footer'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AISandboxPage() {
    const { messages, input = '', handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: '/api/ai/sandbox',
        body: {
            requestedModel: 'openai/gpt-5.2' // Requested snippet
        }
    })

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-200">
            <HeaderRefactored />

            <main className="flex-1 flex justify-center items-center p-4 sm:p-8 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">

                {/* Decorative Blurred Background Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

                <div className="w-full max-w-4xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 overflow-hidden flex flex-col h-[80vh] relative z-10 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">

                    {/* Header */}
                    <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800 tracking-tight">AI Sandbox</h1>
                                <p className="text-xs text-slate-500 font-medium">Powered by Vercel AI SDK <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md ml-1 inline-block border border-indigo-100">streamText</span></p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col justify-center items-center text-slate-400 space-y-4 animate-in fade-in duration-700">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                                    <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <p className="text-lg font-medium text-slate-600">Start a conversation</p>
                                <p className="text-sm max-w-sm text-center">Try asking "Why is the sky blue?" to see real-time streaming using the <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-500">openai/gpt-5.2</code> configuration.</p>
                            </div>
                        ) : (
                            messages.map(m => (
                                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} group animate-in slide-in-from-bottom-2 duration-300`}>
                                    <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm relative ${m.role === 'user'
                                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-sm'
                                            : 'bg-white text-slate-800 rounded-tl-sm border border-slate-100'
                                        }`}>

                                        {/* Role Badge */}
                                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${m.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                                            {m.role === 'user' ? 'You' : 'AI Assistant'}
                                        </div>

                                        {/* Message Content */}
                                        <div className={`prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-slate-800 prose-pre:text-slate-100 ${m.role === 'user' ? 'prose-invert' : ''}`}>
                                            {m.role !== 'user' && m.content === '' && isLoading ? (
                                                <div className="flex items-center gap-1.5 h-6">
                                                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                                                </div>
                                            ) : (
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {m.content}
                                                </ReactMarkdown>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-3 animate-in fade-in">
                                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error.message || 'An error occurred during streaming.'}</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 sm:p-6 bg-white border-t border-slate-100 relative z-20">
                        <form onSubmit={handleSubmit} className="relative flex items-end gap-3">
                            <div className="relative flex-1">
                                <input
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl px-5 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400 text-base"
                                    value={input}
                                    placeholder="Ask anything (e.g., Why is the sky blue?)..."
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    autoFocus
                                />
                            </div>
                            <button
                                disabled={isLoading || !input.trim()}
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl p-4 transition-all duration-200 shadow-sm active:scale-95 shrink-0 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 translate-x-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    )
}
