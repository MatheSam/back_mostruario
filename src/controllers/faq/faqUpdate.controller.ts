import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import faqUpdateService from "../../services/faq/faqUpdate.service";
import { Request, Response } from "express";

const faqUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params;
    const faq = await faqUpdateService(id, req.body, req.userEmail);

    return res.status(200).json(faq);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default faqUpdateController;