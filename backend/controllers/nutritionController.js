const NutritionTip = require('../models/NutritionTip');

// @desc    Get all nutrition tips
// @route   GET /api/nutrition
// @access  Public
exports.getNutritionTips = async (req, res, next) => {
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
    query = NutritionTip.find(JSON.parse(queryStr));

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
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await NutritionTip.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const tips = await query;

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
      count: tips.length,
      pagination,
      data: tips
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single nutrition tip
// @route   GET /api/nutrition/:id
// @access  Public
exports.getNutritionTip = async (req, res, next) => {
  try {
    const tip = await NutritionTip.findById(req.params.id);

    if (!tip) {
      return res.status(404).json({
        success: false,
        message: `Nutrition tip not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: tip
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new nutrition tip
// @route   POST /api/nutrition
// @access  Private/Admin
exports.createNutritionTip = async (req, res, next) => {
  try {
    const tip = await NutritionTip.create(req.body);

    res.status(201).json({
      success: true,
      data: tip
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update nutrition tip
// @route   PUT /api/nutrition/:id
// @access  Private/Admin
exports.updateNutritionTip = async (req, res, next) => {
  try {
    const tip = await NutritionTip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!tip) {
      return res.status(404).json({
        success: false,
        message: `Nutrition tip not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: tip
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete nutrition tip
// @route   DELETE /api/nutrition/:id
// @access  Private/Admin
exports.deleteNutritionTip = async (req, res, next) => {
  try {
    const tip = await NutritionTip.findById(req.params.id);

    if (!tip) {
      return res.status(404).json({
        success: false,
        message: `Nutrition tip not found with id of ${req.params.id}`
      });
    }

    await tip.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get nutrition tips by category
// @route   GET /api/nutrition/category/:category
// @access  Public
exports.getNutritionTipsByCategory = async (req, res, next) => {
  try {
    const tips = await NutritionTip.find({ category: req.params.category });

    res.status(200).json({
      success: true,
      count: tips.length,
      data: tips
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get nutrition tips by medical condition
// @route   GET /api/nutrition/conditions/:condition
// @access  Public
exports.getNutritionTipsByCondition = async (req, res, next) => {
  try {
    const tips = await NutritionTip.find({ 
      'relevantTo.medicalConditions': req.params.condition 
    });

    res.status(200).json({
      success: true,
      count: tips.length,
      data: tips
    });
  } catch (err) {
    next(err);
  }
};
