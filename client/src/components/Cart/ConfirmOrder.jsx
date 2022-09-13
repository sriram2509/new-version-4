import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Marginer } from "../User/AccountBox/marginer/Marginer";
import Metadata from "../layout/Metadata";
import CheckOutSteps from "./CheckOutSteps.jsx";
import { useNavigate, Link } from "react-router-dom";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  // const cartItems = [
  //   {
  //     quantity: 10,
  //     price: 100,
  //     product: "mobile",
  //     image:
  //       "https://cdnd.lystit.com/photos/2013/09/12/hm-dark-green-corduroy-shirt-product-1-13401475-300926687.jpeg",
  //     name: "redmi",
  //   },
  //   {
  //     quantity: 5,
  //     price: 300,
  //     product: "laptop",
  //     image:
  //       "https://cdnd.lystit.com/photos/2013/09/12/hm-dark-green-corduroy-shirt-product-1-13401475-300926687.jpeg",
  //     name: "hp",
  //   },
  //   {
  //     quantity: 6,
  //     price: 700,
  //     product: "shirt",
  //     image:
  //       "https://cdnd.lystit.com/photos/2013/09/12/hm-dark-green-corduroy-shirt-product-1-13401475-300926687.jpeg",
  //     name: "Levi's",
  //   },
  //   {
  //     quantity: 6,
  //     price: 700,
  //     product: "shirt",
  //     image:
  //       "https://cdnd.lystit.com/photos/2013/09/12/hm-dark-green-corduroy-shirt-product-1-13401475-300926687.jpeg",
  //     name: "Levi's",
  //   },
  // ];

  // const shippingInfo = {
  //   address: "sangram chowk",
  //   city: "bhilai",
  //   state: "chhattisgarh",
  //   country: "India",
  //   pincode: 490023,
  //   phoneNo: 7987247451,
  // };

  // const user = {
  //   name: "Sagar",
  // };

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}`;

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );

  const shippingCharges = subTotal > 1000 ? 0 : 200;

  // const tax = subTotal * 0.18;

  const totalPrice = subTotal + shippingCharges;

  const proceedToPaymentFunc = () => {
    const data = {
      subTotal,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>
      <Metadata title="Confirm Order" />
      <Marginer directibanner on="vertical" margin="1.25em" />
      <CheckOutSteps activeStep={1} />
      <Marginer direction="vertical" margin="2em" />
      <div className="confirmOrderContainer">
        <div className="leftCol">
          <div className="confirmShippingDetailsContainer">
            <h2>Shipping Info</h2>
            <div className="confirmShippingDetailsBox">
              <div className="name">
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div className="phone">
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div className="address">
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirmCartItemsContainer">
            <h2>Cart Item</h2>
            <div className="confirmCartItemsBox">
              {cartItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <span>
                    {item.quantity} x LKR {item.price} =
                    <b> LKR {item.quantity * item.price}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="rightCol">
          <div className="orderSummaryContainer">
            <h2>Order Summary</h2>
            <div className="orderSummaryBox">
              <div className="subTotal">
                <p>SubTotal</p>
                <span>LKR {subTotal}</span>
              </div>
              <div className="shippingCharges">
                <p>Delivary Charges</p>
                <span>LKR {shippingCharges}</span>
              </div>
              {/* <div className="tax">
                <p>
                  GST <small>(18% of subTotal)</small>{" "}
                </p>
                <span>{tax}</span>
              </div> */}
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>LKR {totalPrice}</span>
            </div>
            <div className="paymentButton">
              <button onClick={proceedToPaymentFunc}>Proceed to Payment</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
