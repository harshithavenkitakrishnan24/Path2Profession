@echo off
echo ===========================================
echo Path2Profession - Setup & Start
echo ===========================================

echo.
echo 1. Checking Node.js...
node -v
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is NOT installed!
    echo Please install it from https://nodejs.org/
    pause
    exit /b
)

echo.
echo 2. Installing Dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed!
    pause
    exit /b
)

echo.
echo 3. Starting Server...
echo If it crashes, the error will be shown below.
echo.
node server.js
pause
