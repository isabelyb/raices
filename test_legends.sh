#!/bin/bash

BASE_URL="http://localhost:3000"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNTBhYzFhMS1lYzM3LTQ4ODAtYjM5Yi02ZTM5ZWMzM2M4NjgiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYzNTgyMDg0LCJleHAiOjE3NjM2Njg0ODR9.j3GItCTpdFtCrShhQC0GCGSCPNj2A_S4auSDtKwvXQg"

echo "=========================================="
echo "PRUEBAS DE ENDPOINTS LEGENDS"
echo "=========================================="

echo -e "\n1. GET /legends - Obtener todas las leyendas"
curl -s -X GET "$BASE_URL/legends" | jq 'length' | head -1

echo -e "\n2. GET /legends/legendById/:uuid - UUID válido"
UUID_VALIDO="cb4efd09-1a9e-49d3-8974-a26a02f16165"
curl -s -X GET "$BASE_URL/legends/legendById/$UUID_VALIDO" | jq '.title' 2>/dev/null || echo "Error"

echo -e "\n3. GET /legends/legendById/:uuid - UUID inválido (debe retornar 400)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$BASE_URL/legends/legendById/invalid-uuid" | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n4. GET /legends/legendById/:uuid - UUID no existe (debe retornar 404)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$BASE_URL/legends/legendById/00000000-0000-0000-0000-000000000000" | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n5. GET /legends/getByTitle/:title"
curl -s -X GET "$BASE_URL/legends/getByTitle/Patasola" | jq '.[0].title' 2>/dev/null || echo "No encontrado"

echo -e "\n6. PUT /legends/:uuid - Actualizar solo un campo (title)"
echo "Actualizando solo el campo title..."
curl -s -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "La Madremonte Actualizada"}' | jq '.message' 2>/dev/null || echo "Error"

echo -e "\n7. PUT /legends/:uuid - Actualizar varios campos (description, origin)"
echo "Actualizando description y origin..."
curl -s -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Nueva descripción actualizada",
    "origin": "Medellín, Antioquia"
  }' | jq '.message' 2>/dev/null || echo "Error"

echo -e "\n8. PUT /legends/:uuid - Actualizar createdAt (formato DD/MM/YYYY)"
echo "Actualizando createdAt..."
curl -s -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"createdAt": "20/11/2025"}' | jq '.message' 2>/dev/null || echo "Error"

echo -e "\n9. PUT /legends/:uuid - UUID inválido (debe retornar 400)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/legends/invalid-uuid" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}' | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n10. PUT /legends/:uuid - UUID no existe (debe retornar 404)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/legends/00000000-0000-0000-0000-000000000000" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}' | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n11. PUT /legends/:uuid - Category no existe (debe retornar 404)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"category": "00000000-0000-0000-0000-000000000000"}' | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n12. PUT /legends/:uuid - Location no existe (debe retornar 404)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"location": "00000000-0000-0000-0000-000000000000"}' | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n13. PUT /legends/:uuid - Validación: origin con comas"
echo "Probando origin con comas..."
curl -s -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"origin": "El Carmen de Viboral, Antioquia, Colombia"}' | jq '.message' 2>/dev/null || echo "Error"

echo -e "\n14. PUT /legends/:uuid - Validación: createdAt formato inválido (debe retornar 400)"
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"createdAt": "2025-11-20"}' | jq '.' 2>/dev/null || echo "Error esperado"

echo -e "\n15. PUT /legends/:uuid - Actualizar todos los campos"
echo "Actualizando todos los campos..."
curl -s -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "La Madremonte Final",
    "description": "Descripción completa actualizada",
    "imageUrl": "https://res.cloudinary.com/example/final.jpg",
    "story": "Historia completa actualizada",
    "origin": "Medellín, Antioquia",
    "createdAt": "21/11/2025"
  }' | jq '.message' 2>/dev/null || echo "Error"

echo -e "\n16. Verificar que se actualizó correctamente"
curl -s -X GET "$BASE_URL/legends/legendById/$UUID_VALIDO" | jq '{title, description, origin}' 2>/dev/null || echo "Error"

echo -e "\n=========================================="
echo "PRUEBAS COMPLETADAS"
echo "=========================================="
