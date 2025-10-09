declare module '@middleware.io/agent-apm-nextjs' {
  interface TrackerConfig {
    serviceName: string;
    accessToken: string;
    target: string;
  }

  interface Tracker {
    track(config: TrackerConfig): void;
    info(message: string, data?: any): void;
    warn(message: string, data?: any): void;
    error(message: string, data?: any): void;
  }

  const tracker: Tracker;
  export default tracker;
}

