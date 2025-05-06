const express = require('express');
const {
  getPharmacies,
  getPharmacy,
  createPharmacy,
  updatePharmacy,
  deletePharmacy,
  addMedication,
  updateMedication,
  deleteMedication,
  addReview,
  searchPharmacies,
  getPharmaciesInRadius
} = require('../controllers/pharmacyController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/radius/:zipcode/:distance', getPharmaciesInRadius);
router.get('/search', searchPharmacies);
router.get('/', getPharmacies);
router.get('/:id', getPharmacy);

// Protected routes
router.post('/:id/reviews', protect, addReview);

// Admin only routes
router.post('/', protect, authorize('admin'), createPharmacy);
router.put('/:id', protect, authorize('admin'), updatePharmacy);
router.delete('/:id', protect, authorize('admin'), deletePharmacy);
router.post('/:id/medications', protect, authorize('admin'), addMedication);
router.put('/:id/medications/:medicationId', protect, authorize('admin'), updateMedication);
router.delete('/:id/medications/:medicationId', protect, authorize('admin'), deleteMedication);

module.exports = router;
