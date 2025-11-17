# Sistema de Evaluación Neuropsicológica

Aplicación web profesional para evaluación neuropsicológica con **configuración personalizada de tests** y visualización del perfil del neurodesarrollo basado en la teoría CHC (Cattell-Horn-Carroll).

## 🎯 Tres Versiones Disponibles

### Versión 2.0 - Configuración Personalizada ⭐ NUEVA Y RECOMENDADA
- **Drag & Drop**: Personaliza tu batería de tests arrastrando elementos
- **Organización dual**: 
  - Biblioteca por batería comercial (WISC-V, ENFEN, etc.)
  - Formulario por dominios CHC (Gc, Gf, Gv, Gwm, Gs, etc.)
- **Flujo de 2 páginas**:
  1. Configuración de tests (config.html)
  2. Evaluación y perfil (evaluation.html)
- **Formulario dinámico**: Solo los tests que necesitas
- **50 tests disponibles** de 8 baterías diferentes
- **Persistencia automática**: Datos guardados en el navegador
- 📖 **[Ver Guía de Uso Completa](GUIA-USO.md)**

### Versión 3.0 - Gráfico de Líneas (Clásica)
- Visualización de todas las subpuntuaciones individuales
- Gráfico de líneas continuo conectando todos los tests
- 48 entradas de subtests individuales
- Línea roja de referencia en z=-2 (límite clínico)
- Organización por tests y baterías

### Versión 3.2 - Cross-Battery Assessment (XBA)
- Basada en teoría CHC (Cattell-Horn-Carroll)
- Organización por **9 capacidades amplias**
- Clasificación de tests por fuerza (Strong/Moderate)
- Ponderación científica de medidas
- Múltiples medidas por capacidad (≥2)
- Visualización por capacidades amplias
- **55 referencias bibliográficas** completas

## Características Principales

- **Estructura basada en tests neuropsicológicos reales**: 
  - WISC-V (Inteligencia) - 21 entradas completas
  - CSAT-R, CARAS-R (Atención)
  - ENFEN (Funciones Ejecutivas) - 6 subtests
  - NEPSY-II (Lenguaje) - 3 subtests
  - PROLEC-R (Lectura) - 9 procesos
  - TALE (Escritura) - 2 medidas
  - TEMA-3 (Matemáticas) - 2 medidas

- **Puntuaciones estandarizadas reales**: CI, T, Escalar, Decatipo, V, z-scores, Percentil
- **Conversión automática a z-scores**: Métrica común para comparación
- **Fundamentación teórica sólida**: Basado en 100+ años de investigación CHC
- **Gráficos profesionales**: Visualización clara y precisa
- **Exportación PDF**: Función de impresión integrada
- **Dockerizado completamente**: Despliegue fácil y rápido
  - Script de inicio automático
  - Docker Compose para desarrollo y producción
  - Makefile con comandos útiles
  - Healthcheck integrado
  - Nginx optimizado con caché y compresión

## Inicio Rápido

### Versión 2.0 (Nueva - Personalizable)

**Opción 1: Servidor local simple**
```bash
./run-local.sh
# O manualmente:
python3 -m http.server 8080
```
Luego abre http://localhost:8080 en tu navegador.

**Opción 2: Abrir directamente**
Simplemente abre `index.html` en tu navegador moderno (Chrome, Firefox, Edge, Safari)

### Versión 3.x (Clásica/XBA)

**Docker (recomendado)**
```bash
./start.sh
```
Luego abre http://localhost:8090 en tu navegador.

Ver [INICIO-RAPIDO.md](INICIO-RAPIDO.md) para más detalles.

## 📚 Documentación

- **[GUIA-USO.md](GUIA-USO.md)** - Guía completa de la versión 2.0 personalizable
- **[CAMBIOS-V2.md](CAMBIOS-V2.md)** - Detalles técnicos de implementación v2.0
- **[INICIO-RAPIDO.md](INICIO-RAPIDO.md)** - Inicio rápido con Docker
- **[IMPLEMENTACION-XBA.md](IMPLEMENTACION-XBA.md)** - Documentación versión XBA
- **[BIBLIOGRAFIA-XBA.md](BIBLIOGRAFIA-XBA.md)** - 55 referencias bibliográficas
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solución de problemas

## Estructura de Tests Evaluados

### 1. INTELIGENCIA (WISC-V)

**CI Total** - Escala CI (M=100, DE=15)

**Índice Comprensión Verbal (ICV)** - CI (M=100, DE=15)
- Semejanzas - Escalar (M=10, DE=3)
- Vocabulario - Escalar (M=10, DE=3)
- Información - Escalar (M=10, DE=3)
- Comprensión - Escalar (M=10, DE=3)

**Índice Visoespacial (IVE)** - CI (M=100, DE=15)
- Cubos - Escalar (M=10, DE=3)
- Puzles visuales - Escalar (M=10, DE=3)

