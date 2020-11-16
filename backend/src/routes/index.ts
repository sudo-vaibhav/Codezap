//this is the master file for all routes

import { Router } from 'express';
const router = Router();

import ensureAuthenticated from '../middleware/ensureAuthenticated/ensureAuthenticated';
import userRouter from './user';
import contestRouter from './contest';
import problemRouter from './problem';

router.use('/users', ensureAuthenticated, userRouter);
router.use('/contests', ensureAuthenticated, contestRouter);
router.use('/contest/:contestId/problems/', ensureAuthenticated, problemRouter);

export default router;
