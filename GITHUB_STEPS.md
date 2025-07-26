# Instrucciones para GitHub

## 🚀 Subir a GitHub (Paso a Paso)

1. **Ve a GitHub.com** y crea cuenta gratis si no tienes

2. **Crear nuevo repositorio**:
   - Click "+" → "New repository"
   - Nombre: `word-processor-web`
   - ✅ Public (para que Render lo vea)
   - ✅ NO marques "Initialize with README" (ya tienes uno)

3. **Comandos en terminal** (copia y pega):

```bash
# Inicializar git en tu proyecto
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Word processor web app listo para deployment"

# Conectar con tu repositorio (CAMBIA tu-usuario por tu username)
git remote add origin https://github.com/tu-usuario/word-processor-web.git

# Subir archivos
git push -u origin main
```

## 🎯 Archivos que SI se suben a GitHub:
- ✅ app.py
- ✅ requirements.txt  
- ✅ render.yaml
- ✅ Procfile
- ✅ templates/
- ✅ static/ (si existe)
- ✅ README.md
- ✅ DEPLOYMENT.md

## 🚫 Archivos que NO se suben (crear .gitignore):
- ❌ venv/
- ❌ uploads/
- ❌ processed/  
- ❌ *.bat
- ❌ test_*.py
