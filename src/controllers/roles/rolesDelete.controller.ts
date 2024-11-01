import { AppError } from "../../errors";
import roleDeleteService from "../../services/roles/roleDelete.service";
import { Response, Request } from "express";
import { handleError } from "../../middlewares/err.mid";

const roleDeleteController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id = req.params;
    await roleDeleteService(id);

    return res.status(204).json({message: "Cargo deletado com sucesso!"})

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
};

export default roleDeleteController;