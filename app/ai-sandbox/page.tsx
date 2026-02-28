import Header from '../components/HeaderRefactored';
import Footer from '../components/Footer';
import SandboxClient from './_components/SandboxClient';

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import Header from '../components/HeaderRefactored';
import Footer from '../components/Footer';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AISandboxPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-200">
      <Header />
      <SandboxClient />
      <Footer />
    </div>
  );
}
