// CROSS-BATTERY ASSESSMENT (XBA) - Sistema basado en Teoría CHC
// Organización por CAPACIDADES AMPLIAS, no por tests

// Definición de Capacidades Amplias CHC (Cattell-Horn-Carroll)
const chcBroadAbilities = {
    'gf': {
        name: 'Gf - Razonamiento Fluido',
        description: 'Razonamiento inductivo y deductivo, resolución de problemas novedosos',
        color: '#E74C3C',
        narrowAbilities: ['Razonamiento inductivo', 'Razonamiento cuantitativo', 'Razonamiento secuencial']
    },
    'gc': {
        name: 'Gc - Conocimiento Cristalizado',
        description: 'Conocimiento adquirido, comprensión verbal, información general',
        color: '#3498DB',
        narrowAbilities: ['Conocimiento léxico', 'Información general', 'Comprensión verbal']
    },
    'gv': {
        name: 'Gv - Procesamiento Visual',
        description: 'Percepción, manipulación y razonamiento con estímulos visuales',
        color: '#9B59B6',
        narrowAbilities: ['Visualización', 'Relaciones espaciales', 'Velocidad perceptual']
    },
    'gsm': {
        name: 'Gsm - Memoria a Corto Plazo',
        description: 'Retención y manipulación de información en memoria inmediata',
        color: '#F39C12',
        narrowAbilities: ['Memoria de trabajo', 'Amplitud de memoria', 'Capacidad de atención']
    },
    'gs': {
        name: 'Gs - Velocidad de Procesamiento',
        description: 'Rapidez en tareas cognitivas automáticas simples',
        color: '#1ABC9C',
        narrowAbilities: ['Velocidad perceptual', 'Velocidad de comparación', 'Velocidad de decisión']
    },
    'glr': {
        name: 'Glr - Almacenamiento y Recuperación L.P.',
        description: 'Almacenar y recuperar información de la memoria a largo plazo',
        color: '#E67E22',
        narrowAbilities: ['Fluidez de ideas', 'Fluidez de asociación', 'Denominación rápida']
    },
    'ga': {
        name: 'Ga - Procesamiento Auditivo',
        description: 'Percepción y procesamiento de información auditiva',
        color: '#95A5A6',
        narrowAbilities: ['Discriminación fonética', 'Conciencia fonológica', 'Síntesis auditiva']
    },
    'grw': {
        name: 'Grw - Lectura y Escritura',
        description: 'Habilidades de lectura, escritura y ortografía',
        color: '#34495E',
        narrowAbilities: ['Decodificación', 'Comprensión lectora', 'Habilidad ortográfica']
    },
    'gq': {
        name: 'Gq - Conocimiento Cuantitativo',
        description: 'Conocimiento y razonamiento matemático',
        color: '#16A085',
        narrowAbilities: ['Conocimiento matemático', 'Razonamiento matemático']
    }
};

