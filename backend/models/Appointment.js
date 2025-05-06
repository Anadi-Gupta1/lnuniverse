const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Please add appointment date']
  },
  timeSlot: {
    startTime: {
      type: String,
      required: [true, 'Please add start time']
    },
    endTime: {
      type: String,
      required: [true, 'Please add end time']
    }
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  type: {
    type: String,
    enum: ['regular', 'emergency', 'follow-up'],
    default: 'regular'
  },
  symptoms: {
    type: String
  },
  diagnosis: {
    type: String
  },
  prescription: {
    type: String
  },
  notes: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'refunded'],
    default: 'pending'
  },
  amount: {
    type: Number,
    required: [true, 'Please add appointment amount']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
