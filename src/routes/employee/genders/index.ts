import { Router } from "express";
import { authUser } from "../../../middlewares/authUser.mid";
import gendersCreateController from "../../../controllers/dash/gender/gendersCreate.controller";
import { gendersListController } from "../../../controllers/dash/gender/gendersList.controller";

const gendersRoutes = Router();

gendersRoutes.post('', authUser, gendersCreateController);
gendersRoutes.get('/:id?', authUser, gendersListController);
// gendersRoutes.patch('/:id', authUser, gendersUpdateController);
// gendersRoutes.delete('/:id', authUser, gendersDeleteController);

export default gendersRoutes;