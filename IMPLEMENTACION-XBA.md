# Implementación del Cross-Battery Assessment (XBA)
## Versión 3.2 - Filosofía XBA Completa

---

## Resumen Ejecutivo

Esta aplicación ha sido actualizada para seguir los principios del **Cross-Battery Assessment (XBA)**, un enfoque sistemático y basado en evidencia para la evaluación neuropsicológica que se fundamenta en la teoría CHC (Cattell-Horn-Carroll) de las capacidades cognitivas.

### Cambio de Paradigma

**ANTES (v3.0)**: Organización por tests y baterías
**AHORA (v3.2)**: Organización por **capacidades amplias CHC**

---

## Principios XBA Implementados

### 1. Organización por Capacidades CHC (No por Tests)

La interfaz ahora presenta los tests agrupados por las **9 capacidades amplias** de la teoría CHC:

```
✓ Gf  - Razonamiento Fluido
✓ Gc  - Conocimiento Cristalizado  
✓ Gv  - Procesamiento Visual
✓ Gsm - Memoria a Corto Plazo
✓ Gs  - Velocidad de Procesamiento
✓ Glr - Almacenamiento y Recuperación L.P.
✓ Ga  - Procesamiento Auditivo
✓ Grw - Lectura y Escritura
✓ Gq  - Conocimiento Cuantitativo
```

### 2. Clasificación de Subtests por Fuerza

Cada subtest está clasificado según su fuerza como indicador de una capacidad CHC:

- 🔵 **FUERTE** (Strong): Medida directa y robusta de la capacidad
- 🟡 **MODERADO** (Moderate): Medida adecuada pero con influencia de otras capacidades

**Ejemplo:**
```javascript
'matrices': { 
    chc: 'gf',                     // Capacidad amplia: Gf
    strength: 'strong',            // Fuerza: Fuerte
    narrowAbility: 'Razonamiento inductivo'  // Capacidad específica
}
```

### 3. Requisito de Múltiples Medidas

XBA requiere **al menos 2 medidas** por capacidad amplia para una evaluación fiable:

- ✅ **2+ medidas**: Capacidad adecuadamente representada
- ⚠️ **1 medida**: Se muestra pero con advertencia
- ❌ **0 medidas**: No se evalúa la capacidad

### 4. Ponderación por Fuerza

El cálculo de cada capacidad amplia pondera según la fuerza:

```javascript
Peso Strong = 1.0
Peso Moderate = 0.75

z-score capacidad = Σ(z-score × peso) / Σ(pesos)
```

---

## Estructura de la Aplicación XBA

### Archivos Principales

1. **script-xba.js** (25KB)
   - Sistema completo de clasificación CHC
   - Cálculo de capacidades amplias ponderadas
   - Visualización por barras (capacidades amplias)
   - Detalle de subtests por capacidad

2. **index-xba.html** (Pendiente de creación completa)
   - Interfaz organizada por capacidades CHC
   - Etiquetas de fuerza (FUERTE/MODERADO)
   - Descripción de capacidades específicas
   - Código de colores por capacidad

3. **CROSS-BATTERY-ASSESSMENT.md** (13KB)
   - Fundamentos teóricos del XBA
   - Teoría CHC explicada
   - Principios de implementación
   - Referencias académicas

4. **BIBLIOGRAFIA-XBA.md** (16KB)
   - 55 referencias completas
   - Ordenadas por tema
   - Con DOI e ISBN
   - Recursos online

---

## Visualización XBA

### Gráfico de Capacidades Amplias

```
    Gf    Gc    Gv   Gsm   Gs   Glr   Ga   Grw   Gq
     │     │     │     │     │     │     │     │     │
   3 ┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼
   2 ┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼
   1 ┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼
   0 ┼▓▓▓▓▓┼▓▓▓▓▓┼▓▓▓▓▓┼▓▓▓▓▓┼▓▓▓▓▓┼▓▓▓▓▓┼▓▓▓▓▓┼▓▓▓▓▓┼
  -1 ┼▓▓▓▓▓┼─────┼─────┼─────┼─────┼─────┼▓▓▓▓▓┼▓▓▓▓▓┼
  -2 ═══════════════════════════════════════════════  (Límite clínico)
  -3 ┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┼
```

**Características:**
- Cada barra representa una capacidad amplia CHC
- Color único por capacidad
- Altura = z-score promedio ponderado
- Etiqueta (n=X) indica número de medidas
- ⚠️ si solo tiene 1 medida

### Panel de Detalles

Bajo el gráfico, se muestra el detalle de cada capacidad:

