import { Request, Response } from "express";
import { AppError } from "../../errors";
import { handleError, isAdmOrPermission } from "../../middlewares/err.mid";
import categoriesCreateService from "../../services/categories/categoriesCreate.services";

const categoriesCreateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {

    await isAdmOrPermission(req.userEmail, 'product');
    const categorie = await categoriesCreateService(req.body);

    return res.status(200).send(categorie);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }   
  }
}

export default categoriesCreateController;