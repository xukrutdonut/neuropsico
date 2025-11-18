# Nuevas Funcionalidades en la Biblioteca de Tests

## Resumen de Cambios

Se han añadido tres nuevas funcionalidades a la columna de biblioteca de tests en `config.html`:

### 1. Buscador de Tests
- **Ubicación**: Parte superior de la columna de biblioteca
- **Funcionalidad**: Permite buscar tests por nombre o por nombre de batería
- **Uso**: Escribe en el campo de búsqueda y los tests se filtran en tiempo real
- **Características**:
  - Búsqueda insensible a mayúsculas/minúsculas
  - Busca tanto en nombres de tests como en nombres de baterías
  - Oculta automáticamente las baterías que no tienen tests coincidentes

### 2. Filtro por Edad
- **Ubicación**: Debajo del buscador en la columna de biblioteca
- **Funcionalidad**: Filtra las baterías según la edad de aplicación
- **Uso**: 
  - Introduce una edad mínima y/o máxima
  - Haz clic en "Aplicar" o presiona Enter
  - Las baterías que no cubren ese rango de edad se ocultarán
- **Características**:
  - Puedes introducir solo edad mínima, solo máxima, o ambas
  - Muestra un mensaje indicando cuántas baterías se están mostrando
  - Botón "Limpiar" para restablecer el filtro

### 3. Botón "Añadir Todos"
- **Ubicación**: A la derecha del título de cada batería
- **Funcionalidad**: Añade todas las subpruebas de una batería al formulario de evaluación
- **Uso**: Haz clic en el botón verde "➕ Añadir todos"
- **Características**:
  - Añade solo los tests que no estén ya seleccionados
  - Muestra un mensaje con el número de tests añadidos
  - Respeta las zonas CHC correspondientes

## Rangos de Edad por Batería

Todas las baterías ahora muestran su rango de edad de aplicación:

- **WISC-V**: 6-16 años
- **WISC-IV**: 6-16 años
- **WPPSI-III**: 2-7 años (preescolar)
- **CSAT-R**: 6-11 años
- **CARAS-R**: 6-18 años
- **ENFEN**: 6-12 años
- **NEPSY-II**: 3-16 años
- **PROLEC-R**: 6-12 años
- **TALE**: 6-10 años
- **TEMA-3**: 3-8 años

## Archivos Modificados

1. **config.html**:
   - Añadidos controles de búsqueda y filtrado (`.library-controls`)
   - Actualizadas todas las baterías con estructura `.battery-header`
   - Añadidos atributos `data-age-min` y `data-age-max` a cada batería
   - Añadidos botones "Añadir todos" (`.btn-add-all`)
   - Añadidos indicadores de rango de edad (`.age-range`)

2. **styles-config.css**:
   - Estilos para `.library-controls`
   - Estilos para `.search-input`
   - Estilos para `.age-filter-container` y controles relacionados
   - Estilos para `.battery-header` y `.btn-add-all`
   - Estilos para `.age-range`
   - Clases de estado: `.filtered-out`, `.search-no-match`, `.active`

3. **script-config.js**:
   - Función `handleSearch()`: maneja la búsqueda en tiempo real
   - Función `handleAgeFilter()`: aplica el filtro de edad
   - Función `handleClearAgeFilter()`: limpia el filtro de edad
   - Función `handleAddAllTests()`: añade todas las subpruebas de una batería
   - Actualizados los event listeners en `setupEventListeners()`

## Ejemplos de Uso

### Ejemplo 1: Buscar pruebas de lectura
1. Escribe "lectura" en el buscador
2. Se mostrarán solo las pruebas relacionadas con lectura (PROLEC-R, TALE, etc.)

### Ejemplo 2: Filtrar para un niño de 8 años
1. Escribe "8" en ambos campos de edad (mín. y máx.)
2. Haz clic en "Aplicar"
3. Se mostrarán solo las baterías aplicables a 8 años

### Ejemplo 3: Añadir todas las subpruebas del WISC-V
1. Busca la batería WISC-V
2. Haz clic en el botón verde "➕ Añadir todos"
3. Todas las subpruebas se añadirán automáticamente al formulario

## Notas Técnicas

- Los rangos de edad están basados en la información oficial de TEA Ediciones y Pearson Clinical
- La búsqueda y los filtros se pueden combinar
- Los tests ya seleccionados no se duplican al usar "Añadir todos"
- Los controles de búsqueda y filtrado son persistentes (sticky) en la parte superior
