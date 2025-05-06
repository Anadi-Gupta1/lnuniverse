const Emergency = require('../models/Emergency');

// @desc    Get all emergency services
// @route   GET /api/emergency
// @access  Public
exports.getEmergencyServices = async (req, res, next) => {
  try {
    const emergencyServices = await Emergency.find();

    res.status(200).json({
      success: true,
      count: emergencyServices.length,
      data: emergencyServices
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single emergency service
// @route   GET /api/emergency/:id
// @access  Public
exports.getEmergencyService = async (req, res, next) => {
  try {
    const service = await Emergency.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Emergency service not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new emergency service
// @route   POST /api/emergency
// @access  Private/Admin
exports.createEmergencyService = async (req, res, next) => {
  try {
    const service = await Emergency.create(req.body);

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update emergency service
// @route   PUT /api/emergency/:id
// @access  Private/Admin
exports.updateEmergencyService = async (req, res, next) => {
  try {
    const service = await Emergency.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Emergency service not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete emergency service
// @route   DELETE /api/emergency/:id
// @access  Private/Admin
exports.deleteEmergencyService = async (req, res, next) => {
  try {
    const service = await Emergency.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Emergency service not found with id of ${req.params.id}`
      });
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get emergency services by type
// @route   GET /api/emergency/type/:type
// @access  Public
exports.getEmergencyServicesByType = async (req, res, next) => {
  try {
    const services = await Emergency.find({ type: req.params.type });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get nearest emergency services
// @route   GET /api/emergency/nearest
// @access  Public
exports.getNearestEmergencyServices = async (req, res, next) => {
  try {
    const { latitude, longitude, type, maxDistance = 10000 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude coordinates'
      });
    }

    // Convert coordinates to numbers
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    // Find emergency services within specified radius (default 10km)
    let query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    };

    // Add type filter if provided
    if (type) {
      query.type = type;
    }

    // Find services
    const services = await Emergency.find(query).limit(5);

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (err) {
    next(err);
  }
};
