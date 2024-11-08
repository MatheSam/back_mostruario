import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { Posts } from "../../../entities/posts.entity";
import { isOwner } from "../../../middlewares/err.mid";
import { validateData } from "../../../utils/functions";

const postUpdateService = async ({ id }: any, data: any): Promise<any> => {
  validateData(data, ['title', 'descr', 'is_active']);

  const postRepo = AppDataSource.getRepository(Posts);
  const { title, descr, is_active } = data;

  const post = await postRepo.findOne({
    where: { id },
    relations: ["users"]
  });

  if (!post) {
    throw new AppError("Não encontrado!", 400);
  }

  if (title && title.toLowerCase() == post.title.toLowerCase()) {
    throw new AppError("Título já cadastrado!", 400);
  }

  post.title = title || post.title;
  post.descr = descr || post.descr;
  post.is_active = is_active || post.is_active;

  await postRepo.save(post);

  return {
    ...post, // Spread operator para incluir todas as propriedades
    users: {
      id: post.users.id,
      name: post.users.name,
    },
  };
}

export default postUpdateService;