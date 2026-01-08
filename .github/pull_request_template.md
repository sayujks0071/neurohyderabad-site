## Daily SEO Keyword Research

### Overview
This PR adds the daily keyword research snapshot and updates the site structure based on new opportunities.

- **Date:** {{ date }}
- **Focus:** {{ focus_area }}

### Changelog
- [ ] Added daily keyword snapshot in `seo/keyword-research/{{ date }}/`
- [ ] Updated `seo/keyword-registry.json`
- [ ] Updated `seo/page-keyword-map.json`
- [ ] Created new pages (if applicable):
    - `{{ new_page_1 }}`
    - `{{ new_page_2 }}`

### Top Keywords Discovered
| Keyword | Volume | Difficulty | Target |
| :--- | :--- | :--- | :--- |
| `{{ keyword_1 }}` | High | High | `{{ target_1 }}` |
| `{{ keyword_2 }}` | Med | Med | `{{ target_2 }}` |

### Cannibalization Check
- [x] Verified that new keywords do not conflict with existing high-performing pages.

### Verification
- [ ] Ran `pnpm lint` (or equivalent)
- [ ] Verified build locally
