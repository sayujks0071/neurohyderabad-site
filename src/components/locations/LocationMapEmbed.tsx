'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LocationData, getLocationById } from '@/src/data/locations';
import { MapPin, Loader2 } from 'lucide-react';
import Script from 'next/script';

interface LocationMapEmbedProps {
  location?: LocationData;
  locationId?: string;
  mode?: 'location'; // Optional
  className?: string;
  height?: string;
}

const CONFIGURATION = {
  "locations": [
    {"title":"Yashoda Hospitals | Best Hospital in Malakpet","address1":"16-10-29","address2":"Nalgonda X Roads, near New Market Metro station, Jamal Colony, Malakpet, Hyderabad, Telangana 500036, India","coords":{"lat":17.3753412757495,"lng":78.49999799510651},"placeId":"ChIJrc-0BgCZyzsRvCybCuS3I90"}
  ],
  "mapOptions": {"center":{"lat":38.0,"lng":-100.0},"fullscreenControl":true,"mapTypeControl":false,"streetViewControl":false,"zoom":4,"zoomControl":true,"maxZoom":17,"mapId":""},
  "mapsApiKey": "AIzaSyDs0HmqhBJA4pNcQk1PPyCqdM9KFNfRKww",
  "capabilities": {"input":false,"autocomplete":false,"directions":false,"distanceMatrix":false,"details":false,"actions":false}
};

export const LocationMapEmbed: React.FC<LocationMapEmbedProps> = ({
  location: legacyLocation,
  locationId,
  className = '',
  height = '450px'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const location = legacyLocation || (locationId ? getLocationById(locationId) : null);
  const locatorRef = useRef<any>(null);

  useEffect(() => {
    if (isLoaded) {
      const initMap = async () => {
        try {
          // @ts-ignore
          await customElements.whenDefined('gmpx-store-locator');
          if (locatorRef.current) {
            locatorRef.current.configureFromQuickBuilder(CONFIGURATION);
            setIsIframeLoaded(true);
          }
        } catch (error) {
          console.error("Failed to initialize map component", error);
        }
      };

      // We need a small delay or polling if the script isn't loaded yet
      const checkAndInit = () => {
        if (typeof customElements !== 'undefined') {
          initMap();
        } else {
          setTimeout(checkAndInit, 100);
        }
      };

      checkAndInit();
    }
  }, [isLoaded]);

  if (!location) return null;

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden shadow-xl border border-[var(--color-border)] bg-[var(--color-background)] ${className}`} style={{ height }}>
      <style dangerouslySetInnerHTML={{__html: `
        gmpx-store-locator {
          width: 100%;
          height: 100%;
          --gmpx-color-surface: #fff;
          --gmpx-color-on-surface: #212121;
          --gmpx-color-on-surface-variant: #757575;
          --gmpx-color-primary: #1967d2;
          --gmpx-color-outline: #e0e0e0;
          --gmpx-fixed-panel-width-row-layout: 28.5em;
          --gmpx-fixed-panel-height-column-layout: 65%;
          --gmpx-font-family-base: "Roboto", sans-serif;
          --gmpx-font-family-headings: "Roboto", sans-serif;
          --gmpx-font-size-base: 0.875rem;
          --gmpx-hours-color-open: #188038;
          --gmpx-hours-color-closed: #d50000;
          --gmpx-rating-color: #ffb300;
          --gmpx-rating-color-empty: #e0e0e0;
        }
      `}} />

      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-background)] z-10">
          <MapPin className="w-12 h-12 text-[var(--color-primary-500)] mb-4 animate-bounce" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">View Location on Map</h3>
          <p className="text-[var(--color-text-secondary)] mb-6 text-center max-w-md px-4">
            Click below to load the interactive Google Map for {location.name}
          </p>
          <button
            onClick={() => setIsLoaded(true)}
            className="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-700)] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
            aria-label={`Load interactive map for ${location.name}`}
          >
            Load Map
          </button>
        </div>
      )}

      {isLoaded && !isIframeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-background)] z-20 pointer-events-none">
          <Loader2 className="w-8 h-8 text-[var(--color-primary-500)] animate-spin" />
          <span className="sr-only">Loading map...</span>
        </div>
      )}

      {isLoaded && (
        <>
          <Script
            src="https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js"
            type="module"
            strategy="lazyOnload"
          />
          {/* @ts-ignore */}
          <gmpx-api-loader key="AIzaSyDs0HmqhBJA4pNcQk1PPyCqdM9KFNfRKww" solution-channel="GMP_QB_locatorplus_v11_c"></gmpx-api-loader>
          {/* @ts-ignore */}
          <gmpx-store-locator ref={locatorRef} map-id="DEMO_MAP_ID" class="animate-in fade-in duration-500"></gmpx-store-locator>
        </>
      )}
    </div>
  );
};
