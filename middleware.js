const Campground = require('./models/campground');
const Review = require('./models/review');
const {campgroundSchema, reviewSchema} = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');

// User Middleware
module.exports.isLoggedIn = (req,res,next) => {
  console.log('req.user...',req.user)
  if(!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    req.flash('error','you must be signed in to view this page')
    return res.redirect('/login')
  }
  next();
}
// Campground Middleware
module.exports.validateCampground = (req,res,next) => {
  const {error} = campgroundSchema.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}

module.exports.campgroundExists = catchAsync(async (req,res,next) => {
  const {  id  } = req.params;
  const campground = await Campground.findById(id);
  if(!campground){
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
  }
  next();
})

module.exports.isCampgroundAuthor = catchAsync(async (req,res,next) => {
  const {id} = req.params;
  const campground = await Campground.findById(id)
  if(!campground.author.equals(req.user.id)) {
    req.flash('error', 'You do not have permission to do that');
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
})

module.exports.isReviewAuthor = catchAsync(async (req,res,next) => {
  const {id,reviewId} = req.params;
  const review = await Review.findById(reviewId)
  if(!review.author.equals(req.user.id)) {
    req.flash('error', 'You do not have permission to do that');
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
})

// Review middleware
module.exports.validateReview = (req,res,next) => {
  const {error} = reviewSchema.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg,400)
  } else {
    next()
  }
}
