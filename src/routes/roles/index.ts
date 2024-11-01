import { Router } from "express";
import rolesCreateController from "../../controllers/roles/rolesCreate.controller";
import rolesListController from "../../controllers/roles/rolesList.controller";
import roleDeleteController from "../../controllers/roles/rolesDelete.controller";
import roleUpdateController from "../../controllers/roles/roleUpdate.controller";

const rolesRoutes = Router();

rolesRoutes.post('', rolesCreateController);
rolesRoutes.get('', rolesListController);
rolesRoutes.delete('/:id', roleDeleteController);
rolesRoutes.patch('/:id', roleUpdateController);

export default rolesRoutes;

