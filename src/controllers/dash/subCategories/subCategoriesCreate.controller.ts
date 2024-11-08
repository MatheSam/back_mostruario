import { Request, Response } from "express";
import { AppError } from "../../../errors";
import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import subCategoriesCreateService from "../../../services/employee/subcategories/subCategoriesCreate.services";

const subCategoriesCreateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {

    await isAdmOrPermission(req.userEmail, 'product');
    const subCategory = await subCategoriesCreateService(req.body);

    return res.status(200).send(subCategory);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }   
  }
}

export default subCategoriesCreateController;