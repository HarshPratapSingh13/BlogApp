import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

const { MONGODB, PORT, SECRET_ACCESS_TOKEN } = process.env;

import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import protectedRoute from "./routes/protectedRoute.js"

mongoose
  .connect(MONGODB)
  .then(console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(cors());
app.disable("x-powered-by");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use('/api/protected', protectedRoute);

const port = PORT || 8668;

app.listen(port, () => {
    console.log(`✅ Backend running on http://localhost:${port}`);
});