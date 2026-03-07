# AI Elements Incremental Integration Roadmap

This document outlines the daily incremental integration plan for `npx ai-elements` into `www.drsayuj.info`. Given the YMYL (Your Money or Your Life) constraints and the existing AI Sandbox/Chat features, these elements will be integrated systematically to enhance patient experience, clinical safety, and trust.

## The Components
We will be utilizing four components from the `ai-elements` library:
1.  **Attachments**: For displaying file attachments (e.g., MRI scans, lab reports).
2.  **Confirmation**: For tool execution approval workflows (e.g., confirming appointment details).
3.  **Chain of Thought**: For visualizing AI reasoning steps (e.g., performing medical literature search).
4.  **Checkpoint**: For marking conversation history points and enabling branching.

## Implementation Plan

### Day 1: Visual Document Uploads with "Attachments"
**Objective:** Enhance the patient intake process by allowing visual previews of diagnostic documents in the AI Sandbox/Chat.

**Use Case:** Dr. Sayuj's booking form requires users to specify if an `mriScanAvailable` is true. We will enable patients to actually upload these documents (or previews/descriptions) directly into the AI Chat using the `<Attachments>` component.
*   **Target Components:** `app/ai-sandbox/page.tsx` and `app/ai-chat/_components/AIStreamingChat.tsx` (or its equivalent container).
*   **Action:**
    1.  Install the component: `npx ai-elements@latest add attachments`.
    2.  Update the chat interface input area to support file selection.
    3.  Use the `inline` or `list` variant of the `<Attachments>` component to show badges of uploaded PDFs or MRI JPEGs with a remove option before sending the message to the AI.
    4.  Update the backend (`app/api/ai/chat/route.ts`) to handle multi-part messages containing file data.

### Day 2: Safe Bookings with "Confirmation"
**Objective:** Enforce explicit patient consent before processing any bookings via the AI.

**Use Case:** The AI chat uses the `bookAppointment` tool in `src/lib/ai/tools.ts`. Silent or accidental tool execution is a severe YMYL risk. We must ask the patient to confirm their details before finalizing the booking.
*   **Target Component:** `app/ai-chat/_components/AIStreamingChat.tsx` and `app/api/ai/chat/route.ts`.
*   **Action:**
    1.  Install the component: `npx ai-elements@latest add confirmation`.
    2.  Update the `bookAppointment` tool definition in `src/lib/ai/tools.ts` to include a `confirm: z.boolean().default(false)` parameter and a `requireApproval: true` flag in the `streamText` call.
    3.  In the frontend, when `part.type === "tool-bookAppointment"` and `approval` is requested, render the `<Confirmation>` component.
    4.  Display the extracted details (Name: X, Time: Y, Reason: Z) inside `<ConfirmationRequest>`.
    5.  Use `<ConfirmationActions>` to allow the user to "Approve" or "Reject".

### Day 3: Clinical Transparency with "Chain of Thought"
**Objective:** Build patient trust by showing exactly how the AI retrieves medical information.

**Use Case:** When a patient asks about specific conditions (e.g., "What are the symptoms of a Slip Disc?"), the AI triggers the `searchContent` tool. Instead of a blank loading state, we will show a transparent progress indicator of the search.
*   **Target Component:** Chat message renderer in `app/ai-chat/_components/AIStreamingChat.tsx`.
*   **Action:**
    1.  Install the component: `npx ai-elements@latest add chain-of-thought`.
    2.  When `status === 'streaming'` or when tool calls are detected in the message stream (specifically `searchContent`), render the `<ChainOfThought>` component.
    3.  Show steps like "Searching clinical knowledge base for 'Slip Disc'..." -> "Reading medical article from Dr. Sayuj's database...".
    4.  Use `<ChainOfThoughtSearchResults>` to show badges of the URLs (`url`) and categories (`category`) returned by `semanticSearch`.

### Day 4: Complex Consultation Routing with "Checkpoint"
**Objective:** Allow patients to branch their conversations without losing context.

**Use Case:** A patient might start discussing "Lower back pain" but then realize they also want to ask about "Chronic headaches." Instead of confusing the AI context window, we can create checkpoints.
*   **Target Component:** Chat message loop in `app/ai-chat/_components/AIStreamingChat.tsx`.
*   **Action:**
    1.  Install the component: `npx ai-elements@latest add checkpoint`.
    2.  Maintain a `checkpoints` state array tracking significant topic shifts or manually triggered saves.
    3.  Render a `<Checkpoint>` divider in the chat history.
    4.  If a patient clicks "Restore Checkpoint", use the AI SDK `setMessages` function to truncate the chat history back to that exact state, allowing them to cleanly pivot their consultation query.