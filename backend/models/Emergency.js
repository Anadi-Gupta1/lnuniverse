const mongoose = require('mongoose');

const EmergencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  type: {
    type: String,
    enum: ['ambulance', 'fire', 'police', 'disaster', 'other'],
    required: [true, 'Please specify the emergency service type']
  },
  contactNumber: {
    type: String,
    required: [true, 'Please add a contact number']
  },
  alternateNumber: {
    type: String
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [300, 'Description cannot be more than 300 characters']
  },
  coverage: {
    areas: [String], // e.g., ["North Bhopal", "South Bhopal"]
    radius: Number // coverage radius in km
  },
  responseTime: {
    type: String // e.g., "10-15 minutes"
  },
  operatingHours: {
    is24Hours: {
      type: Boolean,
      default: true
    },
    schedule: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String,
      saturday: String,
      sunday: String
    }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index
EmergencySchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model('Emergency', EmergencySchema);
