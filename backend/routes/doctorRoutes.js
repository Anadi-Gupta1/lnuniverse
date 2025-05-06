const express = require('express');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getHospitalDoctors
} = require('../controllers/doctorController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Get doctors by hospital - must be defined before dynamic ID route
router.get('/hospital/:hospitalId', getHospitalDoctors);

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctor);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), createDoctor);
router.put('/:id', protect, authorize('admin'), updateDoctor);
router.delete('/:id', protect, authorize('admin'), deleteDoctor);

module.exports = router;
