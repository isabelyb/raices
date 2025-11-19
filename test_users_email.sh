#!/bin/bash

BASE_URL="http://localhost:3000"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNTBhYzFhMS1lYzM3LTQ4ODAtYjM5Yi02ZTM5ZWMzM2M4NjgiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYzNTgyMDg0LCJleHAiOjE3NjM2Njg0ODR9.j3GItCTpdFtCrShhQC0GCGSCPNj2A_S4auSDtKwvXQg"

echo "=========================================="
echo "PRUEBAS DE EMAIL DUPLICADO - USERS"
echo "=========================================="

# Obtener un usuario existente para obtener su email
echo -e "\n1. Obteniendo un usuario existente..."
EXISTING_USER=$(curl -s -X GET "$BASE_URL/users" \
  -H "Authorization: Bearer $TOKEN" | jq -r '.[0]')

if [ "$EXISTING_USER" != "null" ] && [ -n "$EXISTING_USER" ]; then
    EXISTING_EMAIL=$(echo "$EXISTING_USER" | jq -r '.email')
    EXISTING_UUID=$(echo "$EXISTING_USER" | jq -r '.uuid')
    echo "Email existente: $EXISTING_EMAIL"
    echo "UUID existente: $EXISTING_UUID"
else
    echo "No se encontró usuario existente, creando uno de prueba..."
    EXISTING_EMAIL="test@example.com"
    EXISTING_UUID=""
fi

echo -e "\n2. POST /users - Crear usuario con email que ya existe"
echo "Intentando crear usuario con email: $EXISTING_EMAIL"
RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test\",
    \"lastname\": \"User\",
    \"phone\": \"3001234567\",
    \"email\": \"$EXISTING_EMAIL\",
    \"location\": \"Bogotá\",
    \"username\": \"testuser$(date +%s)\",
    \"password\": \"Test123!\",
    \"confirmar_password\": \"Test123!\"
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
else
    echo "⚠️  Status inesperado: $HTTP_STATUS"
fi

if [ -n "$EXISTING_UUID" ]; then
    echo -e "\n3. PUT /users/:uuid - Actualizar usuario con email que ya existe (otro usuario)"
    echo "Intentando actualizar usuario $EXISTING_UUID con email de otro usuario..."
    
    # Obtener otro usuario diferente
    OTHER_USER=$(curl -s -X GET "$BASE_URL/users" \
      -H "Authorization: Bearer $TOKEN" | jq -r '.[1]')
    
    if [ "$OTHER_USER" != "null" ] && [ -n "$OTHER_USER" ]; then
        OTHER_EMAIL=$(echo "$OTHER_USER" | jq -r '.email')
        OTHER_UUID=$(echo "$OTHER_USER" | jq -r '.uuid')
        
        if [ "$OTHER_UUID" != "$EXISTING_UUID" ] && [ -n "$OTHER_EMAIL" ]; then
            echo "Intentando cambiar email de $EXISTING_UUID a $OTHER_EMAIL (que pertenece a $OTHER_UUID)"
            RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/users/$EXISTING_UUID" \
              -H "Authorization: Bearer $TOKEN" \
              -H "Content-Type: application/json" \
              -d "{\"email\": \"$OTHER_EMAIL\"}")
            
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
        else
            echo "No hay otro usuario disponible para la prueba"
        fi
    else
        echo "No hay otro usuario disponible para la prueba"
    fi
    
    echo -e "\n4. PUT /users/:uuid - Actualizar usuario con su mismo email (debe permitir)"
    echo "Intentando actualizar usuario $EXISTING_UUID con su mismo email..."
    RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/users/$EXISTING_UUID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{
        \"email\": \"$EXISTING_EMAIL\",
        \"name\": \"Nombre Actualizado\"
      }")
    
    HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
    BODY=$(echo "$RESULT" | sed '/HTTP_STATUS/d')
    
    echo "Status Code: $HTTP_STATUS"
    echo "Response:"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
    
    if [ "$HTTP_STATUS" = "200" ]; then
        echo "✅ CORRECTO: Permite actualizar con el mismo email"
    else
        echo "⚠️  Status inesperado: $HTTP_STATUS"
    fi
fi

echo -e "\n=========================================="
echo "PRUEBAS COMPLETADAS"
echo "=========================================="
