import { Router } from "express";
import { authUser } from "../../../middlewares/authUser.mid";
import sizesCreateController from "../../../controllers/dash/sizes/sizesCreate.controller";
import { sizesListController } from "../../../controllers/dash/sizes/sizesList.controller";

const sizesRoutes = Router();

sizesRoutes.post('', authUser, sizesCreateController);
sizesRoutes.get('/:id?', authUser, sizesListController);
// sizesRoutes.patch('/:id', authUser, sizesUpdateController);
// sizesRoutes.delete('/:id', authUser, sizesDeleteController);

export default sizesRoutes;