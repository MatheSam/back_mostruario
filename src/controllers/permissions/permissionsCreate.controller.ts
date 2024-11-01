import { Request, Response } from "express";
import permissionsCreateService from "../../services/permissions/permissionsCreate.service";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";


const permissionsCreateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {name} = req.body;
    const permission = await permissionsCreateService({name});

    return res.status(201).send(permission);

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default permissionsCreateController;