// Clasificación de subtests según capacidades CHC
// Clasificación: strong (fuerte), moderate (moderado), weak (débil)
const testClassification = {
    // WISC-V - Razonamiento Fluido (Gf)
    'matrices': { 
        chc: 'gf', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Matrices',
        narrowAbility: 'Razonamiento inductivo'
    },
    'balanzas': { 
        chc: 'gf', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Balanzas',
        narrowAbility: 'Razonamiento cuantitativo'
    },
    'aritmetica': { 
        chc: 'gf', 
        strength: 'moderate', 
        test: 'WISC-V', 
        name: 'Aritmética',
        narrowAbility: 'Razonamiento cuantitativo'
    },
    
    // WISC-V - Conocimiento Cristalizado (Gc)
    'vocabulario': { 
        chc: 'gc', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Vocabulario',
        narrowAbility: 'Conocimiento léxico'
    },
    'semejanzas': { 
        chc: 'gc', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Semejanzas',
        narrowAbility: 'Razonamiento verbal'
    },
    'informacion': { 
        chc: 'gc', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Información',
        narrowAbility: 'Información general'
    },
    'comprension': { 
        chc: 'gc', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Comprensión',
        narrowAbility: 'Comprensión verbal'
    },
    
    // WISC-V - Procesamiento Visual (Gv)
    'cubos': { 
        chc: 'gv', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Cubos',
        narrowAbility: 'Visualización'
    },
    'puzles': { 
        chc: 'gv', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Puzles visuales',
        narrowAbility: 'Relaciones espaciales'
    },
    
    // WISC-V - Memoria a Corto Plazo (Gsm)
    'digitos': { 
        chc: 'gsm', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Dígitos',
        narrowAbility: 'Memoria de trabajo'
    },
    'span_dibujos': { 
        chc: 'gsm', 
        strength: 'moderate', 
        test: 'WISC-V', 
        name: 'Span de dibujos',
        narrowAbility: 'Amplitud de memoria'
    },
    'letras_numeros': { 
        chc: 'gsm', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Letras y números',
        narrowAbility: 'Memoria de trabajo'
    },
    
    // WISC-V - Velocidad de Procesamiento (Gs)
    'claves': { 
        chc: 'gs', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Claves',
        narrowAbility: 'Velocidad perceptual'
    },
    'busqueda_simbolos': { 
        chc: 'gs', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Búsqueda de símbolos',
        narrowAbility: 'Velocidad de comparación'
    },
    'cancelacion': { 
        chc: 'gs', 
        strength: 'strong', 
        test: 'WISC-V', 
        name: 'Cancelación',
        narrowAbility: 'Velocidad de decisión'
    },
    
    // CSAT-R - Velocidad de Procesamiento (Gs)
    'csat_aciertos': { 
        chc: 'gs', 
        strength: 'moderate', 
        test: 'CSAT-R', 
        name: 'CSAT-R Aciertos',
        narrowAbility: 'Atención sostenida'
    },
    
    // CARAS-R - Velocidad de Procesamiento (Gs)
    'caras_aciertos': { 
        chc: 'gs', 
        strength: 'moderate', 
        test: 'CARAS-R', 
        name: 'CARAS-R Aciertos',
        narrowAbility: 'Velocidad perceptual'
    },
    
    // ENFEN - Almacenamiento y Recuperación (Glr)
    'fluidez_fonologica': { 
        chc: 'glr', 
        strength: 'strong', 
        test: 'ENFEN', 
        name: 'Fluidez fonológica',
        narrowAbility: 'Fluidez de ideas'
    },
    'fluidez_semantica': { 
        chc: 'glr', 
        strength: 'strong', 
        test: 'ENFEN', 
        name: 'Fluidez semántica',
        narrowAbility: 'Fluidez de asociación'
    },
    
    // NEPSY-II - Procesamiento Auditivo (Ga)
    'proc_fonologico': { 
        chc: 'ga', 
        strength: 'strong', 
        test: 'NEPSY-II', 
        name: 'Procesamiento fonológico',
        narrowAbility: 'Conciencia fonológica'
    },
    'procesamiento_fonologico': {  // Alias
        chc: 'ga', 
        strength: 'strong', 
        test: 'NEPSY-II', 
        name: 'Procesamiento fonológico',
        narrowAbility: 'Conciencia fonológica'
    },
    
    // NEPSY-II - Almacenamiento y Recuperación (Glr)
    'vel_denominacion': { 
        chc: 'glr', 
        strength: 'moderate', 
        test: 'NEPSY-II', 
        name: 'Velocidad de denominación',
        narrowAbility: 'Denominación rápida'
    },
    'velocidad_denominacion': {  // Alias
        chc: 'glr', 
        strength: 'strong', 
        test: 'NEPSY-II', 
        name: 'Velocidad de denominación',
        narrowAbility: 'Denominación rápida'
    },
    
    // NEPSY-II - Conocimiento Cristalizado (Gc)
    'comp_instrucciones': { 
        chc: 'gc', 
        strength: 'moderate', 
        test: 'NEPSY-II', 
        name: 'Comprensión de instrucciones',
        narrowAbility: 'Comprensión verbal'
    },
    
    // PROLEC-R - Lectura y Escritura (Grw)
    'nombre_letras': { chc: 'grw', strength: 'strong', test: 'PROLEC-R', name: 'Nombre de letras', narrowAbility: 'Conocimiento alfabético' },
    'igual_diferente': { chc: 'grw', strength: 'strong', test: 'PROLEC-R', name: 'Igual-diferente', narrowAbility: 'Discriminación visual' },
    'lectura_palabras': { chc: 'grw', strength: 'strong', test: 'PROLEC-R', name: 'Lectura de palabras', narrowAbility: 'Decodificación' },
    'lectura_pseudopalabras': { chc: 'grw', strength: 'strong', test: 'PROLEC-R', name: 'Lectura de pseudopalabras', narrowAbility: 'Decodificación fonológica' },
    'estructuras_gramaticales': { chc: 'grw', strength: 'strong', test: 'PROLEC-R', name: 'Estructuras gramaticales', narrowAbility: 'Comprensión sintáctica' },
    'signos_puntuacion': { chc: 'grw', strength: 'moderate', test: 'PROLEC-R', name: 'Signos de puntuación', narrowAbility: 'Comprensión prosódica' },
    'comp_oraciones': { chc: 'grw', strength: 'strong', test: 'PROLEC-R', name: 'Comprensión de oraciones', narrowAbility: 'Comprensión lectora' },
    'comp_textos': { chc: 'grw', strength: 'strong', test: 'PROLEC-R', name: 'Comprensión de textos', narrowAbility: 'Comprensión lectora' },
    'comp_oral': { chc: 'grw', strength: 'strong', test: 'PROLEC-R', name: 'Comprensión oral', narrowAbility: 'Comprensión auditiva' },
    'lectura_precision': { chc: 'grw', strength: 'strong', test: 'PROLEC-R', name: 'Precisión lectora', narrowAbility: 'Decodificación' },
    'lectura_comprension': { chc: 'grw', strength: 'strong', test: 'PROLEC-R', name: 'Comprensión lectora', narrowAbility: 'Comprensión lectora' },
    
    // TALE - Lectura y Escritura (Grw)
    'ortografia_natural': { chc: 'grw', strength: 'strong', test: 'TALE', name: 'Ortografía natural', narrowAbility: 'Habilidad ortográfica' },
    'ortografia_arbitraria': { chc: 'grw', strength: 'strong', test: 'TALE', name: 'Ortografía arbitraria', narrowAbility: 'Habilidad ortográfica' },
    'escritura_ortografia': { chc: 'grw', strength: 'strong', test: 'TALE', name: 'Ortografía (dictado)', narrowAbility: 'Habilidad ortográfica' },
    
    // TEMA-3 - Conocimiento Cuantitativo (Gq)
    'comp_matematica': { chc: 'gq', strength: 'strong', test: 'TEMA-3', name: 'Competencia matemática', narrowAbility: 'Conocimiento matemático' },
    'resol_problemas': { chc: 'gq', strength: 'strong', test: 'TEMA-3', name: 'Resolución de problemas', narrowAbility: 'Razonamiento matemático' },
    'matematicas_competencia': { chc: 'gq', strength: 'strong', test: 'TEMA-3', name: 'Competencia matemática', narrowAbility: 'Conocimiento matemático' },
    'matematicas_problemas': { chc: 'gq', strength: 'strong', test: 'TEMA-3', name: 'Resolución de problemas', narrowAbility: 'Razonamiento matemático' },
    
    // CARAS-R - Velocidad de Procesamiento (Gs)
    'caras_atencion': { chc: 'gs', strength: 'moderate', test: 'CARAS-R', name: 'Atención selectiva', narrowAbility: 'Velocidad perceptual' }
};

