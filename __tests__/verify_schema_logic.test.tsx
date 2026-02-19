// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import MedicalWebPageSchema from '../app/components/schemas/MedicalWebPageSchema';

// Mock locations data
vi.mock('../src/data/locations', () => ({
  SITE_URL: 'https://www.drsayuj.info',
  CANONICAL_PHYSICIAN_NAME: 'Dr. Sayuj Krishnan',
  getLocationById: (id: string) => ({
    id: id,
    name: 'Test Location',
    address: {
      streetAddress: 'Test St',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN'
    }
  })
}));

// Mock SEO lib
vi.mock('../src/lib/seo', () => ({
  SITE_URL: 'https://www.drsayuj.info'
}));

describe('MedicalWebPageSchema', () => {
  it('should render BreadcrumbList schema when breadcrumbs are provided', () => {
    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services/' },
      { name: 'Test Service', path: '/services/test' }
    ];

    const { container } = render(
      <MedicalWebPageSchema
        pageType="service"
        pageSlug="/services/test"
        title="Test Page"
        description="Test Description"
        breadcrumbs={breadcrumbs}
        serviceOrCondition="Test Service"
      />
    );

    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    // Expect 2 scripts: 1 for MedicalWebPage, 1 for BreadcrumbList
    expect(scripts.length).toBe(2);

    let foundBreadcrumb = false;
    scripts.forEach(script => {
      const json = JSON.parse(script.innerHTML);
      if (json['@type'] === 'BreadcrumbList') {
        foundBreadcrumb = true;
        expect(json.itemListElement).toHaveLength(3);
        expect(json.itemListElement[0].name).toBe('Home');
        expect(json.itemListElement[2].name).toBe('Test Service');
        expect(json.itemListElement[2].item).toBe('https://www.drsayuj.info/services/test');
      }
    });

    expect(foundBreadcrumb).toBe(true);
  });

  it('should NOT render BreadcrumbList schema when breadcrumbs are NOT provided', () => {
     const { container } = render(
      <MedicalWebPageSchema
        pageType="service"
        pageSlug="/services/test"
        title="Test Page"
        description="Test Description"
        serviceOrCondition="Test Service"
      />
    );

    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    // Expect 1 script: MedicalWebPage only
    expect(scripts.length).toBe(1);

    const json = JSON.parse(scripts[0].innerHTML);
    expect(json['@type']).toBe('MedicalWebPage');
  });
});
