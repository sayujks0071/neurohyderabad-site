// Statsig Dashboards Configuration for SEO and Conversion Analytics
export const STATSIG_DASHBOARDS = {
  // Conversion Dashboard
  conversion_dashboard: {
    name: "Conversion Analytics Dashboard",
    description: "Track conversion metrics and user behavior",
    widgets: [
      {
        id: "conversion_funnel",
        type: "funnel",
        title: "Appointment Booking Funnel",
        description: "Track users through the appointment booking process",
        steps: [
          {
            name: "Page View",
            event: "Page_View",
            filters: { page_type: "home" }
          },
          {
            name: "CTA Click",
            event: "CTA_Click",
            filters: { cta_type: "appointment" }
          },
          {
            name: "Form Start",
            event: "Appointment_Start",
            filters: {}
          },
          {
            name: "Form Submit",
            event: "Appointment_Submit",
            filters: {}
          },
          {
            name: "Booking Success",
            event: "Appointment_Success",
            filters: {}
          }
        ],
        timeRange: "30d",
        breakdown: ["device_type", "traffic_source", "page_type"]
      },
      {
        id: "conversion_rate_by_source",
        type: "line_chart",
        title: "Conversion Rate by Traffic Source",
        description: "Track conversion rates across different traffic sources",
        metric: "conversion_rate",
        dimensions: ["traffic_source", "device_type"],
        timeRange: "30d"
      },
      {
        id: "cta_performance",
        type: "bar_chart",
        title: "CTA Performance",
        description: "Compare performance of different CTA types",
        metric: "cta_click_rate",
        dimensions: ["cta_type", "page_type"],
        timeRange: "7d"
      },
      {
        id: "appointment_volume",
        type: "time_series",
        title: "Appointment Bookings Over Time",
        description: "Track daily appointment booking volume",
        metric: "appointment_bookings",
        timeRange: "30d",
        granularity: "day"
      }
    ],
    alerts: [
      {
        name: "Conversion Rate Drop",
        condition: "conversion_rate < 0.05",
        severity: "high",
        message: "Conversion rate has dropped below 5%"
      },
      {
        name: "High Form Abandonment",
        condition: "form_abandonment_rate > 0.7",
        severity: "medium",
        message: "Form abandonment rate is above 70%"
      }
    ]
  },

  // SEO + Core Web Vitals Dashboard
  seo_cwv_dashboard: {
    name: "SEO & Core Web Vitals Dashboard",
    description: "Monitor SEO performance and Core Web Vitals",
    widgets: [
      {
        id: "core_web_vitals",
        type: "gauge_chart",
        title: "Core Web Vitals Scores",
        description: "Track LCP, FID, and CLS scores",
        metrics: [
          {
            name: "LCP",
            event: "Core_Web_Vitals",
            filters: { metric_type: "LCP" },
            threshold: { good: 2500, needs_improvement: 4000 }
          },
          {
            name: "FID",
            event: "Core_Web_Vitals",
            filters: { metric_type: "FID" },
            threshold: { good: 100, needs_improvement: 300 }
          },
          {
            name: "CLS",
            event: "Core_Web_Vitals",
            filters: { metric_type: "CLS" },
            threshold: { good: 0.1, needs_improvement: 0.25 }
          }
        ],
        timeRange: "7d"
      },
      {
        id: "seo_score_trend",
        type: "line_chart",
        title: "SEO Score Trend",
        description: "Track overall SEO score over time",
        metric: "seo_score",
        dimensions: ["page_type", "device_type"],
        timeRange: "30d"
      },
      {
        id: "page_performance",
        type: "table",
        title: "Page Performance Metrics",
        description: "Detailed performance metrics by page",
        columns: [
          "page_slug",
          "page_load_time",
          "seo_score",
          "word_count",
          "readability_score",
          "lcp",
          "fid",
          "cls"
        ],
        timeRange: "7d",
        sortBy: "seo_score",
        sortOrder: "desc"
      },
      {
        id: "content_quality",
        type: "bar_chart",
        title: "Content Quality Metrics",
        description: "Track content quality across pages",
        metrics: [
          {
            name: "Word Count",
            event: "SEO_Audit_Complete",
            field: "word_count"
          },
          {
            name: "Readability Score",
            event: "SEO_Audit_Complete",
            field: "readability_score"
          }
        ],
        dimensions: ["page_type"],
        timeRange: "7d"
      }
    ],
    alerts: [
      {
        name: "Poor Core Web Vitals",
        condition: "lcp > 4000 OR fid > 300 OR cls > 0.25",
        severity: "high",
        message: "Core Web Vitals scores are poor"
      },
      {
        name: "Low SEO Score",
        condition: "seo_score < 70",
        severity: "medium",
        message: "SEO score is below 70"
      }
    ]
  },

  // Local Behavior Dashboard
  local_behavior_dashboard: {
    name: "Local SEO & Behavior Dashboard",
    description: "Track local SEO performance and user behavior",
    widgets: [
      {
        id: "local_search_performance",
        type: "line_chart",
        title: "Local Search Performance",
        description: "Track local search queries and performance",
        metric: "local_search_queries",
        dimensions: ["city", "service_type"],
        timeRange: "30d"
      },
      {
        id: "location_page_performance",
        type: "table",
        title: "Location Page Performance",
        description: "Performance metrics for location-specific pages",
        columns: [
          "location",
          "page_views",
          "bounce_rate",
          "time_on_page",
          "conversion_rate",
          "local_search_rankings"
        ],
        timeRange: "30d",
        sortBy: "page_views",
        sortOrder: "desc"
      },
      {
        id: "local_cta_performance",
        type: "bar_chart",
        title: "Local CTA Performance",
        description: "Performance of location-specific CTAs",
        metric: "cta_click_rate",
        dimensions: ["location", "cta_type"],
        timeRange: "14d"
      },
      {
        id: "geographic_conversion",
        type: "map",
        title: "Geographic Conversion Map",
        description: "Conversion rates by geographic location",
        metric: "conversion_rate",
        dimensions: ["city", "state"],
        timeRange: "30d"
      }
    ],
    alerts: [
      {
        name: "Low Local Conversion",
        condition: "local_conversion_rate < 0.03",
        severity: "medium",
        message: "Local conversion rate is below 3%"
      }
    ]
  }
};

