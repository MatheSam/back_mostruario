import { Request, Response } from 'express'
import userUpdatePasswordService from '../../services/user/userUpdatePassword.service'
import { AppError } from '../../errors'
import { handleError } from '../../middlewares/err.mid'

const userUpdatePasswordController = async (req: Request, res: Response): Promise<any> => {
  try {
    const email = req.userEmail
    const { password } = req.body

    if (!password) {
      throw new Error("Por gentileza, informar uma senha")
    }

    await userUpdatePasswordService(email, password)
    return res.status(201).json({ message: "Senha atualizada com sucesso!" })

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default userUpdatePasswordController
