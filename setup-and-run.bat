@echo off
setlocal
cd /d "%~dp0"
echo =============================================
echo Library Management System - Setup and Run
echo =============================================
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install Node.js LTS first: https://nodejs.org/
  pause
  exit /b 1
)
if not exist "backend\.env" copy "backend\.env.example" "backend\.env" >nul
if not exist "backend\.env" (
  echo Could not create backend\.env. Copy backend\.env.example to backend\.env manually.
  pause
  exit /b 1
)
echo Installing frontend packages...
call npm install
if errorlevel 1 goto error
echo Installing backend packages...
pushd backend
call npm install
if errorlevel 1 (popd & goto error)
popd
echo Starting backend and frontend in separate windows...
start "Library Backend" /D "%~dp0backend" cmd /k "npm start"
timeout /t 2 /nobreak >nul
start "Library Frontend" /D "%~dp0" cmd /k "npm run dev -- --host 127.0.0.1"
echo.
echo Frontend: http://localhost:5173
echo Backend health: http://localhost:5000/api/health
echo Keep both opened terminal windows running.
pause
exit /b 0
:error
echo Setup failed. Check the error above and confirm internet is available for npm install.
pause
exit /b 1
