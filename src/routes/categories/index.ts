import { Router } from "express";
import { authUser } from "../../middlewares/authUser.mid";
import categoriesCreateController from "../../controllers/categories/categoriesCreate.controller";
import categoriesListController from "../../controllers/categories/categoriesList.controller";

const categoriesRoutes = Router();

categoriesRoutes.post('', authUser, categoriesCreateController);
categoriesRoutes.get('', categoriesListController);
// categoriesRoutes.get('/:id', postIdListController);
// categoriesRoutes.patch('/:id', authUser, postUpdateController);
// categoriesRoutes.delete('/:id', authUser, postDeleteController);

export default categoriesRoutes;