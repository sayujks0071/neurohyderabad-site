/**
 * Knowledge Base Page
 * 
 * Searchable medical library powered by Gemini File API
 */

import { Metadata } from 'next';
import KnowledgeBaseClient from './KnowledgeBaseClient';

export const metadata: Metadata = {
  title: 'Medical Knowledge Base - Dr. Sayuj Krishnan',
  description: 'Search our comprehensive medical library for information on brain tumors, spine surgery, treatments, and recovery guides.',
  alternates: {
    canonical: '/knowledge-base',
  },
  openGraph: {
    title: 'Medical Knowledge Base - Dr. Sayuj Krishnan',
    description: 'Search our comprehensive medical library for information on brain tumors, spine surgery, treatments, and recovery guides.',
  },
};

export default function KnowledgeBasePage() {
  return <KnowledgeBaseClient />;
}