**Índice Razonamiento Fluido (IRF)** - CI (M=100, DE=15)
- Matrices - Escalar (M=10, DE=3)
- Balanzas - Escalar (M=10, DE=3)
- Aritmética - Escalar (M=10, DE=3)

**Índice Memoria de Trabajo (IMT)** - CI (M=100, DE=15)
- Dígitos - Escalar (M=10, DE=3)
- Span de dibujos - Escalar (M=10, DE=3)
- Letras y números - Escalar (M=10, DE=3)

**Índice Velocidad de Procesamiento (IVP)** - CI (M=100, DE=15)
- Claves - Escalar (M=10, DE=3)
- Búsqueda de símbolos - Escalar (M=10, DE=3)
- Cancelación - Escalar (M=10, DE=3)

### 2. ATENCIÓN

**CSAT-R (Atención sostenida)** - Escala T (M=50, DE=10)
- Aciertos
- Errores

**CARAS-R (Atención selectiva)** - Percentil
- Aciertos
- Errores
- Índice Control Impulsividad (ICI)

### 3. FUNCIONES EJECUTIVAS (ENFEN)

**Escala: Decatipo (M=5.5, DE=2)** - Puntuaciones 1-10
- Fluidez fonológica
- Fluidez semántica
- Sendero gris (atención)
- Sendero color (flexibilidad)
- Anillas (planificación)
- Interferencia

### 4. LENGUAJE (NEPSY-II)

**Escala: Puntuación Escalar (M=10, DE=3)**
- Comprensión de instrucciones
- Procesamiento fonológico
- Velocidad de denominación

### 5. LECTURA (PROLEC-R)

**Escala: Puntuación Directa (se convierte a z-score)**
- Nombre de letras
- Igual-diferente
- Lectura de palabras
- Lectura de pseudopalabras
- Estructuras gramaticales
- Signos de puntuación
- Comprensión de oraciones
- Comprensión de textos
- Comprensión oral

### 6. ESCRITURA (TALE)

**Escala: z-score directo**
- Ortografía natural
- Ortografía arbitraria

### 7. MATEMÁTICAS (TEMA-3)

**Escala: Puntuación T (M=50, DE=10)**
- Competencia matemática
- Resolución de problemas

## Uso con Docker

### Requisitos previos
- Docker
- Docker Compose

### Opción 1: Script de inicio automático (más fácil)

```bash
# Iniciar (puerto por defecto 8090)
./start.sh

# Iniciar en puerto personalizado
./start.sh 3000

# Detener
./stop.sh

# Verificar salud
./healthcheck.sh
```

### Opción 2: Usando Makefile (recomendado para desarrollo)

```bash
# Ver todos los comandos disponibles
make help

# Construir y ejecutar
make up

# Ver logs
make logs

# Detener
make down

# Reiniciar
make restart

# Reconstruir completamente
make rebuild

# Ver estado
make status

# Probar que funciona
make test

# Verificar salud
make health
```

### Opción 3: Docker Compose

```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Reconstruir
docker-compose up -d --build
```

La aplicación estará disponible en: http://localhost:8090

### Opción 4: Docker directamente

```bash
# Construir la imagen
docker build -t neuropsico-app .

# Ejecutar el contenedor
docker run -d -p 8090:80 --name neuropsico neuropsico-app

# Ver logs
docker logs -f neuropsico

# Detener el contenedor
docker stop neuropsico

# Eliminar el contenedor
docker rm neuropsico
```

### Configuración del puerto

El puerto por defecto es 8090, pero puedes cambiarlo:

**Método 1: Con el script de inicio**
```bash
./start.sh 3000  # Usa el puerto 3000
```

**Método 2: Con archivo .env**
```bash
# Crear archivo .env
cp .env.example .env

# Editar .env y cambiar APP_PORT
nano .env

# Luego reiniciar
make restart
```

## Uso sin Docker

Simplemente abre `index.html` en un navegador moderno.

## Cómo usar la aplicación

1. **Introduce las puntuaciones estandarizadas**: Ingresa las puntuaciones de cada test según su escala correspondiente:
   - **CI** (WISC-V índices): valores típicos 40-160
   - **T** (CSAT-R, TEMA-3): valores típicos 20-80
   - **Escalar** (Subtests WISC-V, NEPSY-II): valores típicos 1-19
   - **Decatipo** (ENFEN): valores 1-10
   - **Percentil** (CARAS-R): valores 1-99
   - **z-score** (TALE): valores -3 a +3

2. **Conversión automática**: El sistema convierte cada puntuación a z-score usando: z = (Puntuación - Media) / DE

3. **Genera el gráfico**: Haz clic en "Generar Perfil" para visualizar el perfil neuropsicológico

