import { Request, Response } from "express";
import { AppError } from "../../../errors";
import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import colorCreateService from "../../../services/employee/colors/colorsCreate.services";

const colorsCreateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'product');
    const color = await colorCreateService(req.body);

    return res.status(200).send(color);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }   
  }
}

export default colorsCreateController;