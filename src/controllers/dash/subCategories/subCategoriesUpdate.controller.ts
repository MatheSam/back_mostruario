import { AppError } from "../../../errors";
import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import subCategorieUpdateService from "../../../services/employee/subcategories/subCategoriesUpdate.service";
import { Request, Response } from "express";

const subCategorieUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'product');

    const {id} = req.params;
    await subCategorieUpdateService({id}, req.body);

    return res.status(200).json({"message":"Atualizado com sucesso!"});
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default subCategorieUpdateController;