#!/bin/bash

# Script para detener Neuropsico
# Uso: ./stop.sh

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Neuropsico - Deteniendo aplicación   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

if docker ps --format '{{.Names}}' | grep -q "^neuropsico-web$"; then
    echo -e "${BLUE}→ Deteniendo contenedor...${NC}"
    docker-compose down
    echo ""
    echo -e "${GREEN}✓ Aplicación detenida correctamente${NC}"
else
    echo -e "${RED}✗ No hay contenedor ejecutándose${NC}"
fi

echo ""
