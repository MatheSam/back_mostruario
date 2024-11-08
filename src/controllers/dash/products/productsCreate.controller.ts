import { Request, Response } from "express";
import { AppError } from "../../../errors";
import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import productsCreateService from "../../../services/employee/products/productsCreate.service";

const productsCreateController = async (req: Request, res: Response): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'product')
    const product = await productsCreateService(req.body);
    
    return res.status(200).send(product);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
};
export default productsCreateController;