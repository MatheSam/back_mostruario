import { Request, Response } from "express";
import categoriesListService from "../../services/categories/categoriesList.service";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";

const categoriesListController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await categoriesListService();
    return res.status(200).send(categories);

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default categoriesListController;