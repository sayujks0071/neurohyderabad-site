-- =====================================================
-- Neurohyderabad Database Schema
-- Neon Serverless PostgreSQL
-- =====================================================

-- =====================================================
-- 1. ANALYTICS & TRACKING
-- =====================================================

CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL, -- e.g. 'page-view', 'conversion', 'booking-started'
  page_path VARCHAR(2048) NOT NULL,
  session_id VARCHAR(100),
  user_agent TEXT,
  referrer TEXT,
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

  -- Enriched Data
  is_mobile BOOLEAN,
  is_tablet BOOLEAN,
  browser VARCHAR(50),
  os VARCHAR(50),

  page_category VARCHAR(50),
  user_intent VARCHAR(50),

  -- Metadata
  meta JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics_events(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);

-- =====================================================
-- 2. APPOINTMENTS & BOOKINGS
-- =====================================================

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Patient Info
  patient_name VARCHAR(255) NOT NULL,
  patient_email VARCHAR(255) NOT NULL,
  patient_phone VARCHAR(20) NOT NULL,
  patient_age INTEGER,
  patient_gender VARCHAR(20),
  
  -- Appointment Details
  preferred_date DATE NOT NULL,
  preferred_time TIME,
  appointment_type VARCHAR(100), -- 'consultation', 'follow-up', 'surgery-consultation', etc.
  chief_complaint TEXT NOT NULL,
  intake_notes TEXT,
  pain_score INTEGER CHECK (pain_score >= 0 AND pain_score <= 10),
  mri_scan_available BOOLEAN DEFAULT FALSE,
  has_emergency_symptoms BOOLEAN DEFAULT FALSE,
  
  -- Status & Workflow
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, completed, cancelled, no-show
  workflow_run_id VARCHAR(255), -- Vercel Workflow run ID
  confirmation_message TEXT,
  used_ai_confirmation BOOLEAN DEFAULT FALSE,
  
  -- Source Tracking
  source VARCHAR(100), -- 'website', 'google', 'referral', etc.
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(patient_email);
CREATE INDEX IF NOT EXISTS idx_appointments_phone ON appointments(patient_phone);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created ON appointments(created_at DESC);

-- =====================================================
-- 3. PATIENT CRM / LEADS
-- =====================================================

CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  
  -- Demographics
  age INTEGER,
  gender VARCHAR(20),
  location VARCHAR(255), -- Hyderabad locality
  
  -- Insurance & Emergency
  insurance_provider VARCHAR(100),
  insurance_policy_number VARCHAR(100),
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  
  -- Medical Context
  primary_condition VARCHAR(255),
  conditions JSONB DEFAULT '[]'::jsonb, -- Array of conditions
  
  -- Engagement
  first_contact_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  last_contact_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  total_appointments INTEGER DEFAULT 0,
  completed_appointments INTEGER DEFAULT 0,
  
  -- Lead Scoring
  lead_score INTEGER DEFAULT 0,
  lead_status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, converted, lost
  
  -- Preferences
  preferred_contact_method VARCHAR(20) DEFAULT 'phone', -- phone, email, whatsapp
  language_preference VARCHAR(20) DEFAULT 'english',
  
  -- Source
  acquisition_source VARCHAR(100),
  referral_source VARCHAR(255),
  
  -- Notes
  notes TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON patients(phone);
CREATE INDEX IF NOT EXISTS idx_patients_lead_status ON patients(lead_status);
CREATE INDEX IF NOT EXISTS idx_patients_condition ON patients(primary_condition);

-- =====================================================
-- 4. PATIENT REVIEWS & TESTIMONIALS
-- =====================================================

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Patient Reference (optional - can be anonymous)
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  patient_name VARCHAR(255),
  
  -- Review Content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  treatment_type VARCHAR(255),
  
  -- Platform Info
  platform VARCHAR(50) DEFAULT 'website', -- website, google, practo, justdial
  external_review_id VARCHAR(255), -- ID from external platform
  external_url TEXT,
  
  -- Moderation
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, featured
  is_verified BOOLEAN DEFAULT FALSE,
  is_video_testimonial BOOLEAN DEFAULT FALSE,
  video_url TEXT,
  
  -- Response
  response_text TEXT,
  responded_at TIMESTAMPTZ,
  
  -- Metadata
  review_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_platform ON reviews(platform);
CREATE INDEX IF NOT EXISTS idx_reviews_patient ON reviews(patient_id);

-- =====================================================
-- 5. SEO & CONTENT TRACKING
-- =====================================================

