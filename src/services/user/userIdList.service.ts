import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entity";

const userIdListService = async ({id}: any) => {
  const userRepo = AppDataSource.getRepository(Users);
  
  const user = await userRepo.findOne({
    where: {id}
  });

  return user;
}

export default userIdListService;