// Routing
const express = require('express');
const router = express.Router();
// File Upload
const multer = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({storage})
// Utils
const catchAsync = require('../utils/catchAsync');
// Mongoose Models
const Campground = require('../models/campground');
// Joi Schemas
const {campgroundSchema} = require('../schemas.js');
// Middleware
const middleware = require('../middleware');
//Controllers
const campgrounds = require('../controllers/campgrounds')


router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(middleware.isLoggedIn,upload.array('image'), middleware.validateCampground, catchAsync(campgrounds.createCampground))


router.get('/new',
  middleware.isLoggedIn,
  campgrounds.renderNewForm);

router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(middleware.isLoggedIn, middleware.isCampgroundAuthor,upload.array('image'), middleware.validateCampground,  catchAsync(campgrounds.updateCampground))
  .delete(middleware.isLoggedIn, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit',
  middleware.isLoggedIn,
  middleware.campgroundExists,
  middleware.isCampgroundAuthor,
  catchAsync(campgrounds.renderEditForm))





module.exports = router;
