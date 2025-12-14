@echo off
echo ========================================
echo Starting Next.js Development Server
echo ========================================
echo.
echo Make sure you're in the coach-kw directory!
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Installing dependencies (if needed)...
call npm install
echo.
echo Starting development server...
echo.
echo The server will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
call npm run dev


