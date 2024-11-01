import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import postIdListService from "../../services/posts/postIdList.service";
import { Request, Response } from "express";

const postIdListController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params;
    const post = await postIdListService(id);
    return res.status(200).send(post);

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }

}

export default postIdListController;