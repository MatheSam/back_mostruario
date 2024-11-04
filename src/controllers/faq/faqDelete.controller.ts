import { handleError } from "../../middlewares/err.mid";
import { AppError } from "../../errors";
import faqDeleteService from "../../services/faq/faqDelete.service";
import { Request, Response } from "express";

const faqDeleteController = async (req: Request, res: Response): Promise<any> => {
  try {
    await faqDeleteService(req.params, req.userEmail);

    return res.status(200).json({"message": "FAQ deletado!"})
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default faqDeleteController