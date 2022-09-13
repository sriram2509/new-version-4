import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../layout/Metadata";
import Sidebar from "./Sidebar.jsx";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import { Chart } from "chart.js/auto"; // these Chart rectified all the below mentioned errors because the chart component we are using requires the functions, components or dependency available with this chart library (NOTE:- One downside it increases the build size because it also imports other component that we don't require)
// import { CategoryScale, ArcElement, LinearScale, PointElement } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { getAllProductsAdmin } from "../../state/actions/productActions";
import { getAllOrdersAdmin } from "../../state/actions/orderAction";
import { getAllUsersAdmin } from "../../state/actions/userActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAllProductsAdmin());
    dispatch(getAllOrdersAdmin());
    dispatch(getAllUsersAdmin());
  }, [dispatch]);

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  // Uncaught Error: "arc" is not a registered element.
  // Uncaught Error: "category" is not a registered scale.
  // Uncaught Error: "linear" is not a registered scale.
  //  Uncaught Error: "point" is not a registered element
  // Below lines of code is added to get rid of above errors.It happened because of the chartjs upgraded to v4 library
  // And this solution was reffered from react-chart-js official website

  // Chart.register(CategoryScale);
  // Chart.register(ArcElement);
  // Chart.register(LinearScale);
  // Chart.register(PointElement);

  // Note :- On Importing Chart from chart.js/auto every error showing above is solved.

  return (
    <div className="dashboardPage">
      <Metadata title="Dashboard - Admin" />
      <Sidebar />

      <div className="dashboardContainer">
        <h1>Our Dashboard</h1>

        <div className="dashboardSummary">
          <div>
            <p>
              {" "}
              Total Amount
              <br /> LKR {totalAmount}
            </p>
            
          </div>

          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Meals</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
