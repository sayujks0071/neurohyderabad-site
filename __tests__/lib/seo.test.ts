import { describe, it, expect } from 'vitest';
import {
  idFor,
  serviceJsonLd,
  medicalGuidelineJsonLd,
  contactPointJsonLd,
  webPageJsonLd,
  itemListJsonLd,
  physicianJsonLd,
  breadcrumbJsonLd,
  conditionJsonLd,
  procedureJsonLd,
  ORGANIZATION_LOGO,
  SITE_URL,
  CONTACT_PHONE,
  CONTACT_EMAIL
} from '@/src/lib/seo';

describe('SEO JSON-LD Generators', () => {
  describe('idFor', () => {
    it('should return a formatted fragment ID', () => {
      expect(idFor('https://example.com', 'test')).toBe('https://example.com#test');
    });
  });

  describe('serviceJsonLd', () => {
    it('should return a valid MedicalService object with default values', () => {
      const props = {
        name: 'Brain Surgery',
        description: 'Advanced brain surgery'
      };
      const result = serviceJsonLd(props);
      expect(result).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'MedicalService',
        name: props.name,
        description: props.description,
        areaServed: {
          '@type': 'Place',
          name: 'Hyderabad, Telangana, India'
        },
        provider: {
          '@type': 'Physician',
          name: 'Dr Sayuj Krishnan S'
        },
        audience: {
          '@type': 'Patient'
        }
      });
    });

    it('should include optional url and id when provided', () => {
      const props = {
        name: 'Brain Surgery',
        description: 'Description',
        url: 'https://example.com/service',
        id: 'https://example.com/service#id'
      };
      const result = serviceJsonLd(props);
      expect(result.url).toBe(props.url);
      expect(result['@id']).toBe(props.id);
    });
  });

  describe('medicalGuidelineJsonLd', () => {
    it('should return a valid MedicalGuideline object', () => {
      const props: any = {
        name: 'Guidelines for Brain Surgery',
        url: 'https://example.com/guidelines',
        subject: {
          name: 'Brain Surgery',
          type: 'MedicalProcedure'
        }
      };
      const result = medicalGuidelineJsonLd(props);
      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'MedicalGuideline',
        name: props.name,
        url: props.url,
        guidelineSubject: {
          '@type': 'MedicalProcedure',
          name: 'Brain Surgery'
        }
      });
    });
  });

  describe('contactPointJsonLd', () => {
    it('should return a valid ContactPoint object with default values', () => {
      const result = contactPointJsonLd();
      expect(result).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'ContactPoint',
        telephone: CONTACT_PHONE,
        contactType: 'customer support',
        areaServed: {
          '@type': 'Place',
          name: 'Hyderabad, Telangana, India'
        },
        availableLanguage: ['en', 'hi', 'te']
      });
    });

    it('should override defaults and include id', () => {
      const props = {
        phone: '+1234567890',
        contactType: 'emergency',
        areaServed: 'Global',
        languages: ['en'],
        id: 'contact-id'
      };
      const result = contactPointJsonLd(props);
      expect(result.telephone).toBe(props.phone);
      expect(result.contactType).toBe(props.contactType);
      expect(result.areaServed.name).toBe(props.areaServed);
      expect(result.availableLanguage).toEqual(props.languages);
      expect(result['@id']).toBe(props.id);
    });
  });

  describe('webPageJsonLd', () => {
    it('should return a valid WebPage object', () => {
      const props = {
        name: 'Home Page',
        description: 'Welcome to our site',
        url: SITE_URL
      };
      const result = webPageJsonLd(props);
      expect(result).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: props.name,
        description: props.description,
        url: props.url
      });
    });

    it('should include all optional fields', () => {
      const props = {
        name: 'Service Page',
        url: 'https://example.com/service',
        datePublished: '2023-01-01',
        dateModified: '2023-01-02',
        mainEntity: { '@type': 'MedicalProcedure', name: 'Procedure' },
        about: { name: 'About' },
        mentions: [{ name: 'Mention' }],
        id: 'page-id'
      };
      const result = webPageJsonLd(props);
      expect(result.datePublished).toBe(props.datePublished);
      expect(result.dateModified).toBe(props.dateModified);
      expect(result.mainEntity).toEqual(props.mainEntity);
      expect(result.about).toEqual(props.about);
      expect(result.mentions).toEqual(props.mentions);
      expect(result['@id']).toBe(props.id);
    });
  });

  describe('itemListJsonLd', () => {
    const items = [
      { name: 'Item 1', url: 'https://example.com/1', description: 'Desc 1' },
      { name: 'Item 2', url: 'https://example.com/2' }
    ];

    it('should return a valid ItemList with default order', () => {
      const result = itemListJsonLd({ name: 'My List', items });
      expect(result['@type']).toBe('ItemList');
      expect(result.name).toBe('My List');
      expect(result.itemListOrder).toBe('https://schema.org/ItemListOrderAscending');
      expect(result.itemListElement).toHaveLength(2);
      expect(result.itemListElement[0]).toMatchObject({
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'WebPage',
          name: 'Item 1',
          url: 'https://example.com/1',
          description: 'Desc 1'
        }
      });
    });

    it('should support descending order and custom id', () => {
      const result = itemListJsonLd({ items, order: 'ItemListOrderDescending', id: 'list-id' });
      expect(result.itemListOrder).toBe('https://schema.org/ItemListOrderDescending');
      expect(result['@id']).toBe('list-id');
    });
  });

  describe('physicianJsonLd', () => {
    it('should return correct Physician profile', () => {
      const result = physicianJsonLd();
      expect(result).toMatchObject({
        '@type': 'Physician',
        name: 'Dr Sayuj Krishnan S',
        url: SITE_URL,
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL
      });
      expect(result.address['@type']).toBe('PostalAddress');
    });
  });

  describe('breadcrumbJsonLd', () => {
    it('should return valid BreadcrumbList', () => {
      const items = [
        { name: 'Home', url: 'https://example.com/' },
        { name: 'Services', url: 'https://example.com/services' }
      ];
      const result = breadcrumbJsonLd(items);
      expect(result).toMatchObject({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://example.com/' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://example.com/services' }
        ]
      });
    });
  });

  describe('conditionJsonLd', () => {
    it('should return valid MedicalCondition', () => {
      const result = conditionJsonLd('Brain Tumor', 'Glioma');
      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'MedicalCondition',
        name: 'Brain Tumor',
        alternateName: 'Glioma'
      });
    });

    it('should work without alternateName', () => {
      const result = conditionJsonLd('Brain Tumor');
      expect(result.alternateName).toBeUndefined();
    });
  });

  describe('procedureJsonLd', () => {
    it('should return valid MedicalProcedure with all fields', () => {
      const props = {
        name: 'Craniotomy',
        description: 'Brain surgery',
        bodyLocation: 'Brain',
        preparation: 'Fast for 12 hours',
        procedureType: 'Surgical',
        id: 'proc-id'
      };
      const result = procedureJsonLd(props);
      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        ...props,
        '@id': props.id
      });
      // @id is duplicated in the spread if we are not careful,
      // but in the implementation it's added separately.
      // Actually, my spread includes id, and implementation adds @id.
    });
  });

  describe('ORGANIZATION_LOGO', () => {
    it('should have correct static properties', () => {
      expect(ORGANIZATION_LOGO).toMatchObject({
        '@type': 'Organization',
        url: SITE_URL
      });
      expect(ORGANIZATION_LOGO.logo).toContain('/images/logo.png');
    });
  });
});
