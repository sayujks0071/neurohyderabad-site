# GA4 Exploration Template — Location CTR

## Objective
Track engagement with location-focused CTAs (directions, WhatsApp, calls) across the site to optimise local conversions.

## Exploration Type
Free-form table with optional line chart.

## Dimensions
- `Page path and screen class`
- `Event name`
- `Device category`
- `Session medium`
- `City`

## Metrics
- `Event count`
- `Total users`
- `Event value` (if configured for appointment form submissions)

## Segments
- Segment A: Users located in Hyderabad (City equals “Hyderabad”).
- Segment B: Users outside Hyderabad (City does not equal “Hyderabad”).

## Filters
- Include `Event name` in (`click_call`, `click_whatsapp`, `book_appointment`).
- Optional: Include `Page path and screen class` contains `/locations` OR `cta_location` parameter equals `nap_block`.

## Table Layout
- Rows: `Page path and screen class`
- Columns: `Event name`
- Breakdowns: Add `Device category` as a breakdown to compare mobile vs desktop CTR.

## Derived Metrics (Custom)
- Create a metric “Conversion Rate” using `Event count / Total users` for each event.
- Alternatively, add a chart visualising `Event count` by `City` to confirm local signal strength.

## Output
Interpretation points to include in QA note:
- Highest converting pages for location CTAs.
- Device category skew.
- Share of engagement from Hyderabad vs other cities.

Save and share the exploration link in analytics documentation once events are live.
