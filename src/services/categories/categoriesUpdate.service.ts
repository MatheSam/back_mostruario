import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Posts } from "../../entities/posts.entity";
import { isOwner } from "../../middlewares/err.mid";

const postUpdateService = async ({ id }: any, email: any, data: any): Promise<any> => {
  const postRepo = AppDataSource.getRepository(Posts);
  const { title, descr, is_active } = data;

  const post = await postRepo.findOne({
    where: { id },
    relations: ["users"]
  });

  if (!post) {
    throw new AppError("FAQ não encontrado!", 400);
  }

  await isOwner(post.users.email, email);

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