import { Router } from "express";
import postCreateController from "../../controllers/posts/postCreate.controller";
import postListController from "../../controllers/posts/postList.controller";
import postIdListController from "../../controllers/posts/postId.controller";
import postDeleteController from "../../controllers/posts/postDelete.controller";
import postUpdateController from "../../controllers/posts/postUpdate.controller";

const postRoutes = Router();

postRoutes.post('', postCreateController);
postRoutes.get('', postListController);
postRoutes.get('/:id', postIdListController);
postRoutes.patch('/:id', postUpdateController);
postRoutes.delete('/:id', postDeleteController);

export default postRoutes;