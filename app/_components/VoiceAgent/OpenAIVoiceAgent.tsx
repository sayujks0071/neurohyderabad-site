'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';

interface OpenAIVoiceAgentProps {
  onAppointmentData?: (data: AppointmentData) => void;
  onError?: (error: Error) => void;
}

interface AppointmentData {
  name?: string;
  phone?: string;
  email?: string;
  reason?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}

export default function OpenAIVoiceAgent({
  onAppointmentData,
  onError,
}: OpenAIVoiceAgentProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [hasPermission, setHasPermission] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);

  const SYSTEM_INSTRUCTIONS = `You are Priya, a helpful and empathetic AI receptionist for Dr. Sayuj Krishnan's neurosurgery practice at Yashoda Hospital in Malakpet, Hyderabad.

Your responsibilities:
1. Greet patients warmly and professionally
2. Answer questions about Dr. Sayuj's services:
   - Minimally invasive brain surgery
   - Endoscopic spine surgery (over 1,000 procedures)
   - Brain tumor surgery
   - Peripheral nerve surgery
   - Epilepsy surgery
   - Stroke treatment
   - Same-day discharge available for many procedures

3. Help book appointments by collecting:
   - Full name
   - Contact number (mobile preferred)
   - Email address (optional)
   - Reason for visit / condition
   - Preferred date and time
   - Any urgency or special requirements

4. Provide information about the hospital location:
   - Yashoda Hospital, Malakpet, Hyderabad
   - Can help with directions if asked

5. Be empathetic - patients may be anxious about neurological conditions
6. If you don't know something, offer to have the team call them back

When you have collected appointment information, summarize it back to the patient for confirmation.

Speak naturally and conversationally. Keep responses concise (2-3 sentences max) to maintain natural conversation flow.`;

  // Request microphone permission
  const requestMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 24000,
        }
      });
      streamRef.current = stream;
      setHasPermission(true);
      return stream;
    } catch (err) {
      const error = err as Error;
      setError('Microphone access denied. Please allow microphone access to use voice assistant.');
      onError?.(error);
      return null;
    }
  }, [onError]);

  // Initialize audio context
  const initializeAudioContext = useCallback(async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    }
    await audioContextRef.current.resume();
  }, []);

  // Play audio from base64
  const playAudio = useCallback(async (base64Audio: string) => {
    if (!audioContextRef.current) return;

    try {
      const audioData = Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0));
      const audioBuffer = await audioContextRef.current.decodeAudioData(audioData.buffer);

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);

      audioQueueRef.current.push(source);

      source.onended = () => {
        audioQueueRef.current = audioQueueRef.current.filter(s => s !== source);
        if (audioQueueRef.current.length === 0) {
          setIsSpeaking(false);
        }
      };

      setIsSpeaking(true);
      source.start();
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  }, []);

  // Start capturing and sending audio
  const startAudioCapture = useCallback((ws: WebSocket, stream: MediaStream) => {
    if (!audioContextRef.current) return;

    const source = audioContextRef.current.createMediaStreamSource(stream);
    const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);

    source.connect(processor);
    processor.connect(audioContextRef.current.destination);

    processor.onaudioprocess = (e) => {
      // Check WebSocket state directly instead of relying on isListening state
      if (ws.readyState !== WebSocket.OPEN) return;

      const inputData = e.inputBuffer.getChannelData(0);
      const pcm16 = new Int16Array(inputData.length);

      for (let i = 0; i < inputData.length; i++) {
        const s = Math.max(-1, Math.min(1, inputData[i]));
        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }

      // Convert to base64 and send
      try {
        const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
        ws.send(JSON.stringify({
          type: 'input_audio_buffer.append',
          audio: base64,
        }));
      } catch (err) {
        console.error('Error sending audio data:', err);
      }
    };
  }, []);

  // Connect to OpenAI Realtime API
  const connect = useCallback(async () => {
    try {
      setIsInitializing(true);
      setError(null);

      // Request mic permission
      const stream = await requestMicrophonePermission();
      if (!stream) {
        setIsInitializing(false);
        return;
      }

      // Initialize audio context
      await initializeAudioContext();

      // Connect to our API endpoint
      const response = await fetch('/api/voice-agent/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instructions: SYSTEM_INSTRUCTIONS,
          voice: 'alloy', // Options: alloy, echo, fable, onyx, nova, shimmer
          model: 'gpt-4o-realtime-preview',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create voice session');
      }

      const { sessionUrl } = await response.json();

      // Connect WebSocket to OpenAI Realtime API
      const ws = new WebSocket(sessionUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Connected to OpenAI Realtime API');
        setIsConnected(true);
        setIsInitializing(false);
        setError(null);
        setIsListening(true);

        // Start sending audio
        startAudioCapture(ws, stream);
      };

      ws.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case 'response.audio.delta':
              // Play audio chunk
              if (data.delta) {
                await playAudio(data.delta);
              }
              break;

            case 'conversation.item.created':
              if (data.item?.content?.[0]?.transcript) {
                setTranscript(data.item.content[0].transcript);
              }
              break;

            case 'response.done':
              // Extract appointment data if present
              const content = data.response?.output?.[0]?.content;
              if (content) {
                tryExtractAppointmentData(content);
              }
              break;

            case 'error':
              console.error('OpenAI error:', data.error);
              setError(data.error.message || 'An error occurred');
              break;
          }
        } catch (err) {
          console.error('Error processing message:', err);
        }
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('Connection error. Please try again.');
        setIsInitializing(false);
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsListening(false);
        setIsSpeaking(false);
        setIsInitializing(false);
      };

    } catch (err) {
      const error = err as Error;
      console.error('Connection error:', error);
      setError('Failed to connect to voice assistant. Please try again.');
      setIsInitializing(false);
      onError?.(error);
    }
  }, [requestMicrophonePermission, initializeAudioContext, playAudio, startAudioCapture, onError]);

  // Try to extract appointment data from conversation
  const tryExtractAppointmentData = useCallback((text: string) => {
    // Simple extraction logic - could be improved with structured extraction
    const appointmentData: AppointmentData = {};

    // Extract phone numbers
    const phoneMatch = text.match(/\b\d{10}\b|\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/);
    if (phoneMatch) {
      appointmentData.phone = phoneMatch[0];
    }

    // Extract email
    const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) {
      appointmentData.email = emailMatch[0];
    }

    // If we found any data, send it up
    if (Object.keys(appointmentData).length > 0) {
      onAppointmentData?.(appointmentData);
    }
  }, [onAppointmentData]);

  // Disconnect
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    audioQueueRef.current.forEach(source => source.stop());
    audioQueueRef.current = [];

    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return (
    <div className="voice-agent-widget bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">AI Voice Assistant</h3>
        <p className="text-sm text-gray-600">
          {isConnected ? 'Connected - Start talking!' :
           isInitializing ? 'Connecting...' :
           'Click to start voice conversation'}
        </p>
      </div>

      {/* Visual Feedback */}
      <div className="flex justify-center mb-6" aria-hidden="true">
        <div className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
          isListening ? 'bg-green-100 animate-pulse' :
          isSpeaking ? 'bg-blue-100 animate-pulse' :
          isConnected ? 'bg-gray-100' :
          isInitializing ? 'bg-yellow-100' :
          'bg-gray-50'
        }`}>
          <div className={`absolute inset-0 rounded-full ${
            isListening ? 'bg-green-500 opacity-20 animate-ping' :
            isSpeaking ? 'bg-blue-500 opacity-20 animate-ping' : ''
          }`} />

          {isInitializing ? (
            <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin z-10" />
          ) : isListening ? (
            <Mic className="w-12 h-12 text-green-600 z-10" />
          ) : isSpeaking ? (
            <div className="flex gap-1 z-10">
              <div className="w-1 h-8 bg-blue-600 animate-pulse" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-12 bg-blue-600 animate-pulse" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-6 bg-blue-600 animate-pulse" style={{ animationDelay: '300ms' }} />
              <div className="w-1 h-10 bg-blue-600 animate-pulse" style={{ animationDelay: '450ms' }} />
            </div>
          ) : (
            <MicOff className="w-12 h-12 text-gray-400 z-10" />
          )}
        </div>
      </div>

      {/* Status Message */}
      <div
        className="text-center mb-4 min-h-[60px]"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : isInitializing ? (
          <p className="text-sm text-yellow-600 font-medium">Initializing voice assistant...</p>
        ) : isListening ? (
          <p className="text-sm text-green-600 font-medium">Listening...</p>
        ) : isSpeaking ? (
          <p className="text-sm text-blue-600 font-medium">Priya is speaking...</p>
        ) : isConnected ? (
          <p className="text-sm text-gray-600">Ready to help you</p>
        ) : (
          <p className="text-sm text-gray-500">Start a conversation with Priya</p>
        )}

        {transcript && (
          <p className="text-xs text-gray-500 mt-2 italic">&quot;{transcript}&quot;</p>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        {!isConnected && !isInitializing ? (
          <button
            onClick={connect}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
          >
            <Phone className="w-5 h-5" />
            Start Conversation
          </button>
        ) : (
          <button
            onClick={disconnect}
            disabled={isInitializing}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PhoneOff className="w-5 h-5" />
            End Call
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">How to use:</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Click &quot;Start Conversation&quot; to begin</li>
          <li>• Allow microphone access when prompted</li>
          <li>• Speak naturally - Priya will respond in real-time</li>
          <li>• Ask about services, book appointments, or get directions</li>
          <li>• Click &quot;End Call&quot; when finished</li>
        </ul>
      </div>

      {/* Info Badge */}
      <div className="mt-4 text-center">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 112 0v4a1 1 0 11-2 0V9zm1-5a1 1 0 100 2 1 1 0 000-2z"/>
          </svg>
          Powered by OpenAI
        </span>
      </div>

      {/* Fallback Notice */}
      {error && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Try our{' '}
            <Link href="/appointments" className="text-blue-600 hover:underline">
              traditional booking form
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
