const mongoose = require('mongoose');
const config = require('./config');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let cachedConnection = null;

const connectDB = async () => {
  // If we already have a connection, use it
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    // For local development, always use the in-memory MongoDB server
    if (config.NODE_ENV === 'development') {
      console.log('Starting in-memory MongoDB server for development...');
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      console.log(`In-memory MongoDB server started at: ${mongoUri}`);
      
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10
      });
    } else {
      // Connect to external MongoDB for production
      console.log('Connecting to production MongoDB instance...');
      await mongoose.connect(config.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10
      });
    }

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    cachedConnection = mongoose.connection;

    // Handle connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      cachedConnection = null;
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      if (mongoServer) {
        await mongoServer.stop();
        console.log('In-memory MongoDB server stopped');
      }
      console.log('MongoDB connection closed through app termination');
      cachedConnection = null;
      process.exit(0);
    });

    return mongoose.connection;

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Don't exit process in serverless environment
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;
