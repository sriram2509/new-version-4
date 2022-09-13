import { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AllProductReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllProductReviews,
  deleteProductReviews,
} from "../../state/actions/productActions";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/Metadata";
import { Delete, Star } from "@mui/icons-material";
import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../state/constants/productConstants";

const AllProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, reviews, loading } = useSelector(
    (state) => state.allProductReviews,
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review,
  );

  const [productId, setProductId] = useState("");

  const deleteProductReviewHandler = (reviewId) => {
    dispatch(deleteProductReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllProductReviews(productId));
  };

  useEffect(() => {
    // if (productId.length === 24) {
    //   dispatch(getAllProductReviews(productId));
    // }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      type: "number",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteProductReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboardPage">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {/* {reviews && reviews.length > 0 ? ( */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
          {/* ) : (
            <h1 className="noProductReviewsHeading">No Reviews Found</h1>
          )} */}
        </div>
      </div>
    </Fragment>
  );
};

export default AllProductReviews;
