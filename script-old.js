// Estructura de dominios cognitivos y sus tests
const cognitiveStructure = {
    'INTELIGENCIA': {
        label: 'INTELIGENCIA',
        tests: ['ci_total', 'comp_verbal', 'visoespacial', 'razon_fluido', 'memoria_trabajo', 'vel_procesamiento'],
        color: '#4A90E2'
    },
    'ATENCIÓN': {
        label: 'ATENCIÓN',
        tests: ['atencion_sostenida', 'atencion_selectiva', 'atencion_alternante'],
        color: '#E24A4A'
    },
    'F. EJECUTIVA': {
        label: 'F. EJECUTIVA',
        tests: ['fluidez_fonologica', 'fluidez_semantica', 'planificacion', 'interferencia'],
        color: '#50C878'
    },
    'LENGUAJE': {
        label: 'LENGUAJE',
        tests: ['comp_instrucciones', 'proc_fonologico', 'vel_denominacion'],
        color: '#F4A460'
    },
    'LECT.': {
        label: 'LECT.',
        tests: ['lectura_precision', 'lectura_velocidad', 'lectura_comprension'],
        color: '#9B59B6'
    },
    'ESCRITURA': {
        label: 'ESCRITURA (ortografía)',
        tests: ['escritura'],
        color: '#E67E22'
    },
    'MATEMÁTICAS': {
        label: 'COMPETENCIA MATEMÁTICA',
        tests: ['comp_matematica', 'resol_problemas'],
        color: '#16A085'
    }
};

// Mapeo de tests a etiquetas legibles
const testLabels = {
    'ci_total': 'CI TOTAL',
    'comp_verbal': 'Comprensión verbal',
    'visoespacial': 'Visoespacial',
    'razon_fluido': 'Razonamiento fluido',
    'memoria_trabajo': 'Memoria de trabajo',
    'vel_procesamiento': 'Velocidad de procesamiento',
    'atencion_sostenida': 'Atención sostenida',
    'atencion_selectiva': 'Atención selectiva',
    'atencion_alternante': 'Atención alternante',
    'fluidez_fonologica': 'Fluidez fonológica',
    'fluidez_semantica': 'Fluidez semántica',
    'planificacion': 'Planificación',
    'interferencia': 'Interferencia',
    'comp_instrucciones': 'Comprensión de instrucciones',
    'proc_fonologico': 'Procesamiento fonológico',
    'vel_denominacion': 'Velocidad de denominación',
    'lectura_precision': 'Precisión',
    'lectura_velocidad': 'Velocidad',
    'lectura_comprension': 'Comprensión',
    'escritura': 'ESCRITURA (ortografía)',
    'comp_matematica': 'COMPETENCIA MATEMÁTICA',
    'resol_problemas': 'RESOLUCIÓN DE PROBLEMAS'
};

// Definición de escalas estandarizadas
const standardScales = {
    'ci': { mean: 100, sd: 15, name: 'CI' },           // Cociente Intelectual (WISC-V)
    't': { mean: 50, sd: 10, name: 'T' },             // Puntuación T
    'scalar': { mean: 10, sd: 3, name: 'Escalar' },   // Puntuación Escalar (WISC-V subtests, NEPSY-II, ENFEN)
    'v': { mean: 100, sd: 15, name: 'V' },            // Puntuación V (PROLEC-R)
    'z': { mean: 0, sd: 1, name: 'z' }                // Puntuación Z directa
};

// Convertir puntuación estandarizada a z-score
function standardScoreToZScore(score, scaleType) {
    if (score === null || score === undefined || score === '') return null;
    
    const scale = standardScales[scaleType];
    if (!scale) {
        console.error(`Escala desconocida: ${scaleType}`);
        return null;
    }
    
    // Calcular z-score: z = (X - M) / DE
    const zScore = (score - scale.mean) / scale.sd;
    
    // Limitar valores extremos
    return Math.max(-3, Math.min(3, zScore));
}

