import { Fragment } from "react";
import { CheckCircle } from "@mui/icons-material";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <Fragment>
      <div className="orderSuccess">
        <CheckCircle />
        <p>Your order has been placed successfully!</p>
        <Link to="/orders">My Orders</Link>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
