// Aplicación Web: Procesador de Documentos Word
// JavaScript principal para manejo de la interfaz

class WordProcessorApp {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.checkServerStatus();
    }

    initializeElements() {
        // Elementos principales
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.uploadForm = document.getElementById('uploadForm');
        this.processBtn = document.getElementById('processBtn');
        this.pasoInput = document.getElementById('paso');
        
        // Elementos de estado
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.progressContainer = document.getElementById('progressContainer');
        this.progressBar = document.querySelector('.progress-bar');
        this.resultContainer = document.getElementById('resultContainer');
        this.errorContainer = document.getElementById('errorContainer');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.errorMessage = document.getElementById('errorMessage');
        
        // Configuración
        this.maxFileSize = 16 * 1024 * 1024; // 16MB
        this.allowedTypes = ['.docx', '.docm'];
        this.currentFile = null;
    }

    attachEventListeners() {
        // Eventos de carga de archivos
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        
        // Eventos de formulario
        this.fileInput.addEventListener('change', () => this.handleFileSelect());
        this.uploadForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Eventos de validación
        this.pasoInput.addEventListener('input', () => this.validateStep());
        
        // Eventos de teclado para accesibilidad
        this.uploadArea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.fileInput.click();
            }
        });
        
        // Evento para prevenir el drag and drop por defecto en toda la página
        document.addEventListener('dragover', (e) => e.preventDefault());
        document.addEventListener('drop', (e) => e.preventDefault());
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.add('dragover');
        this.uploadArea.style.transform = 'scale(1.02)';
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.remove('dragover');
        this.uploadArea.style.transform = 'scale(1)';
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.uploadArea.classList.remove('dragover');
        this.uploadArea.style.transform = 'scale(1)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.fileInput.files = files;
            this.handleFileSelect();
        }
    }

    handleFileSelect() {
        const file = this.fileInput.files[0];
        if (!file) return;

        // Validar archivo
        const validation = this.validateFile(file);
        if (!validation.valid) {
            this.showError(validation.message);
            this.resetFileInput();
            return;
        }

        this.currentFile = file;
        this.updateUploadArea(file.name, this.formatFileSize(file.size));
        this.processBtn.disabled = false;
        this.hideMessages();
        
        // Animación de éxito
        this.uploadArea.style.animation = 'pulse 0.6s ease-out';
        setTimeout(() => {
            this.uploadArea.style.animation = '';
        }, 600);
    }

    validateFile(file) {
        // Validar tipo de archivo
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!this.allowedTypes.includes(fileExtension)) {
            return {
                valid: false,
                message: `Tipo de archivo no válido. Solo se permiten archivos ${this.allowedTypes.join(', ')}`
            };
        }

        // Validar tamaño
        if (file.size > this.maxFileSize) {
            return {
                valid: false,
                message: `El archivo es demasiado grande. Máximo ${this.formatFileSize(this.maxFileSize)} permitido.`
            };
        }

        // Validar nombre de archivo
        if (file.name.length > 255) {
            return {
                valid: false,
                message: 'El nombre del archivo es demasiado largo.'
            };
        }

        return { valid: true };
    }

    validateStep() {
        const value = parseInt(this.pasoInput.value);
        const min = parseInt(this.pasoInput.min);
        const max = parseInt(this.pasoInput.max);
        
        if (value < min) {
            this.pasoInput.value = min;
        } else if (value > max) {
            this.pasoInput.value = max;
        }
    }

    updateUploadArea(fileName, fileSize) {
        this.uploadArea.innerHTML = `
            <div class="upload-icon">
                <i class="fas fa-file-word" style="color: var(--success-color);"></i>
            </div>
            <h5 style="color: var(--success-color);">✅ Archivo seleccionado</h5>
            <p><strong>${this.escapeHtml(fileName)}</strong></p>
            <p><small class="text-muted">Tamaño: ${fileSize}</small></p>
            <p><small class="text-muted">Haz clic en "Procesar Documento" para continuar</small></p>
        `;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.currentFile) {
            this.showError('Por favor selecciona un archivo');
            return;
        }

        const paso = parseInt(this.pasoInput.value);
        if (isNaN(paso) || paso < 10 || paso > 200) {
            this.showError('El intervalo de caracteres debe ser entre 10 y 200');
            return;
        }

        await this.processDocument(this.currentFile, paso);
    }

    async processDocument(file, paso) {
        try {
            this.showLoading();
            this.animateProgress();
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('paso', paso);

            console.log('Enviando documento:', file.name, 'Paso:', paso);

            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            console.log('Respuesta del servidor:', response.status, response.statusText);

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            }

            // Verificar si la respuesta tiene contenido
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('El servidor no devolvió una respuesta JSON válida');
            }

            const result = await response.json();
            console.log('Resultado:', result);

            if (result.success) {
                this.showSuccess(result.download_url, result.filename);
                this.logSuccess(file.name, result.filename, paso);
            } else {
                throw new Error(result.message);
            }
            
        } catch (error) {
            console.error('Error al procesar documento:', error);
            
            // Dar más información sobre el error
            let errorMessage = error.message;
            if (error.message.includes('unexpected end of data')) {
                errorMessage = 'Error de conexión con el servidor. Por favor, inténtalo de nuevo.';
            } else if (error.message.includes('JSON')) {
                errorMessage = 'Error en la respuesta del servidor. Verifica que el servidor esté funcionando correctamente.';
            }
            
            this.showError(`Error al procesar el documento: ${errorMessage}`);
        } finally {
            this.hideLoading();
        }
    }

    showLoading() {
        this.processBtn.disabled = true;
        this.processBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        this.loadingSpinner.style.display = 'block';
        this.progressContainer.style.display = 'block';
        this.hideMessages();
        
        // Scroll suave al área de progreso
        this.progressContainer.scrollIntoView({ behavior: 'smooth' });
    }

    hideLoading() {
        this.processBtn.disabled = false;
        this.processBtn.innerHTML = '<i class="fas fa-magic"></i> Procesar Documento';
        this.loadingSpinner.style.display = 'none';
        
        setTimeout(() => {
            this.progressContainer.style.display = 'none';
        }, 1000);
    }

    animateProgress() {
        this.progressBar.style.width = '0%';
        let width = 0;
        const interval = setInterval(() => {
            width += Math.random() * 15 + 5;
            if (width >= 90) {
                width = 90;
                clearInterval(interval);
            }
            this.progressBar.style.width = width + '%';
        }, 150);
        
        this.progressInterval = interval;
    }

    showSuccess(downloadUrl, filename) {
        clearInterval(this.progressInterval);
        this.progressBar.style.width = '100%';
        
        setTimeout(() => {
            this.resultContainer.style.display = 'block';
            this.resultContainer.classList.add('fade-in');
            this.downloadBtn.href = downloadUrl;
            this.downloadBtn.download = filename;
            
            // Scroll suave al resultado
            this.resultContainer.scrollIntoView({ behavior: 'smooth' });
            
            // Auto-descarga opcional (comentado para mejor UX)
            // setTimeout(() => this.downloadBtn.click(), 1000);
        }, 500);
    }

    showError(message) {
        this.errorContainer.style.display = 'block';
        this.errorContainer.classList.add('fade-in');
        this.errorMessage.textContent = message;
        
        // Scroll suave al error
        this.errorContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Log del error para debugging
        console.error('Error en la aplicación:', message);
    }

    hideMessages() {
        this.resultContainer.style.display = 'none';
        this.errorContainer.style.display = 'none';
        this.resultContainer.classList.remove('fade-in');
        this.errorContainer.classList.remove('fade-in');
    }

    resetForm() {
        this.uploadForm.reset();
        this.currentFile = null;
        this.processBtn.disabled = true;
        this.hideMessages();
        this.resetUploadArea();
        
        // Reset del input de archivo
        this.resetFileInput();
    }

    resetFileInput() {
        // Crear nuevo input file para limpiar completamente
        const newFileInput = this.fileInput.cloneNode(true);
        this.fileInput.parentNode.replaceChild(newFileInput, this.fileInput);
        this.fileInput = newFileInput;
        this.fileInput.addEventListener('change', () => this.handleFileSelect());
    }

    resetUploadArea() {
        this.uploadArea.innerHTML = `
            <div class="upload-icon">
                <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <h4>Arrastra tu documento aquí</h4>
            <p>o haz clic para seleccionar</p>
            <p><small class="text-muted">Archivos soportados: ${this.allowedTypes.join(', ')} (máx. ${this.formatFileSize(this.maxFileSize)})</small></p>
        `;
    }

    async checkServerStatus() {
        try {
            const response = await fetch('/status');
            const result = await response.json();
            console.log('✅ Servidor conectado:', result.message);
            
            // Mostrar indicador de conexión
            this.showConnectionStatus(true);
        } catch (error) {
            console.error('❌ Error de conexión con el servidor:', error);
            this.showConnectionStatus(false);
            this.showError('No se puede conectar con el servidor. Verifica que esté ejecutándose.');
        }
    }

    showConnectionStatus(isConnected) {
        const statusElement = document.createElement('div');
        statusElement.className = `alert ${isConnected ? 'alert-success' : 'alert-danger'} alert-dismissible fade show position-fixed`;
        statusElement.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
        statusElement.innerHTML = `
            <i class="fas ${isConnected ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <strong>${isConnected ? 'Conectado' : 'Desconectado'}</strong>
            ${isConnected ? 'Servidor en línea' : 'Error de conexión'}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(statusElement);
        
        // Auto-dismiss después de 3 segundos si es exitoso
        if (isConnected) {
            setTimeout(() => {
                statusElement.remove();
            }, 3000);
        }
    }

    // Utilidades
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    logSuccess(originalName, processedName, step) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            originalFile: originalName,
            processedFile: processedName,
            step: step,
            status: 'success'
        };
        
        console.log('✅ Documento procesado exitosamente:', logEntry);
        
        // Guardar en localStorage para historial (opcional)
        const history = JSON.parse(localStorage.getItem('wordProcessorHistory') || '[]');
        history.unshift(logEntry);
        localStorage.setItem('wordProcessorHistory', JSON.stringify(history.slice(0, 10))); // Mantener solo los últimos 10
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.wordProcessorApp = new WordProcessorApp();
});

// Función global para resetear el formulario (llamada desde HTML)
function resetForm() {
    if (window.wordProcessorApp) {
        window.wordProcessorApp.resetForm();
    }
}

// Prevenir comportamiento por defecto de drag and drop en toda la página
window.addEventListener('dragover', (e) => e.preventDefault());
window.addEventListener('drop', (e) => e.preventDefault());
