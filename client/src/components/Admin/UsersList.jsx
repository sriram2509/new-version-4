import { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AllProductsList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllUsersAdmin,
  deleteUser,
} from "../../state/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/Metadata";
import { Edit, Delete } from "@mui/icons-material";
import SideBar from "./Sidebar";
import { DELETE_USER_RESET } from "../../state/constants/userConstant";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.product);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsersAdmin());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.8 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "PhoneNo",
      headerName: "Phone No",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((item) => {
      // console.log(
      //   "Logging the product details for each item || Product list for Admin ",
      //   item,
      // );
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        PhoneNo: item.PhoneNo,
        role: item.role,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboardPage">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
