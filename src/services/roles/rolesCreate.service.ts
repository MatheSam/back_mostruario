import { Iroles, IrolesCreate } from "../../interfaces/role";
import { Roles } from "../../entities/role.entity";
import { v4 as uuid } from "uuid";

const rolesCreateService = ({ name }: IrolesCreate): any => {
  let roles: any = [];

  const roleExists = 'a';/* roles.find(role => role.name.toLowerCase() === name.toLowerCase()); */

  if (roleExists) {
    throw new Error("Cargo já existe");
  }

  const role: Iroles = {
    id: uuid(),
    name,
  };

  roles.push(role);

  return role;
};

export default rolesCreateService;
