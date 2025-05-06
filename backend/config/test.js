module.exports = {
  NODE_ENV: 'test',
  PORT: 5001,
  MONGO_URI: 'mongodb://localhost:27017/health-ai-srijan-test',
  JWT_SECRET: 'test_secret_key',
  JWT_EXPIRE: '1h',
  JWT_COOKIE_EXPIRE: 1,
  CORS_ORIGIN: 'http://localhost:3000'
}; 