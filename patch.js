const fs = require('fs');

let content = fs.readFileSync('src/components/ai-elements/message.tsx', 'utf8');

// remove syntax error
content = content.replace(
  "prevProps.children === nextProps.children &&\n    );",
  "prevProps.children === nextProps.children\n);"
);

fs.writeFileSync('src/components/ai-elements/message.tsx', content);
console.log('Patch applied successfully.');
