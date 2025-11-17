#!/bin/bash

# Script para iniciar el servidor local de la aplicación

PORT=8080
echo "======================================"
echo "Sistema de Evaluación Neuropsicológica"
echo "======================================"
echo ""
echo "Iniciando servidor en puerto $PORT..."
echo ""

# Verificar si el puerto está en uso
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  El puerto $PORT ya está en uso"
    echo "Deteniendo proceso anterior..."
    pkill -f "python3 -m http.server $PORT" 2>/dev/null || true
    sleep 2
fi

# Iniciar servidor
python3 -m http.server $PORT &
SERVER_PID=$!

sleep 2

if ps -p $SERVER_PID > /dev/null 2>&1; then
    echo "✅ Servidor iniciado correctamente"
    echo ""
    echo "📱 Accede a la aplicación en:"
    echo "   http://localhost:$PORT"
    echo ""
    echo "🛑 Para detener el servidor:"
    echo "   Presiona Ctrl+C o ejecuta: pkill -f 'python3 -m http.server $PORT'"
    echo ""
    echo "======================================"
    
    # Mantener el script vivo
    wait $SERVER_PID
else
    echo "❌ Error al iniciar el servidor"
    exit 1
fi
