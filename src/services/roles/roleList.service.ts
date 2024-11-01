import { AppDataSource } from "../../data-source";
import { Roles } from "../../entities/role.entity";

const rolesListService = async () => {
  const rolesRepo = AppDataSource.getRepository(Roles);
  
  const roles = rolesRepo.find();

  return roles;
};

export default rolesListService;