4. **Visualiza los resultados**: 
   - Gráfico de líneas conectando todos los tests
   - Cada punto muestra el z-score y la puntuación original
   - Línea roja en z=-2 marca el límite clínico
   - Nombres de los tests en el eje horizontal

5. **Imprime o exporta**: Usa el botón "Imprimir" para guardar como PDF

## Características del Gráfico

- **Línea continua azul**: Conecta todas las puntuaciones mostrando el perfil completo
- **Puntos individuales**: Cada test se visualiza como un punto en la línea
- **Línea roja discontinua (z=-2)**: Referencia del límite clínico/patológico
- **z-scores visibles**: Sobre cada punto se muestra el z-score calculado
- **Puntuaciones originales**: Debajo de cada punto aparece la puntuación original con su escala
- **Sin colores por dominio**: Todos los tests en una misma línea para facilitar la lectura
- **Etiquetas rotadas**: Nombres de tests en diagonal para mayor legibilidad

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Canvas API para gráficos
- Docker & Docker Compose
- Nginx (servidor web)

## Estructura de archivos

```
neuropsico/
├── .github/
│   └── workflows/
│       └── docker-build.yml   # GitHub Actions CI/CD
├── Dockerfile                 # Configuración de Docker
├── docker-compose.yml         # Configuración para desarrollo
├── docker-compose.prod.yml    # Configuración para producción
├── .dockerignore             # Archivos excluidos de la imagen
├── .env.example              # Ejemplo de variables de entorno
├── nginx.conf                # Configuración optimizada de Nginx
├── Makefile                  # Comandos comunes
├── start.sh                  # Script de inicio automático
├── stop.sh                   # Script para detener
├── healthcheck.sh            # Verificación completa de salud
├── README.md                 # Documentación completa (este archivo)
├── INICIO-RAPIDO.md          # Guía de inicio rápido
├── TROUBLESHOOTING.md        # Solución de problemas
├── index.html                # Aplicación principal
├── styles.css                # Estilos
├── script.js                 # Lógica JavaScript
└── INFORME_NP_EJEMPLO.pdf    # Informe de referencia
```

## Desarrollo

Para modificar la aplicación en modo desarrollo con recarga automática:

```bash
# Opción 1: Con Makefile
make up
# Los volúmenes en docker-compose.yml permiten ver cambios en tiempo real

# Opción 2: Con logs visibles
make dev

# Opción 3: Con el script
./start.sh
```

Edita los archivos HTML, CSS o JS y los cambios se reflejarán automáticamente (solo refresca el navegador).

### Modo producción

Para despliegue en producción sin volúmenes de desarrollo:

```bash
# Con Makefile
make prod-build
make prod-up

# Con Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Verificación de salud

```bash
# Script completo de healthcheck
./healthcheck.sh

# Con Makefile
make health

# Ver estado
make status
```

## Documentación adicional

- [INICIO-RAPIDO.md](INICIO-RAPIDO.md) - Guía de inicio rápido en 3 pasos
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Solución de problemas comunes

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `start.sh` | Inicia la aplicación automáticamente |
| `stop.sh` | Detiene la aplicación |
| `healthcheck.sh` | Verifica el estado completo de la aplicación |

## Comandos Make disponibles

```bash
make help          # Ver todos los comandos
make up            # Iniciar (desarrollo)
make down          # Detener
make restart       # Reiniciar
make logs          # Ver logs
make build         # Construir imagen
make rebuild       # Limpiar y reconstruir
make test          # Probar HTTP
make health        # Verificar salud
make shell         # Entrar al contenedor
make prod-up       # Iniciar en producción
make prod-down     # Detener producción
```

## Notas

- **Gráfico de líneas**: Visualización continua de todas las puntuaciones individuales
- **Línea roja z=-2**: Marca el límite clínico de referencia
- **Puntuaciones estandarizadas**: El sistema usa las puntuaciones reales de cada test
- **Conversión a z-scores**: Fórmula: z = (Puntuación - Media) / Desviación Estándar
- **Escalas soportadas**:
  - CI: Media=100, DE=15 (WISC-V índices)
  - T: Media=50, DE=10 (CSAT-R, TEMA-3)
  - Escalar: Media=10, DE=3 (Subtests WISC-V, NEPSY-II)
  - Decatipo: Media=5.5, DE=2 (ENFEN)
  - Percentil: Se convierte usando tabla estándar (CARAS-R)
  - z: Media=0, DE=1 (TALE - directo)
  - PD: Puntuación Directa (PROLEC-R - requiere baremos por edad)
- Todos los tests individuales aparecen en el gráfico
- No es necesario completar todos los tests, solo los administrados
- El gráfico sigue el formato estándar de perfiles neuropsicológicos (rango: -3 a +3)

## Licencia

Este proyecto está diseñado para uso profesional en el ámbito de la neuropsicología clínica.
