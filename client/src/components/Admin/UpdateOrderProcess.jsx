import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../state/actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../state/constants/orderConstant";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import { Button } from "@mui/material";
import { AccountTree } from "@mui/icons-material";
import "./UpdateOrderProcess.css";

const UpdateOrderProcess = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const [status, setStatus] = useState("");

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const address =
    order.shippingInfo &&
    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`;

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));

    navigate("/admin/orders");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <Metadata title="Update Order Process" />

      <div className="dashboardPage">
        <Sidebar />
        {/* <Marginer direction="vertical" margin="2em" /> */}
        <div className="confirmOrderPage">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderContainer"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div className="leftCol">
                <div className="confirmShippingDetailsContainer">
                  <h2>Shipping Info</h2>
                  <div className="confirmShippingDetailsBox">
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
                      <small>(including 18% GST & shipping charges)</small>
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

                <div className="confirmCartItemsContainer">
                  <h2>Ordered Items</h2>
                  <div className="confirmCartItemsBox">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} x LKR{item.price} =
                            <b> LKR{item.quantity * item.price}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}

              <div
                className="rightCol"
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h2>Process Order</h2>

                  <div>
                    <AccountTree />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateOrderProcess;
