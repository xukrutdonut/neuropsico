# Sistema de Evaluación Neuropsicológica

Sistema web interactivo para evaluación neuropsicológica con configuración personalizada de tests y visualización del perfil del neurodesarrollo basado en la teoría CHC (Cattell-Horn-Carroll).

## 🎯 Características Principales

### 1. Configuración Personalizada (config.html)
- **Drag & Drop intuitivo**: Arrastra tests desde la biblioteca hacia tu formulario
- **Biblioteca de tests**: Organizada por batería comercial (WISC-V, ENFEN, NEPSY-II, etc.)
- **Formulario personalizado**: Organizado por dominios CHC (Gc, Gf, Gv, Gwm, Gs, Ga, Grw, Gq)
- **Persistencia**: Tu configuración se guarda automáticamente en el navegador

### 2. Evaluación (evaluation.html)
- **Formulario dinámico**: Generado automáticamente según tu configuración
- **Múltiples escalas**: Soporte para CI, T, Escalar, Decatipo, Percentil, PD, z-score
- **Validación automática**: Rangos de valores según cada escala
- **Autoguardado**: Las puntuaciones se guardan mientras escribes

### 3. Visualización
- **Perfil neuropsicológico**: Gráfico de líneas con z-scores
- **Línea de corte patológico**: Marca z = -2 destacada
- **Organización CHC**: Tests agrupados por dominios funcionales
- **Imprimible**: Función de impresión optimizada

## 📋 Flujo de Trabajo

### Paso 1: Página de Bienvenida (index.html)
1. Accede a la aplicación
2. Lee las características del sistema
3. Click en "Comenzar Evaluación"

### Paso 2: Configuración de Tests (config.html)
1. **Columna Izquierda (Biblioteca)**:
   - Tests organizados por batería comercial
   - WISC-V, CSAT-R, CARAS-R, ENFEN, NEPSY-II, PROLEC-R, TALE, TEMA-3
   
2. **Columna Derecha (Formulario)**:
   - Dominios CHC vacíos esperando tests
   - Inteligencia General (g)
   - Conocimiento Cristalizado (Gc)
   - Razonamiento Fluido (Gf)
   - Procesamiento Visual (Gv)
   - Memoria de Trabajo (Gwm)
   - Velocidad de Procesamiento (Gs)
   - Procesamiento Auditivo y Atención (Ga)
   - Lectura y Escritura (Grw)
   - Conocimiento Cuantitativo (Gq)

3. **Acciones**:
   - Arrastra tests de izquierda a derecha
   - Solo puedes soltar un test en su dominio CHC correspondiente
   - Elimina tests con el botón "×"
   - Limpia toda la selección con "Limpiar Selección"
   - Continúa a la evaluación con "Continuar a Evaluación →"

### Paso 3: Evaluación (evaluation.html)
1. **Introducir Puntuaciones**:
   - Formulario organizado por dominios CHC
   - Cada test muestra su batería de origen
   - Rangos de valores validados automáticamente
   - Puntuaciones se guardan automáticamente

2. **Generar Perfil**:
   - Click en "Generar Perfil"
   - Visualización del perfil neuropsicológico
   - Gráfico con z-scores de -3 a +3
   - Línea de corte en z = -2 (roja)

3. **Otras Acciones**:
   - "← Volver a Configuración": Modifica tu selección de tests
   - "Limpiar Datos": Borra todas las puntuaciones
   - "Imprimir": Imprime el perfil

## 🧪 Tests Incluidos

### WISC-V (Wechsler Intelligence Scale for Children)
- **Escala**: CI (M=100, DE=15) para índices, Escalar (M=10, DE=3) para subtests
- **Tests**: CI Total, ICV, IVE, IRF, IMT, IVP y todos sus subtests

### CSAT-R (Atención Sostenida)
- **Escala**: T (M=50, DE=10)
- **Tests**: Aciertos, Errores

### CARAS-R (Atención Selectiva)
- **Escala**: Percentil
- **Tests**: Aciertos, Errores, ICI

### ENFEN (Funciones Ejecutivas)
- **Escala**: Decatipo (M=5.5, DE=2)
- **Tests**: Fluidez Fonológica, Fluidez Semántica, Sendero Gris, Sendero Color, Anillas, Interferencia

### NEPSY-II (Lenguaje)
- **Escala**: Escalar (M=10, DE=3)
- **Tests**: Comprensión de Instrucciones, Procesamiento Fonológico, Velocidad de Denominación

### PROLEC-R (Lectura)
- **Escala**: PD (Puntuación Directa)
- **Tests**: Nombre de Letras, Igual-Diferente, Lectura de Palabras, Lectura de Pseudopalabras, Estructuras Gramaticales, Signos de Puntuación, Comprensión de Oraciones, Comprensión de Textos, Comprensión Oral

