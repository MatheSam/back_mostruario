import { handleError, isAdm } from "../../middlewares/err.mid";
import { AppError } from "../../errors";
import userSoftDeleteService from "../../services/user/userSoftDelete.service";
import { Request, Response } from "express";

const userSoftDeleteController = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params;
    
    await isAdm(req.userEmail);
    await userSoftDeleteService(id);

    return res.status(200).json({"message": "Usuário inativado com sucesso!"})
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default userSoftDeleteController