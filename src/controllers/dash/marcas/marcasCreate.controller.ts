import { Request, Response } from "express";
import { AppError } from "../../../errors";
import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import marcaCreateService from "../../../services/employee/marcas/marcasCreate.services";

const marcasCreateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'product');
    const marca = await marcaCreateService(req.body);

    return res.status(200).send(marca);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }   
  }
}

export default marcasCreateController;