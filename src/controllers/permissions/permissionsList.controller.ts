import { Request, Response } from "express";
import permissionsListService from "../../services/permissions/permissionsList.service";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";

const permissionsListController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const permissions = await permissionsListService();
    return res.status(200).send(permissions);

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default permissionsListController;