// Convertir z-score a percentil (para display)
function zScoreToPercentile(z) {
    if (z === null || z === undefined) return null;
    
    // Tabla de conversión z-score a percentil
    const conversionTable = [
        { z: -3.00, p: 0.1 },
        { z: -2.33, p: 1 },
        { z: -2.05, p: 2 },
        { z: -1.64, p: 5 },
        { z: -1.28, p: 10 },
        { z: -1.17, p: 12 },
        { z: -0.99, p: 16 },
        { z: -0.84, p: 20 },
        { z: -0.67, p: 25 },
        { z: -0.52, p: 30 },
        { z: -0.33, p: 37 },
        { z: 0.00, p: 50 },
        { z: 0.33, p: 63 },
        { z: 0.52, p: 70 },
        { z: 0.67, p: 75 },
        { z: 0.84, p: 80 },
        { z: 0.99, p: 84 },
        { z: 1.28, p: 90 },
        { z: 1.64, p: 95 },
        { z: 2.05, p: 98 },
        { z: 2.33, p: 99 },
        { z: 3.00, p: 99.9 }
    ];
    
    // Interpolación lineal
    for (let i = 0; i < conversionTable.length - 1; i++) {
        if (z >= conversionTable[i].z && z <= conversionTable[i + 1].z) {
            const z1 = conversionTable[i].z;
            const z2 = conversionTable[i + 1].z;
            const p1 = conversionTable[i].p;
            const p2 = conversionTable[i + 1].p;
            
            return p1 + (p2 - p1) * (z - z1) / (z2 - z1);
        }
    }
    
    // Valores extremos
    if (z < conversionTable[0].z) return conversionTable[0].p;
    if (z > conversionTable[conversionTable.length - 1].z) {
        return conversionTable[conversionTable.length - 1].p;
    }
    
    return 50;
}

// Calcular promedios por dominio cognitivo
function calculateDomainAverages() {
    const domainData = {};
    
    Object.keys(cognitiveStructure).forEach(domain => {
        const tests = cognitiveStructure[domain].tests;
        const zScores = [];
        
        tests.forEach(testId => {
            const input = document.querySelector(`input[data-test="${testId}"]`);
            if (input && input.value) {
                const score = parseFloat(input.value);
                const scaleType = input.getAttribute('data-scale');
                
                if (!isNaN(score) && scaleType) {
                    const zScore = standardScoreToZScore(score, scaleType);
                    if (zScore !== null) {
                        zScores.push(zScore);
                    }
                }
            }
        });
        
        if (zScores.length > 0) {
            // Promedio de z-scores
            const avgZScore = zScores.reduce((a, b) => a + b, 0) / zScores.length;
            const avgPercentile = zScoreToPercentile(avgZScore);
            
            domainData[domain] = {
                label: cognitiveStructure[domain].label,
                avgPercentile: avgPercentile,
                avgZScore: avgZScore,
                color: cognitiveStructure[domain].color,
                testsCount: zScores.length
            };
        }
    });
    
    return domainData;
}

