import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import {validateLoginUser,validateRegisterUser} from '../validations/auth.validation';

const authRoutes = Router();

const authController = new AuthController();

// walletRoutes.get('/getWallet/:id', validateGetWalletById,walletController.getWalletById);
// walletRoutes.get('/getWallets/:page', walletController.getAllWallets);
authRoutes.post('/createUser',validateRegisterUser, authController.registerUser);
authRoutes.post('/loginUser', validateLoginUser,authController.loginUser);
authRoutes.post('/logoutUser',authController.logoutUser);


export default authRoutes;