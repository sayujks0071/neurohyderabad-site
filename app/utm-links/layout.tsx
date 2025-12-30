import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UTM Links | Internal Marketing Tools',
  description: 'Internal tool for generating UTM-tagged links for marketing campaigns',
  robots: {
    index: false,
    follow: false,
  },
};

export default function UTMLinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

