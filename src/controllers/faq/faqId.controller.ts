import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import faqIdListService from "../../services/faq/faqIdList.service";
import { Request, Response } from "express";

const faqIdListController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params;
    const faq = await faqIdListService(id);
    return res.status(200).send(faq);

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }

}

export default faqIdListController;