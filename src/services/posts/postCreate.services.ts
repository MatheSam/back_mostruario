import { AppDataSource } from "../../data-source";
import { Posts } from "../../entities/posts.entity";
import { AppError } from "../../errors";
import { Users } from "../../entities/users.entity";
import { v4 as uuid } from "uuid";

const postCreateService = async (dados: any) => {
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

  if (!dados.user) {
    throw new AppError('ID do usuário não fornecido!', 400);
  }

  const user = await userRepo.findOne({where: {id: dados.user}});

  if (!user) {
    throw new AppError('Usuário não encontrado!', 400) 
  }

  const post = postRepo.create({
    id: uuid(),
    title,
    descr,
    users: {id: user.id, name: user.name}
  })

  await postRepo.save(post);

  return post;
}

export default postCreateService;