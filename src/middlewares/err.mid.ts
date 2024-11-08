import { Response } from "express";
import { AppError } from "../errors";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/users.entity";

export const handleError = async (err: any, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      code: err.statusCode,
      message: err.message,
    });
  }
};

export const isOwner = async (owner_mail: any, auth_email: any) => {
  const userRepo = AppDataSource.getRepository(Users);
  const user = await userRepo.findOneBy({email: auth_email});
  const is_adm = user?.is_adm;

  if ((owner_mail.toLowerCase() !== auth_email.toLowerCase()) && !is_adm) {
    throw new AppError('Você não tem permissão para acessar e/ou fazer modificações!', 403);
  }
}

export const isAdm = async (auth_email: any) => {
  const userRepo = AppDataSource.getRepository(Users);
  const user = await userRepo.findOneBy({email: auth_email});
  const is_adm = user?.is_adm;

  if (!is_adm) {
    throw new AppError('Você não tem permissão para acessar e/ou fazer modificações!', 403);
  }
}

export const isAdmOrPermission = async (auth_email: string, type: string) => {
  const userRepo = AppDataSource.getRepository(Users);
  const user = await userRepo.findOneBy({email: auth_email});
  let permission: any = false;

  if (type == 'user') {
    permission = user?.is_user;
  } else if (type == 'faq') {
    permission = user?.is_faq;
  } else if (type == 'post') {
    permission = user?.is_post;
  } else if (type == 'product') {
    permission = user?.is_product
  }
  
  if (!user?.is_adm && !permission) {
    throw new AppError('Você não tem permissão para acessar e/ou fazer modificações!', 403);
  }
}