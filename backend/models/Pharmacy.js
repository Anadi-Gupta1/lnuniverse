const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a pharmacy name'],
    trim: true
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please add street address']
    },
    city: {
      type: String,
      required: [true, 'Please add city']
    },
    state: {
      type: String,
      required: [true, 'Please add state']
    },
    zipCode: {
      type: String,
      required: [true, 'Please add zip code']
    }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    }
  },
  contactInfo: {
    phone: {
      type: String,
      required: [true, 'Please add phone number']
    },
    email: {
      type: String,
      required: [true, 'Please add email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    }
  },
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  services: [{
    type: String
  }],
  medications: [{
    name: {
      type: String,
      required: true
    },
    genericName: String,
    manufacturer: String,
    category: String,
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    prescriptionRequired: {
      type: Boolean,
      default: false
    }
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  is24Hours: {
    type: Boolean,
    default: false
  },
  deliveryAvailable: {
    type: Boolean,
    default: false
  },
  deliveryRadius: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index for location-based queries
pharmacySchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model('Pharmacy', pharmacySchema);
