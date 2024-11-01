import { Router } from "express";
import loginController from "../../controllers/login/login.controller";
import { authUser } from "../../middlewares/authUser.mid";

const loginRoutes = Router();

loginRoutes.post('', authUser, loginController);

export default loginRoutes;
