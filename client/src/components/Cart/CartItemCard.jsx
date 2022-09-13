import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = ({
  item,
  increaseQty,
  decreaseQty,
  getSubTotal,
  deleteCartItem,
}) => {
  return (
    <div className="cartItemCard">
      <div className="cartItemDetails">
        <img src={item.image} alt="ssa" />
        <div>
          <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`LKR ${item.price}`}</span>
          </div>
          <p onClick={() => deleteCartItem(item.product)}>Delete</p>
        </div>
      </div>
      <div className="cartItemQuantity">
        <button onClick={() => decreaseQty(item.product, item.quantity)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => increaseQty(item.product, item.quantity, item.stock)}
        >
          +
        </button>
      </div>
      <div className="cartItemSubTotalBox">
        <span>Total:</span>
        <p className="cartItemSubTotal">{`LKR ${getSubTotal(
          item.quantity,
          item.price,
        )}`}</p>
      </div>
    </div>
  );
};

export default CartItemCard;
