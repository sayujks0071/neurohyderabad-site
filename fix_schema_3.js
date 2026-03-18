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
        // Regex to match the author object securely - variant 3
        const authorRegex4 = /"author":\s*\{\s*"@id":\s*"https:\/\/www\.drsayuj\.info\/#physician"\s*\}/g;
        const authorRegex5 = /'author':\s*\{\s*'@id':\s*'https:\/\/www\.drsayuj\.info\/#physician'\s*\}/g;

        let modified = false;

        content = content.replace(authorRegex4, (match) => {
          modified = true;
          return match + `,\n      "reviewer": { "@id": "https://www.drsayuj.info/#physician" }`;
        });

        content = content.replace(authorRegex5, (match) => {
          modified = true;
          return match + `,\n      'reviewer': { '@id': 'https://www.drsayuj.info/#physician' }`;
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
