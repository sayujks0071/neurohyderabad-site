/**
 * Patient Reviews & Testimonials Workflow
 * 
 * Automates collection, management, and optimization of patient reviews:
 * - Google Business Profile reviews
 * - Website testimonials
 * - Video testimonial requests
 * - Review response management
 * - Reputation monitoring
 */

import { sleep, FatalError, fetch, createHook, createWebhook, getStepMetadata } from "workflow";

const SITE_URL = "https://www.drsayuj.info";

interface ReviewRequest {
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string;
  procedureType: string;
  satisfactionScore?: number;
}

interface ReviewResponse {
  patientId: string;
  platform: "google" | "website" | "practo" | "lybrate";
  rating: number;
  review: string;
  videoTestimonial?: boolean;
}

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  platformBreakdown: { platform: string; count: number; avgRating: number }[];
  recentReviews: { date: string; rating: number; excerpt: string }[];
  responseRate: number;
  sentimentScore: number;
}

interface ReviewCampaignResult {
  campaignId: string;
  requestsSent: number;
  reviewsReceived: number;
  averageRating: number;
  conversionRate: number;
}

/**
 * Post-appointment review request workflow
 * Sends review request 3 days after appointment
 */
export async function requestPatientReview(
  request: ReviewRequest
): Promise<{ success: boolean; reviewReceived: boolean; review?: ReviewResponse }> {
  "use workflow";
  globalThis.fetch = fetch;

  const { patientId, patientName, appointmentDate } = request;
  console.log(`[Reviews] Starting review request for patient ${patientId}`);

  try {
    // Wait 3 days after appointment for follow-up
    const appointmentTime = new Date(appointmentDate).getTime();
    const now = Date.now();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    
    if (now < appointmentTime + threeDaysMs) {
      const waitTime = appointmentTime + threeDaysMs - now;
      console.log(`[Reviews] Waiting ${Math.round(waitTime / 3600000)}h before sending request`);
      await sleep(`${Math.round(waitTime / 1000)}s`);
    }

    // Check satisfaction score first
    const satisfaction = await checkPatientSatisfaction(request);
    
    if (satisfaction.score < 4) {
      // Handle negative feedback privately first
      await handleNegativeFeedback(request, satisfaction);
      return { success: true, reviewReceived: false };
    }

    // Send review request
    await sendReviewRequest(request);

    // Create webhook for review submission
    const webhook = createWebhook({
      token: `review:${patientId}`,
    });

    // Wait for review with 7-day timeout
    const result = await Promise.race([
      webhook.then(req => ({ type: "review" as const, request: req })),
      sleep("7 days").then(() => ({ type: "timeout" as const })),
    ]);

    if (result.type === "timeout") {
      // Send reminder
      await sendReviewReminder(request);
      
      // Wait another 3 days
      const reminderResult = await Promise.race([
        webhook.then(req => ({ type: "review" as const, request: req })),
        sleep("3 days").then(() => ({ type: "timeout" as const })),
      ]);

      if (reminderResult.type === "timeout") {
        console.log(`[Reviews] No review received from ${patientId}`);
        return { success: true, reviewReceived: false };
      }
    }

    // Process received review
    if (result.type === "review") {
      const reviewData = await processReviewSubmission(result.request);
      
      // Thank the patient
      await sendThankYouMessage(request, reviewData);
      
      // If high rating, ask for video testimonial
      if (reviewData.rating >= 5) {
        await requestVideoTestimonial(request);
      }

      return { success: true, reviewReceived: true, review: reviewData };
    }

    return { success: true, reviewReceived: false };
  } catch (error) {
    console.error(`[Reviews] Error for patient ${patientId}:`, error);
    throw new FatalError(`Review request failed: ${error}`);
  }
}

/**
 * Check patient satisfaction before asking for review
 */
async function checkPatientSatisfaction(
  request: ReviewRequest
): Promise<{ score: number; feedback?: string }> {
  "use step";

  console.log(`[Reviews] Checking satisfaction for ${request.patientId}`);

  // In production, send SMS/Email with quick satisfaction survey
  // For now, return simulated score
  return {
    score: request.satisfactionScore || 5,
    feedback: undefined,
  };
}

/**
 * Handle negative feedback privately
 */
async function handleNegativeFeedback(
  request: ReviewRequest,
  satisfaction: { score: number; feedback?: string }
): Promise<void> {
  "use step";

  console.log(`[Reviews] Handling negative feedback for ${request.patientId}`);

  // Alert clinic staff for follow-up
  // In production, send notification to admin
  console.log(`[Reviews] Alert: Patient ${request.patientName} gave ${satisfaction.score}/5`);
  console.log(`[Reviews] Feedback: ${satisfaction.feedback || "No feedback provided"}`);
}

/**
 * Send review request to patient
 */
