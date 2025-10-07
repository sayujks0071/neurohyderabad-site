# GA4 Exploration Template — Patient Stories Funnel

## Objective
Measure how users navigate from condition/service pages into patient stories and onward to conversion CTAs.

## Exploration Type
Free-form (Use Path exploration if preferred; steps below use Free-form).

## Tab Settings
- **Technique**: Free Form
- **Visualization**: Table
- **Segment Comparisons**:
  - Segment 1: Users who viewed any `page_location` containing `/conditions/`
  - Segment 2: Users who viewed any `page_location` containing `/services/`

## Dimensions
Add the following dimensions to the Variables panel:
- `Page path and screen class`
- `Event name`
- `Device category`
- `Session source / medium`
- `Date + hour` (for hourly view if needed)

## Metrics
- `Total users`
- `Event count`
- `Conversions` (ensure GA4 conversion events configured)

## Rows & Columns
- Rows: `Page path and screen class`
- Columns: `Event name`
- Filters:
  - Include `Event name` matches regex `view_service_page|click_call|click_whatsapp|book_appointment`
  - Include `Page path and screen class` contains `/patient-stories` OR `/stories`

## Recommended Breakdown
1. Duplicate the tab.
2. Apply filter `Page path and screen class` matches regex `^/conditions/|^/services/`.
3. Use Path exploration:
   - Starting point: `page_view` with path containing `/conditions/` (enter as `page_view + Page path contains /conditions/`).
   - Steps: track progression to `/patient-stories` then to `book_appointment`.

## Output
Export CSV or share link in analytics runbook. Copy key insights into the PR QA note:
- % of users from conditions → patient stories
- CTA engagement (`book_appointment`, `click_call`, `click_whatsapp`)
- Device category differences
