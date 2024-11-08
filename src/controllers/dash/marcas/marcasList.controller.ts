import { AppDataSource } from "../../../data-source";
import { Marcas } from "../../../entities/marcas.entity";
import { AppError } from "../../../errors";
import { handleError } from "../../../middlewares/err.mid";
import { Request, Response } from "express";

const marcaRepo = AppDataSource.getRepository(Marcas);

export const marcasListController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title } = req.params;
    const whereCondition = title ? { url: title.toLowerCase() } : {};

    const marca = await marcaRepo.find({
      order: { title: "ASC" },
      where: whereCondition
    });

    if (marca.length == 0) {
      throw new AppError('Não foi encontrado nem uma marca com o nome', 400)
    }

    return res.status(200).send(marca);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
};
