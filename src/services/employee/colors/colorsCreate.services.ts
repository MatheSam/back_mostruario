import { AppDataSource } from "../../../data-source";
import { Colors } from "../../../entities/color.entity";
import { AppError } from "../../../errors";
import { v4 as uuid } from "uuid";
import { validateData } from "../../../utils/functions";

const colorCreateService = async (dados: any) => {
  validateData(dados, ['title', 'hexadecimal']);

  const colorRepo = AppDataSource.getRepository(Colors);
  const {title, hexadecimal} = dados;

  if(!title || !hexadecimal) {
    throw new AppError(`Um dos campos obrigatórios não foi preenchido!`, 400);
  }

  const colors = await colorRepo.find();
  if (colors.some(color => color.title.toLowerCase() == title.toLowerCase())) {
    throw new AppError("Já existe uma cor com esse nome.", 400);
  }

  if (colors.some(color => color.hexadecimal.toLowerCase() == hexadecimal.toLowerCase())) {
    throw new AppError("Essa cor já está cadastrada!", 400);
  }

  const color = colorRepo.create({
    id: uuid(),
    title,
    hexadecimal
  })

  await colorRepo.save(color);

  return color;
}

export default colorCreateService;