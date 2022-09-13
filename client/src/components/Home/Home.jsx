import React, { Fragment } from "react";
import Metadata from "../layout/Metadata";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import { clearErrors, getProduct } from "../../state/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import cart from "../../images/ricey B.png"

// const product = {
//     name: "Green Shirt",
//     images: [{url: "https://cdnd.lystit.com/photos/2013/09/12/hm-dark-green-corduroy-shirt-product-1-13401475-300926687.jpeg"}],
//     price: "LKR899",
//     _id: "sagar",
// };

const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [alert, dispatch, error]);

  return (
    <Fragment>
      <Metadata title="Ricey" />

      <div className="banner">
        <p>Welcome to </p>
        {/* <h1>Find Amazing Foods here</h1> */}
        {/* <h1 className="backgroundHeading">Find Amazing Foods here</h1> */}
        <h3>
          <img src={cart} alt="cart" width="500" />
        </h3>
        <a href="#container">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </a>
      </div>
      <div>
        menu
      </div>
      <div className="homeHeading">Our Meals</div>

      {loading === true ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container1" id="container">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
