@echo off
title MetroFlow OCC - Launcher
echo ============================================================
echo   MetroFlow OCC — Ahmedabad Metro Intelligence System
echo   Launching in Desktop Standalone Window Mode...
echo ============================================================

start msedge --app=http://localhost:3000 --window-size=430,920 --window-position=500,50
if %errorlevel% neq 0 (
    start chrome --app=http://localhost:3000 --window-size=430,920 --window-position=500,50
)
exit
