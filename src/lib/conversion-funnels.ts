// Conversion Funnels Configuration for Appointment Booking and SEO Tracking
export const CONVERSION_FUNNELS = {
  // Primary Appointment Booking Funnel
  appointment_booking_funnel: {
    name: "Appointment Booking Funnel",
    description: "Track users through the complete appointment booking process",
    steps: [
      {
        id: "page_view",
        name: "Page View",
        event: "Page_View",
        description: "User visits any page on the site",
        filters: {
          page_type: ["home", "service", "condition", "location", "about"]
        },
        required_properties: ["page_slug", "page_type", "device_type", "traffic_source"]
      },
      {
        id: "cta_click",
        name: "CTA Click",
        event: "CTA_Click",
        description: "User clicks on any CTA button",
        filters: {
          cta_type: ["appointment", "phone", "whatsapp", "contact"]
        },
        required_properties: ["cta_type", "cta_location", "page_slug"]
      },
      {
        id: "appointment_start",
        name: "Appointment Form Start",
        event: "Appointment_Start",
        description: "User begins filling out appointment form",
        filters: {},
        required_properties: ["form_type", "page_slug"]
      },
      {
        id: "appointment_submit",
        name: "Appointment Form Submit",
        event: "Appointment_Submit",
        description: "User submits appointment form",
        filters: {},
        required_properties: ["form_type", "form_completion_time", "page_slug"]
      },
      {
        id: "appointment_success",
        name: "Appointment Confirmed",
        event: "Appointment_Success",
        description: "Appointment is successfully booked",
        filters: {},
        required_properties: ["appointment_id", "appointment_date", "service_type"]
      }
    ],
    segments: [
      {
        name: "Device Type",
        property: "device_type",
        values: ["desktop", "mobile", "tablet"]
      },
      {
        name: "Traffic Source",
        property: "traffic_source",
        values: ["organic", "paid", "direct", "referral", "social"]
      },
      {
        name: "Page Type",
        property: "page_type",
        values: ["home", "service", "condition", "location", "about"]
      },
      {
        name: "Service Interest",
        property: "service_type",
        values: ["spine_surgery", "brain_surgery", "epilepsy", "trigeminal_neuralgia"]
      }
    ],
    kpis: [
      {
        name: "Overall Conversion Rate",
        calculation: "appointment_success / page_view",
        target: 0.05,
        description: "Percentage of page visitors who book appointments"
      },
      {
        name: "CTA Click Rate",
        calculation: "cta_click / page_view",
        target: 0.15,
        description: "Percentage of visitors who click CTAs"
      },
      {
        name: "Form Completion Rate",
        calculation: "appointment_submit / appointment_start",
        target: 0.70,
        description: "Percentage of form starters who complete the form"
      },
      {
        name: "Booking Success Rate",
        calculation: "appointment_success / appointment_submit",
        target: 0.95,
        description: "Percentage of form submissions that result in confirmed appointments"
      }
    ]
  },

  // SEO Engagement Funnel
  seo_engagement_funnel: {
    name: "SEO Engagement Funnel",
    description: "Track user engagement with SEO-optimized content",
    steps: [
      {
        id: "organic_landing",
        name: "Organic Landing",
        event: "Page_View",
        description: "User lands from organic search",
        filters: {
          traffic_source: "organic"
        },
        required_properties: ["page_slug", "search_query", "search_position"]
      },
      {
        id: "content_engagement",
        name: "Content Engagement",
        event: "Scroll_Depth",
        description: "User engages with content (scrolls > 50%)",
        filters: {
          scroll_depth: { min: 50 }
        },
        required_properties: ["scroll_depth", "time_on_page"]
      },
      {
        id: "faq_interaction",
        name: "FAQ Interaction",
        event: "FAQ_Toggle",
        description: "User interacts with FAQ section",
        filters: {},
        required_properties: ["faq_question", "faq_action"]
      },
      {
        id: "internal_navigation",
        name: "Internal Navigation",
        event: "Internal_Link_Click",
        description: "User clicks internal links",
        filters: {},
        required_properties: ["link_destination", "link_context"]
      },
      {
        id: "contact_intent",
        name: "Contact Intent",
        event: "Contact_Intent",
        description: "User shows intent to contact (phone, email, form)",
        filters: {},
        required_properties: ["contact_method", "intent_type"]
      }
    ],
    segments: [
      {
        name: "Search Query Type",
        property: "search_query_type",
        values: ["service_based", "condition_based", "location_based", "doctor_based"]
      },
      {
        name: "Search Position",
        property: "search_position_range",
        values: ["1-3", "4-10", "11-20", "20+"]
      },
      {
        name: "Content Type",
        property: "content_type",
        values: ["service_page", "condition_page", "location_page", "blog_post"]
      }
    ],
    kpis: [
      {
        name: "Organic Engagement Rate",
        calculation: "content_engagement / organic_landing",
        target: 0.40,
        description: "Percentage of organic visitors who engage with content"
      },
      {
        name: "FAQ Interaction Rate",
        calculation: "faq_interaction / content_engagement",
        target: 0.25,
        description: "Percentage of engaged users who interact with FAQs"
      },
      {
        name: "Internal Navigation Rate",
        calculation: "internal_navigation / content_engagement",
        target: 0.30,
        description: "Percentage of engaged users who navigate internally"
      },
      {
        name: "Contact Intent Rate",
        calculation: "contact_intent / organic_landing",
        target: 0.08,
        description: "Percentage of organic visitors who show contact intent"
      }
    ]
  },

  // Trust Pathway Funnel
  trust_pathway_funnel: {
    name: "Trust Pathway Funnel",
    description: "Track user journey through trust-building elements (About, Patient Stories)",
    steps: [
      {
        id: "service_page_view",
        name: "Service Page View",
        event: "Page_View",
        description: "User views a service page (e.g., Brain Tumor Surgery)",
        filters: {
          page_type: ["service"]
        },
        required_properties: ["page_slug", "service_type"]
      },
      {
        id: "trust_signal_view",
        name: "Trust Signal View",
        event: "Trust_Signal_View",
        description: "User sees TrustProof component or trust signals",
        filters: {},
        required_properties: ["trust_signal_type", "service_type"]
      },
      {
        id: "trust_signal_click",
        name: "Trust Signal Click",
        event: "Trust_Signal_Click",
        description: "User clicks on trust signal (About link, Patient Story, etc.)",
        filters: {},
        required_properties: ["trust_signal_type", "destination"]
      },
      {
        id: "about_page_view",
        name: "About Page View",
        event: "Page_View",
        description: "User views About page",
        filters: {
          page_slug: ["/about"]
        },
        required_properties: ["page_slug"]
      },
      {
        id: "patient_stories_view",
        name: "Patient Stories View",
        event: "Page_View",
        description: "User views Patient Stories page or individual story",
        filters: {
          page_type: ["patient_stories"]
        },
        required_properties: ["page_slug"]
      },
      {
        id: "trust_pathway_complete",
        name: "Trust Pathway Complete",
        event: "Trust_Pathway_Complete",
        description: "User completes trust pathway (views About or Patient Stories)",
        filters: {},
        required_properties: ["pathway_type", "time_spent_seconds"]
      },
      {
        id: "conversion_after_trust",
        name: "Conversion After Trust",
        event: "Appointment_Start",
        description: "User starts appointment booking after viewing trust signals",
        filters: {},
        required_properties: ["page_slug", "form_type"]
      }
    ],
    segments: [
      {
        name: "Service Type",
        property: "service_type",
        values: ["spine", "brain", "epilepsy", "all"]
      },
      {
        name: "Trust Signal Type",
        property: "trust_signal_type",
        values: ["about_credentials", "patient_story", "all_patient_stories", "trust_proof_component"]
      },
      {
        name: "Pathway Type",
        property: "pathway_type",
        values: ["about", "patient_stories"]
      }
    ],
    kpis: [
      {
        name: "Trust Signal Engagement Rate",
        calculation: "trust_signal_click / trust_signal_view",
        target: 0.25,
        description: "Percentage of users who click trust signals after viewing"
      },
      {
        name: "Trust Pathway Completion Rate",
        calculation: "trust_pathway_complete / trust_signal_click",
        target: 0.60,
        description: "Percentage of users who complete trust pathway after clicking"
      },
      {
        name: "Conversion After Trust Rate",
        calculation: "conversion_after_trust / trust_pathway_complete",
        target: 0.15,
        description: "Percentage of users who convert after completing trust pathway"
      },
      {
        name: "Overall Trust-to-Conversion Rate",
        calculation: "conversion_after_trust / service_page_view",
        target: 0.05,
        description: "Percentage of service page visitors who convert after trust pathway"
      }
    ]
  },

  // Local SEO Funnel
  local_seo_funnel: {
    name: "Local SEO Funnel",
    description: "Track local search performance and conversions",
    steps: [
      {
        id: "local_search_impression",
        name: "Local Search Impression",
        event: "Local_Search_Impression",
        description: "Site appears in local search results",
        filters: {
          search_type: "local"
        },
        required_properties: ["search_query", "location", "search_position"]
      },
      {
        id: "local_search_click",
        name: "Local Search Click",
        event: "Local_Search_Click",
        description: "User clicks on local search result",
        filters: {},
        required_properties: ["search_query", "location", "search_position"]
      },
      {
        id: "location_page_view",
        name: "Location Page View",
        event: "Page_View",
        description: "User views location-specific page",
        filters: {
          page_type: "location"
        },
        required_properties: ["location", "page_slug"]
      },
      {
        id: "directions_click",
        name: "Directions Click",
        event: "Directions_Click",
        description: "User clicks for directions",
        filters: {},
        required_properties: ["location", "click_source"]
      },
      {
        id: "local_contact",
        name: "Local Contact",
        event: "Local_Contact",
        description: "User contacts from local search",
        filters: {},
        required_properties: ["contact_method", "location", "service_type"]
      }
    ],
    segments: [
      {
        name: "Location",
        property: "location",
        values: ["hyderabad", "jubilee_hills", "banjara_hills", "hitech_city", "gachibowli", "secunderabad"]
      },
      {
        name: "Service Type",
        property: "service_type",
        values: ["spine_surgery", "brain_surgery", "epilepsy", "trigeminal_neuralgia"]
      },
      {
        name: "Search Device",
        property: "search_device",
        values: ["desktop", "mobile", "tablet"]
      }
    ],
    kpis: [
      {
        name: "Local Click-Through Rate",
        calculation: "local_search_click / local_search_impression",
        target: 0.12,
        description: "Percentage of local impressions that result in clicks"
      },
      {
        name: "Local Engagement Rate",
        calculation: "location_page_view / local_search_click",
        target: 0.80,
        description: "Percentage of local clicks that result in page views"
      },
      {
        name: "Directions Request Rate",
        calculation: "directions_click / location_page_view",
        target: 0.15,
        description: "Percentage of location page visitors who request directions"
      },
      {
        name: "Local Conversion Rate",
        calculation: "local_contact / local_search_click",
        target: 0.06,
        description: "Percentage of local clicks that result in contact"
      }
    ]
  }
};

