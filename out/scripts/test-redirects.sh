#!/usr/bin/env bash

# Validate preview redirects for seo/benchmark-r1.
# Usage: BASE_URL="https://preview-url.vercel.app" bash out/scripts/test-redirects.sh

set -euo pipefail

if [[ -z "${BASE_URL:-}" ]]; then
  echo "Please set BASE_URL to your deployed preview (e.g. https://seo-benchmark-r1.vercel.app)"
  exit 1
fi

declare -A ROUTES=(
  ["/services/microvascular-decompression"]="/conditions/trigeminal-neuralgia-treatment-hyderabad"
  ["/services/radiosurgery-gamma-knife"]="/conditions/trigeminal-neuralgia-treatment-hyderabad"
  ["/conditions/sciatica-treatment"]="/services/endoscopic-discectomy-hyderabad"
  ["/conditions/lumbar-spinal-stenosis-treatment"]="/services/minimally-invasive-spine-surgery"
  ["/conditions/trigeminal-neuralgia-treatment"]="/conditions/trigeminal-neuralgia-treatment-hyderabad"
  ["/conditions/brain-tumor-surgery"]="/conditions/brain-tumor-surgery-hyderabad"
  ["/conditions/cervical-radiculopathy-treatment"]="/conditions/cervical-radiculopathy-treatment-hyderabad"
  ["/conditions/pain-on-top-of-head"]="/symptoms/pain-on-top-of-head-causes"
  ["/conditions/signs-of-brain-tumor"]="/symptoms/signs-of-brain-tumor"
)

echo "Testing redirects against ${BASE_URL}"
echo ""

for SOURCE in "${!ROUTES[@]}"; do
  DEST="${ROUTES[$SOURCE]}"
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "${BASE_URL}${SOURCE}")
  STATUS=$(echo "${RESPONSE}" | awk '{print $1}')
  LOCATION=$(echo "${RESPONSE}" | awk '{print $2}')

  if [[ "${STATUS}" != "301" && "${STATUS}" != "308" ]]; then
    echo "❌ ${SOURCE} → Expected 301, got ${STATUS}"
    exit 1
  fi

  if [[ "${LOCATION}" != "${BASE_URL}${DEST}" && "${LOCATION}" != "https://www.drsayuj.com${DEST}" ]]; then
    echo "❌ ${SOURCE} → Redirected to ${LOCATION}, expected ${DEST}"
    exit 1
  fi

  echo "✅ ${SOURCE} → ${DEST} (${STATUS})"
done

echo ""
echo "All redirects validated successfully."
