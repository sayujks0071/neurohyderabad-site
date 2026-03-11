import { initBotId } from 'botid/client/core';

initBotId({
  protect: [
    {
      path: '/api/lead',
      method: 'POST',
    },
    {
      path: '/api/appointments/submit',
      method: 'POST',
    },
  ],
});
