import { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { myOrders, clearErrors } from "../../state/actions/orderAction";
import Metadata from "../layout/Metadata";
import "./MyOrders.css";
import { DataGrid } from "@mui/x-data-grid";
import { Launch } from "@mui/icons-material";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { orders, error } = useSelector((state) => state.myOrders);

  const firstName = user && user.name && user.name.split(" ")[0];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/details/${params.getValue(params.id, "id")}`}>
            <Launch />
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(myOrders());
  }, [alert, dispatch, error]);

  return (
    <Fragment>
      <Metadata title={`${firstName}  Orders`} />

      <div className="ordersHeading">
        <h1>{firstName}`s Orders</h1>
      </div>
      <div className="myOrdersContainer">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          className="myOrdersTable"
          autoHeight
        />
      </div>
    </Fragment>
  );
};

export default MyOrders;
