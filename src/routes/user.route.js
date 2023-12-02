const { Router } = require("express");

const userRoute = Router();

userRoute.get("/", (req, res) => {
  res.send("usuario!");
});

module.exports = userRoute;
