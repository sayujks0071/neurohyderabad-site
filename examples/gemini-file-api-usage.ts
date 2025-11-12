/**
 * Example Usage: Google Gemini File API
 *
 * This file demonstrates best practices and use cases for the Gemini File API
 * implementation in the Neurohyderabad medical practice website.
 */

// ============================================================================
// EXAMPLE 1: Upload Medical Document
// ============================================================================

async function uploadMedicalDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('displayName', 'Brain Tumor Treatment Protocol 2025');
  formData.append('category', 'medical-research');
  formData.append('tags', 'brain-tumor,surgery,oncology,neurosurgery');
  formData.append('waitForProcessing', 'true');

  const response = await fetch('/api/gemini-files/upload', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  console.log('Uploaded file:', result.file.uri);
  return result;
}

// ============================================================================
// EXAMPLE 2: Generate Patient Education Content
// ============================================================================

async function generatePatientEducationMaterial(condition: string) {
  // First, get all relevant medical documents
  const filesResponse = await fetch('/api/gemini-files/list?filter=ACTIVE');
  const filesData = await filesResponse.json();

  // Filter for patient-info category (you'd need to store metadata separately)
  const relevantFiles = filesData.files.map((f: any) => f.uri);

  // Generate patient-friendly content
  const educationResponse = await fetch('/api/gemini-files/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      searchType: 'patient-education',
      query: `${condition} information`,
      condition: condition,
      fileUris: relevantFiles
    })
  });

  const educationData = await educationResponse.json();

  // Use this content on your website or in patient emails
  return {
    content: educationData.answer,
    sources: educationData.sources
  };
}

// Usage
// const brainTumorInfo = await generatePatientEducationMaterial('brain tumor');

// ============================================================================
// EXAMPLE 3: Build Dynamic FAQ Section
// ============================================================================

async function buildMedicalFAQ(topic: string, numQuestions: number = 10) {
  const response = await fetch('/api/gemini-files/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      searchType: 'faq',
      query: topic,
      numQuestions: numQuestions
    })
  });

  const data = await response.json();
  const faqs = JSON.parse(data.answer);

  // Format for website display
  return faqs.map((faq: any) => ({
    id: `faq-${Math.random().toString(36).substr(2, 9)}`,
    question: faq.question,
    answer: faq.answer,
    category: topic
  }));
}

// Usage
// const spineSurgeryFAQs = await buildMedicalFAQ('spine surgery', 15);

// ============================================================================
// EXAMPLE 4: Enhanced Chatbot with Document Context
// ============================================================================

async function enhancedChatbot(userMessage: string, conversationHistory: any[]) {
  // Step 1: Search relevant medical documents
  const docSearchResponse = await fetch('/api/gemini-files/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      searchType: 'medical',
      query: userMessage,
      category: 'patient-info',
      temperature: 0.7
    })
  });

  const docContext = await docSearchResponse.json();

  // Step 2: Enhance OpenAI chat with document context
  const messages = [
    {
      role: 'system',
      content: `You are Dr. Sayuj Krishnan's medical assistant chatbot.
      Use the following verified medical information to answer questions accurately:

      ${docContext.answer}

      Important: Always provide medical disclaimers and recommend scheduling an appointment for personalized advice.`
    },
    ...conversationHistory,
    { role: 'user', content: userMessage }
  ];

  const chatResponse = await fetch('/api/openai-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });

  const chatData = await chatResponse.json();

  return {
    message: chatData.message,
    sources: docContext.sources,
    confidence: 'high' // because backed by documents
  };
}

// Usage
// const response = await enhancedChatbot(
//   "What are the risks of spine surgery?",
//   conversationHistory
// );

// ============================================================================
// EXAMPLE 5: Pre-Appointment Patient Briefing
// ============================================================================

async function generatePreAppointmentBriefing(
  patientCondition: string,
  procedureType: string
) {
  // Search for relevant procedure documents
  const response = await fetch('/api/gemini-files/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      searchType: 'patient-education',
      query: `${procedureType} procedure for ${patientCondition}`,
      condition: patientCondition,
      temperature: 0.5 // Lower for factual content
    })
  });

  const briefingData = await response.json();

  // Format for email or patient portal
  return {
    title: `Your Upcoming ${procedureType}`,
    content: briefingData.answer,
    sections: {
      whatToExpect: extractSection(briefingData.answer, 'What to expect'),
      preparation: extractSection(briefingData.answer, 'Preparation'),
      recovery: extractSection(briefingData.answer, 'Recovery'),
      questionsToAsk: extractSection(briefingData.answer, 'Questions')
    }
  };
}

function extractSection(content: string, sectionName: string): string {
  // Simple extraction - enhance as needed
  const regex = new RegExp(`${sectionName}:?\\n([\\s\\S]*?)(?=\\n\\n|$)`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

// Usage
// const briefing = await generatePreAppointmentBriefing(
//   'herniated disc',
//   'minimally invasive spine surgery'
// );

// ============================================================================
// EXAMPLE 6: Medical Research Comparison
// ============================================================================

async function compareResearchPapers(topic: string, paperUris: string[]) {
  const response = await fetch('/api/gemini-files/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      searchType: 'compare',
      query: topic,
      fileUris: paperUris,
      temperature: 0.4
    })
  });

  const comparisonData = await response.json();

  return {
    topic: topic,
    comparison: comparisonData.answer,
    papersAnalyzed: paperUris.length,
    generatedAt: new Date().toISOString()
  };
}

