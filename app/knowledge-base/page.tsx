/**
 * Knowledge Base Page
 * 
 * Searchable medical library powered by Gemini File API
 */

import { Metadata } from 'next';
import KnowledgeBaseClient from './KnowledgeBaseClient';

export const metadata: Metadata = {
  title: "Medical Knowledge Base | Dr. Sayuj Krishnan",
  description: "Search our comprehensive medical knowledge base for information on neurosurgery, spine conditions, and brain treatments. Evidence-based patient education.",
  openGraph: {
    title: "Medical Knowledge Base | Dr. Sayuj Krishnan",
    description: "Search our comprehensive medical knowledge base for information on neurosurgery, spine conditions, and brain treatments.",
    type: "website",
  },
};

export default function KnowledgeBasePage() {
  return <KnowledgeBaseClient />;
}
