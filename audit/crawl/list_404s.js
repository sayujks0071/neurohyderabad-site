const fs = require('fs');
const inventory = JSON.parse(fs.readFileSync('audit/crawl/url_inventory.json', 'utf8'));
const errors = inventory.filter(r => r.status !== 200).map(r => r.path);
console.log(JSON.stringify(errors, null, 2));