async function sendReviewRequest(request: ReviewRequest): Promise<void> {
  "use step";

  const metadata = getStepMetadata();
  console.log(`[Reviews] Sending review request to ${request.patientEmail}`);

  const reviewLinks = {
    google: "https://g.page/r/drsayuj-hyderabad/review",
    practo: "https://www.practo.com/hyderabad/doctor/dr-sayuj-neurosurgeon",
  };

  // In production, send email via Resend/SendGrid
  const emailContent = {
    to: request.patientEmail,
    subject: `How was your experience with Dr. Sayuj, ${request.patientName}?`,
    body: `
      Dear ${request.patientName},

      Thank you for choosing Dr. Sayuj for your ${request.procedureType}.
      
      We hope your recovery is going well. Your feedback helps us serve
      patients in Hyderabad better.

      Please take a moment to share your experience:
      
      ⭐ Leave a Google Review: ${reviewLinks.google}
      
      Thank you for your trust in us.

      Best regards,
      Dr. Sayuj's Clinic
      Kondapur, Hyderabad
    `,
  };

  console.log(`[Reviews] Email sent to ${request.patientEmail}`);
}

/**
 * Send review reminder
 */
async function sendReviewReminder(request: ReviewRequest): Promise<void> {
  "use step";

  console.log(`[Reviews] Sending reminder to ${request.patientEmail}`);

  // Gentler reminder message
  console.log(`[Reviews] Reminder sent`);
}

/**
 * Process submitted review
 */
async function processReviewSubmission(
  webhookRequest: Request
): Promise<ReviewResponse> {
  "use step";

  const data = await webhookRequest.json();
  
  return {
    patientId: data.patientId,
    platform: data.platform || "google",
    rating: data.rating,
    review: data.review,
    videoTestimonial: data.videoTestimonial || false,
  };
}

/**
 * Send thank you message for review
 */
async function sendThankYouMessage(
  request: ReviewRequest,
  review: ReviewResponse
): Promise<void> {
  "use step";

  console.log(`[Reviews] Sending thank you to ${request.patientEmail}`);
  console.log(`[Reviews] Review received: ${review.rating}/5 on ${review.platform}`);
}

/**
 * Request video testimonial from highly satisfied patients
 */
async function requestVideoTestimonial(request: ReviewRequest): Promise<void> {
  "use step";

  console.log(`[Reviews] Requesting video testimonial from ${request.patientName}`);

  // Send video testimonial request with guidelines
  const guidelines = [
    "Keep it 1-2 minutes",
    "Share your condition and how treatment helped",
    "Film in good lighting",
    "You can record at home or visit clinic",
  ];

  console.log(`[Reviews] Video testimonial request sent with guidelines`);
}

/**
 * Daily review monitoring workflow
 */
export async function monitorDailyReviews(): Promise<ReviewStats> {
  "use workflow";
  globalThis.fetch = fetch;

  console.log("[Reviews] Starting daily review monitoring");

  try {
    const [googleReviews, practoReviews, lybrateReviews, websiteReviews] = await Promise.all([
      fetchGoogleReviews(),
      fetchPractoReviews(),
      fetchLybrateReviews(),
      fetchWebsiteTestimonials(),
    ]);

    // Check for new reviews
    const newReviews = [...googleReviews, ...practoReviews, ...lybrateReviews, ...websiteReviews]
      .filter(r => isWithinLast24Hours(r.date));

    // Respond to new reviews
    for (const review of newReviews) {
      if (!review.responded) {
        await respondToReview(review);
      }
    }

    // Calculate stats
    const allReviews = [...googleReviews, ...practoReviews, ...lybrateReviews, ...websiteReviews];
    const stats = calculateReviewStats(allReviews);

    // Alert if negative review
    const negativeReviews = newReviews.filter(r => r.rating <= 3);
    if (negativeReviews.length > 0) {
      await alertNegativeReview(negativeReviews);
    }

    console.log("[Reviews] Daily monitoring complete");
    return stats;
  } catch (error) {
    console.error("[Reviews] Monitoring error:", error);
    throw new FatalError(`Review monitoring failed: ${error}`);
  }
}

interface Review {
  id: string;
  platform: string;
  rating: number;
  text: string;
  author: string;
  date: string;
  responded: boolean;
}

async function fetchGoogleReviews(): Promise<Review[]> {
  "use step";
  
  // In production, use Google Business Profile API
  return [
    {
      id: "g1",
      platform: "google",
      rating: 5,
      text: "Excellent treatment for my slip disc. Dr. Sayuj explained everything clearly.",
      author: "Ramesh K.",
      date: new Date().toISOString(),
      responded: false,
    },
  ];
}

async function fetchPractoReviews(): Promise<Review[]> {
  "use step";
  
  return [];
}

async function fetchLybrateReviews(): Promise<Review[]> {
  "use step";
  
  return [];
}

async function fetchWebsiteTestimonials(): Promise<Review[]> {
  "use step";
  
  return [];
}

function isWithinLast24Hours(dateStr: string): boolean {
  const reviewDate = new Date(dateStr).getTime();
  const now = Date.now();
  return now - reviewDate < 24 * 60 * 60 * 1000;
}

