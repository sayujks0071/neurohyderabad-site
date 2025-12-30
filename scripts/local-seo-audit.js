#!/usr/bin/env node

/**
 * Local SEO Audit for drsayuj.info
 * Analyzes local SEO factors, NAP consistency, and location-based content
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.drsayuj.info';
const AUDIT_DATE = new Date().toISOString().split('T')[0];
const OUTPUT_DIR = path.join(__dirname, '../reports/seo');

// Local SEO configuration
const LOCAL_CONFIG = {
  businessName: 'Dr. Sayuj Krishnan',
  primaryLocation: 'Hyderabad',
  hospital: 'Yashoda Hospital',
  specialties: [
    'Neurosurgeon',
    'Brain Surgery',
    'Spine Surgery',
    'Endoscopic Spine Surgery',
    'Minimally Invasive Surgery'
  ],
  targetKeywords: [
    'neurosurgeon hyderabad',
    'brain surgeon hyderabad',
    'spine surgeon hyderabad',
    'endoscopic spine surgery hyderabad',
    'minimally invasive spine surgery hyderabad',
    'brain tumor surgery hyderabad',
    'epilepsy surgery hyderabad'
  ],
  locations: [
    'Malakpet',
    'Banjara Hills',
    'Hitec City',
    'Jubilee Hills',
    'Secunderabad',
    'Kukatpally',
    'Manikonda',
    'LB Nagar'
  ]
};

// Utility function to make HTTPS requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: data
      }));
    }).on('error', reject);
  });
}

// Analyze page for local SEO factors
async function analyzeLocalSEO(url) {
  try {
    const response = await makeRequest(url);
    
    if (response.statusCode !== 200) {
      return {
        url,
        status: 'error',
        statusCode: response.statusCode
      };
    }

    const html = response.body;
    
    // Extract local SEO elements
    const title = html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] || '';
    const description = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] || '';
    const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/i)?.[1] || '';
    
    // Check for location mentions
    const locationMentions = LOCAL_CONFIG.locations.filter(location => 
      html.toLowerCase().includes(location.toLowerCase())
    );
    
    // Check for specialty mentions
    const specialtyMentions = LOCAL_CONFIG.specialties.filter(specialty => 
      html.toLowerCase().includes(specialty.toLowerCase())
    );
    
    // Check for target keyword mentions
    const keywordMentions = LOCAL_CONFIG.targetKeywords.filter(keyword => 
      html.toLowerCase().includes(keyword.toLowerCase())
    );
    
    // Check for NAP (Name, Address, Phone) consistency
    const hasBusinessName = html.toLowerCase().includes(LOCAL_CONFIG.businessName.toLowerCase());
    const hasHospitalName = html.toLowerCase().includes(LOCAL_CONFIG.hospital.toLowerCase());
    
    // Check for structured data
    const hasLocalBusinessSchema = html.includes('LocalBusiness') || html.includes('MedicalBusiness');
    const hasPhysicianSchema = html.includes('Physician') || html.includes('MedicalBusiness');
    
    // Check for contact information
    const hasPhone = /\+91[\s-]?\d{10}|\d{10}|\d{5}[\s-]?\d{5}/.test(html);
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(html);
    
    // Check for location-specific content
    const hasLocationContent = locationMentions.length > 0;
    const hasSpecialtyContent = specialtyMentions.length > 0;
    
    return {
      url,
      status: 'success',
      localSEO: {
        title,
        description,
        h1,
        locationMentions,
        specialtyMentions,
        keywordMentions,
        hasBusinessName,
        hasHospitalName,
        hasLocalBusinessSchema,
        hasPhysicianSchema,
        hasPhone,
        hasEmail,
        hasLocationContent,
        hasSpecialtyContent,
        localSEOScore: calculateLocalSEOScore({
          locationMentions: locationMentions.length,
          specialtyMentions: specialtyMentions.length,
          keywordMentions: keywordMentions.length,
          hasBusinessName,
          hasHospitalName,
          hasLocalBusinessSchema,
          hasPhysicianSchema,
          hasPhone,
          hasEmail
        })
      }
    };
  } catch (error) {
    return {
      url,
      status: 'error',
      error: error.message
    };
  }
}

// Calculate local SEO score
function calculateLocalSEOScore(factors) {
  let score = 0;
  const maxScore = 100;
  
  // Location mentions (20 points)
  score += Math.min(factors.locationMentions * 5, 20);
  
  // Specialty mentions (20 points)
  score += Math.min(factors.specialtyMentions * 4, 20);
  
  // Keyword mentions (15 points)
  score += Math.min(factors.keywordMentions * 3, 15);
  
  // Business name (10 points)
  score += factors.hasBusinessName ? 10 : 0;
  
  // Hospital name (10 points)
  score += factors.hasHospitalName ? 10 : 0;
  
  // Structured data (10 points)
  score += factors.hasLocalBusinessSchema ? 5 : 0;
  score += factors.hasPhysicianSchema ? 5 : 0;
  
  // Contact information (15 points)
  score += factors.hasPhone ? 10 : 0;
  score += factors.hasEmail ? 5 : 0;
  
  return Math.min(score, maxScore);
}

// Main local SEO audit function
async function runLocalSEOAudit() {
  console.log('🏥 Starting Local SEO audit for drsayuj.info...\n');
  
  const auditResults = {
    timestamp: new Date().toISOString(),
    site: SITE_URL,
    auditDate: AUDIT_DATE,
    localConfig: LOCAL_CONFIG,
    summary: {
      totalPages: 0,
      successfulPages: 0,
      averageLocalSEOScore: 0,
      issues: []
    },
    pages: [],
    recommendations: [],
    napConsistency: {
      businessName: 0,
      hospitalName: 0,
      phone: 0,
      email: 0
    }
  };

  try {
    // Key pages to analyze for local SEO
    const keyPages = [
      `${SITE_URL}/`,
      `${SITE_URL}/about`,
      `${SITE_URL}/contact`,
      `${SITE_URL}/appointments`,
      `${SITE_URL}/services`,
      `${SITE_URL}/conditions`,
      `${SITE_URL}/best-neurosurgeon-in-hyderabad`,
      `${SITE_URL}/endoscopic-spine-surgery-hyderabad`,
      `${SITE_URL}/services/epilepsy-surgery-hyderabad`,
      `${SITE_URL}/services/brain-tumor-surgery-hyderabad`
    ];

    console.log('📄 Analyzing key pages for local SEO...');
    
    for (const url of keyPages) {
      console.log(`  Analyzing: ${url}`);
      const pageAnalysis = await analyzeLocalSEO(url);
      auditResults.pages.push(pageAnalysis);
      
      if (pageAnalysis.status === 'success') {
        auditResults.summary.successfulPages++;
        
        // Track NAP consistency
        if (pageAnalysis.localSEO.hasBusinessName) {
          auditResults.napConsistency.businessName++;
        }
        if (pageAnalysis.localSEO.hasHospitalName) {
          auditResults.napConsistency.hospitalName++;
        }
        if (pageAnalysis.localSEO.hasPhone) {
          auditResults.napConsistency.phone++;
        }
        if (pageAnalysis.localSEO.hasEmail) {
          auditResults.napConsistency.email++;
        }
        
        // Check for local SEO issues
        if (pageAnalysis.localSEO.localSEOScore < 50) {
          auditResults.summary.issues.push(`${url}: Low local SEO score (${pageAnalysis.localSEO.localSEOScore}/100)`);
        }
        
        if (pageAnalysis.localSEO.locationMentions.length === 0) {
          auditResults.summary.issues.push(`${url}: No location mentions found`);
        }
        
        if (pageAnalysis.localSEO.specialtyMentions.length === 0) {
          auditResults.summary.issues.push(`${url}: No specialty mentions found`);
        }
        
        if (!pageAnalysis.localSEO.hasLocalBusinessSchema && !pageAnalysis.localSEO.hasPhysicianSchema) {
          auditResults.summary.issues.push(`${url}: Missing local business structured data`);
        }
        
      } else {
        auditResults.summary.issues.push(`${url}: ${pageAnalysis.error}`);
      }
      
      // Small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    auditResults.summary.totalPages = keyPages.length;
    
    // Calculate average local SEO score
    const successfulPages = auditResults.pages.filter(p => p.status === 'success');
    if (successfulPages.length > 0) {
      const totalScore = successfulPages.reduce((sum, p) => sum + p.localSEO.localSEOScore, 0);
      auditResults.summary.averageLocalSEOScore = Math.round(totalScore / successfulPages.length);
    }

    // Generate recommendations
    console.log('💡 Generating local SEO recommendations...');
    
    // Location content recommendations
    const pagesWithoutLocations = auditResults.pages.filter(p => 
      p.status === 'success' && p.localSEO.locationMentions.length === 0
    ).length;
    
    if (pagesWithoutLocations > 0) {
      auditResults.recommendations.push({
        category: 'Location Content',
        priority: 'High',
        issue: `${pagesWithoutLocations} pages missing location mentions`,
        solution: 'Add specific location mentions (Malakpet, Banjara Hills, etc.) to improve local relevance'
      });
    }
    
    // Specialty content recommendations
    const pagesWithoutSpecialties = auditResults.pages.filter(p => 
      p.status === 'success' && p.localSEO.specialtyMentions.length === 0
    ).length;
    
    if (pagesWithoutSpecialties > 0) {
      auditResults.recommendations.push({
        category: 'Specialty Content',
        priority: 'High',
        issue: `${pagesWithoutSpecialties} pages missing specialty mentions`,
        solution: 'Include neurosurgery specialties and procedures in page content'
      });
    }
    
    // Structured data recommendations
    const pagesWithoutSchema = auditResults.pages.filter(p => 
      p.status === 'success' && !p.localSEO.hasLocalBusinessSchema && !p.localSEO.hasPhysicianSchema
    ).length;
    
    if (pagesWithoutSchema > 0) {
      auditResults.recommendations.push({
        category: 'Structured Data',
        priority: 'Medium',
        issue: `${pagesWithoutSchema} pages missing local business schema`,
        solution: 'Implement LocalBusiness and Physician schema markup for better local search visibility'
      });
    }
    
    // NAP consistency recommendations
    const napIssues = [];
    if (auditResults.napConsistency.businessName < auditResults.summary.successfulPages * 0.8) {
      napIssues.push('Business name not consistently mentioned');
    }
    if (auditResults.napConsistency.hospitalName < auditResults.summary.successfulPages * 0.6) {
      napIssues.push('Hospital name not consistently mentioned');
    }
    if (auditResults.napConsistency.phone < auditResults.summary.successfulPages * 0.5) {
      napIssues.push('Phone number not consistently mentioned');
    }
    
    if (napIssues.length > 0) {
      auditResults.recommendations.push({
        category: 'NAP Consistency',
        priority: 'High',
        issue: `NAP consistency issues: ${napIssues.join(', ')}`,
        solution: 'Ensure Name, Address, Phone (NAP) information is consistent across all pages'
      });
    }

    // Save results
    const jsonFile = path.join(OUTPUT_DIR, `local-seo-audit-${AUDIT_DATE}.json`);
    const mdFile = path.join(OUTPUT_DIR, `local-seo-audit-${AUDIT_DATE}.md`);
    
    fs.writeFileSync(jsonFile, JSON.stringify(auditResults, null, 2));
    
    // Generate markdown report
    const markdownReport = generateLocalSEOMarkdownReport(auditResults);
    fs.writeFileSync(mdFile, markdownReport);
    
    console.log(`\n✅ Local SEO audit completed!`);
    console.log(`📊 Results saved to:`);
    console.log(`   - ${jsonFile}`);
    console.log(`   - ${mdFile}`);
    
    // Print summary
    console.log(`\n📈 Local SEO Summary:`);
    console.log(`   - Total pages analyzed: ${auditResults.summary.totalPages}`);
    console.log(`   - Successful pages: ${auditResults.summary.successfulPages}`);
    console.log(`   - Average local SEO score: ${auditResults.summary.averageLocalSEOScore}/100`);
    console.log(`   - Issues found: ${auditResults.summary.issues.length}`);
    console.log(`   - Recommendations: ${auditResults.recommendations.length}`);
    
  } catch (error) {
    console.error('❌ Local SEO audit failed:', error.message);
    process.exit(1);
  }
}

// Generate markdown report
function generateLocalSEOMarkdownReport(results) {
  const { summary, pages, recommendations, napConsistency, localConfig } = results;
  
  let report = `# Local SEO Audit Report - drsayuj.info\n\n`;
  report += `**Audit Date:** ${results.auditDate}\n`;
  report += `**Site:** ${results.site}\n`;
  report += `**Timestamp:** ${results.timestamp}\n\n`;
  
  // Executive Summary
  report += `## 📊 Executive Summary\n\n`;
  report += `- **Total Pages Analyzed:** ${summary.totalPages}\n`;
  report += `- **Successful Pages:** ${summary.successfulPages}\n`;
  report += `- **Average Local SEO Score:** ${summary.averageLocalSEOScore}/100\n`;
  report += `- **Issues Found:** ${summary.issues.length}\n`;
  report += `- **Recommendations:** ${recommendations.length}\n\n`;
  
  // Local SEO Configuration
  report += `## 🏥 Local SEO Configuration\n\n`;
  report += `- **Business Name:** ${localConfig.businessName}\n`;
  report += `- **Primary Location:** ${localConfig.primaryLocation}\n`;
  report += `- **Hospital:** ${localConfig.hospital}\n`;
  report += `- **Target Locations:** ${localConfig.locations.join(', ')}\n`;
  report += `- **Specialties:** ${localConfig.specialties.join(', ')}\n\n`;
  
  // NAP Consistency
  report += `## 📞 NAP Consistency Analysis\n\n`;
  report += `| Element | Pages with Element | Consistency Rate |\n`;
  report += `|---------|-------------------|------------------|\n`;
  report += `| Business Name | ${napConsistency.businessName}/${summary.successfulPages} | ${Math.round((napConsistency.businessName / summary.successfulPages) * 100)}% |\n`;
  report += `| Hospital Name | ${napConsistency.hospitalName}/${summary.successfulPages} | ${Math.round((napConsistency.hospitalName / summary.successfulPages) * 100)}% |\n`;
  report += `| Phone Number | ${napConsistency.phone}/${summary.successfulPages} | ${Math.round((napConsistency.phone / summary.successfulPages) * 100)}% |\n`;
  report += `| Email Address | ${napConsistency.email}/${summary.successfulPages} | ${Math.round((napConsistency.email / summary.successfulPages) * 100)}% |\n\n`;
  
  // Issues
  report += `## 🚨 Issues Found\n\n`;
  if (summary.issues.length > 0) {
    summary.issues.forEach(issue => {
      report += `- ${issue}\n`;
    });
  } else {
    report += `No critical issues found.\n`;
  }
  report += `\n`;
  
  // Recommendations
  report += `## 💡 Recommendations\n\n`;
  recommendations.forEach(rec => {
    report += `### ${rec.category} (${rec.priority} Priority)\n`;
    report += `**Issue:** ${rec.issue}\n\n`;
    report += `**Solution:** ${rec.solution}\n\n`;
  });
  
  // Page Analysis
  report += `## 📄 Page Analysis\n\n`;
  report += `| URL | Local SEO Score | Locations | Specialties | Keywords | Schema |\n`;
  report += `|-----|----------------|-----------|-------------|----------|--------|\n`;
  
  pages.forEach(page => {
    if (page.status === 'success') {
      const score = page.localSEO.localSEOScore;
      const locations = page.localSEO.locationMentions.length;
      const specialties = page.localSEO.specialtyMentions.length;
      const keywords = page.localSEO.keywordMentions.length;
      const schema = (page.localSEO.hasLocalBusinessSchema || page.localSEO.hasPhysicianSchema) ? '✓' : '✗';
      
      report += `| ${page.url} | ${score}/100 | ${locations} | ${specialties} | ${keywords} | ${schema} |\n`;
    }
  });
  
  return report;
}

// Run the audit
if (require.main === module) {
  runLocalSEOAudit().catch(console.error);
}

module.exports = { runLocalSEOAudit, analyzeLocalSEO };
