import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import { AppError } from "../../../errors";
import { Request, Response } from "express";
import subCategoryDeleteService from "../../../services/employee/subcategories/subCategoriesDelete.service";

const subCategoryDeleteController = async (req: Request, res: Response): Promise<any> => {
  try {
    const {id} = req.params
    await isAdmOrPermission(req.userEmail, 'product');
    await subCategoryDeleteService({id});

    return res.status(200).json({"message": "Subcategoria deletada!"})
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default subCategoryDeleteController