import { AppDataSource } from "../../data-source";
import { Faq } from "../../entities/faq.entity";
import { isOwner } from "../../middlewares/err.mid";

const faqDeleteService = async (id: any, email: string) => {
  const faqRepo = AppDataSource.getRepository(Faq);
  const faq = await faqRepo.findOne({
    where: {id: id.id},
    relations: ["users"]
  })

  await isOwner(faq?.users.email, email);
  await faqRepo.delete(id);
};

export default faqDeleteService;