import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const config = {
  // OpenAI Configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY || "dummy-key",
    isConfigured: !!(
      process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "dummy-key"
    ),
  },

  // Server Configuration
  server: {
    port: parseInt(process.env.PORT || "5000", 10),
    nodeEnv: process.env.NODE_ENV || "development",
  },

  // Database Configuration
  database: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/etudeexpress",
  },

  // Frontend Configuration
  frontend: {
    url: process.env.FRONTEND_URL || "http://localhost:3000",
  },

  // JWT Configuration
  jwt: {
    secret:
      process.env.JWT_SECRET || "your_jwt_secret_here_change_in_production",
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10),
  },
};

// Validation
if (!config.openai.isConfigured) {
  console.warn(
    "⚠️  OPENAI_API_KEY is not configured. AI features will be limited."
  );
}

if (config.jwt.secret === "your_jwt_secret_here_change_in_production") {
  console.warn("⚠️  JWT_SECRET is using default value. Change in production.");
}

