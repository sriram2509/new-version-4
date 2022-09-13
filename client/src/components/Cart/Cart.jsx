import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeCartItem,
} from "../../state/actions/cartActions";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // const item = {
  //   product: "productId",
  //   price: 100,
  //   name: "sagar is a good boy",
  //   quantity: 1,
  //   image:
  //     "https://cdnd.lystit.com/photos/2013/09/12/hm-dark-green-corduroy-shirt-product-1-13401475-300926687.jpeg",
  // };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const getSubTotal = (quantity, price) => {
    const subTotalPrice = quantity * price;
    return subTotalPrice;
  };

  const deleteCartItem = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  // checkout  function
  // const checkOutHandler = () => {
  //   if (cartItems.length === 0) {
  //     alert("Your cart is empty");
  //     return;
  //   }

  //   if (isAuthenticated) {
  //     navigate("/shipping");
  //   } else {
  //     navigate("/login");
  //   }
  // };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCartContainer">
          <MdRemoveShoppingCart />
          <p>No Menu in your Cart</p>
          <Link to="/products">View Menu</Link>
        </div>
      ) : (
        <Fragment>
          <div className="heading">
            <h1>Cart Items</h1>
          </div>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Menu</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>

            {cartItems &&
              cartItems.map((item, index) => (
                <div className="cartItemCardContainer" key={item.product}>
                  <CartItemCard
                    item={item}
                    decreaseQty={decreaseQty}
                    increaseQty={increaseQty}
                    getSubTotal={getSubTotal}
                    deleteCartItem={deleteCartItem}
                  />
                  {/* for the partition between the cart items */}
                  {cartItems.length > index + 1 && <hr />}
                </div>
              ))}
            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalContainer">
                <div className="cartGrossTotalBox">
                  <p>Total</p>
                  <p>{`LKR ${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0,
                  )}`}</p>
                </div>
                <div className="checkOutBox">
                  <button className="checkOutBtn" onClick={checkOutHandler}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
