// Cargar configuración y construir formulario
document.addEventListener('DOMContentLoaded', () => {
    const config = loadConfiguration();
    
    if (!config || config.length === 0) {
        alert('No hay tests configurados. Redirigiendo a la página de configuración...');
        window.location.href = 'config.html';
        return;
    }
    
    buildDynamicForm(config);
    setupEventListeners();
    loadSavedScores();
});

function loadConfiguration() {
    const saved = localStorage.getItem('neuropsico_config');
    return saved ? JSON.parse(saved) : null;
}

function buildDynamicForm(config) {
    const form = document.getElementById('dynamicForm');
    
    // Agrupar por dominio CHC
    const groupedByChc = {};
    config.forEach(test => {
        if (!groupedByChc[test.chc]) {
            groupedByChc[test.chc] = [];
        }
        groupedByChc[test.chc].push(test);
    });
    
    // Ordenar dominios
    const chcOrder = ['g', 'gc', 'gf', 'gv', 'gwm', 'gs', 'ga', 'grw', 'gq'];
    const sortedChcs = Object.keys(groupedByChc).sort((a, b) => {
        return chcOrder.indexOf(a) - chcOrder.indexOf(b);
    });
    
    // Crear grupos por dominio
    sortedChcs.forEach(chc => {
        const tests = groupedByChc[chc];
        const domainGroup = createDomainGroup(chc, tests);
        form.appendChild(domainGroup);
    });
}

function createDomainGroup(chc, tests) {
    const group = document.createElement('div');
    group.className = 'domain-group';
    group.dataset.chc = chc;
    
    const header = document.createElement('div');
    header.className = 'domain-header';
    
    const title = document.createElement('h3');
    title.className = 'domain-title';
    title.textContent = getChcName(chc);
    
    const subtitle = document.createElement('p');
    subtitle.className = 'domain-subtitle';
    subtitle.textContent = `${tests.length} test${tests.length > 1 ? 's' : ''} seleccionado${tests.length > 1 ? 's' : ''}`;
    
    header.appendChild(title);
    header.appendChild(subtitle);
    group.appendChild(header);
    
    const testInputs = document.createElement('div');
    testInputs.className = 'test-inputs';
    
    tests.forEach(test => {
        const inputRow = createInputRow(test);
        testInputs.appendChild(inputRow);
    });
    
    group.appendChild(testInputs);
    
    return group;
}

function createInputRow(test) {
    const row = document.createElement('div');
    row.className = 'input-row';
    
    // Label con nombre del test
    const label = document.createElement('div');
    label.className = 'test-label';
    label.textContent = test.name;
    
    // Badge de batería
    const batteryTag = document.createElement('div');
    batteryTag.className = 'battery-tag';
    batteryTag.textContent = test.battery;
    
    // Input wrapper
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';
    
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'test-input';
    input.dataset.test = test.test;
    input.dataset.domain = test.domain;
    input.dataset.scale = test.scale;
    input.dataset.chc = test.chc;
    // Eliminar placeholder - es redundante
    
    // Configurar min, max y step según la escala
    const scaleConfig = getScaleConfig(test.scale);
    input.min = scaleConfig.min;
    input.max = scaleConfig.max;
    input.step = scaleConfig.step;
    
    // Guardar datos al cambiar
    input.addEventListener('input', () => {
        saveScores();
    });
    
    const scaleBadge = document.createElement('span');
    scaleBadge.className = 'scale-badge';
    scaleBadge.textContent = getScaleName(test.scale);
    
    inputWrapper.appendChild(input);
    inputWrapper.appendChild(scaleBadge);
    
    row.appendChild(label);
    row.appendChild(batteryTag);
    row.appendChild(inputWrapper);
    
    return row;
}

function getScaleConfig(scale) {
    const configs = {
        'ci': { min: 40, max: 160, step: 1 },
        't': { min: 20, max: 80, step: 1 },
        'scalar': { min: 1, max: 19, step: 1 },
        'decatipo': { min: 1, max: 10, step: 1 },
        'percentile': { min: 1, max: 99, step: 1 },
        'pd': { min: 0, max: 100, step: 0.1 },
        'z': { min: -3, max: 3, step: 0.1 }
    };
    return configs[scale] || { min: 0, max: 100, step: 1 };
}

function getScalePlaceholder(scale) {
    const placeholders = {
        'ci': 'CI (40-160)',
        't': 'T (20-80)',
        'scalar': 'Escalar (1-19)',
        'decatipo': 'Decatipo (1-10)',
        'percentile': 'Percentil (1-99)',
        'pd': 'PD',
        'z': 'z-score (-3 a 3)'
    };
    return placeholders[scale] || 'Valor';
}