```
🧩 Gf - RAZONAMIENTO FLUIDO (z = -0.67)
Razonamiento inductivo, deductivo y cuantitativo

• Matrices (WISC-V) - Razonamiento inductivo - 🔵 FUERTE
  Escalar = 7 → z = -1.00
  
• Balanzas (WISC-V) - Razonamiento cuantitativo - 🔵 FUERTE
  Escalar = 8 → z = -0.67
  
• Aritmética (WISC-V) - Razonamiento cuantitativo - 🟡 MODERADO
  Escalar = 8 → z = -0.67
```

---

## Clasificación Completa de Tests según CHC

### WISC-V → CHC

| Subtest | Capacidad CHC | Fuerza | Capacidad Específica |
|---------|---------------|--------|---------------------|
| Matrices | Gf | Strong | Razonamiento inductivo |
| Balanzas | Gf | Strong | Razonamiento cuantitativo |
| Aritmética | Gf | Moderate | Razonamiento cuantitativo |
| Vocabulario | Gc | Strong | Conocimiento léxico |
| Semejanzas | Gc | Strong | Razonamiento verbal |
| Información | Gc | Strong | Información general |
| Comprensión | Gc | Strong | Comprensión verbal |
| Cubos | Gv | Strong | Visualización |
| Puzles visuales | Gv | Strong | Relaciones espaciales |
| Dígitos | Gsm | Strong | Memoria de trabajo |
| Span de dibujos | Gsm | Moderate | Amplitud de memoria |
| Letras y números | Gsm | Strong | Memoria de trabajo |
| Claves | Gs | Strong | Velocidad perceptual |
| Búsqueda símbolos | Gs | Strong | Velocidad de comparación |
| Cancelación | Gs | Strong | Velocidad de decisión |

### Otros Tests → CHC

| Test | Subtest | Capacidad CHC | Fuerza |
|------|---------|---------------|--------|
| CSAT-R | Aciertos | Gs | Moderate |
| CARAS-R | Aciertos | Gs | Moderate |
| ENFEN | Fluidez fonológica | Glr | Strong |
| ENFEN | Fluidez semántica | Glr | Strong |
| NEPSY-II | Proc. fonológico | Ga | Strong |
| NEPSY-II | Vel. denominación | Glr | Moderate |
| NEPSY-II | Comp. instrucciones | Gc | Moderate |
| PROLEC-R | (todos) | Grw | Strong |
| TALE | Ortografía | Grw | Strong |
| TEMA-3 | Comp. matemática | Gq | Strong |
| TEMA-3 | Resol. problemas | Gq | Strong |

### Funciones Ejecutivas (No CHC)

Las funciones ejecutivas son un **constructo transversal**, no una capacidad CHC:

- Inhibición: ENFEN Interferencia, CARAS Errores/ICI
- Flexibilidad: ENFEN Sendero color
- Atención sostenida: CSAT Aciertos, ENFEN Sendero gris
- Planificación: ENFEN Anillas

Se evalúan por separado.

---

## Interpretación Según XBA

### Paso 1: Análisis Normativo
Comparar cada capacidad amplia con la norma poblacional (z=0):
- **z > +1.0**: Por encima de la media (fortaleza)
- **z entre -1.0 y +1.0**: Rango promedio
- **z < -1.0**: Por debajo de la media
- **z < -2.0**: Rango clínico (déficit significativo)

### Paso 2: Análisis Ipsativo
Comparar capacidades entre sí para identificar fortalezas/debilidades relativas:
```
Capacidad más alta - Capacidad más baja > 1.5 DE
= Discrepancia significativa
```

### Paso 3: Análisis de Consistencia
Verificar que los subtests dentro de cada capacidad sean consistentes:
- Variabilidad baja → Capacidad bien definida
- Variabilidad alta → Puede indicar influencia de otras capacidades

### Paso 4: Patrones Clínicos
Identificar perfiles característicos:

**TDAH**: Gs ↓, Gsm ↓, Gf normal, Gc normal
**DEA Lectura**: Grw ↓, Ga ↓, otras normales
**DEA Matemáticas**: Gq ↓, Gf variable
**Discapacidad Intelectual**: Todas las capacidades ↓
**Altas Capacidades**: Gf ↑, Gc ↑, otras ↑

---

## Ventajas de la Implementación XBA

1. **Fundamentación teórica sólida**: 100+ años de investigación CHC
2. **Flexibilidad**: No limitado a una batería específica
3. **Precisión**: Múltiples medidas por constructo
4. **Validez**: Basado en estructura factorial empírica
5. **Utilidad clínica**: Identificación clara de fortalezas/debilidades
6. **Actualizable**: Fácil agregar nuevos tests clasificados por CHC
7. **Estándar profesional**: XBA es el método recomendado actualmente

