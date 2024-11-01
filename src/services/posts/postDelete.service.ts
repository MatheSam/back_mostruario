import { AppDataSource } from "../../data-source";
import { Posts } from "../../entities/posts.entity";

const postDeleteService = async (id: any) => {
  const postRepo = AppDataSource.getRepository(Posts);
  await postRepo.delete(id);
};

export default postDeleteService;