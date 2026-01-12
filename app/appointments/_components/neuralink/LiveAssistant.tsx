"use client";

import { useEffect, useRef, useState } from "react";
import { GoogleGenAI, Modality } from "@google/genai";
import { Mic, MicOff, X, MessageSquare, Volume2, Activity, Brain } from "lucide-react";
import { createBlob, decode, decodeAudioData } from "./audioUtils";

const apiKey =
  process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY ||
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  "";

const LiveAssistant = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState<string>(
    apiKey ? "Ready to talk" : "Voice AI not configured"
  );

  const audioContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  const startSession = async () => {
    if (!apiKey) {
      setStatus("Voice AI not configured");
      return;
    }

    try {
      setIsConnecting(true);
      setStatus("Initializing neural link...");

      const ai = new GoogleGenAI({ apiKey });

      const inputCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputCtx;
      outputContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            setStatus("Active connection established");

            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (event) => {
              const inputData = event.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                if (sessionRef.current) {
                  session.sendRealtimeInput({ media: pcmBlob });
                }
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            const audioData =
              message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outputContextRef.current) {
              const ctx = outputContextRef.current;
              nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                ctx.currentTime
              );

              const audioBuffer = await decodeAudioData(
                decode(audioData),
                ctx,
                24000,
                1
              );
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);

              source.addEventListener("ended", () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach((source) => {
                try {
                  source.stop();
                } catch {
                  // ignore
                }
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (error) => {
            console.error("Live API Error:", error);
            setStatus("Connection lost");
            stopSession();
          },
          onclose: () => {
            stopSession();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
          },
          systemInstruction: `You are the NeuroLink Conversational Assistant for Dr. Sayuj's practice.
          Your goal is to provide real-time, professional support to patients and clinical staff.
          - If a patient is talking, help them understand neurosurgical procedures or guide them through booking.
          - If a doctor or staff member is talking, provide concise medical context or triage summaries based on symptoms they describe.
          - Be empathetic, extremely professional, and precise.
          - Never diagnose, but suggest triage levels based on reported red flags like foot drop, bladder loss, or sudden severe vision changes.
          - Keep responses relatively brief to maintain natural conversation flow.`,
        },
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Failed to start session:", err);
      setStatus("Failed to access microphone");
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (error) {
        console.debug("Error closing session:", error);
      }
      sessionRef.current = null;
    }

    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(console.error);
    }
    if (outputContextRef.current && outputContextRef.current.state !== "closed") {
      outputContextRef.current.close().catch(console.error);
    }
    audioContextRef.current = null;
    outputContextRef.current = null;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsActive(false);
    setIsConnecting(false);
    setStatus(apiKey ? "Ready to talk" : "Voice AI not configured");
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-full max-w-sm animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col ring-1 ring-slate-900/5">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm leading-tight">NeuroLink AI</h4>
              <p className="text-[10px] text-blue-100 uppercase tracking-widest font-bold">
                Live Clinical Voice
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center justify-center space-y-8 bg-slate-50/50">
          <div className="relative">
            {isActive && (
              <div className="absolute inset-0 animate-ping bg-blue-400/20 rounded-full" />
            )}
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
                isActive
                  ? "bg-blue-600 shadow-xl shadow-blue-200 scale-110"
                  : "bg-slate-200"
              }`}
            >
              {isActive ? (
                <div className="flex items-end space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-white rounded-full animate-bounce"
                      style={{
                        height: "2rem",
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: "0.8s",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <MicOff className="w-12 h-12 text-slate-400" />
              )}
            </div>
          </div>

          <div className="text-center space-y-2">
            <h5 className="font-bold text-slate-900">
              {isActive ? "I am listening..." : "Neurosurgical Assistant"}
            </h5>
            <p className="text-sm text-slate-500 font-medium px-4">{status}</p>
          </div>

          <div className="w-full flex gap-3">
            {!isActive ? (
              <button
                onClick={startSession}
                disabled={isConnecting || !apiKey}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center disabled:bg-slate-400"
              >
                {isConnecting ? (
                  <Activity className="w-6 h-6 animate-spin mr-2" />
                ) : (
                  <Mic className="w-6 h-6 mr-2" />
                )}
                Start Conversation
              </button>
            ) : (
              <button
                onClick={stopSession}
                className="w-full py-4 bg-red-50 text-red-600 border border-red-200 rounded-2xl font-bold text-lg hover:bg-red-100 transition-all flex items-center justify-center"
              >
                <MicOff className="w-6 h-6 mr-2" />
                End Session
              </button>
            )}
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-center space-x-4 text-slate-400">
          <div className="flex items-center text-[10px] font-bold uppercase tracking-widest">
            <Volume2 className="w-3 h-3 mr-1" /> HD Audio
          </div>
          <div className="w-1 h-1 bg-slate-300 rounded-full" />
          <div className="flex items-center text-[10px] font-bold uppercase tracking-widest">
            <MessageSquare className="w-3 h-3 mr-1" /> Real-time
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAssistant;