// Usage
// const comparison = await compareResearchPapers(
//   'endoscopic vs traditional spine surgery outcomes',
//   ['files/paper1', 'files/paper2', 'files/paper3']
// );

// ============================================================================
// EXAMPLE 7: Real-time Document Validation
// ============================================================================

async function validateMedicalClaim(
  claim: string,
  verificationDocuments: string[]
) {
  const response = await fetch('/api/gemini-files/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      searchType: 'validate',
      claim: claim,
      fileUris: verificationDocuments,
      temperature: 0.1 // Very low for factual validation
    })
  });

  const validationData = await response.json();

  return {
    claim: claim,
    isSupported: validationData.validation.isSupported,
    confidence: validationData.validation.confidence,
    evidence: validationData.answer,
    verifiedAgainst: verificationDocuments
  };
}

// Usage for fact-checking website content
// const validation = await validateMedicalClaim(
//   'Recovery from minimally invasive spine surgery takes 2-4 weeks',
//   ['files/medical-guidelines-123']
// );

// ============================================================================
// EXAMPLE 8: Automated Content Generation for Blog Posts
// ============================================================================

async function generateBlogPostDraft(topic: string) {
  // Get all relevant research
  const filesResponse = await fetch('/api/gemini-files/list?filter=ACTIVE');
  const filesData = await filesResponse.json();

  // Generate comprehensive content
  const contentResponse = await fetch('/api/gemini-files/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      searchType: 'standard',
      query: `Write a comprehensive, patient-friendly blog post about ${topic}.
      Include: introduction, key points, treatment options, when to see a doctor, and conclusion.
      Use simple language and include medical disclaimers.`,
      temperature: 0.7
    })
  });

  const content = await contentResponse.json();

  return {
    title: `Understanding ${topic}: A Patient's Guide`,
    content: content.answer,
    metadata: {
      author: 'Dr. Sayuj Krishnan',
      publishDate: new Date().toISOString(),
      category: 'Patient Education',
      verified: true,
      sources: content.sources
    }
  };
}

// Usage
// const blogPost = await generateBlogPostDraft('brain aneurysm treatment');

// ============================================================================
// EXAMPLE 9: Symptom Checker Enhancement
// ============================================================================

async function enhancedSymptomChecker(symptoms: string[]) {
  const symptomQuery = `Based on these symptoms: ${symptoms.join(', ')},
  provide information about possible conditions, urgency level, and next steps.
  Include when to seek emergency care vs when to schedule an appointment.`;

  const response = await fetch('/api/gemini-files/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      searchType: 'medical',
      query: symptomQuery,
      category: 'patient-info',
      temperature: 0.3 // Lower for medical accuracy
    })
  });

  const analysisData = await response.json();

  // Parse urgency from response
  const isEmergency = analysisData.answer.toLowerCase().includes('emergency') ||
                     analysisData.answer.toLowerCase().includes('immediately');

  return {
    symptoms: symptoms,
    analysis: analysisData.answer,
    urgencyLevel: isEmergency ? 'high' : 'moderate',
    recommendedAction: isEmergency
      ? 'Seek emergency care immediately'
      : 'Schedule an appointment with Dr. Krishnan',
    sources: analysisData.sources
  };
}

// Usage
// const analysis = await enhancedSymptomChecker([
//   'severe headache',
//   'vision changes',
//   'sudden onset'
// ]);

// ============================================================================
// EXAMPLE 10: Document Summarization for Quick Review
// ============================================================================

async function summarizePatientDocument(fileUri: string, summaryType: 'brief' | 'detailed' = 'brief') {
  const response = await fetch('/api/gemini-files/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      searchType: 'summarize',
      query: 'summarize',
      fileUris: [fileUri],
      summaryType: summaryType
    })
  });

  const summaryData = await response.json();

  return {
    summary: summaryData.answer,
    documentUri: fileUri,
    summaryType: summaryType,
    generatedAt: new Date().toISOString()
  };
}

// Usage
// const summary = await summarizePatientDocument('files/mri-report-123', 'detailed');

// ============================================================================
// BEST PRACTICES
// ============================================================================

/*
1. ALWAYS validate file uploads before sending to API
2. Use specific, medical-accurate queries for better results
3. Include medical disclaimers in patient-facing content
4. Cache frequently accessed document searches
5. Monitor API usage and rate limits
6. Regularly reindex documents (daily cron job)
7. Store file metadata separately for advanced filtering
8. Implement retry logic for failed uploads
9. Use lower temperature (0.1-0.3) for factual content
10. Always provide source citations for medical information
*/

// ============================================================================
// ERROR HANDLING PATTERN
// ============================================================================

async function robustFileSearch(query: string, maxRetries: number = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('/api/gemini-files/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, searchType: 'medical' })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) {
        throw new Error('Max retries reached. File search failed.');
      }

      // Exponential backoff
      await new Promise(resolve =>
        setTimeout(resolve, 1000 * Math.pow(2, attempt - 1))
      );
    }
  }
}

// ============================================================================
// EXPORT FOR USE IN APPLICATION
// ============================================================================

export {
  uploadMedicalDocument,
  generatePatientEducationMaterial,
  buildMedicalFAQ,
  enhancedChatbot,
  generatePreAppointmentBriefing,
  compareResearchPapers,
  validateMedicalClaim,
  generateBlogPostDraft,
  enhancedSymptomChecker,
  summarizePatientDocument,
  robustFileSearch
};
