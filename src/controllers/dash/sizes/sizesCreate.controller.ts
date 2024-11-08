import { Request, Response } from "express";
import { AppError } from "../../../errors";
import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import sizeCreateService from "../../../services/employee/size/sizesCreate.services";

const sizesCreateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'product');
    const size = await sizeCreateService(req.body);

    return res.status(200).send(size);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }   
  }
}

export default sizesCreateController;