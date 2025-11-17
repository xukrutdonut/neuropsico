#!/bin/bash

# Script de verificación de salud
# Uso: ./healthcheck.sh

set -e

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PORT=${1:-8090}

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Neuropsico - Verificación de salud   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# 1. Verificar si Docker está corriendo
echo -n "Docker service: "
if systemctl is-active --quiet docker 2>/dev/null || docker info >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Corriendo${NC}"
else
    echo -e "${RED}✗ No disponible${NC}"
    exit 1
fi

# 2. Verificar si el contenedor existe
echo -n "Contenedor existe: "
if docker ps -a --format '{{.Names}}' | grep -q "^neuropsico-web$"; then
    echo -e "${GREEN}✓ Sí${NC}"
else
    echo -e "${RED}✗ No${NC}"
    exit 1
fi

# 3. Verificar si el contenedor está corriendo
echo -n "Contenedor corriendo: "
if docker ps --format '{{.Names}}' | grep -q "^neuropsico-web$"; then
    echo -e "${GREEN}✓ Sí${NC}"
else
    echo -e "${RED}✗ No${NC}"
    exit 1
fi

# 4. Verificar estado del contenedor
echo -n "Estado del contenedor: "
STATUS=$(docker inspect --format='{{.State.Status}}' neuropsico-web 2>/dev/null)
if [ "$STATUS" = "running" ]; then
    echo -e "${GREEN}✓ Running${NC}"
else
    echo -e "${RED}✗ $STATUS${NC}"
    exit 1
fi

# 5. Verificar healthcheck
echo -n "Health check: "
HEALTH=$(docker inspect --format='{{.State.Health.Status}}' neuropsico-web 2>/dev/null || echo "none")
if [ "$HEALTH" = "healthy" ]; then
    echo -e "${GREEN}✓ Healthy${NC}"
elif [ "$HEALTH" = "none" ]; then
    echo -e "${YELLOW}⚠ Sin healthcheck configurado${NC}"
else
    echo -e "${YELLOW}⚠ $HEALTH${NC}"
fi

# 6. Verificar puerto
echo -n "Puerto $PORT abierto: "
if docker port neuropsico-web 80 2>/dev/null | grep -q "$PORT"; then
    echo -e "${GREEN}✓ Sí${NC}"
else
    echo -e "${RED}✗ No${NC}"
    exit 1
fi

# 7. Verificar respuesta HTTP
echo -n "HTTP Response: "
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${PORT} 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ 200 OK${NC}"
else
    echo -e "${RED}✗ $HTTP_CODE${NC}"
    exit 1
fi

# 8. Verificar contenido HTML
echo -n "Contenido válido: "
if curl -s http://localhost:${PORT} | grep -q "Neuropsicológico"; then
    echo -e "${GREEN}✓ Sí${NC}"
else
    echo -e "${RED}✗ No${NC}"
    exit 1
fi

# 9. Estadísticas del contenedor
echo ""
echo -e "${BLUE}Estadísticas del contenedor:${NC}"
docker stats --no-stream --format "  CPU: {{.CPUPerc}}\n  Memoria: {{.MemUsage}}\n  Red: {{.NetIO}}" neuropsico-web

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✓ Todas las verificaciones pasaron   ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo "Aplicación disponible en: http://localhost:${PORT}"
echo ""
