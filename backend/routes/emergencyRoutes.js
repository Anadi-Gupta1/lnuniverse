const express = require('express');
const {
  getEmergencyServices,
  getEmergencyService,
  createEmergencyService,
  updateEmergencyService,
  deleteEmergencyService,
  getEmergencyServicesByType,
  getNearestEmergencyServices
} = require('../controllers/emergencyController');

const router = express.Router();

// Import middleware
const { protect, authorize } = require('../middleware/auth');

router.route('/type/:type').get(getEmergencyServicesByType);
router.route('/nearest').get(getNearestEmergencyServices);

router
  .route('/')
  .get(getEmergencyServices)
  .post(protect, authorize('admin'), createEmergencyService);

router
  .route('/:id')
  .get(getEmergencyService)
  .put(protect, authorize('admin'), updateEmergencyService)
  .delete(protect, authorize('admin'), deleteEmergencyService);

module.exports = router;
