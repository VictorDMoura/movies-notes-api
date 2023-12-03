const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UserController {
  async create(req, res) {
    const { name, email, password, avatar } = req.body;
    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // validations
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

    if (!validEmail.test(email)) {
      throw new AppError("Please enter a valid email");
    }

    const checkUserExists = await knex("users").where("email", email);
    if (checkUserExists) {
      throw new AppError("User already exists!");
    }

    // hash password
    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    res.status(201).json();
  }
}

module.exports = UserController;
