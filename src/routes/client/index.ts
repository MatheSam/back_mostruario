import { Router } from "express";
import { faqListClient } from "../../controllers/client/faqClient.controller";
import { postListClient } from "../../controllers/client/postClient.controller";
import { categoryListClient } from "../../controllers/client/categoryClient.controller";
import { subCategoryListClient } from "../../controllers/client/subCategoryClient.controller";

export const faqRoutesClient = Router();
export const postRoutesClient = Router();
export const categoryRoutesClient = Router();

faqRoutesClient.get('/:id?', faqListClient);
postRoutesClient.get('/:id?', postListClient);
categoryRoutesClient.get('/:category_name?', categoryListClient);
categoryRoutesClient.get('/:category_name/:subcategory_name?', subCategoryListClient);
categoryRoutesClient.get('/:category_name/:subcategory_name/:product?', subCategoryListClient);