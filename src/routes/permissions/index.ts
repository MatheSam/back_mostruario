import { Router } from "express";
import permissionsCreateController from "../../controllers/permissions/permissionsCreate.controller";
import permissionsListController from "../../controllers/permissions/permissionsList.controller";
import permissionUpdateController from "../../controllers/permissions/permissionsUpdate.controller";

const permissionsRoutes = Router();

permissionsRoutes.post('', permissionsCreateController);
permissionsRoutes.get('', permissionsListController);
permissionsRoutes.patch('/:id', permissionUpdateController);

export default permissionsRoutes;

