@echo off
cd /d "%~dp0"
echo Starting Backend Server on port 8080...
java -jar target\ott-platform-1.0.0.jar
pause
