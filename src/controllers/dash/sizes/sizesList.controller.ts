import { AppDataSource } from "../../../data-source";
import { Sizes } from "../../../entities/size.entity";
import { AppError } from "../../../errors";
import { handleError } from "../../../middlewares/err.mid";
import { Request, Response } from "express";

const sizeRepo = AppDataSource.getRepository(Sizes);

export const sizesListController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const whereCondition = id ? { id } : {};

    const size = await sizeRepo.find({
      order: { title: "ASC" },
      where: whereCondition
    });

    if (size.length == 0) {
      throw new AppError('Não foi encontrado nenhum tamanho!', 400)
    }

    return res.status(200).send(size);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
};
