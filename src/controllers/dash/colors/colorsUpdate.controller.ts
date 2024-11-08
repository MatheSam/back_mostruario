import { AppError } from "../../../errors";
import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import colorsUpdateService from "../../../services/employee/colors/colorsUpdate.service";
import { Request, Response } from "express";

const colorsUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'product');
    const id = req.params;
    const color = await colorsUpdateService(id, req.body);

    return res.status(200).json(color);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default colorsUpdateController;