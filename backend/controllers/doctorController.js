const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Hospital = require('../models/Hospital');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res, next) => {
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
    query = Doctor.find(JSON.parse(queryStr)).populate({
      path: 'user',
      select: 'name email phone'
    }).populate({
      path: 'hospital',
      select: 'name address'
    });

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
    const total = await Doctor.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const doctors = await query;

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
      count: doctors.length,
      pagination,
      data: doctors
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email phone'
      })
      .populate({
        path: 'hospital',
        select: 'name address'
      });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new doctor
// @route   POST /api/doctors
// @access  Private/Admin
exports.createDoctor = async (req, res, next) => {
  try {
    // Create user account for doctor
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      role: 'doctor'
    });

    // Create doctor profile
    const doctor = await Doctor.create({
      user: user._id,
      specialization: req.body.specialization,
      licenseNumber: req.body.licenseNumber,
      experience: req.body.experience,
      hospital: req.body.hospital,
      availability: req.body.availability,
      consultationFee: req.body.consultationFee
    });

    res.status(201).json({
      success: true,
      data: doctor
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
exports.updateDoctor = async (req, res, next) => {
  try {
    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Update user details if provided
    if (req.body.name || req.body.email || req.body.phone || req.body.address) {
      await User.findByIdAndUpdate(doctor.user, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
      }, {
        new: true,
        runValidators: true
      });
    }

    // Update doctor details
    doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Get user ID before deleting doctor
    const userId = doctor.user;

    // Delete doctor profile first
    await doctor.deleteOne();

    // Check if user exists before trying to delete
    const user = await User.findById(userId);
    if (user) {
      await user.deleteOne();
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get doctors by hospital
// @route   GET /api/hospitals/:hospitalId/doctors
// @access  Public
exports.getHospitalDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ hospital: req.params.hospitalId });

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (err) {
    next(err);
  }
};