function getChcName(chcCode) {
    const chcNames = {
        'g': 'Inteligencia General (g)',
        'gc': 'Conocimiento Cristalizado (Gc)',
        'gf': 'Razonamiento Fluido (Gf)',
        'gv': 'Procesamiento Visual (Gv)',
        'gwm': 'Memoria de Trabajo (Gwm)',
        'gs': 'Velocidad de Procesamiento (Gs)',
        'ga': 'Procesamiento Auditivo y Atención (Ga)',
        'grw': 'Lectura y Escritura (Grw)',
        'gq': 'Conocimiento Cuantitativo (Gq)'
    };
    return chcNames[chcCode] || chcCode;
}

function getScaleName(scaleCode) {
    const scaleNames = {
        'ci': 'CI',
        't': 'T',
        'scalar': 'Escalar',
        'decatipo': 'Decatipo',
        'percentile': 'Percentil',
        'pd': 'PD',
        'z': 'z-score'
    };
    return scaleNames[scaleCode] || scaleCode;
}

function saveScores() {
    const inputs = document.querySelectorAll('.test-input');
    const scores = {};
    
    inputs.forEach(input => {
        if (input.value && input.value.trim() !== '') {
            scores[input.dataset.test] = parseFloat(input.value);
        }
    });
    
    localStorage.setItem('neuropsico_scores', JSON.stringify(scores));
}

function loadSavedScores() {
    const saved = localStorage.getItem('neuropsico_scores');
    if (!saved) return;
    
    const scores = JSON.parse(saved);
    Object.keys(scores).forEach(testId => {
        const input = document.querySelector(`.test-input[data-test="${testId}"]`);
        if (input) {
            input.value = scores[testId];
        }
    });
}

function clearScores() {
    const inputs = document.querySelectorAll('.test-input');
    inputs.forEach(input => {
        input.value = '';
    });
    localStorage.removeItem('neuropsico_scores');
    
    // Ocultar gráfico
    document.getElementById('chartContainer').style.display = 'none';
    document.getElementById('noDataMessage').classList.remove('hidden');
}

function setupEventListeners() {
    // Botón volver
    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = 'config.html';
    });
    
    // Botón generar
    document.getElementById('generateBtn').addEventListener('click', () => {
        generateProfile();
    });
    
    // Botón limpiar
    document.getElementById('clearBtn').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
            clearScores();
        }
    });
    
    // Botón imprimir
    document.getElementById('printBtn').addEventListener('click', () => {
        window.print();
    });
    
    // Botón exportar PDF
    document.getElementById('exportPdfBtn').addEventListener('click', () => {
        exportToPDF();
    });
    
    // Botón exportar ASCII
    document.getElementById('exportAsciiBtn').addEventListener('click', () => {
        exportToAscii();
    });
}

function generateProfile() {
    const data = collectAllData();
    
    if (data.length === 0) {
        alert('Por favor, introduce al menos una puntuación.');
        return;
    }
    
    // Mostrar gráfico
    document.getElementById('chartContainer').style.display = 'flex';
    document.getElementById('noDataMessage').classList.add('hidden');
    
    // Generar gráfico usando la función del script.js
    drawLineChart(data);
}

function collectAllData() {
    const allData = [];
    const inputs = document.querySelectorAll('.test-input');
    
    inputs.forEach(input => {
        if (input.value && input.value.trim() !== '') {
            const testId = input.getAttribute('data-test');
            const scaleType = input.getAttribute('data-scale');
            const score = parseFloat(input.value);
            const chc = input.getAttribute('data-chc');
            
            if (!isNaN(score) && scaleType && testId) {
                const zScore = standardScoreToZScore(score, scaleType);
                if (zScore !== null) {
                    // Obtener el nombre del test desde la configuración
                    const config = loadConfiguration();
                    const testConfig = config.find(t => t.test === testId);
                    
                    allData.push({
                        testId: testId,
                        testName: testConfig ? testConfig.name : testId,
                        category: chc,
                        originalScore: score,
                        scaleType: scaleType,
                        zScore: zScore
                    });
                }
            }
        }
    });
    
    // Ordenar por categoría CHC
    allData.sort((a, b) => {
        const chcOrder = ['g', 'gc', 'gf', 'gv', 'gwm', 'gs', 'ga', 'grw', 'gq'];
        const aIndex = chcOrder.indexOf(a.category);
        const bIndex = chcOrder.indexOf(b.category);
        
        if (aIndex !== bIndex) {
            return aIndex - bIndex;
        }
        return a.testId.localeCompare(b.testId);
    });
    
    return allData;
}

