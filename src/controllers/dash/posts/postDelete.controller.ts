import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import { AppError } from "../../../errors";
import postDeleteService from "../../../services/employee/posts/postDelete.service";
import { Request, Response } from "express";

const postDeleteController = async (req: Request, res: Response): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'post');
    
    const id = req.params;
    await postDeleteService(id);

    return res.status(200).json({"message": "Publicação deletada!"})
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default postDeleteController