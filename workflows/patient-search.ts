/**
 * Patient Search Workflow
 *
 * Orchestrates intelligent search across blog posts, medical documents,
 * and patient education content with contextual AI-powered responses.
 */

import { sleep } from "workflow";
import { generateObject, generateText, jsonSchema } from "ai";
import { getAllBlogPosts } from "@/src/lib/blog";
import { getTextModel, hasAIConfig } from "@/src/lib/ai/gateway";

interface SearchResult {
  type: "blog" | "gemini" | "general";
  title: string;
  excerpt: string;
  url?: string;
  relevanceScore: number;
  source?: string;
}

interface SearchWorkflowResult {
  query: string;
  results: SearchResult[];
  aiSummary: string;
  relatedTopics: string[];
  searchTime: number;
  totalResults: number;
}

/**
 * Main search workflow function
 */
export async function handlePatientSearch(
  query: string,
  userContext?: {
    previousSearches?: string[];
    location?: string;
    preferredLanguage?: string;
  }
): Promise<SearchWorkflowResult> {
  "use workflow";

  const startTime = Date.now();
  console.log(`[Patient Search Workflow] Starting search for: "${query}"`);

  // Step 1: Analyze the search intent
  const searchIntent = await analyzeSearchIntent(query, userContext);

  // Step 2: Search blog posts
  const blogResults = await searchBlogPosts(query);

  // Step 3: Search Gemini documents (if configured)
  const geminiResults = await searchGeminiDocuments(query);

  // Step 4: Generate AI summary
  await sleep("500ms"); // Small delay to avoid rate limiting
  const aiSummary = await generateSearchSummary(query, blogResults, geminiResults);

  // Step 5: Extract related topics
  const relatedTopics = await extractRelatedTopics(query, searchIntent);

  // Step 6: Combine and rank all results
  const allResults = [...blogResults, ...geminiResults];
  const rankedResults = rankSearchResults(allResults, searchIntent);

  const searchTime = Date.now() - startTime;

  console.log(
    `[Patient Search Workflow] Completed search in ${searchTime}ms with ${rankedResults.length} results`
  );

  return {
    query,
    results: rankedResults,
    aiSummary,
    relatedTopics,
    searchTime,
    totalResults: rankedResults.length,
  };
}

/**
 * Step: Analyze search intent using AI
 */
async function analyzeSearchIntent(
  query: string,
  userContext?: {
    previousSearches?: string[];
    location?: string;
    preferredLanguage?: string;
  }
) {
  "use step";

  console.log(`[Patient Search] Analyzing intent for: "${query}"`);

  if (!hasAIConfig()) {
    return {
      intent: "information",
      specialty: "general",
      urgency: "low",
      terms: [query],
    };
  }

  const contextInfo = userContext?.previousSearches?.length
    ? `\nUser's previous searches: ${userContext.previousSearches.join(", ")}`
    : "";

  try {
    const { object } = await generateObject({
      model: getTextModel(),
      schema: jsonSchema({
        type: "object",
        properties: {
          intent: {
            type: "string",
            enum: ["information", "appointment", "emergency", "treatment", "diagnosis"],
          },
          specialty: {
            type: "string",
            enum: ["neurosurgery", "spine", "brain", "epilepsy", "general"],
          },
          urgency: {
            type: "string",
            enum: ["low", "medium", "high", "emergency"],
          },
          terms: { type: "array", items: { type: "string" } },
        },
        required: ["intent", "specialty", "urgency", "terms"],
        additionalProperties: false,
      }),
      prompt: `Analyze the search intent for this medical query: "${query}"${contextInfo}

Determine:
1. Primary intent (information, appointment, emergency, treatment, diagnosis)
2. Medical specialty (neurosurgery, spine, brain, epilepsy, general)
3. Urgency level (low, medium, high, emergency)
4. Key medical terms

Return as JSON: {"intent": "...", "specialty": "...", "urgency": "...", "terms": [...]}`,
      temperature: 0.3,
    });
    type SearchIntentResult = {
      intent: "information" | "appointment" | "emergency" | "treatment" | "diagnosis";
      specialty: "neurosurgery" | "spine" | "brain" | "epilepsy" | "general";
      urgency: "low" | "medium" | "high" | "emergency";
      terms: string[];
    };
    return object as SearchIntentResult;
  } catch (error) {
    console.error("[Patient Search] Error parsing intent:", error);
  }

  return {
    intent: "information",
    specialty: "general",
    urgency: "low",
    terms: [query],
  };
}

/**
 * Step: Search blog posts
 */
