# Estructura de Archivos del Sistema

## 📁 Organización del Proyecto

```
neuropsico/
│
├── 🏠 PÁGINAS PRINCIPALES (Versión 2.0 - Personalizable)
│   ├── index.html                    # Página de bienvenida
│   ├── config.html                   # Configuración de tests (drag & drop)
│   └── evaluation.html               # Evaluación y perfil del neurodesarrollo
│
├── 🎨 ESTILOS
│   ├── styles-config.css             # Estilos para configuración (v2.0)
│   ├── styles-evaluation.css         # Estilos para evaluación (v2.0)
│   └── styles.css                    # Estilos versiones 3.x
│
├── 💻 SCRIPTS JAVASCRIPT
│   ├── script-config.js              # Lógica drag & drop y configuración (v2.0)
│   ├── script-evaluation.js          # Lógica de evaluación dinámica (v2.0)
│   ├── script.js                     # Funciones compartidas (conversiones, gráficos)
│   ├── script-xba.js                 # Lógica Cross-Battery Assessment (v3.2)
│   └── script-old.js                 # Versión clásica (v3.0)
│
├── 🔬 PÁGINAS DE VERSIONES ANTERIORES
│   ├── index-selector.html           # Selector de versiones
│   ├── index-xba.html                # Versión XBA (v3.2)
│   └── (antiguo index.html)          # Versión clásica (v3.0)
│
├── 🧪 TESTS Y DEMOS
│   ├── test-sistema.html             # Tests de verificación del sistema
│   ├── test-xba.html                 # Tests de XBA
│   ├── test-conversiones.html        # Tests de conversiones de escalas
│   └── test-linechart.html           # Tests de gráficos
│
├── 📚 DOCUMENTACIÓN
│   ├── README.md                     # Documentación principal del proyecto
│   ├── GUIA-USO.md                   # 📖 Guía completa de uso (v2.0) ⭐
│   ├── CAMBIOS-V2.md                 # Detalles de implementación v2.0
│   ├── ESTRUCTURA-ARCHIVOS.md        # Este archivo
│   ├── INICIO-RAPIDO.md              # Inicio rápido con Docker
│   ├── IMPLEMENTACION-XBA.md         # Documentación versión XBA
│   ├── BIBLIOGRAFIA-XBA.md           # 55 referencias bibliográficas
│   ├── CROSS-BATTERY-ASSESSMENT.md   # Teoría XBA
│   ├── COMPLETADO-XBA-FASE2.md       # Desarrollo XBA
│   ├── CAMBIOS-GRAFICO-LINEAS.md     # Cambios en gráficos
│   ├── CAMBIOS-PUNTUACIONES-ESTANDARIZADAS.md
│   ├── DOCKERIZACION-COMPLETADA.md   # Documentación Docker
│   ├── TROUBLESHOOTING.md            # Solución de problemas
│   └── RESUMEN-CAMBIOS.txt           # Resumen de cambios
│
├── 🐳 DOCKER
│   ├── Dockerfile                    # Imagen Docker con Nginx
│   ├── docker-compose.yml            # Configuración desarrollo
│   ├── docker-compose.prod.yml       # Configuración producción
│   ├── nginx.conf                    # Configuración Nginx
│   ├── healthcheck.sh                # Script de healthcheck
│   ├── start.sh                      # 🚀 Script inicio rápido
│   ├── stop.sh                       # Script parada
│   └── Makefile                      # Comandos útiles
│
├── 🔧 UTILIDADES
│   ├── run-local.sh                  # 🚀 Script servidor local Python
│   └── INFORME_NP_EJEMPLO.pdf        # Ejemplo de informe
│
└── 🔐 CONFIGURACIÓN
    ├── .env                          # Variables de entorno (gitignored)
    ├── .env.example                  # Ejemplo de variables
    └── .dockerignore                 # Archivos ignorados por Docker

```

## 🎯 Archivos Clave por Uso

### Para Usuarios (Versión 2.0)
```
📖 EMPEZAR AQUÍ
├── index.html              → Página de bienvenida
├── config.html             → Configurar tus tests
├── evaluation.html         → Realizar evaluación
└── GUIA-USO.md            → Guía completa
```

