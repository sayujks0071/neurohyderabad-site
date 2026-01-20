-- =====================================================
-- Row Level Security (RLS) Policies for Neurohyderabad
-- Run this in Neon SQL Editor to secure your tables
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_health_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_performance ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Create application roles
-- =====================================================

-- Service role: Full access for backend/workflows (uses service key)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'service_role') THEN
    CREATE ROLE service_role NOLOGIN;
  END IF;
END
$$;

-- Anon role: Limited read access for public endpoints
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN;
  END IF;
END
$$;

-- Authenticated role: For logged-in users (future admin dashboard)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN;
  END IF;
END
$$;

-- Grant roles to neondb_owner
GRANT service_role TO neondb_owner;
GRANT anon TO neondb_owner;
GRANT authenticated TO neondb_owner;

-- =====================================================
-- APPOINTMENTS - Service access only (contains PII)
-- =====================================================

-- Service role: Full CRUD
CREATE POLICY "service_full_access_appointments" ON appointments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Patients can view their own appointments (by email)
CREATE POLICY "patients_view_own_appointments" ON appointments
  FOR SELECT
  TO authenticated
  USING (patient_email = current_setting('app.user_email', true));

-- =====================================================
-- PATIENTS - Service access only (contains PII)
-- =====================================================

CREATE POLICY "service_full_access_patients" ON patients
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Patients can view their own profile
CREATE POLICY "patients_view_own_profile" ON patients
  FOR SELECT
  TO authenticated
  USING (email = current_setting('app.user_email', true));

-- =====================================================
-- REVIEWS - Public read, service write
-- =====================================================

-- Anyone can read approved reviews
CREATE POLICY "public_read_approved_reviews" ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved' OR status = 'featured');

-- Service role: Full access
CREATE POLICY "service_full_access_reviews" ON reviews
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- ANALYTICS_EVENTS - Service access only
-- =====================================================

CREATE POLICY "service_full_access_analytics" ON analytics_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- COMMUNICATIONS_LOG - Service access only
-- =====================================================

CREATE POLICY "service_full_access_communications" ON communications_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- WORKFLOW_RUNS - Service access, admin read
-- =====================================================

CREATE POLICY "service_full_access_workflows" ON workflow_runs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Authenticated users can view workflow runs (admin dashboard)
CREATE POLICY "authenticated_read_workflows" ON workflow_runs
  FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- SITE_HEALTH_CHECKS - Public read, service write
-- =====================================================

-- Anyone can read health status (for status page)
CREATE POLICY "public_read_health_checks" ON site_health_checks
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Service role: Full access
CREATE POLICY "service_full_access_health" ON site_health_checks
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- SEO_RANKINGS - Service access only
-- =====================================================

CREATE POLICY "service_full_access_seo" ON seo_rankings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Authenticated users can view SEO data (admin dashboard)
CREATE POLICY "authenticated_read_seo" ON seo_rankings
  FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- CONTENT_PERFORMANCE - Service access only
-- =====================================================

CREATE POLICY "service_full_access_content" ON content_performance
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Authenticated users can view content metrics (admin dashboard)
CREATE POLICY "authenticated_read_content" ON content_performance
  FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- Grant table permissions to roles
-- =====================================================

-- Service role gets everything
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Anon gets limited SELECT
GRANT SELECT ON reviews TO anon;
GRANT SELECT ON site_health_checks TO anon;

-- Authenticated gets SELECT on non-PII tables
GRANT SELECT ON reviews TO authenticated;
GRANT SELECT ON site_health_checks TO authenticated;
GRANT SELECT ON workflow_runs TO authenticated;
GRANT SELECT ON seo_rankings TO authenticated;
GRANT SELECT ON content_performance TO authenticated;

-- =====================================================
-- Helper function to set user context
-- =====================================================

CREATE OR REPLACE FUNCTION set_user_context(user_email TEXT)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.user_email', user_email, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Verification query (run after applying)
-- =====================================================

-- SELECT tablename, rowsecurity 
-- FROM pg_tables 
-- WHERE schemaname = 'public';
