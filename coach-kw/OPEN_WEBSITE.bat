@echo off
echo Opening website in browser...
timeout /t 3 /nobreak >nul
start http://localhost:3000
echo.
echo If the website doesn't open, make sure the server is running!
echo Run: npm run dev in the coach-kw folder first.


