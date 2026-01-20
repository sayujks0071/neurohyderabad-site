import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  optimizePackageImports: ["lucide-react"],
  async redirects() {
    return [
      {
        source: "/locations/brain-spine-surgeon-hitech-city",
        destination: "/locations/brain-spine-surgeon-hitec-city",
        permanent: true,
      },
      {
        source: "/neurosurgeon-hitec-city",
        destination: "/neurosurgeon-hitech-city",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
