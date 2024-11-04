import { Router } from "express";
import userCreateController from "../../controllers/user/userCreate.controller";
import userListController from "../../controllers/user/userList.controller";
import userIdListController from "../../controllers/user/userIdList.controller";
import userSoftDeleteController from "../../controllers/user/userSoftDelete.controller";
import userUpdateController from "../../controllers/user/userUpdate.controller";
import userUpdatePasswordController from "../../controllers/user/userUpdatePassword.controller";
import { authUser } from "../../middlewares/authUser.mid";

const userRoutes = Router();

userRoutes.post('', authUser, userCreateController);
userRoutes.get('', authUser, userListController);
userRoutes.get('/:id', authUser, userIdListController);
userRoutes.delete('/:id', authUser, userSoftDeleteController);
userRoutes.patch('/:id', authUser, userUpdateController);
userRoutes.patch('/:id/alterar_senha', authUser, userUpdatePasswordController);

export default userRoutes;