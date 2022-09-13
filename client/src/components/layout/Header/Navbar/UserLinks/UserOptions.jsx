import React, { Fragment, useState } from "react";
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import { ExitToApp, ListAlt, Person, Dashboard } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../state/actions/userActions";
import { useAlert } from "react-alert";
import "./UserOptions.css";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAlt />, name: "Orders", func: orders },
    { icon: <Person />, name: "Profile", func: account },
    { icon: <ExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (user && user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    // console.log("user", user);
    if (user) {
      navigate("/admin/dashboard");
    }
  }

  function orders() {
    // console.log("user", user);
    if (user) {
      navigate("/orders");
    }
  }

  function account() {
    // console.log("user", user);
    if (user) {
      navigate("/account");
    }
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} />
      <div className="speedDialContainer">
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          direction="down"
          className="speedDial"
          icon={
            <img
              className="speedDialIcon"
              src={user && user.avatar && user.avatar.url}
              alt="Profile"
            />
          }
        >
          {options.map((item, index) => {
            return (
              <SpeedDialAction
                key={index}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
              />
            );
          })}
        </SpeedDial>
      </div>
    </Fragment>
  );
};

export default UserOptions;
