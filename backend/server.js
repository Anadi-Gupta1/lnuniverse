const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const config = require('./config/config');

// Load env vars
dotenv.config();

// Connect to database
// For Vercel serverless functions, we need to ensure DB connection is efficient
let cachedDb = null;
const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  cachedDb = await connectDB();
  return cachedDb;
};

// Initialize database connection
connectToDatabase().then(() => {
  console.log('Database connected');
}).catch(err => {
  console.error('Database connection error:', err);
});

// Route files
const hospitalRoutes = require('./routes/hospitalRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');
const eventRoutes = require('./routes/eventRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');

const app = express();

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable compression
app.use(compression());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", '*'],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 10 minutes'
});
app.use('/api/', limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS - especially important for Vercel deployment
app.use(cors({
  origin: '*', // Allow all origins for development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/emergency', emergencyRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Health AI Srijan System API is running',
    version: '1.0.0',
    endpoints: [
      '/api/hospitals',
      '/api/doctors',
      '/api/appointments',
      '/api/users',
      '/api/pharmacies',
      '/api/events',
      '/api/nutrition',
      '/api/emergency'
    ]
  });
});

// Health check endpoint for Vercel
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    environment: config.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Handle undefined routes
app.use('*', (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = config.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`);
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // In serverless environment, we don't need to close the server
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  // In serverless environment, we don't need to close the server
});

// For Vercel serverless functions
module.exports = app;
