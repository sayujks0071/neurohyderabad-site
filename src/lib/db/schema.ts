import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  date,
  decimal,
  serial
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// =====================================================
// 1. ANALYTICS EVENTS
// =====================================================

export const analyticsEvents = pgTable('analytics_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventType: varchar('event_type', { length: 50 }).notNull(),
  pagePath: varchar('page_path', { length: 2048 }),
  sessionId: varchar('session_id', { length: 100 }),
  visitorId: varchar('visitor_id', { length: 100 }),
  userId: varchar('user_id', { length: 100 }),
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  isMobile: boolean('is_mobile').default(false),
  pageCategory: varchar('page_category', { length: 50 }),
  userIntent: varchar('user_intent', { length: 50 }),
  meta: jsonb('meta').default(sql`'{}'::jsonb`),
  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow(),
});

// =====================================================
// 2. APPOINTMENT BOOKINGS
// =====================================================

export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientName: varchar('patient_name', { length: 255 }).notNull(),
  patientEmail: varchar('patient_email', { length: 255 }).notNull(),
  patientPhone: varchar('patient_phone', { length: 20 }),
  patientAge: integer('patient_age'),
  patientGender: varchar('patient_gender', { length: 20 }),
  preferredDate: date('preferred_date'),
  preferredTime: varchar('preferred_time', { length: 20 }),
  appointmentType: varchar('appointment_type', { length: 50 }).default('consultation'),
  chiefComplaint: text('chief_complaint'),
  intakeNotes: text('intake_notes'),
  painScore: integer('pain_score'),
  mriScanAvailable: boolean('mri_scan_available').default(false),
  hasEmergencySymptoms: boolean('has_emergency_symptoms').default(false),
  status: varchar('status', { length: 50 }).default('pending'),
  workflowRunId: varchar('workflow_run_id', { length: 255 }),
  confirmationMessage: text('confirmation_message'),
  usedAiConfirmation: boolean('used_ai_confirmation').default(false),
  source: varchar('source', { length: 100 }),
  utmSource: varchar('utm_source', { length: 100 }),
  utmMedium: varchar('utm_medium', { length: 100 }),
  utmCampaign: varchar('utm_campaign', { length: 100 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  confirmedAt: timestamp('confirmed_at', { withTimezone: true }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
});

// =====================================================
// 3. PATIENT CRM / LEADS
// =====================================================

export const patients = pgTable('patients', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique(),
  phone: varchar('phone', { length: 20 }),
  age: integer('age'),
  gender: varchar('gender', { length: 20 }),
  location: varchar('location', { length: 255 }),
  primaryCondition: varchar('primary_condition', { length: 255 }),
  conditions: jsonb('conditions').default(sql`'[]'::jsonb`),
  firstContactDate: timestamp('first_contact_date', { withTimezone: true }).defaultNow(),
  lastContactDate: timestamp('last_contact_date', { withTimezone: true }).defaultNow(),
  totalAppointments: integer('total_appointments').default(0),
  completedAppointments: integer('completed_appointments').default(0),
  leadScore: integer('lead_score').default(0),
  leadStatus: varchar('lead_status', { length: 50 }).default('new'),
  latestPainScore: integer('latest_pain_score'),
  mriScanAvailable: boolean('mri_scan_available').default(false),
  preferredContactMethod: varchar('preferred_contact_method', { length: 20 }).default('phone'),
  languagePreference: varchar('language_preference', { length: 20 }).default('english'),
  acquisitionSource: varchar('acquisition_source', { length: 100 }),
  referralSource: varchar('referral_source', { length: 255 }),
  notes: text('notes'),
  tags: jsonb('tags').default(sql`'[]'::jsonb`),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// =====================================================
// 4. PATIENT REVIEWS & TESTIMONIALS
// =====================================================

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').references(() => patients.id),
  patientName: varchar('patient_name', { length: 255 }),
  rating: integer('rating').notNull(),
  reviewText: text('review_text'),
  treatmentType: varchar('treatment_type', { length: 255 }),
  platform: varchar('platform', { length: 50 }).default('website'),
  externalReviewId: varchar('external_review_id', { length: 255 }),
  externalUrl: text('external_url'),
  status: varchar('status', { length: 50 }).default('pending'),
  isVerified: boolean('is_verified').default(false),
  isVideoTestimonial: boolean('is_video_testimonial').default(false),
  videoUrl: text('video_url'),
  responseText: text('response_text'),
  respondedAt: timestamp('responded_at', { withTimezone: true }),
  reviewDate: date('review_date').defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// =====================================================
// 5. SEO & CONTENT TRACKING
// =====================================================

export const seoRankings = pgTable('seo_rankings', {
  id: serial('id').primaryKey(),
  keyword: varchar('keyword', { length: 255 }).notNull(),
  position: integer('position'),
  previousPosition: integer('previous_position'),
  searchVolume: integer('search_volume'),
  location: varchar('location', { length: 100 }).default('Hyderabad'),
  rankingUrl: text('ranking_url'),
  competitorPositions: jsonb('competitor_positions').default(sql`'{}'::jsonb`),
  trackedAt: timestamp('tracked_at', { withTimezone: true }).defaultNow(),
});

export const contentPerformance = pgTable('content_performance', {
  id: serial('id').primaryKey(),
  pagePath: varchar('page_path', { length: 2048 }).notNull(),
  pageTitle: varchar('page_title', { length: 500 }),
  pageViews: integer('page_views').default(0),
  uniqueVisitors: integer('unique_visitors').default(0),
  avgTimeOnPage: integer('avg_time_on_page'),
  bounceRate: decimal('bounce_rate', { precision: 5, scale: 2 }),
  appointmentConversions: integer('appointment_conversions').default(0),
  callClicks: integer('call_clicks').default(0),
  organicTraffic: integer('organic_traffic').default(0),
  topKeywords: jsonb('top_keywords').default(sql`'[]'::jsonb`),
  periodStart: date('period_start').notNull(),
  periodEnd: date('period_end').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// =====================================================
// 6. WORKFLOW RUNS & LOGS
// =====================================================

export const workflowRuns = pgTable('workflow_runs', {
  id: varchar('id', { length: 255 }).primaryKey(),
  workflowName: varchar('workflow_name', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).default('running'),
  inputData: jsonb('input_data'),
  outputData: jsonb('output_data'),
  errorMessage: text('error_message'),
  startedAt: timestamp('started_at', { withTimezone: true }).defaultNow(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  durationMs: integer('duration_ms'),
  triggeredBy: varchar('triggered_by', { length: 100 }),
  meta: jsonb('meta').default(sql`'{}'::jsonb`),
});

// =====================================================
// 7. NOTIFICATIONS & COMMUNICATIONS LOG
// =====================================================

export const communicationsLog = pgTable('communications_log', {
  id: uuid('id').defaultRandom().primaryKey(),
  patientId: uuid('patient_id').references(() => patients.id),
  recipientEmail: varchar('recipient_email', { length: 255 }),
  recipientPhone: varchar('recipient_phone', { length: 20 }),
  channel: varchar('channel', { length: 50 }).notNull(),
  messageType: varchar('message_type', { length: 100 }).notNull(),
  subject: varchar('subject', { length: 500 }),
  content: text('content'),
  status: varchar('status', { length: 50 }).default('pending'),
  externalMessageId: varchar('external_message_id', { length: 255 }),
  errorMessage: text('error_message'),
  sentAt: timestamp('sent_at', { withTimezone: true }),
  deliveredAt: timestamp('delivered_at', { withTimezone: true }),
  openedAt: timestamp('opened_at', { withTimezone: true }),
  clickedAt: timestamp('clicked_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// =====================================================
// 8. SITE HEALTH & MONITORING
// =====================================================

export const siteHealthChecks = pgTable('site_health_checks', {
  id: serial('id').primaryKey(),
  checkType: varchar('check_type', { length: 50 }).notNull(),
  endpoint: varchar('endpoint', { length: 2048 }),
  status: varchar('status', { length: 50 }).notNull(),
  responseTimeMs: integer('response_time_ms'),
  statusCode: integer('status_code'),
  ttfbMs: integer('ttfb_ms'),
  fcpMs: integer('fcp_ms'),
  lcpMs: integer('lcp_ms'),
  errorMessage: text('error_message'),
  meta: jsonb('meta').default(sql`'{}'::jsonb`),
  checkedAt: timestamp('checked_at', { withTimezone: true }).defaultNow(),
});
