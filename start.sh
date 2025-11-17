#!/bin/bash

# Script de inicio automático para Neuropsico
# Uso: ./start.sh [puerto]

set -e

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Neuropsico - Inicializador Docker    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Puerto por defecto
PORT=${1:-8090}

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Error: Docker no está instalado${NC}"
    echo "Por favor, instala Docker desde: https://docs.docker.com/get-docker/"
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗ Error: Docker Compose no está instalado${NC}"
    echo "Por favor, instala Docker Compose desde: https://docs.docker.com/compose/install/"
    exit 1
fi

echo -e "${GREEN}✓ Docker encontrado${NC}"
echo -e "${GREEN}✓ Docker Compose encontrado${NC}"
echo ""

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo -e "${YELLOW}→ Creando archivo .env...${NC}"
    cat > .env << EOF
APP_PORT=${PORT}
CONTAINER_NAME=neuropsico-web
EOF
    echo -e "${GREEN}✓ Archivo .env creado${NC}"
else
    echo -e "${GREEN}✓ Archivo .env existente${NC}"
fi

echo ""

# Detener contenedor existente si está corriendo
if docker ps -a --format '{{.Names}}' | grep -q "^neuropsico-web$"; then
    echo -e "${YELLOW}→ Deteniendo contenedor existente...${NC}"
    docker-compose down > /dev/null 2>&1
    echo -e "${GREEN}✓ Contenedor detenido${NC}"
fi

echo ""
echo -e "${BLUE}→ Construyendo imagen Docker...${NC}"
docker-compose build

echo ""
echo -e "${BLUE}→ Iniciando contenedor...${NC}"
docker-compose up -d

echo ""
echo -e "${GREEN}✓ Aplicación iniciada correctamente${NC}"
echo ""
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Accede a la aplicación en:           ║${NC}"
echo -e "${BLUE}║  ${GREEN}http://localhost:${PORT}${BLUE}                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""
echo "Comandos útiles:"
echo "  • Ver logs:          docker-compose logs -f"
echo "  • Detener:           docker-compose down"
echo "  • Reiniciar:         docker-compose restart"
echo "  • Estado:            docker-compose ps"
echo ""

# Verificar que el contenedor está saludable
echo -e "${YELLOW}→ Verificando estado del contenedor...${NC}"
sleep 3

if docker ps --format '{{.Names}}' | grep -q "^neuropsico-web$"; then
    echo -e "${GREEN}✓ Contenedor ejecutándose correctamente${NC}"
    
    # Probar que responde
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:${PORT} | grep -q "200"; then
        echo -e "${GREEN}✓ Aplicación respondiendo correctamente${NC}"
    else
        echo -e "${YELLOW}⚠ El contenedor está corriendo pero aún no responde${NC}"
        echo "  Espera unos segundos e intenta acceder a la aplicación"
    fi
else
    echo -e "${RED}✗ El contenedor no está ejecutándose${NC}"
    echo "  Revisa los logs con: docker-compose logs"
    exit 1
fi

echo ""
echo -e "${GREEN}¡Todo listo! 🚀${NC}"
