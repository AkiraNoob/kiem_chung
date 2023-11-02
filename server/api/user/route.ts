import express from 'express';
import authenticateMiddleware from '../../middleware/auth';
import userController from './controller';
import userValidator from './validator';

const userRouter = express.Router();

userRouter.route('/:userId').get(authenticateMiddleware, userValidator.validateGetUserDetail, userController.getUser);

export default userRouter;
