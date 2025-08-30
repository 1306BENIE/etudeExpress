# Script pour démarrer le développement (Backend + Frontend)
Write-Host "🚀 Démarrage d'EtudeExpress en mode développement..." -ForegroundColor Green

# Démarrer le backend
Write-Host "📡 Démarrage du backend..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend-etudeExpress; npm run dev"

# Attendre un peu que le backend démarre
Start-Sleep -Seconds 3

# Démarrer le frontend
Write-Host "🎨 Démarrage du frontend..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend-etudeExpress; npm run dev"

Write-Host "✅ EtudeExpress est en cours de démarrage !" -ForegroundColor Green
Write-Host "🌐 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🎨 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📊 API: http://localhost:5000/api" -ForegroundColor Cyan
