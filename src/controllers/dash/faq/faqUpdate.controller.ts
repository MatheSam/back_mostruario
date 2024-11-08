import { AppError } from "../../../errors";
import { handleError, isAdmOrPermission } from "../../../middlewares/err.mid";
import faqUpdateService from "../../../services/employee/faq/faqUpdate.service";
import { Request, Response } from "express";

const faqUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    await isAdmOrPermission(req.userEmail, 'faq');

    const id = req.params;
    const faq = await faqUpdateService(id, req.body);

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