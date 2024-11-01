import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Faq } from "../../entities/faq.entity";

const faqUpdateService = async (id: any, data: any): Promise<any> => {
  const faqRepo = AppDataSource.getRepository(Faq);
  const {title, descr, is_active} = data;

  const faq = await faqRepo.findOneBy(id);
  if (!faq) {
    throw new AppError("FAQ não encontrado!", 400);
  }

  if (title && title.toLowerCase() == faq.title.toLowerCase()) {
    throw new AppError("Título já cadastrado!", 400);
  }

  faq.title = title || faq.title;
  faq.descr = descr || faq.descr;
  faq.is_active = is_active || faq.is_active;

  await faqRepo.save(faq);

  return faq;
}

export default faqUpdateService;