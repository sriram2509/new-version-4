import { Fragment, useState } from "react";
import { FaSearch, FaCartPlus, FaUserCircle } from "react-icons/fa";
// import { MdMenu } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import UserOptions from "./Navbar/UserLinks/UserOptions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ricey from "../../../images/ricey N W.png"
import "./Header.css";

const Header = () => {
  const { user } = useSelector((state) => state.user);

  // for displaying the badge of number of items present in the cart
  const { cartItems } = useSelector((state) => state.cart);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      {/* <Navbar /> */}

      <nav className="navbar">
        <div className="logoContainer">
          <Link to="/">
            {/* Ricey<span></span> */}
            <img src={ricey} alt="" width="120" />
          </Link>
        </div>

        <div className="pagesContainer">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Menu</Link>
            </li>
            {/* <li>
              <Link to="/contact">Contact</Link>
            </li> */}
            {/* about page will be added here.... in future */}
            {/* <li>
              <Link to="/about">About</Link>
            </li> */}
          </ul>
        </div>
            

        <div className=" userContainer">
          <ul>
            <li>
							<img alt="phone" src="https://valampuri.foodorders.lk/assets/images/phone.png" width="30" height="30" class="pb-1"/>
						</li>
            <li>
              <span class="text-white">Call now</span>
              {/* <strong class="text-white">Call us</strong>  */}
              {/* <h6 class="text-white">Call us now<a class="font1" href="tel:0772000206">0772000206</a></h6> */}
            </li>
            <li>
              <a class="font1" href="tel:0776770004" style={{textDecoration:"none"}}>0776770004</a>
            </li>
            <li>
              <Link to="/search">
                <FaSearch className="icon" />
                <span className="iconTooltip iconTooltipOne">Search</span>
              </Link>
            </li>

            <li>
              <Link to="/cart">
                <FaCartPlus className="icon" />
                {/* {console.log("cartitems length", cartItems)} */}
                {cartItems?.length > 0 && (
                  <p className="badge">{cartItems?.length}</p>
                )}
                <span className="iconTooltip iconTooltipTwo">Cart</span>
              </Link>
            </li>

            <li className="loginListItem">
              {user ? (
                <UserOptions user={user} style={{ zIndex: "10" }} />
              ) : (
                <Link to="/login">
                  <FaUserCircle className="icon" />
                  <span className="iconTooltip iconTooltipThree">Login</span>
                </Link>
              )}
            </li>

            <li className="hamburgerContainer">
              <div>
                <BiDotsVerticalRounded
                  className="icon"
                  onClick={() => setIsOpen(!isOpen)}
                />

                <div
                  className="hamburgerMenu"
                  style={{ display: isOpen ? "flex" : "none" }}
                >
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/products">Menu</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    {/* <li>
                      <Link to="/about">About</Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
