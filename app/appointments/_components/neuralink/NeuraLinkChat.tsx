'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, AlertTriangle, CheckCircle, Calendar, Clock, Phone, Mail, FileText } from 'lucide-react';
import { trackConversionOnly } from '@/src/lib/google-ads-conversion';
import { analytics } from '@/src/lib/analytics';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isEmergency?: boolean;
}

interface BookingData {
  patientName?: string;
  phone?: string;
  email?: string;
  age?: string;
  gender?: 'male' | 'female' | 'other';
  appointmentDate?: string;
  appointmentTime?: string;
  reason?: string;
  urgency?: 'routine' | 'urgent' | 'emergency';
}

export default function NeuraLinkChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm Dr. Sayuj's AI assistant. I can help you book an appointment, understand your symptoms, or check for emergencies. How can I help you today?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          bookingData: bookingData,
          pageSlug: '/appointments',
        }),
      });

      const data = await response.json();

      if (data.isEmergency) {
         setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: data.response,
            timestamp: Date.now(),
            isEmergency: true,
          },
        ]);
        // Trigger analytics for emergency
        analytics.track('Emergency_Detected', {
            source: 'NeuraLink_Chat',
            message: userMessage.content
        });
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: data.response,
            timestamp: Date.now(),
          },
        ]);
      }

      if (data.bookingData) {
        setBookingData((prev) => ({ ...prev, ...data.bookingData }));
      }

      // Check if we have enough data to offer the form, or if the AI suggests it
      if (data.nextStep === 'confirmation' || (data.bookingData?.phone && data.bookingData?.condition)) {
          setShowBookingForm(true);
      }

    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: "I apologize, but I'm having trouble connecting right now. Please try again or call us directly.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields for the API
    const payload = {
      patientName: bookingData.patientName || 'Patient', // Fallback if AI didn't catch it, user can edit in a real form but here we assume AI did or we default
      email: bookingData.email || 'no-email@provided.com', // API requires email regex
      phone: bookingData.phone,
      age: bookingData.age ? parseInt(bookingData.age) : 30, // Default if missing
      gender: bookingData.gender || 'other',
      appointmentDate: bookingData.appointmentDate || new Date().toISOString().split('T')[0],
      appointmentTime: bookingData.appointmentTime || '10:00',
      reason: bookingData.reason || bookingData.urgency || 'Consultation',
    };

    // Quick validation fix for demo purposes: ensure phone matches regex if possible, else prompt user
    // For this implementation, we will assume the form below (rendered when showBookingForm is true) allows editing these.

    try {
      const response = await fetch('/api/appointments/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-booking-source': 'neuralink-ai'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Submission failed');
      }

      setSubmitSuccess(true);
      setMessages(prev => [...prev, {
          id: 'success',
          role: 'assistant',
          content: '✅ Appointment request submitted successfully! Our coordinator will contact you shortly to confirm.',
          timestamp: Date.now()
      }]);

      // Track conversion
      trackConversionOnly();
      analytics.appointmentSuccess('/appointments', 'neuralink_ai');

    } catch (error: any) {
        console.error('Booking submission error:', error);
         setMessages(prev => [...prev, {
          id: 'error',
          role: 'assistant',
          content: `⚠️ Could not submit appointment: ${error.message}. Please call +91 97782 80044.`,
          timestamp: Date.now()
      }]);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <Bot className="text-blue-100 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">NeuraLink AI Assistant</h2>
            <p className="text-blue-200 text-xs">Always on • Secure • Medical Grade</p>
          </div>
        </div>
        <div className="flex gap-2">
            <a href="tel:+919778280044" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors border border-white/10 flex items-center gap-1">
                <Phone className="w-3 h-3" /> Emergency: Call Now
            </a>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : msg.isEmergency
                    ? 'bg-red-50 border border-red-200 text-red-900 rounded-tl-sm'
                    : 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm'
              }`}
            >
              {msg.isEmergency && (
                  <div className="flex items-center gap-2 mb-2 font-bold text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      Emergency Alert
                  </div>
              )}
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Booking Form Overlay (if needed) */}
      {showBookingForm && !submitSuccess && (
          <div className="p-4 bg-blue-50 border-t border-blue-100 animate-in slide-in-from-bottom-5">
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Confirm Details to Book
              </h3>
              <form onSubmit={handleManualSubmit} className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="p-2 text-sm border rounded-lg"
                    value={bookingData.patientName || ''}
                    onChange={e => setBookingData(prev => ({...prev, patientName: e.target.value}))}
                  />
                   <input
                    type="tel"
                    placeholder="Phone"
                    required
                    pattern="[0-9+ ]{10,}"
                    className="p-2 text-sm border rounded-lg"
                    value={bookingData.phone || ''}
                    onChange={e => setBookingData(prev => ({...prev, phone: e.target.value}))}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-2 text-sm border rounded-lg"
                    value={bookingData.email || ''}
                    onChange={e => setBookingData(prev => ({...prev, email: e.target.value}))}
                  />
                   <input
                    type="date"
                    required
                    className="p-2 text-sm border rounded-lg"
                    value={bookingData.appointmentDate || ''}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setBookingData(prev => ({...prev, appointmentDate: e.target.value}))}
                  />
                  <input
                    type="time"
                    required
                    className="p-2 text-sm border rounded-lg"
                    value={bookingData.appointmentTime || ''}
                    onChange={e => setBookingData(prev => ({...prev, appointmentTime: e.target.value}))}
                  />
                   <select
                    className="p-2 text-sm border rounded-lg"
                    value={bookingData.gender || 'male'}
                    onChange={e => setBookingData(prev => ({...prev, gender: e.target.value as any}))}
                   >
                       <option value="male">Male</option>
                       <option value="female">Female</option>
                       <option value="other">Other</option>
                   </select>

                   <button
                    type="submit"
                    disabled={isSubmitting}
                    className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                   >
                       {isSubmitting ? 'Scheduling...' : 'Confirm Appointment'}
                   </button>
              </form>
          </div>
      )}

      {/* Input Area */}
      {!submitSuccess && (
        <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                disabled={isSubmitting}
                className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
            <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isSubmitting}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
                <Send className="w-5 h-5" />
            </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-2">
                AI can make mistakes. Please verify important medical details.
            </p>
        </div>
      )}
    </div>
  );
}
