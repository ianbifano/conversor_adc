#!/bin/bash

# RECORDA DARLE PERMISOS DE EJECUCION A ESTE SCRIPT
# chmod +x setup.sh

echo "📦 Instalando dependencias del backend..."
cd backend || exit 1

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

# Activar entorno virtual
source venv/bin/activate

# Instalar requerimientos
pip install -r requirements.txt

# Salir del entorno virtual
deactivate
cd ..

echo "📦 Instalando dependencias del frontend..."
cd frontend || exit 1
npm install
cd ..

echo "✅ Instalación completa. ¡Todo listo para comenzar! 🚀"
