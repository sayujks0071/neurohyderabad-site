import tracker from '@middleware.io/agent-apm-nextjs';

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    tracker.track({
      serviceName: process.env.MIDDLEWARE_SERVICE_NAME || "neurosurgery-nextjs-site",
      accessToken: process.env.MIDDLEWARE_ACCESS_TOKEN || "",
      target: "vercel",
    });
  }
}

