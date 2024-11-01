import { Request, Response } from "express";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import faqCreateService from "../../services/faq/faqCreate.services";

const faqCreateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const faq = await faqCreateService(req.body);

    return res.status(200).send(faq);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }   
  }
}

export default faqCreateController;