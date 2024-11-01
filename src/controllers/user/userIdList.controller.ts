import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import userIdListService from "../../services/user/userIdList.service";
import { Request, Response } from "express";

const userIdListController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params;

  const user = await userIdListService(id);

  return res.status(200).send(user);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
  
}

export default userIdListController;