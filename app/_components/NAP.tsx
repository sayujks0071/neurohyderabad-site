import { CLINIC } from '@/app/_lib/clinic';

export default function NAP() {
  return (
    <address className="not-italic text-sm leading-6">
      <strong>{CLINIC.name}</strong><br />
      {CLINIC.opdrm}<br />
      {CLINIC.addr}<br />
      Phone/WhatsApp: <a href={`tel:${CLINIC.phone}`}>{CLINIC.phoneHuman}</a>
    </address>
  );
}
