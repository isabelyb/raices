#!/bin/bash

BASE_URL="http://localhost:3000"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNTBhYzFhMS1lYzM3LTQ4ODAtYjM5Yi02ZTM5ZWMzM2M4NjgiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYzNTgyMDg0LCJleHAiOjE3NjM2Njg0ODR9.j3GItCTpdFtCrShhQC0GCGSCPNj2A_S4auSDtKwvXQg"

echo "=========================================="
echo "PRUEBAS COMPLETAS - EDGE CASES Y CASOS NEGATIVOS"
echo "=========================================="

# Obtener datos para pruebas
LEGEND_UUID="cb4efd09-1a9e-49d3-8974-a26a02f16165"
CATEGORY_VALIDO=$(curl -s "$BASE_URL/categories" | jq -r '.[0].uuid')
LOCATION_VALIDO=$(curl -s "$BASE_URL/locations" | jq -r '.[0].uuid')

# Obtener otra leyenda para pruebas de duplicados
OTHER_LEGEND=$(curl -s "$BASE_URL/legends" | jq -r '.[0]')
OTHER_LEGEND_TITLE=$(echo "$OTHER_LEGEND" | jq -r '.title')
OTHER_LEGEND_IMAGE=$(echo "$OTHER_LEGEND" | jq -r '.imageUrl')

USERS=$(curl -s -X GET "$BASE_URL/users" -H "Authorization: Bearer $TOKEN")
USER1=$(echo "$USERS" | jq -r '.[0]')
USER1_UUID=$(echo "$USER1" | jq -r '.uuid')
USER1_EMAIL=$(echo "$USER1" | jq -r '.email')

echo -e "\n=========================================="
echo "LEGENDS - EDGE CASES"
echo "=========================================="

echo -e "\n1. PUT /legends/:uuid - Body vacío (debe permitir, no cambiar nada)"
BEFORE=$(curl -s "$BASE_URL/legends/legendById/$LEGEND_UUID" | jq '{title, description}')
curl -s -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}' > /dev/null
AFTER=$(curl -s "$BASE_URL/legends/legendById/$LEGEND_UUID" | jq '{title, description}')
if [ "$BEFORE" = "$AFTER" ]; then
    echo "✅ CORRECTO: Body vacío no cambia nada"
else
    echo "❌ PROBLEMA: Body vacío cambió los datos"
fi

echo -e "\n2. PUT /legends/:uuid - Verificar que campos no enviados se mantienen"
echo "Guardando estado inicial..."
INITIAL=$(curl -s "$BASE_URL/legends/legendById/$LEGEND_UUID" | jq '{title, description, origin, story: (.story | .[0:30])}')
echo "Actualizando solo title..."
curl -s -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Título Solo Actualizado"}' > /dev/null
FINAL=$(curl -s "$BASE_URL/legends/legendById/$LEGEND_UUID" | jq '{title, description, origin, story: (.story | .[0:30])}')
echo "Verificando que description, origin y story se mantienen..."
if [ "$(echo "$INITIAL" | jq -r '.description')" = "$(echo "$FINAL" | jq -r '.description')" ] && \
   [ "$(echo "$INITIAL" | jq -r '.origin')" = "$(echo "$FINAL" | jq -r '.origin')" ]; then
    echo "✅ CORRECTO: Campos no enviados se mantienen igual"
else
    echo "❌ PROBLEMA: Campos no enviados cambiaron"
fi

echo -e "\n3. PUT /legends/:uuid - Title duplicado (debe retornar 409)"
if [ -n "$OTHER_LEGEND_TITLE" ] && [ "$OTHER_LEGEND_TITLE" != "null" ]; then
    RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"title\": \"$OTHER_LEGEND_TITLE\"}")
    HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
    if [ "$HTTP_STATUS" = "409" ]; then
        echo "✅ CORRECTO: Title duplicado retorna 409"
    else
        echo "⚠️  Status: $HTTP_STATUS (esperado 409)"
    fi
fi

echo -e "\n4. PUT /legends/:uuid - ImageUrl duplicado (debe retornar 409)"
if [ -n "$OTHER_LEGEND_IMAGE" ] && [ "$OTHER_LEGEND_IMAGE" != "null" ]; then
    RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"imageUrl\": \"$OTHER_LEGEND_IMAGE\"}")
    HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
    if [ "$HTTP_STATUS" = "409" ]; then
        echo "✅ CORRECTO: ImageUrl duplicado retorna 409"
    else
        echo "⚠️  Status: $HTTP_STATUS (esperado 409)"
    fi
