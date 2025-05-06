const mongoose = require('mongoose');

const TeleHealthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a telehealth service name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  website: {
    type: String,
    required: [true, 'Please add a website URL']
  },
  services: {
    type: [String],
    required: [true, 'Please add at least one service']
  },
  logo: {
    type: String
  },
  contactInfo: {
    phone: String,
    email: String,
    supportHours: String
  },
  specialties: {
    type: [String]
  },
  consultationFees: {
    general: Number,
    specialist: Number
  },
  insuranceAccepted: {
    type: Boolean,
    default: false
  },
  acceptedInsuranceProviders: {
    type: [String]
  },
  availableHours: {
    is24Hours: {
      type: Boolean,
      default: false
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
  ratings: {
    average: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    count: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TeleHealth', TeleHealthSchema);