// Dashboard Helper Functions
export const dashboardHelpers = {
  // Get dashboard configuration
  getDashboard: (dashboardId: string) => {
    const dashboards = STATSIG_DASHBOARDS as any;
    return dashboards[dashboardId] || null;
  },

  // Get widget data
  getWidgetData: (dashboardId: string, widgetId: string, timeRange: string = "7d") => {
    const dashboard = dashboardHelpers.getDashboard(dashboardId);
    if (dashboard) {
      const widget = dashboard.widgets.find((w: any) => w.id === widgetId);
      return widget;
    }
    return null;
  },

  // Check alert conditions
  checkAlerts: (dashboardId: string, metrics: any) => {
    const dashboard = dashboardHelpers.getDashboard(dashboardId);
    if (dashboard && dashboard.alerts) {
      const triggeredAlerts = [];
      for (const alert of dashboard.alerts) {
        // This would evaluate the alert condition against the metrics
        // For now, return a mock implementation
        if (alert.condition.includes("conversion_rate < 0.05") && metrics.conversion_rate < 0.05) {
          triggeredAlerts.push(alert);
        }
      }
      return triggeredAlerts;
    }
    return [];
  },

  // Generate dashboard URL
  generateDashboardUrl: (dashboardId: string, timeRange: string = "7d") => {
    return `https://statsig.com/dashboard/${dashboardId}?timeRange=${timeRange}`;
  }
};
