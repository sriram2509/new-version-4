import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../state/actions/productActions";
import { useNavigate, useParams } from "react-router-dom";
import CustomImgCarousel from "../layout/CustomImgCarousel/CustomImgCarousel";
import { FaBolt, FaCartArrowDown, FaPencilAlt } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";
import { addItemsToCart } from "../../state/actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../state/constants/productConstants";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams(); //to catch the params from the url(here we are accessing the id) Note:- match.params.id is not working showing an error that " Params is undefined"

  const { product, loading, error } = useSelector(
    (state) => state.productDetails,
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview,
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  // quantity
  const [quantity, setQuantity] = useState(1);
  // review dialog is open or not
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const decreaseQuantity = () => {
    console.log("before decrease", quantity);
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const increaseQuantity = () => {
    console.log("before increase", quantity);
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
    console.log(product.stock);
  };
  // quantity

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success(`${quantity} item added to cart successfully`);
  };

  // going to cart page on Clicking the buy now button
  const buyNowHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    navigate("/cart");
  };

  // to open & close the dialog of review dialog box
  const submitReviewToggle = () => {
    if (isAuthenticated === false) {
      return navigate("/login");
    }
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  // submit the review
  const submitReviewHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setIsOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error("Error:", error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error("Error:", reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review submitted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error, reviewError, success]);

  const options = {
    size: "small",
    value: product?.ratings * 1,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      {loading === true ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${product.name} - Ricey`} />
        <div className="block">
          <div className="ProductDetails">
            <div className="productImg">
              <CustomImgCarousel productImages={product.images} />
            </div>

            
            <div className="detailsBlock">
              <div className="innerContainer">
                <div className="goBack" onClick={() => navigate(-1)}>
                  <TiArrowBack />
                  <div>Back to Menu</div>
                </div>

                {/* <div className="product-category">
                  <span className="category">{product.category}</span>
                </div> */}

                <h1>{product.name}</h1>

                <div className="additionals">
                 
                  {/* <span>Tasty</span> */}
                </div>

                <div className="reviews-container">
                  <div className="sub-reviews-container">
                    <Rating {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                  </div>
                  
                </div>

                <p className="product-stock">
                  Status :{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>

                <div className="qty-price">
                  <div className="qty">
                    <button onClick={decreaseQuantity} className="minus">
                      -
                    </button>
                    <input
                      value={quantity}
                      type="number"
                      readOnly
                      className="amount"
                    />
                    <button onClick={increaseQuantity} className="add">
                      +
                    </button>
                  </div>
                  <span className="price">{`LKR${product.price}`}</span>
                </div>

                <div className="btn-row">
                  <button
                    className="add-to-cart"
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    <FaCartArrowDown style={{ margin: "4px 0 6px" }} />
                    <div>Add to cart</div>
                  </button>
                  <button className="order" onClick={buyNowHandler}>
                    <FaBolt />
                    <div>Order now</div>
                  </button>
                </div>
                <div className="submitReview">
                    <button onClick={submitReviewToggle}>
                      <FaPencilAlt />
                      <div>Write a Review</div>
                    </button>
                  </div>
              </div>
            </div>
          </div>
          

          {/* ---------------------------- Reviews Section-------------------------------------------------  */}
          <h3 className="reviewsHeading">Reviews</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={isOpen}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Write a Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols={30}
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={submitReviewHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <div className="noReviews-container">
              <p className="noReviews">No Reviews Yet....</p>
              <div className="submitReview">
                <button onClick={submitReviewToggle}>
                  <FaPencilAlt />
                  <div>Write a Review</div>
                </button>
              </div>
            </div>
          )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
