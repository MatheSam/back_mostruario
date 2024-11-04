import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Users } from "../../entities/users.entity";
import bcrypt from 'bcrypt';
import { isAdm, isOwner } from "../../middlewares/err.mid";

const userUpdateService = async (id: any, data: any, email_auth: any): Promise<any> => {
  const userRepo = AppDataSource.getRepository(Users);
  const {name, password, email, is_adm, is_active, is_faq, is_post, is_product, is_user} = data;

  const user = await userRepo.findOneBy(id);

  await isOwner(user?.email, email_auth);

  if (!user) {
    throw new AppError("Usuário não encontrado!", 400);
  }

  if (email && email == user.email) {
    throw new AppError("Email já cadastrado!", 400);
  }

  user.name = name || user.name;
  user.email = email || user.email;
  
  if (is_post || is_adm || is_user || is_post || is_active || is_product || is_faq ) {
    await isAdm(email_auth);
    
    user.is_adm = is_adm || user.is_adm;
    user.is_faq = is_faq || user.is_faq;
    user.is_post = is_post || user.is_post;
    user.is_user = is_user || user.is_user;
    user.is_active = is_active || user.is_active;
    user.is_product = is_product || user.is_product;
  }

  await userRepo.save(user);
  return user;
}

export default userUpdateService;