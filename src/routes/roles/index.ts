import { Router } from "express";
import rolesCreateController from "../../controllers/roles/rolesCreate.controller";
import rolesListController from "../../controllers/roles/rolesList.controller";

const rolesRoutes = Router();

rolesRoutes.post('', rolesCreateController);
rolesRoutes.get('', rolesListController);

export default rolesRoutes;

