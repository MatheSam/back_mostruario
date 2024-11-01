import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import loginService from "../../services/login/login.service";
import { Request, Response } from "express";

const loginController = async (req: Request, res: Response): Promise<any> => {
  try {
    const {email, password} = req.body;
    const token = await loginService({email, password});

    return res.status(200).json({token});
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default loginController;