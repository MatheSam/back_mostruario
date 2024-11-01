import { Request, Response } from "express";
import userListService from "../../services/user/userList.service";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";

const userListController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = await userListService();
    return res.status(200).send(user);

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default userListController;