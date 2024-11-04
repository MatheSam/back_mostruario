import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users.entity";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from "../../errors";

const loginService = async ({ email, password }: any) => {
  const userRepo = AppDataSource.getRepository(Users);

  const users = await userRepo.find({ relations: {
    roles: true
  }});
  const user = users.find(user => user.email == email);

  if (!user) {
    throw new AppError("Email e/ou senha está incorreto", 400)
  };

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError("Email e/ou senha está incorreto", 400)
  }

  if (!user?.is_active) {
    throw new AppError("Usuário não ativo na base, contatar o suporte!", 400)
  }

  const token = jwt.sign(
    {
      email,
      roleId: user.roles?.id
    },
    String(process.env.JWT_SECRET),
    { expiresIn: '5d' },
  )

  return token;
}

export default loginService;