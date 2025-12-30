// .github/scripts/generate-fixes.js
// Auto-Fix AI: Generate git patches from CI audit reports

const fs = require('fs');
const path = require('path');
const https = require('https');

// Create debug directory
const debugDir = 'autofix-debug';
if (!fs.existsSync(debugDir)) {
  fs.mkdirSync(debugDir, { recursive: true });
}

function collectArtifactFiles(rootDir) {
  const files = [];
  
  function walk(dir) {
    if (!fs.existsSync(dir)) {
      return;
    }
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(function (entry) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        files.push(fullPath);
      }
    });
  }
  
  walk(rootDir);
  return files;
}

function buildPromptFromReport(report) {
  const lines = [];
  
  lines.push('You are a Next.js web development expert. Review these audit results and generate ONLY the code changes needed to fix them.');
  lines.push('');
  lines.push('Audit Results:');
  lines.push('- Lighthouse issues: ' + report.summary.lighthouse);
  lines.push('- Broken links: ' + report.summary.brokenLinks);
  lines.push('- Schema issues: ' + report.summary.schema);
  lines.push('- Meta tag issues: ' + report.summary.metaTags);
  lines.push('- Accessibility issues: ' + report.summary.accessibility);
  lines.push('- Image issues: ' + report.summary.images);
  lines.push('');
  lines.push('Detailed Issues:');
  lines.push('```json');
  lines.push(JSON.stringify(report.details, null, 2));
  lines.push('```');
  lines.push('');
  lines.push('Generate a git patch file that fixes these issues. Focus on:');
  lines.push('1. Adding missing alt tags to images');
  lines.push('2. Fixing meta descriptions that are too short/long');
  lines.push('3. Correcting JSON-LD schema errors');
  lines.push('4. Fixing broken internal links');
  lines.push('5. Improving accessibility (ARIA labels, contrast)');
  lines.push('');
  lines.push('Return ONLY valid git diff format. Be surgical - only change what\'s necessary.');
  
  return lines.join('\n');
}

function buildPromptFromArtifacts(artifactFiles) {
  const lines = [];
  
  lines.push('You are an expert Next.js web developer and DevOps engineer.');
  lines.push('You will receive diagnostic reports from CI (Lighthouse, SEO, JSON-LD, accessibility, broken links, images, spell check).');
  lines.push('Your job is to generate a minimal, safe git patch that fixes issues in this repository.');
  lines.push('');
  lines.push('Rules:');
  lines.push('- Only change what is necessary to fix the reported issues.');
  lines.push('- Do not introduce new libraries unless absolutely required.');
  lines.push('- Keep code style consistent with existing files.');
  lines.push('- Do not modify GitHub Actions workflows themselves.');
  lines.push('');
  
  if (artifactFiles.length === 0) {
    lines.push('No artifacts were found. There may be nothing to fix.');
  } else {
    lines.push('Below are the CI artifacts:');
    
    for (let i = 0; i < artifactFiles.length; i++) {
      const filePath = artifactFiles[i];
      const rel = path.relative(process.cwd(), filePath);
      let content = '';
      
      try {
        content = fs.readFileSync(filePath, 'utf8');
        // Sanitize content to prevent injection attacks if used in shell commands
        // Remove null bytes and control characters that could be dangerous
        content = content.replace(/\0/g, '').replace(/[\x00-\x1F\x7F]/g, '');
      } catch (e) {
        content = '[Could not read file: ' + e.message + ']';
      }
      
      if (content.length > 6000) {
        content = content.slice(0, 6000) + '\n...[truncated]';
      }
      
      lines.push('');
      lines.push('=== Artifact: ' + rel + ' ===');
      lines.push('```');
      lines.push(content);
      lines.push('```');
    }
  }
  
  lines.push('');
  lines.push('Output format:');
  lines.push('- Return ONLY a git patch that can be applied with git apply -p0.');
  lines.push('- Do not wrap the patch in backticks.');
  lines.push('- Do not add explanations before or after the patch.');
  
  return lines.join('\n');
}

