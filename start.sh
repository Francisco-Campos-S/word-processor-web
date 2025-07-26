#!/bin/bash
echo "🚀 Iniciando aplicación Flask..."
echo "📁 Directorio actual: $(pwd)"
echo "🐍 Python version: $(python --version)"
echo "📦 Port: $PORT"
echo "🌐 FLASK_ENV: $FLASK_ENV"

# Crear directorios necesarios
mkdir -p uploads processed static templates

# Verificar archivos
echo "📄 Archivos en directorio:"
ls -la

# Iniciar aplicación
echo "▶️ Ejecutando Flask app..."
exec python app.py
