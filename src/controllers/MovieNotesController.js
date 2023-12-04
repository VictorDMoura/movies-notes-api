const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MoviesNotesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body;
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

    const [note_id] = await knex("movies_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return { name, note_id, user_id };
    });

    await knex("movies_tags").insert(tagsInsert);

    res.status(201).json();
  }

  async show(req, res) {
    const { id } = req.params;
    const note = await knex("movies_notes").where({ id }).first();

    if (!note) {
      throw new AppError("No note find");
    }

    const tags = await knex("movies_tags")
      .where({ note_id: id })
      .orderBy("name");
    res.status(200).json({
      ...note,
      tags,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const note = await knex("movies_notes").where({ id }).first();

    if (!note) {
      throw new AppError("No note find");
    }

    await knex("movies_notes").where({ id }).delete();

    res.status(200).json();
  }
}

module.exports = MoviesNotesController;
