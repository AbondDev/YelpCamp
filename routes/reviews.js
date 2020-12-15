const express = require('express');
const router = express.Router({mergeParams: true});
// Utils
const catchAsync = require('../utils/catchAsync');
// Mongoose Models
const Campground = require('../models/campground');
const Review = require('../models/review')
// Middleware
const {validateReview,isLoggedIn,isReviewAuthor} = require('../middleware');
// Controllers
const reviews = require('../controllers/reviews')

router.post('/',isLoggedIn ,
  validateReview,
  catchAsync(reviews.createReview))

router.delete('/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview))

module.exports = router;
