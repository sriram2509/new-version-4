import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getCustomProduct,
} from "../../state/actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Metadata from "../layout/Metadata";

const categories = [
  "Rice",
  "Veg-Items",
  "NonVeg-Items",
  "Others",
];

const Products = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const { keyword } = useParams();

  // usestate for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // usestate for price filter
  const [price, setPrice] = useState([0, 25000]);
  // usestate for categories filter
  const [category, setCategory] = useState("");
  // usestate for ratings filter
  const [ratings, setRatings] = useState(0);

  // change handler for price filter
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  // change handler for ratings filter
  const ratingsHandler = (e, newRating) => {
    setRatings(newRating);
  };

  const {
    loading,
    products,
    productsCount,
    resultPerPage,
    error,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getCustomProduct(keyword, currentPage, price, category, ratings));
  }, [alert, dispatch, error, keyword, currentPage, price, category, ratings]);

  // filtered products count is assigned to a variable "count"
  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading === true ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Products - Ricey" />
          <h2 className="products-heading">Menu</h2>

          <div className="customProductsContainer">
            <div className="products">
              {products &&
                products.map((product) => {
                  return <ProductCard key={product._id} product={product} />;
                })}
            </div>

            {/* ----------------filter--------------------- */}

          <div className="filter">
            <div className="filterBox">
              {/* -----price filter----- */}
              
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={800}
              />
              {/* -----price filter----- */}

              {/* categories filter */}
              <div><Typography>Categories</Typography></div>
              
              <ul className="categoryBox">
                {categories.map((category) => {
                  return (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  );
                })}
              </ul>
              {/* categories filter */}

              {/* -------ratings above filter----- */}
              <fieldset>
                <Typography component="legend">Ratings above</Typography>
                <Slider
                  value={ratings}
                  onChange={ratingsHandler}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
              {/* -------ratings above filter----- */}
              
            </div>
            {/* ----------------filter--------------------- */}
          </div>
        </div>
          {/* ------Products Container */}

          {/* --------Pagination-------- */}
          {count > resultPerPage && (
            <div className="pagination-container">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={(e) => setCurrentPage(e)} // setting the currentPage here
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
          {/* --------Pagination-------- */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
