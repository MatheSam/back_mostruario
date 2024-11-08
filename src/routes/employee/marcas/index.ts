import { Router } from "express";
import { authUser } from "../../../middlewares/authUser.mid";

import marcasCreateController from "../../../controllers/dash/marcas/marcasCreate.controller";
import marcasUpdateController from "../../../controllers/dash/marcas/marcaUpdate.controller";
import { marcasListController } from "../../../controllers/dash/marcas/marcasList.controller";
import marcasDeleteController from "../../../controllers/dash/marcas/marcasDelete.controller";

const marcasRoutes = Router();

marcasRoutes.post('', authUser, marcasCreateController);
marcasRoutes.get('/:title?', authUser, marcasListController);
marcasRoutes.patch('/:id', authUser, marcasUpdateController);
marcasRoutes.delete('/:id', authUser, marcasDeleteController);

export default marcasRoutes;