import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Roles } from "../../entities/role.entity";
import { Permissions } from "../../entities/permissions.entity";

const roleUpdateService = async (id: any, data: any): Promise<any> => {
  const roleRepo = AppDataSource.getRepository(Roles);
  const permissionRepo = AppDataSource.getRepository(Permissions);

  const role = await roleRepo.findOneBy(id);

  if (!role) {
    throw new AppError('Cargo não encontrado', 400);
  }

  if (data.permissions) {
    const permissions = await permissionRepo.find();

    const validPermissions = permissions.filter(perm => 
      data.permissions.includes(perm.id)
    );

    role.permissions = validPermissions;
  }

  role.name = data.name || role.name;
  
  await roleRepo.save(role)

  return role;
}

export default roleUpdateService;

  /*
    const updatedData = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== undefined) { // Considera apenas campos definidos
        (acc as any)[key] = data[key];
      }
      return acc;
    }, {} as Partial<typeof role>);

    await roleRepo.update(id, updatedData);
  */