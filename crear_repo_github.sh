#!/bin/bash

# =========================================================
#  SCRIPT PARA CREAR REPOSITORIO EN GITHUB AUTOMATICAMENTE
# =========================================================

echo "🚀 Creando repositorio 'word-processor-web' en GitHub..."
echo ""

# Método 1: Usar GitHub API (requiere token personal)
echo "📋 OPCION 1: GitHub API (Recomendado)"
echo "----------------------------------------"
echo "1. Ve a: https://github.com/settings/tokens"
echo "2. 'Generate new token' > 'Generate new token (classic)'"
echo "3. Nombre: 'word-processor-deploy'"
echo "4. Marcar: 'repo' (para crear repositorios)"
echo "5. Copiar el token generado"
echo ""

read -p "¿Tienes un token de GitHub? (y/n): " tiene_token

if [ "$tiene_token" = "y" ]; then
    read -p "Pega tu token de GitHub: " github_token
    read -p "Tu username de GitHub: " github_user
    
    echo ""
    echo "🔄 Creando repositorio..."
    
    # Crear repositorio usando API
    curl -H "Authorization: token $github_token" \
         -H "Accept: application/vnd.github.v3+json" \
         https://api.github.com/user/repos \
         -d "{
           \"name\": \"word-processor-web\",
           \"description\": \"Aplicación web para insertar caracteres invisibles en documentos Word\",
           \"private\": false,
           \"auto_init\": false
         }"
    
    echo ""
    echo "✅ Repositorio creado!"
    echo "🔗 URL: https://github.com/$github_user/word-processor-web"
    
    # Configurar remote y push
    git remote add origin "https://github.com/$github_user/word-processor-web.git"
    git push -u origin main
    
    echo ""
    echo "🎉 ¡PROYECTO SUBIDO EXITOSAMENTE!"
    echo "📁 Repositorio: https://github.com/$github_user/word-processor-web"
    echo ""
    echo "🚀 SIGUIENTE PASO: DEPLOYMENT EN RENDER"
    echo "1. Ve a https://render.com"
    echo "2. 'New' → 'Web Service'"
    echo "3. Conecta tu repositorio GitHub"
    echo "4. ¡Deploy automático!"
    
else
    echo ""
    echo "📋 OPCION 2: Creación Manual"
    echo "----------------------------------------"
    echo "1. Ve a: https://github.com/new"
    echo "2. Repository name: word-processor-web"
    echo "3. Description: Aplicación web para procesar documentos Word"
    echo "4. Public ✓"
    echo "5. NO marcar 'Add a README file'"
    echo "6. Create repository"
    echo ""
    echo "7. Copia la URL del repositorio y ejecuta:"
    echo "   git remote add origin https://github.com/TU-USUARIO/word-processor-web.git"
    echo "   git push -u origin main"
fi

echo ""
echo "Presiona Enter para continuar..."
read