async function searchBlogPosts(query: string): Promise<SearchResult[]> {
  "use step";

  console.log(`[Patient Search] Searching blog posts for: "${query}"`);

  try {
    const allPosts = await getAllBlogPosts();
    const queryLower = query.toLowerCase();

    const results = allPosts
      .map((post) => {
        const searchText =
          `${post.title} ${post.excerpt} ${post.category} ${post.tags?.join(" ")} ${post.description}`.toLowerCase();

        // Calculate relevance score
        const titleMatch = post.title.toLowerCase().includes(queryLower) ? 3 : 0;
        const excerptMatch = post.excerpt?.toLowerCase().includes(queryLower)
          ? 2
          : 0;
        const contentMatches = (
          searchText.match(new RegExp(queryLower.split(" ").join("|"), "g")) ||
          []
        ).length;

        const relevanceScore = titleMatch + excerptMatch + contentMatches;

        return {
          type: "blog" as const,
          title: post.title,
          excerpt: post.excerpt || post.description || "",
          url: `/blog/${post.slug}`,
          relevanceScore,
          source: "Blog",
        };
      })
      .filter((result) => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10);

    console.log(`[Patient Search] Found ${results.length} blog results`);
    return results;
  } catch (error) {
    console.error("[Patient Search] Error searching blog posts:", error);
    return [];
  }
}

/**
 * Step: Search Gemini documents
 */
async function searchGeminiDocuments(query: string): Promise<SearchResult[]> {
  "use step";

  console.log(`[Patient Search] Searching Gemini documents for: "${query}"`);

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const response = await fetch(`${baseUrl}/api/gemini-files/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        searchType: "medical",
        maxResults: 5,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const results: SearchResult[] = (data.sources || []).map(
        (source: any, index: number) => ({
          type: "gemini" as const,
          title: source.fileName || source.displayName || "Medical Document",
          excerpt: source.excerpt || data.answer?.substring(0, 200) || "",
          relevanceScore: 10 - index, // Prioritize Gemini results
          source: "Medical Documents",
        })
      );

      console.log(`[Patient Search] Found ${results.length} Gemini results`);
      return results;
    }
  } catch (error) {
    console.error("[Patient Search] Error searching Gemini documents:", error);
  }

  return [];
}

/**
 * Step: Generate AI-powered search summary
 */
async function generateSearchSummary(
  query: string,
  blogResults: SearchResult[],
  geminiResults: SearchResult[]
): Promise<string> {
  "use step";

  console.log(`[Patient Search] Generating AI summary`);

  const resultsContext = [
    ...blogResults.slice(0, 3),
    ...geminiResults.slice(0, 2),
  ]
    .map((r) => `${r.title}: ${r.excerpt}`)
    .join("\n\n");

  if (!hasAIConfig()) {
    const highlights = resultsContext
      ? `\n\nHighlights:\n${resultsContext}`
      : "";
    return `Here are relevant resources for "${query}". You can review the summaries below or book a consultation with Dr. Sayuj Krishnan for personalized guidance.${highlights}`;
  }

  const { text } = await generateText({
    model: getTextModel(),
    prompt: `Based on the search query "${query}" and the following relevant content, provide a concise, helpful summary for the patient.

Relevant content:
${resultsContext}

Guidelines:
- Keep it concise (2-3 paragraphs)
- Use simple, patient-friendly language
- Include relevant medical information
- Mention Dr. Sayuj Krishnan's expertise if relevant
- Include a call-to-action (book appointment, call, etc.)
- Add appropriate medical disclaimers`,
    temperature: 0.7,
  });

  return text;
}

/**
 * Step: Extract related topics
 */
async function extractRelatedTopics(
  query: string,
  searchIntent: any
): Promise<string[]> {
  "use step";

  console.log(`[Patient Search] Extracting related topics`);

  if (!hasAIConfig()) {
    return [
      "Spine Surgery",
      "Brain Tumors",
      "Epilepsy Treatment",
      "Minimally Invasive Surgery",
      "Neurosurgery Recovery",
    ];
  }

  try {
    const { object } = await generateObject({
      model: getTextModel(),
      schema: jsonSchema({
        type: "object",
        properties: {
          topics: { type: "array", items: { type: "string" } },
        },
        required: ["topics"],
        additionalProperties: false,
      }),
      prompt: `For the medical query "${query}" with intent "${searchIntent.intent}" and specialty "${searchIntent.specialty}", suggest 5 related topics a patient might want to explore.

Return ONLY JSON with a "topics" array, e.g., {"topics": ["topic1", "topic2", "topic3", "topic4", "topic5"]}`,
      temperature: 0.5,
    });
    type TopicsResult = { topics: string[] };
    const result = object as TopicsResult;
    return result.topics;
  } catch (error) {
    console.error("[Patient Search] Error parsing related topics:", error);
  }

  return [
    "Spine Surgery",
    "Brain Tumors",
    "Epilepsy Treatment",
    "Minimally Invasive Surgery",
    "Neurosurgery Recovery",
  ];
}

/**
 * Rank search results based on intent and relevance
 */
function rankSearchResults(
  results: SearchResult[],
  searchIntent: any
): SearchResult[] {
  return results
    .map((result) => {
      let adjustedScore = result.relevanceScore;

      // Boost Gemini results for medical queries
      if (result.type === "gemini" && searchIntent.specialty !== "general") {
        adjustedScore *= 1.5;
      }

      // Boost blog results for information queries
      if (result.type === "blog" && searchIntent.intent === "information") {
        adjustedScore *= 1.2;
      }

      return { ...result, relevanceScore: adjustedScore };
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 15);
}
