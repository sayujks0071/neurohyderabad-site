import { initBotId } from 'botid/client/core';

/**
 * BotID Client-Side Protection
 * Protects sensitive API endpoints from bot attacks
 */
initBotId({
  protect: [
    // Appointment booking endpoints
    {
      path: '/api/appointments/submit',
      method: 'POST',
    },
    {
      path: '/api/workflows/booking',
      method: 'POST',
    },
    {
      path: '/api/ai-booking',
      method: 'POST',
    },
    // AI chat endpoints
    {
      path: '/api/ai/chat',
      method: 'POST',
    },
    {
      path: '/api/openai-chat',
      method: 'POST',
    },
    {
      path: '/api/openai-agents-simple',
      method: 'POST',
    },
    // Contact form endpoints
    {
      path: '/api/contact',
      method: 'POST',
    },
    {
      path: '/api/email/appointment',
      method: 'POST',
    },
    // Medical document search endpoints
    {
      path: '/api/gemini-files/search',
      method: 'POST',
    },
    {
      path: '/api/gemini-files/upload',
      method: 'POST',
    },
    // Symptom checker endpoints
    {
      path: '/api/ai/symptoms',
      method: 'POST',
    },
    {
      path: '/api/ai-diagnostic',
      method: 'POST',
    },
    // Predictive scheduling
    {
      path: '/api/ai/predictive-scheduling',
      method: 'POST',
    },
  ],
});


