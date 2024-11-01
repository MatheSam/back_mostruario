import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import { Response, Request } from "express";
import roleUpdateService from "../../services/roles/roleUpdate.service";

const roleUpdateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {

    const id = req.params;
    const data = req.body;

    const role = await roleUpdateService(id, data);

    return res.status(200).json({ role, message: "Cargo atualizado!" })
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default roleUpdateController;