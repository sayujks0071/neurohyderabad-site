const fs = require('fs');

let file = fs.readFileSync('app/components/Breadcrumbs.tsx', 'utf8');

file = file.replace('import BreadcrumbListSchema from "./schemas/BreadcrumbListSchema";', 'import BreadcrumbSchema from "./schemas/BreadcrumbSchema";');
file = file.replace('<BreadcrumbListSchema items={items} />', '<BreadcrumbSchema items={items.map(item => ({ name: item.name, path: item.href }))} />');

fs.writeFileSync('app/components/Breadcrumbs.tsx', file);
