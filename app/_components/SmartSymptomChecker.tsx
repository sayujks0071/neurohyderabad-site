'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface SymptomAnalysis {
  urgency: 'emergency' | 'urgent' | 'routine';
  recommendation: string;
  possibleConditions: string[];
  nextSteps: string[];
  emergencyContact: string;
}

/**
 * Smart Symptom Checker Component using Vercel AI SDK
 * 
 * Analyzes symptoms and provides preliminary guidance (not diagnosis)
 */
export default function SmartSymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [duration, setDuration] = useState('');
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptoms.trim()) {
      setError('Please describe your symptoms');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms,
          age: age || undefined,
          gender: gender || undefined,
          duration: duration || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze symptoms');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      console.error('Error analyzing symptoms:', err);
      setError('Failed to analyze symptoms. Please try again or call +91-9778280044');
    } finally {
      setIsLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'bg-[var(--color-error-light)] border-[var(--color-error)] text-[var(--color-error-800)]';
      case 'urgent':
        return 'bg-[var(--color-warning-light)] border-[var(--color-warning)] text-[var(--color-warning-700)]';
      default:
        return 'bg-[var(--color-primary-100)] border-[var(--color-primary-300)] text-[var(--color-primary-800)]';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[var(--color-surface)] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary-800)]">
          Symptom Checker
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Describe your symptoms and get preliminary guidance. This is not a diagnosis - always consult with Dr. Sayuj for proper evaluation.
        </p>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label htmlFor="symptoms" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Describe your symptoms *
            </label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., I've been experiencing severe headaches for the past week, along with dizziness and blurred vision..."
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
              rows={4}
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Age (optional)
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                min="1"
                max="120"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Gender (optional)
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Duration (optional)
              </label>
              <input
                type="text"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 2 weeks"
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !symptoms.trim()}
            aria-busy={isLoading}
            className="w-full bg-[var(--color-primary-500)] text-white px-6 py-3 rounded-lg hover:bg-[var(--color-primary-700)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
            {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
          </button>
        </form>

        <div aria-live="polite">
          {error && (
            <div className="mt-4 p-4 bg-[var(--color-error-light)] border border-[var(--color-error-light)] rounded-lg">
              <p className="text-[var(--color-error-800)] text-sm">{error}</p>
            </div>
          )}

          {analysis && (
            <div className="mt-6 space-y-4">
              <div className={`p-4 border rounded-lg ${getUrgencyColor(analysis.urgency)}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">
                  {analysis.urgency === 'emergency' ? '🚨' : analysis.urgency === 'urgent' ? '⚠️' : 'ℹ️'}
                </span>
                <h3 className="font-bold text-lg capitalize">
                  {analysis.urgency === 'emergency' ? 'Emergency' : analysis.urgency === 'urgent' ? 'Urgent Care Needed' : 'Routine Consultation'}
                </h3>
              </div>
              <p className="text-sm">{analysis.recommendation}</p>
            </div>

            {analysis.possibleConditions.length > 0 && (
              <div className="bg-[var(--color-background)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Possible Related Conditions:</h4>
                <ul className="list-disc list-inside text-sm text-[var(--color-text-secondary)] space-y-1">
                  {analysis.possibleConditions.map((condition, idx) => (
                    <li key={idx}>{condition}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.nextSteps.length > 0 && (
              <div className="bg-[var(--color-primary-50)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--color-primary-800)] mb-2">Recommended Next Steps:</h4>
                <ul className="list-disc list-inside text-sm text-[var(--color-primary-700)] space-y-1">
                  {analysis.nextSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-[var(--color-warning-light)] border border-[var(--color-warning)] p-4 rounded-lg">
              <p className="text-sm text-[var(--color-warning-700)]">
                <strong>Important:</strong> This is preliminary guidance only and does not constitute a medical diagnosis. 
                Always consult with Dr. Sayuj Krishnan for proper evaluation.
              </p>
              {analysis.urgency === 'emergency' && (
                <a
                  href={`tel:${analysis.emergencyContact.replace(/\s/g, '')}`}
                  className="mt-2 inline-block bg-[var(--color-error)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-error-700)] transition-colors"
                >
                  Call Emergency: {analysis.emergencyContact}
                </a>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

