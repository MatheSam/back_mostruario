import { Request, Response } from "express";
import { handleError } from "../../middlewares/err.mid";
import { AppError } from "../../errors";
import permissionUpdateService from "../../services/permissions/permissionsUpdate.service";

const permissionUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params;
    const {name} = req.body;
    const permi = await permissionUpdateService(id, {name});

    return res.status(200).send(permi);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }   
  }
}

export default permissionUpdateController;