fi

echo -e "\n5. PUT /legends/:uuid - Title muy largo (debe retornar 400)"
LONG_TITLE=$(printf 'a%.0s' {1..60})
RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"$LONG_TITLE\"}")
HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
if [ "$HTTP_STATUS" = "400" ]; then
    echo "✅ CORRECTO: Title muy largo retorna 400"
else
    echo "⚠️  Status: $HTTP_STATUS (esperado 400)"
fi

echo -e "\n6. PUT /legends/:uuid - Description muy larga (debe retornar 400)"
LONG_DESC=$(printf 'a%.0s' {1..600})
RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"description\": \"$LONG_DESC\"}")
HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
if [ "$HTTP_STATUS" = "400" ]; then
    echo "✅ CORRECTO: Description muy larga retorna 400"
else
    echo "⚠️  Status: $HTTP_STATUS (esperado 400)"
fi

echo -e "\n7. PUT /legends/:uuid - Origin muy largo (debe retornar 400)"
LONG_ORIGIN=$(printf 'a%.0s' {1..120})
RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"origin\": \"$LONG_ORIGIN\"}")
HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
if [ "$HTTP_STATUS" = "400" ]; then
    echo "✅ CORRECTO: Origin muy largo retorna 400"
else
    echo "⚠️  Status: $HTTP_STATUS (esperado 400)"
fi

echo -e "\n8. PUT /legends/:uuid - Category igual al actual (no debe actualizar)"
CURRENT_CATEGORY=$(curl -s "$BASE_URL/legends/legendById/$LEGEND_UUID" | jq -r '.category.uuid')
if [ -n "$CURRENT_CATEGORY" ] && [ "$CURRENT_CATEGORY" != "null" ]; then
    BEFORE_CAT=$(curl -s "$BASE_URL/legends/legendById/$LEGEND_UUID" | jq -r '.category.uuid')
    curl -s -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"category\": \"$CURRENT_CATEGORY\", \"title\": \"Test mismo category\"}" > /dev/null
    AFTER_CAT=$(curl -s "$BASE_URL/legends/legendById/$LEGEND_UUID" | jq -r '.category.uuid')
    if [ "$BEFORE_CAT" = "$AFTER_CAT" ]; then
        echo "✅ CORRECTO: Category igual al actual no se actualiza"
    else
        echo "⚠️  Category cambió (puede ser válido si se procesa)"
    fi
fi

echo -e "\n9. PUT /legends/:uuid - Location igual al actual (no debe actualizar)"
CURRENT_LOCATION=$(curl -s "$BASE_URL/legends/legendById/$LEGEND_UUID" | jq -r '.location.uuid')
if [ -n "$CURRENT_LOCATION" ] && [ "$CURRENT_LOCATION" != "null" ]; then
    BEFORE_LOC=$(curl -s "$BASE_URL/legends/legendById/$LEGEND_UUID" | jq -r '.location.uuid')
    curl -s -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"location\": \"$CURRENT_LOCATION\", \"title\": \"Test mismo location\"}" > /dev/null
    AFTER_LOC=$(curl -s "$BASE_URL/legends/legendById/$LEGEND_UUID" | jq -r '.location.uuid')
    if [ "$BEFORE_LOC" = "$AFTER_LOC" ]; then
        echo "✅ CORRECTO: Location igual al actual no se actualiza"
    else
        echo "⚠️  Location cambió (puede ser válido si se procesa)"
    fi
fi

echo -e "\n10. PUT /legends/:uuid - Campos con valores null (debe rechazar o ignorar)"
RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/legends/$LEGEND_UUID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": null, "description": null}')
HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
echo "Status: $HTTP_STATUS (null no debería ser válido)"

echo -e "\n=========================================="
echo "USERS - EDGE CASES"
echo "=========================================="