// Mostrar promedios calculados
function displayDomainAverages(domainData) {
    const container = document.getElementById('domainAverages');
    
    if (Object.keys(domainData).length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center;">No hay datos suficientes para calcular promedios.</p>';
        return;
    }
    
    let html = '<h3>Promedios por Dominio Cognitivo</h3>';
    
    Object.keys(domainData).forEach(domain => {
        const data = domainData[domain];
        html += `
            <div class="domain-average-item" style="border-left-color: ${data.color}">
                <strong>${data.label}</strong>
                <span class="average-value">
                    P${Math.round(data.avgPercentile)} (z = ${data.avgZScore.toFixed(2)})
                </span>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Variables globales para el gráfico
let chart = null;
const canvas = document.getElementById('neuropsyChart');
const ctx = canvas.getContext('2d');

// Generar el gráfico
function generateChart() {
    // Calcular promedios por dominio
    const domainData = calculateDomainAverages();
    
    if (Object.keys(domainData).length === 0) {
        alert('Por favor, introduce al menos una puntuación en cualquier dominio.');
        return;
    }
    
    // Mostrar promedios
    displayDomainAverages(domainData);
    
    // Preparar datos para el gráfico
    const chartData = [];
    Object.keys(domainData).forEach(domain => {
        chartData.push({
            label: domainData[domain].label,
            zScore: domainData[domain].avgZScore,
            percentile: Math.round(domainData[domain].avgPercentile),
            category: domain,
            color: domainData[domain].color
        });
    });
    
    // Dibujar el gráfico
    drawChart(chartData);
    
    // Actualizar leyenda
    updateLegend(Object.keys(domainData));
}

function drawChart(data) {
    // Configuración del canvas
    const width = canvas.width = 1200;
    const height = canvas.height = Math.max(400, data.length * 50 + 150);
    
    const margin = { top: 80, right: 100, bottom: 50, left: 300 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configuración de escalas
    const zMin = -3;
    const zMax = 3;
    const rowHeight = chartHeight / data.length;
    
    // Función para convertir z-score a coordenada x
    function zToX(z) {
        return margin.left + ((z - zMin) / (zMax - zMin)) * chartWidth;
    }
    
    // Dibujar título
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('PERFIL NEUROPSICOLÓGICO', width / 2, 40);
    
    // Dibujar etiquetas del eje X (z-scores)
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    
    for (let z = zMin; z <= zMax; z++) {
        const x = zToX(z);
        ctx.fillText(z.toFixed(1), x, margin.top - 30);
        
        // Líneas verticales
        ctx.strokeStyle = z === 0 ? '#333' : '#ddd';
        ctx.lineWidth = z === 0 ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, height - margin.bottom);
        ctx.stroke();
    }
    
    // Etiqueta del eje
    ctx.font = 'bold 18px Arial';
    ctx.fillText('z-score', width / 2, margin.top - 50);
    
    // Dibujar leyenda de percentiles en el eje superior
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    ctx.textAlign = 'center';
    
    const percentileMarkers = [
        { z: -2.33, p: 1 },
        { z: -1.64, p: 5 },
        { z: -1.28, p: 10 },
        { z: 0, p: 50 },
        { z: 1.28, p: 90 },
        { z: 1.64, p: 95 },
        { z: 2.33, p: 99 }
    ];
    
    percentileMarkers.forEach(marker => {
        const x = zToX(marker.z);
        ctx.fillText(`P${marker.p}`, x, margin.top - 10);
    });
    
    // Dibujar etiqueta "Percentiles"
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Percentiles', width / 2, margin.top - 60);
    
    // Dibujar las barras
    let currentY = margin.top;
    
    data.forEach((item, index) => {
        const y = currentY + rowHeight / 2;
        const barHeight = rowHeight * 0.5;
        
        // Dibujar etiqueta del dominio
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'right';
        ctx.fillText(item.label, margin.left - 15, y + 5);
        
        // Dibujar percentil
        ctx.font = 'bold 13px Arial';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'left';
        ctx.fillText(`P${item.percentile}`, width - margin.right + 15, y + 5);
        
        // Dibujar barra
        const x0 = zToX(0);
        const x1 = zToX(item.zScore);
        
        ctx.fillStyle = item.color;
        if (item.zScore >= 0) {
            ctx.fillRect(x0, y - barHeight / 2, x1 - x0, barHeight);
        } else {
            ctx.fillRect(x1, y - barHeight / 2, x0 - x1, barHeight);
        }
        
        // Dibujar valor del z-score en la barra
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        const barWidth = Math.abs(x1 - x0);
        if (barWidth > 60) {
            const textX = (x0 + x1) / 2;
            ctx.fillText(item.zScore.toFixed(2), textX, y + 5);
        } else if (barWidth > 30) {
            // Si la barra es pequeña, poner el texto fuera
            ctx.fillStyle = '#333';
            const textX = x1 + (item.zScore >= 0 ? 25 : -25);
            ctx.fillText(item.zScore.toFixed(2), textX, y + 5);
        }
        
        // Línea separadora horizontal
        if (index < data.length - 1) {
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(margin.left, currentY + rowHeight);
            ctx.lineTo(width - margin.right, currentY + rowHeight);
            ctx.stroke();
        }
        
        currentY += rowHeight;
    });
    
    // Dibujar borde del gráfico
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    ctx.strokeRect(margin.left, margin.top, chartWidth, chartHeight);
}

function updateLegend(domains) {
    const legend = document.getElementById('legend');
    legend.innerHTML = '<h4 style="width: 100%; margin-bottom: 10px; color: #667eea;">Dominios Cognitivos</h4>';
    
    domains.forEach(domain => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        
        const color = document.createElement('div');
        color.className = 'legend-color';
        color.style.backgroundColor = cognitiveStructure[domain].color;
        
        const label = document.createElement('span');
        label.textContent = cognitiveStructure[domain].label;
        
        item.appendChild(color);
        item.appendChild(label);
        legend.appendChild(item);
    });
}

function clearForm() {
    document.querySelectorAll('.test-input').forEach(input => {
        input.value = '';
    });
    
    // Limpiar gráfico
    const canvas = document.getElementById('neuropsyChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Limpiar promedios
    document.getElementById('domainAverages').innerHTML = '';
    
    // Limpiar leyenda
    document.getElementById('legend').innerHTML = '';
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
