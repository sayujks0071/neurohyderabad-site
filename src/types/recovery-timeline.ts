/**
 * Recovery Timeline Data Model
 *
 * Canonical schema for AI-generated recovery timelines.
 */

export interface RecoveryDuration {
  label: string;
  startDay?: number;
  endDay?: number;
  startWeek?: number;
  endWeek?: number;
  notes?: string;
}

export interface RecoveryMilestone {
  title: string;
  highlights: string[];
  id?: string;
  summary?: string;
  cautions?: string[];
  callouts?: Array<{
    label: string;
    detail: string;
  }>;
  sortOrder?: number;
}

export interface RecoveryPhase {
  name: string;
  duration: RecoveryDuration;
  milestones: RecoveryMilestone[];
  id?: string;
  displayLabel?: string;
  goals?: string[];
  summary?: string;
  sortOrder?: number;
}

export interface RecoveryPlan {
  title: string;
  description?: string;
  phases: RecoveryPhase[];
  id?: string;
  locale?: string;
  audience?: string;
  lastReviewedAt?: string;
  lastReviewedBy?: string;
  version?: string;
  disclaimer?: string;
}