// Índices compuestos del WISC-V y su relación con CHC
const wiscIndices = {
    'ci_total': { name: 'CI Total', chc: 'general', description: 'Factor g - Inteligencia general' },
    'icv': { name: 'ICV', chc: 'gc', description: 'Índice Comprensión Verbal (Gc)' },
    'ive': { name: 'IVE', chc: 'gv', description: 'Índice Visoespacial (Gv)' },
    'irf': { name: 'IRF', chc: 'gf', description: 'Índice Razonamiento Fluido (Gf)' },
    'imt': { name: 'IMT', chc: 'gsm', description: 'Índice Memoria de Trabajo (Gsm)' },
    'ivp': { name: 'IVP', chc: 'gs', description: 'Índice Velocidad Procesamiento (Gs)' }
};

// Funciones Ejecutivas (constructo transversal, no CHC)
const executiveFunctions = {
    'inhibicion': {
        name: 'Inhibición',
        tests: ['interferencia', 'caras_errores', 'caras_ici']
    },
    'flexibilidad': {
        name: 'Flexibilidad Cognitiva',
        tests: ['sendero_color']
    },
    'atencion_sostenida': {
        name: 'Atención Sostenida',
        tests: ['csat_aciertos', 'sendero_gris']
    },
    'planificacion': {
        name: 'Planificación',
        tests: ['anillas']
    }
};

// Escalas estandarizadas
const standardScales = {
    'ci': { mean: 100, sd: 15, name: 'CI' },
    't': { mean: 50, sd: 10, name: 'T' },
    'scalar': { mean: 10, sd: 3, name: 'Escalar' },
    'v': { mean: 100, sd: 15, name: 'V' },
    'decatipo': { mean: 5.5, sd: 2, name: 'Decatipo' },
    'percentile': { mean: 50, sd: 30, name: 'Percentil' },
    'z': { mean: 0, sd: 1, name: 'z' },
    'pd': { mean: 10, sd: 5, name: 'PD' }
};

// Convertir puntuación estandarizada a z-score
function standardScoreToZScore(score, scaleType) {
    if (score === null || score === undefined || score === '') return null;
    
    const scale = standardScales[scaleType];
    if (!scale) {
        console.error(`Escala desconocida: ${scaleType}`);
        return null;
    }
    
    if (scaleType === 'percentile') {
        return percentileToZScore(score);
    }
    
    const zScore = (score - scale.mean) / scale.sd;
    return Math.max(-3, Math.min(3, zScore));
}

function percentileToZScore(percentile) {
    if (percentile === null || percentile === undefined || percentile === '') return null;
    
    const conversionTable = [
        { p: 1, z: -2.33 }, { p: 2, z: -2.05 }, { p: 5, z: -1.64 },
        { p: 10, z: -1.28 }, { p: 16, z: -0.99 }, { p: 20, z: -0.84 },
        { p: 25, z: -0.67 }, { p: 30, z: -0.52 }, { p: 37, z: -0.33 },
        { p: 50, z: 0.00 }, { p: 63, z: 0.33 }, { p: 70, z: 0.52 },
        { p: 75, z: 0.67 }, { p: 80, z: 0.84 }, { p: 84, z: 0.99 },
        { p: 90, z: 1.28 }, { p: 95, z: 1.64 }, { p: 98, z: 2.05 },
        { p: 99, z: 2.33 }
    ];
    
    for (let i = 0; i < conversionTable.length - 1; i++) {
        if (percentile >= conversionTable[i].p && percentile <= conversionTable[i + 1].p) {
            const p1 = conversionTable[i].p;
            const p2 = conversionTable[i + 1].p;
            const z1 = conversionTable[i].z;
            const z2 = conversionTable[i + 1].z;
            return z1 + (z2 - z1) * (percentile - p1) / (p2 - p1);
        }
    }
    
    if (percentile < conversionTable[0].p) return conversionTable[0].z;
    if (percentile > conversionTable[conversionTable.length - 1].p) {
        return conversionTable[conversionTable.length - 1].z;
    }
    return 0;
}

// Recopilar datos organizados por capacidades CHC
function collectDataByChcAbilities() {
    const chcData = {};
    const executiveData = {};
    const indices = {};
    
    // Inicializar estructuras
    Object.keys(chcBroadAbilities).forEach(ability => {
        chcData[ability] = [];
    });
    
    // Recopilar todos los inputs
    const inputs = document.querySelectorAll('.test-input');
    
    inputs.forEach(input => {
        if (input.value && input.value.trim() !== '') {
            const testId = input.getAttribute('data-test');
            const scaleType = input.getAttribute('data-scale');
            const score = parseFloat(input.value);
            
            if (!isNaN(score) && scaleType && testId) {
                const zScore = standardScoreToZScore(score, scaleType);
                
                if (zScore !== null) {
                    // Verificar si es un índice WISC-V
                    if (wiscIndices[testId]) {
                        indices[testId] = {
                            ...wiscIndices[testId],
                            originalScore: score,
                            scaleType: scaleType,
                            zScore: zScore
                        };
                    }
                    // Verificar si es un subtest clasificado por CHC
                    else if (testClassification[testId]) {
                        const classification = testClassification[testId];
                        const chcAbility = classification.chc;
                        
                        chcData[chcAbility].push({
                            testId: testId,
                            testName: classification.name,
                            test: classification.test,
                            strength: classification.strength,
                            narrowAbility: classification.narrowAbility,
                            originalScore: score,
                            scaleType: scaleType,
                            zScore: zScore
                        });
                    }
                    // Verificar si es una función ejecutiva
                    else if (['interferencia', 'caras_errores', 'caras_ici', 'sendero_color', 'sendero_gris', 'anillas'].includes(testId)) {
                        if (!executiveData[testId]) executiveData[testId] = [];
                        executiveData[testId].push({
                            testId: testId,
                            originalScore: score,
                            scaleType: scaleType,
                            zScore: zScore
                        });
                    }
                }
            }
        }
    });
    
    return { chcData, executiveData, indices };
}

