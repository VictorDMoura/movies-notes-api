const { Router } = require("express");
const TagsController = require("../controllers/TagsController");

const tagsController = new TagsController();
const tagsRoute = Router();

tagsRoute.get("/:user_id", tagsController.index);

module.exports = tagsRoute;
