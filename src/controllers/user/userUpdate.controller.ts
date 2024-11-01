import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import userUpdateService from "../../services/user/userUpdate.service";
import { Request, Response } from "express";

const userUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params;
    const user = await userUpdateService(id, req.body);

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default userUpdateController;