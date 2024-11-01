import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entity";

const userSoftDeleteService = async (id: any) => {
  const userRepo = AppDataSource.getRepository(Users);
  await userRepo.update(id, { is_active: false });
};

export default userSoftDeleteService;
