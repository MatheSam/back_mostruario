import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entity";

const userListService = async () => {
  const usersRepo = AppDataSource.getRepository(Users);
  return usersRepo.find({
    order: {name: "ASC"},
    relations: {
      roles: true
    }
  });
}

export default userListService;