// Calcular capacidades amplias (con al menos 2 medidas)
function calculateBroadAbilities(chcData) {
    const broadAbilityScores = {};
    
    Object.keys(chcData).forEach(ability => {
        const tests = chcData[ability];
        
        if (tests.length >= 2) {  // XBA requiere al menos 2 medidas
            // Ponderar por fuerza de la medida
            const weightedScores = tests.map(t => {
                const weight = t.strength === 'strong' ? 1.0 : 0.75;
                return { zScore: t.zScore, weight: weight };
            });
            
            const totalWeight = weightedScores.reduce((sum, item) => sum + item.weight, 0);
            const weightedAvg = weightedScores.reduce((sum, item) => sum + (item.zScore * item.weight), 0) / totalWeight;
            
            broadAbilityScores[ability] = {
                name: chcBroadAbilities[ability].name,
                description: chcBroadAbilities[ability].description,
                color: chcBroadAbilities[ability].color,
                zScore: weightedAvg,
                testsCount: tests.length,
                tests: tests
            };
        } else if (tests.length === 1) {
            // Solo 1 medida - advertir pero mostrar
            broadAbilityScores[ability] = {
                name: chcBroadAbilities[ability].name,
                description: chcBroadAbilities[ability].description,
                color: chcBroadAbilities[ability].color,
                zScore: tests[0].zScore,
                testsCount: 1,
                tests: tests,
                warning: 'Solo 1 medida - XBA recomienda al menos 2'
            };
        }
    });
    
    return broadAbilityScores;
}

// FASE 3: Análisis de Discrepancias
function analyzeDiscrepancies(broadAbilities) {
    const discrepancies = [];
    const abilities = Object.entries(broadAbilities);
    
    // Calcular la media global de las capacidades evaluadas
    const globalMean = abilities.reduce((sum, [_, ability]) => sum + ability.zScore, 0) / abilities.length;
    
    // Comparar cada capacidad con la media global
    abilities.forEach(([abilityCode, ability]) => {
        const difference = ability.zScore - globalMean;
        const isSignificant = Math.abs(difference) >= 1.5; // 1.5 DE es clínicamente significativo
        
        if (isSignificant) {
            discrepancies.push({
                ability: ability.name,
                abilityCode: abilityCode,
                zScore: ability.zScore,
                difference: difference,
                type: difference > 0 ? 'strength' : 'weakness',
                interpretation: interpretDiscrepancy(abilityCode, difference)
            });
        }
    });
    
    // Comparaciones específicas entre pares de capacidades
    const pairwiseComparisons = comparePairwiseAbilities(broadAbilities);
    
    return {
        globalDiscrepancies: discrepancies,
        pairwiseComparisons: pairwiseComparisons,
        globalMean: globalMean
    };
}

function comparePairwiseAbilities(broadAbilities) {
    const comparisons = [];
    const abilities = Object.entries(broadAbilities);
    
    // Comparaciones clínicamente relevantes
    const relevantPairs = [
        ['gf', 'gc', 'Razonamiento fluido vs. Conocimiento cristalizado'],
        ['gsm', 'glr', 'Memoria corto plazo vs. Memoria largo plazo'],
        ['gs', 'gsm', 'Velocidad procesamiento vs. Memoria trabajo'],
        ['gv', 'ga', 'Procesamiento visual vs. Procesamiento auditivo'],
        ['grw', 'gq', 'Lectura/Escritura vs. Matemáticas']
    ];
    
    relevantPairs.forEach(([ability1, ability2, description]) => {
        if (broadAbilities[ability1] && broadAbilities[ability2]) {
            const diff = broadAbilities[ability1].zScore - broadAbilities[ability2].zScore;
            if (Math.abs(diff) >= 1.0) { // Diferencia moderadamente significativa
                comparisons.push({
                    comparison: description,
                    ability1: broadAbilities[ability1].name,
                    ability2: broadAbilities[ability2].name,
                    difference: diff,
                    isSignificant: Math.abs(diff) >= 1.5
                });
            }
        }
    });
    
    return comparisons;
}

function interpretDiscrepancy(abilityCode, difference) {
    const interpretations = {
        'gf': {
            positive: 'Fortaleza en razonamiento abstracto y resolución de problemas novedosos',
            negative: 'Dificultades en razonamiento lógico y resolución de problemas nuevos'
        },
        'gc': {
            positive: 'Buen nivel de conocimientos adquiridos y comprensión verbal',
            negative: 'Conocimientos generales limitados o dificultades de comprensión verbal'
        },
        'gv': {
            positive: 'Excelente procesamiento y manipulación de información visual',
            negative: 'Dificultades en tareas visuoespaciales y percepción visual'
        },
        'gsm': {
            positive: 'Buena capacidad de memoria de trabajo y atención',
            negative: 'Limitaciones en memoria de trabajo - posible indicador de TDAH'
        },
        'gs': {
            positive: 'Alta velocidad en tareas cognitivas automáticas',
            negative: 'Lentitud de procesamiento - común en TDAH y dificultades de aprendizaje'
        },
        'glr': {
            positive: 'Excelente capacidad de aprendizaje y recuperación de información',
            negative: 'Dificultades en almacenamiento/recuperación de memoria a largo plazo'
        },
        'ga': {
            positive: 'Buen procesamiento fonológico y discriminación auditiva',
            negative: 'Déficits fonológicos - posible indicador de dislexia'
        },
        'grw': {
            positive: 'Buenas habilidades de lectoescritura',
            negative: 'Dificultades en lectura y/o escritura - posible dislexia/disgrafía'
        },
        'gq': {
            positive: 'Buen razonamiento matemático y numérico',
            negative: 'Dificultades con conceptos numéricos - posible discalculia'
        }
    };
    
    const ability = interpretations[abilityCode];
    if (!ability) return '';
    
    return difference > 0 ? ability.positive : ability.negative;
}

