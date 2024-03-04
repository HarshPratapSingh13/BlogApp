import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import postRoute from "./route/post.js";

app.get("/" , (req, res) => {
    res.send(`hello world`);
});
app.use("/getUsers", userRoute);

app.listen(process.env.PORT, () => {
    console.log(`✅ Backend running on http://localhost:${process.env.PORT}`);
})