import { Router } from "express";
import faqCreateController from "../../controllers/faq/faqCreate.controller";
import faqListController from "../../controllers/faq/faqList.controller";
import faqIdListController from "../../controllers/faq/faqId.controller";
import faqDeleteController from "../../controllers/faq/faqDelete.controller";
import faqUpdateController from "../../controllers/faq/faqUpdate.controller";
import { authUser } from "../../middlewares/authUser.mid";

const faqRoutes = Router();

faqRoutes.post('', authUser, faqCreateController);
faqRoutes.get('', faqListController);
faqRoutes.get('/:id', faqIdListController);
faqRoutes.patch('/:id', authUser, faqUpdateController);
faqRoutes.delete('/:id', authUser, faqDeleteController);

export default faqRoutes;