// FASE 3: Identificación de Patrones Clínicos
function identifyClinicalPatterns(broadAbilities) {
    const patterns = [];
    
    // Patrón TDAH: Gsm bajo, Gs bajo, Gf relativamente preservado
    if (broadAbilities['gsm'] && broadAbilities['gs']) {
        if (broadAbilities['gsm'].zScore < -1.0 && broadAbilities['gs'].zScore < -1.0) {
            const gfPreserved = !broadAbilities['gf'] || broadAbilities['gf'].zScore > -0.5;
            patterns.push({
                pattern: 'TDAH',
                probability: gfPreserved ? 'Alta' : 'Moderada',
                description: 'Perfil compatible con TDAH: déficits en memoria de trabajo y velocidad de procesamiento',
                recommendations: [
                    'Evaluación específica de atención (CPT, CSAT)',
                    'Evaluación funcional del impacto en vida diaria',
                    'Considerar entrevista estructurada para TDAH'
                ]
            });
        }
    }
    
    // Patrón Dislexia: Ga bajo, Grw bajo, Gc relativamente preservado
    if (broadAbilities['ga'] && broadAbilities['grw']) {
        if (broadAbilities['ga'].zScore < -1.0 && broadAbilities['grw'].zScore < -1.0) {
            const gcPreserved = !broadAbilities['gc'] || broadAbilities['gc'].zScore > -0.5;
            patterns.push({
                pattern: 'Dislexia',
                probability: gcPreserved ? 'Alta' : 'Moderada',
                description: 'Perfil compatible con dislexia: déficits en procesamiento fonológico y lectoescritura',
                recommendations: [
                    'Evaluación detallada de lectura (PROLEC-R completo)',
                    'Valorar conciencia fonológica específica',
                    'Evaluación de automatización lectora (velocidad y precisión)'
                ]
            });
        }
    }
    
    // Patrón Discalculia: Gq bajo, Gsm moderadamente bajo
    if (broadAbilities['gq']) {
        if (broadAbilities['gq'].zScore < -1.5) {
            const gsmLow = broadAbilities['gsm'] && broadAbilities['gsm'].zScore < -0.5;
            patterns.push({
                pattern: 'Discalculia',
                probability: gsmLow ? 'Alta' : 'Moderada',
                description: 'Perfil compatible con discalculia: déficits en razonamiento cuantitativo',
                recommendations: [
                    'Evaluación matemática detallada (TEMA-3 completo)',
                    'Valorar comprensión de conceptos numéricos básicos',
                    'Evaluar estrategias de resolución de problemas matemáticos'
                ]
            });
        }
    }
    
    // Patrón TEA: Discrepancia Gv alto, Gc bajo, dificultades en Gsm
    if (broadAbilities['gv'] && broadAbilities['gc']) {
        const gvGcDiff = broadAbilities['gv'].zScore - broadAbilities['gc'].zScore;
        if (gvGcDiff > 1.5 && broadAbilities['gc'].zScore < -0.5) {
            patterns.push({
                pattern: 'Posible TEA',
                probability: 'A investigar',
                description: 'Perfil con disociación visual-verbal: fortaleza visual frente a debilidad verbal',
                recommendations: [
                    'Evaluación específica de comunicación social',
                    'Valorar pragmática del lenguaje',
                    'Considerar screening de TEA (SCQ, M-CHAT)'
                ]
            });
        }
    }
    
    // Patrón Disfunción Ejecutiva: Gsm bajo, con Gf y Gc preservados
    if (broadAbilities['gsm'] && broadAbilities['gf'] && broadAbilities['gc']) {
        if (broadAbilities['gsm'].zScore < -1.5 && 
            broadAbilities['gf'].zScore > -0.5 && 
            broadAbilities['gc'].zScore > -0.5) {
            patterns.push({
                pattern: 'Disfunción Ejecutiva',
                probability: 'Moderada',
                description: 'Déficit específico en memoria de trabajo con capacidades cognitivas generales preservadas',
                recommendations: [
                    'Evaluación ejecutiva completa (BRIEF, Stroop, Trail Making)',
                    'Valorar funciones ejecutivas en contexto real',
                    'Explorar impacto en planificación y organización'
                ]
            });
        }
    }
    
    return patterns;
}

