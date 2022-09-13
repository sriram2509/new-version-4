import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Metadata from "../layout/Metadata";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  // useHistory is replaced by useNavigate so we don't need history.push(`/products/${keyword}`) we can use navigate(`/products/${keyword}`) now...

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Fragment>
      <Metadata title="Search - Ricey" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Meal......"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </Fragment>
  );
};

export default Search;
