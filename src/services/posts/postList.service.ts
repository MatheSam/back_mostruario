import { AppDataSource } from "../../data-source";
import { Posts } from "../../entities/posts.entity";
import { AppError } from "../../errors";

const postListService = async () => {
  const postRepo = AppDataSource.getRepository(Posts);
  
  const post = await postRepo.find({
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

  return post;
};

export default postListService;
