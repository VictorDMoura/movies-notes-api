const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UserController {
  async create(req, res) {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
      const requireField = !name
        ? "Name"
        : !email
        ? "Email"
        : !password
        ? "Password"
        : "";
      throw new AppError(`${requireField} is a required field`);
    }

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
