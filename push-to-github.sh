#!/bin/bash

echo "=========================================="
echo "  Script para subir cambios a GitHub"
echo "=========================================="
echo ""

# Mostrar commits pendientes
echo "📋 Commits pendientes de subir:"
git log origin/main..HEAD --oneline
echo ""

# Intentar push con reintentos
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    echo "🚀 Intento $(($RETRY_COUNT + 1)) de $MAX_RETRIES..."
    
    if timeout 60 git push origin main; then
        echo ""
        echo "✅ ¡Cambios subidos exitosamente a GitHub!"
        echo ""
        echo "📊 Estado final:"
        git log --oneline -3
        exit 0
    else
        RETRY_COUNT=$(($RETRY_COUNT + 1))
        if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
            echo "⚠️  Intento fallido. Reintentando en 5 segundos..."
            sleep 5
        fi
    fi
done

echo ""
echo "❌ No se pudo subir a GitHub después de $MAX_RETRIES intentos"
echo ""
echo "💡 Opciones:"
echo "   1. Verificar conexión a internet"
echo "   2. Verificar estado de GitHub: https://www.githubstatus.com/"
echo "   3. Intentar manualmente: git push origin main"
echo ""
echo "📝 Los cambios están guardados localmente en estos commits:"
git log origin/main..HEAD --oneline
echo ""

exit 1
