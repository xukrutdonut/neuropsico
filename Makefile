.PHONY: help build up down restart logs clean test prod-up prod-down prod-build

help: ## Mostrar esta ayuda
	@echo "Comandos disponibles:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Construir la imagen Docker
	docker-compose build

up: ## Iniciar el contenedor (modo desarrollo)
	docker-compose up -d
	@echo "✓ Aplicación disponible en http://localhost:8090"

down: ## Detener y eliminar el contenedor
	docker-compose down

restart: down up ## Reiniciar el contenedor

logs: ## Ver logs del contenedor
	docker-compose logs -f

status: ## Ver estado del contenedor
	docker-compose ps

clean: ## Limpiar contenedores e imágenes
	docker-compose down -v
	docker rmi neuropsico-neuropsico-app 2>/dev/null || true

rebuild: clean build up ## Limpiar, reconstruir e iniciar

test: ## Probar que la aplicación responde
	@echo "Probando la aplicación..."
	@curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:8090 || echo "Error: La aplicación no está disponible"

shell: ## Abrir shell en el contenedor
	docker-compose exec neuropsico-app sh

dev: ## Modo desarrollo con logs
	docker-compose up

health: ## Verificar salud del contenedor
	@docker inspect --format='{{json .State.Health}}' neuropsico-web 2>/dev/null | grep -q '"Status":"healthy"' && echo "✓ Contenedor saludable" || echo "✗ Contenedor no saludable"

# Comandos de producción
prod-build: ## Construir imagen para producción
	docker-compose -f docker-compose.prod.yml build

prod-up: ## Iniciar en modo producción
	docker-compose -f docker-compose.prod.yml up -d
	@echo "✓ Aplicación en producción disponible en http://localhost:8090"

prod-down: ## Detener modo producción
	docker-compose -f docker-compose.prod.yml down

prod-logs: ## Ver logs de producción
	docker-compose -f docker-compose.prod.yml logs -f

prod-restart: prod-down prod-up ## Reiniciar producción
