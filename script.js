// Definición de escalas estandarizadas
const standardScales = {
    'ci': { mean: 100, sd: 15, name: 'CI' },
    't': { mean: 50, sd: 10, name: 'T' },
    'scalar': { mean: 10, sd: 3, name: 'Escalar' },
    'decatipo': { mean: 5.5, sd: 2, name: 'Decatipo' },
    'v': { mean: 100, sd: 15, name: 'V' },
    'z': { mean: 0, sd: 1, name: 'z' },
    'percentile': { mean: 50, sd: 30, name: 'Percentil' }, // Aproximación para percentiles
    'pd': { mean: 10, sd: 5, name: 'PD' } // Puntuación directa (requiere normas específicas)
};

// Convertir puntuación estandarizada a z-score
function standardScoreToZScore(score, scaleType) {
    if (score === null || score === undefined || score === '') return null;
    
    const scale = standardScales[scaleType];
    if (!scale) {
        console.error(`Escala desconocida: ${scaleType}`);
        return null;
    }
    
    // Para percentiles, usar conversión especial
    if (scaleType === 'percentile') {
        return percentileToZScore(score);
    }
    
    // Calcular z-score: z = (X - M) / DE
    const zScore = (score - scale.mean) / scale.sd;
    
    // Limitar valores extremos
    return Math.max(-3, Math.min(3, zScore));
}

// Convertir percentil a z-score
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

// Nombres legibles para cada test
const testNames = {
    // WISC-V
    'ci_total': 'CI Total',
    'icv': 'ICV',
    'semejanzas': 'Semejanzas',
    'vocabulario': 'Vocabulario',
    'informacion': 'Información',
    'comprension': 'Comprensión',
    'ive': 'IVE',
    'cubos': 'Cubos',
    'puzles': 'Puzles visuales',
    'irf': 'IRF',
    'matrices': 'Matrices',
    'balanzas': 'Balanzas',
    'aritmetica': 'Aritmética',
    'imt': 'IMT',
    'digitos': 'Dígitos',
    'span_dibujos': 'Span dibujos',
    'letras_numeros': 'Letras y números',
    'ivp': 'IVP',
    'claves': 'Claves',
    'busqueda_simbolos': 'Búsq. símbolos',
    'cancelacion': 'Cancelación',
    
    // Atención
    'csat_aciertos': 'CSAT Aciertos',
    'csat_errores': 'CSAT Errores',
    'caras_aciertos': 'CARAS Aciertos',
    'caras_errores': 'CARAS Errores',
    'caras_ici': 'CARAS ICI',
    
    // Funciones ejecutivas
    'fluidez_fonologica': 'Fluidez fonológica',
    'fluidez_semantica': 'Fluidez semántica',
    'sendero_gris': 'Sendero gris',
    'sendero_color': 'Sendero color',
    'anillas': 'Anillas',
    'interferencia': 'Interferencia',
    
    // Lenguaje
    'comp_instrucciones': 'Comp. instrucciones',
    'proc_fonologico': 'Proc. fonológico',
    'vel_denominacion': 'Vel. denominación',
    
    // Lectura
    'nombre_letras': 'Nombre letras',
    'igual_diferente': 'Igual-diferente',
    'lectura_palabras': 'Lect. palabras',
    'lectura_pseudopalabras': 'Lect. pseudopalabras',
    'estructuras_gramaticales': 'Estruc. gramaticales',
    'signos_puntuacion': 'Signos puntuación',
    'comp_oraciones': 'Comp. oraciones',
    'comp_textos': 'Comp. textos',
    'comp_oral': 'Comp. oral',
    
    // Escritura
    'ortografia_natural': 'Ortog. natural',
    'ortografia_arbitraria': 'Ortog. arbitraria',
    
    // Matemáticas
    'comp_matematica': 'Comp. matemática',
    'resol_problemas': 'Resol. problemas'
};

// Recopilar todos los datos
function collectAllData() {
    const allData = [];
    const inputs = document.querySelectorAll('.test-input');
    
    inputs.forEach(input => {
        if (input.value && input.value.trim() !== '') {
            const testId = input.getAttribute('data-test');
            const scaleType = input.getAttribute('data-scale');
            const score = parseFloat(input.value);
            const category = input.getAttribute('data-category') || testId;
            
            if (!isNaN(score) && scaleType && testId) {
                const zScore = standardScoreToZScore(score, scaleType);
                if (zScore !== null) {
                    allData.push({
                        testId: testId,
                        testName: testNames[testId] || testId,
                        category: category,
                        originalScore: score,
                        scaleType: scaleType,
                        zScore: zScore
                    });
                }
            }
        }
    });
    
    return allData;
}

