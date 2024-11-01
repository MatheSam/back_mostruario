import { Roles } from "../../entities/role.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const roleDeleteService = async (id: any) => {
  const roleRepo = AppDataSource.getRepository(Roles);

  const role = await roleRepo.findOneBy(id);
  
  if (!role) {
    throw new AppError('Cargo não encontrado', 400);
  }

  await roleRepo.delete(role.id);

  return
};

export default roleDeleteService;