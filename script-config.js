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
        // Añadir doble click para agregar
        item.addEventListener('dblclick', handleTestDoubleClick);
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
    
    // Añadir doble click para quitar
    droppedItem.addEventListener('dblclick', () => {
        removeTest(testData.test);
    });
    
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
        'gq': 'Conocimiento Cuantitativo (Gq)',
        'gps': 'Psicomotricidad (Gps)',
        'se': 'Socioemocional (SE)'
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
        'percentil': 'Percentil',
        'pd': 'PD',
        'z': 'z-score',
        'normalizada': 'Normalizada',
        'corte': 'Punto de Corte'
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
    
    // Búsqueda de tests
    const searchInput = document.getElementById('searchTests');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filtro de edad
    const applyAgeFilter = document.getElementById('applyAgeFilter');
    const clearAgeFilter = document.getElementById('clearAgeFilter');
    
    if (applyAgeFilter) {
        applyAgeFilter.addEventListener('click', handleAgeFilter);
    }
    
    if (clearAgeFilter) {
        clearAgeFilter.addEventListener('click', handleClearAgeFilter);
    }
    
    // También aplicar filtro con Enter
    const ageInputs = document.querySelectorAll('.age-input');
    ageInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAgeFilter();
            }
        });
    });
    
    // Botones "Añadir todos"
    const addAllButtons = document.querySelectorAll('.btn-add-all');
    addAllButtons.forEach(button => {
        button.addEventListener('click', handleAddAllTests);
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

// Manejar doble click en test de la biblioteca (añadir)
function handleTestDoubleClick(e) {
    const testItem = e.currentTarget;
    
    // Evitar que se agregue si ya está oculto
    if (testItem.classList.contains('hidden')) {
        return;
    }
    
    const testData = {
        test: testItem.dataset.test,
        domain: testItem.dataset.domain,
        chc: testItem.dataset.chc,
        scale: testItem.dataset.scale,
        battery: testItem.dataset.battery,
        name: testItem.querySelector('.test-name').textContent
    };
    
    // Verificar que no esté ya añadido
    if (selectedTests.some(t => t.test === testData.test)) {
        return;
    }
    
    // Añadir al array de tests seleccionados
    selectedTests.push(testData);
    
    // Buscar la zona de drop correspondiente
    const dropZone = document.querySelector(`.drop-zone[data-chc="${testData.chc}"]`);
    if (dropZone) {
        addTestToDropZone(dropZone, testData);
    }
    
    // Ocultar el test de la biblioteca
    hideTestFromLibrary(testData.test);
    
    // Guardar configuración
    saveConfiguration();
    
    // Actualizar zonas
    updateDropZones();
}

// ============ NUEVAS FUNCIONALIDADES ============

// Función de búsqueda
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const testItems = document.querySelectorAll('.test-item');
    const batteryGroups = document.querySelectorAll('.battery-group');
    
    if (searchTerm === '') {
        // Si no hay búsqueda, mostrar todos
        testItems.forEach(item => {
            item.classList.remove('search-no-match');
        });
        batteryGroups.forEach(group => {
            group.style.display = '';
        });
        return;
    }
    
    // Buscar en tests
    testItems.forEach(item => {
        const testName = item.querySelector('.test-name').textContent.toLowerCase();
        const battery = item.dataset.battery ? item.dataset.battery.toLowerCase() : '';
        
        if (testName.includes(searchTerm) || battery.includes(searchTerm)) {
            item.classList.remove('search-no-match');
        } else {
            item.classList.add('search-no-match');
        }
    });
    
    // Ocultar baterías que no tienen tests visibles
    batteryGroups.forEach(group => {
        const visibleTests = group.querySelectorAll('.test-item:not(.hidden):not(.search-no-match)');
        if (visibleTests.length === 0) {
            group.style.display = 'none';
        } else {
            group.style.display = '';
        }
    });
}

// Función de filtro por edad
function handleAgeFilter() {
    const minAge = parseInt(document.getElementById('ageFilterMin').value);
    const maxAge = parseInt(document.getElementById('ageFilterMax').value);
    const statusDiv = document.getElementById('ageFilterStatus');
    
    if (isNaN(minAge) && isNaN(maxAge)) {
        alert('Por favor, introduce al menos una edad (mínima o máxima)');
        return;
    }
    
    const batteryGroups = document.querySelectorAll('.battery-group');
    let filteredCount = 0;
    let totalCount = batteryGroups.length;
    
    batteryGroups.forEach(group => {
        const groupMinAge = parseInt(group.dataset.ageMin);
        const groupMaxAge = parseInt(group.dataset.ageMax);
        
        let shouldShow = true;
        
        // Si hay edad mínima, verificar que la batería cubra edades >= minAge
        if (!isNaN(minAge)) {
            // La batería debe tener un rango que incluya o esté por encima de minAge
            if (groupMaxAge < minAge) {
                shouldShow = false;
            }
        }
        
        // Si hay edad máxima, verificar que la batería cubra edades <= maxAge
        if (!isNaN(maxAge)) {
            // La batería debe tener un rango que incluya o esté por debajo de maxAge
            if (groupMinAge > maxAge) {
                shouldShow = false;
            }
        }
        
        if (shouldShow) {
            group.classList.remove('filtered-out');
            filteredCount++;
        } else {
            group.classList.add('filtered-out');
        }
    });
    
    // Actualizar mensaje de estado
    const ageRangeText = !isNaN(minAge) && !isNaN(maxAge) 
        ? `${minAge}-${maxAge} años`
        : !isNaN(minAge)
            ? `${minAge}+ años`
            : `0-${maxAge} años`;
    
    statusDiv.textContent = `Mostrando ${filteredCount} de ${totalCount} baterías para ${ageRangeText}`;
    statusDiv.classList.add('active');
}

// Limpiar filtro de edad
function handleClearAgeFilter() {
    document.getElementById('ageFilterMin').value = '';
    document.getElementById('ageFilterMax').value = '';
    
    const batteryGroups = document.querySelectorAll('.battery-group');
    batteryGroups.forEach(group => {
        group.classList.remove('filtered-out');
    });
    
    const statusDiv = document.getElementById('ageFilterStatus');
    statusDiv.textContent = '';
    statusDiv.classList.remove('active');
}

// Añadir todos los tests de una batería
function handleAddAllTests(e) {
    const battery = e.currentTarget.dataset.battery;
    const batteryGroup = e.currentTarget.closest('.battery-group');
    
    // Obtener todos los tests de esta batería que no estén ocultos
    const testItems = batteryGroup.querySelectorAll('.test-item:not(.hidden)');
    
    if (testItems.length === 0) {
        alert('No hay tests disponibles en esta batería');
        return;
    }
    
    let addedCount = 0;
    let skippedCount = 0;
    
    testItems.forEach(item => {
        const testData = {
            test: item.dataset.test,
            domain: item.dataset.domain,
            chc: item.dataset.chc,
            scale: item.dataset.scale,
            battery: item.dataset.battery,
            name: item.querySelector('.test-name').textContent
        };
        
        // Verificar que no esté ya añadido
        if (!selectedTests.some(t => t.test === testData.test)) {
            // Añadir al array de tests seleccionados
            selectedTests.push(testData);
            
            // Buscar la zona de drop correspondiente
            const dropZone = document.querySelector(`.drop-zone[data-chc="${testData.chc}"]`);
            if (dropZone) {
                addTestToDropZone(dropZone, testData);
            }
            
            // Ocultar el test de la biblioteca
            hideTestFromLibrary(testData.test);
            
            addedCount++;
        } else {
            skippedCount++;
        }
    });
    
    // Guardar configuración
    if (addedCount > 0) {
        saveConfiguration();
        updateDropZones();
    }
    
    // Mostrar mensaje
    let message = `Se añadieron ${addedCount} test(s) de ${battery}`;
    if (skippedCount > 0) {
        message += ` (${skippedCount} ya estaban añadidos)`;
    }
    alert(message);
}

