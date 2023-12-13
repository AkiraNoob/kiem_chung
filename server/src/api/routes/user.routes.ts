import express from 'express';
import userController from '../controller/user.controller';
import userValidator from '../validator/user.validator';

const userRoute = express.Router();

userRoute.get('/me', userController.getMe);
userRoute.get('/:userId', userValidator.validateGetUserDetailById, userController.getUserById);

export default userRoute;