// Generar el gráfico
function generateChart() {
    const data = collectAllData();
    
    if (data.length === 0) {
        alert('Por favor, introduce al menos una puntuación.');
        return;
    }
    
    // Ordenar por categoría y test
    data.sort((a, b) => {
        if (a.category !== b.category) {
            return a.category.localeCompare(b.category);
        }
        return a.testId.localeCompare(b.testId);
    });
    
    drawLineChart(data);
}

function drawLineChart(data) {
    const canvas = document.getElementById('neuropsyChart');
    const ctx = canvas.getContext('2d');
    
    // Configuración del canvas (girado 90°: ahora horizontal)
    const width = canvas.width = 1400;
    const height = canvas.height = 700;
    
    const margin = { top: 60, right: 100, bottom: 60, left: 200 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configuración de escalas
    const zMin = -3;
    const zMax = 3;
    const numTests = data.length;
    const yStep = chartHeight / (numTests + 1);
    
    // Función para convertir z-score a coordenada x (ahora horizontal)
    function zToX(z) {
        return margin.left + ((z - zMin) / (zMax - zMin)) * chartWidth;
    }
    
    // Dibujar título
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('PERFIL NEUROPSICOLÓGICO', width / 2, 40);
    
    // Dibujar líneas verticales de referencia (z-scores, ahora en eje X)
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.font = '14px Arial';
    ctx.fillStyle = '#666';
    ctx.textAlign = 'center';
    
    for (let z = zMin; z <= zMax; z++) {
        const x = zToX(z);
        
        // Línea especial en z = -2 (roja para patología)
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
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, height - margin.bottom);
        ctx.stroke();
        
        // Etiqueta del eje X (abajo)
        ctx.fillStyle = z === -2 ? '#ff0000' : '#666';
        ctx.font = z === -2 ? 'bold 15px Arial' : '14px Arial';
        ctx.fillText(z.toFixed(1), x, height - margin.bottom + 25);
    }
    
    ctx.setLineDash([]);
    
    // Etiqueta del eje X
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('z-score', width / 2, height - 10);
    
    // Dibujar los puntos y líneas (ahora horizontal)
    ctx.strokeStyle = '#4A90E2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((item, index) => {
        const x = zToX(item.zScore);
        const y = margin.top + (index + 1) * yStep;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Dibujar los puntos
    data.forEach((item, index) => {
        const x = zToX(item.zScore);
        const y = margin.top + (index + 1) * yStep;
        
        // Círculo
        ctx.fillStyle = '#4A90E2';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Borde blanco
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Valor del z-score a la derecha del punto
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'left';
        ctx.fillText(item.zScore.toFixed(2), x + 10, y + 4);
        
        // Puntuación original a la derecha
        ctx.font = '11px Arial';
        ctx.fillStyle = '#666';
        const scaleLabel = standardScales[item.scaleType].name;
        ctx.fillText(`${scaleLabel}=${item.originalScore}`, x + 10, y + 16);
    });
    
    // Dibujar etiquetas de los tests (a la izquierda, sin rotar)
    ctx.font = '13px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'right';
    
    data.forEach((item, index) => {
        const x = margin.left - 10;
        const y = margin.top + (index + 1) * yStep;
        
        ctx.fillText(item.testName, x, y + 4);
    });
    
    // Dibujar borde del gráfico
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin.left, margin.top, chartWidth, chartHeight);
    
    // Leyenda de la línea roja
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('z = -2 (Límite clínico)', width - margin.right - 160, 55);
}

function clearForm() {
    document.querySelectorAll('.test-input').forEach(input => {
        input.value = '';
    });
    
    // Limpiar gráfico
    const canvas = document.getElementById('neuropsyChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function printChart() {
    window.print();
}

// Event listeners
document.getElementById('generateBtn').addEventListener('click', generateChart);
document.getElementById('clearBtn').addEventListener('click', clearForm);
document.getElementById('printBtn').addEventListener('click', printChart);

// Generar al presionar Enter en los inputs
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateChart();
        }
    });
});
