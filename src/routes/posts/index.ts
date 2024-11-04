import { Router } from "express";
import postCreateController from "../../controllers/posts/postCreate.controller";
import postListController from "../../controllers/posts/postList.controller";
import postIdListController from "../../controllers/posts/postId.controller";
import postDeleteController from "../../controllers/posts/postDelete.controller";
import postUpdateController from "../../controllers/posts/postUpdate.controller";
import { authUser } from "../../middlewares/authUser.mid";

const postRoutes = Router();

postRoutes.post('', authUser, postCreateController);
postRoutes.get('', postListController);
postRoutes.get('/:id', postIdListController);
postRoutes.patch('/:id', authUser, postUpdateController);
postRoutes.delete('/:id', authUser, postDeleteController);

export default postRoutes;