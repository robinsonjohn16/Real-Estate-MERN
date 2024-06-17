import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import userListing from "./routes/listing.route.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));

// Import routers

app.use("/api/v1/users", userRouter);
app.use("/api/v1/listing", userListing);
export default app;