### Para Desarrolladores
```
💻 CÓDIGO PRINCIPAL
├── script-config.js        → Lógica drag & drop
├── script-evaluation.js    → Formulario dinámico
├── script.js               → Conversiones y gráficos
├── styles-config.css       → Diseño configuración
└── styles-evaluation.css   → Diseño evaluación
```

### Para Deploy
```
🐳 DESPLIEGUE
├── start.sh               → Inicio rápido (Docker)
├── run-local.sh           → Servidor local (sin Docker)
├── docker-compose.yml     → Desarrollo
├── docker-compose.prod.yml → Producción
└── nginx.conf             → Configuración web server
```

## 📊 Tamaños de Archivos

### HTML
- config.html: ~35 KB (50 tests drag & drop)
- evaluation.html: ~2 KB (generado dinámicamente)
- index.html: ~3.8 KB (página de bienvenida)

### JavaScript
- script-config.js: ~7 KB (drag & drop)
- script-evaluation.js: ~9 KB (formulario dinámico)
- script.js: ~20 KB (conversiones y gráficos)
- script-xba.js: ~46 KB (XBA completo)

### CSS
- styles-config.css: ~6 KB
- styles-evaluation.css: ~5.6 KB
- styles.css: ~11 KB

### Documentación
- GUIA-USO.md: ~8 KB
- CAMBIOS-V2.md: ~8.3 KB
- BIBLIOGRAFIA-XBA.md: ~80 KB (55 referencias)

## 🔄 Flujo de Archivos v2.0

```
Usuario
  ↓
index.html (Bienvenida)
  ↓ [Click "Comenzar"]
config.html + script-config.js + styles-config.css
  ↓ [Drag & Drop tests]
localStorage (neuropsico_config)
  ↓ [Click "Continuar"]
evaluation.html + script-evaluation.js + styles-evaluation.css
  ↓ [Lee configuración]
Genera formulario dinámico
  ↓ [Usuario introduce datos]
localStorage (neuropsico_scores)
  ↓ [Click "Generar Perfil"]
script.js (conversiones y gráficos)
  ↓
Perfil del Neurodesarrollo visualizado
```

## 📦 Dependencias

### Sin Dependencias Externas
El sistema es completamente autónomo:
- ✅ Sin jQuery
- ✅ Sin Bootstrap
- ✅ Sin Chart.js u otras librerías
- ✅ JavaScript vanilla
- ✅ CSS puro
- ✅ Canvas nativo para gráficos

### Requisitos del Navegador
- HTML5 Canvas
- localStorage API
- Drag & Drop API
- ES6+ JavaScript

## 🔐 Almacenamiento

### localStorage Keys
```javascript
'neuropsico_config'  // Configuración de tests seleccionados
'neuropsico_scores'  // Puntuaciones introducidas
```

### Estructura de Datos

**neuropsico_config**
```json
[
  {
    "test": "ci_total",
    "domain": "inteligencia",
    "chc": "g",
    "scale": "ci",
    "battery": "WISC-V",
    "name": "CI Total"
  },
  ...
]
```

**neuropsico_scores**
```json
{
  "ci_total": 115,
  "icv": 120,
  "semejanzas": 13,
  ...
}
```

## 🎨 Assets

### Fuentes
- Segoe UI (Windows)
- System fonts (fallback)

### Colores
```css
/* Tema principal */
--primary: #667eea → #764ba2 (gradiente)
--secondary: #6c757d
--success: #28a745
--danger: #dc3545
--light: #f8f9fa
--dark: #333333
```

## 🚀 Scripts de Inicio

### run-local.sh
- Puerto: 8080
- Servidor: Python http.server
- URL: http://localhost:8080

### start.sh (Docker)
- Puerto: 8090
- Servidor: Nginx
- URL: http://localhost:8090

## 📈 Métricas

### Total de Tests Disponibles
- WISC-V: 23 tests
- CSAT-R: 2 tests
- CARAS-R: 3 tests
- ENFEN: 6 tests
- NEPSY-II: 3 tests
- PROLEC-R: 9 tests
- TALE: 2 tests
- TEMA-3: 2 tests
- **TOTAL: 50 tests**

### Dominios CHC
- 9 dominios funcionales
- 50 tests mapeados

### Líneas de Código (aprox.)
- HTML: ~1,500 líneas
- JavaScript: ~1,200 líneas
- CSS: ~800 líneas
- Documentación: ~2,500 líneas

---

**Última actualización**: 2024  
**Versión**: 2.0
