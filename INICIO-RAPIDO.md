# Inicio Rápido - Neuropsico

## Instalación en 3 pasos

### 1. Clonar o ubicar el proyecto
```bash
cd /home/arkantu/docker/neuropsico
```

### 2. Iniciar la aplicación
```bash
# Opción A: Con Make (más simple)
make up

# Opción B: Con Docker Compose
docker-compose up -d
```

### 3. Acceder a la aplicación
Abre tu navegador en: http://localhost:8090

## Comandos útiles

```bash
# Ver logs en tiempo real
make logs

# Detener la aplicación
make down

# Reiniciar la aplicación
make restart

# Ver estado
make status

# Verificar que funciona
make test
```

## Solución de problemas

### Puerto en uso
Si el puerto 8090 está ocupado, puedes cambiarlo:

```bash
# Copiar el archivo de configuración
cp .env.example .env

# Editar el archivo .env y cambiar APP_PORT
nano .env

# Reiniciar
make restart
```

### Reconstruir la imagen
Si algo no funciona, reconstruye desde cero:

```bash
make rebuild
```

### Ver logs de errores
```bash
docker-compose logs -f
```

## Desarrollo

Para desarrollo con recarga automática de archivos:

```bash
# Los volúmenes ya están configurados
# Solo edita los archivos y recarga el navegador
make dev
```

Los cambios en `index.html`, `styles.css` y `script.js` se reflejan inmediatamente.
