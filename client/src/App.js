import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Products from "./components/Product/Products.jsx";
import Search from "./components/Product/Search.jsx";
import AccountBox from "./components/User/AccountBox/AccountBox";
import store from "./state/store";
import { loadUser } from "./state/actions/userActions";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Contact from "./components/layout/Contact/Contact";
import ProtectedRoute from "./components/Route/ProtectedRoute.jsx";
import Profile from "./components/User/Profile.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import ForgotPassword from "./components/User/ForgotPassword.jsx";
import ResetPassword from "./components/User/ResetPassword.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import PaymentProcess from "./components/Cart/PaymentProcess.jsx";
import OrderSuccess from "./components/Cart/OrderSuccess.jsx";
import MyOrders from "./components/Order/MyOrders.jsx";
import OrderDetails from "./components/Order/OrderDetails.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import AllProductsList from "./components/Admin/AllProductsList.jsx";
import NewProduct from "./components/Admin/NewProduct.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct.jsx";
import OrderList from "./components/Admin/OrderList.jsx";
import UpdateOrderProcess from "./components/Admin/UpdateOrderProcess.jsx";
import UsersList from "./components/Admin/UsersList.jsx";
import UpdateUser from "./components/Admin/UpdateUser.jsx";
import AllProductReviews from "./components/Admin/AllProductReviews.jsx";
import NotFound from "./components/layout/NotFound/NotFound";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/product/:id" element={<ProductDetails />} />

        <Route exact path="/products" element={<Products />} />

        <Route exact path="/contact" element={<Contact />} />

        <Route exact path="/search" element={<Search />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/shipping" element={<Shipping />} />

        <Route path="/order/confirm" element={<ConfirmOrder />} />

        {/* <ProtectedRoute exact path="/account" component={Profile} /> */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PaymentProcess />
              </Elements>
            }
          />
        )}
        {/* Login and sign up box experimental */}

        <Route exact path="/login" element={<AccountBox />} />

        {/* <Route exact path="/account" element={<Profile />} /> */}

        <Route exact path="/me/update" element={<UpdateProfile />} />

        <Route exact path="/password/update" element={<UpdatePassword />} />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />

        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/details/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllProductsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product/new"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateOrderProcess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <AllProductReviews />
            </ProtectedRoute>
          }
        />

        {/* Not found page will load on any other link the user lands on other than these above mentioned links */}
        <Route path="*" exact={true} element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
