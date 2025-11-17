# Cambios: Gráfico de Líneas con Subpuntuaciones Individuales

## Resumen de Cambios v3.0

Se ha transformado completamente el sistema de visualización del perfil neuropsicológico:

### Antes (v2.0)
- ❌ Gráfico de barras horizontales coloreadas por dominio
- ❌ Mostraba promedios por dominio cognitivo
- ❌ Colores diferentes para cada área

### Ahora (v3.0)
- ✅ Gráfico de líneas y puntos
- ✅ Muestra todas las subpuntuaciones individuales
- ✅ Línea roja de referencia en z=-2 (límite clínico)
- ✅ Información completa en el gráfico (no necesita secciones adicionales)
- ✅ Estructura completa de cada test según manuales TEA

## Cambios Principales

### 1. Tipo de Gráfico

**Nuevo: Gráfico de Líneas con Puntos**
- Línea continua azul conectando todos los tests
- Punto circular en cada test
- z-score mostrado sobre cada punto
- Puntuación original mostrada debajo (con su escala)
- Etiquetas de tests rotadas 45° para legibilidad

### 2. Línea de Referencia Clínica

**Línea roja discontinua en z = -2**
- Marca el límite clínico/patológico
- Destacada visualmente del resto de líneas de referencia
- Etiqueta explicativa: "z = -2 (Límite clínico)"

### 3. Tests Expandidos con Estructura Real

#### WISC-V Completo (21 entradas)
```
CI Total
├─ ICV (Índice Comprensión Verbal)
│  ├─ Semejanzas
│  ├─ Vocabulario
│  ├─ Información
│  └─ Comprensión
├─ IVE (Índice Visoespacial)
│  ├─ Cubos
│  └─ Puzles visuales
├─ IRF (Índice Razonamiento Fluido)
│  ├─ Matrices
│  ├─ Balanzas
│  └─ Aritmética
├─ IMT (Índice Memoria de Trabajo)
│  ├─ Dígitos
│  ├─ Span de dibujos
│  └─ Letras y números
└─ IVP (Índice Velocidad de Procesamiento)
   ├─ Claves
   ├─ Búsqueda de símbolos
   └─ Cancelación
```

#### CSAT-R (2 medidas)
- Aciertos - T
- Errores - T

#### CARAS-R (3 medidas)
- Aciertos - Percentil
- Errores - Percentil
- ICI (Índice Control Impulsividad) - Percentil

#### ENFEN (6 subtests)
- Fluidez fonológica - Decatipo
- Fluidez semántica - Decatipo
- Sendero gris (atención) - Decatipo
- Sendero color (flexibilidad) - Decatipo
- Anillas (planificación) - Decatipo
- Interferencia - Decatipo

#### NEPSY-II (3 subtests)
- Comprensión de instrucciones - Escalar
- Procesamiento fonológico - Escalar
- Velocidad de denominación - Escalar

#### PROLEC-R (9 procesos)
- Nombre de letras - PD
- Igual-diferente - PD
- Lectura de palabras - PD
- Lectura de pseudopalabras - PD
- Estructuras gramaticales - PD
- Signos de puntuación - PD
- Comprensión de oraciones - PD
- Comprensión de textos - PD
- Comprensión oral - PD

#### TALE (2 medidas)
- Ortografía natural - z-score directo
- Ortografía arbitraria - z-score directo

#### TEMA-3 (2 medidas)
- Competencia matemática - T
- Resolución de problemas - T

**Total: 48 entradas individuales**

## Escalas Implementadas

| Escala | Media | DE | Rango | Tests |
|--------|-------|-----|-------|-------|
| **CI** | 100 | 15 | 40-160 | WISC-V índices |
| **Escalar** | 10 | 3 | 1-19 | WISC-V subtests, NEPSY-II |
| **T** | 50 | 10 | 20-80 | CSAT-R, TEMA-3 |
| **Decatipo** | 5.5 | 2 | 1-10 | ENFEN |
| **Percentil** | 50 | 30 | 1-99 | CARAS-R |
| **z** | 0 | 1 | -3 a +3 | TALE |
| **PD** | Variable | Variable | Variable | PROLEC-R |

## Cambios en el Código

### HTML (index.html)

#### Antes:
```html
<div class="input-group">
    <label>Comprensión verbal:</label>
    <input data-test="comp_verbal" data-scale="ci">
</div>
```

#### Ahora:
```html
<h4 class="subcategory">Comprensión Verbal <span class="scale-tag">CI (M=100, DE=15)</span></h4>
<div class="input-group">
    <label>Índice Comprensión Verbal:</label>
    <input data-test="icv" data-scale="ci" data-category="comp_verbal">
</div>
<div class="input-group subtest">
    <label>— Semejanzas:</label>
    <input data-test="semejanzas" data-scale="scalar" data-category="comp_verbal">
</div>
<div class="input-group subtest">
    <label>— Vocabulario:</label>
    <input data-test="vocabulario" data-scale="scalar" data-category="comp_verbal">
</div>
<!-- etc -->
```

### JavaScript (script.js)

