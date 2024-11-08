import { AppDataSource } from "../../../data-source";
import { Sizes } from "../../../entities/size.entity";
import { AppError } from "../../../errors";
import { v4 as uuid } from "uuid";
import { validateData } from "../../../utils/functions";

const sizeCreateService = async (dados: any) => {
  validateData(dados, ['title']);

  const sizeRepo = AppDataSource.getRepository(Sizes);
  const {title} = dados;

  if(!title) {
    throw new AppError(`Um dos campos obrigatórios não foi preenchido!`, 400);
  }

  const sizes = await sizeRepo.find();
  if (sizes.some(size => size.title.toLowerCase() == title.toLowerCase())) {
    throw new AppError("Já existe um tamanho com esse nome.", 400);
  }

  const size = sizeRepo.create({
    id: uuid(),
    title
  })

  await sizeRepo.save(size);

  return size;
}

export default sizeCreateService;