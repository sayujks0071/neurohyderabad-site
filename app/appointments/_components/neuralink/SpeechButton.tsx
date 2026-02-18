"use client";

import { useState } from "react";
import { Volume2, Loader2 } from "lucide-react";
import { generateSpeech } from "./neuralinkApi";
import { playSpeech } from "./audioUtils";

interface SpeechButtonProps {
  text: string;
  className?: string;
  variant?: "light" | "dark";
}

const SpeechButton = ({
  text,
  className = "",
  variant = "dark",
}: SpeechButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying || !text) return;

    setIsPlaying(true);
    try {
      const base64 = await generateSpeech(text);
      if (base64) {
        await playSpeech(base64);
      }
    } catch (err) {
      console.error("Failed to play speech:", err);
    } finally {
      setIsPlaying(false);
    }
  };

  const baseStyles =
    "p-1.5 rounded-lg transition-all flex items-center justify-center disabled:opacity-50 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500";
  const variants = {
    dark: "bg-slate-900 text-white hover:bg-slate-800 border border-slate-700",
    light: "bg-white text-blue-600 hover:bg-blue-50 border border-blue-100",
  };

  return (
    <button
      onClick={handleSpeak}
      disabled={isPlaying}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      title="Listen to AI analysis"
      aria-label="Listen to AI analysis"
      aria-busy={isPlaying}
    >
      {isPlaying ? (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      ) : (
        <Volume2 className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
};

export default SpeechButton;
