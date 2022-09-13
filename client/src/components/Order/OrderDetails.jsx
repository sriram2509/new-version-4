import { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../state/actions/orderAction";
import Loader from "../layout/Loader/Loader";
import "./OrderDetails.css";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  console.log("Order", order);

  const address =
    order.shippingInfo &&
    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return (
    <Fragment>
      {loading === true ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={"Order Details"} />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h1>
                Order <span>#{order && order._id}</span>
              </h1>
              <h2>Shipping Info</h2>
              <div className="orderDetailsContainerBox">
                <div className="name">
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div className="phone">
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className="address">
                  <p>Address:</p>
                  <span>{address}</span>
                </div>
              </div>
              <h2>Payment Details</h2>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Payment Status: </p>
                  <span
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {" "}
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "Paid"
                      : "Unpaid"}
                  </span>
                </div>

                <div>
                  <p>Amount: </p>
                  <span>
                    <b>LKR{order && order.totalPrice}</b>
                    <small>(shipping charges)</small>
                  </span>
                </div>
              </div>

              <h2>Order Status</h2>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h2>Order Items:</h2>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} x LKR{item.price} =
                        <b> LKR{item.quantity * item.price}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
