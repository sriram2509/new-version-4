import app from "./app.js";
import cloudinary from "cloudinary";

import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");

  process.exit(1);
});

// Below config only used when using in development mode or npm run dev. But in production mode the platform(here "HEROKU") provide their own config
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "server/config/config.env" });
}

// connect to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
