import { AppDataSource } from "../../../data-source";
import { Colors } from "../../../entities/color.entity";
import { AppError } from "../../../errors";
import { handleError } from "../../../middlewares/err.mid";
import { Request, Response } from "express";

const colorRepo = AppDataSource.getRepository(Colors);

export const colorsListController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const whereCondition = id ? { id } : {};

    const color = await colorRepo.find({
      order: { title: "ASC" },
      where: whereCondition
    });

    if (color.length == 0) {
      throw new AppError('Não foi encontrado nem uma cor!', 400)
    }

    return res.status(200).send(color);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
};
