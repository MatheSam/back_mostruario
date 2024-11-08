import { AppDataSource } from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import { Request, Response } from "express";

const categoryRepo = AppDataSource.getRepository(Categories);

export const categoryListClient = async (req: Request, res: Response): Promise<any> => {
  try {
    const { category_name } = req.params;
    const whereCondition = category_name ? { url: category_name.toLowerCase() } : { is_active: true };

    const categories = await categoryRepo
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.subcategories", "subcategory", "subcategory.is_active = :isActive", { isActive: true })
      .where(whereCondition)
      .orderBy("category.title", "ASC")
      .addOrderBy("subcategory.title", "ASC")
      .select([
        "category.id",
        "category.title",
        "category.created_at",
        "category.updated_at",
        "category.url",
        "subcategory.id",
        "subcategory.title",
        "subcategory.url"
      ])
      .getMany();

    return res.status(200).send(categories);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
};
