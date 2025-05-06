const mongoose = require('mongoose');

const NutritionTipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
    maxlength: [1000, 'Content cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  source: {
    type: String
  },
  image: {
    type: String
  },
  tags: {
    type: [String]
  },
  relevantTo: {
    ageGroups: [String], // e.g., ["Children", "Adults", "Seniors"]
    medicalConditions: [String], // e.g., ["Diabetes", "Hypertension"]
    dietaryPreferences: [String] // e.g., ["Vegetarian", "Vegan", "Gluten-Free"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('NutritionTip', NutritionTipSchema);
