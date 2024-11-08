import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { Sizes } from "../../../entities/size.entity";
import { validateData } from "../../../utils/functions";

const sizesUpdateService = async (id: any, data: any): Promise<any> => {
  validateData(data, ['title']);
  
  const sizeRepo = AppDataSource.getRepository(Sizes);
  const {title} = data;

  const size = await sizeRepo.findOne({
    where: {id: id.id}
  });

  if (!size) {
    throw new AppError("Tamanho não encontrada!", 400);
  }

  if (title && title.toLowerCase() == size.title.toLowerCase()) {
    throw new AppError("Tamanho já cadastrada!", 400);
  }

  size.title = title || size.title;

  await sizeRepo.save(size);
  return size;
}

export default sizesUpdateService;