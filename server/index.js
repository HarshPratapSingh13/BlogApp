import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();

import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";

mongoose
  .connect(process.env.MONGODB)
  .then(console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
    console.log(`✅ Backend running on http://localhost:${process.env.PORT}`);
});