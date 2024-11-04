import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import postUpdateService from "../../services/posts/postUpdate.service";
import { Request, Response } from "express";

const postUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {id} = req.params;
    const email = req.userEmail;
    const post = await postUpdateService({id}, email, req.body);

    return res.status(200).json(post);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default postUpdateController;