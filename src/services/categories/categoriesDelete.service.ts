import { AppDataSource } from "../../data-source";
import { Posts } from "../../entities/posts.entity";
import { isOwner } from "../../middlewares/err.mid";

const postDeleteService = async (id: any, email: string) => {
  const postRepo = AppDataSource.getRepository(Posts);

  const post = await postRepo.findOne({
    where: {id: id.id},
    relations: ["users"]
  });

  await isOwner(post?.users.email, email);
  await postRepo.delete(id);
};

export default postDeleteService;