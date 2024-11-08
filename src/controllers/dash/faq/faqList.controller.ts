import { Request, Response } from "express";
import { AppError } from "../../../errors";
import { handleError } from "../../../middlewares/err.mid";
import { AppDataSource } from "../../../data-source";
import { Faq } from "../../../entities/faq.entity";

const faqListController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const faqRepo = AppDataSource.getRepository(Faq);

    const { id } = req.params;
    const whereCondition = id ? { id } : {};

    const faq = await faqRepo.find({
      order: { title: "ASC" },
      where: whereCondition,
      relations: {
        users: true,
      },
      select: {
        id: true,
        title: true,
        descr: true,
        users: {
          id: true,
          name: true,
        },
        created_at: true,
        updated_at: true,
        is_active: true
      },
    });

    return res.status(200).send(faq);

  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(409).json({ status: 404, message: 'Erro desconhecido, contate o suporte' });
    }
  }
}

export default faqListController;