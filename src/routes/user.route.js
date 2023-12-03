const { Router } = require("express");
const UserController = require("../controllers/UserController");

const userController = new UserController();
const userRoute = Router();

userRoute.post("/", userController.create);
userRoute.put("/:id", userController.update);
userRoute.get("/:id", userController.show);

module.exports = userRoute;