CREATE TABLE IF NOT EXISTS seo_rankings (
  id SERIAL PRIMARY KEY,
  
  keyword VARCHAR(255) NOT NULL,
  position INTEGER,
  previous_position INTEGER,
  search_volume INTEGER,
  
  -- Location targeting
  location VARCHAR(100) DEFAULT 'Hyderabad',
  
  -- URL that ranks
  ranking_url TEXT,
  
  -- Competitor data
  competitor_positions JSONB DEFAULT '{}'::jsonb,
  
  tracked_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_seo_keyword ON seo_rankings(keyword);
CREATE INDEX IF NOT EXISTS idx_seo_tracked ON seo_rankings(tracked_at DESC);

CREATE TABLE IF NOT EXISTS content_performance (
  id SERIAL PRIMARY KEY,
  
  page_path VARCHAR(2048) NOT NULL,
  page_title VARCHAR(500),
  
  -- Traffic metrics
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  avg_time_on_page INTEGER, -- seconds
  bounce_rate DECIMAL(5,2),
  
  -- Conversion metrics
  appointment_conversions INTEGER DEFAULT 0,
  call_clicks INTEGER DEFAULT 0,
  
  -- SEO metrics
  organic_traffic INTEGER DEFAULT 0,
  top_keywords JSONB DEFAULT '[]'::jsonb,
  
  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_content_path ON content_performance(page_path);
CREATE INDEX IF NOT EXISTS idx_content_period ON content_performance(period_start, period_end);

-- =====================================================
-- 6. WORKFLOW RUNS & LOGS
-- =====================================================

CREATE TABLE IF NOT EXISTS workflow_runs (
  id VARCHAR(255) PRIMARY KEY, -- Vercel Workflow run ID
  
  workflow_name VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'running', -- running, completed, failed, cancelled
  
  -- Input/Output
  input_data JSONB,
  output_data JSONB,
  error_message TEXT,
  
  -- Timing
  started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMPTZ,
  duration_ms INTEGER,
  
  -- Metadata
  triggered_by VARCHAR(100), -- 'cron', 'api', 'webhook', 'user'
  meta JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_workflow_name ON workflow_runs(workflow_name);
CREATE INDEX IF NOT EXISTS idx_workflow_status ON workflow_runs(status);
CREATE INDEX IF NOT EXISTS idx_workflow_started ON workflow_runs(started_at DESC);

-- =====================================================
-- 7. NOTIFICATIONS & COMMUNICATIONS LOG
-- =====================================================

CREATE TABLE IF NOT EXISTS communications_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Recipient
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  recipient_email VARCHAR(255),
  recipient_phone VARCHAR(20),
  
  -- Message Details
  channel VARCHAR(50) NOT NULL, -- email, sms, whatsapp, push
  message_type VARCHAR(100) NOT NULL, -- appointment-confirmation, reminder, follow-up, marketing
  subject VARCHAR(500),
  content TEXT,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- pending, sent, delivered, failed, bounced
  external_message_id VARCHAR(255), -- Resend/Twilio message ID
  error_message TEXT,
  
  -- Tracking
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_comms_patient ON communications_log(patient_id);
CREATE INDEX IF NOT EXISTS idx_comms_channel ON communications_log(channel);
CREATE INDEX IF NOT EXISTS idx_comms_type ON communications_log(message_type);
CREATE INDEX IF NOT EXISTS idx_comms_status ON communications_log(status);

-- =====================================================
-- 8. SITE HEALTH & MONITORING
-- =====================================================

CREATE TABLE IF NOT EXISTS site_health_checks (
  id SERIAL PRIMARY KEY,
  
  check_type VARCHAR(50) NOT NULL, -- uptime, performance, ssl, api
  endpoint VARCHAR(2048),
  
  -- Results
  status VARCHAR(50) NOT NULL, -- healthy, degraded, down
  response_time_ms INTEGER,
  status_code INTEGER,
  
  -- Performance metrics
  ttfb_ms INTEGER, -- Time to First Byte
  fcp_ms INTEGER, -- First Contentful Paint
  lcp_ms INTEGER, -- Largest Contentful Paint
  
  -- Details
  error_message TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  
  checked_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_health_type ON site_health_checks(check_type);
CREATE INDEX IF NOT EXISTS idx_health_status ON site_health_checks(status);
CREATE INDEX IF NOT EXISTS idx_health_checked ON site_health_checks(checked_at DESC);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to relevant tables
DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_patients_updated_at ON patients;
CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
