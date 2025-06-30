import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { env } from "./config/env";
import cookieParser from "cookie-parser";
import { requestLogger } from "./middlewares/requestLogger";
import router from "./routes";

const app = express();

const { PORT, ORIGIN, MONGO_URI } = env;
console.log(ORIGIN);
app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get("/", (_req, res) => {
  res.send("API artisan app is running");
});

app.use("/api", router);

mongoose
  .connect(MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
