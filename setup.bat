@echo off
echo Instalando dependencias del backend...
cd backend

:: Crear entorno virtual si no existe
if not exist "venv" (
    python -m venv venv
)

:: Activar entorno virtual y instalar requerimientos
call venv\Scripts\activate
pip install -r requirements.txt
deactivate

cd ..

echo Instalando dependencias del frontend...
cd frontend
npm install
cd ..

echo Instalación completa. ¡Todo listo para comenzar! 🚀
pause
