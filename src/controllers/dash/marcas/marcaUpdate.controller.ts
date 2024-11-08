import { AppError } from "../../../errors";
import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import marcasUpdateService from "../../../services/employee/marcas/marcasUpdate.service";
import { Request, Response } from "express";

const marcasUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'product');
    const id = req.params;
    const marca = await marcasUpdateService(id, req.body);

    return res.status(200).json(marca);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default marcasUpdateController;