# Cluster & Mapping - 2026-01-15

## Cluster: Vertebroplasty & Kyphoplasty
**Naming:** `HYD | BOFU | SPINE | vertebroplasty | surgery`

### Primary Keywords
*   vertebroplasty hyderabad
*   kyphoplasty hyderabad

### Secondary Keywords
*   cement spine surgery hyderabad
*   vertebroplasty cost in hyderabad
*   best doctor for kyphoplasty hyderabad
*   spine fracture surgery hyderabad

### Target Page
*   **New Page**: `/services/kyphoplasty-vertebroplasty-hyderabad`
*   **Existing Condition Page**: `/conditions/osteoporotic-spine-fracture-hyderabad` (Already exists, link to new service page)

## Mapping Logic
*   **Transactional/Procedure** queries ("surgery", "cost", "doctor") -> Map to `/services/kyphoplasty-vertebroplasty-hyderabad`.
*   **Condition/Symptoms** queries ("treatment", "fracture") -> Map to `/conditions/osteoporotic-spine-fracture-hyderabad`.

## Cannibalization Check
*   Ensure `/conditions/osteoporotic-spine-fracture-hyderabad` links to the new service page for surgical options.
*   Ensure new service page links back to condition page for "causes and symptoms".
