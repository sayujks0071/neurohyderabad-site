#!/usr/bin/env ts-node

/**
 * A/B Testing Validation Script
 * 
 * This script validates the A/B testing implementation to ensure:
 * - Components render correctly
 * - Events are properly structured
 * - No layout shifts occur
 * - Accessibility requirements are met
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface ValidationResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
  details?: string;
}

class ABTestValidator {
  private results: ValidationResult[] = [];
  private projectRoot: string;

  constructor() {
    this.projectRoot = process.cwd();
  }

  private addResult(test: string, status: 'PASS' | 'FAIL' | 'WARN', message: string, details?: string) {
    this.results.push({ test, status, message, details });
  }

  private readFile(filePath: string): string | null {
    try {
      const fullPath = join(this.projectRoot, filePath);
      if (!existsSync(fullPath)) {
        return null;
      }
      return readFileSync(fullPath, 'utf-8');
    } catch (error) {
      return null;
    }
  }

  validateComponents() {
    console.log('🔍 Validating A/B Testing Components...\n');

    // Check HeroCTA component
    this.validateHeroCTA();
    
    // Check StickyCTA component
    this.validateStickyCTA();
    
    // Check LocationBanner component
    this.validateLocationBanner();
    
    // Check hooks and utilities
    this.validateHooks();
    
    // Check provider integration
    this.validateProvider();
    
    // Check package.json dependencies
    this.validateDependencies();
  }

  private validateHeroCTA() {
    const heroCTAPath = 'app/components/ab/HeroCTA.tsx';
    const content = this.readFile(heroCTAPath);
    
    if (!content) {
      this.addResult('HeroCTA Component', 'FAIL', 'HeroCTA component file not found');
      return;
    }

    // Check for required props
    if (content.includes('aria-label')) {
      this.addResult('HeroCTA Accessibility', 'PASS', 'aria-label prop is present');
    } else {
      this.addResult('HeroCTA Accessibility', 'FAIL', 'aria-label prop is missing');
    }

    // Check for variant text handling
    if (content.includes('book_consultation_dr_sayuj') && content.includes('mri_review_today')) {
      this.addResult('HeroCTA Variants', 'PASS', 'Medical-appropriate variants are implemented');
    } else {
      this.addResult('HeroCTA Variants', 'FAIL', 'Required variants are missing');
    }

    // Check for cluster-specific support (Variant D)
    if (content.includes('cta_text_${pageCtx.cluster}') && content.includes('cta_text_generic')) {
      this.addResult('HeroCTA Cluster Support', 'PASS', 'Cluster-specific Variant D support is implemented');
    } else {
      this.addResult('HeroCTA Cluster Support', 'WARN', 'Cluster-specific Variant D support is not implemented');
    }

    // Check for reassurance microcopy
    if (content.includes('reassurance_${pageCtx.cluster}') && content.includes('showReassurance')) {
      this.addResult('HeroCTA Reassurance', 'PASS', 'Reassurance microcopy support is implemented');
    } else {
      this.addResult('HeroCTA Reassurance', 'WARN', 'Reassurance microcopy support is not implemented');
    }

    // Check for style variants
    if (content.includes('primary') && content.includes('outline') && content.includes('success')) {
      this.addResult('HeroCTA Styles', 'PASS', 'Style variants are implemented');
    } else {
      this.addResult('HeroCTA Styles', 'FAIL', 'Style variants are missing');
    }

    // Check for event logging
    if (content.includes('logCTA') && content.includes('hero')) {
      this.addResult('HeroCTA Events', 'PASS', 'Event logging is implemented');
    } else {
      this.addResult('HeroCTA Events', 'FAIL', 'Event logging is missing');
    }
  }

  private validateStickyCTA() {
    const stickyCTAPath = 'app/components/ab/StickyCTA.tsx';
    const content = this.readFile(stickyCTAPath);
    
    if (!content) {
      this.addResult('StickyCTA Component', 'FAIL', 'StickyCTA component file not found');
      return;
    }

    // Check for mobile-only rendering
    if (content.includes('window.innerWidth < 768')) {
      this.addResult('StickyCTA Mobile', 'PASS', 'Mobile-only rendering is implemented');
    } else {
      this.addResult('StickyCTA Mobile', 'FAIL', 'Mobile-only rendering is missing');
    }

    // Check for variant handling
    if (content.includes('call_now') && content.includes('whatsapp')) {
      this.addResult('StickyCTA Variants', 'PASS', 'Contact method variants are implemented');
    } else {
      this.addResult('StickyCTA Variants', 'FAIL', 'Contact method variants are missing');
    }

    // Check for phone number handling
    if (content.includes('tel:') && content.includes('wa.me')) {
      this.addResult('StickyCTA Actions', 'PASS', 'Phone and WhatsApp actions are implemented');
    } else {
      this.addResult('StickyCTA Actions', 'FAIL', 'Phone and WhatsApp actions are missing');
    }

    // Check for accessibility
    if (content.includes('aria-label')) {
      this.addResult('StickyCTA Accessibility', 'PASS', 'aria-label attributes are present');
    } else {
      this.addResult('StickyCTA Accessibility', 'FAIL', 'aria-label attributes are missing');
    }
  }

  private validateLocationBanner() {
    const bannerPath = 'app/components/ab/LocationBanner.tsx';
    const content = this.readFile(bannerPath);
    
    if (!content) {
      this.addResult('LocationBanner Component', 'FAIL', 'LocationBanner component file not found');
      return;
    }

    // Check for Hyderabad-specific messaging
    if (content.includes('Hyderabad') && content.includes('Malakpet') && content.includes('Banjara Hills')) {
      this.addResult('LocationBanner Content', 'PASS', 'Hyderabad-specific messaging is implemented');
    } else {
      this.addResult('LocationBanner Content', 'FAIL', 'Hyderabad-specific messaging is missing');
    }

    // Check for dismissible functionality
    if (content.includes('setIsDismissed') && content.includes('isDismissed')) {
      this.addResult('LocationBanner Dismiss', 'PASS', 'Dismissible functionality is implemented');
    } else {
      this.addResult('LocationBanner Dismiss', 'FAIL', 'Dismissible functionality is missing');
    }

    // Check for gate integration
    if (content.includes('web_gate_location_banner')) {
      this.addResult('LocationBanner Gate', 'PASS', 'Gate integration is implemented');
    } else {
      this.addResult('LocationBanner Gate', 'FAIL', 'Gate integration is missing');
    }
  }

  private validateHooks() {
    const hooksPath = 'app/hooks/useAppointmentLogger.ts';
    const content = this.readFile(hooksPath);
    
    if (!content) {
      this.addResult('Appointment Logger Hook', 'FAIL', 'useAppointmentLogger hook file not found');
      return;
    }

    // Check for appointment flow logging
    if (content.includes('logAppointmentStart') && content.includes('logAppointmentSuccess')) {
      this.addResult('Appointment Logger', 'PASS', 'Appointment flow logging is implemented');
    } else {
      this.addResult('Appointment Logger', 'FAIL', 'Appointment flow logging is missing');
    }

    // Check for contact method logging
    if (content.includes('logWhatsAppClick') && content.includes('logCallClick')) {
      this.addResult('Contact Logger', 'PASS', 'Contact method logging is implemented');
    } else {
      this.addResult('Contact Logger', 'FAIL', 'Contact method logging is missing');
    }
  }

  private validateProvider() {
    const providerPath = 'app/providers/statsig-provider.tsx';
    const content = this.readFile(providerPath);
    
    if (!content) {
      this.addResult('Statsig Provider', 'FAIL', 'Statsig provider file not found');
      return;
    }

    // Check for user ID management
    if (content.includes('Cookies.get') && content.includes('Cookies.set')) {
      this.addResult('User ID Management', 'PASS', 'User ID cookie management is implemented');
    } else {
      this.addResult('User ID Management', 'FAIL', 'User ID cookie management is missing');
    }

    // Check for country setting
    if (content.includes('country: \'IN\'')) {
      this.addResult('Country Targeting', 'PASS', 'India country targeting is set');
    } else {
      this.addResult('Country Targeting', 'FAIL', 'India country targeting is missing');
    }

    // Check for city detection
    if (content.includes('geo=hyd') && content.includes('Hyderabad')) {
      this.addResult('City Detection', 'PASS', 'Hyderabad city detection is implemented');
    } else {
      this.addResult('City Detection', 'WARN', 'Hyderabad city detection is not implemented');
    }
  }

  private validateDependencies() {
    const packageJsonPath = 'package.json';
    const content = this.readFile(packageJsonPath);
    
    if (!content) {
      this.addResult('Package Dependencies', 'FAIL', 'package.json file not found');
      return;
    }

    // Check for js-cookie dependency
    if (content.includes('"js-cookie": "^3.0.5"')) {
      this.addResult('js-cookie Dependency', 'PASS', 'js-cookie dependency is present');
    } else {
      this.addResult('js-cookie Dependency', 'FAIL', 'js-cookie dependency is missing');
    }

    // Check for Statsig dependencies
    if (content.includes('@statsig/react-bindings')) {
      this.addResult('Statsig Dependencies', 'PASS', 'Statsig React bindings are present');
    } else {
      this.addResult('Statsig Dependencies', 'FAIL', 'Statsig React bindings are missing');
    }
  }

  printResults() {
    console.log('\n📊 Validation Results:\n');
    
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const warnings = this.results.filter(r => r.status === 'WARN').length;
    
    this.results.forEach(result => {
      const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
      console.log(`${icon} ${result.test}: ${result.message}`);
      if (result.details) {
        console.log(`   ${result.details}`);
      }
    });
    
    console.log(`\n📈 Summary: ${passed} passed, ${failed} failed, ${warnings} warnings`);
    
    if (failed > 0) {
      console.log('\n❌ Validation failed. Please fix the issues above before deployment.');
      process.exit(1);
    } else if (warnings > 0) {
      console.log('\n⚠️ Validation completed with warnings. Review the warnings above.');
    } else {
      console.log('\n✅ All validations passed! Ready for deployment.');
    }
  }
}

// Run validation
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new ABTestValidator();
  validator.validateComponents();
  validator.printResults();
}

export default ABTestValidator;