import { CLINIC } from '@/app/_lib/clinic';

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.258094969931!2d78.49575477699536!3d17.37830340220051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99ac8416ae97%3A0x8ac1f3f5da2b5b75!2sYashoda%20Hospitals%20Malakpet!5e0!3m2!1sen!2sin!4v1707040000000!5m2!1sen!2sin';

export default function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <iframe
        title={`${CLINIC.name} on Google Maps`}
        src={GOOGLE_MAPS_URL}
        width="100%"
        height="360"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
