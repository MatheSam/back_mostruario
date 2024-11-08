import { AppError } from "../../../errors";
import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import categorieUpdateService from "../../../services/employee/categories/categoriesUpdate.service";
import { Request, Response } from "express";

const categoriesUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'product');

    const {id} = req.params;
    const categories = await categorieUpdateService({id}, req.body);

    return res.status(200).json(categories);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default categoriesUpdateController;