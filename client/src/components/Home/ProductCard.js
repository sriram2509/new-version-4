import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    size: "small",
    value: product.ratings * 1,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <div className="productsContainer">
        <p>{product.name}</p>
        <pre className="center">{`LKR ${product.price}`}</pre>
        <div>
          <Rating {...options} />
          <span>({product.numOfReviews} Reviews)</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
