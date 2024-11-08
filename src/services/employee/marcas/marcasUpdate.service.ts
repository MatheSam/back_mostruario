import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { Marcas } from "../../../entities/marcas.entity";
import { urlNormalized, validateData } from "../../../utils/functions";

const marcasUpdateService = async (id: any, data: any): Promise<any> => {
  validateData(data, ['title', 'is_active']);
  
  const marcaRepo = AppDataSource.getRepository(Marcas);
  const {title, is_active} = data;

  const marca = await marcaRepo.findOne({
    where: {id: id.id}
  });

  if (!marca) {
    throw new AppError("Marca não encontrada!", 400);
  }

  if (title && title.toLowerCase() == marca.title.toLowerCase()) {
    throw new AppError("Título já cadastrado!", 400);
  }

  marca.title = title || marca.title;
  marca.url = title ? urlNormalized(title) : marca.url;
  marca.is_active = is_active || marca.is_active;

  await marcaRepo.save(marca);

  return marca;
}

export default marcasUpdateService;