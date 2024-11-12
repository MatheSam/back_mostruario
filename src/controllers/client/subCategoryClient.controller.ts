import { AppDataSource } from "../../data-source";
import { SubCategories } from "../../entities/subCategorie.entity";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import { Request, Response } from "express";

const subCategoryRepo = AppDataSource.getRepository(SubCategories);

export const subCategoryListClient = async (req: Request, res: Response): Promise<any> => {
  try {
    const { subcategory_name } = req.params;
    const whereCondition = subcategory_name ? { url: subcategory_name.toLowerCase() } : { is_active: true };

    return res.status(200).send(await subCategoryRepo
      .createQueryBuilder("sub")
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
        "prod.short_descr"
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
