import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

import user from "./routes/user.js";

app.get("/" , (req, res) => {
    res.send(`hello world`);
});
app.use("/getUsers", user);

app.listen(process.env.PORT, () => {
    console.log(`✅ Backend running on http://localhost:${process.env.PORT}`);
})