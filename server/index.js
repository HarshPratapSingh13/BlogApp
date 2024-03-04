import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";

mongoose
  .connect(process.env.MONGODB)
  .then(console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/" , (req, res) => {
    res.send(`hello world`);
});
app.use("/getUsers", userRoute);

app.listen(process.env.PORT, () => {
    console.log(`✅ Backend running on http://localhost:${process.env.PORT}`);
})