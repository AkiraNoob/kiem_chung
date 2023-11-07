import express from 'express';
import authController from '../controller/auth.controller';
import authValidator from '../validator/auth.validator';

const authRoute = express.Router();
authRoute.post('/login', authValidator.validateLocalLogin, authController.loginWithEmailAndPassword);
authRoute.post('/register', authValidator.validateRegister, authController.register);
authRoute.post('/refreshToken', authValidator.validateRefreshToken, authController.refreshToken);

export default authRoute;
