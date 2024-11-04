import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Faq } from "../../entities/faq.entity";
import { isOwner } from "../../middlewares/err.mid";

const faqUpdateService = async (id: any, data: any, email: string): Promise<any> => {
  const faqRepo = AppDataSource.getRepository(Faq);
  const {title, descr, is_active} = data;

  const faq = await faqRepo.findOne({
    where: {id: id.id},
    relations: ["users"]
  });

  if (!faq) {
    throw new AppError("FAQ não encontrado!", 400);
  }

  await isOwner(faq.users.email, email);

  if (title && title.toLowerCase() == faq.title.toLowerCase()) {
    throw new AppError("Título já cadastrado!", 400);
  }

  faq.title = title || faq.title;
  faq.descr = descr || faq.descr;
  faq.is_active = is_active || faq.is_active;

  await faqRepo.save(faq);

  return {
    ...faq,
    users: {
      id: faq.users.id,
      name: faq.users.name
    }
  };
}

export default faqUpdateService;