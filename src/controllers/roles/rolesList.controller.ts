import { Request, Response } from "express";
import rolesListService from "../../services/roles/roleList.service";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";

const rolesListController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const roles = await rolesListService();
    return res.status(200).send(roles);

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default rolesListController;