#### Nueva estructura:
```javascript
// Recopilar TODOS los datos individuales
function collectAllData() {
    const allData = [];
    const inputs = document.querySelectorAll('.test-input');
    
    inputs.forEach(input => {
        if (input.value && input.value.trim() !== '') {
            // Convertir a z-score individual
            const zScore = standardScoreToZScore(score, scaleType);
            allData.push({
                testName: testNames[testId],
                originalScore: score,
                scaleType: scaleType,
                zScore: zScore
            });
        }
    });
    
    return allData;
}

// Dibujar gráfico de líneas
function drawLineChart(data) {
    // Línea continua conectando todos los puntos
    ctx.beginPath();
    data.forEach((item, index) => {
        const x = margin.left + (index + 1) * xStep;
        const y = zToY(item.zScore);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Puntos individuales con info
    data.forEach((item, index) => {
        // Círculo
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // z-score arriba
        ctx.fillText(item.zScore.toFixed(2), x, y - 12);
        
        // Puntuación original abajo
        ctx.fillText(`${scale}=${item.originalScore}`, x, y + 20);
    });
}
```

### CSS (styles.css)

Nuevos estilos:
```css
.subcategory {
    color: #667eea;
    font-size: 0.95em;
    font-weight: 600;
    margin-top: 15px;
    margin-bottom: 8px;
    border-bottom: 1px solid #e0e0e0;
}

.subtest {
    padding-left: 20px;
}

.subtest label {
    font-size: 0.9em;
    color: #555;
}
```

## Ejemplo Visual del Gráfico

```
z-score
   3 ─────────────────────────────────────────
   2 ─────────────────────────────────────────
   1 ──────●────●───●──●─────────────────────
   0 ────●───●────●───────●──●────●───────●──
  -1 ─●──────────────────────────────────────
  -2 ═══════════════════════════════════════  ← Línea roja
  -3 ─────────────────────────────────────────
     │   │   │   │   │   │   │   │   │   │
     C   I   S   V   C   M   D   F   F   A
     I   C   e   o   u   a   í   l   l   n
         V   m   c   b   t   g   .   .   i
             .   .   o   r   i   F   S   l
                 s   e   .   t   .   .   l
                         s   o   F   S   .
                             s   o   e   a
                                 .   m   s
```

## Ventajas del Nuevo Sistema

1. **Más información visual**: Se ven todas las puntuaciones, no solo promedios
2. **Identificación de patrones**: Fácil ver variabilidad intra-test
3. **Referencia clínica clara**: Línea roja marca el límite patológico
4. **Formato profesional**: Similar a informes neuropsicológicos estándar
5. **Completo**: Incluye todos los subtests de cada batería
6. **Transparencia**: Todas las puntuaciones visibles en el gráfico
7. **Sin redundancia**: No necesita secciones de "promedios" aparte

## Archivos Modificados

1. **index.html** (completo reescritura de inputs)
   - 48 inputs individuales
   - Estructura jerárquica con subcategorías
   - Atributo data-category para agrupación
   - Estilos para subtests con sangría

2. **script.js** (completo reescritura)
   - Función collectAllData() nueva
   - Función drawLineChart() completa nueva
   - Sin cálculo de promedios
   - Conversión individual a z-score
   - Ordenamiento automático de tests

3. **styles.css**
   - Estilos .subcategory
   - Estilos .subtest
   - Eliminados estilos de leyenda y promedios

4. **README.md**
   - Documentación actualizada
   - Lista completa de tests
   - Explicación del gráfico de líneas

## Archivos Nuevos

1. **test-linechart.html**
   - Página de demostración
   - Ejemplo con datos del PDF
   - Visualización del nuevo gráfico

2. **CAMBIOS-GRAFICO-LINEAS.md**
   - Este documento

## Validación

✅ Estructura WISC-V completa (21 entradas)
✅ CSAT-R con aciertos y errores
✅ CARAS-R con 3 medidas
✅ ENFEN con 6 subtests en decatipos
✅ NEPSY-II con 3 subtests
✅ PROLEC-R con 9 procesos lectores
✅ TALE con 2 medidas en z-score
✅ TEMA-3 con 2 medidas
✅ Gráfico de líneas funcional
✅ Línea roja en z=-2
✅ z-scores y puntuaciones originales visibles
✅ Sin errores de conversión

## Referencias

- **Informe ejemplo**: INFORME_NP_EJEMPLO.pdf
- **Manuales TEA**: https://www.hogrefe-tea.com
- **WISC-V**: Manual técnico
- **ENFEN**: Manual con decatipos
- **PROLEC-R**: Procesos lectores
- **NEPSY-II**: Evaluación neuropsicológica
- **CSAT-R**: Atención sostenida
- **CARAS-R**: Atención selectiva

## Próximos Pasos Sugeridos

□ Implementar baremos por edad para PROLEC-R (PD a z-score)
□ Añadir CELF-5 completo si es necesario
□ Añadir más baterías (WISC-IV, WAIS-IV, etc.)
□ Exportar datos a tabla además del gráfico
□ Añadir interpretación automática por rangos z-score
□ Comparación con evaluaciones anteriores

---

**Versión**: 3.0 - Gráfico de Líneas Individual
**Fecha**: 2024
**Total de tests individuales**: 48
