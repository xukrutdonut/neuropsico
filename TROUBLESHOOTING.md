# Solución de Problemas - Neuropsico

## Problemas comunes y soluciones

### 1. Puerto en uso

**Síntoma:** Error al iniciar: `port is already allocated`

**Solución:**
```bash
# Opción 1: Cambiar el puerto
./start.sh 3000

# Opción 2: Encontrar qué proceso usa el puerto
sudo lsof -i :8090
# O en sistemas sin lsof
sudo netstat -tulpn | grep 8090

# Opción 3: Modificar .env
cp .env.example .env
nano .env  # Cambiar APP_PORT
make restart
```

### 2. Contenedor no inicia

**Síntoma:** El contenedor se detiene inmediatamente después de iniciarse

**Diagnóstico:**
```bash
# Ver logs del contenedor
docker-compose logs

# Ver estado
docker-compose ps

# Inspeccionar el contenedor
docker inspect neuropsico-web
```

**Soluciones:**
```bash
# Reconstruir desde cero
make clean
make build
make up

# O con el script
./stop.sh
./start.sh
```

### 3. Aplicación no responde

**Síntoma:** El contenedor está corriendo pero http://localhost:8090 no responde

**Diagnóstico:**
```bash
# Verificar que el contenedor está corriendo
docker ps | grep neuropsico

# Verificar logs de nginx
docker-compose logs -f

# Verificar salud
./healthcheck.sh
```

**Soluciones:**
```bash
# Reiniciar el contenedor
make restart

# Verificar dentro del contenedor
docker-compose exec neuropsico-app sh
# Dentro del contenedor:
ls -la /usr/share/nginx/html/
cat /var/log/nginx/error.log
```

### 4. Cambios en código no se reflejan

**Síntoma:** Modificas HTML/CSS/JS pero no ves cambios

**Solución:**
```bash
# Modo desarrollo: Los cambios se reflejan automáticamente
# Solo recarga el navegador (Ctrl+F5 para forzar)

# Si aún no funciona:
docker-compose restart

# Para modo producción, reconstruir:
make rebuild
```

### 5. Permisos denegados

**Síntoma:** Error de permisos al ejecutar scripts

**Solución:**
```bash
# Dar permisos de ejecución
chmod +x start.sh stop.sh healthcheck.sh

# O todos a la vez
chmod +x *.sh
```

### 6. Docker no disponible

**Síntoma:** `docker: command not found`

**Solución:**
```bash
# Verificar instalación de Docker
docker --version

# Si no está instalado, instalar según tu sistema:
# Ubuntu/Debian:
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar usuario al grupo docker (evitar sudo)
sudo usermod -aG docker $USER
# Cerrar sesión y volver a entrar
```

### 7. Docker Compose no disponible

**Síntoma:** `docker-compose: command not found`

**Solución:**
```bash
# Ubuntu/Debian:
sudo apt-get update
sudo apt-get install docker-compose

# O instalar la versión más reciente:
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 8. Error de red en el contenedor

**Síntoma:** El contenedor no puede acceder a la red

**Solución:**
```bash
# Recrear la red
docker-compose down
docker network prune -f
docker-compose up -d

# O especificar el driver de red
docker-compose down
docker network create neuropsico-net --driver bridge
docker-compose up -d
```

### 9. Imagen corrupta

**Síntoma:** Errores extraños al construir o ejecutar

**Solución:**
```bash
# Limpiar todo y reconstruir
docker-compose down -v
docker system prune -af
docker-compose build --no-cache
docker-compose up -d
```

### 10. No hay espacio en disco

**Síntoma:** `no space left on device`

**Solución:**
```bash
# Ver uso de espacio por Docker
docker system df

# Limpiar imágenes no usadas
docker image prune -a

# Limpiar todo (cuidado: elimina todo lo no usado)
docker system prune -af --volumes
```

## Verificación de estado

Para verificar que todo está funcionando correctamente:

```bash
# Script completo de verificación
./healthcheck.sh

# O manualmente:
docker ps | grep neuropsico
curl http://localhost:8090
docker-compose logs --tail=50
```

## Logs útiles

```bash
# Ver todos los logs
docker-compose logs

# Ver logs en tiempo real
docker-compose logs -f

# Ver últimas 100 líneas
docker-compose logs --tail=100

# Ver logs de nginx dentro del contenedor
docker-compose exec neuropsico-app cat /var/log/nginx/access.log
docker-compose exec neuropsico-app cat /var/log/nginx/error.log
```

## Comandos de depuración

```bash
# Entrar al contenedor
docker-compose exec neuropsico-app sh

# Ver procesos en el contenedor
docker-compose exec neuropsico-app ps aux

# Ver configuración de nginx
docker-compose exec neuropsico-app cat /etc/nginx/conf.d/default.conf

# Ver archivos de la aplicación
docker-compose exec neuropsico-app ls -la /usr/share/nginx/html/

# Probar nginx manualmente
docker-compose exec neuropsico-app nginx -t
```

## Contacto y soporte

Si ninguna de estas soluciones funciona:

1. Verifica que tienes la última versión del código
2. Revisa los logs con `docker-compose logs -f`
3. Ejecuta el healthcheck: `./healthcheck.sh`
4. Recopila información del sistema:
   ```bash
   docker --version
   docker-compose --version
   docker info
   docker-compose config
   ```

## Modo de recuperación

Si nada funciona, reset completo:

```bash
# Detener todo
docker-compose down -v

# Limpiar Docker
docker system prune -af

# Reclonar o verificar archivos
ls -la

# Reconstruir desde cero
./start.sh
```