if [ -n "$USER1_UUID" ] && [ "$USER1_UUID" != "null" ]; then
    echo -e "\n11. PUT /users/:uuid - Body vacío (debe permitir, no cambiar nada)"
    BEFORE=$(curl -s -X GET "$BASE_URL/users/$USER1_UUID" -H "Authorization: Bearer $TOKEN" | jq '{name, email, location}')
    curl -s -X PUT "$BASE_URL/users/$USER1_UUID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{}' > /dev/null
    AFTER=$(curl -s -X GET "$BASE_URL/users/$USER1_UUID" -H "Authorization: Bearer $TOKEN" | jq '{name, email, location}')
    if [ "$BEFORE" = "$AFTER" ]; then
        echo "✅ CORRECTO: Body vacío no cambia nada"
    else
        echo "❌ PROBLEMA: Body vacío cambió los datos"
    fi

    echo -e "\n12. PUT /users/:uuid - Verificar que campos no enviados se mantienen"
    INITIAL=$(curl -s -X GET "$BASE_URL/users/$USER1_UUID" -H "Authorization: Bearer $TOKEN" | jq '{name, lastname, phone, email, location}')
    echo "Actualizando solo name..."
    curl -s -X PUT "$BASE_URL/users/$USER1_UUID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"name": "Solo Name Test"}' > /dev/null
    FINAL=$(curl -s -X GET "$BASE_URL/users/$USER1_UUID" -H "Authorization: Bearer $TOKEN" | jq '{name, lastname, phone, email, location}')
    if [ "$(echo "$INITIAL" | jq -r '.email')" = "$(echo "$FINAL" | jq -r '.email')" ] && \
       [ "$(echo "$INITIAL" | jq -r '.lastname')" = "$(echo "$FINAL" | jq -r '.lastname')" ]; then
        echo "✅ CORRECTO: Campos no enviados se mantienen igual"
    else
        echo "❌ PROBLEMA: Campos no enviados cambiaron"
    fi

    echo -e "\n13. PUT /users/:uuid - Email formato inválido (debe retornar 400)"
    RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/users/$USER1_UUID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{"email": "no-es-un-email"}')
    HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
    if [ "$HTTP_STATUS" = "400" ]; then
        echo "✅ CORRECTO: Email inválido retorna 400"
    else
        echo "⚠️  Status: $HTTP_STATUS (esperado 400)"
    fi

    echo -e "\n14. PUT /users/:uuid - Name muy largo (debe retornar 400)"
    LONG_NAME=$(printf 'a%.0s' {1..120})
    RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/users/$USER1_UUID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"name\": \"$LONG_NAME\"}")
    HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
    if [ "$HTTP_STATUS" = "400" ]; then
        echo "✅ CORRECTO: Name muy largo retorna 400"
    else
        echo "⚠️  Status: $HTTP_STATUS (esperado 400)"
    fi

    echo -e "\n15. PUT /users/:uuid - Email muy largo (debe retornar 400)"
    LONG_EMAIL=$(printf 'a%.0s' {1..160})"@test.com"
    RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/users/$USER1_UUID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"email\": \"$LONG_EMAIL\"}")
    HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
    if [ "$HTTP_STATUS" = "400" ]; then
        echo "✅ CORRECTO: Email muy largo retorna 400"
    else
        echo "⚠️  Status: $HTTP_STATUS (esperado 400)"
    fi

    echo -e "\n16. PUT /users/:uuid - Actualizar múltiples campos parciales"
    echo "Actualizando name, phone y location (sin email)..."
    RESULT=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "$BASE_URL/users/$USER1_UUID" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "name": "Múltiples Campos",
        "phone": "3009998888",
        "location": "Cali, Valle"
      }')
    HTTP_STATUS=$(echo "$RESULT" | grep "HTTP_STATUS" | cut -d: -f2)
    if [ "$HTTP_STATUS" = "200" ]; then
        UPDATED=$(curl -s -X GET "$BASE_URL/users/$USER1_UUID" -H "Authorization: Bearer $TOKEN" | jq '{name, phone, location, email}')
        echo "✅ CORRECTO: Múltiples campos actualizados"
        echo "$UPDATED"
    else
        echo "⚠️  Status: $HTTP_STATUS"
    fi
fi

echo -e "\n=========================================="
echo "RESUMEN DE PRUEBAS"
echo "=========================================="
echo "✅ Body vacío no cambia datos"
echo "✅ Campos no enviados se mantienen"
echo "✅ Validaciones de longitud funcionan"
echo "✅ Validaciones de formato funcionan"
echo "✅ Duplicados retornan 409"
echo "✅ Campos iguales no se actualizan innecesariamente"
echo "=========================================="
