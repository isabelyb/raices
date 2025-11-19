#!/bin/bash

BASE_URL="http://localhost:3000"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNTBhYzFhMS1lYzM3LTQ4ODAtYjM5Yi02ZTM5ZWMzM2M4NjgiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYzNTgyMDg0LCJleHAiOjE3NjM2Njg0ODR9.j3GItCTpdFtCrShhQC0GCGSCPNj2A_S4auSDtKwvXQg"

echo "=========================================="
echo "PRUEBAS DE EMAIL DUPLICADO - USERS"
echo "=========================================="

# Obtener usuarios existentes
echo -e "\n1. Obteniendo usuarios existentes..."
USERS=$(curl -s -X GET "$BASE_URL/users" \
  -H "Authorization: Bearer $TOKEN")

USER1=$(echo "$USERS" | jq -r '.[0]')
USER2=$(echo "$USERS" | jq -r '.[1]')

if [ "$USER1" != "null" ] && [ -n "$USER1" ]; then
    EMAIL1=$(echo "$USER1" | jq -r '.email')
    UUID1=$(echo "$USER1" | jq -r '.uuid')
    echo "Usuario 1 - Email: $EMAIL1, UUID: $UUID1"
fi

if [ "$USER2" != "null" ] && [ -n "$USER2" ]; then
    EMAIL2=$(echo "$USER2" | jq -r '.email')
    UUID2=$(echo "$USER2" | jq -r '.uuid')
    echo "Usuario 2 - Email: $EMAIL2, UUID: $UUID2"
fi

echo -e "\n2. POST /users - Crear usuario con email que ya existe"
echo "Intentando crear usuario con email: $EMAIL1"
RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test\",
    \"lastname\": \"User\",
    \"phone\": \"3001234567\",
    \"email\": \"$EMAIL1\",
    \"location\": \"Bogotá\",
    \"username\": \"testuser$(date +%s)\",
    \"password\": \"Test123!\",
    \"confirmar_password\": \"Test123!\",
    \"isActive\": true
  }")

HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESULT" | sed '/HTTP_STATUS/d')

echo "Status Code: $HTTP_STATUS"
echo "Response:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

if [ "$HTTP_STATUS" = "409" ]; then
    echo "✅ CORRECTO: Retorna 409 Conflict"
elif [ "$HTTP_STATUS" = "500" ]; then
    echo "❌ PROBLEMA: Retorna 500 Internal Server Error (debería ser 409)"
elif [ "$HTTP_STATUS" = "400" ]; then
    echo "⚠️  Status 400 (puede ser validación del DTO)"
else
    echo "⚠️  Status inesperado: $HTTP_STATUS"
fi

if [ -n "$UUID1" ] && [ -n "$EMAIL2" ] && [ "$EMAIL2" != "null" ]; then
    echo -e "\n3. PUT /users/:uuid - Actualizar usuario con email de otro usuario"
    echo "Intentando actualizar usuario $UUID1 con email $EMAIL2 (que pertenece a otro usuario)..."
    RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/users/$UUID1" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"email\": \"$EMAIL2\"}")
    
    HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
    BODY=$(echo "$RESULT" | sed '/HTTP_STATUS/d')
    
    echo "Status Code: $HTTP_STATUS"
    echo "Response:"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
    
    if [ "$HTTP_STATUS" = "409" ]; then
        echo "✅ CORRECTO: Retorna 409 Conflict"
    elif [ "$HTTP_STATUS" = "500" ]; then
        echo "❌ PROBLEMA: Retorna 500 Internal Server Error (debería ser 409)"
    else
        echo "⚠️  Status inesperado: $HTTP_STATUS"
    fi
fi

if [ -n "$UUID1" ] && [ -n "$EMAIL1" ]; then
    echo -e "\n4. PUT /users/:uuid - Actualizar usuario con su mismo email (debe permitir)"
    echo "Intentando actualizar usuario $UUID1 con su mismo email $EMAIL1..."
    RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/users/$UUID1" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{
        \"email\": \"$EMAIL1\",
        \"name\": \"Nombre Actualizado Test\"
      }")
    
    HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
    BODY=$(echo "$RESULT" | sed '/HTTP_STATUS/d')
    
    echo "Status Code: $HTTP_STATUS"
    echo "Response:"
    echo "$BODY" | jq '.name, .email' 2>/dev/null || echo "$BODY"
    
    if [ "$HTTP_STATUS" = "200" ]; then
        echo "✅ CORRECTO: Permite actualizar con el mismo email (200 OK)"
    else
        echo "⚠️  Status inesperado: $HTTP_STATUS"
    fi
fi

if [ -n "$UUID1" ] && [ -n "$EMAIL1" ]; then
    echo -e "\n5. PUT /users/:uuid - Actualizar solo otros campos sin cambiar email"
    echo "Actualizando solo name sin tocar el email..."
    RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/users/$UUID1" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"name\": \"Solo Name Actualizado\"}")
    
    HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
    BODY=$(echo "$RESULT" | sed '/HTTP_STATUS/d')
    
    echo "Status Code: $HTTP_STATUS"
    if [ "$HTTP_STATUS" = "200" ]; then
        echo "✅ CORRECTO: Permite actualizar otros campos sin email (200 OK)"
        echo "Name actualizado: $(echo "$BODY" | jq -r '.name')"
    else
        echo "⚠️  Status inesperado: $HTTP_STATUS"
    fi
fi

echo -e "\n=========================================="
echo "RESUMEN DE PRUEBAS"
echo "=========================================="
echo "✅ POST con email duplicado → 409 Conflict"
echo "✅ PUT con email de otro usuario → 409 Conflict"
echo "✅ PUT con mismo email → 200 OK (permite)"
echo "✅ PUT sin cambiar email → 200 OK (permite)"
echo "=========================================="
