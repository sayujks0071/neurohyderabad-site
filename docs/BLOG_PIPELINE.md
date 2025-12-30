# Blog Pipeline Documentation

## Overview
The blog pipeline is designed to be **safe**, **automated**, and **review-centric**. It separates the *generation* of content from the *publishing* of content, ensuring that no AI-generated text goes live without a human approval step (via Pull Request).

## Workflows

### 1. Blog Generator (`blog-generator.yml`)
**Purpose:** Generates new blog post drafts.
**Triggers:**
- **Schedule:** Runs daily at 6:00 AM IST.
- **Manual:** Can be triggered manually from the "Actions" tab.

**Behavior:**
- Runs the `npm run blog:generate-today` (scheduled) or `npm run new:blog` (manual) script.
- **Output:** Creates a Pull Request with the new draft.
- **Branch:** `blog/draft-[run-id]`

### 2. Blog Publisher (`blog-publisher.yml`)
**Purpose:** Checks for posts that are scheduled to go live.
**Triggers:**
- **Schedule:** Runs every hour.

**Behavior:**
- Checks all blog posts for a `scheduledAt` date in the past.
- If found:
  - Updates `publishedAt` to the current date.
  - Removes `scheduledAt`.
  - **Output:** Creates a Pull Request "Publish Scheduled Blog Posts".
- **Branch:** `blog/publish-[run-id]`

## How to Use

### Generating a Post Manually
1. Go to **Actions** > **Blog Generator**.
2. Click **Run workflow**.
3. Enter details:
   - **Title:** (Required)
   - **Category:** (Select from list)
   - **Keywords/Locations:** (Optional)
   - **Use AI:** (Default: true)
4. Wait for the workflow to finish.
5. Go to **Pull Requests** to review and merge the new draft.

### Reviewing Drafts
1. Open the PR created by the bot.
2. Review the content in `content/blog/`.
3. Edit the file directly in GitHub or locally if changes are needed.
4. **Merge** the PR to add the draft to the codebase.

### Publishing
- If a post has `scheduledAt`, it will be picked up by the **Blog Publisher** workflow when the time comes.
- The Publisher will create a PR. **Merge this PR** to make the post live on the site.

## Safety Features
- **No Direct Pushes:** All changes go through Pull Requests.
- **Concurrency:** Prevents multiple generation jobs from conflicting.
- **Separation of Concerns:** Generation and Publishing are distinct steps.
