#!/bin/bash
BASE_URL="http://localhost:3000"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNTBhYzFhMS1lYzM3LTQ4ODAtYjM5Yi02ZTM5ZWMzM2M4NjgiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYzNTgyMDg0LCJleHAiOjE3NjM2Njg0ODR9.j3GItCTpdFtCrShhQC0GCGSCPNj2A_S4auSDtKwvXQg"

LEGEND_UUID="cb4efd09-1a9e-49d3-8974-a26a02f16165"
OTHER_LEGEND=$(curl -s "$BASE_URL/legends" | jq -r '.[0]')
OTHER_TITLE=$(echo "$OTHER_LEGEND" | jq -r '.title')
OTHER_IMAGE=$(echo "$OTHER_LEGEND" | jq -r '.imageUrl')

echo "Title duplicado: $OTHER_TITLE"
RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"$OTHER_TITLE\"}")
HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESULT" | sed '/HTTP_STATUS/d')
echo "Status: $HTTP_STATUS"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

echo -e "\nImageUrl duplicado: $OTHER_IMAGE"
RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"imageUrl\": \"$OTHER_IMAGE\"}")
HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESULT" | sed '/HTTP_STATUS/d')
echo "Status: $HTTP_STATUS"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
