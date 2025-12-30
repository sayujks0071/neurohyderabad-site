'use client';

import { useEffect, useState } from 'react';
import type { UTMChannel } from '@/lib/utm-generator';

interface ServiceUTMLinks {
  serviceName: string;
  serviceSlug: string;
  canonicalUrl: string;
  campaign: string;
  links: Record<UTMChannel, string>;
}

interface UTMLinksResponse {
  services: ServiceUTMLinks[];
  common: {
    appointments: string;
    contact: string;
    about: string;
  };
  channels: UTMChannel[];
  metadata: {
    generated_at: string;
    total_services: number;
    base_url: string;
  };
}

const CHANNEL_LABELS: Record<UTMChannel, string> = {
  gbp: 'Google Business Profile',
  instagram: 'Instagram Bio',
  youtube: 'YouTube Video',
  linkedin: 'LinkedIn Profile',
  whatsapp: 'WhatsApp Chat'
};

export default function UTMLinksPage() {
  const [utmLinks, setUtmLinks] = useState<UTMLinksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUTMLinks = async () => {
      try {
        const response = await fetch('/api/utm-links');
        if (!response.ok) {
          throw new Error('Failed to fetch UTM links');
        }
        const data = await response.json();
        setUtmLinks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUTMLinks();
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading UTM links...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error Loading UTM Links</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!utmLinks) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">No UTM Links Found</h1>
          <p className="text-gray-600">Unable to load UTM links data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Multi-Channel Service UTM Links
            </h1>
            <p className="text-gray-600">
              Trackable URLs for Google Business Profile, social profiles, and messaging funnels
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Generated: {new Date(utmLinks.metadata.generated_at).toLocaleString()}
            </div>
          </div>

          {/* Service Links */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Service Pages ({utmLinks.metadata.total_services})
            </h2>
            <div className="grid gap-6">
              {utmLinks.services.map((service) => {
                const channelOrder = utmLinks.channels?.length
                  ? utmLinks.channels
                  : (Object.keys(service.links) as UTMChannel[]);

                return (
                  <div
                    key={service.serviceSlug}
                    className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {service.serviceName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Campaign:{' '}
                          <span className="font-mono text-gray-600">{service.campaign}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Canonical:{' '}
                          <a
                            href={service.canonicalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {service.canonicalUrl}
                          </a>
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(service.canonicalUrl)}
                        className="self-start px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
                      >
                        Copy Canonical
                      </button>
                    </div>

                    <div className="mt-4 grid gap-4">
                      {channelOrder.map((channel) => {
                        const link = service.links[channel];
                        if (!link) {
                          return null;
                        }

                        return (
                          <div
                            key={channel}
                            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                          >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-800 mb-2">
                                  {CHANNEL_LABELS[channel]}
                                </p>
                                <div className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-700 break-all">
                                  {link}
                                </div>
                              </div>
                              <button
                                onClick={() => copyToClipboard(link)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                              >
                                Copy Link
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Common Pages */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Common Pages
            </h2>
            <div className="grid gap-4">
              {Object.entries(utmLinks.common).map(([pageName, link]) => (
                <div
                  key={pageName}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2 capitalize">{pageName}</h3>
                      <div className="bg-gray-100 p-3 rounded text-sm font-mono text-gray-700 break-all">
                        {link}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(link)}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              How to Use These Links
            </h3>
            <div className="text-blue-700 space-y-2">
              <p><strong>1. Google Business Profile:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Assign each service card to your GBP service entries</li>
                <li>Paste the Google Business Profile link to track GBP-origin traffic</li>
              </ul>

              <p className="mt-4"><strong>2. Social Profiles & Video:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Use Instagram links in the bio or link-in-bio tools</li>
                <li>Add YouTube links to video descriptions and pinned comments</li>
                <li>Place LinkedIn links in the profile CTA button or featured section</li>
              </ul>

              <p className="mt-4"><strong>3. Messaging Funnels:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Share WhatsApp links in direct chats or broadcast lists</li>
                <li>Monitor conversion events in analytics dashboards for each campaign</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
