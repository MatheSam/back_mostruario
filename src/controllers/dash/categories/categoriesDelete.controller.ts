import { handleError } from "../../../middlewares/err.mid";
import { AppError } from "../../../errors";
import { Request, Response } from "express";
import categoryDeleteService from "../../../services/employee/categories/categoriesDelete.service";

const categoryDeleteController = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params;
    await categoryDeleteService(id);

    return res.status(200).json({"message": "Categoria deletada!"})
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default categoryDeleteController