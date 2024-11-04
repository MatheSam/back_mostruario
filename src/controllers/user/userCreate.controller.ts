import { Request, Response } from "express";
import userCreateService from "../../services/user/userCreate.service";
import { AppError } from "../../errors";
import { handleError, isAdmOrPermission } from "../../middlewares/err.mid";

const userCreateController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const email = req.userEmail;
    await isAdmOrPermission(email, 'user');
    const user = await userCreateService(req.body);

    return res.status(201).send(user);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default userCreateController;