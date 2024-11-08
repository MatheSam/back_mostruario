import { AppDataSource } from "../../data-source";
import { Products } from "../../entities/products.entity";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import { Request, Response } from "express";

const productRepo = AppDataSource.getRepository(Products);

export const productListClient = async (req: Request, res: Response): Promise<any> => {
  try {
    const { product } = req.params;
    const whereCondition = product ? { url: product.toLowerCase() } : { is_active: true };

    return res.status(200).send(await productRepo
      .createQueryBuilder("prod")
      .leftJoinAndSelect("sub.category", "cat", "cat.is_active = :isActive", { isActive: true })
      .leftJoinAndSelect("sub.products", "prod", "prod.is_active = :isActive", { isActive: true })
      .where(whereCondition)
      .orderBy("sub.title", "ASC")
      .addOrderBy("sub.title", "ASC")
      .addOrderBy("prod.title", "ASC")
      .select([
        "cat.title",
        "cat.id",
        "cat.url",
        "sub.id",
        "sub.title",
        "sub.url",
        "prod.title",
        "prod.id",
        "prod.url",
      ])
      .getMany());
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
};
