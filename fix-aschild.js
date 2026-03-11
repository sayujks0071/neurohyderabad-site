const fs = require('fs');
let code = fs.readFileSync('src/components/ai-elements/context.tsx', 'utf8');
code = code.replace('<HoverCardTrigger>', '<HoverCardTrigger asChild>');
code = code.replace('</HoverCardTrigger>', '</HoverCardTrigger>');
fs.writeFileSync('src/components/ai-elements/context.tsx', code);

code = fs.readFileSync('src/components/ai-elements/message.tsx', 'utf8');
code = code.replace('<TooltipTrigger>{button}</TooltipTrigger>', '<TooltipTrigger asChild>{button}</TooltipTrigger>');
fs.writeFileSync('src/components/ai-elements/message.tsx', code);

code = fs.readFileSync('src/components/ai-elements/checkpoint.tsx', 'utf8');
code = code.replace('<TooltipTrigger>', '<TooltipTrigger asChild>');
fs.writeFileSync('src/components/ai-elements/checkpoint.tsx', code);
