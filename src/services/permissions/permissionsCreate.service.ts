import { IPermissions, IPermissionsCreate } from "../../interfaces/permissions";
import { v4 as uuid } from "uuid";
import { Permissions } from "../../entities/permissions.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const permissionsCreateService = async ({name}: IPermissionsCreate): Promise<Permissions> => {
  const permissionsRepo = AppDataSource.getRepository(Permissions);

  const permissions = await permissionsRepo.find();

  const permissionsExists = permissions.find(permission => permission.name.toLocaleLowerCase() == name.toLowerCase());

  if (permissionsExists) {
    throw new AppError('Permissão já criada', 400);
  }

  const permission: IPermissions = permissionsRepo.create({
    id: uuid(),
    name,
  }) 

  await permissionsRepo.save(permission);

  return permission;
};

export default permissionsCreateService;
