import { Fragment, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import Metadata from "../layout/Metadata";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading === true ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${user && user.name}'s Profile`} />
        <div className="box">
          <div className="container">
            <div className="heading">
              <h1>My Profile</h1>
            </div>
            <div className="profile-container">
              <div className="left-col">
                <img src={user.avatar && user.avatar.url} alt={user.name} />
                <Link to="/me/update">
                  <FaUserEdit />
                  <div> Edit Profile</div>
                </Link>
                <div className="other">
                  <Link to="/orders" style={{textDecoration:"none",color:'white'}}> My Orders</Link>
                </div>
                <div className="other">
                  <Link to="/password/update" style={{textDecoration:"none",color:'white'}}>Update Password</Link>
                </div>
              </div>
              <div className="right-col">
                <div className="full-name">
                  <h4>Full Name</h4>
                  <h1>{user.name}</h1>
                </div>
                <div className="email">
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
                <div className="PhoneNo">
                  <h4>Phone No</h4>
                  <p>{user.PhoneNo}</p>
                </div>
                <div className="join-date">
                  <h4>Joined on</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>
                <div className="other-links">
                  {/* <Link to="/orders"> My Orders</Link> */}
                  {/* <Link to="/password/update">Update Password</Link> */}
                </div>
              </div>
            </div>
          </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
