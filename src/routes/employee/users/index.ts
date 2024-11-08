import { Router } from "express";
import userCreateController from "../../../controllers/dash/user/userCreate.controller";
import userListController from "../../../controllers/dash/user/userList.controller";
import userIdListController from "../../../controllers/dash/user/userIdList.controller";
import userSoftDeleteController from "../../../controllers/dash/user/userSoftDelete.controller";
import userUpdateController from "../../../controllers/dash/user/userUpdate.controller";
import userUpdatePasswordController from "../../../controllers/dash/user/userUpdatePassword.controller";
import { authUser } from "../../../middlewares/authUser.mid";

const userRoutes = Router();

userRoutes.post('', authUser, userCreateController);
userRoutes.get('', authUser, userListController);
userRoutes.get('/:id', authUser, userIdListController);
userRoutes.delete('/:id', authUser, userSoftDeleteController);
userRoutes.patch('/:id', authUser, userUpdateController);
userRoutes.patch('/:id/alterar_senha', authUser, userUpdatePasswordController);

export default userRoutes;