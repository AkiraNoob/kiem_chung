import express from 'express';
import authController from './controller';
import authValidator from './validator';

const authRoute = express.Router();
authRoute.post('/login', authValidator.validateLocalLogin, authController.loginWithEmailAndPassword);
authRoute.post('/register', authValidator.validateRegister, authController.register);

export default authRoute;
