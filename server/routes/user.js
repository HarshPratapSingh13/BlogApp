import { Router } from "express";

Router.get("/", (req, res) => {
    res.send("Lele user");
});

// module.exports = Router;
export default Router;