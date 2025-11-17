# Cambios: Sistema de Puntuaciones Estandarizadas

## Resumen de Cambios

Se ha modificado el sistema para trabajar con **puntuaciones estandarizadas reales** en lugar de percentiles. Cada test ahora utiliza su propia escala de puntuación con su media y desviación estándar correspondientes.

## Motivación

Los percentiles son una medida de posición relativa, no una puntuación estandarizada directa. Los tests neuropsicológicos entregan diferentes tipos de puntuaciones estandarizadas (CI, T, Escalar, V, etc.) que deben ser introducidas directamente y convertidas a z-scores para comparación.

## Escalas Implementadas

### 1. **Escala CI (Cociente Intelectual)**
- **Media**: 100
- **Desviación Estándar**: 15
- **Rango típico**: 40-160
- **Usado en**: WISC-V (CI Total e índices)

### 2. **Escala T**
- **Media**: 50
- **Desviación Estándar**: 10
- **Rango típico**: 20-80
- **Usado en**: CSAT-R, CARAS-R, TALE, TEMA-3

### 3. **Escala Escalar (Scaled Score)**
- **Media**: 10
- **Desviación Estándar**: 3
- **Rango típico**: 1-19
- **Usado en**: Subtests WISC-V, NEPSY-II, ENFEN

### 4. **Escala V (Puntuación V)**
- **Media**: 100
- **Desviación Estándar**: 15
- **Rango típico**: 40-160
- **Usado en**: PROLEC-R

### 5. **Escala z (z-score directo)**
- **Media**: 0
- **Desviación Estándar**: 1
- **Rango típico**: -3 a +3
- **Usado en**: Tests que entregan directamente z-scores

## Fórmula de Conversión

Todas las puntuaciones se convierten a z-scores usando la fórmula estándar:

```
z = (Puntuación - Media) / Desviación Estándar
```

**Ejemplo**:
- CI = 115 → z = (115 - 100) / 15 = **1.00**
- T = 60 → z = (60 - 50) / 10 = **1.00**
- Escalar = 13 → z = (13 - 10) / 3 = **1.00**

Todos representan +1 desviación estándar sobre la media.

## Tests y sus Escalas

### INTELIGENCIA (WISC-V)
| Test | Escala | M | DE | Rango |
|------|--------|---|-------|-------|
| CI Total | CI | 100 | 15 | 40-160 |
| Comprensión verbal | CI | 100 | 15 | 40-160 |
| Visoespacial | CI | 100 | 15 | 40-160 |
| Razonamiento fluido | CI | 100 | 15 | 40-160 |
| Memoria de trabajo | CI | 100 | 15 | 40-160 |
| Velocidad de procesamiento | CI | 100 | 15 | 40-160 |

### ATENCIÓN
| Test | Escala | M | DE | Rango |
|------|--------|---|-------|-------|
| Atención sostenida (CSAT-R) | T | 50 | 10 | 20-80 |
| Atención selectiva (CARAS-R) | T | 50 | 10 | 20-80 |
| Atención alternante (ENFEN) | Escalar | 10 | 3 | 1-19 |

### FUNCIONES EJECUTIVAS (ENFEN)
| Test | Escala | M | DE | Rango |
|------|--------|---|-------|-------|
| Fluidez fonológica | Escalar | 10 | 3 | 1-19 |
| Fluidez semántica | Escalar | 10 | 3 | 1-19 |
| Planificación | Escalar | 10 | 3 | 1-19 |
| Interferencia | Escalar | 10 | 3 | 1-19 |

### LENGUAJE (NEPSY-II)
| Test | Escala | M | DE | Rango |
|------|--------|---|-------|-------|
| Comprensión de instrucciones | Escalar | 10 | 3 | 1-19 |
| Procesamiento fonológico | Escalar | 10 | 3 | 1-19 |
| Velocidad de denominación | Escalar | 10 | 3 | 1-19 |

### LECTURA (PROLEC-R)
| Test | Escala | M | DE | Rango |
|------|--------|---|-------|-------|
| Precisión | V | 100 | 15 | 40-160 |
| Velocidad | V | 100 | 15 | 40-160 |
| Comprensión | V | 100 | 15 | 40-160 |

### ESCRITURA (TALE)
| Test | Escala | M | DE | Rango |
|------|--------|---|-------|-------|
| Ortografía (dictado) | T | 50 | 10 | 20-80 |

### MATEMÁTICAS (TEMA-3)
| Test | Escala | M | DE | Rango |
|------|--------|---|-------|-------|
| Competencia matemática | T | 50 | 10 | 20-80 |
| Resolución de problemas | T | 50 | 10 | 20-80 |

## Cambios en la Interfaz

