import { AppDataSource } from "../../data-source";
import { Permissions } from "../../entities/permissions.entity";

const permissionsListService = async () => {
  const permissionsRepo = AppDataSource.getRepository(Permissions);
  
  const permissions = permissionsRepo.find();

  return permissions;
};

export default permissionsListService;
