import { Router } from "express";
import { authUser } from "../../../middlewares/authUser.mid";
import { subCategoryListController } from "../../../controllers/dash/subCategories/subCategoriesList.controller";
import subCategoriesCreateController from "../../../controllers/dash/subCategories/subCategoriesCreate.controller";
import subCategorieUpdateController from "../../../controllers/dash/subCategories/subCategoriesUpdate.controller";
import subCategoryDeleteController from "../../../controllers/dash/subCategories/subCategoriesDelete.controller";

const subCategoriesRoutes = Router();

subCategoriesRoutes.post('', authUser, subCategoriesCreateController);
subCategoriesRoutes.get('/:subcategory_name?', authUser, subCategoryListController);
subCategoriesRoutes.patch('/:id', authUser, subCategorieUpdateController)
subCategoriesRoutes.delete('/:id', authUser, subCategoryDeleteController)

export default subCategoriesRoutes;