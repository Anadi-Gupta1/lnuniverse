const express = require('express');
const {
  getNutritionTips,
  getNutritionTip,
  createNutritionTip,
  updateNutritionTip,
  deleteNutritionTip,
  getNutritionTipsByCategory,
  getNutritionTipsByCondition
} = require('../controllers/nutritionController');

const router = express.Router();

// Import middleware
const { protect, authorize } = require('../middleware/auth');

router.route('/category/:category').get(getNutritionTipsByCategory);
router.route('/conditions/:condition').get(getNutritionTipsByCondition);

router
  .route('/')
  .get(getNutritionTips)
  .post(protect, authorize('admin'), createNutritionTip);

router
  .route('/:id')
  .get(getNutritionTip)
  .put(protect, authorize('admin'), updateNutritionTip)
  .delete(protect, authorize('admin'), deleteNutritionTip);

module.exports = router;
