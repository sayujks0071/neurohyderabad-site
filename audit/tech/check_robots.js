const http = require('http');
const fs = require('fs');
const path = require('path');

const ROBOTS_URL = 'http://localhost:3000/robots.txt';

http.get(ROBOTS_URL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const report = `# Robots.txt Check

**Status Code**: ${res.statusCode}

## Content
\`\`\`
${data}
\`\`\`

## Analysis
- **Sitemap Declaration**: ${data.includes('sitemap.xml') ? 'Present' : 'Missing'}
- **User-Agent**: ${data.includes('User-agent:') ? 'Present' : 'Missing'}
`;
    fs.writeFileSync(path.join(__dirname, 'report.md'), report);
    console.log('Robots report saved.');
  });
}).on('error', (e) => console.error(e));
