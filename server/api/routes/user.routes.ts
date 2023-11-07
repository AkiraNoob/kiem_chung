import express from 'express';
import userController from '../controller/user.controller';
import userValidator from '../validator/user.validator';

const userRouter = express.Router();

userRouter.route('/:userId').get(userValidator.validateGetUserDetail, userController.getUser);

export default userRouter;
