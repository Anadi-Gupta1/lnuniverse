const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');
const geocoder = require('../utils/geocoder');

// @desc    Get all hospitals
// @route   GET /api/hospitals
// @access  Public
exports.getHospitals = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Hospital.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Hospital.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const hospitals = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: hospitals.length,
      pagination,
      data: hospitals
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single hospital
// @route   GET /api/hospitals/:id
// @access  Public
exports.getHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }

    res.status(200).json({
      success: true,
      data: hospital
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new hospital
// @route   POST /api/hospitals
// @access  Private/Admin
exports.createHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.create(req.body);

    res.status(201).json({
      success: true,
      data: hospital
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update hospital
// @route   PUT /api/hospitals/:id
// @access  Private/Admin
exports.updateHospital = async (req, res, next) => {
  try {
    let hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }

    hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: hospital
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete hospital
// @route   DELETE /api/hospitals/:id
// @access  Private/Admin
exports.deleteHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }

    // Check if there are any doctors associated with this hospital
    const doctors = await Doctor.find({ hospital: req.params.id });
    if (doctors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete hospital with associated doctors'
      });
    }

    await hospital.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get hospital statistics
// @route   GET /api/hospitals/:id/stats
// @access  Private/Admin
exports.getHospitalStats = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }

    const doctorCount = await Doctor.countDocuments({ hospital: req.params.id });
    const averageRating = hospital.rating;
    const reviewCount = hospital.reviews.length;

    res.status(200).json({
      success: true,
      data: {
        doctorCount,
        averageRating,
        reviewCount,
        facilities: hospital.facilities.length,
        departments: hospital.departments.length
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get hospitals within a radius
// @route   GET /api/hospitals/radius/:zipcode/:distance
// @access  Public
exports.getHospitalsInRadius = async (req, res, next) => {
  try {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 6378;

    const hospitals = await Hospital.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius]
        }
      }
    });

    res.status(200).json({
      success: true,
      count: hospitals.length,
      data: hospitals
    });
  } catch (err) {
    next(err);
  }
};
