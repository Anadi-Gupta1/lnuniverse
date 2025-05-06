/**
 * Utility functions for fitness tracking
 */

/**
 * Calculate BMI (Body Mass Index)
 * @param {number} weightKg - Weight in kilograms
 * @param {number} heightCm - Height in centimeters
 * @returns {number} - BMI value
 */
const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
    throw new Error('Invalid weight or height values');
  }
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

/**
 * Get BMI category
 * @param {number} bmi - BMI value
 * @returns {string} - BMI category
 */
const getBMICategory = (bmi) => {
  if (!bmi || bmi < 0) {
    throw new Error('Invalid BMI value');
  }
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

/**
 * Calculate daily calorie needs
 * @param {number} weightKg - Weight in kilograms
 * @param {number} heightCm - Height in centimeters
 * @param {number} ageYears - Age in years
 * @param {string} gender - 'male' or 'female'
 * @param {string} activityLevel - 'sedentary', 'light', 'moderate', 'active', or 'very_active'
 * @returns {number} - Daily calorie needs
 */
const calculateCalorieNeeds = (weightKg, heightCm, ageYears, gender, activityLevel) => {
  if (!weightKg || !heightCm || !ageYears || weightKg <= 0 || heightCm <= 0 || ageYears <= 0) {
    throw new Error('Invalid weight, height, or age values');
  }
  
  if (!gender || (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female')) {
    throw new Error('Gender must be specified as "male" or "female"');
  }
  
  const validActivityLevels = ['sedentary', 'light', 'moderate', 'active', 'very_active'];
  if (!activityLevel || !validActivityLevels.includes(activityLevel)) {
    throw new Error(`Activity level must be one of: ${validActivityLevels.join(', ')}`);
  }
  
  // Harris-Benedict equation
  let bmr;
  if (gender.toLowerCase() === 'male') {
    bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageYears);
  } else {
    bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageYears);
  }

  // Activity multiplier
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Hard exercise 6-7 days/week
    very_active: 1.9 // Very hard exercise & physical job or training twice a day
  };

  return bmr * (activityMultipliers[activityLevel] || 1.2);
};

/**
 * Calculate calories burned from steps
 * @param {number} steps - Number of steps
 * @param {number} weightKg - Weight in kilograms
 * @returns {number} - Calories burned
 */
const calculateCaloriesFromSteps = (steps, weightKg) => {
  if (!steps || !weightKg || steps < 0 || weightKg <= 0) {
    throw new Error('Invalid steps or weight values');
  }
  // Average calorie burn is about 0.04 calories per step per kg of body weight
  return steps * 0.04 * weightKg;
};

/**
 * Calculate recommended water intake
 * @param {number} weightKg - Weight in kilograms
 * @param {number} activityMinutes - Minutes of physical activity
 * @returns {number} - Recommended water intake in liters
 */
const calculateWaterIntake = (weightKg, activityMinutes = 0) => {
  if (!weightKg || weightKg <= 0) {
    throw new Error('Invalid weight value');
  }
  
  if (activityMinutes < 0) {
    throw new Error('Activity minutes cannot be negative');
  }
  
  // Base recommendation: 35ml per kg of body weight
  const baseIntake = weightKg * 0.035;
  
  // Add 0.5-1L for every hour of exercise
  const activityIntake = (activityMinutes / 60) * 0.7;
  
  return baseIntake + activityIntake;
};

/**
 * Generate fitness recommendations based on user data
 * @param {Object} userData - User health data
 * @returns {Object} - Personalized recommendations
 */
const generateFitnessRecommendations = (userData) => {
  if (!userData || typeof userData !== 'object') {
    throw new Error('Invalid user data');
  }
  
  const { 
    weight, 
    height, 
    age, 
    gender, 
    activityLevel, 
    healthGoals, 
    chronicConditions 
  } = userData;

  if (!weight || !height || !age || !gender || !activityLevel) {
    throw new Error('Missing required user data fields: weight, height, age, gender, and activityLevel are required');
  }

  const bmi = calculateBMI(weight, height);
  const calorieNeeds = calculateCalorieNeeds(weight, height, age, gender, activityLevel);
  
  const recommendations = {
    dailyCalories: Math.round(calorieNeeds),
    dailyWaterIntake: calculateWaterIntake(weight),
    bmi: {
      value: bmi.toFixed(1),
      category: getBMICategory(bmi)
    },
    exerciseRecommendations: []
  };

  // Add exercise recommendations based on health goals and conditions
  if (healthGoals?.includes('weight_loss')) {
    recommendations.dailyCalories -= 500; // Caloric deficit for weight loss
    recommendations.exerciseRecommendations.push({
      type: 'cardio',
      frequency: '5 days per week',
      duration: '30-45 minutes',
      intensity: 'moderate to high'
    });
  }

  if (healthGoals?.includes('muscle_gain')) {
    recommendations.dailyCalories += 300; // Caloric surplus for muscle gain
    recommendations.exerciseRecommendations.push({
      type: 'strength training',
      frequency: '3-4 days per week',
      duration: '45-60 minutes',
      intensity: 'moderate to high'
    });
  }

  if (healthGoals?.includes('endurance')) {
    recommendations.exerciseRecommendations.push({
      type: 'endurance training',
      frequency: '3-4 days per week',
      duration: '45-60 minutes',
      intensity: 'moderate'
    });
  }

  // Adjust for chronic conditions
  if (chronicConditions?.includes('diabetes')) {
    recommendations.exerciseRecommendations.push({
      type: 'walking',
      frequency: 'daily',
      duration: '30 minutes',
      intensity: 'low to moderate'
    });
  }

  if (chronicConditions?.includes('hypertension')) {
    recommendations.exerciseRecommendations.push({
      type: 'swimming',
      frequency: '3 days per week',
      duration: '30 minutes',
      intensity: 'moderate'
    });
  }

  return recommendations;
};

module.exports = {
  calculateBMI,
  getBMICategory,
  calculateCalorieNeeds,
  calculateCaloriesFromSteps,
  calculateWaterIntake,
  generateFitnessRecommendations
};