// FASE 3: Sugerencias de Tests Adicionales
function suggestAdditionalTests(chcData, broadAbilities) {
    const suggestions = [];
    
    // Verificar capacidades con solo 1 medida
    Object.entries(chcData).forEach(([ability, tests]) => {
        if (tests.length === 1) {
            suggestions.push({
                type: 'Completar evaluación',
                priority: 'Alta',
                ability: chcBroadAbilities[ability].name,
                reason: 'Solo se ha aplicado 1 test. XBA recomienda al menos 2 medidas por capacidad.',
                suggestedTests: getSuggestedTestsForAbility(ability)
            });
        }
    });
    
    // Identificar capacidades no evaluadas pero relevantes
    const evaluatedAbilities = Object.keys(broadAbilities);
    const allAbilities = Object.keys(chcBroadAbilities);
    
    allAbilities.forEach(ability => {
        if (!evaluatedAbilities.includes(ability)) {
            // Determinar si es relevante según lo evaluado
            if (isAbilityRelevant(ability, evaluatedAbilities)) {
                suggestions.push({
                    type: 'Capacidad no evaluada',
                    priority: 'Media',
                    ability: chcBroadAbilities[ability].name,
                    reason: getReasonForMissingAbility(ability, evaluatedAbilities),
                    suggestedTests: getSuggestedTestsForAbility(ability)
                });
            }
        }
    });
    
    // Sugerencias basadas en patrones observados
    const patterns = identifyClinicalPatterns(broadAbilities);
    patterns.forEach(pattern => {
        pattern.recommendations.forEach(rec => {
            suggestions.push({
                type: 'Basado en patrón clínico',
                priority: 'Alta',
                ability: pattern.pattern,
                reason: pattern.description,
                suggestedTests: [rec]
            });
        });
    });
    
    return suggestions;
}

function getSuggestedTestsForAbility(ability) {
    const testSuggestions = {
        'gf': ['WISC-V Matrices', 'WISC-V Pesos y Medidas', 'K-BIT Matrices'],
        'gc': ['WISC-V Vocabulario', 'WISC-V Información', 'WISC-V Comprensión', 'PPVT-III'],
        'gv': ['WISC-V Cubos', 'WISC-V Puzles Visuales', 'Figura Compleja de Rey'],
        'gsm': ['WISC-V Dígitos', 'WISC-V Aritmética', 'WISC-V Memoria Letras-Números'],
        'gs': ['WISC-V Claves', 'WISC-V Búsqueda Símbolos', 'CARAS-R'],
        'glr': ['Fluidez Verbal Fonológica', 'Fluidez Verbal Semántica', 'RAN/RAS'],
        'ga': ['NEPSY-II Procesamiento Fonológico', 'Test de Discriminación Fonética'],
        'grw': ['PROLEC-R Lectura Precisión', 'PROLEC-R Comprensión', 'TALE Escritura'],
        'gq': ['TEMA-3 Competencia', 'TEMA-3 Problemas', 'Cálculo mental']
    };
    
    return testSuggestions[ability] || [];
}

function isAbilityRelevant(ability, evaluatedAbilities) {
    // Siempre relevante evaluar las capacidades académicas básicas
    if (['grw', 'gq'].includes(ability)) return true;
    
    // Si se evaluó Gsm, es relevante evaluar Gs
    if (ability === 'gs' && evaluatedAbilities.includes('gsm')) return true;
    
    // Si se evaluó Gv, es relevante evaluar Ga para comparación
    if (ability === 'ga' && evaluatedAbilities.includes('gv')) return true;
    
    return false;
}

function getReasonForMissingAbility(ability, evaluatedAbilities) {
    const reasons = {
        'gf': 'Importante para entender el potencial de razonamiento abstracto',
        'gc': 'Fundamental para conocer el nivel de conocimientos adquiridos',
        'gv': 'Relevante para descartar dificultades visuoespaciales',
        'gsm': 'Crítica para evaluar memoria de trabajo y atención',
        'gs': 'Importante para evaluar velocidad de procesamiento',
        'glr': 'Útil para valorar aprendizaje y recuperación de información',
        'ga': 'Fundamental si hay sospechas de dificultades de lectoescritura',
        'grw': 'Esencial en evaluaciones de edad escolar',
        'gq': 'Importante para conocer habilidades matemáticas'
    };
    
    return reasons[ability] || 'Capacidad no evaluada';
}

// Generar gráfico según filosofía XBA
function generateChart() {
    const { chcData, executiveData, indices } = collectDataByChcAbilities();
    const broadAbilities = calculateBroadAbilities(chcData);
    
    if (Object.keys(broadAbilities).length === 0 && Object.keys(indices).length === 0) {
        alert('Por favor, introduce al menos 2 subtests que midan la misma capacidad CHC.');
        return;
    }
    
    // FASE 3: Análisis avanzado
    const discrepancyAnalysis = analyzeDiscrepancies(broadAbilities);
    const clinicalPatterns = identifyClinicalPatterns(broadAbilities);
    const testSuggestions = suggestAdditionalTests(chcData, broadAbilities);
    
    drawXBAChart(broadAbilities, indices, chcData);
    displayAdvancedAnalysis(discrepancyAnalysis, clinicalPatterns, testSuggestions);
}

