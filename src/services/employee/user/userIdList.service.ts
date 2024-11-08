import { AppDataSource } from "../../../data-source";
import { Users } from "../../../entities/users.entity";
import { isOwner } from "../../../middlewares/err.mid";

const userIdListService = async (id: any, email: any) => {
  const userRepo = AppDataSource.getRepository(Users);

  const user = await userRepo.findOne({
    where: {id: id.id}
  });
  
  await isOwner(user?.email, email);

  return user;
}

export default userIdListService;