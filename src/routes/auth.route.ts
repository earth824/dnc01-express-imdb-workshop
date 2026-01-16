import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { AUTH_ROUTES } from '../config/route.config.js';

export const authRouter = express.Router();

authRouter.post(AUTH_ROUTES.REGISTER, authController.register);
authRouter.post(AUTH_ROUTES.LOGIN, authController.login);
