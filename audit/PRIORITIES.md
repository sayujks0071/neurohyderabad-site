# Prioritized Fix List

## 1. Fix Double Branding in Blog Titles (High Impact, Low Effort)
- **Issue**: `src/lib/blog-seo.ts` manually appends ` | Dr. Sayuj Krishnan` to the title, while `app/layout.tsx` also applies a template ` %s | Dr. Sayuj Krishnan`. This results in titles like "Post Title | Dr. Sayuj Krishnan | Dr. Sayuj Krishnan".
- **Affected URLs**: All dynamic blog posts (`/blog/[slug]`).
- **Fix**: Update `src/lib/blog-seo.ts` to return `title: { absolute: title }` to bypass the root layout template.
- **Risk**: Low.
- **Status**: Implemented.

## 2. Enhance Schema on Blog Posts (Medium Impact, Low Effort)
- **Issue**: Blog posts currently use `BlogPosting` schema. For YMYL (Your Money Your Life) content, Google recommends `MedicalWebPage` or specific medical types where applicable.
- **Affected URLs**: All blog posts.
- **Fix**: Update `app/_components/BlogLayout.tsx` to include `MedicalWebPage` in the `@type` array (e.g., `['BlogPosting', 'MedicalWebPage']`) or add it as a separate node in the graph.
- **Risk**: Low.
- **Status**: Implemented (`mainEntityOfPage` type updated).

## 3. Optimize MDX Metadata Length (High Impact, Low Effort)
- **Issue**: Many MDX files in `content/blog/` have titles > 60 chars and descriptions > 160 chars.
- **Affected URLs**: Multiple blog posts.
- **Fix**: Manual rewrite required. Automated truncation was rejected as destructive to keywords.
- **Risk**: Low.
- **Status**: Deferred for manual editorial review.

## 4. Verify Legacy Blog Metadata (Low Impact, Medium Effort)
- **Issue**: Static analysis flagged potential missing metadata in legacy `app/blog/*.tsx` pages. While spot checks showed they use `makeMetadata`, we should ensure *all* of them do.
- **Fix**: Manual verification or refined script check.
- **Risk**: Low.
- **Status**: Low priority.

## Selected for Implementation
1. Fix Double Branding in `src/lib/blog-seo.ts`.
2. Enhance Schema in `BlogLayout.tsx`.
3. ~Optimize MDX Metadata Length~ (Deferred).
