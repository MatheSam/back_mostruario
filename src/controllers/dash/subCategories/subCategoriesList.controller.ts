import { AppDataSource } from "../../../data-source";
import { SubCategories } from "../../../entities/subCategorie.entity";
import { AppError } from "../../../errors";
import { handleError } from "../../../middlewares/err.mid";
import { Request, Response } from "express";

const subCategoryRepo = AppDataSource.getRepository(SubCategories);

export const subCategoryListController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { subcategory_name } = req.params;
    const whereCondition = subcategory_name ? { url: subcategory_name.toLowerCase() } : {};

    const subCategories = await subCategoryRepo
      .createQueryBuilder("sub")
      .leftJoinAndSelect("sub.category", "cat")
      .leftJoinAndSelect("sub.products", "prod")
      .where(whereCondition)
      .orderBy("sub.title", "ASC")
      .addOrderBy("prod.title", "ASC")
      .select([
        "cat.id",
        "cat.title",
        "cat.url",
        "sub.id",
        "sub.title",
        "sub.is_active",
        "sub.url",
        "prod.title",
        "prod.id",
        "prod.is_active",
        "prod.url"
      ])
      .getMany();

    return res.status(200).send(subCategories);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
};