// Funnel Helper Functions
export const funnelHelpers = {
  // Get funnel configuration
  getFunnel: (funnelId: string) => {
    const funnels = CONVERSION_FUNNELS as any;
    return funnels[funnelId] || null;
  },

  // Calculate funnel metrics
  calculateFunnelMetrics: (funnelId: string, data: any) => {
    const funnel = funnelHelpers.getFunnel(funnelId);
    if (!funnel) return null;

    const metrics: any = {};
    
    // Calculate step conversion rates
    for (let i = 0; i < funnel.steps.length - 1; i++) {
      const currentStep = funnel.steps[i];
      const nextStep = funnel.steps[i + 1];
      
      const currentCount = data[currentStep.id] || 0;
      const nextCount = data[nextStep.id] || 0;
      
      metrics[`${currentStep.id}_to_${nextStep.id}_rate`] = currentCount > 0 ? nextCount / currentCount : 0;
    }

    // Calculate overall conversion rate
    const firstStep = funnel.steps[0];
    const lastStep = funnel.steps[funnel.steps.length - 1];
    const firstCount = data[firstStep.id] || 0;
    const lastCount = data[lastStep.id] || 0;
    
    metrics.overall_conversion_rate = firstCount > 0 ? lastCount / firstCount : 0;

    return metrics;
  },

  // Get funnel performance by segment
  getFunnelPerformanceBySegment: (funnelId: string, segment: string, data: any) => {
    const funnel = funnelHelpers.getFunnel(funnelId);
    if (!funnel) return null;

    const segmentData: any = {};
    
    // Group data by segment
    for (const step of funnel.steps) {
      segmentData[step.id] = {};
      for (const value of funnel.segments.find((s: any) => s.property === segment)?.values || []) {
        segmentData[step.id][value] = data[step.id]?.[value] || 0;
      }
    }

    return segmentData;
  },

  // Identify funnel bottlenecks
  identifyBottlenecks: (funnelId: string, data: any) => {
    const funnel = funnelHelpers.getFunnel(funnelId);
    if (!funnel) return [];

    const bottlenecks = [];
    
    for (let i = 0; i < funnel.steps.length - 1; i++) {
      const currentStep = funnel.steps[i];
      const nextStep = funnel.steps[i + 1];
      
      const currentCount = data[currentStep.id] || 0;
      const nextCount = data[nextStep.id] || 0;
      const conversionRate = currentCount > 0 ? nextCount / currentCount : 0;
      
      // Identify steps with conversion rate below 50%
      if (conversionRate < 0.5) {
        bottlenecks.push({
          step: currentStep.name,
          nextStep: nextStep.name,
          conversionRate: conversionRate,
          dropOff: currentCount - nextCount,
          severity: conversionRate < 0.3 ? "high" : "medium"
        });
      }
    }

    return bottlenecks;
  }
};
