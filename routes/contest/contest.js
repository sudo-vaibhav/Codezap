const Router = require("express").Router();
const Contest = require("../../models/Contest/Contest");
const contestController = require("../../controllers/contest");

Router.post("/", contestController.createContest);

module.exports = Router;
