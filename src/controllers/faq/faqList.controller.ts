import { Request, Response } from "express";
import faqListService from "../../services/faq/faqList.service";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";

const faqListController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const faq = await faqListService();
    return res.status(200).send(faq);

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default faqListController;