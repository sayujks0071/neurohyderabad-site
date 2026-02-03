'use client';

import React from 'react';
import { generateWhatsappUrl, formatDate } from './utils';
import { WhatsAppIcon } from '@/src/components/WhatsAppIcon';
import type { Appointment } from './types';

interface WhatsAppButtonProps {
  appointment: Appointment;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ appointment }) => {
  const hasPhone = Boolean(appointment.patient_phone);

  const handleClick = () => {
    if (!hasPhone) return;

    const url = generateWhatsappUrl({
      id: appointment.id,
      fullName: appointment.patient_name,
      phone: appointment.patient_phone,
      preferredDate: formatDate(appointment.preferred_date),
    });

    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      disabled={!hasPhone}
      className={`flex items-center gap-1 font-medium py-1 px-2 rounded text-xs transition-all duration-200
        ${hasPhone
          ? 'bg-[#25D366] hover:bg-[#128C7E] text-white hover:scale-105 shadow-sm'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      title={hasPhone ? "Click to confirm via WhatsApp" : "No phone number available"}
      aria-label={hasPhone ? "Confirm via WhatsApp" : "WhatsApp confirmation unavailable"}
      data-testid="whatsapp-button"
    >
      <WhatsAppIcon size={14} />
      <span>Confirm via WhatsApp</span>
    </button>
  );
};
