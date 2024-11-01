import { AppDataSource } from "../../data-source";
import { Faq } from "../../entities/faq.entity";

const faqDeleteService = async (id: any) => {
  const faqRepo = AppDataSource.getRepository(Faq);
  await faqRepo.delete(id);
};

export default faqDeleteService;