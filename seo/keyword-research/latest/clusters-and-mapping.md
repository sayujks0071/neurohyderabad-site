# Cluster & Mapping Strategy - 2026-01-10

## 1. Primary Clusters
*   **Surgeon (Core):** "best spine surgeon", "neurosurgeon hyderabad" -> Mapped to Homepage (`/`).
*   **Endoscopic (USP):** "endoscopic spine surgery", "minimally invasive" -> Mapped to `/services/minimally-invasive-spine-surgery`.
*   **Decompression (New):** "spinal decompression surgery" -> **New Page** `/services/spinal-decompression-surgery-hyderabad`.
*   **Cost (Transactional):** "slip disc surgery cost", "spine surgery cost" -> Mapped to specific cost pages.
*   **Brain (Service):** "brain tumor surgery" -> Mapped to `/conditions/brain-tumor-surgery-hyderabad`.

## 2. Mapping Updates
*   **Correction:** `brain-tumor-surgery-hyderabad` in registry pointed to `/conditions/...` but file exists at `/services/brain-tumor-surgery-hyderabad`. Need to confirm which one is canonical or if it's a moved file.
    *   *Action:* I will assume `/services/` is the correct location based on file existence and update registry.
*   **New Page:** `/services/spinal-decompression-surgery-hyderabad`
    *   *Keywords:* "spinal decompression surgery hyderabad", "lumbar decompression", "nerve decompression".
    *   *Parent:* Spine Surgery.
    *   *Type:* Procedure Page (BOFU).
*   **Gap Fill:** "Scoliosis" is a gap. Flagged for manual validation (score 60). Will not create today to stay within safe limits.
*   **Gap Fill:** "Kyphoplasty" mapped to `osteoporotic-spine-fracture-hyderabad` (Condition). This is correct.

## 3. Cannibalization Risks
*   `lumbar-laminectomy` vs `spinal-decompression`: Laminectomy IS a decompression. The new page should act as a parent/hub or strictly target the broader "decompression" term while linking to laminectomy for specifics.
*   `minimally-invasive` vs `endoscopic`: We handle this by mapping both to `/services/minimally-invasive-spine-surgery`.
