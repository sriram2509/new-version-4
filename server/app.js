import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; //to resolve the error: (ReferenceError: __dirname is not defined in ES module scope)
import errorMiddleware from "./middleware/error.js";

// Below config only used when using in development mode or npm run dev. But in production mode the platform(here "HEROKU") provide their own config
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "server/config/config.env" });
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route imports
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
import payment from "./routes/paymentRoute.js";

// Routing
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//to resolve the error: (ReferenceError: __dirname is not defined in ES module scope)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connecting the final build html file with database
app.use(express.static(path.join(__dirname, "../client/build"))); //getting the static file (index.html) from build folder in client

// accessing the frontend by only running the backend server
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

// Middlewares for errors
app.use(errorMiddleware);

export default app;
