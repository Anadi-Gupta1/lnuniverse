// Import the Express app
import app from '../backend/server.js';

// Export a serverless function handler that works with Vercel
export default function handler(req, res) {
  // This line is important - it forwards the request to your Express app
  return app(req, res);
}