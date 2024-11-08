import { AppDataSource } from "../../../data-source";
import { Categories } from "../../../entities/categories.entity";
import { AppError } from "../../../errors";
import { handleError } from "../../../middlewares/err.mid";
import { Request, Response } from "express";

const categoryRepo = AppDataSource.getRepository(Categories);

export const categoryListController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { category_name } = req.params;
    const whereCondition = category_name ? { url: category_name.toLowerCase() } : {};

    const categories = await categoryRepo.find({
      order: { title: "ASC" },
      relations: ["subcategories"],
      where: [whereCondition],
      select: {
        id: true,
        title: true,
        created_at: true,
        updated_at: true,
        url: true,
        is_active: true,
        subcategories: {
          id: true,
          title: true,
          url: true,
          is_active: true,
        }
      },
    });

    return res.status(200).send(categories);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
};
