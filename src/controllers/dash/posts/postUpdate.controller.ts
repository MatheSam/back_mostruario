import { AppError } from "../../../errors";
import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import postUpdateService from "../../../services/employee/posts/postUpdate.service";
import { Request, Response } from "express";

const postUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'post');

    const {id} = req.params;
    const post = await postUpdateService({id}, req.body);

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