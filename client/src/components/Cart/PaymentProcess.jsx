import { Fragment, useEffect, useRef } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Event, VpnKey, CreditCard } from "@mui/icons-material";
import CheckOutSteps from "./CheckOutSteps.jsx";
import "./PaymentProcess.css";
import { Marginer } from "../User/AccountBox/marginer/Marginer";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../state/actions/orderAction";

const PaymentProcess = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo: shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("shipping info", shippingInfo);
    console.log("cart items", cartItems);

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/process/payment",
        paymentData,
        config,
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disable = false;
        console.log("result error message", result.error.message);
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // paymentInfo is added to the order object
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          console.log("order", order);
          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There is some issue while processing the payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log("error", error);
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <Metadata title={"Payment"} />
      <Marginer direction="vertical" margin="1.25em" />
      <CheckOutSteps activeStep={2} />
      <Marginer direction="vertical" margin="2em" />
      <div className="heading">
        <h1>PayNow</h1>
      </div>
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            ref={payBtn}
            value={`Pay - LKR ${orderInfo && orderInfo.totalPrice}`}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default PaymentProcess;
