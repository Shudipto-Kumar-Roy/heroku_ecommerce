const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandeler = require("../utils/errorhandeler");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Create new product (--Admin)
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  }
  else {
    images = req.body.images;
  }

  const imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products"
    })

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url
    })
  }

  req.body.user = req.user._id;
  req.body.images = imagesLink;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product: product,
  });
});

// Get all products admin
exports.getAllAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    message: "Product gets successfully",
    products: products,
  });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8; // for items to show per page
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search() // for search
    .filter() // for filter category
    .pagination(resultPerPage); // for pagination
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    message: "Product gets successfully",
    products: products,
    productCount: productCount,
    resultPerPage: resultPerPage,
  });
});

// Update Product (--Admin)
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandeler("Product not found", 404));
  }

  // Images starts here
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  }
  else {
    images = req.body.images;
  }

  if (images !== undefined) {

    // Removing images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }


    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products"
      })

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url
      })
    }
    req.body.images = imagesLink;
  }

  
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
    product: product,
  });
});

// Delete Product (--Admin)
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandeler("Product not found", 404));
  }

  // Removing images from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
    product: product,
  });
});

// Get single product
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandeler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product get successfully",
    product: product,
  });
});

// create new review or update review
exports.createProductReviewController = catchAsyncErrors(
  async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
    };

    const product = await Product.findById(productId);

    const isReviwed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (isReviwed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.rating = rating;
          review.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let averageRating = 0;
    product.reviews.forEach((review) => {
      averageRating += review.rating;
    });

    product.ratings = averageRating / product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Reveiw added Successfully",
    });
  }
);

// get all reviews of a single product
exports.getProductReviewsController = catchAsyncErrors(
  async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
      return next(new Errorhandeler("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
);

// delete product review
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new Errorhandeler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  // updating rating
  let averageRating = 0;
  reviews.forEach((review) => {
    averageRating += review.rating;
  });
  
  let ratings = 0;
  if(reviews.length===0)
  {
    ratings = 0
  }
  else{
   ratings = averageRating / reviews.length;
  }
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews: reviews,
      ratings: ratings,
      numOfReviews: numOfReviews,
    },
    { new: true }
  );

  res
    .status(200)
    .json({ success: true, message: "Review deleted successfully" });
});
