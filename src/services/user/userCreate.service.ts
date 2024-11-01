import { v4 as uuid } from "uuid";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Users } from "../../entities/users.entity";
import { Roles } from "../../entities/role.entity";
import bcrypt from 'bcrypt';

const userCreateService = async (dados: any) => {
  const {name, password, email, roleId} = dados;

  const usersRepo = AppDataSource.getRepository(Users);
  const rolesRepo = AppDataSource.getRepository(Roles);

  const emailExist = await usersRepo.findOne(({
    where: {email}
  }))

  if (emailExist) {
    throw new AppError('Email já cadastrado.', 400);
  }

  const role = await rolesRepo.findOne(({
    where: {id: roleId}
  }));

  if (!role) {
    throw new AppError('Cargo não encontrado!', 400);
  }

  const user = usersRepo.create({
    id: uuid(),
    name,
    email,
    roles: role,
    password: bcrypt.hashSync(password, 10)
  })

  await usersRepo.save(user);

  return user;
};

export default userCreateService;
