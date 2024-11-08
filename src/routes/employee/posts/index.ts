import { Router } from "express";
import { authUser } from "../../../middlewares/authUser.mid";
import { postListController } from "../../../controllers/dash/posts/postList.controller";
import postCreateController from "../../../controllers/dash/posts/postCreate.controller";
import postUpdateController from "../../../controllers/dash/posts/postUpdate.controller";
import postDeleteController from "../../../controllers/dash/posts/postDelete.controller";

const postRoutes = Router();

postRoutes.get('/:id?', authUser, postListController);
postRoutes.post('', authUser, postCreateController);
postRoutes.patch('/:id', authUser, postUpdateController);
postRoutes.delete('/:id', authUser, postDeleteController);

export default postRoutes;