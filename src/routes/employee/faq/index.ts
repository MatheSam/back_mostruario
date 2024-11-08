import { Router } from "express";
import { authUser } from "../../../middlewares/authUser.mid";

import faqCreateController from "../../../controllers/dash/faq/faqCreate.controller";
import faqListController from "../../../controllers/dash/faq/faqList.controller";
import faqDeleteController from "../../../controllers/dash/faq/faqDelete.controller";
import faqUpdateController from "../../../controllers/dash/faq/faqUpdate.controller";

const faqRoutes = Router();

faqRoutes.post('', authUser, faqCreateController);
faqRoutes.get('/:id?', authUser, faqListController);
faqRoutes.patch('/:id', authUser, faqUpdateController);
faqRoutes.delete('/:id', authUser, faqDeleteController);

export default faqRoutes;