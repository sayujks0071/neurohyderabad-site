const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Look for BlogPosting or Article schema and add reviewer if not present
      if (content.includes('"@type": "BlogPosting"') || content.includes("'@type': 'BlogPosting'")) {
        // Regex to match the author object securely - variant 2
        const authorRegex2 = /"author":\s*\{\s*"@type":\s*"Person",\s*"name":\s*"Dr Sayuj Krishnan"\s*\}/g;
        const authorRegex3 = /'author':\s*\{\s*'@type':\s*'Person',\s*'name':\s*'Dr Sayuj Krishnan'\s*\}/g;

        let modified = false;

        content = content.replace(authorRegex2, (match) => {
          modified = true;
          return match + `,\n            "reviewer": {\n              "@type": "Person",\n              "name": "Dr Sayuj Krishnan"\n            }`;
        });

        content = content.replace(authorRegex3, (match) => {
          modified = true;
          return match + `,\n      'reviewer': {\n        '@type': 'Person',\n        'name': 'Dr Sayuj Krishnan'\n      }`;
        });

        if (modified) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated schema in ${fullPath}`);
        }
      }
    }
  }
}

processDir('app/blog');