// Exportar a PDF
function exportToPDF() {
    const canvas = document.getElementById('neuropsyChart');
    if (!canvas || canvas.width === 0) {
        alert('Por favor, genera primero el perfil neuropsicológico.');
        return;
    }
    
    // Crear un enlace temporal para descargar
    const link = document.createElement('a');
    link.download = `perfil_neuropsicologico_${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
}

// Exportar a formato ASCII para copiar/pegar
function exportToAscii() {
    const data = collectAllData();
    
    if (data.length === 0) {
        alert('No hay datos para exportar. Por favor, genera primero el perfil.');
        return;
    }
    
    let ascii = '';
    ascii += '═══════════════════════════════════════════════════════════════\n';
    ascii += '                 PERFIL NEUROPSICOLÓGICO\n';
    ascii += '═══════════════════════════════════════════════════════════════\n\n';
    
    // Encabezado
    ascii += 'Test                                  | Punt. | Escala | z-score\n';
    ascii += '─────────────────────────────────────────────────────────────\n';
    
    // Datos por test
    data.forEach(item => {
        const testName = item.testName.padEnd(38, ' ');
        const score = String(item.originalScore).padStart(5, ' ');
        const scale = standardScales[item.scaleType].name.padEnd(6, ' ');
        const z = item.zScore.toFixed(2).padStart(7, ' ');
        ascii += `${testName}| ${score} | ${scale} | ${z}\n`;
    });
    
    ascii += '\n';
    ascii += '═══════════════════════════════════════════════════════════════\n';
    ascii += '                    GRÁFICO ASCII\n';
    ascii += '═══════════════════════════════════════════════════════════════\n\n';
    
    // Crear gráfico ASCII
    const zMin = -3;
    const zMax = 3;
    const chartWidth = 60;
    
    // Encabezado del gráfico
    ascii += '  Test                           ';
    for (let z = zMin; z <= zMax; z++) {
        if (z === 0) {
            ascii += '|';
        } else if (z === -2) {
            ascii += '!';
        } else {
            ascii += '.';
        }
    }
    ascii += '\n';
    
    ascii += '                                 ';
    for (let z = zMin; z <= zMax; z++) {
        ascii += z.toString()[0] || ' ';
    }
    ascii += '\n\n';
    
    // Dibujar cada test
    data.forEach(item => {
        const testName = item.testName.substring(0, 30).padEnd(30, ' ');
        ascii += `  ${testName} `;
        
        // Crear la línea del gráfico
        for (let z = zMin; z <= zMax; z += 0.1) {
            const pos = Math.round((z - zMin) / (zMax - zMin) * chartWidth);
            const itemPos = Math.round((item.zScore - zMin) / (zMax - zMin) * chartWidth);
            
            if (Math.abs(pos - itemPos) < 1) {
                ascii += '●';
            } else if (Math.abs(z) < 0.05) {
                ascii += '│';
            } else if (Math.abs(z + 2) < 0.05) {
                ascii += '┊';
            } else {
                ascii += '─';
            }
        }
        
        ascii += ` ${item.zScore.toFixed(2)}\n`;
    });
    
    ascii += '\n';
    ascii += 'Leyenda:\n';
    ascii += '  ● = Puntuación del test\n';
    ascii += '  │ = Media (z=0)\n';
    ascii += '  ┊ = Límite clínico (z=-2)\n';
    ascii += '\n';
    ascii += `Generado: ${new Date().toLocaleString('es-ES')}\n`;
    ascii += '═══════════════════════════════════════════════════════════════\n';
    
    // Método más compatible: usar textarea temporal
    const textarea = document.createElement('textarea');
    textarea.value = ascii;
    textarea.style.position = 'fixed';
    textarea.style.top = '50%';
    textarea.style.left = '50%';
    textarea.style.transform = 'translate(-50%, -50%)';
    textarea.style.width = '80%';
    textarea.style.height = '80%';
    textarea.style.zIndex = '10000';
    textarea.style.fontFamily = 'monospace';
    textarea.style.fontSize = '12px';
    textarea.style.padding = '20px';
    textarea.style.border = '3px solid #0073aa';
    textarea.style.borderRadius = '8px';
    textarea.style.background = 'white';
    textarea.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
    textarea.readOnly = true;
    
    document.body.appendChild(textarea);
    textarea.select();
    textarea.focus();
    
    // Intentar copiar automáticamente
    try {
        document.execCommand('copy');
        alert('¡Perfil ASCII copiado al portapapeles!\n\nEl texto también se muestra abajo por si necesitas copiarlo manualmente.');
    } catch (err) {
        alert('Por favor, selecciona todo el texto (Ctrl+A) y cópialo (Ctrl+C)');
    }
    
    // Cerrar al hacer click fuera o presionar ESC
    const closeTextarea = () => {
        if (document.body.contains(textarea)) {
            document.body.removeChild(textarea);
        }
    };
    
    textarea.addEventListener('blur', () => {
        setTimeout(closeTextarea, 200);
    });
    
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeTextarea();
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    // Añadir botón de cerrar
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕ Cerrar';
    closeBtn.style.position = 'fixed';
    closeBtn.style.top = 'calc(50% - 42%)';
    closeBtn.style.right = 'calc(50% - 42%)';
    closeBtn.style.zIndex = '10001';
    closeBtn.style.padding = '10px 20px';
    closeBtn.style.background = '#0073aa';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '5px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.onclick = closeTextarea;
    document.body.appendChild(closeBtn);
    
    textarea.addEventListener('blur', () => {
        setTimeout(() => {
            if (document.body.contains(closeBtn)) {
                document.body.removeChild(closeBtn);
            }
        }, 200);
    });
}