async function respondToReview(review: Review): Promise<void> {
  "use step";

  console.log(`[Reviews] Responding to ${review.platform} review from ${review.author}`);

  const responses = {
    5: `Thank you so much, ${review.author}! We're delighted that your treatment went well. Your kind words motivate our team. Wishing you continued good health! - Dr. Sayuj's Clinic, Hyderabad`,
    4: `Thank you for your feedback, ${review.author}! We're glad we could help. If there's anything more we can do, please let us know. - Dr. Sayuj's Clinic`,
    3: `Thank you for sharing your experience, ${review.author}. We value your feedback and would like to understand how we can improve. Please reach out to us directly. - Dr. Sayuj's Clinic`,
    2: `We're sorry your experience didn't meet expectations, ${review.author}. We'd like to make this right. Please contact us at our clinic so we can address your concerns personally. - Dr. Sayuj's Clinic`,
    1: `We sincerely apologize for your experience, ${review.author}. This isn't the standard we strive for. Please contact us immediately so we can resolve this. - Dr. Sayuj's Clinic`,
  };

  const response = responses[review.rating as keyof typeof responses] || responses[3];
  console.log(`[Reviews] Response: ${response}`);
}

function calculateReviewStats(reviews: Review[]): ReviewStats {
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews || 0;
  
  const platformCounts = new Map<string, { count: number; total: number }>();
  for (const review of reviews) {
    const current = platformCounts.get(review.platform) || { count: 0, total: 0 };
    platformCounts.set(review.platform, {
      count: current.count + 1,
      total: current.total + review.rating,
    });
  }

  const platformBreakdown = Array.from(platformCounts.entries()).map(([platform, data]) => ({
    platform,
    count: data.count,
    avgRating: Math.round((data.total / data.count) * 10) / 10,
  }));

  const respondedCount = reviews.filter(r => r.responded).length;

  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    platformBreakdown,
    recentReviews: reviews.slice(0, 5).map(r => ({
      date: r.date,
      rating: r.rating,
      excerpt: r.text.substring(0, 100) + "...",
    })),
    responseRate: Math.round((respondedCount / totalReviews) * 100),
    sentimentScore: Math.round(averageRating * 20), // Convert to 0-100
  };
}

async function alertNegativeReview(reviews: Review[]): Promise<void> {
  "use step";

  console.log(`[Reviews] ALERT: ${reviews.length} negative review(s) received`);
  
  for (const review of reviews) {
    console.log(`[Reviews] Platform: ${review.platform}, Rating: ${review.rating}/5`);
    console.log(`[Reviews] Author: ${review.author}`);
    console.log(`[Reviews] Text: ${review.text}`);
  }

  // In production, send immediate notification to clinic staff
}

/**
 * Run review collection campaign
 */
export async function runReviewCampaign(
  patients: ReviewRequest[]
): Promise<ReviewCampaignResult> {
  "use workflow";
  globalThis.fetch = fetch;

  const campaignId = `campaign-${Date.now()}`;
  console.log(`[Reviews] Starting campaign ${campaignId} for ${patients.length} patients`);

  let reviewsReceived = 0;
  let totalRating = 0;

  for (const patient of patients) {
    try {
      const result = await requestPatientReview(patient);
      if (result.reviewReceived && result.review) {
        reviewsReceived++;
        totalRating += result.review.rating;
      }
    } catch (error) {
      console.error(`[Reviews] Error for patient ${patient.patientId}:`, error);
    }

    // Rate limit: 1 request per minute
    await sleep("1 minute");
  }

  return {
    campaignId,
    requestsSent: patients.length,
    reviewsReceived,
    averageRating: reviewsReceived > 0 ? totalRating / reviewsReceived : 0,
    conversionRate: Math.round((reviewsReceived / patients.length) * 100),
  };
}

/**
 * Generate review insights for marketing
 */
export async function generateReviewInsights(): Promise<{
  topQuotes: string[];
  commonPraises: string[];
  improvementAreas: string[];
  testimonialCandidates: string[];
}> {
  "use workflow";
  globalThis.fetch = fetch;

  return await analyzeReviewContent();
}

async function analyzeReviewContent(): Promise<{
  topQuotes: string[];
  commonPraises: string[];
  improvementAreas: string[];
  testimonialCandidates: string[];
}> {
  "use step";

  // In production, use NLP to analyze review content
  return {
    topQuotes: [
      "Best neurosurgeon in Hyderabad. Dr. Sayuj's endoscopic surgery changed my life.",
      "Very caring doctor. Explained everything about my brain tumor treatment.",
      "Minimal pain after spine surgery. I was walking the next day!",
    ],
    commonPraises: [
      "Clear communication",
      "Minimally invasive techniques",
      "Quick recovery time",
      "Caring bedside manner",
      "Affordable treatment",
    ],
    improvementAreas: [
      "Waiting time at clinic",
      "Parking availability",
    ],
    testimonialCandidates: [
      "Patient ID: P001 - 5-star Google review, detailed story",
      "Patient ID: P015 - Video testimonial willing",
      "Patient ID: P023 - Recovery success story",
    ],
  };
}
