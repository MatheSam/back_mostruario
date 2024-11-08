import { AppDataSource } from "../../../data-source";
import { Gender } from "../../../entities/gender.entity";
import { AppError } from "../../../errors";
import { handleError } from "../../../middlewares/err.mid";
import { Request, Response } from "express";

const genderRepo = AppDataSource.getRepository(Gender);

export const gendersListController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const whereCondition = id ? { id } : {};

    const gender = await genderRepo.find({
      order: { title: "ASC" },
      where: whereCondition
    });

    if (gender.length == 0) {
      throw new AppError('Não foi encontrado nenhum gênero!', 400)
    }

    return res.status(200).send(gender);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
};
