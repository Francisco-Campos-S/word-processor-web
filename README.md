# 📄 Procesador de Documentos Word - Aplicación Web

[![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/tu-usuario/word-processor-web?style=social)](https://github.com/tu-usuario/word-processor-web)

Una aplicación web moderna que inserta caracteres invisibles en documentos Word para optimizar la similitud de texto. Convierte tu herramienta de escritorio en una interfaz web accesible desde cualquier navegador.

## 🎥 Demo

![Demo de la aplicación](demo.gif)

> **� Versión Live**: [Ver Demo en Vivo](https://tu-app.onrender.com) (próximamente)

## ✨ Características Destacadas

### 🚀 Funcionalidades Principales
- 🎯 **Inserción automática de caracteres invisibles** cada N caracteres
- 🌐 **Interfaz web moderna** con diseño responsivo 
- 📁 **Drag & Drop** - Arrastra archivos directamente
- ⚡ **Procesamiento rápido** con feedback en tiempo real
- 📱 **Compatible con móviles** - Funciona en cualquier dispositivo
- 🔒 **Seguro** - Los archivos se eliminan automáticamente
- 🎨 **Preserva formato** - Mantiene todos los estilos originales

### �️ Stack Tecnológico
- **Backend**: Flask (Python) + python-docx
- **Frontend**: Bootstrap 5 + Font Awesome + JavaScript ES6+
- **Procesamiento**: Algoritmo avanzado de inserción inteligente
- **Compatibilidad**: .docx, .docm (hasta 16MB)
- **Despliegue**: Docker ready + Render/Railway compatible

## � Inicio Rápido

### ⚡ Instalación en 3 Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/word-processor-web.git
cd word-processor-web

# 2. Instalar (automático)
.\instalar.bat

# 3. Ejecutar
.\iniciar_servidor.bat
```

Abre tu navegador en `http://localhost:5000` y ¡listo! 🎉

### 🐳 Docker (Alternativo)

```bash
# Construir imagen
docker build -t word-processor .

# Ejecutar contenedor
docker run -p 5000:5000 word-processor
```

### 🌐 Despliegue en Render/Railway

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

1. Fork este repositorio
2. Conecta tu cuenta de Render/Railway
3. Selecciona este repositorio
4. ¡Despliega automáticamente!

## 📋 Requisitos

- **Python 3.7+** (recomendado 3.9+)
- **Sistema Operativo**: Windows, macOS, Linux
- **RAM**: 512MB mínimo (recomendado 2GB+)
- **Espacio**: 100MB libre

## 🎯 Características

✅ **Preservación Total**: Mantiene formato, fuentes y estilos  
✅ **Caracteres Invisibles**: "0" blancos automáticos (RGB 255,255,255)  
✅ **Interfaz Moderna**: Drag & Drop + Bootstrap 5  
✅ **Algoritmo Inteligente**: Inserción cada ~70 caracteres  
✅ **Multiplataforma**: Windows, macOS, Linux  
✅ **Sin Instalación**: Solo navegador web  

### 💻 Uso Rápido

1. **📁 Sube**: Arrastra tu .docx
2. **⚡ Procesa**: Automático con caracteres invisibles  
3. **💾 Descarga**: Archivo listo con formato preservado

```
Ejemplo:
Antes:  "Este es un párrafo corto"
Después: "Este es un0párrafo corto0de ejemplo"
         ↑ Ceros invisibles (color blanco)
```

## 📁 Estructura del Proyecto

```
word_processor_web/
├── 📄 app.py                 # Servidor Flask principal
├── 📋 requirements.txt       # Dependencias Python  
├── ⚙️ instalar.bat          # Instalación automática
├── 🌐 templates/index.html   # Interfaz web moderna
├── 📂 uploads/              # Archivos temporales
└── 📂 processed/            # Documentos procesados
```

## 🔍 Algoritmo Inteligente

1. **📄 Análisis**: Lee documento Word completo
2. **🎯 Detección**: Identifica párrafos cortos automáticamente  
3. **📍 Posicionamiento**: Calcula inserción cada ~70 caracteres
4. **🔍 Búsqueda**: Encuentra espacios cercanos para insertar
5. **👁️ Inserción**: Agrega "0" invisible (RGB 255,255,255)
6. **💾 Preservación**: Mantiene formato original 100%

## 🛡️ Seguridad

- **✅ Validación**: Solo .docx/.docm (máx 16MB)
- **🧹 Limpieza**: Archivos eliminados automáticamente  
- **🔒 Local**: Procesamiento sin conexiones externas
- **🛡️ Seguro**: Prevención de path traversal

## � Despliegue

### 🌐 GitHub Pages + Backend Externo

**Frontend** (GitHub Pages):
```bash
git add templates/ static/ README.md
git commit -m "Deploy frontend"  
git push origin main
```

**Backend** (Render/Railway):
```bash
git add app.py requirements.txt
git commit -m "Deploy backend"
git push origin production
```

### 🐳 Docker

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## 🛠️ API

- `GET /` → Interfaz principal
- `POST /procesar` → Procesar documento  
- `GET /descargar/<file>` → Descargar procesado

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crea** rama (`git checkout -b feature/nueva`)
3. **Commit** (`git commit -m 'Add nueva'`)  
4. **Push** (`git push origin feature/nueva`)
5. **Pull Request**

## 📄 Licencia

MIT License - [Ver detalles](LICENSE)

---

⭐ ¿Te gustó? **¡Estrella en GitHub!**  
🐛 ¿Problemas? **[Abre un Issue](../../issues)**  
🤝 ¿Ideas? **[Pull Requests bienvenidos](../../pulls)**

#### "Error al instalar dependencias"
```cmd
# Actualizar pip:
python -m pip install --upgrade pip

# Instalar manualmente:
pip install Flask python-docx
```

#### "Error de conexión en el navegador"
```cmd
# Verificar que el servidor esté ejecutándose
# Buscar el mensaje: "Running on http://127.0.0.1:5000"

# Si no funciona, probar otro puerto:
python app.py
# Modificar en app.py: app.run(debug=True, host='0.0.0.0', port=8080)
```

#### "Archivo demasiado grande"
- **Solución**: Dividir el documento o comprimir imágenes
- **Alternativa**: Modificar `MAX_CONTENT_LENGTH` en `app.py`

#### "Error al procesar documento"
- **Verificar formato**: Asegurarse que sea .docx o .docm válido
- **Comprobar corrupción**: Abrir el archivo en Word antes de procesarlo
- **Revisar permisos**: Verificar permisos de escritura en las carpetas

### Logs y Debugging

#### Habilitar logs detallados:
Modificar en `app.py`:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
app.run(debug=True, host='0.0.0.0', port=5000)
```

#### Verificar archivos generados:
```cmd
# Listar archivos en processed:
dir processed

# Verificar tamaño:
dir processed /s
```

## 🚀 Mejoras y Personalización

### Configuraciones Avanzadas

#### Cambiar puerto:
```python
# En app.py, línea final:
app.run(debug=True, host='0.0.0.0', port=8080)  # Cambiar 5000 por 8080
```

#### Aumentar tamaño máximo:
```python
# En app.py:
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024  # 32MB
```

#### Personalizar colores:
```css
/* En templates/index.html, sección <style>: */
:root {
    --primary-color: #tu-color-primario;
    --secondary-color: #tu-color-secundario;
}
```

### Funcionalidades Adicionales Sugeridas

1. **Batch processing**: Procesar múltiples archivos
2. **API REST**: Endpoints para integración con otras aplicaciones
3. **Historial**: Guardar logs de archivos procesados
4. **Configuración persistente**: Guardar preferencias del usuario
5. **Autenticación**: Sistema de usuarios y contraseñas
6. **Base de datos**: Almacenamiento de metadatos
7. **Docker**: Containerización para fácil despliegue

## 📞 Soporte

### Información del Sistema
```cmd
# Verificar versión de Python:
python --version

# Verificar dependencias instaladas:
pip list

# Verificar estado del servidor:
curl http://localhost:5000/status
```

### Contacto y Contribuciones
- **Desarrollador**: Desarrollador con 10 años de experiencia
- **Versión**: 1.0.0
- **Última actualización**: Julio 2025

## 📄 Licencia

Este proyecto está desarrollado para uso personal y educativo. Siéntete libre de modificarlo según tus necesidades.

---

**¡Disfruta de tu nueva aplicación web para procesar documentos Word! 🎉**
