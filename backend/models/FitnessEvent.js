const mongoose = require('mongoose');

const FitnessEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an event name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  date: {
    type: String,
    required: [true, 'Please add an event date']
  },
  location: {
    type: String,
    required: [true, 'Please add an event location']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  registrationLink: {
    type: String
  },
  image: {
    type: String,
    default: '/img/default-event.jpg'
  },
  category: {
    type: String,
    enum: ['run', 'yoga', 'sports', 'cycling', 'other'],
    required: [true, 'Please specify the event category']
  },
  organizer: {
    name: String,
    contact: String,
    website: String
  },
  eventDetails: {
    startTime: String,
    endTime: String,
    entryFee: Number,
    isRecurring: {
      type: Boolean,
      default: false
    },
    recurrencePattern: String, // e.g., "Every Sunday"
    ageRestrictions: String,
    participantLimit: Number
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index for location-based queries
FitnessEventSchema.index({ "coordinates.coordinates": "2dsphere" });

module.exports = mongoose.model('FitnessEvent', FitnessEventSchema);
