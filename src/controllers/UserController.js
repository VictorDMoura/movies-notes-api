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

    const [checkUserExists] = await knex("users").where("email", email);
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

  async update(req, res) {
    const { name, email, avatar, password, old_password } = req.body;
    const { id } = req.params;
    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const [user] = await knex("users").where("id", id);

    if (!user) {
      throw new AppError("User doesn't exist!");
    }

    if (email && !validEmail.test(email)) {
      throw new AppError("Invalid email!");
    }

    const [userWithUpdatedEmail] = email
      ? await knex("users").where("email", email)
      : [];

    if (userWithUpdatedEmail && userWithUpdatedEmail.id != id) {
      throw new AppError("Email is already in use ");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("Old password doesn't match");
      }

      user.password = await hash(password, 8);
    }

    // format date
    const date = new Date();
    const updated_at = `${date.getFullYear()}-${date.getMonth() + 1}-${date
      .getDate()
      .toString()
      .padStart(
        2,
        "0"
      )} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    await knex("users")
      .update({
        name: user.name,
        password: user.password,
        email,
        avatar,
        updated_at,
      })
      .where("id", id);
    res.status(204).json();
  }

  async show(req, res) {
    const { id } = req.params;

    const [user] = await knex("users").where("id", id);

    if (!user) {
      throw new AppError("User doesn't exist!");
    }

    return res.status(200).json(user);
  }

  async index(req, res) {
    const users = await knex("users");

    res.status(200).json(users);
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("users").where({ id }).delete();

    res.status(204).json();
  }
}

module.exports = UserController;
