import express from 'express';
const Router = express.Router();
import userController from '../controllers/user';

Router.post('/', userController.createUser);
Router.patch('/:_id', userController.updateUser);
Router.get('/:_id', userController.getUser);

export default Router;
