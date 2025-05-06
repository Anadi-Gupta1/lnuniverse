const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByCategory,
  getEventsInRadius,
  getFitnessEventsInRadius
} = require('../controllers/eventController');

const router = express.Router();

// Import middleware
const { protect, authorize } = require('../middleware/auth');

router.route('/fitness/radius/:zipcode/:distance').get(getFitnessEventsInRadius);
router.route('/radius/:zipcode/:distance').get(getEventsInRadius);
router.route('/category/:category').get(getEventsByCategory);

router
  .route('/')
  .get(getEvents)
  .post(protect, authorize('admin'), createEvent);

router
  .route('/:id')
  .get(getEvent)
  .put(protect, authorize('admin'), updateEvent)
  .delete(protect, authorize('admin'), deleteEvent);

module.exports = router;
