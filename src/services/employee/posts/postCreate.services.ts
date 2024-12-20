import { AppDataSource } from "../../../data-source";
import { Posts } from "../../../entities/posts.entity";
import { AppError } from "../../../errors";
import { Users } from "../../../entities/users.entity";
import { v4 as uuid } from "uuid";
import { validateData } from "../../../utils/functions";

const postCreateService = async (dados: any, email: string) => {
  validateData(dados, ['title', 'descr']);

  const postRepo = AppDataSource.getRepository(Posts);
  const userRepo = AppDataSource.getRepository(Users);

  const {title, descr} = dados;
  if(!title || !descr) {
    throw new AppError(`Campo obrigatório, ${title ? 'Descrição' : 'Título'}, não preenchido!`, 400);
  }

  const posts = await postRepo.find();
  if (posts.some(post => post.title.toLowerCase() == title.toLowerCase())) {
    throw new AppError("Já existe uma notícia/publicação com esse nome.", 400);
  }

  const user = await userRepo.findOne({where: {email}});

  const post = postRepo.create({
    id: uuid(),
    title,
    descr,
    users: {id: user!.id, name: user!.name}
  })

  await postRepo.save(post);

  return post;
}

export default postCreateService;