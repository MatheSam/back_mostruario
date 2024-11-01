import { AppDataSource } from "../../data-source";
import { Faq } from "../../entities/faq.entity";

const faqListService = async () => {
  const faqRepo = AppDataSource.getRepository(Faq);
  
  const faq = await faqRepo.find({
    order: {title: "ASC"},
    relations: {
      users: true, // Ativa a relação com a entidade Users
    },
    select: {
      id: true,
      title: true,
      descr: true,
      users: {
        id: true, // Seleciona apenas o ID do usuário
        name: true, // Seleciona apenas o nome do usuário
      },
      created_at: true,
      updated_at: true,
      is_active: true
    },
  });

  return faq;
};

export default faqListService;
