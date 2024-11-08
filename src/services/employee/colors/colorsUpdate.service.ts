import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { Colors } from "../../../entities/color.entity";
import { validateData } from "../../../utils/functions";

const colorsUpdateService = async (id: any, data: any): Promise<any> => {
  validateData(data, ['title', 'hexadecimal']);
  
  const colorRepo = AppDataSource.getRepository(Colors);
  const {title, hexadecimal} = data;

  const color = await colorRepo.findOne({
    where: {id: id.id}
  });

  if (!color) {
    throw new AppError("Cor não encontrada!", 400);
  }

  if ((title && title.toLowerCase() == color.title.toLowerCase()) || (hexadecimal && hexadecimal.toLowerCase() == color.hexadecimal.toLowerCase())) {
    throw new AppError("Cor já cadastrada!", 400);
  }

  color.title = title || color.title;
  color.hexadecimal = hexadecimal || color.hexadecimal;

  await colorRepo.save(color);
  return color;
}

export default colorsUpdateService;