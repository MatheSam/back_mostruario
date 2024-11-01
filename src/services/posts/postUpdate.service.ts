import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Posts } from "../../entities/posts.entity";

const postUpdateService = async (id: any, data: any): Promise<any> => {
  const postRepo = AppDataSource.getRepository(Posts);
  const {title, descr, is_active} = data;

  const post = await postRepo.findOneBy(id);
  if (!post) {
    throw new AppError("FAQ não encontrado!", 400);
  }

  if (title && title.toLowerCase() == post.title.toLowerCase()) {
    throw new AppError("Título já cadastrado!", 400);
  }

  post.title = title || post.title;
  post.descr = descr || post.descr;
  post.is_active = is_active || post.is_active;

  await postRepo.save(post);

  return post;
}

export default postUpdateService;