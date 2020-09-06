const Router = require("express").Router();
const userController = require("../../controllers/user");

Router.post("/", userController.createUser);
Router.patch("/:_id", userController.updateUser);
Router.get("/:_id", userController.getUser);

module.exports = Router;
