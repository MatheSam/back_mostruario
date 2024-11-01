import { AppDataSource } from "../../data-source";
import { Faq } from "../../entities/faq.entity";
import { AppError } from "../../errors";
import { Users } from "../../entities/users.entity";
import { v4 as uuid } from "uuid";

const faqCreateService = async (dados: any) => {
  const faqRepo = AppDataSource.getRepository(Faq);
  const userRepo = AppDataSource.getRepository(Users);

  const {title, descr} = dados;
  if(!title || !descr) {
    throw new AppError(`Campo obrigatório, ${title ? 'Descrição' : 'Título'}, não preenchido!`, 400);
  }

  const faqs = await faqRepo.find();
  if (faqs.some(faq => faq.title.toLowerCase() == title.toLowerCase())) {
    throw new AppError("Já existe um FAQ com esse nome.", 400);
  }

  if (!dados.user) {
    throw new AppError('ID do usuário não fornecido!', 400);
  }

  const user = await userRepo.findOne({where: {id: dados.user}});

  if (!user) {
    throw new AppError('Usuário não encontrado!', 400) 
  }

  const faq = faqRepo.create({
    id: uuid(),
    title,
    descr,
    users: {id: user.id, name: user.name}
  })

  await faqRepo.save(faq);

  return faq;
}

export default faqCreateService;