# Script pour créer le fichier .env
$envContent = @"
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/etudeexpress

# Frontend URL
FRONTEND_URL=http://localhost:3000

# JWT Secret
JWT_SECRET=your_jwt_secret_here_change_in_production

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
"@

# Créer le fichier .env
$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "Fichier .env créé avec succès !" -ForegroundColor Green
Write-Host "N'oubliez pas de configurer votre clé API OpenAI dans le fichier .env" -ForegroundColor Yellow

