import { Router } from "express";
import { authUser } from "../../../middlewares/authUser.mid";
import categoriesCreateController from "../../../controllers/dash/categories/categoriesCreate.controller";
import { categoryListController } from "../../../controllers/dash/categories/categoriesList.controller";
import categoriesUpdateController from "../../../controllers/dash/categories/categoriesUpdate.controller";
import postDeleteController from "../../../controllers/dash/categories/categoriesDelete.controller";

const categoriesRoutes = Router();

categoriesRoutes.post('', authUser, categoriesCreateController);
categoriesRoutes.get('/:category_name?', authUser, categoryListController);
categoriesRoutes.patch('/:id', authUser, categoriesUpdateController);
categoriesRoutes.delete('/:id', authUser, postDeleteController);

export default categoriesRoutes