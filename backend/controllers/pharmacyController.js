const Pharmacy = require('../models/Pharmacy');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');

// @desc    Get all pharmacies
// @route   GET /api/pharmacies
// @access  Public
exports.getPharmacies = asyncHandler(async (req, res, next) => {
  const pharmacies = await Pharmacy.find();
  res.status(200).json({
    success: true,
    count: pharmacies.length,
    data: pharmacies
  });
});

// @desc    Get single pharmacy
// @route   GET /api/pharmacies/:id
// @access  Public
exports.getPharmacy = asyncHandler(async (req, res, next) => {
  const pharmacy = await Pharmacy.findById(req.params.id);

  if (!pharmacy) {
    return next(
      new ErrorResponse(`Pharmacy not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: pharmacy
  });
});

// @desc    Create new pharmacy
// @route   POST /api/pharmacies
// @access  Private/Admin
exports.createPharmacy = asyncHandler(async (req, res, next) => {
  const pharmacy = await Pharmacy.create(req.body);
  res.status(201).json({
    success: true,
    data: pharmacy
  });
});

// @desc    Update pharmacy
// @route   PUT /api/pharmacies/:id
// @access  Private/Admin
exports.updatePharmacy = asyncHandler(async (req, res, next) => {
  let pharmacy = await Pharmacy.findById(req.params.id);

  if (!pharmacy) {
    return next(
      new ErrorResponse(`Pharmacy not found with id of ${req.params.id}`, 404)
    );
  }

  pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: pharmacy
  });
});

// @desc    Delete pharmacy
// @route   DELETE /api/pharmacies/:id
// @access  Private/Admin
exports.deletePharmacy = asyncHandler(async (req, res, next) => {
  const pharmacy = await Pharmacy.findById(req.params.id);

  if (!pharmacy) {
    return next(
      new ErrorResponse(`Pharmacy not found with id of ${req.params.id}`, 404)
    );
  }

  await pharmacy.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add medication to pharmacy
// @route   POST /api/pharmacies/:id/medications
// @access  Private/Admin
exports.addMedication = asyncHandler(async (req, res, next) => {
  const pharmacy = await Pharmacy.findById(req.params.id);

  if (!pharmacy) {
    return next(
      new ErrorResponse(`Pharmacy not found with id of ${req.params.id}`, 404)
    );
  }

  pharmacy.medications.push(req.body);
  await pharmacy.save();

  res.status(200).json({
    success: true,
    data: pharmacy
  });
});

// @desc    Update medication in pharmacy
// @route   PUT /api/pharmacies/:id/medications/:medicationId
// @access  Private/Admin
exports.updateMedication = asyncHandler(async (req, res, next) => {
  const pharmacy = await Pharmacy.findById(req.params.id);

  if (!pharmacy) {
    return next(
      new ErrorResponse(`Pharmacy not found with id of ${req.params.id}`, 404)
    );
  }

  const medication = pharmacy.medications.id(req.params.medicationId);

  if (!medication) {
    return next(
      new ErrorResponse(`Medication not found with id of ${req.params.medicationId}`, 404)
    );
  }

  Object.assign(medication, req.body);
  await pharmacy.save();

  res.status(200).json({
    success: true,
    data: pharmacy
  });
});

// @desc    Delete medication from pharmacy
// @route   DELETE /api/pharmacies/:id/medications/:medicationId
// @access  Private/Admin
exports.deleteMedication = asyncHandler(async (req, res, next) => {
  const pharmacy = await Pharmacy.findById(req.params.id);

  if (!pharmacy) {
    return next(
      new ErrorResponse(`Pharmacy not found with id of ${req.params.id}`, 404)
    );
  }

  pharmacy.medications.pull(req.params.medicationId);
  await pharmacy.save();

  res.status(200).json({
    success: true,
    data: pharmacy
  });
});

// @desc    Add review to pharmacy
// @route   POST /api/pharmacies/:id/reviews
// @access  Private
exports.addReview = asyncHandler(async (req, res, next) => {
  const pharmacy = await Pharmacy.findById(req.params.id);

  if (!pharmacy) {
    return next(
      new ErrorResponse(`Pharmacy not found with id of ${req.params.id}`, 404)
    );
  }

  // Add user to req.body
  req.body.user = req.user.id;

  pharmacy.reviews.push(req.body);
  await pharmacy.save();

  // Update pharmacy rating
  const avgRating = pharmacy.reviews.reduce((acc, item) => item.rating + acc, 0) / 
    pharmacy.reviews.length;
  pharmacy.rating = avgRating;
  await pharmacy.save();

  res.status(200).json({
    success: true,
    data: pharmacy
  });
});

// @desc    Search pharmacies
// @route   GET /api/pharmacies/search
// @access  Public
exports.searchPharmacies = asyncHandler(async (req, res, next) => {
  const { name, city, medication, is24Hours, deliveryAvailable } = req.query;
  let query = {};

  if (name) {
    query.name = { $regex: name, $options: 'i' };
  }

  if (city) {
    query['address.city'] = { $regex: city, $options: 'i' };
  }

  if (medication) {
    query['medications.name'] = { $regex: medication, $options: 'i' };
  }

  if (is24Hours) {
    query.is24Hours = is24Hours === 'true';
  }

  if (deliveryAvailable) {
    query.deliveryAvailable = deliveryAvailable === 'true';
  }

  const pharmacies = await Pharmacy.find(query);

  res.status(200).json({
    success: true,
    count: pharmacies.length,
    data: pharmacies
  });
});

// @desc    Get pharmacies within a radius
// @route   GET /api/pharmacies/radius/:zipcode/:distance
// @access  Public
exports.getPharmaciesInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 6378;

  const pharmacies = await Pharmacy.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius]
      }
    }
  });

  res.status(200).json({
    success: true,
    count: pharmacies.length,
    data: pharmacies
  });
});
