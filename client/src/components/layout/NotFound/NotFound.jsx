import React from "react";
import { Error } from "@mui/icons-material";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <Error />

      <p>Page Not Found </p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
