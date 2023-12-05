const { Router } = require("express");
const userRoute = require("./user.route");
const movieNotesRoute = require("./movies_notes.route");
const tagsRoute = require("./tags.route");

const routes = Router();

routes.use("/users", userRoute);
routes.use("/movies-notes", movieNotesRoute);
routes.use("/tags", tagsRoute);
module.exports = routes;
