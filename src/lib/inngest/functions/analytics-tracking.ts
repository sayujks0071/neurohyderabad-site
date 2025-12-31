import { inngest } from "@/src/lib/inngest";
import type { Events } from "@/src/lib/inngest";
import { db } from "@/src/lib/db";

// Advanced Analytics and Conversion Tracking
export const analyticsProcessor = inngest.createFunction(
  { id: "analytics-processor" },
  { event: "analytics/page-view" },
  async ({ event, step }) => {
    const { page, userAgent, referrer, timestamp } = event.data;

    // Step 1: Process and enrich analytics data
    const enrichedData = await step.run("enrich-analytics-data", async () => {
      console.log(`Processing analytics for page: ${page}`);
      
      // Extract device and browser info
      const deviceInfo = {
        isMobile: /Mobile|Android|iPhone/i.test(userAgent),
        isTablet: /Tablet|iPad/i.test(userAgent),
        browser: userAgent.includes('Chrome') ? 'Chrome' : 
                userAgent.includes('Firefox') ? 'Firefox' : 
                userAgent.includes('Safari') ? 'Safari' : 'Other',
        os: userAgent.includes('Windows') ? 'Windows' : 
            userAgent.includes('Mac') ? 'macOS' : 
            userAgent.includes('Linux') ? 'Linux' : 'Other'
      };

      // Categorize page type
      const pageCategory = page.includes('/services/') ? 'services' :
                          page.includes('/conditions/') ? 'conditions' :
                          page.includes('/blog/') ? 'blog' :
                          page.includes('/locations/') ? 'locations' :
                          page === '/' ? 'homepage' : 'other';

      // Determine user intent
      const userIntent = page.includes('surgery') ? 'surgery' :
                        page.includes('consultation') ? 'consultation' :
                        page.includes('cost') ? 'pricing' :
                        page.includes('emergency') ? 'emergency' : 'general';

      return {
        ...event.data,
        deviceInfo,
        pageCategory,
        userIntent,
        sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
    });

    // Step 2: Store in analytics database
    await step.run("store-analytics", async () => {
      console.log(`Storing analytics data for ${page}`);

      const { deviceInfo, pageCategory, userIntent, sessionId } = enrichedData;

      if (!db.isConfigured()) {
        console.warn('Database not configured, skipping persistent storage');
        return { stored: false, reason: 'db_not_configured' };
      }

      try {
        const result = await db.query(
          `INSERT INTO analytics_events (
            event_type, page_path, session_id, user_agent, referrer, timestamp,
            is_mobile, is_tablet, browser, os,
            page_category, user_intent
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING id`,
          [
            'page-view',
            page,
            sessionId,
            userAgent,
            referrer,
            new Date(timestamp),
            deviceInfo.isMobile,
            deviceInfo.isTablet,
            deviceInfo.browser,
            deviceInfo.os,
            pageCategory,
            userIntent
          ]
        );

        const recordId = result.rows[0]?.id;
        return { stored: true, recordId: `analytics_${recordId}` };
      } catch (error) {
        console.error('Failed to store analytics data:', error);
        throw error;
      }
    });

    // Step 3: Check for conversion opportunities
    await step.run("check-conversion-opportunities", async () => {
      const highIntentPages = ['/appointments', '/contact', '/services/brain-tumor-surgery'];
      const isHighIntent = highIntentPages.some(highIntentPage => page.includes(highIntentPage));
      
      if (isHighIntent) {
        // Trigger conversion tracking
        await inngest.send({
          name: "analytics/conversion",
          data: {
            conversionType: "page-view",
            page,
            value: 0, // Page view has no direct value
            timestamp,
            userAgent,
            referrer
          }
        });
      }

      return { conversionChecked: true, isHighIntent };
    });

    return {
      success: true,
      page,
      enriched: true,
      stored: true
    };
  }
);

// Conversion Tracking and Lead Scoring
export const conversionTracker = inngest.createFunction(
  { id: "conversion-tracker" },
  { event: "analytics/conversion" },
  async ({ event, step }) => {
    const { conversionType, page, value, timestamp, userAgent, referrer } = event.data;

    // Step 1: Calculate conversion score
    const conversionScore = await step.run("calculate-conversion-score", async () => {
      console.log(`Calculating conversion score for ${conversionType}`);
      
      const baseScores: Record<string, number> = {
        "appointment": 100,
        "consultation": 90,
        "contact-form": 80,
        "phone-call": 75,
        "download": 60,
        "page-view": 10
      };

      const pageMultipliers: Record<string, number> = {
        "/services/brain-tumor-surgery": 1.5,
        "/services/endoscopic-discectomy": 1.3,
        "/appointments": 2.0,
        "/contact": 1.8,
        "/emergency-rehabilitation": 1.7
      };

      const baseScore = baseScores[conversionType] || 10;
      const pageMultiplier = Object.entries(pageMultipliers)
        .find(([pagePath]) => page.includes(pagePath))?.[1] || 1.0;

      return Math.round(baseScore * pageMultiplier);
    });

    // Step 2: Update lead score in CRM
    await step.run("update-lead-score", async () => {
      console.log(`Updating lead score: ${conversionScore}`);
      // TODO: Update CRM with new lead score
      return { leadScoreUpdated: true, newScore: conversionScore };
    });

    // Step 3: Trigger appropriate follow-up based on conversion
    if (conversionType === "appointment" || conversionType === "consultation") {
      await step.run("trigger-high-value-follow-up", async () => {
        console.log(`Triggering high-value follow-up for ${conversionType}`);
        
        await inngest.send({
          name: "patient/journey.started",
          data: {
            patientEmail: "extracted-from-form", // TODO: Extract from form data
            patientName: "Extracted Name", // TODO: Extract from form data
            source: page,
            condition: "to-be-determined", // TODO: Extract from form
            urgency: "high"
          }
        });

        return { followUpTriggered: true };
      });
    }

    // Step 4: Send conversion notification to team
    await step.run("notify-team", async () => {
      console.log(`Notifying team of ${conversionType} conversion`);
      
      const notification = {
        type: "conversion",
        conversionType,
        page,
        score: conversionScore,
        timestamp,
        priority: conversionScore > 80 ? "high" : "medium"
      };

      // TODO: Send notification (Slack, email, etc.)
      console.log("Team notification:", notification);
      return { teamNotified: true };
    });

    return {
      success: true,
      conversionType,
      score: conversionScore,
      followUpTriggered: conversionType === "appointment" || conversionType === "consultation"
    };
  }
);

// SEO and Content Performance Tracking
export const contentPerformanceTracker = inngest.createFunction(
  { id: "content-performance-tracker" },
  { event: "content/performance" },
  async ({ event, step }) => {
    const { contentId, contentType, metrics } = event.data;

    // Step 1: Analyze content performance
    const performanceAnalysis = await step.run("analyze-content-performance", async () => {
      console.log(`Analyzing performance for ${contentType}: ${contentId}`);
      
      const analysis = {
        engagement: metrics.timeOnPage > 120 ? "high" : metrics.timeOnPage > 60 ? "medium" : "low",
        conversion: metrics.conversions > 0 ? "converting" : "non-converting",
        traffic: metrics.pageViews > 1000 ? "high" : metrics.pageViews > 100 ? "medium" : "low",
        bounceRate: metrics.bounceRate < 0.4 ? "good" : metrics.bounceRate < 0.7 ? "average" : "poor"
      };

      return analysis;
    });

    // Step 2: Generate content recommendations
    await step.run("generate-content-recommendations", async () => {
      const recommendations = [];
      
      if (performanceAnalysis.engagement === "low") {
        recommendations.push("Consider adding more interactive elements or improving readability");
      }
      
      if (performanceAnalysis.conversion === "non-converting") {
        recommendations.push("Add more prominent CTAs or improve value proposition");
      }
      
      if (performanceAnalysis.bounceRate === "poor") {
        recommendations.push("Improve page loading speed and content relevance");
      }

      console.log("Content recommendations:", recommendations);
      return { recommendations };
    });

    // Step 3: Update content strategy
    await step.run("update-content-strategy", async () => {
      console.log(`Updating content strategy for ${contentId}`);
      // TODO: Update content management system with insights
      return { strategyUpdated: true };
    });

    return {
      success: true,
      contentId,
      analysis: performanceAnalysis,
      recommendationsGenerated: true
    };
  }
);
