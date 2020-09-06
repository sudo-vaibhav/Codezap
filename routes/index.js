//this is the master file for all routes

const Router = require("express").Router();

const ensureAuthenticated = require("../middleware/ensureAuthenticated/ensureAuthenticated");

Router.use("/users", ensureAuthenticated, require("./user/user"));
Router.use("/contests", ensureAuthenticated, require("./contest/contest"));
// Router.use("/practice")
// Router.use("/admin")

module.exports = Router;
