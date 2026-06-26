@echo off
echo ===========================================
echo Path2Profession - Server Starter
echo ===========================================

echo.
echo Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is NOT installed or not found!
    echo Please download and install Node.js from: https://nodejs.org/
    echo After installing, close this window and run it again.
    echo.
    pause
    exit /b
)

echo.
echo Installing dependencies (if needed)...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to install dependencies.
    pause
    exit /b
)

echo.
echo Starting Server...
echo Open your browser to: http://localhost:5000
echo.
node server.js

pause