function drawXBAChart(broadAbilities, indices, chcData) {
    const canvas = document.getElementById('neuropsyChart');
    const ctx = canvas.getContext('2d');
    
    const width = canvas.width = 1400;
    const height = canvas.height = 800;
    
    const margin = { top: 80, right: 50, bottom: 150, left: 200 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    ctx.clearRect(0, 0, width, height);
    
    const zMin = -3;
    const zMax = 3;
    
    function zToY(z) {
        return margin.top + chartHeight - ((z - zMin) / (zMax - zMin)) * chartHeight;
    }
    
    // Título
    ctx.font = 'bold 26px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('PERFIL NEUROPSICOLÓGICO - Cross-Battery Assessment (XBA)', width / 2, 35);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Organizado por Capacidades CHC (Cattell-Horn-Carroll)', width / 2, 58);
    
    // Líneas horizontales de referencia
    for (let z = zMin; z <= zMax; z++) {
        const y = zToY(z);
        
        if (z === -2) {
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
        } else {
            ctx.strokeStyle = z === 0 ? '#999' : '#ddd';
            ctx.lineWidth = z === 0 ? 1.5 : 1;
            ctx.setLineDash([]);
        }
        
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(width - margin.right, y);
        ctx.stroke();
        
        ctx.fillStyle = z === -2 ? '#ff0000' : '#666';
        ctx.font = z === -2 ? 'bold 12px Arial' : '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(z.toFixed(1), margin.left - 10, y + 4);
    }
    
    ctx.setLineDash([]);
    
    // Eje Y label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('z-score', 0, 0);
    ctx.restore();
    
    // Preparar datos para visualización
    const abilities = Object.keys(broadAbilities);
    const numAbilities = abilities.length;
    
    if (numAbilities === 0) return;
    
    const xStep = chartWidth / (numAbilities + 1);
    
    // Dibujar barras por capacidad amplia
    abilities.forEach((abilityKey, index) => {
        const ability = broadAbilities[abilityKey];
        const x = margin.left + (index + 1) * xStep;
        const y0 = zToY(0);
        const y1 = zToY(ability.zScore);
        const barWidth = 40;
        
        // Barra
        ctx.fillStyle = ability.color + '90';  // Transparencia
        if (ability.zScore >= 0) {
            ctx.fillRect(x - barWidth/2, y1, barWidth, y0 - y1);
        } else {
            ctx.fillRect(x - barWidth/2, y0, barWidth, y1 - y0);
        }
        
        // Borde
        ctx.strokeStyle = ability.color;
        ctx.lineWidth = 2;
        if (ability.zScore >= 0) {
            ctx.strokeRect(x - barWidth/2, y1, barWidth, y0 - y1);
        } else {
            ctx.strokeRect(x - barWidth/2, y0, barWidth, y1 - y0);
        }
        
        // z-score
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        const yText = ability.zScore >= 0 ? y1 - 8 : y1 + 20;
        ctx.fillText(ability.zScore.toFixed(2), x, yText);
        
        // Número de tests
        ctx.font = '10px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText(`(n=${ability.testsCount})`, x, yText + 12);
        
        // Advertencia si solo 1 medida
        if (ability.warning) {
            ctx.fillStyle = '#ff6600';
            ctx.font = '9px Arial';
            ctx.fillText('⚠', x, y0 + 15);
        }
    });
    
    // Etiquetas de capacidades
    ctx.font = 'bold 13px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    
    abilities.forEach((abilityKey, index) => {
        const ability = broadAbilities[abilityKey];
        const x = margin.left + (index + 1) * xStep;
        const y = height - margin.bottom + 20;
        
        // Nombre de la capacidad
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText(ability.name, 0, 0);
        ctx.restore();
        
        // Descripción más abajo
        ctx.save();
        ctx.font = '9px Arial';
        ctx.fillStyle = '#666';
        ctx.translate(x, y + 60);
        ctx.rotate(-Math.PI / 4);
        const desc = ability.description.substring(0, 40);
        ctx.fillText(desc, 0, 0);
        ctx.restore();
    });
    
    // Borde del gráfico
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin.left, margin.top, chartWidth, chartHeight);
    
    // Leyenda
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('z = -2 (Límite clínico) | ⚠ = Solo 1 medida (XBA recomienda ≥2)', margin.left, height - 20);
    
    // Mostrar subtests por capacidad (opcional)
    displaySubtestsByAbility(chcData, broadAbilities);
}

function displaySubtestsByAbility(chcData, broadAbilities) {
    const container = document.getElementById('xbaDetails');
    if (!container) return;
    
    let html = '<h3>Detalle de Subtests por Capacidad CHC</h3>';
    
    Object.keys(broadAbilities).forEach(abilityKey => {
        const ability = broadAbilities[abilityKey];
        const tests = chcData[abilityKey];
        
        html += `
            <div class="chc-ability-detail" style="border-left: 4px solid ${ability.color}; margin: 15px 0; padding: 10px;">
                <h4>${ability.name} <span style="font-weight: normal; color: #666;">(z = ${ability.zScore.toFixed(2)})</span></h4>
                <p style="font-size: 0.9em; color: #666;">${ability.description}</p>
                <ul style="margin: 5px 0;">
        `;
        
        tests.forEach(test => {
            const strengthBadge = test.strength === 'strong' ? '🔵 Fuerte' : '🟡 Moderado';
            html += `
                <li>
                    <strong>${test.testName}</strong> (${test.test}) 
                    <span style="font-size: 0.85em; color: #666;">
                        - ${test.narrowAbility} - ${strengthBadge}
                        <br>
                        Puntuación: ${standardScales[test.scaleType].name} = ${test.originalScore} 
                        → z = ${test.zScore.toFixed(2)}
                    </span>
                </li>
            `;
        });
        
        html += '</ul></div>';
    });
    
    container.innerHTML = html;
}

