const dotenv = require('dotenv');

// Load env vars
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGODB_URI || process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'healthaiproject2025secretkey',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE || 30,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*', // Allow all origins for development, change for production
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
};
