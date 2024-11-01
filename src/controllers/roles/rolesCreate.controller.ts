import { Request, Response } from "express";
import rolesCreateService from "../../services/roles/rolesCreate.service";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";

const rolesCreateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {name, permissionId} = req.body;
    const role = await rolesCreateService({name, permissionId});

    return res.status(201).send(role);
    
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default rolesCreateController