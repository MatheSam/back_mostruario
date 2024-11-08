import { Router } from "express";
import productsCreateController from "../../../controllers/dash/products/productsCreate.controller";
import { authUser } from "../../../middlewares/authUser.mid";
import prodImgsCreateController from "../../../controllers/dash/productImgs/prodImgsCreate.controller";
import { productsListController } from "../../../controllers/dash/products/productsList.controller";

const productsRoutes = Router();

productsRoutes.post('', authUser, productsCreateController);
productsRoutes.post('/imagens', authUser, prodImgsCreateController);
productsRoutes.get('', authUser, productsListController);

export default productsRoutes;