const express = require('express');
const {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
  getHospitalStats,
  getHospitalsInRadius
} = require('../controllers/hospitalController');

// Include doctor routes
const doctorRouter = require('./doctorRoutes');

const router = express.Router();

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:hospitalId/doctors', doctorRouter);

// Public routes
router.get('/', getHospitals);
router.get('/:id', getHospital);
router.get('/radius/:zipcode/:distance', getHospitalsInRadius);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createHospital);
router.put('/:id', protect, authorize('admin'), updateHospital);
router.delete('/:id', protect, authorize('admin'), deleteHospital);
router.get('/:id/stats', protect, authorize('admin'), getHospitalStats);

module.exports = router;
