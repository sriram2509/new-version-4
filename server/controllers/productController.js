import productModel from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import asyncMiddleware from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import Product from "../models/productModel.js";
import cloudinary from "cloudinary";

// CREATE A PRODUCT -- ADMIN
const createProduct = asyncMiddleware(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "avatars",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await productModel.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});
// createProduct().catch((err) => console.log("error in createProduct...............",err))

// GET ALL PRODUCTS
const getAllProducts = asyncMiddleware(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await productModel.countDocuments();

  const apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  const filteredProductsCount = products.length;

  apiFeatures.pagination(resultPerPage);

  products = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});
// getAllProducts().catch((err) => console.log("error in getAllProducts.....", err))

// GET ALL PRODUCTS -- ADMIN
const getAllProductsAdmin = asyncMiddleware(async (req, res, next) => {
  const products = await productModel.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// GET SINGLE PRODUCT DETAILS -- ADMIN
const getProductDetails = asyncMiddleware(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// UPDATE A PRODUCT -- ADMIN
const updateProduct = asyncMiddleware(async (req, res, next) => {
  let product = productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Images will be updated
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // After deleting the product from the application we have to delete the images used for that product also to prevent unnecessary image stored
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    // uploading the new selected images to cloudinary
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "avatars",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// DELETE PRODUCT -- ADMIN
const deleteProduct = asyncMiddleware(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // After deleting the product from the application we have to delete the images used for that product also to prevent unnecessary image stored
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// CREATE NEW REVIEW or UPDATE THE REVIEW
const createProductReview = asyncMiddleware(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(
      new ErrorHandler(`Product not found by productId: ${productId}`, 404),
    );
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString(),
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Calculating average
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// GET ALL REVIEWS OF A SINGLE PRODUCT
const getProductReviews = asyncMiddleware(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// DELETE REVIEW
const deleteReview = asyncMiddleware(async (req, res, next) => {
  const product = await Product.findById(req.query.productId); //product Id

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  //reviews we want to keep
  const reviews = product.reviews.filter(
    (rev) => rev.id.toString() !== req.query.id.toString(),
  ); // here id is the id of a particaular review

  // Calculating average
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    },
  );

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAllProductsAdmin,
};
