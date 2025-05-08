// Import the Express app
const app = require('../backend/server');

// Export a serverless function handler that works with Vercel
module.exports = (req, res) => {
  // This line is important - it forwards the request to your Express app
  return app(req, res);
};