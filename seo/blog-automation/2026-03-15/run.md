# Blog Automation Run: 2026-03-15

## 1. Detected Blog Structure
- Framework: Next.js App Router (`/app/blog`)
- Content Location: MDX files in `content/blog/`
- Frontmatter Schema: Governed by `src/types/blog.ts` (requires `slug`, `title`, `description`, `category`, `primaryKeyword`, `publishedAt`, `excerpt`, etc.)
- Internal Linking Pattern: Absolute paths (e.g., `/conditions/[slug]`, `/appointments`)

## 2. Chosen Topic & Score Rationale
- **Topic:** Annular Tear vs Herniated Disc: What Your MRI Means
- **Target Intent:** TOFU/MOFU
- **Rationale:**
  1. Patient demand proxy: Extremely common query when patients read their MRI reports. Connects directly to back pain/sciatica symptoms.
  2. Match to conversion pages: Excellent bridge to `slip-disc-treatment-hyderabad` and `sciatica-pain-treatment-hyderabad`.
  3. Gap size: Existing content covered terms like slipped disc and stenosis, but no specific page directly addressing the "annular tear vs herniated disc" distinction.

## 3. Internal Links Added
- `/conditions/sciatica-pain-treatment-hyderabad`
- `/conditions/slip-disc-treatment-hyderabad`
- `/appointments`
- `/blog/herniated-disc-vs-bulging-disc-hyderabad`
- `/blog/endoscopic-spine-surgery-recovery-timeline`

## 4. References Used
- North American Spine Society – Herniated Lumbar Disc
- American Academy of Orthopaedic Surgeons – Herniated Disk in the Lower Back
- Cleveland Clinic – Herniated Disk
- Mayo Clinic – Herniated disk

## 5. Risks & Notes
- Content strictly adheres to YMYL standards: no guaranteed outcomes, emphasizes that most cases resolve without surgery, and details specific red flags for urgent care.
