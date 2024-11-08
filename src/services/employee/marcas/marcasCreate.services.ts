import { AppDataSource } from "../../../data-source";
import { Marcas } from "../../../entities/marcas.entity";
import { AppError } from "../../../errors";
import { v4 as uuid } from "uuid";
import { urlNormalized, validateData } from "../../../utils/functions";

const marcaCreateService = async (dados: any) => {
  validateData(dados, ['title']);

  const marcaRepo = AppDataSource.getRepository(Marcas);
  const {title} = dados;

  if(!title) {
    throw new AppError(`Campo obrigatório, nome, não preenchido!`, 400);
  }

  const marcas = await marcaRepo.find();
  if (marcas.some(marca => marca.title.toLowerCase() == title.toLowerCase())) {
    throw new AppError("Já existe uma marca com esse nome.", 400);
  }

  const marca = marcaRepo.create({
    id: uuid(),
    title,
    url: urlNormalized(title)
  })

  await marcaRepo.save(marca);

  return marca;
}

export default marcaCreateService;