---

## Limitaciones y Consideraciones

### Limitaciones Técnicas
1. **Normas diferentes**: Subtests de diferentes baterías pueden tener muestras normativas distintas
2. **Edad**: Cada test tiene rangos de edad específicos
3. **Baremos españoles**: No todos los tests tienen baremos actualizados

### Consideraciones Clínicas
1. **Formación requerida**: El XBA requiere conocimiento profundo de teoría CHC
2. **Tiempo**: Evaluación comprehensiva puede requerir más tiempo
3. **Interpretación**: Análisis más complejo que usar una sola batería

### Soluciones Implementadas
1. **Conversión a z-scores**: Métrica común para todos los tests
2. **Ponderación**: Tests "strong" tienen más peso
3. **Advertencias**: Sistema alerta si solo hay 1 medida
4. **Documentación**: Guías claras de interpretación

---

## Uso de la Aplicación XBA

### Flujo de Trabajo

1. **Selección de tests**: Elegir al menos 2 subtests por capacidad CHC
2. **Administración**: Aplicar los tests seleccionados
3. **Introducción de datos**: Ingresar puntuaciones estandarizadas
4. **Generación**: Click en "Generar Perfil XBA"
5. **Interpretación**: Analizar capacidades amplias y detalles

### Ejemplo Práctico

**Caso: Evaluación de posible DEA en lectura**

**Tests administrados:**
- WISC-V completo (todas las capacidades)
- PROLEC-R (Grw)
- NEPSY-II Procesamiento fonológico (Ga)
- ENFEN Fluidez fonológica (Glr)

**Resultado esperado:**
```
Gf: z = 0.2    (normal)
Gc: z = 0.5    (normal)
Gv: z = 0.0    (normal)
Gsm: z = -0.3  (normal)
Gs: z = 0.1    (normal)
Glr: z = -0.8  (leve bajo)
Ga: z = -1.5   (bajo) ←
Grw: z = -2.1  (clínico) ←
```

**Interpretación**: Perfil consistente con DEA en lectura (Grw bajo, Ga bajo, otras capacidades normales).

---

## Roadmap Futuro

### Fase 1 (Actual)
✅ Teoría CHC implementada
✅ Clasificación de tests por CHC
✅ Cálculo de capacidades amplias
✅ Visualización por capacidades
✅ Documentación completa
✅ Bibliografía de 55 referencias

### Fase 2 (Próximo)
□ Completar HTML XBA organizado por capacidades
□ Análisis automático de discrepancias
□ Identificación de patrones clínicos
□ Sugerencias de tests adicionales

### Fase 3 (Futuro)
□ Baremos por edad específicos
□ Comparación con evaluaciones previas
□ Generación de informes automáticos
□ Base de datos de perfiles normativos

---

## Referencias Clave

1. **Flanagan, D. P., Ortiz, S. O., & Alfonso, V. C. (2013).** *Essentials of Cross-Battery Assessment* (3rd ed.). Hoboken, NJ: John Wiley & Sons.

2. **Schneider, W. J., & McGrew, K. S. (2018).** "The Cattell-Horn-Carroll theory of cognitive abilities." In D. P. Flanagan & E. M. McDonough (Eds.), *Contemporary intellectual assessment* (4th ed., pp. 73-163). New York: Guilford Press.

3. **McGrew, K. S., & Wendling, B. J. (2010).** "Cattell–Horn–Carroll cognitive-achievement relations." *Psychology in the Schools, 47*(7), 651-675.

Ver **BIBLIOGRAFIA-XBA.md** para las 55 referencias completas.

---

## Conclusión

La implementación del Cross-Battery Assessment en esta aplicación representa un avance significativo hacia una evaluación neuropsicológica más rigurosa, válida y útil clínicamente. Al organizarse por capacidades CHC en lugar de por tests, la aplicación facilita:

- Una comprensión más profunda del perfil cognitivo
- Identificación precisa de fortalezas y debilidades
- Fundamentación teórica sólida para intervenciones
- Comunicación clara con otros profesionales
- Seguimiento longitudinal basado en constructos

El XBA no es solo una metodología de evaluación, sino un cambio de paradigma que pone la teoría y la evidencia empírica en el centro de nuestra práctica clínica.

---

**Versión**: 3.2 - XBA Implementation
**Fecha**: 2024
**Autores**: Implementación basada en Flanagan et al. (2013)
**Licencia**: Uso profesional neuropsicológico
