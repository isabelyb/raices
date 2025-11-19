#!/bin/bash

BASE_URL="http://localhost:3000"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNTBhYzFhMS1lYzM3LTQ4ODAtYjM5Yi02ZTM5ZWMzM2M4NjgiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYzNTgyMDg0LCJleHAiOjE3NjM2Njg0ODR9.j3GItCTpdFtCrShhQC0GCGSCPNj2A_S4auSDtKwvXQg"

UUID_VALIDO="cb4efd09-1a9e-49d3-8974-a26a02f16165"
CATEGORY_VALIDO=$(curl -s "$BASE_URL/categories" | jq -r '.[0].uuid')
LOCATION_VALIDO=$(curl -s "$BASE_URL/locations" | jq -r '.[0].uuid')
UUID_NO_EXISTE="11111111-1111-1111-1111-111111111111"

echo "=========================================="
echo "PRUEBAS EXTENDIDAS - ENDPOINTS LEGENDS"
echo "=========================================="
echo "Category válido: $CATEGORY_VALIDO"
echo "Location válido: $LOCATION_VALIDO"
echo ""

echo -e "\n17. PUT /legends/:uuid - Actualizar category con UUID válido"
curl -s -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"category\": \"$CATEGORY_VALIDO\"}" | jq '.message' 2>/dev/null || echo "Error"

echo -e "\n18. PUT /legends/:uuid - Actualizar location con UUID válido"
curl -s -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"location\": \"$LOCATION_VALIDO\"}" | jq '.message' 2>/dev/null || echo "Error"

echo -e "\n19. PUT /legends/:uuid - Category con UUID válido pero no existe (debe retornar 404)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"category\": \"$UUID_NO_EXISTE\"}" | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n20. PUT /legends/:uuid - Location con UUID válido pero no existe (debe retornar 404)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"location\": \"$UUID_NO_EXISTE\"}" | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n21. PUT /legends/:uuid - Actualizar con category igual al actual (no debe actualizar)"
CATEGORY_ACTUAL=$(curl -s "$BASE_URL/legends/legendById/$UUID_VALIDO" | jq -r '.category.uuid')
echo "Category actual: $CATEGORY_ACTUAL"
curl -s -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"category\": \"$CATEGORY_ACTUAL\", \"title\": \"Test mismo category\"}" | jq '.message' 2>/dev/null || echo "Error"

echo -e "\n22. PUT /legends/:uuid - Validación: title muy corto (debe retornar 400)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "AB"}' | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n23. PUT /legends/:uuid - Validación: description muy corta (debe retornar 400)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"description": "ABC"}' | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n24. PUT /legends/:uuid - Validación: imageUrl inválida (debe retornar 400)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"imageUrl": "no-es-una-url"}' | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n25. PUT /legends/:uuid - Validación: origin con caracteres inválidos (debe retornar 400)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"origin": "Medellín 123"}' | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n26. PUT /legends/:uuid - Actualizar solo story"
curl -s -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"story": "Nueva historia actualizada solo este campo"}' | jq '.message' 2>/dev/null || echo "Error"

echo -e "\n27. PUT /legends/:uuid - Actualizar solo imageUrl"
curl -s -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"imageUrl": "https://res.cloudinary.com/example/solo-image.jpg"}' | jq '.message' 2>/dev/null || echo "Error"

echo -e "\n28. Verificar estado final"
curl -s -X GET "$BASE_URL/legends/legendById/$UUID_VALIDO" | jq '{title, description, origin, story: (.story | .[0:50] + "...")}' 2>/dev/null || echo "Error"

echo -e "\n=========================================="
echo "PRUEBAS EXTENDIDAS COMPLETADAS"
echo "=========================================="