### TALE (Escritura)
- **Escala**: z-score
- **Tests**: Ortografía Natural, Ortografía Arbitraria

### TEMA-3 (Matemáticas)
- **Escala**: T (M=50, DE=10)
- **Tests**: Competencia Matemática, Resolución de Problemas

## 🔄 Teoría CHC

El sistema organiza los tests según la teoría Cattell-Horn-Carroll:

- **g**: Inteligencia General
- **Gc**: Conocimiento Cristalizado (lenguaje, vocabulario, información adquirida)
- **Gf**: Razonamiento Fluido (resolución de problemas, pensamiento lógico)
- **Gv**: Procesamiento Visual (percepción y manipulación visual)
- **Gwm**: Memoria de Trabajo (memoria a corto plazo, manipulación mental)
- **Gs**: Velocidad de Procesamiento (rapidez perceptual y cognitiva)
- **Ga**: Procesamiento Auditivo y Atención (atención, concentración)
- **Grw**: Lectura y Escritura (habilidades académicas de lectoescritura)
- **Gq**: Conocimiento Cuantitativo (habilidades matemáticas)

## 📊 Conversión de Puntuaciones

El sistema convierte automáticamente todas las escalas a z-scores:

- **CI**: (X - 100) / 15
- **T**: (X - 50) / 10
- **Escalar**: (X - 10) / 3
- **Decatipo**: (X - 5.5) / 2
- **Percentil**: Conversión mediante tabla de la distribución normal
- **PD**: (X - 10) / 5 (aproximación)
- **z-score**: Uso directo

## 💾 Almacenamiento Local

El sistema utiliza `localStorage` del navegador para guardar:
- **neuropsico_config**: Configuración de tests seleccionados
- **neuropsico_scores**: Puntuaciones introducidas

Los datos persisten entre sesiones del navegador.

## 🖨️ Impresión

La función de impresión está optimizada para:
- Ocultar controles de interfaz
- Mostrar solo el gráfico del perfil
- Formato A4 vertical

## 🚀 Instalación y Uso

### Opción 1: Servidor Local Python
```bash
cd /ruta/a/neuropsico
python3 -m http.server 8080
# Accede a http://localhost:8080
```

### Opción 2: Docker (si está configurado)
```bash
docker-compose up -d
# Accede según configuración de puertos
```

### Opción 3: Abrir directamente
Simplemente abre `index.html` en tu navegador moderno (Chrome, Firefox, Edge, Safari)

## 🌐 Navegadores Soportados

- Google Chrome / Chromium (recomendado)
- Mozilla Firefox
- Microsoft Edge
- Safari

Requiere soporte para:
- HTML5 Canvas
- localStorage
- Drag & Drop API

## 📝 Notas de Uso

1. **Primera vez**: Comienza configurando tus tests en config.html
2. **Modificar configuración**: Puedes volver a config.html en cualquier momento
3. **Datos persistentes**: Los datos se mantienen en el navegador hasta que los limpies
4. **Sin backend**: Todo funciona en el navegador, no se envía información a servidores
5. **Privacidad**: Los datos del paciente nunca salen de tu dispositivo

## 🔧 Archivos del Sistema

```
neuropsico/
├── index.html              # Página de bienvenida
├── config.html             # Configuración de tests (drag & drop)
├── evaluation.html         # Evaluación y perfil
├── styles-config.css       # Estilos de configuración
├── styles-evaluation.css   # Estilos de evaluación
├── script-config.js        # Lógica de drag & drop
├── script-evaluation.js    # Lógica de evaluación
└── script.js               # Funciones compartidas (conversiones, gráficos)
```

## 🎨 Personalización

El sistema está diseñado para ser fácilmente ampliable:

1. **Añadir nuevos tests**: Edita `config.html` añadiendo nuevos elementos `.test-item`
2. **Nuevas escalas**: Añade conversiones en `script.js` en el objeto `standardScales`
3. **Nuevos dominios CHC**: Añade nuevas secciones `.chc-domain` en ambas páginas

## ⚠️ Limitaciones

- No incluye interpretación clínica automatizada
- Las conversiones de PD son aproximaciones (requieren baremos específicos por edad)
- No genera informes automáticos (solo visualización)
- Requiere conexión a internet solo para cargar el navegador (funciona offline después)

## 📄 Licencia

Sistema desarrollado para uso clínico en evaluación neuropsicológica infantil.

---

**Versión**: 2.0  
**Última actualización**: 2024  
**Autor**: Sistema de Evaluación Neuropsicológica
