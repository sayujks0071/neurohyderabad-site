'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

export default function SciaticaSelfTest() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    belowKnee: null,
    numbness: null,
    sitting: null
  });
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 'belowKnee',
      text: 'Does the pain shoot down below your knee?'
    },
    {
      id: 'numbness',
      text: 'Do you feel numbness, tingling, or weakness in your leg or foot?'
    },
    {
      id: 'sitting',
      text: 'Does the pain get worse when sitting, coughing, or sneezing?'
    }
  ];

  const handleAnswer = (id: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const calculateRisk = () => {
    const yesCount = Object.values(answers).filter(val => val === true).length;
    setShowResult(true);
    return yesCount;
  };

  const yesCount = Object.values(answers).filter(val => val === true).length;
  const isComplete = Object.values(answers).every(val => val !== null);

  return (
    <div className="my-12 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6" />
          Sciatica Self-Check
        </h3>
        <p className="text-blue-100 text-sm mt-1">Answer 3 quick questions to check your probability</p>
      </div>

      <div className="p-6 md:p-8">
        {!showResult ? (
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="space-y-3">
                <p className="font-medium text-gray-800 text-lg">{q.text}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAnswer(q.id, true)}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-medium ${
                      answers[q.id] === true
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-inner'
                        : 'border-gray-200 hover:border-blue-300 text-gray-600'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(q.id, false)}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-medium ${
                      answers[q.id] === false
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-inner'
                        : 'border-gray-200 hover:border-blue-300 text-gray-600'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={calculateRisk}
              disabled={!isComplete}
              className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              See Result
            </button>
          </div>
        ) : (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            {yesCount >= 2 ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-2xl font-bold text-red-700">High Probability of Sciatica</h4>
                <p className="text-gray-600">
                  Your symptoms strongly match those of nerve root compression. Early diagnosis can prevent permanent nerve damage.
                </p>
                <div className="pt-4">
                  <Link
                    href="/appointments"
                    className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-transform hover:scale-105"
                  >
                    Book Diagnostic Consult
                  </Link>
                  <p className="text-xs text-gray-500 mt-2">Recommended: MRI Spine Screening</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-green-700">Low Probability</h4>
                <p className="text-gray-600">
                  Your symptoms may be due to muscle strain or mechanical back pain rather than nerve compression.
                </p>
                <div className="pt-4">
                  <Link
                    href="/blog/sciatica-pain-relief-exercises-hyderabad"
                    className="inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition-transform hover:scale-105"
                  >
                    View Safe Exercises
                  </Link>
                  <p className="text-xs text-gray-500 mt-2">Monitor for 3-5 days. If pain worsens, consult a doctor.</p>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setShowResult(false);
                setAnswers({ belowKnee: null, numbness: null, sitting: null });
              }}
              className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
