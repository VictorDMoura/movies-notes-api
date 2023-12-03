const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MoviesNotesController {
  async create(req, res) {
    const { title, description, rating } = req.body;
    const { user_id } = req.params;

    const [user] = await knex("users").where("id", user_id);

    if (!user) {
      throw new AppError("User doesn't exist");
    }

    if (!title || !rating) {
      const requiredField = !title
        ? "title"
        : !rating
        ? "rating"
        : "title and rating";
      throw new AppError(`${requiredField} must be informed`);
    }

    if (rating > 5 || rating < 1) {
      throw new AppError("Rating must be a number between 1 and 5");
    }

    res.status(201).json();
  }
}

module.exports = MoviesNotesController;
