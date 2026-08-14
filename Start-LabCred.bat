@echo off
title LabCred CRM - Local Server
cd /d "%~dp0"
echo.
echo   Starting LabCred CRM local server...
echo.
node server.js
if %errorlevel% neq 0 (
  echo.
  echo   Could not start. Make sure Node.js is installed: https://nodejs.org
  echo.
  pause
)
