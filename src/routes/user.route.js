const { Router } = require("express");
const UserController = require("../controllers/UserController");

const userController = new UserController();
const userRoute = Router();

userRoute.post("/", userController.create);

module.exports = userRoute;
