import express from 'express';
const Router = express.Router();
import contestController from '../controllers/contest';

Router.post('/', contestController.createContest);

Router.get('/mycontests', contestController.getMyContests);

Router.patch('/:contestId', contestController.updateContest);
Router.post('/:contestId/participate', contestController.participantRegister);
export default Router;
