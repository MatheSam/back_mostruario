import { Iroles, IrolesCreate } from "../../interfaces/role";
import { Roles } from "../../entities/role.entity";
import { v4 as uuid } from "uuid";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Permissions } from "../../entities/permissions.entity";

const rolesCreateService = async ({ name, permissionId }: IrolesCreate): Promise<any> => {
  const rolesRepo = AppDataSource.getRepository(Roles);
  const permissionRepo = AppDataSource.getRepository(Permissions);

  const roles = await rolesRepo.find();

  if (roles.some(role => role.name.toLowerCase() == name.toLowerCase())) {
    throw new AppError("Cargo já existe", 400);
  }

  const permissions = await permissionRepo.find();

  const validPermissions = permissions.filter(perm => 
    permissionId.includes(perm.id)
  );

  if (!validPermissions) {
    throw new AppError(permissionId, 400);
  }

  const role: Iroles = rolesRepo.create({
    id: uuid(),
    name,
    permissions: validPermissions.map(perm => ({ id: perm.id })) 
  });

  await rolesRepo.save(role);

  return role;
};

export default rolesCreateService;
