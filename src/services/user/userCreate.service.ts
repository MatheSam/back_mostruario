import { v4 as uuid } from "uuid";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Users } from "../../entities/users.entity";
import bcrypt from 'bcrypt';

const userCreateService = async (dados: any) => {
  const {name, password, email, roleId, is_adm, is_faq, is_post, is_product, is_user} = dados;

  const usersRepo = AppDataSource.getRepository(Users);

  const emailExist = await usersRepo.findOne(({
    where: {email}
  }))

  if (emailExist) {
    throw new AppError('Email já cadastrado.', 400);
  }

  const user = usersRepo.create({
    id: uuid(),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    is_adm, 
    is_faq, 
    is_post, 
    is_product, 
    is_user
  })

  await usersRepo.save(user);

  return user;
};

export default userCreateService;
