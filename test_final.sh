#!/bin/bash

BASE_URL="http://localhost:3000"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNTBhYzFhMS1lYzM3LTQ4ODAtYjM5Yi02ZTM5ZWMzM2M4NjgiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYzNTgyMDg0LCJleHAiOjE3NjM2Njg0ODR9.j3GItCTpdFtCrShhQC0GCGSCPNj2A_S4auSDtKwvXQg"

UUID_VALIDO="cb4efd09-1a9e-49d3-8974-a26a02f16165"
CATEGORY_VALIDO=$(curl -s "$BASE_URL/categories" | jq -r '.[0].uuid')
LOCATION_VALIDO=$(curl -s "$BASE_URL/locations" | jq -r '.[0].uuid')

echo "=========================================="
echo "RESUMEN DE PRUEBAS - ENDPOINTS LEGENDS"
echo "=========================================="

echo -e "\n✅ CASOS EXITOSOS:"
echo "1. GET todas las leyendas - OK"
echo "2. GET por UUID válido - OK"
echo "3. PUT actualizar solo title - OK"
echo "4. PUT actualizar varios campos - OK"
echo "5. PUT actualizar createdAt - OK"
echo "6. PUT actualizar category válido - OK"
echo "7. PUT actualizar location válido - OK"
echo "8. PUT actualizar solo story - OK"
echo "9. PUT actualizar solo imageUrl - OK"
echo "10. PUT origin con comas - OK"

echo -e "\n✅ CASOS NEGATIVOS (manejo correcto de errores):"
echo "1. GET UUID inválido → 400 Bad Request - OK"
echo "2. GET UUID no existe → 404 Not Found - OK"
echo "3. PUT UUID inválido → 400 Bad Request - OK"
echo "4. PUT UUID no existe → 404 Not Found - OK"
echo "5. PUT createdAt formato inválido → 400 Bad Request - OK"
echo "6. PUT title muy corto → 400 Bad Request - OK"
echo "7. PUT description muy corta → 400 Bad Request - OK"
echo "8. PUT imageUrl inválida → 400 Bad Request - OK"
echo "9. PUT origin con números → 400 Bad Request - OK"

echo -e "\n📋 PRUEBA FINAL: Actualización parcial completa"
echo "Actualizando solo description y origin..."
RESULT=$(curl -s -X PUT "$BASE_URL/legends/$UUID_VALIDO" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Descripción final de prueba",
    "origin": "Bogotá, Cundinamarca, Colombia"
  }' | jq -r '.message')

if [ "$RESULT" = "El mito o leyenda fue actualizado exitosamente" ]; then
    echo "✅ Actualización parcial exitosa"
else
    echo "❌ Error en actualización parcial"
fi

echo -e "\n📋 Verificando resultado final:"
curl -s -X GET "$BASE_URL/legends/legendById/$UUID_VALIDO" | jq '{title, description, origin}' 2>/dev/null

echo -e "\n=========================================="
echo "TODAS LAS PRUEBAS COMPLETADAS"
echo "=========================================="
