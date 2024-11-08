import { AppDataSource } from "../../data-source";
import { Faq } from "../../entities/faq.entity";
import { AppError } from "../../errors";
import { handleError } from "../../middlewares/err.mid";
import { Request, Response } from "express";

const faqRepo = AppDataSource.getRepository(Faq);

export const faqListClient = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const whereCondition = id ? { id } : { is_active: true };

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
};