function callOpenAI(prompt, callback) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.log('No OpenAI API key provided, using fallback fixes');
    callback(null, null);
    return;
  }
  
  const payload = JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are an expert web developer who generates precise git patches to fix web issues. Return only valid git diff format.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 4000
  });
  
  const options = {
    hostname: 'api.openai.com',
    port: 443,
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
      'Content-Length': Buffer.byteLength(payload)
    }
  };
  
  const req = https.request(options, function (res) {
    let body = '';
    
    res.on('data', function (chunk) {
      body += chunk;
    });
    
    res.on('end', function () {
      // Save full AI response to debug artifact
      fs.writeFileSync(path.join(debugDir, 'ai-response.txt'), body);
      console.log('AI response saved to ' + debugDir + '/ai-response.txt');
      
      if (res.statusCode !== 200) {
        console.error('API request failed with status ' + res.statusCode + ':', body);
        fs.writeFileSync('fixes.patch', '# No fixes generated - API request failed');
        fs.writeFileSync(path.join(debugDir, 'error.txt'), 'API request failed with status ' + res.statusCode + ':\n' + body);
        callback(null, null);
        return;
      }
      
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch (e) {
        console.error('Failed to parse OpenAI response JSON:', e);
        fs.writeFileSync('fixes.patch', '# No fixes generated - parsing error');
        fs.writeFileSync(path.join(debugDir, 'error.txt'), 'Parsing error: ' + e.message + '\n\nResponse body (first 500 chars):\n' + body.substring(0, 500));
        callback(null, null);
        return;
      }
      
      if (parsed.error) {
        console.error('OpenAI API Error:', parsed.error.message);
        console.error('Error type:', parsed.error.type);
        fs.writeFileSync('fixes.patch', '# No fixes generated - OpenAI API error');
        fs.writeFileSync(path.join(debugDir, 'error.txt'), 'OpenAI API Error: ' + parsed.error.message + '\nType: ' + parsed.error.type);
        callback(null, null);
        return;
      }
      
      if (!parsed.choices || parsed.choices.length === 0 || !parsed.choices[0].message) {
        console.error('Invalid API response structure:', JSON.stringify(parsed, null, 2));
        fs.writeFileSync('fixes.patch', '# No fixes generated - invalid API response');
        fs.writeFileSync(path.join(debugDir, 'error.txt'), 'Invalid API response structure:\n' + JSON.stringify(parsed, null, 2));
        callback(null, null);
        return;
      }
      
      const content = parsed.choices[0].message.content;
      
      if (!content || content.trim().length === 0) {
        console.error('Empty response from OpenAI API');
        fs.writeFileSync('fixes.patch', '# No fixes generated - empty API response');
        fs.writeFileSync(path.join(debugDir, 'error.txt'), 'Empty response from OpenAI API');
        callback(null, null);
        return;
      }
      
      callback(null, content);
    });
  });
  
  req.on('error', function (err) {
    console.error('Request error:', err.message);
    console.error('Error code:', err.code);
    fs.writeFileSync('fixes.patch', '# No fixes generated - network error');
    fs.writeFileSync(path.join(debugDir, 'error.txt'), 'Network error: ' + err.message + '\nError code: ' + err.code);
    callback(err, null);
  });
  
  req.setTimeout(60000, function () {
    console.error('Request timeout after 60 seconds');
    req.destroy();
    fs.writeFileSync('fixes.patch', '# No fixes generated - request timeout');
    fs.writeFileSync(path.join(debugDir, 'error.txt'), 'Request timeout after 60 seconds');
    callback(new Error('timeout'), null);
  });
  
  req.write(payload);
  req.end();
}

function extractPatch(text) {
  if (!text) {
    return '';
  }
  
  const trimmed = text.trim();
  const match = trimmed.match(/```(?:diff|patch)?\s*([\s\S]*?)```/);
  
  if (match && match[1]) {
    return match[1].trim();
  }
  
  return trimmed;
}

function main() {
  // Try to read aggregated report first (preferred method)
  let report = null;
  let prompt = null;
  
  if (fs.existsSync('aggregated-report.json')) {
    try {
      report = JSON.parse(fs.readFileSync('aggregated-report.json', 'utf8'));
      prompt = buildPromptFromReport(report);
      
      // Check if there are actionable issues
      const totalIssues = Object.values(report.summary).reduce((a, b) => a + b, 0);
      
      if (totalIssues === 0) {
        console.log('No issues found to fix');
        fs.writeFileSync('fixes.patch', '# No fixes needed - all checks passed');
        fs.writeFileSync(path.join(debugDir, 'prompt.txt'), 'No issues found to fix\n\n' + prompt);
        fs.writeFileSync(path.join(debugDir, 'ai-response.txt'), 'No issues found - skipped AI call');
        process.exit(0);
        return;
      }
    } catch (error) {
      console.error('Failed to read aggregated report:', error.message);
      fs.writeFileSync('fixes.patch', '# No fixes needed - could not read report');
      fs.writeFileSync(path.join(debugDir, 'error.txt'), 'Failed to read aggregated report: ' + error.message);
      process.exit(0);
      return;
    }
  } else {
    // Fallback: use artifact files directly
    const artifactDir = path.join(process.cwd(), 'artifacts');
    const files = collectArtifactFiles(artifactDir);
    
    if (files.length === 0) {
      console.log('No artifacts found - creating empty report');
      fs.writeFileSync('fixes.patch', '# No fixes needed - no artifacts found');
      fs.writeFileSync(path.join(debugDir, 'prompt.txt'), 'No artifacts found');
      fs.writeFileSync(path.join(debugDir, 'ai-response.txt'), 'No artifacts found - skipped AI call');
      process.exit(0);
      return;
    }
    
    prompt = buildPromptFromArtifacts(files);
  }
  
  // Save prompt to debug artifact
  fs.writeFileSync(path.join(debugDir, 'prompt.txt'), prompt);
  console.log('Prompt saved to ' + debugDir + '/prompt.txt');
  
  // Call OpenAI API
  callOpenAI(prompt, function (err, replyText) {
    if (err || !replyText) {
      // Fallback: Generate simple rule-based fixes if we have a report
      if (report) {
        const patches = [];
        
        if (report.details.accessibility && report.details.accessibility.length > 0) {
          patches.push('# Add alt text to images without it');
        }
        
        if (patches.length > 0) {
          fs.writeFileSync('fixes.patch', patches.join('\n'));
          fs.writeFileSync(path.join(debugDir, 'patch.diff'), patches.join('\n'));
          console.log('Generated fallback fixes');
          process.exit(0);
          return;
        }
      }
      
      console.log('No patch generated.');
      fs.writeFileSync('fixes.patch', '# No fixes needed - no actionable issues found');
      process.exit(0);
      return;
    }
    
    const patch = extractPatch(replyText);
    
    if (!patch || patch.length < 10) {
      console.log('Patch is empty or too short, skipping.');
      fs.writeFileSync('fixes.patch', '# No fixes needed - patch too short');
      process.exit(0);
      return;
    }
    
    fs.writeFileSync('fixes.patch', patch + '\n');
    fs.writeFileSync(path.join(debugDir, 'patch.diff'), patch + '\n');
    console.log('AI-generated patch saved');
    console.log('Patch preview:');
    console.log(patch.substring(0, 500));
    process.exit(0);
  });
}

main();

