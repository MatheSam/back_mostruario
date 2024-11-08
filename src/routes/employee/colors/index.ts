import { Router } from "express";
import { authUser } from "../../../middlewares/authUser.mid";
import colorsCreateController from "../../../controllers/dash/colors/colorsCreate.controller";
import { colorsListController } from "../../../controllers/dash/colors/colorsList.controller";
import colorsUpdateController from "../../../controllers/dash/colors/colorsUpdate.controller";

const colorsRoutes = Router();

colorsRoutes.post('', authUser, colorsCreateController);
colorsRoutes.get('/:id?', authUser, colorsListController);
colorsRoutes.patch('/:id', authUser, colorsUpdateController);
// colorsRoutes.delete('/:id', authUser, colorsDeleteController);

export default colorsRoutes;