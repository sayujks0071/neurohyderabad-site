import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Neurosurgeon Near Jubilee Hills, Hyderabad | Dr. Sayuj Krishnan',
  description: 'Expert neurosurgery care near Jubilee Hills, Hyderabad. Advanced brain and spine surgery with Dr. Sayuj Krishnan at Yashoda Hospital.',
  alternates: {
    canonical: 'https://www.drsayuj.info/neurosurgeon-jubilee-hills',
  },
};

export default function NeurosurgeonNearJubileeHillsPage() {
  // Redirect to the correct page
  permanentRedirect('/neurosurgeon-jubilee-hills');
}
