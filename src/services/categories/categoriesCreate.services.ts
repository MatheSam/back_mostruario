import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { v4 as uuid } from "uuid";
import { Categories } from "../../entities/categories.entity";

const categoriesCreateService = async (dados: any) => {
  const categorieRepo = AppDataSource.getRepository(Categories);

  const {title} = dados;
  if(!title) {
    throw new AppError(`Campo obrigatório, título, não preenchido!`, 400);
  }

  const categories = await categorieRepo.find();
  if (categories.some(categorie => categorie.title.toLowerCase() == title.toLowerCase())) {
    throw new AppError("Já existe uma categoria com esse nome.", 400);
  }

  const categorie = categorieRepo.create({
    id: uuid(),
    title,
  })

  await categorieRepo.save(categorie);

  return categorie;
}

export default categoriesCreateService;