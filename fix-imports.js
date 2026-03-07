const fs = require('fs');

const path = 'app/_components/AIStreamingChat.tsx';
let content = fs.readFileSync(path, 'utf8');

const importsToRemove = [
    'import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "/src/components/ai-elements/checkpoint";\n',
    'import { ChainOfThought, ChainOfThoughtHeader, ChainOfThoughtContent, ChainOfThoughtStep } from "/src/components/ai-elements/chain-of-thought";\n',
    'import { Confirmation, ConfirmationRequest, ConfirmationAccepted, ConfirmationRejected, ConfirmationActions, ConfirmationAction } from "/src/components/ai-elements/confirmation";\n',
    'import { Attachments, Attachment, AttachmentInfo, AttachmentPreview, AttachmentRemove } from "/src/components/ai-elements/attachments";\n'
];

importsToRemove.forEach(imp => {
    content = content.replace(imp, '');
});

content = content.replace("'use client';",
`'use client';

import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@/src/components/ai-elements/checkpoint";
import { ChainOfThought, ChainOfThoughtHeader, ChainOfThoughtContent, ChainOfThoughtStep } from "@/src/components/ai-elements/chain-of-thought";
import { Confirmation, ConfirmationRequest, ConfirmationAccepted, ConfirmationRejected, ConfirmationActions, ConfirmationAction } from "@/src/components/ai-elements/confirmation";
import { Attachments, Attachment, AttachmentInfo, AttachmentPreview, AttachmentRemove } from "@/src/components/ai-elements/attachments";
import { StethoscopeIcon, SearchIcon, CalendarIcon, CheckIcon, XIcon } from "lucide-react";`);

fs.writeFileSync(path, content);
