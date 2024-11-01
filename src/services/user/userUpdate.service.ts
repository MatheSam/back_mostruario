import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Users } from "../../entities/users.entity";
import { Roles } from "../../entities/role.entity";
import bcrypt from 'bcrypt';

const userUpdateService = async (id: any, data: any): Promise<any> => {
  const userRepo = AppDataSource.getRepository(Users);
  const roleRepo = AppDataSource.getRepository(Roles);
  const {name, password, email} = data;

  const user = await userRepo.findOneBy(id);

  if (!user) {
    throw new AppError("Usuário não encontrado!", 400);
  }

  if (email && email == user.email) {
    throw new AppError("Email já cadastrado!", 400);
  }

  if (data.roleId) {
    const role = await roleRepo.findOne({where: {id: data.roleId}});

    if (!role) {
      throw new AppError("Cargo não encontrado!", 400);
    }

    user.roles = role;
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.password = password ? bcrypt.hashSync(password, 10) : user.password;

  await userRepo.save(user);

  return user;
}

export default userUpdateService;