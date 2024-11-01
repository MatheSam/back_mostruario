import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Permissions } from "../../entities/permissions.entity";

const permissionUpdateService = async (id: any, {name}: any) => {
  const permiRepo = AppDataSource.getRepository(Permissions);

  const permi = await permiRepo.findOneBy(id);

  if (!permi) {
    throw new AppError('Permissão não encontrada!', 400);
  }

  await permiRepo.update(id, {
    name
  });

  const permiAtt = await permiRepo.findOneBy(id);

  return permiAtt;
};

export default permissionUpdateService;