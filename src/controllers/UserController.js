const knex = require("../database/knex");

class UserController {
  async create(req, res) {
    const { name, email, password, avatar } = req.body;

    await knex("users").insert({
      name,
      email,
      password,
      avatar,
    });

    res.status(201).json();
  }
}

module.exports = UserController;
