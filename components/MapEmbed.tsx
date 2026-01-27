import React from 'react';
import { LocationMapEmbed } from '@/src/components/locations/LocationMapEmbed';

/**
 * Legacy wrapper for the map embed.
 * Uses the new Single Source of Truth location system.
 * Defaults to Malakpet (Main Hospital).
 */
export default function MapEmbed() {
  return (
    <LocationMapEmbed locationId="malakpet" />
  );
}
