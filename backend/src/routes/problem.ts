import express from 'express';
const Router = express.Router();
import problemController from '../controllers/problem';

Router.post('/', problemController.createProblem);
Router.post('/:problemId/submissions', problemController.addSubmission);
Router.get('/:problemId', problemController.getProblem);
Router.patch('/:problemId', problemController.updateProblem);

export default Router;
