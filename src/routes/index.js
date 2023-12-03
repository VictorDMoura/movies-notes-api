const { Router } = require("express");
const userRoute = require("./user.route");
const movieNotesRoute = require("./movies_notes.route");

const routes = Router();

routes.use("/users", userRoute);
routes.use("/movies-notes", movieNotesRoute);
module.exports = routes;