// FASE 3: Mostrar análisis avanzado
function displayAdvancedAnalysis(discrepancyAnalysis, clinicalPatterns, testSuggestions) {
    let container = document.getElementById('advancedAnalysis');
    
    // Crear el contenedor si no existe
    if (!container) {
        container = document.createElement('div');
        container.id = 'advancedAnalysis';
        container.className = 'advanced-analysis';
        
        const chartsContainer = document.querySelector('.charts-container');
        if (chartsContainer) {
            chartsContainer.appendChild(container);
        } else {
            document.querySelector('.content').appendChild(container);
        }
    }
    
    let html = '<div class="analysis-section">';
    html += '<h2>📊 Análisis Neuropsicológico Avanzado</h2>';
    
    // 1. Análisis de Discrepancias
    if (discrepancyAnalysis.globalDiscrepancies.length > 0) {
        html += '<div class="analysis-subsection">';
        html += '<h3>🎯 Discrepancias Significativas</h3>';
        html += '<p class="analysis-intro">Se consideran clínicamente significativas las diferencias ≥ 1.5 DE respecto a la media global.</p>';
        html += '<table class="analysis-table">';
        html += '<thead><tr><th>Capacidad</th><th>Z-Score</th><th>Diferencia</th><th>Tipo</th><th>Interpretación</th></tr></thead>';
        html += '<tbody>';
        
        discrepancyAnalysis.globalDiscrepancies
            .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference))
            .forEach(disc => {
                const typeClass = disc.type === 'strength' ? 'strength-badge' : 'weakness-badge';
                const typeText = disc.type === 'strength' ? '💪 Fortaleza' : '⚠️ Debilidad';
                html += `<tr>
                    <td><strong>${disc.ability}</strong></td>
                    <td>${disc.zScore.toFixed(2)}</td>
                    <td>${disc.difference > 0 ? '+' : ''}${disc.difference.toFixed(2)} DE</td>
                    <td><span class="${typeClass}">${typeText}</span></td>
                    <td>${disc.interpretation}</td>
                </tr>`;
            });
        
        html += '</tbody></table></div>';
    }
    
    // 2. Comparaciones entre pares
    if (discrepancyAnalysis.pairwiseComparisons.length > 0) {
        html += '<div class="analysis-subsection">';
        html += '<h3>🔄 Comparaciones entre Capacidades</h3>';
        html += '<table class="analysis-table">';
        html += '<thead><tr><th>Comparación</th><th>Diferencia</th><th>Significativa</th></tr></thead>';
        html += '<tbody>';
        
        discrepancyAnalysis.pairwiseComparisons.forEach(comp => {
            const sigClass = comp.isSignificant ? 'significant' : 'moderate';
            const sigText = comp.isSignificant ? '✓ Sí (≥1.5 DE)' : '◐ Moderada (≥1.0 DE)';
            html += `<tr class="${sigClass}">
                <td>${comp.comparison}</td>
                <td>${comp.difference > 0 ? '+' : ''}${comp.difference.toFixed(2)} DE</td>
                <td>${sigText}</td>
            </tr>`;
        });
        
        html += '</tbody></table></div>';
    }
    
    // 3. Patrones Clínicos
    if (clinicalPatterns.length > 0) {
        html += '<div class="analysis-subsection clinical-patterns">';
        html += '<h3>🧠 Patrones Clínicos Identificados</h3>';
        
        clinicalPatterns.forEach(pattern => {
            const probabilityClass = pattern.probability === 'Alta' ? 'high-probability' : 
                                      pattern.probability === 'Moderada' ? 'moderate-probability' : 'low-probability';
            
            html += `<div class="pattern-card ${probabilityClass}">
                <div class="pattern-header">
                    <h4>${pattern.pattern}</h4>
                    <span class="probability-badge">${pattern.probability}</span>
                </div>
                <p class="pattern-description">${pattern.description}</p>
                <div class="pattern-recommendations">
                    <strong>Recomendaciones:</strong>
                    <ul>
                        ${pattern.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>`;
        });
        
        html += '</div>';
    }
    
    // 4. Sugerencias de Tests Adicionales
    if (testSuggestions.length > 0) {
        html += '<div class="analysis-subsection test-suggestions">';
        html += '<h3>🔍 Sugerencias de Evaluación Adicional</h3>';
        
        // Agrupar por prioridad
        const highPriority = testSuggestions.filter(s => s.priority === 'Alta');
        const mediumPriority = testSuggestions.filter(s => s.priority === 'Media');
        
        if (highPriority.length > 0) {
            html += '<h4 class="priority-high">⚡ Prioridad Alta</h4>';
            highPriority.forEach(sug => {
                html += `<div class="suggestion-card priority-high">
                    <div class="suggestion-header">
                        <span class="suggestion-type">${sug.type}</span>
                        <strong>${sug.ability}</strong>
                    </div>
                    <p class="suggestion-reason">${sug.reason}</p>
                    <div class="suggested-tests">
                        <strong>Tests sugeridos:</strong>
                        <ul>
                            ${sug.suggestedTests.map(test => `<li>${test}</li>`).join('')}
                        </ul>
                    </div>
                </div>`;
            });
        }
        
        if (mediumPriority.length > 0) {
            html += '<h4 class="priority-medium">📋 Prioridad Media</h4>';
            mediumPriority.forEach(sug => {
                html += `<div class="suggestion-card priority-medium">
                    <div class="suggestion-header">
                        <span class="suggestion-type">${sug.type}</span>
                        <strong>${sug.ability}</strong>
                    </div>
                    <p class="suggestion-reason">${sug.reason}</p>
                    <div class="suggested-tests">
                        <strong>Tests sugeridos:</strong>
                        <ul>
                            ${sug.suggestedTests.map(test => `<li>${test}</li>`).join('')}
                        </ul>
                    </div>
                </div>`;
            });
        }
        
        html += '</div>';
    }
    
    html += '</div>'; // Cerrar analysis-section
    
    container.innerHTML = html;
}

function clearForm() {
    document.querySelectorAll('.test-input').forEach(input => {
        input.value = '';
    });
    
    const canvas = document.getElementById('neuropsyChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const container = document.getElementById('xbaDetails');
    if (container) container.innerHTML = '';
    
    const analysisContainer = document.getElementById('advancedAnalysis');
    if (analysisContainer) analysisContainer.innerHTML = '';
}

function printChart() {
    window.print();
}

// Event listeners
document.getElementById('generateBtn').addEventListener('click', generateChart);
document.getElementById('clearBtn').addEventListener('click', clearForm);
document.getElementById('printBtn').addEventListener('click', printChart);

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateChart();
        }
    });
});
