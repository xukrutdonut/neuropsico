// Estado de la aplicación
let selectedTests = [];

// Inicializar drag & drop
document.addEventListener('DOMContentLoaded', () => {
    initializeDragAndDrop();
    loadSavedConfiguration();
    setupEventListeners();
    updateDropZones();
});

function initializeDragAndDrop() {
    const testItems = document.querySelectorAll('.test-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    // Configurar items arrastrables
    testItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    // Configurar zonas de drop
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    
    const testData = {
        test: e.target.dataset.test,
        domain: e.target.dataset.domain,
        chc: e.target.dataset.chc,
        scale: e.target.dataset.scale,
        battery: e.target.dataset.battery,
        name: e.target.querySelector('.test-name').textContent
    };
    
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', JSON.stringify(testData));
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const testData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const dropZone = e.currentTarget;
    const targetChc = dropZone.dataset.chc;
    
    // Verificar que el test pertenece a este dominio CHC
    if (testData.chc !== targetChc) {
        alert(`Este test pertenece al dominio CHC: ${getChcName(testData.chc)}`);
        return;
    }
    
    // Verificar que no esté ya añadido
    if (selectedTests.some(t => t.test === testData.test)) {
        alert('Este test ya está en el formulario');
        return;
    }
    
    // Añadir al array de tests seleccionados
    selectedTests.push(testData);
    
    // Crear elemento visual en la zona de drop
    addTestToDropZone(dropZone, testData);
    
    // Ocultar el test de la biblioteca
    hideTestFromLibrary(testData.test);
    
    // Guardar configuración
    saveConfiguration();
    
    // Actualizar zonas
    updateDropZones();
}

function addTestToDropZone(dropZone, testData) {
    const droppedItem = document.createElement('div');
    droppedItem.className = 'dropped-item';
    droppedItem.dataset.test = testData.test;
    
    droppedItem.innerHTML = `
        <span class="test-name">${testData.name}</span>
        <span class="battery-badge">${testData.battery}</span>
        <span class="test-scale">${getScaleName(testData.scale)}</span>
        <button class="remove-btn" onclick="removeTest('${testData.test}')">×</button>
    `;
    
    dropZone.appendChild(droppedItem);
}

function removeTest(testId) {
    // Eliminar del array
    selectedTests = selectedTests.filter(t => t.test !== testId);
    
    // Eliminar elemento visual
    const droppedItem = document.querySelector(`.dropped-item[data-test="${testId}"]`);
    if (droppedItem) {
        droppedItem.remove();
    }
    
    // Mostrar de nuevo en la biblioteca
    showTestInLibrary(testId);
    
    // Guardar configuración
    saveConfiguration();
    
    // Actualizar zonas
    updateDropZones();
}

function hideTestFromLibrary(testId) {
    const testItem = document.querySelector(`.test-library .test-item[data-test="${testId}"]`);
    if (testItem) {
        testItem.classList.add('hidden');
    }
}

function showTestInLibrary(testId) {
    const testItem = document.querySelector(`.test-library .test-item[data-test="${testId}"]`);
    if (testItem) {
        testItem.classList.remove('hidden');
    }
}

function updateDropZones() {
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        if (zone.children.length === 0) {
            zone.classList.add('empty');
        } else {
            zone.classList.remove('empty');
        }
    });
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

function saveConfiguration() {
    localStorage.setItem('neuropsico_config', JSON.stringify(selectedTests));
}

function loadSavedConfiguration() {
    const saved = localStorage.getItem('neuropsico_config');
    if (saved) {
        selectedTests = JSON.parse(saved);
        
        // Reconstruir la interfaz
        selectedTests.forEach(testData => {
            const dropZone = document.querySelector(`.drop-zone[data-chc="${testData.chc}"]`);
            if (dropZone) {
                addTestToDropZone(dropZone, testData);
                hideTestFromLibrary(testData.test);
            }
        });
        
        updateDropZones();
    }
}

function setupEventListeners() {
    // Botón limpiar
    document.getElementById('clearBtn').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres limpiar toda la configuración?')) {
            clearConfiguration();
        }
    });
    
    // Botón continuar
    document.getElementById('continueBtn').addEventListener('click', () => {
        if (selectedTests.length === 0) {
            alert('Debes seleccionar al menos un test antes de continuar');
            return;
        }
        
        // Guardar y navegar a la página de evaluación
        saveConfiguration();
        window.location.href = 'evaluation.html';
    });
}

function clearConfiguration() {
    // Limpiar array
    selectedTests = [];
    
    // Limpiar todas las zonas de drop
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.innerHTML = '';
    });
    
    // Mostrar todos los tests en la biblioteca
    const testItems = document.querySelectorAll('.test-library .test-item');
    testItems.forEach(item => {
        item.classList.remove('hidden');
    });
    
    // Limpiar localStorage
    localStorage.removeItem('neuropsico_config');
    
    // Actualizar zonas
    updateDropZones();
}
