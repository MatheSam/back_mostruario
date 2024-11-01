import { AppDataSource } from "../../data-source";
import { Posts } from "../../entities/posts.entity";
import { AppError } from "../../errors";

const postsIdListService = async ({id}: any) => {
  const postsRepo = AppDataSource.getRepository(Posts);
  
  const post = await postsRepo.find({
    where: {id},
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

  if (!post) {
    throw new AppError('Publicação não encontrada', 400)
  }

  return post;
}

export default postsIdListService;