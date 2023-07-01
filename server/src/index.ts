import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import "express-async-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import housesRouter from "./routes/houseRoutes";
import authRouter from "./routes/authRoutes";
import fileUploadsRouter from "./routes/fileUploadsRouter";

import connectDB from "./db/connectDB";
import { notFound } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";

dotenv.config();

const app = express();

app.use(express.static(__dirname + "/public"));

app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

app.use("/api/v1/houses", housesRouter);
app.use("/auth", authRouter);
app.use("/upload", fileUploadsRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
