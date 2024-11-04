import { Request, Response } from "express";
import { AppError } from "../../errors";
import { handleError, isAdmOrPermission } from "../../middlewares/err.mid";
import postCreateService from "../../services/posts/postCreate.services";

const postCreateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {

    await isAdmOrPermission(req.userEmail, 'post');
    const post = await postCreateService(req.body, req.userEmail);

    return res.status(200).send(post);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }   
  }
}

export default postCreateController;