import express from 'express';
import 'dotenv/config';
import AuthenticatorController from './src/controller/AuthenticatorController';
import UserController from './src/controller/UserController';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const port = process.env.SERVER_PORT || 3000
const app = express();
const authenticatorController = new AuthenticatorController();
const userController = new UserController();
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
})

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(limiter)

app.use("/authentication",authenticatorController.getRoutes());
app.use("/users",userController.getRoutes());

app.listen(port, () => { console.log(`Le serveur est ouvert sur le port : ${port}`); });
