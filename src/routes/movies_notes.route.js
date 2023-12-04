const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesController = new MovieNotesController();
const movieNotesRoute = Router();

movieNotesRoute.post("/:user_id", movieNotesController.create);
movieNotesRoute.get("/:id", movieNotesController.show);
movieNotesRoute.delete("/:id", movieNotesController.delete);

module.exports = movieNotesRoute;