### Antes
```html
<input type="number" min="0" max="100" placeholder="Percentil">
```

### Después
```html
<!-- WISC-V -->
<p class="scale-info">Escala: CI (M=100, DE=15)</p>
<input type="number" data-scale="ci" min="40" max="160" placeholder="CI">

<!-- CSAT-R -->
<input type="number" data-scale="t" min="20" max="80" placeholder="T">
<span class="scale-tag">T (M=50, DE=10)</span>

<!-- ENFEN -->
<p class="scale-info">Escala: Puntuación Escalar (M=10, DE=3)</p>
<input type="number" data-scale="scalar" min="1" max="19" placeholder="Escalar">
```

## Cambios en el Código JavaScript

### Nueva estructura de escalas
```javascript
const standardScales = {
    'ci': { mean: 100, sd: 15, name: 'CI' },
    't': { mean: 50, sd: 10, name: 'T' },
    'scalar': { mean: 10, sd: 3, name: 'Escalar' },
    'v': { mean: 100, sd: 15, name: 'V' },
    'z': { mean: 0, sd: 1, name: 'z' }
};
```

### Nueva función de conversión
```javascript
function standardScoreToZScore(score, scaleType) {
    const scale = standardScales[scaleType];
    if (!scale) return null;
    
    // z = (X - M) / DE
    const zScore = (score - scale.mean) / scale.sd;
    
    // Limitar a rango ±3
    return Math.max(-3, Math.min(3, zScore));
}
```

### Cálculo de promedios actualizado
```javascript
function calculateDomainAverages() {
    // ... para cada test:
    const score = parseFloat(input.value);
    const scaleType = input.getAttribute('data-scale');
    const zScore = standardScoreToZScore(score, scaleType);
    
    // Promediar z-scores del dominio
    const avgZScore = zScores.reduce((a, b) => a + b, 0) / zScores.length;
}
```

## Ventajas del Nuevo Sistema

1. **Precisión**: Usa las puntuaciones reales de los tests, no conversiones intermedias
2. **Transparencia**: Muestra claramente qué escala usa cada test
3. **Estándar**: Sigue las prácticas estándar de evaluación neuropsicológica
4. **Comparabilidad**: Diferentes escalas se pueden comparar correctamente mediante z-scores
5. **Educativo**: Los usuarios aprenden qué escala usa cada test

## Validación

Ejemplos de conversión correcta:

| Escala | Puntuación | Cálculo | z-score |
|--------|------------|---------|---------|
| CI | 100 | (100-100)/15 | 0.00 |
| CI | 115 | (115-100)/15 | +1.00 |
| CI | 85 | (85-100)/15 | -1.00 |
| T | 50 | (50-50)/10 | 0.00 |
| T | 60 | (60-50)/10 | +1.00 |
| T | 40 | (40-50)/10 | -1.00 |
| Escalar | 10 | (10-10)/3 | 0.00 |
| Escalar | 13 | (13-10)/3 | +1.00 |
| Escalar | 7 | (7-10)/3 | -1.00 |

Todos estos ejemplos han sido probados y validados.

## Referencias

Las escalas y sus parámetros están basadas en los manuales de los tests publicados por:
- **TEA Ediciones** (España): https://www.hogrefe-tea.com
- **Pearson Clinical** (Internacional)

Cada test tiene su propia estandarización con normas específicas por edad.

## Archivos Modificados

1. **index.html**: 
   - Actualizado inputs con data-scale
   - Añadidos límites min/max apropiados
   - Añadida información de escalas (scale-info, scale-tag)

2. **script.js**:
   - Nueva estructura `standardScales`
   - Nueva función `standardScoreToZScore()`
   - Actualizada función `calculateDomainAverages()`
   - Mantenida función `zScoreToPercentile()` para display

3. **styles.css**:
   - Nuevo estilo `.scale-info`
   - Nuevo estilo `.scale-tag`
   - Actualizado `.input-group` con flex-wrap

4. **README.md**:
   - Documentación completa de escalas
   - Ejemplos de uso
   - Tabla de conversiones

## Compatibilidad

- ✅ Mantiene toda la funcionalidad anterior
- ✅ Gráficos siguen el mismo formato
- ✅ Exportación PDF sin cambios
- ✅ Sistema dockerizado sin modificaciones
- ✅ Responsive y print-friendly

## Próximos Pasos (Opcionales)

1. Añadir validación de rangos por edad
2. Añadir más tests neuropsicológicos
3. Permitir guardar perfiles
4. Añadir comparación con perfiles anteriores
5. Generar informes automáticos con interpretación

---

**Fecha de implementación**: 2024
**Versión**: 2.0 - Sistema de Puntuaciones Estandarizadas
