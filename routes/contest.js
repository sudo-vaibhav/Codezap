const Router = require('express').Router();
const contestController = require('../controllers/contest');

Router.post('/', contestController.createContest);

module.exports = Router;
